(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-common-confirmPay"],{"27d6":function(e,t,r){var n=r("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.text1[data-v-783eb1c2]{margin-top:%?67?%;margin-bottom:%?30?%;font-size:%?30?%;text-align:center}.text2[data-v-783eb1c2]{font-size:%?50?%;font-weight:700;color:#333;margin-left:%?240?%}.text4[data-v-783eb1c2]{width:%?600?%;height:%?90?%;background:#f5f5f5;-webkit-border-radius:%?4?%;border-radius:%?4?%;font-size:%?26?%;color:#666;line-height:%?90?%;text-align:center;margin:0 auto;margin-top:%?39?%;margin-bottom:%?74?%}.confirmPay[data-v-783eb1c2]{position:fixed;bottom:%?30?%;left:%?30?%;width:%?690?%;height:%?90?%;background:#f6281b;-webkit-border-radius:%?45?%;border-radius:%?45?%;text-align:center;line-height:%?90?%;color:#fff}.line20[data-v-783eb1c2]{width:%?750?%;height:%?20?%;background:#f5f5f5}.scorePay-box[data-v-783eb1c2]{height:%?100?%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.scorePay-box .left[data-v-783eb1c2]{margin-left:%?30?%;font-size:13px;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.scorePay-box .right[data-v-783eb1c2]{margin-right:%?30?%}',""]),e.exports=t},"4b80":function(e,t,r){"use strict";var n=r("7622"),i=r.n(n);i.a},"53ed":function(e,t,r){"use strict";(function(e){r("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("3ca6"),i={data:function(){return{confirmObj:{},type:"",userinfo:{score:"0"},order_id:"",order_index:"",price:"",order_total_score:"",order_send_score:"",payInfo:{},cart_index:"",jumpType:""}},methods:{carAdd:function(){var e=this;e.request({url:"ugo/api/app.php?c=rechargeOrderUgo",data:{order_index:e.order_index,order_money:e.price,order_score:e.order_total_score,type:"1"}}).then((function(t){t.data.success?(e.payInfo=t.data.data,e.wxPay()):uni.showToast({title:t.data.msg,icon:"none"})}))},wxPay:function(){var e=this;n.jweixin.ready((function(){n.jweixin.chooseWXPay({timestamp:e.payInfo.timeStamp,nonceStr:e.payInfo.nonceStr,package:e.payInfo.package,signType:"MD5",paySign:e.payInfo.paySign,success:function(t){uni.redirectTo({url:"successPay?jumpType=car&order_total_price="+e.price+"&order_total_score="+e.order_total_score})},cancel:function(e){uni.showToast({title:"支付已取消,请重新支付",icon:"none"})},fail:function(e){uni.showToast({title:"支付失败，请重新支付",icon:"none"})}})}))},prePage:function(){var e=getCurrentPages(),t=e[e.length-2];return t},confirmPay:function(){var e=this;parseInt(e.userinfo.score)<=parseInt(e.order_total_score)?uni.showToast({title:"您的积分不足，无法购买",icon:"none"}):0==parseInt(e.price)?this.interveryPay():this.carAdd()},interveryPay:function(){var e=this;e.request({url:"ugo/api/app.php?c=pay/rechargeOrderScore",data:{order_index:e.order_index,order_score:e.order_total_score}}).then((function(t){t.data.success?uni.navigateTo({url:"successPay?jumpType=car&order_total_price="+e.price+"&order_total_score="+e.order_total_score+"&good_index="+e.order_index}):uni.showToast({title:t.data.message,icon:"none"})}))},getUserInfo:function(){var t=this;t.request({url:"ugo/api/mall.php?c=getUserInfo",data:{token:uni.getStorageSync("token")}}).then((function(e){e.data.success?(t.userinfo=e.data.data,uni.setStorageSync("rank",t.userinfo.rank)):t.holo.toast({icon:"none",title:e.data.msg})}),(function(t){e("log",t," at pages/common/confirmPay.vue:203")}))}},onBridgeReady:function(){var e=this;WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:e.payInfo.appId,timeStamp:e.payInfo.timeStamp,nonceStr:e.payInfo.nonceStr,package:e.payInfo.package,signType:"MD5",paySign:e.payInfo.paySign},(function(t){if("get_brand_wcpay_request:ok"==t.err_msg){var r="";r="group"==e.jumpType?"ugo/api/app.php?c=group/checkPayOrder":"ugo/api/app.php?c=order/checkPayOrder",e.request({url:r,data:{order_index:e.order_index}}).then((function(t){t.data.success&&("group"==e.jumpType?uni.navigateTo({url:"/pages/common/successPay?order_total_price="+e.price+"&jumpType="+e.jumpType+"&tuan_id="+e.tuan_id}):uni.navigateTo({url:"/pages/common/successPay?order_total_price="+e.price+"&jumpType="+e.jumpType+"&order_total_score="+e.order_total_score}))}))}else"get_brand_wcpay_request:cancel"==t.err_msg?(uni.showToast({title:"您已取消支付",icon:"none"}),"group"==e.jumpType?setTimeout((function(){uni.navigateBack({delta:1})}),500):setTimeout((function(){uni.switchTab({url:"/pages/order/order"})}),500)):(e.holo.toast({title:"支付失败",icon:"none"}),"group"==e.jumpType?setTimeout((function(){uni.switchTab({url:"/pages/common/ptOrderList"})}),500):setTimeout((function(){uni.switchTab({url:"/pages/order/order"})}),500))}))},onShow:function(){this.getUserInfo()},onLoad:function(e){this.cart_index=e.order_id,this.order_index=e.order_index,this.price=e.price,this.order_total_score=e.order_total_score,this.order_send_score=e.send_score}};t.default=i}).call(this,r("0de9")["log"])},"5a93":function(e,t,r){"use strict";r.r(t);var n=r("53ed"),i=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);t["default"]=i.a},7622:function(e,t,r){var n=r("27d6");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=r("4f06").default;i("ddd11250",n,!0,{sourceMap:!1,shadowMode:!1})},"7c62":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"text1"},[e._v("支付金额")]),0!=e.price?n("v-uni-view",{staticClass:"text2"},[e._v("现金:  ￥"+e._s(e.$returnFloat(e.price)))]):e._e(),0!=e.order_total_score?n("v-uni-view",{staticClass:"text2"},[e._v("积分:  "+e._s(e.$returnFloat(e.order_total_score)))]):e._e(),0!=e.order_send_score?n("v-uni-view",{staticClass:"text4"},[e._v("提示：支付成功后将获得： "+e._s(e.$returnFloat(e.order_send_score))+"积分")]):e._e(),n("v-uni-view",{staticClass:"line20"}),0!=e.order_total_score?n("v-uni-view",{staticClass:"scorePay-box"},[n("v-uni-view",{staticClass:"left"},[n("v-uni-image",{staticStyle:{width:"44rpx",height:"44rpx","margin-right":"20rpx"},attrs:{src:r("0cb6").replace(/^\./,""),mode:""}}),n("v-uni-view",{staticClass:"text"},[n("v-uni-view",{},[e._v("积分支付")]),n("v-uni-view",{},[e._v("我的积分："+e._s(e.$returnFloat(e.userinfo.score)))])],1)],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-image",{staticStyle:{width:"36rpx",height:"36rpx"},attrs:{src:r("bc0f").replace(/^\./,""),mode:""}})],1)],1):e._e(),n("v-uni-view",{staticClass:"line20"}),0!=e.price?n("v-uni-view",{staticClass:"scorePay-box"},[n("v-uni-view",{staticClass:"left"},[n("v-uni-image",{staticStyle:{width:"44rpx",height:"44rpx","margin-right":"20rpx"},attrs:{src:r("0779").replace(/^\./,""),mode:""}}),n("v-uni-view",{staticClass:"text"},[e._v("微信支付")])],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-image",{staticStyle:{width:"36rpx",height:"36rpx"},attrs:{src:r("bc0f").replace(/^\./,""),mode:""}})],1)],1):e._e(),n("v-uni-view",{staticClass:"confirmPay",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.confirmPay.apply(void 0,arguments)}}},[e._v("确认支付")])],1)},a=[]},ba1f:function(e,t,r){"use strict";r.r(t);var n=r("7c62"),i=r("5a93");for(var a in i)"default"!==a&&function(e){r.d(t,e,(function(){return i[e]}))}(a);r("4b80");var o,s=r("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"783eb1c2",null,!1,n["a"],o);t["default"]=c.exports}}]);