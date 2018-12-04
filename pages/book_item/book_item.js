// pages/book_item/book_item.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const api = require('../../utils/api.js')
    console.log(options.item)
    var bookInfo = JSON.parse(options.item)
    console.log(bookInfo)
    this.setData({
      bookInfo: bookInfo
    })
    api.lentInfo(bookInfo.marc_no, res => {
      bookInfo.lentInfo = res.data
      for (var k = 0; k < bookInfo.lentInfo.length; ++k) {
        bookInfo.lentInfo[k].status = bookInfo.lentInfo[k].status.split('：')
      }
      that.setData({
        ['bookInfo.lentInfo']: bookInfo.lentInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})