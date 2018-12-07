// pages/books/books.js
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfos: [],
    pageCount: 1,
    haveNextPage: false,
    lastLength: 0,
    loadingTop: false,
    loadingBottom: false

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

    this.setData({
      haveNextPage: true,
      loadingTop: true
    })
    this.data.wxSearchData.value = options.title
    this.universalSearchMethod([],1)
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
    if(this.data.haveNextPage){
      this.universalSearchMethod(this.data.bookInfos, this.data.pageCount + 1)
      this.setData({
        loadingBottom: true
      })
    }
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
  universalSearchMethod: function (baseBookInfos, pageCount) {
    console.log(this.data.bookInfos, pageCount)
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    console.log(this.data.wxSearchData)
    const api = require('../../utils/api.js')
    this.setData({
      pageCount: pageCount,
      lastLength: baseBookInfos.length
    })
    var bookInfos = baseBookInfos
    api.advSearch('any', this.data.wxSearchData.value, 'relevance', pageCount, res => {
      var bookInfosPage = []
      if (res.data.content) {
        bookInfosPage = res.data.content
      }
      if(!res.data.total|| pageCount*20>res.data.total){
        that.setData({
          haveNextPage: false
        })
      }
      console.log(res.data, bookInfos)
      that.setData({
        bookInfos: bookInfos.concat(bookInfosPage),
        loadingTop: false,
        loadingBottom: false
      })
      for (var i = 0; i < bookInfosPage.length; ++i) {
        const j = i
        api.doubanBook(bookInfosPage[j].isbn, res => {
          if (res && res.data) {
            bookInfosPage[j].douban = res.data
            if (!bookInfosPage[j].douban.summary) {
              bookInfosPage[j].douban.summary = '暂无简介'
            }
          }
          else {
            bookInfosPage[j].douban = {
              "images": {
                "small": "../../images/book-default-lpic.gif",
                "large": "../../images/book-default-lpic.gif",
                "medium": "../../images/book-default-lpic.gif"
              },
              "summary": "暂无简介"
            }
          }
          console.log('bookInfos[' + parseInt(j + bookInfos.length) + '].douban')
          that.setData({
            ['bookInfos[' + parseInt(j + bookInfos.length) + '].douban']: bookInfosPage[j].douban
          })
        })
      }
    })
  },
  wxSearchFn: function (e) {
    var that = this
    that.setData({
      bookInfos: [],
      haveNextPage: true,
      loadingTop: true
    })
    that.universalSearchMethod([],1)
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
    // that.setData({
    //   ['wxSearchData.view.isShow']: false
    // })
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