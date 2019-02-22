import { observable, toJS, runInAction, flow } from 'mobx'
import Taro from '@tarojs/taro'
import MockData from './data'
import { wxPromise, BookGetRequest } from './utils'
const HomeStore = observable({
  Data: MockData,
  GroupRecommend: { tab: 0, more: [0, 0] },
  Group: { girl: 0, boy: 0 },
  Falls: [],
  get Recommend () {
    const { tab, more } = this.GroupRecommend
    const list = this.Data.recommend.list[tab]
    const s = more[tab] * 5
    return list.slice(s, s + 5)
  },
  get Girl () {
    const { girl } = this.Group
    return this.Data.girl.list.slice(girl * 5, girl * 5 + 5)
  },
  get Boy () {
    const { boy } = this.Group
    return this.Data.boy.list.slice(boy * 5, boy * 5 + 5)
  }
})

HomeStore.GetHomeData = async function () {
  const res = await BookGetRequest(`/hs/v3/channel/418`)
  if (res.statusCode !== 200) return false
  runInAction(() => {
    console.log(res)
    this.Data = res.data
  })
}

HomeStore.RecommendTab = function (type) {
  this.GroupRecommend.tab = type - 1
}
HomeStore.RecommendMore = function (data, type) {
  const { tab, more } = this.GroupRecommend
  if (type === 1) {
    this.GroupRecommend.more[tab] = (more[tab] + 1) % 3
  } else {
    Taro.navigateTo({ url: `../../pages/base/channel?id=${tab === 0 ? 369 : 370}` })
    console.log('更多')
  }
}
HomeStore.GirlTab = function (type) {
  if (type === 1) {
    const { girl } = this.Group
    this.Group.girl = (girl + 1) % 3
  } else {
    Taro.navigateTo({ url: `../../pages/base/channel?id=370` })
    console.log('女生更多')
  }
}
HomeStore.BoyTab = function (type) {
  if (type === 1) {
    const { boy } = this.Group
    this.Group.boy = (boy + 1) % 3
  } else {
    Taro.navigateTo({ url: `../../pages/base/channel?id=369` })
    console.log('男生更多')
  }
}
HomeStore.FallsDown = function () {
  const count = 4
  const start = this.Falls.length
  // const res = await wxPromise('request', { url: `http://192.168.15.32:8010/Book/falls?start=${start}&count=${count}` })
  wxPromise('request', { url: `http://192.168.15.32:7001/book/falls?start=${start}&count=${count}` }).then(res => {
    if (res.statusCode !== 200) console.log(res.errMsg)
    this.Falls = this.Falls.concat(res.data)
  })
  // runInAction(() => {
  //   console.log(res.data)
  //   console.log(this.Falls)
  // })
}

export default HomeStore
