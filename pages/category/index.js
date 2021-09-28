// pages/category/index.js
import {request} from "../../request/index.js";
Page({
  data: 
  {
    menu: [],
    content: [],
    selected_menu: 0,
    // content scroll bar
    scrollTop: 0
  },

  categories: [],
  /**
   * Lifecycle function--Called when page load
   * check if there is old data locally {item:Data.now(), data:[...]}
   * web: localStorage.setItem("key", "value") localStorage.getItem("key")
   * mini-program: wx.setStorageSync("key", "value") wx.getStorageSync("key") 
   * no data-type-conversion in mini-program
   * if not, send a new request
   * if yes and the data is not outdated, use data in local storage
   */
  onLoad: function (options) 
  {
    // obtain data in local storage
    const categories = wx.getStorageSync("cates");
    // check if exists
    if(!categories)
    {
      this.get_categories();
    }
    else 
    {
      // there is old data, must define a time to check if outdated
      // the timeout is set to 2 mins
      if (Date.now() - categories.time > 12000)
      {
        // resend the request
        this.get_categories();
      }
      else
      {
        // may use old data
        this.categories = categories.data;
        let menu = this.categories.map(v => v.cat_name);
        let content = this.categories[0].children;
        this.setData
        ({
          menu, content
        })
      }
    }
  },

  // obtain category data
  async get_categories()
  {
    // use SE7 async await to send request
    // this url is partial, the base_url is defined in request/index.js 
    const resolve = await request({url:"category"});
    this.categories = resolve;

    // save interface data into local storage
    wx.setStorageSync('cates', {time: Date.now(), data: this.categories});
    // construct the menu
    let menu = this.categories.map(v => v.cat_name);

    // construct the content
    let content = this.categories[0].children;
    this.setData
    ({
      menu, content
    })
  },

  // click event for the menu
  handleItemTap(e)
  {
    // obtain index of selected title
    // assign values to selected menus
    // reveal the content based on different index
    const {index} = e.currentTarget.dataset;
    
    let content = this.categories[index].children;
    this.setData({selected_menu:index, content, scrollTop:0})
  }
})