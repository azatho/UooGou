(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-feedbackList"],{"0e69":function(t,e,n){"use strict";n.r(e);var a=n("3dbc"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},"3dbc":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{feedbackList:[],page:0,pageCount:0}},methods:{init:function(){var e=this;this.request({url:"ugo/api/app.php?c=account/getFeedbackList",data:{token:uni.getStorageSync("token"),page:e.page}}).then((function(t){e.pageCount=t.data.pageCount;for(var n=0;n<t.data.data.list.length;n++)t.data.data.list[n].feedback_addtime=e.holo.formatTime(1e3*t.data.data.list[n].feedback_addtime),e.feedbackList.push(t.data.data.list[n])}),(function(e){t("log",e," at pages/my/feedbackList.vue:53")}))},getDetail:function(t){uni.navigateTo({url:"./feedbackDetail?index="+t})}},onReachBottom:function(){this.page<this.pageCount-1&&(this.page++,this.init())},onShow:function(){this.init(),this.feedbackList=[],this.page=0}};e.default=n}).call(this,n("0de9")["log"])},"60f9":function(t,e,n){"use strict";n.r(e);var a=n("aca0"),i=n("0e69");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("8440");var c,r=n("f0c5"),d=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"121d8a52",null,!1,a["a"],c);e["default"]=d.exports},"6e63":function(t,e,n){var a=n("7065");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("ac128978",a,!0,{sourceMap:!1,shadowMode:!1})},7065:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-121d8a52]{width:100%;padding-top:%?20?%;background-color:#f6f5f8}.none[data-v-121d8a52]{font-size:%?26?%;text-align:center;margin-top:%?50?%}.panel[data-v-121d8a52]{background-color:#fff;font-size:%?26?%}.panel .title[data-v-121d8a52]{padding:%?15?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;border-bottom:%?1?% solid #f5f5f5}.panel .title .color1[data-v-121d8a52]{color:#0055f2}.panel .title .color2[data-v-121d8a52]{color:#f20000}.panel .content[data-v-121d8a52]{padding:%?15?%}.panel .content uni-text[data-v-121d8a52]{font-family:Source Han Sans CN;font-weight:300;color:#999;color:#999}.panel .content .detail[data-v-121d8a52]{font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#999;text-align:right;color:#999;margin-top:%?15?%}body.?%PAGE?%[data-v-121d8a52]{background-color:#f6f5f8}',""]),t.exports=e},8440:function(t,e,n){"use strict";var a=n("6e63"),i=n.n(a);i.a},aca0:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[0!=t.feedbackList.length?n("v-uni-view",[t._l(t.feedbackList,(function(e){return[n("v-uni-view",{key:e.feedback_content+"_0",staticStyle:{"margin-bottom":"20rpx"}},[n("v-uni-view",{staticClass:"panel"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-view",[t._v(t._s(e.feedback_addtime))]),n("v-uni-view",{class:e.feedback_handle_time>"0"?"color1":"color2"},[t._v(t._s(e.feedback_handle_time>"0"?"已回复":"未回复"))])],1),n("v-uni-view",{staticClass:"content",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.getDetail(e.feedback_index)}}},[n("v-uni-view",[n("v-uni-text",[t._v("反馈内容：")]),t._v(t._s(e.feedback_content))],1),n("v-uni-view",{staticClass:"detail"},[t._v("查看详情>>")])],1)],1)],1)]}))],2):n("v-uni-view",{staticClass:"none"},[t._v("暂无数据")])],1)},o=[]}}]);