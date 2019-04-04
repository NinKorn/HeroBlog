//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    blogList: []
  },
  //事件处理函数
  onLoad: function() {
    var that = this;
    let url = app.httpURL.url + '/getblog';
    let data ={
      page:0,
      size:10
    }
    app.wxRequest('GET', url, data, (res) => {
      console.log(res);
      res.data.forEach(item => {
        var Y = item.time.split('T')[0];
        var H = item.time.split('T')[1].split('.')[0];
        item.time = Y + '  ' + H;
      });
      that.setData({
        blogList: res.data
      })
    })
  },
  //上拉加载
  onReachBottom() {
  }
})