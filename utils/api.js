function advSearch(code, value, sortMethod, pageCount, fn){
  const baseURL = 'https://stduoj.tk/bookAPI/advSearch'
  wx.request({
    url: baseURL,
    data: {
      code: code,
      value: value,
      sortMethod: sortMethod,
      pageCount: pageCount
    },
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      fn(res)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}
function doubanBook(isbn, fn){
  const baseURL = 'https://stduoj.tk/bookAPI/douban'
  wx.request({
    url: baseURL,
    data: {
      isbn: isbn
    },
    header: {
      'Content-Type': 'application/xml'
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      fn(res)
    },
    fail: function(res) {
      fn(null)
      console.log(res)
    },
    complete: function(res) {},
  })
}
function simpleSearch(name, fn){
  const baseURL = 'https://stduoj.tk/bookAPI/bookList'
  wx.request({
    url: baseURL,
    data: {
      title: name
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      fn(res)
    },
    fail: function (res) {
      console.log(res)
    },
  })
}
function detailPage(marcRecNo, fn) {
  const baseURL = 'https://stduoj.tk/bookAPI/isbn'
  wx.request({
    url: baseURL,
    data: {
      marc_no: marcRecNo
    },
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      fn(res)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}
function lentInfo(marcRecNo, fn) {
  wx.request({
    url: 'https://stduoj.tk/bookAPI/lent',
    data: {
      marc_no: marcRecNo
    },
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      fn(res)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}
module.exports = {
  advSearch: advSearch,
  doubanBook: doubanBook,
  simpleSearch: simpleSearch,
  detailPage: detailPage,
  lentInfo: lentInfo
}