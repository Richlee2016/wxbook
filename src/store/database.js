import { observable, runInAction } from 'mobx'
import Taro, { getStorageSync } from '@tarojs/taro'
import { BookGetRequest } from './utils'
import _ from 'lodash'
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
const DataBase = observable({
  // banner
  Banner: { id: 0, banner: '', description: '', isLower: false, list: [] },
  get BannerFalls () {
    return this.Banner.list
  },
  // channel 频道
  Channel: { list: [] },
  Category: { male: [], femal: [] },
  Rank: [],
  Recommend: { start: 0, count: 5, isLower: false, list: [] },
  CategoryVodList: [],
  CategoryGroups: { index: 0, group: [] },
  CategoryVod: CATEGORYMODLE
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
  const res = await BookGetRequest(`/store/v0/ad/persistent?start=${start}&count=${count}&type=4`)
  if (res.statusCode !== 200) return false
  this.Recommend.start = start + count
  runInAction(() => {
    if (res.data.length < count) {
      this.Recommend.isLower = true
    }
    this.Recommend.list = list.concat(res.data)
  })
}
DataBase.SetCategoryGroup = function (index, group) {
  this.CategoryGroups.index = index
  if (group) {
    Taro.setStorageSync('categoryGroups', group)
    this.CategoryGroups.group = group
  } else {
    this.CategoryGroups.group = Taro.getStorageSync('categoryGroups')
  }
}
DataBase.FetchCategoryVod = async function ({ id, type = 'click' }) {
  id = id || this.CategoryGroups.group[this.CategoryGroups.index].category_id
  const haveVod = _.findIndex(this.CategoryVodList, ['id', id])
  if (haveVod === -1) {
    let vod = Object.assign(CATEGORYMODLE, { id })
    const { start, count, type } = vod
    const res = await BookGetRequest(`/store/v0/fiction/category/${id}?start=${start}&count=${count}&${type}=1`)
    if (res.statusCode !== 200) return false
    runInAction(() => {
      vod.list[type] = res.data
      this.CategoryVod = vod
      this.CategoryVodList.push(vod)
    })
  } else {
    const vod = Object.assign(this.CategoryVodList[haveVod], { type })
    if (vod.isLower) {
      this.CategoryVod = vod
      return
    }
    const { start, count, list } = vod
    const res = await BookGetRequest(`/store/v0/fiction/category/${id}?start=${start}&count=${count}&${type}=1`)
    console.log(res)
    if (res.statusCode !== 200) return false
    vod.start = start + count
    runInAction(() => {
      if (res.data.length < count) {
        vod.isLower = true
      }
      vod.list[type] = list[type].concat(res.data)
      this.CategoryVod = vod
    })
  }
}

export default DataBase
