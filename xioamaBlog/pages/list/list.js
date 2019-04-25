//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    blogList: [],
    page:0,
    totalPage:0,
    nomore:false
  },
  //事件处理函数
  onLoad: function() {
    this.getMolist();
  },
  getMolist(){
    var that = this;
    let url = app.httpURL.url + '/getblog';
    let data = {
      page: this.data.page,
      size: 10
    }
    app.wxRequest('GET', url, data, (res) => {
      console.log(res);
      res.data.forEach(item => {
        var Y = item.time.split('T')[0];
        var H = item.time.split('T')[1].split('.')[0];
        item.time = Y + '  ' + H;
      });
      console.log(res.data);
      let list = this.data.blogList.concat(res.data);
      that.setData({
        blogList: list
      })
    });
  },
  //上拉加载
  onReachBottom() {
    console.log('aa');
    if (this.data.page * 10 > this.data.totalPage){
      console.log('没有更多');
      wx.setData({
        nomore:true
      });
      return;
    }
    let page = this.data.page+1
    console.log(page);
    this.setData({
      page: page
    });
    this.getMolist();
  }
})