(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-pointsMall-exchangeshop"],{"0331":function(t,e,i){var n=i("2eb7");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("7ae9408e",n,!0,{sourceMap:!1,shadowMode:!1})},"22a9":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"banner"},[n("v-uni-swiper",{staticClass:"swiper",attrs:{autoplay:!0,interval:3e3,duration:1e3,circular:!0}},t._l(t.shopList.data.activity_banner,(function(e,i){return n("v-uni-swiper-item",{key:i,on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goOther(e)}}},[n("img",{attrs:{src:t.cdnUrl+e.image,alt:""}})])})),1)],1),n("v-uni-view",{staticClass:"zone"},t._l(t.zoneObj,(function(e,i){return n("v-uni-view",{key:i,staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goZone(i)}}},[n("v-uni-view",{staticClass:"itemImg"},[n("v-uni-image",{attrs:{src:e.img,mode:""}})],1),n("v-uni-view",{staticClass:"itemText"},[t._v(t._s(e.text))])],1)})),1),n("v-uni-view",{staticClass:"headTitle"},t._l(t.headTitlt,(function(e,i){return n("v-uni-view",{key:e,staticClass:"headTitleItem font-24",class:{action:t.headColor==i},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getColor(i)}}},[n("v-uni-view",{staticStyle:{display:"flex"}},[n("v-uni-view",[t._v(t._s(e))]),i>0?n("v-uni-view",{staticStyle:{position:"relative"}},[n("span",{staticClass:"iconfont icon-paixujiantoushang",class:0==t.upSelct&&i==t.headColor?"icon-style1":"icon-style"}),n("span",{staticClass:"iconfont icon-paixujiantouxia",class:1==t.upSelct&&i==t.headColor?"icon-style1":"icon-style",staticStyle:{position:"absolute",transform:"translateX(-100%)"}})]):t._e()],1)],1)})),1),n("v-uni-view",{staticClass:"bodyConent"},t._l(t.shopList.data.list,(function(e,a){return n("v-uni-view",{staticClass:"bodyConentItem",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goInfor(e)}}},[n("v-uni-view",{staticClass:"itemImg"},[n("v-uni-image",{attrs:{src:t.cdnUrl+e.goods_icon}})],1),n("v-uni-view",{staticClass:"itemText"},[n("v-uni-view",{staticClass:"itemTitle"},[t._v(t._s(e.goods_name))]),1==e.goods_type?n("v-uni-view",{staticClass:"itemPrice"},[0!=e.goods_score_cost?n("span",{staticStyle:{"margin-left":"5rpx"}},[t._v(t._s("￥"+t.$returnFloat(e.goods_score_cost)+"+"))]):t._e(),n("v-uni-image",{attrs:{src:i("400e").replace(/^\./,"")}}),1==e.goods_type?n("span",[t._v(t._s(t.$returnFloat(e.goods_integral))+"积分")]):t._e()],1):t._e(),0==e.goods_type?n("v-uni-view",{staticClass:"itemPrice"},[0!=e.goods_cost?n("span",{staticStyle:{"margin-left":"5rpx"}},[t._v(t._s("￥"+t.$returnFloat(e.goods_cost)))]):t._e()]):t._e(),n("v-uni-view",{staticClass:"itemNumber"},[t._v(t._s(e.goods_sale)+"件已兑换")])],1)],1)})),1)],1)},o=[]},"23e1":function(t,e,i){"use strict";(function(t){var n=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("2909")),o={data:function(){return{cdnUrl:this.$cdnUrl,headTitlt:["综合","积分","兑换量"],headColor:0,showPop:!0,zoneObj:[{img:"../../static/exchange4.png",text:"助农产品"},{img:"../../static/fenlei.png",text:"商品分类"},{img:"../../static/exchange3.png",text:"我的积分"},{img:"../../static/exchange2.png",text:"最新上架"}],images:[],pageIndex:1,upSelct:0,shopList:{data:{page:1,activity_banner:[],list:[]}}}},onShow:function(){this.pageIndex=1,this.shopList={data:{activity_banner:[],list:[],page:1}},this.ajaxIndexInfo()},onReachBottom:function(){this.pageIndex<this.shopList.page&&(this.pageIndex++,this.ajaxIndexInfo())},methods:{goOther:function(t){1==t.type&&uni.navigateTo({url:"exchangeGoodsDetail?id="+t.content})},ajaxIndexInfo:function(){var t=this;t.request({url:"ugo/api/app.php?c=account/getScoreCenterList",data:{type:this.headColor+1,up:t.upSelct+1,limit:20,page:t.pageIndex}}).then((function(e){e.data.success?t.shopList.data.list.length>0?t.shopList.data.list=[].concat((0,a.default)(t.shopList.data.list),(0,a.default)(e.data.data.list)):t.shopList=e.data:uni.showToast({title:e.message,icon:"none"})}))},goZone:function(t){0==t||3==t?uni.navigateTo({url:"./hotgoods?type="+t}):2==t?uni.redirectTo({url:"index"}):1==t&&uni.navigateTo({url:"commodityClassification"})},getColor:function(t){this.headColor==t&&(this.upSelct=!this.upSelct),this.headColor=t,this.pageIndex=1,this.shopList.data.list=[],this.ajaxIndexInfo()},goInfor:function(t){uni.navigateTo({url:"exchangeGoodsDetail?id="+t.goods_index})},popclose:function(){t("log","点击了Close"," at pages/pointsMall/exchangeshop.vue:177"),this.showPop=!1},popOk:function(){t("log","点击了ok"," at pages/pointsMall/exchangeshop.vue:182"),this.popclose()}}};e.default=o}).call(this,i("0de9")["log"])},"2eb7":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.icon-style[data-v-db8f290c]{color:#ccc}.icon-style1[data-v-db8f290c]{color:#333}.banner[data-v-db8f290c]{width:100%;height:%?300?%}.banner .swiper[data-v-db8f290c]{width:100%;height:%?300?%}.banner img[data-v-db8f290c]{width:100%;height:100%}.zone[data-v-db8f290c]{height:%?189?%;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-sizing:border-box;box-sizing:border-box;padding:%?20?% 0;border-bottom:%?20?% solid #f5f5f5}.zone .item[data-v-db8f290c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-around;justify-content:space-around}.zone .item .itemImg[data-v-db8f290c]{width:%?88?%;height:%?88?%;text-align:center}.zone .item .itemImg uni-image[data-v-db8f290c]{width:100%;height:100%}.zone .item .itemText[data-v-db8f290c]{height:%?25?%;font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#333}.headTitle[data-v-db8f290c]{height:%?60?%;line-height:%?60?%;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around}.headTitle .headTitleItem[data-v-db8f290c]{margin-top:%?10?%;text-align:center}.headTitle .action[data-v-db8f290c]{color:red}.bodyConent[data-v-db8f290c]{padding:%?0?% %?30?% %?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-content:flex-start;align-content:flex-start}.bodyConent .bodyConentItem[data-v-db8f290c]{margin-top:%?20?%;width:%?335?%;background:#fff;-webkit-border-radius:%?10?%;border-radius:%?10?%;-webkit-box-shadow:0 0 2px #b4b8bf;box-shadow:0 0 2px #b4b8bf}.bodyConent .bodyConentItem .itemImg[data-v-db8f290c]{height:%?335?%}.bodyConent .bodyConentItem .itemImg uni-image[data-v-db8f290c]{width:100%;height:100%}.bodyConent .bodyConentItem .itemText[data-v-db8f290c]{padding:%?20?%}.bodyConent .bodyConentItem .itemText .itemTitle[data-v-db8f290c]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#333;overflow:hidden;-webkit-line-clamp:2;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical}.bodyConent .bodyConentItem .itemText .itemPrice[data-v-db8f290c]{line-height:%?50?%;font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#ff3f3f}.bodyConent .bodyConentItem .itemText .itemPrice uni-image[data-v-db8f290c]{width:%?26?%;height:%?26?%}.bodyConent .bodyConentItem .itemText .itemNumber[data-v-db8f290c]{height:%?22?%;font-size:%?22?%;font-family:PingFang SC;font-weight:400;color:#999}',""]),t.exports=e},"400e":function(t,e){t.exports="data:image/png;base64,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"},9055:function(t,e,i){"use strict";i.r(e);var n=i("23e1"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},d15e:function(t,e,i){"use strict";var n=i("0331"),a=i.n(n);a.a},e557:function(t,e,i){"use strict";i.r(e);var n=i("22a9"),a=i("9055");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("d15e");var s,c=i("f0c5"),d=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"db8f290c",null,!1,n["a"],s);e["default"]=d.exports}}]);