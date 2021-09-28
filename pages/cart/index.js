// pages/cart/index.js
Page({

  /**
   * Page initial data
   */
  data: 
  {
    address: {},
    cart: [],
    all_checked: false,
    total_number: 0,
    total_price: 0
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
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart");

    this.setData
    ({
      address
    });
    this.set_cart(cart);
  },

  /**
   * check if the Select All button checkbox should be checked
   * calculate the total price for all goods
   */
  set_cart(cart)
  {
    let all_checked = true;
    let total_price = 0;
    let total_number = 0;
    for (let count = 0; count < cart.length; count++)
    {
      if (cart[count].checked)
      {
        total_price += cart[count].num * cart[count].goods_price;
        total_number++;
      }
      else 
      {
        all_checked = false;
      }
    }

    if (cart.length === 0)
    {
      all_checked = false;
    }

    this.setData({
      cart, total_price, total_number, all_checked
    });

    wx.setStorageSync("cart", cart);
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

  // click to get the address
  async handleGetAddress()
  {
    try
    {
      // get authorization status
      let result = await getSetting();
      let scope_address = result.authSetting["scope.address"];

      if (scope_address === false)
      {
        await openSetting();
      }
      // get the shipping address
      let address_info = await chooseAddress();

      address_info.all = address_info.detailInfo 
      + address_info.countyName + address_info.cityName 
      + address_info.provinceName;

      wx.setStorageSync("address", address_info);
    }
    catch (e)
    {
      console.log(e);
    }
  },

  /**
   * assign the opposite value of all_check 
   * and change each item's checked status accordingly
   */
  onClickAllChecked()
  {
    // get the data
    let {cart, all_checked} = this.data;
    all_checked = !all_checked;
    for (let count = 0; count < cart.length; count++)
    {
      cart[count].checked = all_checked;
    }
    
    // get the data back to cart
    this.set_cart(cart);
  },

  changeItem(e)
  {
    // get the id of the item
    let id = e.currentTarget.dataset.id;
    // get the cart data
    let {cart} = this.data;
    // get the index of the item
    let index = cart.findIndex(v => v.goods_id === id);
    cart[index].checked = !cart[index].checked;
    this.set_cart(cart);
  },

  changeItemNumber(e)
  {
    // get the parameter that were passed in
    let {operation, id} = e.currentTarget.dataset;
    let {cart} = this.data;
    let index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1)
    {
      if (operation === -1)
      {
        cart.splice(index, 1);
        this.set_cart(cart);
      }
      else 
      {
        cart[index].num += operation;
        this.set_cart(cart);
      }
    }
    else 
    {
      cart[index].num += operation;
      this.set_cart(cart);
    }
  },

  async handleCheckout()
  {
    const {address, total_number} = this.data;
    if (!address.userName)
    {
      await showToast({title: "You have not selected an address."});
      return;
    }
    if (total_number === 0)
    {
      await showToast({title: "You have not selected any goods."});
      return;
    }
  }
})