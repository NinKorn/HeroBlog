//app.js
App({
  httpURL: {
    url: 'http://127.0.0.1:5001'
  },
  //封装请求
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function(res) {
        callback(res.data);
      },
      fail: function(err) {
        errFun(res);
      }
    })
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code, 111);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // let url = 'https://api.weixin.qq.com/sns/jscode2session?' + 'appid=wx42229426ec94162d&secret=70d8e2239650137a20c7e8217cdf4fba&js_code=' + res.code + '&grant_type=authorization_code';
        let url = this.httpURL.url + '/user';
        let data = {
          code: res.code
        };
        this.wxRequest('GET', url, {}, (resl) => {
          console.log(resl);
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res, 'aa');
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})