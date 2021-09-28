// pages/goods_detail/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * Page initial data
   */
  data: 
  {
    goods_object: {}
  },

  goodsinfo: {},

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.get_goods_detail(goods_id);
  },

  /**
   * get data of goods detail
   * @param goods_id
   */
  async get_goods_detail(goods_id)
  {
    const goods_object = await request({url: "detail", data: {goods_id}});
    this.goodsinfo = goods_object;
    this.setData({
      goods_object:
      {
        goods_name: goods_object.goods_name,
        goods_price: goods_object.goods_name,
        pics: goods_object.pics
      }
    })
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

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

  // click to add to the cart
  handleAddToCart()
  {
    // obtain the array of carts from the cache
    let cart = wx.getStorageSync("cart") || [];
    // check if the goods is already in the cart
    let goods_index = cart.findIndex(v => v.goods_id === this.goodsinfo.goods_id);
    if (goods_index === -1)
    {
      // does not exist
      this.goodsinfo.num = 1;
      cart.push(this.goodsinfo);
    }
    else
    {
      // already existed
      cart[goods_index].num++;
    }
    // re-add cart data to cache
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: 'Added successfully!',
      mask: true
    })
  }
})