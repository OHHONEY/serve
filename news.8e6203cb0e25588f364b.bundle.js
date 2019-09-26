(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["news"],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/subPage/news/style.css":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/postcss-loader/src!./src/subPage/news/style.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".news-content {\\n    padding: 0 2.2rem;\\n    margin: 2px 0 28px;\\n}\\n\\n.news-content p {\\n    margin: .3rem 0;\\n    text-indent: 24px;\\n}\\n\\n.news-title {\\n    background: -webkit-linear-gradient(top, #A1C4FD, #C2E9FB);\\n    padding: .63rem 0;\\n    text-align: center;\\n}\\n\\n.news-title h6 {\\n    font-size: 16px;\\n    color: #364146;\\n    margin: .22rem;\\n}\\n\\n@media (max-width: 768px) {\\n    .news-content {\\n        padding: 0 .6rem;\\n    }\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/subPage/news/style.css?./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/postcss-loader/src");

/***/ }),

/***/ "./src/assets/data/news.json":
/*!***********************************!*\
  !*** ./src/assets/data/news.json ***!
  \***********************************/
/*! exports provided: newsList, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"newsList\\\":[{\\\"title\\\":\\\"从汽车跨界到软件 全国首家信息安全上市企业诞生记\\\",\\\"graphicContent\\\":[{\\\"img\\\":\\\"img\\\",\\\"text\\\":\\\"我们品实人，忙碌又充实，收获满满的2016年刚刚过去。就在农历年2016年年底，春节假期前，品实刚刚组织了一次公司旅游，福利对象是公司所有的正式员工，目的地是风景优美充满传奇色彩的韩国济州岛。\\\\n\\\\n 品实一直以来都是以人为本的理念，最大化的让每一位员工都能感受到充实上班，开心休假。只有劳逸结合，才能让所有的品实人保持高涨的激情，积极热情的去对待工作。共同旅行的几天，也增进了大家的感情交流，同吃同住，一块玩耍，品实这个大家庭的欢声笑语让导游都甚是羡慕，韩国的导游欧巴临别前说从未见过这么融洽的公司氛围，让人愉悦轻松。\\\"},{\\\"img\\\":\\\"\\\",\\\"text\\\":\\\"旅程的安排也是非常贴心：既有济州岛优美的风景胜地也有当地名俗文化的体验；既能登上成山日出峰领略火山岩的壮丽风景也有免税店女同事热爱的买买买。照顾到每位同事的旅游感受。品实人在年底假期，慢下一年忙碌的步伐，在异国他乡感受轻松愉悦的旅行时光。\\\"}]},{\\\"title\\\":\\\"1\\\",\\\"graphicContent\\\":[{\\\"img\\\":\\\"img\\\",\\\"text\\\":\\\"我们品实人，忙碌又充实，收获满满的2016年刚刚过去。就在农历年2016年年底，春节假期前，品实刚刚组织了一次公司旅游，福利对象是公司所有的正式员工，目的地是风景优美充满传奇色彩的韩国济州岛。 品实一直以来都是以人为本的理念，最大化的让每一位员工都能感受到充实上班，开心休假。只有劳逸结合，才能让所有的品实人保持高涨的激情，积极热情的去对待工作。共同旅行的几天，也增进了大家的感情交流，同吃同住，一块玩耍，品实这个大家庭的欢声笑语让导游都甚是羡慕，韩国的导游欧巴临别前说从未见过这么融洽的公司氛围，让人愉悦轻松。\\\"},{\\\"img\\\":\\\"\\\",\\\"text\\\":\\\"旅程的安排也是非常贴心：既有济州岛优美的风景胜地也有当地名俗文化的体验；既能登上成山日出峰领略火山岩的壮丽风景也有免税店女同事热爱的买买买。照顾到每位同事的旅游感受。品实人在年底假期，慢下一年忙碌的步伐，在异国他乡感受轻松愉悦的旅行时光。\\\"}]}]}\");\n\n//# sourceURL=webpack:///./src/assets/data/news.json?");

/***/ }),

/***/ "./src/subPage/news/initNews.js":
/*!**************************************!*\
  !*** ./src/subPage/news/initNews.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (content) {\n    let div = document.createElement('div')\n    // 插入新闻图文消息\n    for (let i = 0; i < content.length; i++) {\n        if (content[i].text) {\n            let p = document.createElement('p')\n            p.innerText = content[i].text\n            div.appendChild(p)\n        }\n\n        if (content[i].img) {\n            let img = new Image()\n            img.src = content[i].img\n            div.appendChild(img)\n        }\n\n    }\n\n    return div\n});\n\n//# sourceURL=webpack:///./src/subPage/news/initNews.js?");

/***/ }),

/***/ "./src/subPage/news/news.html":
/*!************************************!*\
  !*** ./src/subPage/news/news.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"page_news\\\">\\n    <div class=\\\"news-title\\\">\\n        <h3>新闻资讯</h3>\\n        <h6></h6>\\n    </div>\\n    <div id=\\\"news-content\\\" class=\\\"news-content\\\"></div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/subPage/news/news.html?");

/***/ }),

/***/ "./src/subPage/news/news.js":
/*!**********************************!*\
  !*** ./src/subPage/news/news.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _news_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./news.html */ \"./src/subPage/news/news.html\");\n/* harmony import */ var _news_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_news_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_data_news_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/data/news.json */ \"./src/assets/data/news.json\");\nvar _assets_data_news_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../assets/data/news.json */ \"./src/assets/data/news.json\", 1);\n/* harmony import */ var _initNews__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initNews */ \"./src/subPage/news/initNews.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ \"./src/subPage/news/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _router_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../router/index */ \"./src/router/index.js\");\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n    mount(container) {\n        // console.log(location.search)\n        container.innerHTML = _news_html__WEBPACK_IMPORTED_MODULE_0___default.a\n        _router_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"].start()\n\n        let newsList = _assets_data_news_json__WEBPACK_IMPORTED_MODULE_1__.newsList,\n            title = decodeURIComponent(location.hash).split('=')[1],\n            content = ''\n\n        document.querySelector('.news-title > h6').innerHTML = title\n        for (let i = 0; i < newsList.length; i++) {\n            if (title === newsList[i].title) content = newsList[i].graphicContent\n        }\n\n        document.getElementById('news-content').appendChild(Object(_initNews__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(content))\n    }\n});\n\n//# sourceURL=webpack:///./src/subPage/news/news.js?");

/***/ }),

/***/ "./src/subPage/news/style.css":
/*!************************************!*\
  !*** ./src/subPage/news/style.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./style.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/subPage/news/style.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./style.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/subPage/news/style.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./style.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/subPage/news/style.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/subPage/news/style.css?");

/***/ })

}]);