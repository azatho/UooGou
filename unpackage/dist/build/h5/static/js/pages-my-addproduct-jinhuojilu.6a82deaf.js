(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-addproduct-jinhuojilu"],{"0a90":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i("3ca6"),a={data:function(){return{tab:[{id:"0",title:"全部"},{id:"1",title:"待支付"},{id:"2",title:"待发货"},{id:"3",title:"待收货"},{id:"4",title:"已完成"}],phone:"",name:"",order_index:"",selectid:"0",page:0,pageCount:"",cdnUrl:"",user_coupon:0,orderList:[],isSendFahuo:!1}},methods:{payzhifu:function(e,t,i){var a=this;this.request({url:"ugo/api/app.php?c=rechargeOrderUgo",data:{order_index:e,order_money:t,order_score:i,type:1}}).then((function(e){var t=a;n.jweixin.ready((function(){n.jweixin.chooseWXPay({timestamp:e.data.data.timeStamp,nonceStr:e.data.data.nonceStr,package:e.data.data.package,signType:e.data.data.signType,paySign:e.data.data.paySign,success:function(){t.holo.toast({title:"支付成功"}),t.init()},fail:function(){t.holo.toast({title:"支付失败了"})},cancel:function(){t.holo.toast({title:"取消了支付"})}})}))}))},lookWl:function(e,t,i){uni.navigateTo({url:"./wuliu?express_number="+e+"&order_index="+t+"&order_id="+i})},gowuliu:function(e){uni.navigateTo({url:"../../order/logistics?order_index="+e})},confimeSh:function(e){var t=this;uni.showModal({title:"提示",content:"确定要收货吗?",success:function(i){i.confirm&&t.request({url:"ugo/api/app.php?c=order/confirmOrder",data:{order_index:e}}).then((function(e){e.data.success?(t.holo.toast({title:e.data.msg}),t.page=0,t.orderList=[],t.init()):t.holo.toast({title:e.data.msg})}))}})},cancelOrder:function(e){var t=this;uni.showModal({title:"提示",content:"确定要取消订单?",success:function(i){i.confirm&&t.request({url:"ugo/api/app.php?c=cancelOrder",data:{order_index:e}}).then((function(e){e.data.success?(t.page=0,t.orderList=[],t.init(),t.holo.toast({title:e.data.msg})):t.holo.toast({title:e.data.msg})}))}})},gotabbal:function(e){this.selectid=e,this.page=0,this.orderList=[],this.init()},goCom:function(e){uni.navigateTo({url:"../../order/publishComment?index="+e})},init:function(){var t=this;t.request({url:"ugo/api/app.php?c=order/mallOrderList",data:{order_type:5,page:t.page,type:t.selectid}}).then((function(i){if(i.data.success){t.pageCount=i.data.pageCount,t.user_coupon=i.data.data.user_coupon;for(var n=0;n<i.data.data.list.length;n++)"0"==i.data.data.list[n].order_status&&(i.data.data.list[n].order_name="已取消"),"1"==i.data.data.list[n].order_status&&(i.data.data.list[n].order_name="待付款"),"2"==i.data.data.list[n].order_status&&(i.data.data.list[n].order_name="待发货"),"5"==i.data.data.list[n].order_status&&(i.data.data.list[n].order_name="待收货"),"6"==i.data.data.list[n].order_status&&(i.data.data.list[n].order_name="已完成"),"7"==i.data.data.list[n].order_status&&(i.data.data.list[n].order_name="退款审核中"),"8"==i.data.data.list[n].order_status&&(i.data.data.list[n].order_name="退款中"),"9"==i.data.data.list[n].order_status&&(i.data.data.list[n].order_name="退款成功"),t.orderList.push(i.data.data.list[n]);e("log",t.orderList," at pages/my/addproduct/jinhuojilu.vue:268")}else"登录状态失效，请重新登录~！"==i.data.msg&&uni.showModal({content:"未登录，请先登录",success:function(e){e.confirm?uni.switchTab({url:"/pages/my/my"}):e.cancel&&uni.switchTab({url:"/pages/index/index"})}})}))},goshop:function(e,t){3!=t?uni.navigateTo({url:"../../common/shopHome?id="+e}):uni.navigateTo({url:"../../my/NoShop?id="+e})},goparticulars:function(e){uni.navigateTo({url:"./ddxq?index="+e})},getStatus:function(e){var t=this;uni.showModal({title:"提示",content:"确定要退款吗?",confirmColor:"#F7271C",success:function(i){i.confirm&&t.refund_order("createServiceOrderV2",e)}})},sendFh:function(){var e=this;11==this.phone.length?this.request({url:"ugo/api/app.php?c=order/order_sends",type:"POST",data:{order_index:this.order_index,phone:this.phone,name:this.name}}).then((function(t){uni.showToast({title:t.data.msg,icon:"none"}),e.orderList=[],e.init(),uni.setStorageSync("sendPhone",e.phone),uni.setStorageSync("sendName",e.name),e.phone="",e.name="",e.isSendFahuo=!1})):uni.showToast({title:"请输入正确的手机号",icon:"none"})},gbfh:function(){this.isSendFahuo=!1},refund_order:function(e,t){var i=this;this.request({url:"ugo/api/app.php?c="+e,data:{order_index:t}}).then((function(e){i.orderList=[],i.page=0,i.init(),uni.showToast({title:e.data.message,icon:"none"})}))}},onShow:function(){this.cdnUrl=this.$cdnUrl,this.orderList=[],this.page=0,e("log",this.orderList.length," at pages/my/addproduct/jinhuojilu.vue:383"),this.orderList.length||this.init()},onReachBottom:function(){this.page<this.pageCount-1&&(this.page++,this.init())},onLoad:function(e){e.id&&(this.selectid=e.id)}};t.default=a}).call(this,i("0de9")["log"])},"10be":function(e,t,i){(function(n){var a;i("c975"),i("ac1f"),i("466d"),i("5319"),i("1276");var o=i("9523");!function(n,o){a=function(){return o(n)}.call(t,i,t,e),void 0===a||(e.exports=a)}(window,(function(e,t){if(!e.jWeixin){var i,a,r={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},s=function(){var e={};for(var t in r)e[r[t]]=t;return e}(),c=e.document,d=c.title,l=navigator.userAgent.toLowerCase(),u=navigator.platform.toLowerCase(),f=!(!u.match("mac")&&!u.match("win")),p=-1!=l.indexOf("wxdebugger"),g=-1!=l.indexOf("micromessenger"),h=-1!=l.indexOf("android"),m=-1!=l.indexOf("iphone")||-1!=l.indexOf("ipad"),v=(a=l.match(/micromessenger\/(\d+\.\d+\.\d+)/)||l.match(/micromessenger\/(\d+\.\d+)/))?a[1]:"",w={initStartTime:E(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},b={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:m?1:h?2:-1,clientVersion:v,url:encodeURIComponent(location.href)},y={},x={_completes:[]},_={state:0,data:{}};R((function(){w.initEndTime=E()}));var S=!1,k=[],A=(i={config:function(t){B("config",y=t);var i=!1!==y.check;R((function(){if(i)I(r.config,{verifyJsApiList:O(y.jsApiList),verifyOpenTagList:O(y.openTagList)},function(){x._complete=function(e){w.preVerifyEndTime=E(),_.state=1,_.data=e},x.success=function(e){b.isPreVerifyOk=0},x.fail=function(e){x._fail?x._fail(e):_.state=-1};var e=x._completes;return e.push((function(){!function(){if(!(f||p||y.debug||v<"6.0.2"||b.systemType<0)){var e=new Image;b.appId=y.appId,b.initTime=w.initEndTime-w.initStartTime,b.preVerifyTime=w.preVerifyEndTime-w.preVerifyStartTime,A.getNetworkType({isInnerInvoke:!0,success:function(t){b.networkType=t.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+b.version+"&o="+b.isPreVerifyOk+"&s="+b.systemType+"&c="+b.clientVersion+"&a="+b.appId+"&n="+b.networkType+"&i="+b.initTime+"&p="+b.preVerifyTime+"&u="+b.url;e.src=i}})}}()})),x.complete=function(t){for(var i=0,n=e.length;i<n;++i)e[i]();x._completes=[]},x}()),w.preVerifyStartTime=E();else{_.state=1;for(var e=x._completes,t=0,n=e.length;t<n;++t)e[t]();x._completes=[]}})),A.invoke||(A.invoke=function(t,i,n){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,M(i),n)},A.on=function(t,i){e.WeixinJSBridge&&WeixinJSBridge.on(t,i)})},ready:function(e){0!=_.state?e():(x._completes.push(e),!g&&y.debug&&e())},error:function(e){v<"6.0.2"||(-1==_.state?e(_.data):x._fail=e)},checkJsApi:function(e){I("checkJsApi",{jsApiList:O(e.jsApiList)},(e._complete=function(e){if(h){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var i in t){var n=s[i];n&&(t[n]=t[i],delete t[i])}return e}(e)},e))},onMenuShareTimeline:function(e){P(r.onMenuShareTimeline,{complete:function(){I("shareTimeline",{title:e.title||d,desc:e.title||d,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){P(r.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?I("sendAppMessage",{title:e.title||d,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):I("sendAppMessage",{title:e.title||d,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){P(r.onMenuShareQQ,{complete:function(){I("shareQQ",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){P(r.onMenuShareWeibo,{complete:function(){I("shareWeiboApp",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){P(r.onMenuShareQZone,{complete:function(){I("shareQZone",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){I("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){I("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){I("startRecord",{},e)},stopRecord:function(e){I("stopRecord",{},e)},onVoiceRecordEnd:function(e){P("onVoiceRecordEnd",e)},playVoice:function(e){I("playVoice",{localId:e.localId},e)},pauseVoice:function(e){I("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){I("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){P("onVoicePlayEnd",e)},uploadVoice:function(e){I("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){I("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){I("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){I("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(h){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){I(r.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){I("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){I("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===S?(S=!0,I("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(S=!1,0<k.length){var t=k.shift();wx.getLocalImgData(t)}},e))):k.push(e)},getNetworkType:function(e){I("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var n=t.indexOf(":"),a=t.substring(n+1);switch(a){case"wifi":case"edge":case"wwan":e.networkType=a;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){I("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},o(i,"getLocation",(function(e){I(r.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),o(i,"hideOptionMenu",(function(e){I("hideOptionMenu",{},e)})),o(i,"showOptionMenu",(function(e){I("showOptionMenu",{},e)})),o(i,"closeWindow",(function(e){I("closeWindow",{},e=e||{})})),o(i,"hideMenuItems",(function(e){I("hideMenuItems",{menuList:e.menuList},e)})),o(i,"showMenuItems",(function(e){I("showMenuItems",{menuList:e.menuList},e)})),o(i,"hideAllNonBaseMenuItem",(function(e){I("hideAllNonBaseMenuItem",{},e)})),o(i,"showAllNonBaseMenuItem",(function(e){I("showAllNonBaseMenuItem",{},e)})),o(i,"scanQRCode",(function(e){I("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(m){var t=e.resultStr;if(t){var i=JSON.parse(t);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e))})),o(i,"openAddress",(function(e){I(r.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),o(i,"openProductSpecificView",(function(e){I(r.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),o(i,"addCard",(function(e){for(var t=e.cardList,i=[],n=0,a=t.length;n<a;++n){var o=t[n],s={card_id:o.cardId,card_ext:o.cardExt};i.push(s)}I(r.addCard,{card_list:i},(e._complete=function(e){var t=e.card_list;if(t){for(var i=0,n=(t=JSON.parse(t)).length;i<n;++i){var a=t[i];a.cardId=a.card_id,a.cardExt=a.card_ext,a.isSuccess=!!a.is_succ,delete a.card_id,delete a.card_ext,delete a.is_succ}e.cardList=t,delete e.card_list}},e))})),o(i,"chooseCard",(function(e){I("chooseCard",{app_id:y.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),o(i,"openCard",(function(e){for(var t=e.cardList,i=[],n=0,a=t.length;n<a;++n){var o=t[n],s={card_id:o.cardId,code:o.code};i.push(s)}I(r.openCard,{card_list:i},e)})),o(i,"consumeAndShareCard",(function(e){I(r.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),o(i,"chooseWXPay",(function(e){I(r.chooseWXPay,L(e),e)})),o(i,"openEnterpriseRedPacket",(function(e){I(r.openEnterpriseRedPacket,L(e),e)})),o(i,"startSearchBeacons",(function(e){I(r.startSearchBeacons,{ticket:e.ticket},e)})),o(i,"stopSearchBeacons",(function(e){I(r.stopSearchBeacons,{},e)})),o(i,"onSearchBeacons",(function(e){P(r.onSearchBeacons,e)})),o(i,"openEnterpriseChat",(function(e){I("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),o(i,"launchMiniProgram",(function(e){I("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],i=e.split("?")[1];return t+=".html",void 0!==i?t+"?"+i:t}}(e.path),envVersion:e.envVersion},e)})),o(i,"openBusinessView",(function(e){I("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(h){var t=e.extraData;if(t)try{e.extraData=JSON.parse(t)}catch(t){e.extraData={}}}},e))})),o(i,"miniProgram",{navigateBack:function(e){e=e||{},R((function(){I("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){R((function(){I("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){R((function(){I("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){R((function(){I("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){R((function(){I("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){R((function(){I("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(t){R((function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}),i),C=1,T={};return c.addEventListener("error",(function(e){if(!h){var t=e.target,i=t.tagName,n=t.src;if(("IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i)&&-1!=n.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var a=t["wx-id"];if(a||(a=C++,t["wx-id"]=a),T[a])return;T[a]=!0,wx.ready((function(){wx.getLocalImgData({localId:n,success:function(e){t.src=e.localData}})}))}}}),!0),c.addEventListener("load",(function(e){if(!h){var t=e.target,i=t.tagName;if(t.src,"IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){var n=t["wx-id"];n&&(T[n]=!1)}}}),!0),t&&(e.wx=e.jWeixin=A),A}function I(t,i,n){e.WeixinJSBridge?WeixinJSBridge.invoke(t,M(i),(function(e){V(t,e,n)})):B(t,n)}function P(t,i,n){e.WeixinJSBridge?WeixinJSBridge.on(t,(function(e){n&&n.trigger&&n.trigger(e),V(t,e,i)})):B(t,n||i)}function M(e){return(e=e||{}).appId=y.appId,e.verifyAppId=y.appId,e.verifySignType="sha1",e.verifyTimestamp=y.timestamp+"",e.verifyNonceStr=y.nonceStr,e.verifySignature=y.signature,e}function L(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function V(e,t,i){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var n=t.errMsg;n||(n=t.err_msg,delete t.err_msg,n=function(e,t){var i=e,n=s[i];n&&(i=n);var a="ok";if(t){var o=t.indexOf(":");"confirm"==(a=t.substring(o+1))&&(a="ok"),"failed"==a&&(a="fail"),-1!=a.indexOf("failed_")&&(a=a.substring(7)),-1!=a.indexOf("fail_")&&(a=a.substring(5)),"access denied"!=(a=(a=a.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=a||(a="permission denied"),"config"==i&&"function not exist"==a&&(a="ok"),""==a&&(a="fail")}return i+":"+a}(e,n),t.errMsg=n),(i=i||{})._complete&&(i._complete(t),delete i._complete),n=t.errMsg||"",y.debug&&!i.isInnerInvoke&&alert(JSON.stringify(t));var a=n.indexOf(":");switch(n.substring(a+1)){case"ok":i.success&&i.success(t);break;case"cancel":i.cancel&&i.cancel(t);break;default:i.fail&&i.fail(t)}i.complete&&i.complete(t)}function O(e){if(e){for(var t=0,i=e.length;t<i;++t){var n=e[t],a=r[n];a&&(e[t]=a)}return e}}function B(e,t){if(!(!y.debug||t&&t.isInnerInvoke)){var i=s[e];i&&(e=i),t&&t._complete&&delete t._complete,n("log",'"'+e+'",',t||""," at until/jssdk.js:703")}}function E(){return(new Date).getTime()}function R(t){g&&(e.WeixinJSBridge?t():c.addEventListener&&c.addEventListener("WeixinJSBridgeReady",t,!1))}}))}).call(this,i("0de9")["log"])},"3ca6":function(e,t,i){"use strict";i("ac1f"),i("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.jweixin=void 0;var n=i("38f4"),a=i("10be");t.jweixin=a,(0,n.request)({url:"ugo/api/app.php?c=nearby_store/getJssdkConf",data:{url:window.location.href.split("#")[0]}}).then((function(e){a.config({debug:!1,appId:e.data.data.appId,timestamp:e.data.data.timestamp,nonceStr:e.data.data.nonceStr,signature:e.data.data.signature,jsApiList:["getLocation","openLocation","onMenuShareAppMessage","onMenuShareTimeline","chooseWXPay"]})}))},"3e69":function(e,t,i){"use strict";i.r(t);var n=i("6e73"),a=i("4639");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("86ba");var r,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"97c3f636",null,!1,n["a"],r);t["default"]=c.exports},4487:function(e,t,i){e.exports=i.p+"static/img/zwsj.5201ab9c.png"},4639:function(e,t,i){"use strict";i.r(t);var n=i("0a90"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},"6a95":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADY0lEQVRYR7VXy27TUBA9k0TpI4I+skNsKBt+gA0bXv2GIlVAVVUiUkGliVqWSBTEBpSmEWrrpk6qhh0SS1iw5nuARLUb19eDJrKjGzdu7D68TKx7zzkzc86YDMN4CWABwDel1P7y8vIfXOFTq9Vuep73AsBdZi6TYRi/AdwDoJj50HGc1ZWVldZVYKjVarc8zzMBPJTz5T7a2dl5k0qlPgJI+yCaRLRaKBT+XSaIer0+47quycz3ARCAYyKap3K5PJ3L5T4DeO6DcAE0ARQvC0SYOYAOM1eUUh8ECarV6vVsNrtFRM8CJQAcdjqdC5dje3t7JpVKmUTUYw6gcnR0tFEqlewuAHk2Nzcnx8bGNjUQF1ZCLk+n0/tBzYW5XAXgfaFQsOTeHoAoJYioeXx8/DppY4aZM7NcXrEs650wD4j3AQiUGB8fL2s9oaQcSXoiDvNIAPKHaZrXlFJVZu71RFwlNOYP/Eu6sgc1D0/WKQWCFwzDmPDrFUxH1yds2y4Vi8W/g0ZURu3k5KRXc5GdiPpqHhtA0BOjo6NbuhLM3HQc51RPJGV+Zgl0lIOUkJ7IZrOlxcXFrhLDRu0sQ4ssQRiEGEd4RHO53Gq73Z4mogYR9dVcH7ULA5ADRAlmDnwiA8Bl5u8A8kT0KLBXz/Mq+Xx+Y25urjdqlwJAAyFKPAUgIPTnlMnEyZJYJdAP8m27RkRz2u+eRKtlWW91k7kSABIsSikB8FgHAOCg0+kUkzpmIgUGRCr7IOQc8YnEUR4bgM+8Hur2L8wsU9CLch9E7CiPBcAwjNvMvD8oUicmJjKu624BENuWxkykxFAAEcz77LXRaEw6jnOuADsTQBKHG7TUxAmwSABJIjWYBn+pKWs9MTTKBwIIB0uQalGRGvaJcICJEul0emVpaak9NA3Pwzx8aFSAWZZ1Ksr7FDhvpA5yPOmJOFHeAxBmnkT2KMvVlOgbUdu2i8FS0wUgl2cyGfloiLVGxfH44B1RYmRkpKLvmPpSQ6Zp3nBd9ysAubz7xSLb69TUVOxIHQYoQokD27bXaHd39xMRrfmHOADEUHp7+7DD4/7v7xP6UnMC4JV8nP4CMHsVzMPgfLMSggtEJLZt0N7e3qznefNE9LPVav1YX18/isvqPO/50/HE87w7Sqnmf4OPZN941jrbAAAAAElFTkSuQmCC"},"6e73":function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"tab"},[e._l(e.tab,(function(t,i){return[n("v-uni-view",{key:t.id+"_0",class:e.selectid==t.id?"txt1":"",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.gotabbal(t.id)}}},[e._v(e._s(t.title))])]}))],2),n("v-uni-view",{staticStyle:{width:"100%",height:"80rpx"}}),0==e.orderList.length?n("v-uni-view",{staticClass:"bgc"},[n("v-uni-image",{attrs:{src:i("4487").replace(/^\./,"")}}),n("v-uni-view",{staticStyle:{"text-align":"center","font-size":"26rpx","font-family":"PingFang SC","font-weight":"400",color:"#999999",margin:"50rpx 0"}},[e._v("您还没有相关订单")])],1):n("v-uni-view",e._l(e.orderList,(function(t,i){return n("v-uni-view",{key:i,staticClass:"list"},[n("v-uni-view",{staticClass:"one",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.goshop(t.order_supplier,t.supplier_status)}}},[n("v-uni-view",{staticClass:"left"},[e._v("订单编号："+e._s(t.order_id))]),n("v-uni-view",{class:0==t.order_status||6==t.order_status?"right":"right1"},[e._v(e._s(t.order_name))])],1),e._l(e.orderList[i].goods_list,(function(i,a){return n("v-uni-view",{key:a,staticClass:"two",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.goparticulars(t.order_index)}}},[n("v-uni-view",{staticClass:"img"},[i.goods_icon?n("v-uni-image",{attrs:{src:e.cdnUrl+i.goods_icon}}):n("v-uni-view",{staticStyle:{width:"100%",height:"100%",border:"1px solid #f5f5f5",color:"#ccc","text-align":"center","line-height":"160rpx"}},[e._v("暂无图片")])],1),n("v-uni-view",{staticClass:"details"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticStyle:{display:"inline-block","background-color":"red",color:"#fff",padding:"0 5rpx","margin-right":"5rpx","border-radius":"5rpx"}},[e._v(e._s("3"==t.order_type?"秒杀":""))]),e._v(e._s(i.goods_name||"暂无名称"))],1),n("v-uni-view",{staticClass:"xia"},[n("v-uni-view",{staticStyle:{display:"flex","align-items":"center"}},[n("v-uni-view",{staticClass:"univalence"},[e._v("￥"+e._s(i.goods_cost/100))]),n("v-uni-view",{staticClass:"num",staticStyle:{"margin-left":"23rpx"}},[e._v("×"+e._s(i.goods_count))])],1)],1)],1)],1)})),n("v-uni-view",{staticClass:"three"},[n("v-uni-view",{staticClass:"allClass"},[e._v("订单总价：￥"+e._s(t.order_total_price/100))]),n("v-uni-view",{staticClass:"btn"},[2==t.order_status?n("v-uni-view",{staticClass:"btn1",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.getStatus(t.order_index)}}},[e._v("退款")]):e._e(),1==t.order_status?n("v-uni-view",{staticClass:"btn2",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.cancelOrder(t.order_index)}}},[e._v("取消订单")]):e._e(),1==t.order_status?n("v-uni-view",{staticClass:"btn1",staticStyle:{"margin-left":"10rpx"},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.payzhifu(t.order_index,t.order_total_price,t.order_coupon)}}},[e._v("去支付")]):e._e(),5!=t.order_status&&6!=t.order_status||0==t.express_num?e._e():n("v-uni-view",{staticClass:"btn2",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.lookWl(t.express_num,t.order_index,t.order_id)}}},[e._v("查看物流")]),5!=t.order_status&&6!=t.order_status||0!=t.express_num?e._e():n("v-uni-view",{staticClass:"btn2",staticStyle:{width:"170rpx"},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.gowuliu(t.order_index)}}},[e._v("查看配送信息")]),5==t.order_status?n("v-uni-view",{staticClass:"btn1",staticStyle:{"margin-left":"10rpx"},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.confimeSh(t.order_index)}}},[e._v("确认收货")]):e._e(),0==t.order_status||7==t.order_status||8==t.order_status||9==t.order_status?n("v-uni-view",{staticClass:"btn3"},[e._v("已取消")]):e._e()],1)],1)],2)})),1),e.isSendFahuo?n("v-uni-view",{staticClass:"msk",staticStyle:{width:"100%",height:"100%",background:"rgba(0,0,0,0.5)",position:"fixed",left:"0",top:"0"}},[n("v-uni-view",{staticClass:"mskBox",staticStyle:{width:"500rpx",background:"#fff",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)","border-radius":"10rpx"}},[n("h2",{staticStyle:{"font-size":"30rpx","font-family":"PingFang SC","font-weight":"500",color:"#333333","text-align":"center","margin-top":"30rpx"}},[e._v("请输入配送员信息")]),n("div",{staticStyle:{width:"400rpx",height:"80rpx",background:"#F5F5F5",margin:"0 auto",display:"flex","align-items":"center","margin-top":"30rpx",padding:"0 20rpx","border-radius":"10rpx"}},[n("p",{staticStyle:{"font-size":"26rpx","font-family":"PingFang SC","font-weight":"500",color:"#333333"}},[e._v("姓名：")]),n("v-uni-input",{staticStyle:{flex:"1","font-size":"26rpx","font-family":"PingFang SC","font-weight":"400",color:"#999999"},attrs:{type:"text",value:"",placeholder:"请输入配送员姓名"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),n("div",{staticStyle:{width:"400rpx",height:"80rpx",background:"#F5F5F5",margin:"0 auto",display:"flex","align-items":"center","margin-top":"30rpx",padding:"0 20rpx","border-radius":"10rpx"}},[n("p",{staticStyle:{"font-size":"26rpx","font-family":"PingFang SC","font-weight":"500",color:"#333333"}},[e._v("电话：")]),n("v-uni-input",{staticStyle:{flex:"1","font-size":"26rpx","font-family":"PingFang SC","font-weight":"400",color:"#999999"},attrs:{type:"number",value:"",placeholder:"请输入配送员电话"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),n("div",{staticStyle:{"text-align":"center",padding:"20rpx 0","font-size":"30rpx","font-family":"PingFang SC","font-weight":"400",color:"#F7271C","border-top":"1px solid #f5f5f5","margin-top":"10rpx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sendFh.apply(void 0,arguments)}}},[e._v("确定")]),n("v-uni-image",{staticStyle:{width:"32rpx",height:"32rpx",position:"absolute",right:"19rpx",top:"19rpx"},attrs:{src:i("6a95").replace(/^\./,""),mode:""},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.gbfh.apply(void 0,arguments)}}})],1)],1):e._e()],1)},o=[]},"86ba":function(e,t,i){"use strict";var n=i("c3f7"),a=i.n(n);a.a},9523:function(e,t){function i(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}e.exports=i},a0b1:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,"uni-page-body[data-v-97c3f636]{background-color:#f5f5f5;position:relative}.bgc[data-v-97c3f636]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);margin:%?300?% auto}.bgc uni-image[data-v-97c3f636]{width:%?374?%;height:%?314?%;opacity:.5}\n/* tab栏 */.tab[data-v-97c3f636]{position:fixed;left:0;top:%?80?%;margin-top:%?0?%;background-color:#fff;height:%?80?%;width:100%;line-height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?26?%;font-family:PingFang SC;font-weight:500;padding:0 %?30?% %?10?%;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:11}.txt1[data-v-97c3f636]{color:#fc4950;border-bottom:%?4?% solid #fc4950}\n/* 订单样式 */.list[data-v-97c3f636]{background-color:#fff;padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:%?10?%}.list uni-image[data-v-97c3f636]{width:100%;height:100%}\n/* 第一行 */.list .one[data-v-97c3f636]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-family:Source Han Sans CN;font-size:%?30?%;padding-bottom:%?10?%;border-bottom:%?1?% solid #f5f5f5}.list .one .left[data-v-97c3f636]{font-weight:400;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.list .one .right[data-v-97c3f636]{font-weight:300;color:#999}.list .one .right1[data-v-97c3f636]{font-weight:300;color:#fd494f}.list .one .image1[data-v-97c3f636]{width:%?37?%;height:%?33?%;margin-right:%?20?%}.list .one .image2[data-v-97c3f636]{width:%?13?%;height:%?26?%;margin-left:%?20?%}\n/* 第二行 */.list .two[data-v-97c3f636]{display:-webkit-box;display:-webkit-flex;display:flex;border-bottom:%?1?% solid #f5f5f5;margin:%?20?% 0;padding:%?30?% 0;-webkit-box-sizing:border-box;box-sizing:border-box}.list .two .img[data-v-97c3f636]{width:%?160?%;height:%?160?%;margin-right:%?20?%}.list .two .details[data-v-97c3f636]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.two .details .title[data-v-97c3f636]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#333;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.two .details .xia[data-v-97c3f636]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-family:Source Han Sans CN;margin-top:%?50?%}.evaluation[data-v-97c3f636]{width:%?135?%;height:%?50?%;text-align:center;background:#fff;border:1px solid #f5281c;-webkit-border-radius:%?25?%;border-radius:%?25?%;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#f5281c;line-height:%?50?%}.details .xia .univalence[data-v-97c3f636]{font-size:%?30?%;font-weight:400;color:#ff3636}.details .xia .num[data-v-97c3f636]{font-size:%?26?%;font-weight:300;color:#999}\n/* 第三行 */.list .three[data-v-97c3f636]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.list .three .allClass[data-v-97c3f636]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#003}.list .three .btn[data-v-97c3f636]{display:-webkit-box;display:-webkit-flex;display:flex}.three .btn .btn1[data-v-97c3f636]{width:%?135?%;height:%?50?%;padding:0 %?10?%;background:#f6281b;-webkit-border-radius:%?25?%;border-radius:%?25?%;line-height:%?50?%;text-align:center;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#fff}.btn2[data-v-97c3f636]{width:%?135?%;height:%?50?%;text-align:center;background:#fff;border:1px solid #f5281c;-webkit-border-radius:%?25?%;border-radius:%?25?%;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#f5281c;line-height:%?50?%}.three .btn .btn3[data-v-97c3f636]{width:%?135?%;height:%?48?%;padding:0 %?10?%;border:%?1?% solid #ccc;-webkit-border-radius:%?25?%;border-radius:%?25?%;line-height:%?50?%;text-align:center;font-size:%?26?%;font-family:Source Han Sans CN;font-weight:300;color:#999}body.?%PAGE?%[data-v-97c3f636]{background-color:#f5f5f5}",""]),e.exports=t},c3f7:function(e,t,i){var n=i("a0b1");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("ae38f796",n,!0,{sourceMap:!1,shadowMode:!1})}}]);