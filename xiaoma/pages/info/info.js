// pages/info/info.js
const app = getApp()
Page({

  data: {
    id: '',
    blogInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    console.log(options.id);
    let url = app.httpURL.url + '/getblog/' + options.id;
    let data ={};
    app.wxRequest('GET', url, data, (res) => {
      console.log(res);
      res.data.forEach(item => {
        var Y = item.time.split('T')[0];
        var H = item.time.split('T')[1].split('.')[0];
        item.time = Y + '  ' + H;
      });
      this.setData({
        blogInfo: res.data[0]
      })
    })
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