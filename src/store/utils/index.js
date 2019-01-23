import Taro from '@tarojs/taro'
export const wxPromise = (name, options) => {
  return new Promise((resolve, reject) => {
    Taro[name](Object.assign(options || [], {
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    }))
  })
}

export const BookGetRequest = async (url) => {
  console.log(url)
  const res = await wxPromise('request', {
    url: 'http://192.168.15.32:7001' + '/book/proxy',
    method: 'POST',
    data: {
      url
    }
  })
  return res
}

export const fetchFalls = (Data) => {
  // const count = 5
  // const { list, isLower } = Data
  // if (isLower) return false
  // const start = list.length
  // const res = await wxPromise('request', {
  //   url: PREFIX + '/book/proxy',
  //   method: 'POST',
  //   data: {
  //     url: `/store/v0/fiction/list/${id}?start=${start}&count=${count}`
  //   }
  // })
  // if (res.statusCode !== 200) return false
  // runInAction(() => {
  //   if (start === 0 && Data.id !== id) {
  //     Data = Object.assign(Data, res.data)
  //     Data.id = id
  //     Data.isLower = false
  //   } else {
  //     if (res.data.list.length < count) {
  //       Data.isLower = true
  //       Data.list = list.concat(res.data.list)
  //     } else {
  //       Data.list = list.concat(res.data.list)
  //     }
  //   }
  // })
}
