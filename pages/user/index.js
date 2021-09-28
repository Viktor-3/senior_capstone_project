// pages/user/index.js
Page({

  /**
   * Page initial data
   */
  data: 
  {
    userinfo: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () 
  {
    const userinfo = wx.getStorageSync("userinfo");

    this.setData({userinfo});
    if (userinfo.length != 0)
    {
      this.onLoad();
    }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  /**
   * get the user's information
   * @param option user's information
   */
  getInfo(option)
  {
    const {userInfo} = option.detail;
    wx.setStorageSync("userinfo", userInfo);
  },

})