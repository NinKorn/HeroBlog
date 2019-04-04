// pages/write/write.js
const app = getApp();
Page({
  data: {
  },
  //提交表单
  bindFormSubmit(e) {
    let url = app.httpURL.url + '/addblog';
    let data = {
      title: e.detail.value.title,
      article: e.detail.value.textarea
    };
    app.wxRequest('POST', url, data, (res) => {
      if (res.status == 200) {
       
      }
    })
  }
})