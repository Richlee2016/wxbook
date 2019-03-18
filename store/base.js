import { wxPromise, BookRequest } from '../common/utils'
import _findIndex from 'lodash/findIndex'
const CATEGORYMODLE = {
	id: 0,
	start: 0,
	count: 10,
	type: 'click',
	isLower: false,
	list: {
		click: [],
		latest: [],
		finish: []
	}
}
const RANKMODLE = { id: 0, start: 0, count: 10, isLower: false, list: [] }
export default {
	namespaced: true,
	state: {
		Banner: { banner: '', description: '', list: [] },
		Channel: { list: [] },
		Category: { male: [], femal: [] },
		Rank: [],
		Recommend: { start: 0, count: 5, isLower: false, list: [] },
		CategoryVodList: [],
		CategoryGroups: { index: 0, group: [] },
		CategoryVod: CATEGORYMODLE,
		RankVodList: [],
		RankGroup: { index: 0, group: [] },
		RankVod: RANKMODLE
	},
	mutations: {
		SET_DATA(state, fn) {
			fn && fn(state)
		},
		// 分类详情设置
		SET_CATEGORY_GROUP(state, { index, group }) {
			state.CategoryGroups.index = index
			if (group) {
				uni.setStorageSync('categoryGroups', group)
				state.CategoryGroups.group = group
			} else {
				state.CategoryGroups.group = uni.getStorageSync('categoryGroups')
			}
		},
		// 排行设置
		SET_RANK_GROUP(state, { index, group }) {
			state.RankGroup.index = index
			if (group) {
				const [a, b, c] = group.split(',')
				state.RankGroup.group = [b, c, a].map((o, i) => ({
					id: o,
					label: ['周榜', '月榜', '总榜'][i]
				}))
			}
		}
	},
	actions: {
		// 统一简易请求
		async CommonFetch({ commit }, { url, name }) {
			const res = await BookRequest(url)
			console.log(res)
			if (res.statusCode !== 200) return false
			commit('SET_DATA', state => {
				state[name] = res.data
			})
		},
		// 专题 下拉刷新
		async FetchRecommend({ state, commit }) {
			const { start, count, list, isLower } = state.Recommend
			if (isLower) return
			const res = await BookRequest(`/store/v0/ad/persistent?start=${start}&count=${count}&type=4`)
			if (res.statusCode !== 200) return false
			commit('SET_DATA', state => {
				state.Recommend.start = start + count
				if (res.data.length < count) {
					state.Recommend.isLower = true
				}
				state.Recommend.list = list.concat(res.data)
			})
		},
		// 请求 分类详情
		async FetchCategoryVod({ state, commit }, { id, type = 'click' }) {
			id = id || state.CategoryGroups.group[state.CategoryGroups.index].category_id
			const haveVod = _findIndex(state.CategoryVodList, ['id', id])
			if (haveVod === -1) {
				let vod = Object.assign(CATEGORYMODLE, { id })
				const { start, count, type } = vod
				const res = await BookRequest(`/store/v0/fiction/category/${id}?start=${start}&count=${count}&${type}=1`)
				if (res.statusCode !== 200) return false
				commit('SET_DATA', state => {
					let vod = Object.assign(CATEGORYMODLE, { id })
					vod.list[type] = res.data
					state.CategoryVod = vod
					state.CategoryVodList.push(vod)
				})
			} else {
				const vod = Object.assign(state.CategoryVodList[haveVod], { type })
				if (vod.isLower) {
					commit('SET_DATA', state => {
						state.CategoryVod = vod
					})
					return false
				}
				const { start, count, list } = vod
				const res = await BookRequest(`/store/v0/fiction/category/${id}?start=${start}&count=${count}&${type}=1`)
				if (res.statusCode !== 200) return false
				commit('SET_DATA', state => {
					vod.start = start + count
					if (res.data.length < count) {
						vod.isLower = true
					}
					vod.list[type] = list[type].concat(res.data)
					state.CategoryVod = vod
				})
			}
		},
		// 排行请求
		async FetchRankVod({ state, commit }) {
			const id = state.RankGroup.group[state.RankGroup.index].id
			const haveVod = _findIndex(state.RankVodList, ['id', id])
			if (haveVod === -1) {
				let vod = Object.assign(RANKMODLE, { id })
				const { start, count } = vod
				const res = await BookRequest(`/store/v0/fiction/rank?start=${start}&count=${count}&r=${id}`)
				if (res.statusCode !== 200) return false
				commit('SET_DATA', state => {
					if (res.data.length < count) {
						vod.isLower = true
					} else {
						vod.start = start + count
					}
					vod.list = res.data
					state.RankVod = vod
					state.RankVodList.push(vod)
				})
			} else {
				const vod = state.RankVodList[haveVod]
				if (vod.isLower) {
					commit('SET_DATA', state => {
						state.RankVod = vod
					})
					return false
				}
				const { start, count, list } = vod
				const res = await BookRequest(`/store/v0/fiction/rank?start=${start}&count=${count}&r=${id}`)
				if (res.statusCode !== 200) return false
				commit('SET_DATA', state => {
					if (res.data.length < count) {
						vod.isLower = true
					} else {
						vod.start = start + count
					}
					vod.list = list.concat(res.data)
					state.RankVod = vod
				})
			}
		}
	}
}
