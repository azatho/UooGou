(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-supplier-wuliu"],{"1b8e":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{visible:!1,falg:!0,goods_sort:[],name:"请选择",express_name:"",value:[0],indicatorStyle:"height:50px"}},created:function(){this.getClassifyList()},methods:{select:function(){this.visible=!0},getClassifyList:function(){var e=this;this.request({url:"ugo/api/app.php?c=supplier/expressListV1"}).then((function(t){t.data.success&&(e.goods_sort=t.data.data,e.goods_sort.length&&(e.express_name=e.goods_sort[0].express_name))}))},bindChange:function(e){var t=e.detail.value[0];this.express_name=this.goods_sort[t].express_name,this.value=e.detail.value},sure:function(){this.name=this.express_name,this.visible=!1,this.$emit("getfreight_id",this.express_name)},cancel:function(){this.visible=!1}}};t.default=n},"552e":function(e,t,i){"use strict";i.r(t);var n=i("d05fa"),a=i("dd59");for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);i("9686");var r,o=i("f0c5"),l=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"03faad58",null,!1,n["a"],r);t["default"]=l.exports},"6b5b":function(e,t,i){var n=i("8240");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("ae4a7f00",n,!0,{sourceMap:!1,shadowMode:!1})},8240:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.msk[data-v-03faad58]{width:100%;height:100%;position:fixed;left:0;top:0;z-index:1000;background:rgba(0,0,0,.5)}.showModel[data-v-03faad58]{width:100%;height:%?700?%;position:fixed;bottom:0;left:0;z-index:111111;background-color:#fff}.showModel uni-picker-view[data-v-03faad58]{width:100%;height:%?600?%}.showModel .item[data-v-03faad58]{line-height:34px;text-align:center}.showModel .btns[data-v-03faad58]{display:-webkit-box;display:-webkit-flex;display:flex}.showModel .btns uni-view[data-v-03faad58]{width:50%;height:%?100?%;line-height:%?100?%;text-align:center}.showModel .sure[data-v-03faad58]{border-right:%?1?% solid #f5f5f5;color:red}',""]),e.exports=t},9686:function(e,t,i){"use strict";var n=i("6b5b"),a=i.n(n);a.a},a8d5:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAACOUlEQVQ4T5WVz2vTcBjGn/ebpOlFSFVUKIypd/+SIcy53jerRYVuTgsiiHETEdlQKqUmtZvowb9A8LDhP7F58eTB0JOgtwSbV96S70iztKk9pjyf53l/5A35vr/EzC0AVQDvDMN4U6/Xf2HGH3me9wnANQAlAD8BvAjD8EOz2fwzC4N8319j5nUA84lAIDsAdhuNxu8iCPX7/VNRFF1VSm0CuJQIAmZ+SUTviyAkgna7bZfL5etxHG8S0UUA8nyUJAzD/rRyRgANMU1zyTCMrVSSUU8AfJyU5BggENd1y9VqtTYcDp9kkrySCeVBxgA6iWVZi0qpZwAup3sSRdFetpwTAA0plUrLRPQ0U852GIa7aUguQENs25Yl2yIiPR3pyRhkIiCTxE2S6OlsA9iTnkwFpEa8KEmYeZ6ITD1imU4hIAVZYObHAK4kexIAeDsTQCCe580R0WtmXgBgAYiJ6MtMgG63e04ptQbgJoCzyWi/A3heCOj1eufjOL7LzHeI6AwABvCNiB5alrU/FdDpdC4YhnGfiFYBnBYxMx8ppR4EQXDguu7fiQARm6YpsRsAKonzIRFtOI7ztVarDaWUXEASewNAXTsDEHHLcZx9Lc4FpJxvpcRS83raWb/FYwkSsTjfKHI+AUhiy2lLOx8R0b085zGAiJlZbqM0bNTtSTVnb6Rc5TkAt//X+TiB7/s7zLwio2JmWc9DAK1KpXKQ7vak6ywJesl3wQbwg5kfDQaDz7IkRSdd/v8HOFYJ4/2u3MgAAAAASUVORK5CYII="},d05fa:function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"goodsName",staticStyle:{display:"flex","justify-content":"space-between","border-top":"1px solid #f5f5f5",padding:"20rpx 0"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.select.apply(void 0,arguments)}}},[n("v-uni-view",{staticStyle:{"font-size":"26rpx","font-family":"PingFang SC","font-weight":"400",color:"#333333"}},[e._v("物流公司")]),n("v-uni-view",{staticClass:"right",staticStyle:{display:"flex","align-items":"center"}},[n("v-uni-text",{staticStyle:{margin:"0 20rpx"}},[e._v(e._s(e.name))]),n("v-uni-image",{staticStyle:{width:"17rpx",height:"32rpx"},attrs:{src:i("a8d5").replace(/^\./,""),mode:""}})],1)],1),e.visible?n("v-uni-view",{staticClass:"msk"},[n("v-uni-view",{staticClass:"showModel"},[n("v-uni-picker-view",{staticClass:"picker-view",attrs:{"indicator-style":e.indicatorStyle,value:e.value},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[n("v-uni-picker-view-column",e._l(e.goods_sort,(function(t,i){return n("v-uni-view",{key:i,staticClass:"item"},[e._v(e._s(t.express_name))])})),1)],1),n("v-uni-view",{staticClass:"btns"},[n("v-uni-view",{staticClass:"cancel",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancel.apply(void 0,arguments)}}},[e._v("取消")]),n("v-uni-view",{class:e.falg?"sure":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sure.apply(void 0,arguments)}}},[e._v("确定")])],1)],1)],1):e._e()],1)},s=[]},dd59:function(e,t,i){"use strict";i.r(t);var n=i("1b8e"),a=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a}}]);