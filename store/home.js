import {
	wxPromise,
	BookRequest
} from '../common/utils'
const DefaultData = {}
const arr = ['hot', 'recommend', 'girl', 'boy', 'free','topic']
arr.forEach(o => DefaultData[o] = {
	list: []
})
export default {
	namespaced: true,
	state: {
		Data: DefaultData,
		GroupRecommend: {
			tab: 0,
			more: [0, 0],
			send: 0
		},
		Group: {
			girl: 0,
			boy: 0
		},
		Falls: [],
		GetListen: 0,
	},
	getters: {
		Recommend(state) {
			const {
				tab,
				more,
				send
			} = state.GroupRecommend
			const s = more[tab] * 5
			return (state.Data.recommend.list[tab] || []).slice(s, s + 5)
		},
		Girl(state) {
			const {
				girl
			} = state.Group
			return (state.Data.girl.list || []).slice(girl * 5, girl * 5 + 5)
		},
		Boy(state) {
			const {
				boy
			} = state.Group
			return (state.Data.boy.list || []).slice(boy * 5, boy * 5 + 5)
		}
	},
	mutations: {
		// 设置首页数据
		SET_DATA(state, data) {
			state.Data = data
			console.log(data)
		},
		// 推荐切换
		RECOMMEND_TAB(state, type) {
			state.GroupRecommend.tab = type - 1
		},
		// 推荐更多
		RECOMMEND_MORE(state, {
			opt,
			type
		}) {
			const {
				tab,
				more
			} = state.GroupRecommend
			state.GroupRecommend.send++
			if (type === 1) {
				state.GroupRecommend.more[tab] = (more[tab] + 1) % 3
			} else {
				uni.navigateTo({
					url: `/pages/base/channel?id=${tab === 0 ? 369 : 370}`
				})
				console.log('更多')
			}
		},
		// 男/女推荐
		PERSON_TAB(state, {
			opt,
			type
		}) {
			console.log(opt, type)
			let person = 'girl'
			let id = 370
			if (opt.sex === 1) {
				person = 'boy'
				id = 369
			}
			if (type === 1) {
				const per = state.Group[person]
				state.Group[person] = (per + 1) % 3
			} else {
				uni.navigateTo({
					url: `/pages/base/channel?id=${id}`
				})
			}
		},
		// 瀑布流
		FALLS_DOWN(state, data) {
			state.Falls = state.Falls.concat(data)
		}
	},
	actions: {
		// 获取首页数据
		async GetHomeData({
			commit
		}) {
			const res = await BookRequest(`/hs/v3/channel/418`)
			if (res.statusCode !== 200) return false
			commit("SET_DATA", res.data)
		},
		async FallsDown({
			state,
			commit
		}) {
			const count = 4
			const start = state.Falls.length
			console.log('gogo',start)
			const res = await wxPromise('request', {
				url: `http://192.168.15.32:7001/book/falls?start=${start}&count=${count}`
			})
			if (res.statusCode !== 200) console.log(res.errMsg)
			commit('FALLS_DOWN', res.data)
		}
	}
}
