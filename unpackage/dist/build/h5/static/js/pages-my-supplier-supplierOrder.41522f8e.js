(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-supplier-supplierOrder"],{"28c6":function(t,i,e){"use strict";e.r(i);var a=e("4f48"),n=e("a2c1");for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);e("e58e");var r,s=e("f0c5"),d=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"3f17a7f4",null,!1,a["a"],r);i["default"]=d.exports},4487:function(t,i,e){t.exports=e.p+"static/img/zwsj.5201ab9c.png"},"4f48":function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return a}));var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",[a("v-uni-view",{staticClass:"tab"},[t._l(t.tab,(function(i,e){return[a("v-uni-view",{key:i.id+"_0",class:t.selectid==i.id?"txt1":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotabbal(i.id)}}},[t._v(t._s(i.title))])]}))],2),a("v-uni-view",{staticStyle:{width:"100%",height:"80rpx"}}),0==t.orderList.length&&t.loading?a("v-uni-view",{staticClass:"bgc"},[a("v-uni-image",{attrs:{src:e("4487").replace(/^\./,"")}}),a("v-uni-view",{staticStyle:{"text-align":"center","font-size":"26rpx","font-family":"PingFang SC","font-weight":"400",color:"#999999",margin:"50rpx 0"}},[t._v("您还没有相关订单")])],1):a("v-uni-view",t._l(t.orderList,(function(i,n){return a("v-uni-view",{key:n,staticClass:"list"},[a("v-uni-view",{staticClass:"one",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goshop(i.order_supplier,i.supplier_status)}}},[a("v-uni-view",{staticClass:"left"},[a("v-uni-image",{staticClass:"image1",attrs:{src:e("5c1e").replace(/^\./,"")}}),t._v(t._s(i.order_id))],1),a("v-uni-view",{class:0==i.order_status||6==i.order_status?"right":"right1"},[t._v(t._s(i.order_name))])],1),t._l(t.orderList[n].goods_list,(function(e,n){return a("v-uni-view",{key:n,staticClass:"two",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goparticulars(i.order_index,i.statusgoods)}}},[a("v-uni-view",{staticClass:"img"},[e.goods_icon?a("v-uni-image",{attrs:{src:t.cdnUrl+e.goods_icon}}):a("v-uni-view",{staticStyle:{width:"100%",height:"100%",border:"1px solid #f5f5f5",color:"#ccc","text-align":"center","line-height":"160rpx"}},[t._v("暂无图片")])],1),a("v-uni-view",{staticClass:"details"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-text",{staticStyle:{display:"inline-block","background-color":"red",color:"#fff",padding:"0 5rpx","margin-right":"5rpx","border-radius":"5rpx"}},[t._v(t._s("3"==i.order_type?"秒杀":""))]),t._v(t._s(e.goods_name||"暂无名称"))],1),a("v-uni-view",{staticClass:"xia"},[a("v-uni-view",{staticClass:"univalence"},[t._v("￥"+t._s(e.goods_cost/100))]),a("v-uni-view",{staticClass:"num"},[t._v("×"+t._s(e.goods_count))])],1)],1)],1)})),a("v-uni-view",{staticClass:"three"},[a("v-uni-view",{staticClass:"allClass"},[t._v("订单总价：￥"+t._s(i.order_total_price/100))]),a("v-uni-view",{staticClass:"btn"},[2==i.order_status?a("v-uni-view",{staticClass:"btn1",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ljfh(i.order_index)}}},[t._v("立即发货")]):t._e(),5==i.order_status?a("v-uni-view",{staticClass:"btn3"},[t._v("待收货")]):t._e(),6==i.order_status?a("v-uni-view",{staticClass:"btn3"},[t._v("已完成")]):t._e(),0==i.order_status?a("v-uni-view",{staticClass:"btn3"},[t._v("已取消")]):t._e(),7==i.order_status?a("v-uni-view",{staticClass:"btn3",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.shenhe(i.order_id)}}},[t._v("审核")]):t._e(),9==i.order_status?a("v-uni-view",{staticClass:"btn3"},[t._v("退款成功")]):t._e()],1)],1)],2)})),1),t.isAddGoods?a("v-uni-view",{staticClass:"beijing"},[a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticStyle:{background:"#FFFFFF","border-radius":"10rpx"}},[a("v-uni-view",{staticStyle:{padding:"20rpx 0","text-align":"center",color:"#999999","font-weight":"400","font-family":"PingFang SC","font-size":"26rpx"}},[t._v("请选择发货方式：")]),a("v-uni-view",{staticStyle:{padding:"20rpx 0","text-align":"center",color:"#333333","font-weight":"400","font-family":"PingFang SC","font-size":"26rpx","border-top":"1px solid #f5f5f5","border-bottom":"1px solid #f5f5f5"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.zizhusend.apply(void 0,arguments)}}},[t._v("自主发货")]),a("v-uni-view",{staticStyle:{padding:"20rpx 0","text-align":"center",color:"#333333","font-weight":"400","font-family":"PingFang SC","font-size":"26rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.kdAdd.apply(void 0,arguments)}}},[t._v("快递发货")])],1),a("v-uni-view",{staticClass:"cancel",staticStyle:{"border-radius":"10rpx",background:"#FFFFFF",padding:"20rpx 0","text-align":"center",margin:"20rpx 0"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cancel.apply(void 0,arguments)}}},[t._v("取消")])],1)],1):t._e()],1)},o=[]},"5c1e":function(t,i){t.exports="data:image/png;base64,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"},"5dd0":function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,"uni-page-body[data-v-3f17a7f4]{background-color:#f5f5f5;position:relative}.beijing[data-v-3f17a7f4]{position:fixed;width:100%;height:100%;left:0;top:0;background-color:rgba(0,0,0,.5)}.beijing .tanchuang[data-v-3f17a7f4]{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:%?500?%;height:%?320?%;background:#fff;-webkit-border-radius:%?10?%;border-radius:%?10?%;padding:%?30?%;padding-bottom:0;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#999}.beijing .tanchuang .title[data-v-3f17a7f4]{font-size:%?30?%;font-family:PingFang SC;font-weight:500;color:#333;text-align:center;margin-bottom:%?40?%}.beijing .tanchuang .character uni-view[data-v-3f17a7f4]{text-align:center}.beijing .tanchuang .know[data-v-3f17a7f4]{position:absolute;bottom:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#f93a2d;border-top:2px solid #f5f5f5;width:%?440?%;padding-top:%?30?%}.beijing .tanchuang .know .one[data-v-3f17a7f4]{width:%?200?%;height:%?50?%;text-align:center}.content[data-v-3f17a7f4]{width:%?690?%;position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);-webkit-border-radius:%?10?%;border-radius:%?10?%}.bgc[data-v-3f17a7f4]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);margin:%?300?% auto}.bgc uni-image[data-v-3f17a7f4]{width:%?374?%;height:%?314?%;opacity:.5}\r\n/* tab栏 */.tab[data-v-3f17a7f4]{position:fixed;left:0;top:%?80?%;margin-top:%?0?%;background-color:#fff;height:%?80?%;width:100%;line-height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?26?%;font-family:PingFang SC;font-weight:500;padding:0 %?30?% %?10?%;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:11}.txt1[data-v-3f17a7f4]{color:#ff862b;border-bottom:%?4?% solid #ff862b}\r\n/* 订单样式 */.list[data-v-3f17a7f4]{background-color:#fff;padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:%?10?%}.list uni-image[data-v-3f17a7f4]{width:100%;height:100%}\r\n/* 第一行 */.list .one[data-v-3f17a7f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-family:Source Han Sans CN;font-size:%?30?%;padding-bottom:%?10?%;border-bottom:%?1?% solid #f5f5f5}.list .one .left[data-v-3f17a7f4]{font-weight:400;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.list .one .right[data-v-3f17a7f4]{font-weight:300;color:#999}.list .one .right1[data-v-3f17a7f4]{font-weight:300;color:#ff862b}.list .one .image1[data-v-3f17a7f4]{width:%?37?%;height:%?33?%;margin-right:%?20?%}.list .one .image2[data-v-3f17a7f4]{width:%?13?%;height:%?26?%;margin-left:%?20?%}\r\n/* 第二行 */.list .two[data-v-3f17a7f4]{display:-webkit-box;display:-webkit-flex;display:flex;border-bottom:%?1?% solid #f5f5f5;margin:%?20?% 0;padding:%?30?% 0;-webkit-box-sizing:border-box;box-sizing:border-box}.list .two .img[data-v-3f17a7f4]{width:%?160?%;height:%?160?%;margin-right:%?20?%}.list .two .details[data-v-3f17a7f4]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.two .details .title[data-v-3f17a7f4]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#333;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.two .details .xia[data-v-3f17a7f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-family:Source Han Sans CN;margin-top:%?50?%}.details .xia .univalence[data-v-3f17a7f4]{font-size:%?30?%;font-weight:400;color:#ff862b}.details .xia .num[data-v-3f17a7f4]{font-size:%?26?%;font-weight:300;color:#999}\r\n/* 第三行 */.list .three[data-v-3f17a7f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.list .three .allClass[data-v-3f17a7f4]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#003}.list .three .btn[data-v-3f17a7f4]{display:-webkit-box;display:-webkit-flex;display:flex}.three .btn .btn1[data-v-3f17a7f4]{width:%?135?%;height:%?50?%;padding:0 %?10?%;background:#ff862b;-webkit-border-radius:%?25?%;border-radius:%?25?%;line-height:%?50?%;text-align:center;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#fff}.three .btn .btn3[data-v-3f17a7f4]{width:%?135?%;height:%?48?%;padding:0 %?10?%;border:%?1?% solid #ccc;-webkit-border-radius:%?25?%;border-radius:%?25?%;line-height:%?50?%;text-align:center;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#999}body.?%PAGE?%[data-v-3f17a7f4]{background-color:#f5f5f5}",""]),t.exports=i},8813:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{tab:[{id:"0",title:"全部"},{id:"2",title:"待发货"},{id:"3",title:"待收货"},{id:"4",title:"已完成"},{id:"5",title:"售后"}],isAddGoods:!1,phone:"",name:"",order_index:"",selectid:"0",page:0,pageCount:"",cdnUrl:"",user_coupon:0,orderList:[],isSendFahuo:!1,loading:!1}},methods:{gotabbal:function(t){this.selectid=t,this.page=0,this.orderList=[],this.init()},shenhe:function(t){uni.showModal({title:"提示",content:"确定要通过该退款审核吗？",cancelText:"拒绝",confirmText:"退款",confirmColor:"#F7271C",success:function(i){i.confirm?self.refund_order("order/refund_order",t):i.cancel&&self.refund_order("order/refuse_refund",t)}})},ljfh:function(t){this.order_index=t,this.isAddGoods=!0},zizhusend:function(){this.isAddGoods=!1,uni.navigateTo({url:"./zizufh?order_index="+this.order_index})},kdAdd:function(){this.isAddGoods=!1,uni.navigateTo({url:"./kuaidi?order_index="+this.order_index})},cancel:function(){this.isAddGoods=!1},init:function(){var i=this;this.loading=!1;var e=this;uni.showLoading({title:"加载中"}),e.request({url:"ugo/api/app.php?c=order/mallOrderListV2",data:{order_type:5,page:e.page,type:e.selectid}}).then((function(a){if(uni.hideLoading(),a.data.success){i.loading=!0,e.pageCount=a.data.pageCount,e.user_coupon=a.data.data.user_coupon;for(var n=0;n<a.data.data.list.length;n++)"0"==a.data.data.list[n].order_status&&(a.data.data.list[n].order_name="已取消"),"1"==a.data.data.list[n].order_status&&(a.data.data.list[n].order_name="待付款"),"2"==a.data.data.list[n].order_status&&(a.data.data.list[n].order_name="待发货"),"5"==a.data.data.list[n].order_status&&(a.data.data.list[n].order_name="待收货"),"6"==a.data.data.list[n].order_status&&(a.data.data.list[n].order_name="已完成"),"7"==a.data.data.list[n].order_status&&(a.data.data.list[n].order_name="售后"),"8"==a.data.data.list[n].order_status&&(a.data.data.list[n].order_name="退款中"),"9"==a.data.data.list[n].order_status&&(a.data.data.list[n].order_name="退款成功"),t("log","0"==a.data.data.list[n].order_status," at pages/my/supplier/supplierOrder.vue:190"),e.orderList.push(a.data.data.list[n]);t("log",e.orderList," at pages/my/supplier/supplierOrder.vue:193")}else i.loading=!0,"登录状态失效，请重新登录~！"==a.data.msg&&uni.showModal({content:"未登录，请先登录",success:function(t){t.confirm?uni.switchTab({url:"/pages/my/my"}):t.cancel&&uni.switchTab({url:"/pages/index/index"})}})}))},goshop:function(t,i){3!=i?uni.navigateTo({url:"../../common/shopHome?id="+t}):uni.navigateTo({url:"../../my/NoShop?id="+t})},goparticulars:function(t){uni.navigateTo({url:"./orderDetail?index="+t})},getStatus:function(t,i){var e=this;7==t?uni.showModal({title:"提示",content:"确定要通过该退款审核吗？",cancelText:"拒绝",confirmText:"退款",confirmColor:"#F7271C",success:function(t){t.confirm?e.refund_order("order/refund_order",i.order_id):t.cancel&&e.refund_order("order/refuse_refund",i.order_id)}}):2==t&&(this.order_index=i.order_index,e.isSendFahuo=!0)},sendFh:function(){var t=this;11==this.phone.length?this.request({url:"ugo/api/app.php?c=order/order_sends",type:"POST",data:{order_index:this.order_index,phone:this.phone,name:this.name}}).then((function(i){uni.showToast({title:i.data.msg,icon:"none"}),t.orderList=[],t.init(),uni.setStorageSync("sendPhone",t.phone),uni.setStorageSync("sendName",t.name),t.phone="",t.name="",t.isSendFahuo=!1})):uni.showToast({title:"请输入正确的手机号",icon:"none"})},gbfh:function(){this.isSendFahuo=!1},refund_order:function(t,i){var e=this;this.request({url:"ugo/api/app.php?c="+t,data:{order_id:i}}).then((function(t){e.orderList=[],e.init(),uni.showToast({title:t.data.message,icon:"none"})}))},onBridgeReady:function(t){var i=this;WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:i.payInfo.appId,timeStamp:i.payInfo.timeStamp,nonceStr:i.payInfo.nonceStr,package:i.payInfo.package,signType:"MD5",paySign:i.payInfo.paySign},(function(e){"get_brand_wcpay_request:ok"==e.err_msg&&i.request({url:"ugo/api/app.php?c=checkPayOrder",data:{order_index:i.orderList.order_index}}).then((function(i){i.data.success&&uni.navigateTo({url:"/pages/common/successPay?order_total_price="+t})}))}))}},onShow:function(){this.cdnUrl=this.$cdnUrl,this.orderList=[],this.page=0,this.orderList.length||this.init()},onReachBottom:function(){this.page<this.pageCount-1&&(this.page++,this.init())},onLoad:function(t){this.selectid=t.id}};i.default=e}).call(this,e("0de9")["log"])},a2c1:function(t,i,e){"use strict";e.r(i);var a=e("8813"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=n.a},dfa7:function(t,i,e){var a=e("5dd0");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("61cd0823",a,!0,{sourceMap:!1,shadowMode:!1})},e58e:function(t,i,e){"use strict";var a=e("dfa7"),n=e.n(a);n.a}}]);