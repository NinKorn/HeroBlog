// pages/login/login.js
const app = getApp()
Page({
  data: {
    error: false,
    errorText: '',
    userName: "",
    password: "",
    resPassword: "",
    school: '',
    company: ''
  },
  getUserName(e) {
    this.setData({
      userName: e.detail.detail.value
    })
  },
  getPass(e) {
    this.setData({
      password: e.detail.detail.value
    })
  },
  getresPass(e) {
    if (e.detail.detail.value !== this.data.password) {
      this.setData({
        error: true,
        errorText: '密码输入不一致！'
      });
    } else {
      this.setData({
        error: false
      });
    }
    this.setData({
      resPassword: e.detail.detail.value
    })
  },
  getSchool(e) {
    this.setData({
      school: e.detail.detail.value
    })
  },
  getCompany(e) {
    this.setData({
      company: e.detail.detail.value
    })
  },
  handleClick() {
    // console.log(this.data);
    if (this.data.userName && this.data.resPassword) {
      //注册
      let url = app.httpURL.url + '/user';
      let data = {
        userName: this.data.userName,
        password: this.data.password,
        school: this.data.school,
        company: this.data.company,
      }
      app.wxRequest('POST', url, data, (res) => {
        if (res.msg == 'ok') {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000 //持续的时间
          });
        }
        
      })

    } else {
      this.setData({
        error: true,
        errorText: '请输入用户名或密码'
      });
    }
  },
  goLogin() {
    wx.navigateTo({
      url: '../userLogin/userLogin'　　 // 页面 B
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})