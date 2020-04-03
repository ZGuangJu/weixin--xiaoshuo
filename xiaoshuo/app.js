//app.js 
var https = require('utils/https.js')
App({
  globalData: {
    domain: "https://weixin.zhangyfr.com",
    detailUrl:"https://weixin.zhangyfr.com/weixin/detail.json",
    guessUrl:"https://weixin.zhangyfr.com/weixin/guess.json",
    novelsUrl: "https://weixin.zhangyfr.com/weixin/list.json",
    catalogUrl: "https://weixin.zhangyfr.com/weixin/catalog.json",
    contentUrl: "https://weixin.zhangyfr.com/weixin/content.json",
    searchUrl: "https://weixin.zhangyfr.com/weixin/search.json",
    feedbackUrl: "https://weixin.zhangyfr.com/weixin/feedback.json",
    novelSerialNumbersUrl: "https://api.stiles.cc/novels/getNovelSerialNumbers",
    searchKeywords: "https://weixin.zhangyfr.com/weixin/hotKey.json",
    token:null,
    userInfo: null
  },
   onLaunch: function () {
     wx.getSetting({
       success(res) {
         if (!res.authSetting['scope.userInfo']) {
             wx.navigateTo({
                 url: `../login/login`
             });
         }
       },
       fail (res) {
         console.info("wx.getSetting fail");
       }
     });
     wx.login({
       success: function (res) {
         //登录成功
         if (res.code) {
           // 这里是用户的授权信息每次都不一样
           console.info(res);
         }
       }, fail: function (res) {
         console.log("wx.login fail");
       }
     });
     wx.getUserInfo({
       success: function (res) {
         console.info(res);
       }, fail: function (res) {
         console.log("没有授权，userInfo is null");
       }
     });

     this.trySetUserInfo();
     this.removeCache();
  },
  trySetUserInfo: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  removeCache:function(){
    var value = wx.getStorageSync('cateListTime')
    var nowTime = new Date().getTime();
    if(value){
      if (value < nowTime) {
        wx.removeStorage("cateList");
      }
    }
    value = wx.getStorageSync('searchKeysTime')
    if (value) {
      if (value < nowTime) {
        wx.removeStorage("searchKeysTime");
      }
    }
  }
})