(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-salesPoints"],{"48a2":function(t,a,n){t.exports=n.p+"static/img/noshop(1).9fa30672.png"},"6e9a":function(t,a,n){"use strict";var e=n("4ea4");n("99af"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=e(n("2909")),s={data:function(){return{navIndex:"0",dataList:{data:[]},pageIndex:"1"}},onShow:function(){this.navIndex=0,this.dataList={data:[]},this.pageIndex=1,this.ajaxPoint()},onReachBottom:function(){this.pageIndex<this.dataList.page&&(this.pageIndex++,this.ajaxPoint())},methods:{ajaxPoint:function(){var t=this;t.request({url:"ugo/api/app.php?c=account/getScoreList",data:{type:t.navIndex+1,limit:"20",page:t.pageIndex,status:1}}).then((function(a){a.data.success?t.dataList.data.length>0?t.dataList.data=[].concat((0,i.default)(t.dataList.data),(0,i.default)(a.data.data)):t.dataList=a.data:uni.showToast({title:a.message,icon:"none"})}))},selectNav:function(t){this.navIndex=t,this.dataList={data:[]},this.pageIndex=1,this.ajaxPoint()}}};a.default=s},ab62:function(t,a,n){"use strict";var e=n("af6f"),i=n.n(e);i.a},af6f:function(t,a,n){var e=n("facd");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=n("4f06").default;i("165da249",e,!0,{sourceMap:!1,shadowMode:!1})},b11d:function(t,a,n){"use strict";n.r(a);var e=n("eede"),i=n("d6a9");for(var s in i)"default"!==s&&function(t){n.d(a,t,(function(){return i[t]}))}(s);n("ab62");var o,r=n("f0c5"),c=Object(r["a"])(i["default"],e["b"],e["c"],!1,null,"3f46a984",null,!1,e["a"],o);a["default"]=c.exports},d6a9:function(t,a,n){"use strict";n.r(a);var e=n("6e9a"),i=n.n(e);for(var s in e)"default"!==s&&function(t){n.d(a,t,(function(){return e[t]}))}(s);a["default"]=i.a},eede:function(t,a,n){"use strict";var e;n.d(a,"b",(function(){return i})),n.d(a,"c",(function(){return s})),n.d(a,"a",(function(){return e}));var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",[0==t.dataList.data.length?e("v-uni-view",{staticStyle:{"text-align":"center"}},[e("v-uni-view",{staticClass:"noData"},[e("v-uni-view",[e("img",{staticStyle:{width:"480rpx",height:"360rpx"},attrs:{src:n("48a2"),alt:"没有数据"}})])],1),e("v-uni-view",{staticClass:"font-30",staticStyle:{color:"#999999"}},[t._v("暂无数据")])],1):t._l(t.dataList.data,(function(a,n){return e("v-uni-view",{key:n,staticClass:"data"},[e("v-uni-view",[e("v-uni-view",{staticClass:"font-26",staticStyle:{color:"#333333"}},[t._v(t._s(a.type_name))]),e("v-uni-view",{staticClass:"font-22",staticStyle:{color:"#999999","margin-top":"10rpx"}},[t._v(t._s(t.holo.formatSeconds(a.time)))])],1),e("v-uni-view",{staticClass:"num font-26",staticStyle:{color:"#999999","font-weight":"bold",height:"60rpx","line-height":"60rpx"}},[t._v(t._s(a.type>100?"-":"+")+t._s(t.$returnFloat(a.amount)))])],1)}))],2)},s=[]},facd:function(t,a,n){var e=n("24fb");a=e(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.nav[data-v-3f46a984]{height:%?80?%;line-height:%?80?%;background-color:#f5f5f5;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around}.navSelct[data-v-3f46a984]{color:#fc4950;border-bottom:%?4?% solid #fc4950}.noData[data-v-3f46a984]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:%?200?%}.data[data-v-3f46a984]{border-bottom:%?1?% solid #f5f5f5;padding:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}',""]),t.exports=a}}]);