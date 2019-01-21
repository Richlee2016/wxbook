import { observable, toJS, runInAction } from 'mobx'
import Taro from '@tarojs/taro'
import { BookGetRequest } from './utils'
const PREFIX = 'http://192.168.15.32:7001'
const DataBase = observable({
  // banner
  Banner: { id: 0, banner: '', description: '', isLower: false, list: [] },
  get BannerFalls () {
    return this.Banner.list
  },
  // channel 频道
  Channel: { list: [] },
  Category: { male: {}, femal: {} },
  Rank: [],
  Recommend: { start: 0, count: 5, isLower: false, list: [] }
})

DataBase.FetchBanner = async function (id) {
  const count = 5
  const { list, isLower } = this.Banner
  if (isLower) return false
  const start = list.length
  const res = await BookGetRequest(`/store/v0/fiction/list/${id}?start=${start}&count=${count}`)
  if (res.statusCode !== 200) return false
  runInAction(() => {
    if (start === 0 && this.Banner.id !== id) {
      this.Banner = Object.assign(this.Banner, res.data)
      this.Banner.id = id
      this.Banner.isLower = false
    } else {
      if (res.data.list.length < count) {
        this.Banner.isLower = true
        this.Banner.list = list.concat(res.data.list)
      } else {
        this.Banner.list = list.concat(res.data.list)
      }
    }
  })
}

DataBase.FetchChannel = async function (id) {
  const res = await BookGetRequest(`/hs/v3/channel/${id}`)
  if (res.statusCode !== 200) return false
  runInAction(() => {
    this.Channel = res.data
  })
}

DataBase.FetchCategory = async function () {
  const res = await BookGetRequest('/hs/v0/android/store/category')
  if (res.statusCode !== 200) return false
  runInAction(() => {
    this.Category = res.data
  })
}

DataBase.FetchRank = async function () {
  const res = await BookGetRequest('/store/v0/ad/ranks')
  if (res.statusCode !== 200) return false
  runInAction(() => {
    this.Rank = res.data
  })
}

DataBase.FetchRecommend = async function () {
  const { start, count, list, isLower } = this.Recommend
  if (isLower) return
  const res = await BookGetRequest(`/rock/book/recommend?start=${start}&count=${count}&type=4`)
  if (res.statusCode !== 200) return false
  this.Recommend.start = start + count
  runInAction(() => {
    if (res.items.length < count) {
      this.Recommend.isLower = true
    }
    this.Recommend.list = list.concat(res.data.items)
  })
}

export default DataBase
