
// 微信 api 回调转换 Promise
export const wxPromise = (name, options) => {
  return new Promise((resolve, reject) => {
    uni[name](Object.assign(options || [], {
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    }))
  })
}

export const Rxios = async (url, opt = { method: 'GET' }) => {
  const res = await wxPromise('request', {
    url: 'http://192.168.15.32:7001' + url,
    ...opt
  })
  return res
}

export const BookRequest = async (url) => {
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

