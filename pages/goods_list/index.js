// pages/goods_list/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * Page initial data
   */
  data: 
  {
    goods_lists: []
  },

  // parameter of port/interface
  QueryParams:
  {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // initialize the total number of pages
  total_pages: 1,

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) 
  {
    this.QueryParams.cid = options.cid;
    this.get_goods_list();

    wx.showLoading
    ({
      title: 'Loading',
    })

    setTimeout(function () {wx.hideLoading()}, 12000)
  },

  /**
   * slide the page
   * must find event for bottom
   * check if there is a next page, if not notify, if yes go to the next page
   * must obtain total page number: Math.ceil(total / page size)
   * must make a joint instead of a replacement when request for "next page"
 */

  // obtain the data of goods list
  async get_goods_list()
  {
    const resolve = await request({url:"search", data: this.QueryParams});
    // obtain total number of pages
    const total = resolve.total;
    // calculate total number of pages
    
    this.total_pages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData
    ({
      // joint array
      goods_lists: [...this.data.goods_lists, ...resolve.goods]
    })

    // close refresh window
    wx.stopPullDownRefresh();
  },

  /**
   * refresh the page(must start a configuration item in the json file)
   * need to reset the array
   * must reset the pagesize to 1
   * must resend the request
   * need to manually close waiting affect when requested 
   */
  onPullDownRefresh()
  {
    // reset the array
    this.setData
    ({
      goods_lists:[]
    })
    // reset page size
    this.QueryParams.pagenum = 1;
    // resend the request
    this.get_goods_list();  
  }
})