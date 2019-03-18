import { wxPromise, BookRequest, Rxios } from '../common/utils'
import _chain from 'lodash/chain'
import _filter from 'lodash/filter'
import _thru from 'lodash/thru'
import _value from 'lodash/value'
import _findIndex from 'lodash/findIndex'
export default {
	namespaced: true,
	state: {
		Detail: { categories: [] },
		AuthBooks: [],
		FreeStatusText: ['没有资源', '获取资源...', '获取目录...', '获取目录失败', '浏览目录'],
		FreeStatus: 1,
		FreeChapters: { list: [] },
		FreeReader: {},
		FreeReadList: { id: 0, box: {}, list: [] },
		/** 阅读器 */
		Colors: ['#f7eee5', '#e9dfc7', '#a4a4a4', '#cdefce', '#283548', 'rgb(15, 20, 16)']
	},
	getters: {
		BtnClass(state) {
			return [0, 3].includes(state.FreeStatus) ? 'history' : 'chapter'
		},
		BtnLoad(state) {
			return [1, 2].includes(state.FreeStatus)
		}
	},
	mutations: {
		SET_DATA(state, fn) {
			fn && fn(state)
		},
		SET_STATUS(state, status) {
			state.FreeStatus = status
		}
	},
	actions: {
		async BookDetail({ commit, state, dispatch }, { id }) {
			const res = await BookRequest(`/hs/v0/android/fiction/book/${id}`)
			if (res.statusCode !== 200) return false
			commit('SET_DATA', state => {
				state.Detail = res.data.detail[0]
				state.AuthBooks = res.data.authorBook
			})
			const { title, authors } = state.Detail
			const free = await Rxios(`/book/search?q=${title}`)
			const freeBook = free.data.length > 0 ? free.data.find(o => o.name === title && o.author === authors) : ''
			commit('SET_DATA', state => {
				if (!freeBook) {
					state.FreeStatus = 0
					return false
				} else {
					state.FreeStatus = 2
					state.FreeReader = freeBook
				}
			})
			const { href: [type, chapter] } = state.FreeReader
			await dispatch('BookChapter', { type, chapter })
		},
		async BookChapter({ commit, state }, q) {
			const { type, chapter, list } = state.FreeChapters
			if (type === q.type && chapter === q.chapter) {
				console.log('取的内存了')
				return list
			}
			const res = await Rxios(`/book/chapter?type=${q.type}&chapter=${q.chapter}`)
			commit('SET_DATA', state => {
				state.FreeStatus = 2
				if (res.statusCode !== 200) {
					state.FreeStatus = 3
				} else {
					state.FreeStatus = 4
					state.FreeChapters = {
						type: q.type,
						chapter: q.chapter,
						list: res.data
					}
				}
			})
		},
		async BookReader({ state, commit }, { id, start }) {
			if (start) {
				commit('SET_DATA', state => {
					state.FreeReadList.list = []
				})
			}
			const { type, chapter } = state.FreeChapters
			const res = await Rxios(`/book/context?type=${type}&chapter=${chapter}&id=${id}`)
			if (res.statusCode !== 200) return false
			commit('SET_DATA', state => {
				state.FreeReadList.list.push(res.data)
				state.FreeReadList = {
					...state.FreeReadList,
					id: id,
					box: res.data
				}
			})
		},
		async BookFallDown({ state, dispatch }) {
			const { list } = state.FreeChapters
			const { id } = state.FreeReadList
			const filt = _filter(list,['type', 'dd'])
			const idx = _findIndex(filt, ['href', id]) + 1
			const nextChapter = filt[idx]
			console.log('加载了一个...')
			await dispatch('BookReader', { id: nextChapter.href })
		}
	}
}
