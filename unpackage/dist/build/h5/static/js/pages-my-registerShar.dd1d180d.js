(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-registerShar"],{1069:function(e,n,t){var i=t("24fb"),a=t("1de5"),o=t("ba0f"),r=t("90bb"),c=t("a920"),s=t("1847");n=i(!1);var d=a(o),u=a(r),l=a(c),f=a(s);n.push([e.i,"uni-page-body[data-v-1aa38546]{height:100%}.bgc1[data-v-1aa38546]{width:%?750?%;height:100%;background:url("+d+") no-repeat;background-size:100% 100%;padding-top:%?50?%;-webkit-box-sizing:border-box;box-sizing:border-box}.bgc2[data-v-1aa38546]{width:%?700?%;height:%?900?%;background:url("+u+")50% no-repeat;background-size:100% 100%;margin:0 auto;padding:%?40?% %?35?%;-webkit-box-sizing:border-box;box-sizing:border-box}.bgc3[data-v-1aa38546]{width:%?615?%;height:%?350?%;background:url("+l+")50% no-repeat;background-size:cover;text-align:center}.bgc3 uni-image[data-v-1aa38546]{width:%?310?%;height:%?310?%;margin:%?385?% %?160?% %?10?%}.bgc3 .txt[data-v-1aa38546]{font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#333}.bgc3 .btn[data-v-1aa38546]{width:%?490?%;height:%?90?%;background:#ff5f53;-webkit-border-radius:%?45?%;border-radius:%?45?%;font-size:%?30?%;font-family:PingFang SC;font-weight:500;color:#fff;line-height:%?90?%;text-align:center;margin-left:%?70?%;margin-top:%?30?%}.bgc22[data-v-1aa38546]{width:%?670?%;height:%?343?%;background:url("+f+") no-repeat 50%;background-size:100% 100%;position:absolute;top:%?883?%;left:50%;margin-left:%?-335?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.bgc22 .left[data-v-1aa38546]{margin-left:%?40?%;margin-top:%?190?%;font-size:%?26?%;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline}.bgc22 .left .text2[data-v-1aa38546]{font-size:%?50?%;color:#f3281c;font-weight:700;margin:%?0?% %?10?%}.bgc22 .right[data-v-1aa38546]{margin-top:%?200?%;font-size:%?26?%;color:#333;text-decoration:underline;padding:%?30?% %?40?%}",""]),e.exports=n},"10be":function(e,n,t){(function(i){var a;t("c975"),t("ac1f"),t("466d"),t("5319"),t("1276");var o=t("9523");!function(i,o){a=function(){return o(i)}.call(n,t,n,e),void 0===a||(e.exports=a)}(window,(function(e,n){if(!e.jWeixin){var t,a,r={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},c=function(){var e={};for(var n in r)e[r[n]]=n;return e}(),s=e.document,d=s.title,u=navigator.userAgent.toLowerCase(),l=navigator.platform.toLowerCase(),f=!(!l.match("mac")&&!l.match("win")),p=-1!=u.indexOf("wxdebugger"),g=-1!=u.indexOf("micromessenger"),m=-1!=u.indexOf("android"),h=-1!=u.indexOf("iphone")||-1!=u.indexOf("ipad"),v=(a=u.match(/micromessenger\/(\d+\.\d+\.\d+)/)||u.match(/micromessenger\/(\d+\.\d+)/))?a[1]:"",b={initStartTime:U(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},w={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:h?1:m?2:-1,clientVersion:v,url:encodeURIComponent(location.href)},y={},S={_completes:[]},k={state:0,data:{}};E((function(){b.initEndTime=U()}));var _=!1,I=[],x=(t={config:function(n){B("config",y=n);var t=!1!==y.check;E((function(){if(t)P(r.config,{verifyJsApiList:O(y.jsApiList),verifyOpenTagList:O(y.openTagList)},function(){S._complete=function(e){b.preVerifyEndTime=U(),k.state=1,k.data=e},S.success=function(e){w.isPreVerifyOk=0},S.fail=function(e){S._fail?S._fail(e):k.state=-1};var e=S._completes;return e.push((function(){!function(){if(!(f||p||y.debug||v<"6.0.2"||w.systemType<0)){var e=new Image;w.appId=y.appId,w.initTime=b.initEndTime-b.initStartTime,w.preVerifyTime=b.preVerifyEndTime-b.preVerifyStartTime,x.getNetworkType({isInnerInvoke:!0,success:function(n){w.networkType=n.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+w.version+"&o="+w.isPreVerifyOk+"&s="+w.systemType+"&c="+w.clientVersion+"&a="+w.appId+"&n="+w.networkType+"&i="+w.initTime+"&p="+w.preVerifyTime+"&u="+w.url;e.src=t}})}}()})),S.complete=function(n){for(var t=0,i=e.length;t<i;++t)e[t]();S._completes=[]},S}()),b.preVerifyStartTime=U();else{k.state=1;for(var e=S._completes,n=0,i=e.length;n<i;++n)e[n]();S._completes=[]}})),x.invoke||(x.invoke=function(n,t,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,A(t),i)},x.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})},ready:function(e){0!=k.state?e():(S._completes.push(e),!g&&y.debug&&e())},error:function(e){v<"6.0.2"||(-1==k.state?e(k.data):S._fail=e)},checkJsApi:function(e){P("checkJsApi",{jsApiList:O(e.jsApiList)},(e._complete=function(e){if(m){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=function(e){var n=e.checkResult;for(var t in n){var i=c[t];i&&(n[i]=n[t],delete n[t])}return e}(e)},e))},onMenuShareTimeline:function(e){C(r.onMenuShareTimeline,{complete:function(){P("shareTimeline",{title:e.title||d,desc:e.title||d,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){C(r.onMenuShareAppMessage,{complete:function(n){"favorite"===n.scene?P("sendAppMessage",{title:e.title||d,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):P("sendAppMessage",{title:e.title||d,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){C(r.onMenuShareQQ,{complete:function(){P("shareQQ",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){C(r.onMenuShareWeibo,{complete:function(){P("shareWeiboApp",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){C(r.onMenuShareQZone,{complete:function(){P("shareQZone",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){P("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){P("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){P("startRecord",{},e)},stopRecord:function(e){P("stopRecord",{},e)},onVoiceRecordEnd:function(e){C("onVoiceRecordEnd",e)},playVoice:function(e){P("playVoice",{localId:e.localId},e)},pauseVoice:function(e){P("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){P("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){C("onVoicePlayEnd",e)},uploadVoice:function(e){P("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){P("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){P("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){P("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(m){var n=e.localIds;try{n&&(e.localIds=JSON.parse(n))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){P(r.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){P("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){P("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===_?(_=!0,P("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(_=!1,0<I.length){var n=I.shift();wx.getLocalImgData(n)}},e))):I.push(e)},getNetworkType:function(e){P("getNetworkType",{},(e._complete=function(e){e=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var i=n.indexOf(":"),a=n.substring(i+1);switch(a){case"wifi":case"edge":case"wwan":e.networkType=a;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){P("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},o(t,"getLocation",(function(e){P(r.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),o(t,"hideOptionMenu",(function(e){P("hideOptionMenu",{},e)})),o(t,"showOptionMenu",(function(e){P("showOptionMenu",{},e)})),o(t,"closeWindow",(function(e){P("closeWindow",{},e=e||{})})),o(t,"hideMenuItems",(function(e){P("hideMenuItems",{menuList:e.menuList},e)})),o(t,"showMenuItems",(function(e){P("showMenuItems",{menuList:e.menuList},e)})),o(t,"hideAllNonBaseMenuItem",(function(e){P("hideAllNonBaseMenuItem",{},e)})),o(t,"showAllNonBaseMenuItem",(function(e){P("showAllNonBaseMenuItem",{},e)})),o(t,"scanQRCode",(function(e){P("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(h){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e))})),o(t,"openAddress",(function(e){P(r.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),o(t,"openProductSpecificView",(function(e){P(r.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),o(t,"addCard",(function(e){for(var n=e.cardList,t=[],i=0,a=n.length;i<a;++i){var o=n[i],c={card_id:o.cardId,card_ext:o.cardExt};t.push(c)}P(r.addCard,{card_list:t},(e._complete=function(e){var n=e.card_list;if(n){for(var t=0,i=(n=JSON.parse(n)).length;t<i;++t){var a=n[t];a.cardId=a.card_id,a.cardExt=a.card_ext,a.isSuccess=!!a.is_succ,delete a.card_id,delete a.card_ext,delete a.is_succ}e.cardList=n,delete e.card_list}},e))})),o(t,"chooseCard",(function(e){P("chooseCard",{app_id:y.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),o(t,"openCard",(function(e){for(var n=e.cardList,t=[],i=0,a=n.length;i<a;++i){var o=n[i],c={card_id:o.cardId,code:o.code};t.push(c)}P(r.openCard,{card_list:t},e)})),o(t,"consumeAndShareCard",(function(e){P(r.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),o(t,"chooseWXPay",(function(e){P(r.chooseWXPay,V(e),e)})),o(t,"openEnterpriseRedPacket",(function(e){P(r.openEnterpriseRedPacket,V(e),e)})),o(t,"startSearchBeacons",(function(e){P(r.startSearchBeacons,{ticket:e.ticket},e)})),o(t,"stopSearchBeacons",(function(e){P(r.stopSearchBeacons,{},e)})),o(t,"onSearchBeacons",(function(e){C(r.onSearchBeacons,e)})),o(t,"openEnterpriseChat",(function(e){P("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),o(t,"launchMiniProgram",(function(e){P("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var n=e.split("?")[0],t=e.split("?")[1];return n+=".html",void 0!==t?n+"?"+t:n}}(e.path),envVersion:e.envVersion},e)})),o(t,"openBusinessView",(function(e){P("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(m){var n=e.extraData;if(n)try{e.extraData=JSON.parse(n)}catch(n){e.extraData={}}}},e))})),o(t,"miniProgram",{navigateBack:function(e){e=e||{},E((function(){P("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){E((function(){P("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){E((function(){P("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){E((function(){P("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){E((function(){P("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){E((function(){P("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(n){E((function(){n({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}),t),T=1,M={};return s.addEventListener("error",(function(e){if(!m){var n=e.target,t=n.tagName,i=n.src;if(("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t)&&-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var a=n["wx-id"];if(a||(a=T++,n["wx-id"]=a),M[a])return;M[a]=!0,wx.ready((function(){wx.getLocalImgData({localId:i,success:function(e){n.src=e.localData}})}))}}}),!0),s.addEventListener("load",(function(e){if(!m){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var i=n["wx-id"];i&&(M[i]=!1)}}}),!0),n&&(e.wx=e.jWeixin=x),x}function P(n,t,i){e.WeixinJSBridge?WeixinJSBridge.invoke(n,A(t),(function(e){L(n,e,i)})):B(n,i)}function C(n,t,i){e.WeixinJSBridge?WeixinJSBridge.on(n,(function(e){i&&i.trigger&&i.trigger(e),L(n,e,t)})):B(n,i||t)}function A(e){return(e=e||{}).appId=y.appId,e.verifyAppId=y.appId,e.verifySignType="sha1",e.verifyTimestamp=y.timestamp+"",e.verifyNonceStr=y.nonceStr,e.verifySignature=y.signature,e}function V(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function L(e,n,t){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var i=n.errMsg;i||(i=n.err_msg,delete n.err_msg,i=function(e,n){var t=e,i=c[t];i&&(t=i);var a="ok";if(n){var o=n.indexOf(":");"confirm"==(a=n.substring(o+1))&&(a="ok"),"failed"==a&&(a="fail"),-1!=a.indexOf("failed_")&&(a=a.substring(7)),-1!=a.indexOf("fail_")&&(a=a.substring(5)),"access denied"!=(a=(a=a.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=a||(a="permission denied"),"config"==t&&"function not exist"==a&&(a="ok"),""==a&&(a="fail")}return t+":"+a}(e,i),n.errMsg=i),(t=t||{})._complete&&(t._complete(n),delete t._complete),i=n.errMsg||"",y.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var a=i.indexOf(":");switch(i.substring(a+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function O(e){if(e){for(var n=0,t=e.length;n<t;++n){var i=e[n],a=r[i];a&&(e[n]=a)}return e}}function B(e,n){if(!(!y.debug||n&&n.isInnerInvoke)){var t=c[e];t&&(e=t),n&&n._complete&&delete n._complete,i("log",'"'+e+'",',n||""," at until/jssdk.js:703")}}function U(){return(new Date).getTime()}function E(n){g&&(e.WeixinJSBridge?n():s.addEventListener&&s.addEventListener("WeixinJSBridgeReady",n,!1))}}))}).call(this,t("0de9")["log"])},1847:function(e,n,t){e.exports=t.p+"static/img/regesterbgc3.240c1a35.png"},"1f7c":function(e,n,t){"use strict";t.r(n);var i=t("81cc"),a=t("b5f9");for(var o in a)"default"!==o&&function(e){t.d(n,e,(function(){return a[e]}))}(o);t("9038");var r,c=t("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"1aa38546",null,!1,i["a"],r);n["default"]=s.exports},"3bfc":function(e,n,t){var i=t("1069");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=t("4f06").default;a("779d38c5",i,!0,{sourceMap:!1,shadowMode:!1})},"3ca6":function(e,n,t){"use strict";t("ac1f"),t("1276"),Object.defineProperty(n,"__esModule",{value:!0}),n.jweixin=void 0;var i=t("38f4"),a=t("10be");n.jweixin=a,(0,i.request)({url:"ugo/api/app.php?c=nearby_store/getJssdkConf",data:{url:window.location.href.split("#")[0]}}).then((function(e){a.config({debug:!1,appId:e.data.data.appId,timestamp:e.data.data.timestamp,nonceStr:e.data.data.nonceStr,signature:e.data.data.signature,jsApiList:["getLocation","openLocation","onMenuShareAppMessage","onMenuShareTimeline","chooseWXPay"]})}))},"81cc":function(e,n,t){"use strict";var i;t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return i}));var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",{staticStyle:{height:"100%"}},[t("v-uni-view",{staticClass:"bgc1"},[t("v-uni-view",{staticClass:"bgc2"},[t("v-uni-view",{staticClass:"bgc3"},[t("v-uni-image",{attrs:{src:e.qrcode_all}}),t("v-uni-view",{staticClass:"txt"},[e._v("扫一扫立即加入")])],1)],1),t("v-uni-view",{staticClass:"bgc22"},[t("v-uni-view",{staticClass:"left"},[t("v-uni-view",{staticClass:"text1"},[e._v("分享")]),e.qrcode_sum?t("v-uni-view",{staticClass:"text2"},[e._v(e._s(e.qrcode_sum))]):t("v-uni-view",{staticClass:"text2"},[e._v("0")]),t("v-uni-view",{staticClass:"text1"},[e._v("位好友")])],1),t("v-uni-view",{staticClass:"right",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.look.apply(void 0,arguments)}}},[e._v("查看全部>>")])],1)],1)],1)},o=[]},9038:function(e,n,t){"use strict";var i=t("3bfc"),a=t.n(i);a.a},"90bb":function(e,n,t){e.exports=t.p+"static/img/regesterbgc1.6890dd2a.png"},9523:function(e,n){function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}e.exports=t},a920:function(e,n,t){e.exports=t.p+"static/img/regesterbgc2.6669e78b.png"},b5f9:function(e,n,t){"use strict";t.r(n);var i=t("f35f"),a=t.n(i);for(var o in i)"default"!==o&&function(e){t.d(n,e,(function(){return i[e]}))}(o);n["default"]=a.a},ba0f:function(e,n,t){e.exports=t.p+"static/img/regesterbgc.0f4fc105.png"},f35f:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=t("3ca6"),a={data:function(){return{cdnUrl:"",baseUrl:"",openId:"",qrcode_all:"",qrcode_sum:""}},methods:{init:function(){if(uni.getStorageSync("token")){var e=this;e.request({url:"ugo/api/app.php?c=personal/myQrcode",data:{token:uni.getStorageSync("token")}}).then((function(n){n.data.success&&(uni.setStorageSync("all",e.cdnUrl+n.data.data.qrcode_url),e.qrcode_all=e.cdnUrl+n.data.data.qrcode_url,e.qrcode_sum=n.data.data.num)}))}},share:function(){var e=this;i.jweixin.ready((function(){i.jweixin.onMenuShareAppMessage({desc:"加入优购，一起简单购物",title:"A+U购",link:e.$baseUrl+"loveUgo/#/",imgUrl:e.$cdnUrl+"ugoadmin/images/20201212/2020121213342778929_1607751267.png",success:function(){},fail:function(e){alert(JSON.stringify(e))},cancel:function(){e.showShare=!1}})}))},look:function(){uni.navigateTo({url:"/pages/my/registershareList"})}},onShow:function(){this.cdnUrl=this.$cdnUrl,this.baseUrl=this.$baseUrl,this.openId=uni.getStorageSync("openId"),this.share(),this.init()},onLoad:function(){}};n.default=a}}]);