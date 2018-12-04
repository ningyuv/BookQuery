const optionMap = {
  fieldCodes: {
    '任意词': 'any',
    '题名': '02',
    '责任者': '03',
    '主题词': '04',
    'ISBN': '05',
    '分类号': '07',
    '索书号': '08',
    '出版社': '09',
    '丛书名': '10'
  },
  sortFields: {
    '相关度': 'relevance',
    '入藏日期': 'cataDate',
    '题名': 'title',
    '责任者': 'author',
    '索书号': 'callNo',
    '出版社': 'publisher',
    '出版日期': 'pubYear'
  },
  sortTypes: {
    '升序排列': 'asc',
    '降序排列': 'desc'
  }
}
var postDatas = {
  searchWords: [{
    fieldList: [{
      fieldCode: null,
      fieldValue: null
    }]
  }],
  filters: [],
  limiter: [],
  sortField: "relevance",
  sortType: "desc",
  pageSize: 20,
  pageCount: 1,
  locale: "",
  first: true
}
function bookDetail(code, value, fn){
  if(!value) return
  const baseURL = 'http://seat.stdu.edu.cn:8080/opac/ajax_search_adv.php'
  postDatas.searchWords[0].fieldList[0].fieldCode = optionMap.fieldCodes[code]
  postDatas.searchWords[0].fieldList[0].fieldValue = value
  wx.request({
    url: baseURL,
    data: postDatas,
    header: {},
    method: 'POST',
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
  bookDetail: bookDetail,
  doubanBook: doubanBook,
  simpleSearch: simpleSearch,
  detailPage: detailPage,
  lentInfo: lentInfo
}