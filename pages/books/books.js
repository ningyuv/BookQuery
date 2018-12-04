// pages/books/books.js
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfos: [],
    loading: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 45, []);
    WxSearch.initMindKeys([]);

    WxSearch.wxSearchAddHisKey(that);
    console.log(options.title)
    if(options.title == "undefined"){
      options.title = ''
      console.log(options.title)
    }
    const api = require('../../utils/api.js')
    const parser = require('../../utils/parser.js')
    this.setData({
      loading: true,
      bookInfos: [],
      ['wxSearchData.value']: options.title
    })
    api.simpleSearch(options.title, res => {
      var bookInfos = res.data
      console.log(bookInfos)
      that.setData({
        bookInfos: bookInfos,
        loading: false
      })
      for (var i in bookInfos) {
        const j = i
        api.detailPage(bookInfos[i].marc_no, res => {
          bookInfos[j].isbn = res.data
          if (bookInfos[j].isbn) {
            that.setData({
              ['bookInfos[' + j + '].isbn']: bookInfos[j].isbn
            })
            api.doubanBook(bookInfos[j].isbn, res => {
              if (res && res.data) {
                bookInfos[j].douban = res.data
                if (!bookInfos[j].douban.summary) {
                  bookInfos[j].douban.summary = '暂无简介'
                }
              }
              else {
                bookInfos[j].douban = {
                  "images": {
                    "small": "../../images/book-default-lpic.gif",
                    "large": "../../images/book-default-lpic.gif",
                    "medium": "../../images/book-default-lpic.gif"
                  },
                  "summary": "暂无简介"
                }
              }
              that.setData({
                ['bookInfos[' + j + '].douban']: bookInfos[j].douban
              })
            })
          }
        })
      }
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

  },
  tapBook: function (e) {
    console.log(e)
    var itemStr = JSON.stringify(e.currentTarget.dataset.bookinfo)
    itemStr = itemStr.replace(/=/g, ':').replace(/\?/g, ':')
    console.log('itemStr: '+itemStr)
    wx.navigateTo({
      url: '../book_item/book_item?item=' + itemStr,
    })
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    console.log(this.data.wxSearchData)
    const api = require('../../utils/api.js')
    const parser = require('../../utils/parser.js')
    this.setData({
      loading: true,
      bookInfos: []
    })
    api.simpleSearch(this.data.wxSearchData.value, res => {
      var bookInfos = res.data
      console.log(bookInfos)
      that.setData({
        bookInfos: bookInfos,
        loading: false
      })
      for (var i in bookInfos) {
        const j = i
        api.detailPage(bookInfos[i].marc_no, res => {
          bookInfos[j].isbn = res.data
          if (bookInfos[j].isbn) {
            that.setData({
              ['bookInfos[' + j + '].isbn']: bookInfos[j].isbn
            })
            api.doubanBook(bookInfos[j].isbn, res => {
              if (res && res.data) {
                bookInfos[j].douban = res.data
                if (!bookInfos[j].douban.summary) {
                  bookInfos[j].douban.summary = '暂无简介'
                }
              }
              else {
                bookInfos[j].douban = {
                  "images": {
                    "small": "../../images/book-default-lpic.gif",
                    "large": "../../images/book-default-lpic.gif",
                    "medium": "../../images/book-default-lpic.gif"
                  },
                  "summary": "暂无简介"
                }
              }
              that.setData({
                ['bookInfos[' + j + '].douban']: bookInfos[j].douban
              })
            })
          }
        })
      }
    })
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    // WxSearch.wxSearchBlur(e, that);
    that.setData({
      ['wxSearchData.view.isShow']: false
    })
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})