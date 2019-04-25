// pages/write/write.js
const app = getApp();
Page({
  data: {
  },
  //提交表单
  
  bindFormSubmit(e) {
    let userid = '';
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res);
        let resJson = JSON.parse(res.data);
        console.log(resJson.data);
        userid = resJson.userId;
      },
    })
    let url = app.httpURL.url + '/addblog';
    let data = {
      title: e.detail.value.title,
      article: e.detail.value.textarea,
      userId: userid
    };
    console.log(data);
    app.wxRequest('POST', url, data, (res) => {
      if (res.status == 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000 //持续的时间
        });
      }
    })
  }
})