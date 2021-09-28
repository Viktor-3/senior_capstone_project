// import module to send request
// must have complete path
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    // Slideshow array
    swiper_list: [],
    // navigation array
    navigation_list: [],
    // floor array
    floor_list: []
  },

  /**
   * Triggers when page loads
   */
  onLoad: function(options)
  {
    // send asynchronous request to get data of slideshow
    this.get_swiper_list();
    this.get_floor_list();
  },

  // get data of slideshow
  get_swiper_list()
  {
    // this url is partial, the base_url is defined in request/index.js 
    request({url:"swiper"})
    .then(result => {
      this.setData({swiper_list: result})
    })
  },

  // get data of floor
  get_floor_list()
  {
    request({url:"floor"})
    .then(result => {
      this.setData({floor_list: result})
    })
  }
})