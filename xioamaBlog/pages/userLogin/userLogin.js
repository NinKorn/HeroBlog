// pages/login/login.js
const app = getApp()
Page({
  data: {
    error: false,
    errorText: '',
    userName: "",
    password: ""
  },
  getUserName(e) {
    this.setData({
      userName: e.detail.detail.value,
      error: false
    })
  },
  getPass(e) {
    this.setData({
      password: e.detail.detail.value,
      error: false
    })
  },
  //登陆
  handleClick() {
    console.log(this.data, 11);
    if (this.data.userName !== '' && this.data.resPassword !== '') {
      let url = app.httpURL.url + '/user';
      let data = {
        userName: this.data.userName,
        password: this.data.password
      }
      app.wxRequest('GET', url, data, (res) => {
        console.log(res);

        if (res.status == 200) {
          let userInfo = JSON.stringify(res.data[0]);
          console.log(userInfo);
          wx.setStorage({
            key: 'userInfo',
            data: userInfo
          });
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 2000 //持续的时间
          });
          //跳转首页
          setTimeout(()=>{
            wx.switchTab({
              url: '../list/list'　　 // 页面 B
            })
          },2000);
          
        }else {
          this.setData({
            errorText: res.msg,
            error:true
          });
          
        }
      })
    } else {
      // 密码输入不正确！请重新输入
      this.setData({
        errorText: '用户名或密码不能为空'
      });
      this.setData({
        error: true
      });
    }
  },
  goRegister() {
    wx.navigateTo({
      url: '../register/register'　　 // 页面 B
    })
  }
})