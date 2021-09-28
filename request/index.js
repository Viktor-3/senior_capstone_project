// the number of sending async request
let ajax_times = 0;
export const request = (params) =>{
  ajax_times++;
  // show loading effect
  wx.showLoading({
    title: 'Loading',
    mask: true
  });

  // define public URL
  const base_url = 'http://ice.truman.edu/~kw8735/capstone/';
  return new Promise((resolve, reject) => {
    wx.request({
      // deconstruct
      ...params,
      url: base_url + params.url,
      success:(result) => {
        resolve(result.data.message);
      },
      fail:(err) => {
        reject(err);
      },
      complete: () => 
      {
        ajax_times--;
        if (ajax_times === 0)
        {
          // close loading effect
          wx-wx.hideLoading();
        }
      }
    });
  })
}