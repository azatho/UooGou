(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-particulars"],{"31d0":function(e,t,i){var o=i("5634");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=i("4f06").default;n("638b82d8",o,!0,{sourceMap:!1,shadowMode:!1})},"31fd":function(e,t,i){"use strict";var o;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return o}));var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-uni-view",[o("v-uni-view",{staticClass:"head"},[e._v(e._s(0==e.orderInfo.order_status?"已取消":1==e.orderInfo.order_status?"待支付":4==e.orderInfo.order_status?"已部分发货":5==e.orderInfo.order_status?"待收货":6==e.orderInfo.order_status?"已完成":7==e.orderInfo.order_status?"退款审核中":"待发货"))]),o("v-uni-view",{staticStyle:{width:"100%",height:"20rpx","background-color":"#F5F5F5"}}),o("v-uni-view",{staticClass:"site"},[o("v-uni-view",{staticClass:"img"},[o("v-uni-image",{attrs:{src:i("35ef").replace(/^\./,"")}}),o("v-uni-view",{staticClass:"center"},[o("v-uni-view",{staticClass:"txt"},[e._v(e._s(e.orderInfo.order_contacts)),o("v-uni-text",[e._v(e._s(e.orderInfo.order_phone))])],1),o("v-uni-view",{staticClass:"dizhi"},[e._v(e._s(e.orderInfo.order_address))])],1)],1),o("v-uni-view",{staticClass:"right"})],1),0!=e.orderInfo.order_status?o("v-uni-view",{staticClass:"time"},[o("v-uni-view",{staticClass:"txt1"},[e._v("预计送达时间")]),o("v-uni-view",{staticClass:"txt2"},[e._v(e._s(e.orderInfo.promptly_status)+" "+e._s(e.orderInfo.promptly_time))])],1):o("v-uni-view",{staticClass:"time"},[o("v-uni-view",{staticClass:"txt1"},[e._v("预计送达时间")]),o("v-uni-view",{staticClass:"txt3"},[e._v(e._s(e.orderInfo.promptly_status)+" "+e._s(e.orderInfo.promptly_time))])],1),o("v-uni-view",{staticStyle:{width:"100%",height:"20rpx","background-color":"#F5F5F5"}}),o("v-uni-view",{staticClass:"list"},[o("v-uni-view",{staticClass:"one",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goShop(e.orderInfo.supplier_id,e.orderInfo.supplier_status)}}},[o("v-uni-view",{staticClass:"left"},[o("v-uni-image",{staticClass:"img1",attrs:{src:i("5c1e").replace(/^\./,"")}}),e._v(e._s(e.orderInfo.supplier_name)),o("v-uni-image",{staticClass:"img2",attrs:{src:i("666e").replace(/^\./,"")}})],1)],1),e._l(e.goods_list,(function(t,i){return[5==e.orderInfo.order_status?o("v-uni-view",{key:i+"_0",staticClass:"two",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.goDetail(t.goods_index,t.goods_id,t.is_ok,t.jump_type)}}},[o("v-uni-view",{staticClass:"img"},[t.goods_icon?o("v-uni-image",{attrs:{src:e.cdnUrl+t.goods_icon}}):o("v-uni-view",{staticStyle:{width:"100%",height:"100%",border:"1px solid #f5f5f5",color:"#ccc","text-align":"center","line-height":"160rpx"}},[e._v("暂无图片")])],1),o("v-uni-view",{staticClass:"details"},[o("v-uni-view",{staticClass:"title"},[e._v(e._s(t.goods_name||"暂无名称"))]),o("v-uni-view",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[o("v-uni-view",{staticClass:"bgc"},[e._v(e._s(t.goods_norms?t.goods_norms:"无"))]),o("v-uni-view",{staticClass:"xia"},[o("v-uni-view",{staticClass:"num"},[e._v("×"+e._s(t.goods_count?t.goods_count:"暂无"))])],1)],1),o("v-uni-view",{staticClass:"xia"},[o("v-uni-view",{staticClass:"univalence"},[e._v(e._s(0!=t.goods_cost?"￥"+t.goods_cost/100:"")+e._s(0!=t.goods_cost&&0!=t.goods_integral?"+":"")+e._s(0!=t.goods_integral?t.goods_integral/100+"积分":""))]),o("v-uni-view",{staticClass:"btn2",on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.afterSale(t,e.orderInfo.barter_button,e.orderInfo.refund_button,e.orderInfo.ps_phone,e.orderInfo.frequent_phone)}}},[e._v("申请售后")])],1)],1)],1):o("v-uni-view",{staticClass:"two",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.goDetail(t.goods_index,t.goods_id,t.is_ok,t.jump_type)}}},[o("v-uni-view",{staticClass:"img"},[t.goods_icon?o("v-uni-image",{attrs:{src:e.cdnUrl+t.goods_icon}}):o("v-uni-view",{staticStyle:{width:"100%",height:"100%",border:"1px solid #f5f5f5",color:"#ccc","text-align":"center","line-height":"160rpx"}},[e._v("暂无图片")])],1),o("v-uni-view",{staticClass:"details"},[o("v-uni-view",{staticClass:"title"},[e._v(e._s(t.goods_name||"暂无名称"))]),o("v-uni-view",{staticStyle:{width:"250rpx",overflow:"hidden","white-space":"nowrap"}},[o("v-uni-text",{staticClass:"bgc"},[e._v(e._s(t.goods_norms?t.goods_norms:"无"))])],1),o("v-uni-view",{staticClass:"xia"},[o("v-uni-view",{staticClass:"univalence"},[e._v(e._s(0!=t.goods_cost?"￥"+t.goods_cost/100:"")+e._s(0!=t.goods_cost&&0!=t.goods_integral?"+":"")+e._s(0!=t.goods_integral?t.goods_integral/100+"积分":""))]),o("v-uni-view",{staticClass:"num"},[e._v("×"+e._s(t.goods_count?t.goods_count:"0"))])],1)],1)],1)]})),o("v-uni-view",{staticClass:"remark"},[o("v-uni-view",[e._v("备注")]),o("v-uni-view",{staticClass:"txt2"},[e._v(e._s(e.orderInfo.order_remark?e.orderInfo.order_remark:"你没有填写备注"))])],1)],2),o("v-uni-view",{staticStyle:{width:"100%",height:"20rpx","background-color":"#F5F5F5"}}),o("v-uni-view",{staticClass:"price"},[o("v-uni-view",{staticClass:"goodprice"},[o("v-uni-view",{staticClass:"one"},[e._v("商品总价")]),o("v-uni-view",{staticClass:"two"},[e._v(e._s(0!=e.orderInfo.order_goods_price?"￥"+e.orderInfo.order_goods_price/100:"")+e._s(0!=e.orderInfo.order_goods_price&&0!=e.orderInfo.order_score_price?"+":"")+e._s(0!=e.orderInfo.order_score_price?e.orderInfo.order_score_price/100+"积分":""))])],1),o("v-uni-view",{staticClass:"goodprice"},[o("v-uni-view",{staticClass:"one"},[e._v("配送费")]),o("v-uni-view",{staticClass:"two"},[e._v("￥"+e._s(e.orderInfo.order_freight_price?e.orderInfo.order_freight_price/100:"0"))])],1),0!=e.orderInfo.order_deduct_youhui?o("v-uni-view",{staticClass:"goodprice"},[o("v-uni-view",{staticClass:"one"},[e._v("优惠券")]),o("v-uni-view",{staticClass:"two"},[e._v("￥"+e._s(e.orderInfo.order_deduct_youhui/100))])],1):e._e(),o("v-uni-view",{staticClass:"goodprice"},[o("v-uni-view",{staticClass:"one1"},[e._v("订单总价")]),o("v-uni-view",{staticClass:"two1"},[e._v(e._s(0!=e.orderInfo.order_total_price?"￥"+e.orderInfo.order_total_price/100:"")+e._s(0!=e.orderInfo.order_total_price&&0!=e.orderInfo.order_score_price?"+":"")+e._s(0!=e.orderInfo.order_score_price?e.orderInfo.order_score_price/100+"积分":""))])],1)],1),o("v-uni-view",{staticStyle:{width:"100%",height:"20rpx","background-color":"#F5F5F5"}}),o("v-uni-view",{staticClass:"order"},[o("v-uni-view",{staticClass:"txt"},[o("v-uni-text"),e._v("订单信息")],1),o("v-uni-view",{staticClass:"serial"},[o("v-uni-view",[e._v("订单编号："+e._s(e.orderInfo.order_id))]),o("v-uni-view",{staticClass:"copy",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.fz(e.orderInfo.order_id)}}},[e._v("复制")])],1),o("v-uni-view",{staticClass:"serial"},[e._v("下单时间："+e._s(e.orderInfo.order_time))]),0==e.orderInfo.order_status?o("v-uni-view",{staticClass:"serial"},[e._v("取消时间："+e._s(e.orderInfo.cancel_time))]):e._e(),0!=e.orderInfo.order_status&&1!=e.orderInfo.order_status?o("v-uni-view",{staticClass:"serial"},[e._v("支付时间："+e._s(e.orderInfo.payment_time))]):e._e(),5==e.orderInfo.order_status||6==e.orderInfo.order_status?o("v-uni-view",{staticClass:"serial"},[e._v("发货时间："+e._s(e.orderInfo.fahuo_time))]):e._e(),6==e.orderInfo.order_status?o("v-uni-view",[e._v("收货时间："+e._s(e.orderInfo.confirm_time))]):e._e()],1),o("v-uni-view",[5==e.orderInfo.order_status||6==e.orderInfo.order_status?o("v-uni-view",{staticStyle:{position:"relative"}},[0==e.orderInfo.express_num?o("v-uni-map",{staticStyle:{width:"100%",height:"400rpx","margin-bottom":"130rpx"},attrs:{name:"",longitude:e.orderInfo.supplier_lng,latitude:e.orderInfo.supplier_lat,markers:e.covers}}):e._e(),o("v-uni-view",{staticStyle:{position:"absolute",left:"390rpx",top:"50rpx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.call(e.orderInfo.ps_phone)}}},[o("img",{attrs:{src:i("b028"),alt:"手机号背景框",width:"150rpx",height:"60rpx"}})]),o("v-uni-view",{staticStyle:{position:"absolute",left:"430rpx",top:"70rpx"}},[o("v-uni-view",{staticStyle:{"font-size":"22rpx"}},[e._v(e._s(e.orderInfo.ps_name))]),o("v-uni-view",{staticStyle:{"font-size":"22rpx"}},[e._v(e._s(e.orderInfo.ps_phone))])],1)],1):o("v-uni-view",{staticStyle:{height:"150rpx"}})],1),o("v-uni-view",{staticClass:"btn"},[3!=e.orderInfo.order_status&&4!=e.orderInfo.order_status?o("v-uni-view",{class:0==e.orderInfo.order_status?"btn2":5==e.orderInfo.order_status||1==e.orderInfo.order_status||2==e.orderInfo.order_status?"btn1":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getStatus(e.orderInfo.order_status,e.orderInfo.order_index,e.orderInfo.order_type,e.orderInfo.order_total_price,e.orderInfo.user_coupon)}}},[e._v(e._s(0==e.orderInfo.order_status?"删除订单":1==e.orderInfo.order_status?"去支付":2==e.orderInfo.order_status?"退款":5==e.orderInfo.order_status?"确认收货":""))]):e._e(),1==e.orderInfo.order_status?o("v-uni-view",{staticClass:"btn2",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancleOrder(e.orderInfo.order_index)}}},[e._v("取消订单")]):e._e(),5==e.orderInfo.order_status||4==e.orderInfo.order_status?o("v-uni-view",{staticClass:"btn3",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.gowuliu(e.orderInfo.order_index)}}},[e._v("查看配送信息")]):e._e(),6==e.orderInfo.order_status&&2==e.goods_list[0].goods_status?o("v-uni-view",{staticClass:"btn1",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getStatus(e.orderInfo.order_status,e.orderInfo.order_index,e.orderInfo.order_type,e.orderInfo.order_total_price,e.orderInfo.user_coupon)}}},[e._v("去评价")]):e._e()],1)],1)},r=[]},"35ef":function(e,t,i){e.exports=i.p+"static/img/address1.381d8323.png"},5634:function(e,t,i){var o=i("24fb");t=o(!1),t.push([e.i,"uni-page-body[data-v-7757bd20]{background-color:#f5f5f5}.head[data-v-7757bd20]{width:%?750?%;height:%?70?%;background:#f6281b;font-size:%?30?%;font-family:PingFang SC;font-weight:500;color:#fff;line-height:%?70?%;padding:0 %?30?%}\n\n/* 地址 */.site[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?40?% %?30?% %?20?%;background-color:#fff}.site uni-image[data-v-7757bd20]{width:100%;height:100%}.site .img[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.img uni-image[data-v-7757bd20]{width:%?64?%;height:%?64?%}.site .img .center[data-v-7757bd20]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#333;margin-left:%?30?%;width:%?470?%}.img .center .txt[data-v-7757bd20]{font-size:%?28?%;font-weight:500;color:#333}.center .txt uni-text[data-v-7757bd20]{font-size:%?24?%;color:#999;margin-left:%?10?%}.img .center .dizhi[data-v-7757bd20]{margin-top:%?10?%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.site .right[data-v-7757bd20]{width:%?17?%;height:%?32?%}\n\n/* 送达时间 */.time[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?% %?30?%;border-top:%?1?% solid #f5f5f5;font-size:%?28?%;font-family:PingFang SC;font-weight:500;color:#333;background-color:#fff}.time .txt2[data-v-7757bd20]{font-size:%?26?%;font-weight:400;color:#f6281b}.time .txt3[data-v-7757bd20]{font-size:%?26?%;font-weight:400;color:#ccc}.time uni-image[data-v-7757bd20]{width:%?17?%;height:%?32?%;margin-left:%?20?%;vertical-align:middle}\n\n/* 订单详情 */.list[data-v-7757bd20]{background-color:#fff;padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff}.list uni-image[data-v-7757bd20]{width:100%;height:100%}.list .one[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-family:Source Han Sans CN;font-size:%?30?%}.list .one .left[data-v-7757bd20]{font-weight:400;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.list .one .img1[data-v-7757bd20]{width:%?37?%;height:%?33?%;margin-right:%?10?%}.list .one .img2[data-v-7757bd20]{width:%?13?%;height:%?26?%;padding-top:%?4?%;margin-left:%?20?%}.list .two[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;border-bottom:%?1?% solid #f5f5f5;padding:%?30?% 0;-webkit-box-sizing:border-box;box-sizing:border-box}.list .two .img[data-v-7757bd20]{width:%?160?%;height:%?160?%;margin-right:%?20?%}.list .two .details[data-v-7757bd20]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.two .details .title[data-v-7757bd20]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#333;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.two .details .bgc[data-v-7757bd20]{height:%?40?%;background:#f5f5f5;-webkit-border-radius:%?4?%;border-radius:%?4?%;line-height:%?40?%;\n\t/* text-align: center; */overflow:hidden;padding:0 %?15?%;font-size:%?24?%;font-family:PingFang SC;font-weight:400;color:#999;margin:%?20?% 0}.two .details .xia[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-family:Source Han Sans CN}.details .xia .univalence[data-v-7757bd20]{font-size:%?30?%;font-weight:400;color:#ff3636}.details .xia .btn2[data-v-7757bd20]{width:%?140?%;height:%?48?%;border:%?1?% solid #f6281b;-webkit-border-radius:%?24?%;border-radius:%?24?%;line-height:%?48?%;text-align:center;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#f6281b}.details .xia .num[data-v-7757bd20]{font-size:%?26?%;font-weight:300;color:#999}.list .remark[data-v-7757bd20]{font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#333;margin-top:%?20?%}.list .remark .txt2[data-v-7757bd20]{margin-top:%?20?%;font-size:%?26?%;font-weight:400}\n\n/* 价格单元 */.price[data-v-7757bd20]{padding:%?20?% %?30?% 0;font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#999;background-color:#fff}.price .goodprice[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding-bottom:%?20?%}.price .goodprice .one1[data-v-7757bd20]{color:#333}.price .goodprice .two1[data-v-7757bd20]{color:#ff3f3f}\n\n/* 订单信息 */.order[data-v-7757bd20]{width:100%;padding:%?35?% %?30?%;background-color:#fff;font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#9a9a9a;-webkit-box-sizing:border-box;box-sizing:border-box;margin-bottom:%?30?%}.order .txt[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.order .txt uni-text[data-v-7757bd20]{display:inline-block;width:%?4?%;height:%?30?%;background:#f6281b;margin-right:%?10?%;vertical-align:middle}.order .txt[data-v-7757bd20]{font-size:%?30?%;font-weight:500;color:#343434;padding-bottom:%?30?%}.order .serial[data-v-7757bd20]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding-bottom:%?25?%}.order .serial .copy[data-v-7757bd20]{text-decoration:underline;color:#f6281b}\n\n/* 按钮 */.btn[data-v-7757bd20]{position:fixed;left:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse;width:%?749?%;height:%?90?%;background:#fff;padding:%?10?% %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.btn .btn1[data-v-7757bd20]{width:%?180?%;height:%?70?%;padding:0 %?10?%;background:#f6281b;-webkit-border-radius:%?35?%;border-radius:%?35?%;line-height:%?70?%;text-align:center;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#fff;margin-left:%?40?%}.btn .btn2[data-v-7757bd20]{width:%?180?%;height:%?70?%;padding:0 %?10?%;border:%?1?% solid #f6281b;-webkit-border-radius:%?35?%;border-radius:%?35?%;line-height:%?70?%;text-align:center;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#f6281b}.btn .btn3[data-v-7757bd20]{width:%?190?%;height:%?70?%;padding:0 %?10?%;border:%?1?% solid #f6281b;-webkit-border-radius:%?35?%;border-radius:%?35?%;line-height:%?70?%;text-align:center;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#f6281b}body.?%PAGE?%[data-v-7757bd20]{background-color:#f5f5f5}",""]),e.exports=t},"5c1e":function(e,t){e.exports="data:image/png;base64,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"},"5d84":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{covers:[{latitude:"",longitude:"",iconPath:"../../static/mapMarks.png"}],order_index:"",time:!0,orderInfo:{},cdnUrl:"",goods_list:[],data:""}},methods:{call:function(e){uni.makePhoneCall({phoneNumber:e})},init:function(){var t=this;t.request({url:"ugo/api/app.php?c=mallOrderInfo",data:{token:uni.getStorageSync("token"),order_index:t.order_index}}).then((function(e){e.data.success?(t.goods_list=e.data.data.goods_list,t.orderInfo=e.data.data,t.covers[0].latitude=e.data.data.supplier_lat,t.covers[0].longitude=e.data.data.supplier_lng,t.orderInfo.order_time=t.holo.formatTime(1e3*t.orderInfo.order_time),t.orderInfo.fahuo_time=t.holo.formatTime(1e3*t.orderInfo.fahuo_time),t.orderInfo.payment_time=t.holo.formatTime(1e3*t.orderInfo.payment_time),t.orderInfo.confirm_time=t.holo.formatTime(1e3*t.orderInfo.confirm_time),t.orderInfo.cancel_time=t.holo.formatTime(1e3*t.orderInfo.cancel_time)):t.holo.toast({icon:"none",title:e.data.msg})}),(function(t){e("log",t," at pages/order/particulars.vue:239")}))},goShop:function(e,t){3!=t?uni.navigateTo({url:"../common/shopHome?id="+e}):uni.navigateTo({url:"../my/NoShop?id="+e})},goDetail:function(t,i,o,n){"3"==n?(e("log",n," at pages/order/particulars.vue:258"),uni.navigateTo({url:"../group/seckillDetail?skill_id="+i})):"1"==o?uni.navigateTo({url:"../common/goodsDetail?id="+t}):uni.navigateTo({url:"../my/Nocommunity"})},afterSale:function(e,t,i,o,n){uni.navigateTo({url:"../common/afterSale?goods_index="+e.order_goods_index+"&barter_button="+t+"&refund_button="+i+"&goods_count="+e.goods_count+"&goods_icon="+e.goods_icon+"&goods_name="+e.goods_name+"&goods_norms="+e.goods_norms+"&goods_cost="+e.goods_cost+"&ps_phone="+o+"&frequent_phone="+n+"&goods_type="+e.order_type+"&goods_price="+e.goods_price+"&goods_integral="+e.goods_integral}),event.stopImmediatePropagation()},fz:function(e){var t=this;uni.setClipboardData({data:e,success:function(e){uni.getClipboardData({success:function(e){t.holo.toast({icon:"none",title:"复制成功~"})},fail:function(e){},complete:function(e){}})},fail:function(e){},complete:function(e){}})},cancleOrder:function(t){var i=this;uni.showModal({content:"确定取消吗？",success:function(o){o.confirm?i.request({url:"ugo/api/app.php?c=cancelOrder",data:{token:uni.getStorageSync("token"),order_index:t,app_type:"3"}}).then((function(e){e.data.success?(uni.showToast({title:e.data.msg}),uni.switchTab({url:"./order"})):uni.showToast({icon:"none",title:e.data.msg})}),(function(t){e("log",t," at pages/order/particulars.vue:336")})):o.cancel}})},getStatus:function(t,i,o,n,r){var a=this;if(0==t){var s=this;uni.showModal({content:"确定删除订单吗？",success:function(t){t.confirm?s.request({url:"ugo/api/app.php?c=order/del_order",data:{token:uni.getStorageSync("token"),order_index:i}}).then((function(e){e.data.success?(uni.showToast({title:e.data.msg}),setTimeout((function(){uni.navigateBack({delta:1})}),300)):uni.showToast({icon:"none",title:e.data.msg})}),(function(t){e("log",t," at pages/order/particulars.vue:374")})):t.cancel}})}else if(6==t)uni.navigateTo({url:"./publishComment?index="+i});else if(1==t)uni.navigateTo({url:"../common/confirmPay?order_id="+a.orderInfo.order_id+"&order_index="+a.orderInfo.order_index+"&price="+a.orderInfo.order_goods_price+"&order_total_score="+a.orderInfo.order_score_price+"&send_score="+a.orderInfo.order_send_score});else if(2==t){var d=this;uni.showModal({content:"确定退款吗？",success:function(t){t.confirm?d.request({url:"ugo/api/app.php?c=createServiceOrderV2",data:{token:uni.getStorageSync("token"),order_index:i}}).then((function(e){e.data.success?(uni.showToast({title:e.data.msg}),d.init()):uni.showToast({icon:"none",title:e.data.msg})}),(function(t){e("log",t," at pages/order/particulars.vue:443")})):t.cancel}})}else 5!=t&&4!=t||(e("log",111," at pages/order/particulars.vue:449"),a.request({url:"ugo/api/app.php?c=order/confirmOrder",data:{token:uni.getStorageSync("token"),order_index:i}}).then((function(e){e.data.success?(uni.showToast({title:e.data.msg}),a.page=0,a.orderList=[],a.init()):uni.showToast({icon:"none",title:e.data.msg})}),(function(t){e("log",t," at pages/order/particulars.vue:471")})))},onBridgeReady:function(e){var t=this;WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.payInfo.appId,timeStamp:t.payInfo.timeStamp,nonceStr:t.payInfo.nonceStr,package:t.payInfo.package,signType:"MD5",paySign:t.payInfo.paySign},(function(i){"get_brand_wcpay_request:ok"==i.err_msg&&t.request({url:"ugo/api/app.php?c=checkPayOrder",data:{order_index:t.orderInfo.order_index}}).then((function(t){t.data.success&&uni.navigateTo({url:"/pages/common/successPay?order_total_price="+e})}))}))},gowuliu:function(e){uni.navigateTo({url:"./logistics?order_index="+e})}},onLoad:function(e){this.order_index=e.index,this.cdnUrl=this.$cdnUrl,this.init()}};t.default=i}).call(this,i("0de9")["log"])},"666e":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA0CAYAAADrPTp5AAAEg0lEQVRYR7WY2/NXYxTGP+Eix5JM5TCTkJxqKiGhFCk0Y9CFe3+FK3+AK/ddV5OZKIyckkFIoYtIanLITOMUkRhkPs16m9077z79vvu3Z/bMd2bv+b7PWs+znrXWngAsBGYCq4E7gUnAt8CHwFvAR8BRxumaADwGXBsAbgMuBr4H9gBvAm8AB4C/xgODAJ4FrgPuAi6vHPJTgHgReDtA/D00CAGsA26I9J+bHSCId4HXA8Qh4M8hQQjgaWAO8BBwWeHPfwA+BV4GdgBfACeHAiGA+4BrgDXAIuDKwp//AnwAvBa6UBODgBCAUU8G7gAeBFYC0wsgpMNMbAk69g8hTAGky8jvBtYCi4ErCiB+Bt4PTWwHvhpVE1UA/hbEPVGSD9Rk4seKJqyOkTRRBZACvioy8XhUhqDy98yERqUmRvKJEoCUiSXAqtDFjBpNaFYj+UQJQEkTmlQdiPcynzjRp0SbAPhMOpaGJlYA02p84jPglfCJz/sIswmAZ50DXB2aeLRBE/qEmtAxvTv7RBsAQWjPpt/StGPqFXUl+knFJ6yO1t7RBUDKuuZkieoTCrQEQrPaGVmwkx5sc8w+AASiJrr6xNZK76ht5X0BJGHqmFWfyLWpT1QzoWMWe0dfAEmYpl8Q+oS9o65E1URjJsYCIPeJJ2KYqRNmYyZGAVDtHc4S9zd00dpMjAIgZUKfsCqcLS3Vut6RMuGge6aLDgFAs1IDgtAn1ERdiZoJJ6szXXQIACkTgkjzhNP1VODCcNP0TuqiuqXzxNEhASSfMBP2D+lw2r6oMOimGfPg0AA8y9HeBcfquDfM67wMhL3DAXf/eADwrJuAJ4GHY+I+PwNwKqaqA+MBwNXOdc+qSBN3DuCfmLIHz4CHLwCcHZwpr49VL6fgCLAZ2DdkBi4B5gKPROQ3RxVUs/9vLL5OUc8Dh4cC4EI7P6K2P7hp5eoXiO3ZyWkbsBs4PgSAKcAtYUDLgHmFw43869iqjNyV/5iIRgVwaWxUcq7gZgfneXs2cjcqXdBJ2jI8fY0CwMONVs6XAzcCE7OTVfvh2B02xdz4R/WdsQJQ7S6yKt1bzvNS85wvY28wct3v1zw1YwEg56rdxiPn8n9BIfJvQmwbI/JBJiK36Nuj99v/5dyGk1+O5S/FvUu1F97prQEPT5wrOO02T7tql3N3xqT23+sO7yNCObfFyrf93k86edpTnb8Qc2CR87FoQM5vDc6NvIlzN+X14fOdvqC0iTB9OZFva11vLzlc4ly1y/lvTWnvWobWuWr321HivFTnOlxnzrtSYORybuRNnBu53wdUfCfOuwDwcCN31G7j3NlOzt2MO3HeBiCpvRp5U5335rwJgJyrcMeoush713mbGFMVVCNP3l6K3K7Wq867ANBU3Gb88NDk7ardOt/Qp867AHgqPtc3RW5XU+ly/nGfOu8C4Llop/KeD48q265m5Mnbz+rnbQe0PVcDApAG16qqvyu4vcCr0Vbd6zo7XNvB6bkAngFmxYDhVuPS4G2kDo6K7h3gO+C/rn/c9b3/AYj3IhylMRjaAAAAAElFTkSuQmCC"},"6d1e":function(e,t,i){"use strict";i.r(t);var o=i("5d84"),n=i.n(o);for(var r in o)"default"!==r&&function(e){i.d(t,e,(function(){return o[e]}))}(r);t["default"]=n.a},7185:function(e,t,i){"use strict";i.r(t);var o=i("31fd"),n=i("6d1e");for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);i("f616");var a,s=i("f0c5"),d=Object(s["a"])(n["default"],o["b"],o["c"],!1,null,"7757bd20",null,!1,o["a"],a);t["default"]=d.exports},b028:function(e,t){e.exports="data:image/png;base64,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"},f616:function(e,t,i){"use strict";var o=i("31d0"),n=i.n(o);n.a}}]);