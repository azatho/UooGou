(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-logistics"],{"1f1e":function(e,t,i){"use strict";var n=i("61fd"),o=i.n(n);o.a},"5d4e":function(e,t,i){"use strict";i.r(t);var n=i("90f8"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},"61fd":function(e,t,i){var n=i("b24d");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("38441afe",n,!0,{sourceMap:!1,shadowMode:!1})},"650c":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,"uni-page-body[data-v-d782cf34]{height:100%;position:relative}.bgc[data-v-d782cf34]{width:%?749?%;height:%?765?%;background-color:#f9e6e6}.bgc uni-image[data-v-d782cf34]{width:%?747?%;height:%?422?%;margin-top:%?30?%}.plan[data-v-d782cf34]{width:%?750?%;height:%?743?%;background:#fff;-webkit-box-shadow:%?0?% %?5?% %?24?% %?0?% rgba(6,0,1,.1);box-shadow:%?0?% %?5?% %?24?% %?0?% rgba(6,0,1,.1);-webkit-border-radius:%?50?% %?50?% %?0?% %?0?%;border-radius:%?50?% %?50?% %?0?% %?0?%;position:absolute;left:0;bottom:0;padding:%?220?% %?100?% 0;-webkit-box-sizing:border-box;box-sizing:border-box}.plan uni-image[data-v-d782cf34]{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:%?512?%;height:%?306?%}.plan .btn[data-v-d782cf34]{width:%?320?%;height:%?95?%;background:#fc4950;-webkit-border-radius:%?48?%;border-radius:%?48?%;font-size:%?36?%;font-family:Source Han Sans CN;font-weight:400;color:#fff;line-height:%?95?%;text-align:center;margin:%?100?% auto}a[data-v-d782cf34]{text-decoration:none}a[data-v-d782cf34]:visited{text-decoration:none}.btn1[data-v-d782cf34]{display:inline-block;width:%?320?%;height:%?95?%;background:#fc4950;-webkit-border-radius:%?48?%;border-radius:%?48?%;font-size:%?36?%;font-family:Source Han Sans CN;font-weight:400;color:#fff;text-align:center;line-height:%?95?%;margin-left:%?50?%;margin-top:%?30?%}",""]),e.exports=t},"663b":function(e,t,i){var n=i("650c");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("14bda7c3",n,!0,{sourceMap:!1,shadowMode:!1})},"72e9":function(e,t,i){"use strict";(function(e){var n=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i("b14e")),a={components:{uniSteps:o.default},data:function(){return{options:[{title:"快递员小哥上门取货",desc:"14:20分"},{title:"配送中",desc:"快递员小哥正赶往目的地，请耐心等待"},{title:"待收货",desc:"预计15：00分送达"}],active:0,state:"0",statedata:[],order_index:"",phoneNumber:"19939326664"}},methods:{init:function(){var e=this;e.request({url:"ugo/api/app.php?c=order/lookLogistics",data:{order_index:e.order_index}}).then((function(t){if(t.data.success){e.statedata=t.data.data.data,e.phoneNumber=t.data.data.phone;for(var i=0;i<e.statedata.length;i++)e.options[0].desc=e.statedata[0].fahuo+"分",e.options[2].desc="预计"+e.statedata[2].receiving_time+"分到达"}}))},getWuliu:function(){e("log",111," at pages/order/logistics.vue:57");var t=this;uni.makePhoneCall({phoneNumber:t.phoneNumber})}},onLoad:function(e){this.order_index=e.order_index,this.init()}};t.default=a}).call(this,i("0de9")["log"])},"90f8":function(e,t,i){"use strict";var n=i("4ea4");i("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i("bf0b")),a={name:"UniSteps",components:{uniIcons:o.default},props:{direction:{type:String,default:"row"},activeColor:{type:String,default:"#FC4950"},deactiveColor:{type:String,default:"#999999"},active:{type:Number,default:0},options:{type:Array,default:function(){return[]}}},data:function(){return{}}};t.default=a},b14e:function(e,t,i){"use strict";i.r(t);var n=i("c86d"),o=i("5d4e");for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("1f1e");var r,l=i("f0c5"),s=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"b6f2d064",null,!1,n["a"],r);t["default"]=s.exports},b24d:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".uni-steps[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;width:100%;\n\n\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__row[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__column[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.uni-steps__row-text-container[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-steps__column-text-container[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1}.uni-steps__row-text[data-v-b6f2d064]{\ndisplay:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__column-text[data-v-b6f2d064]{padding:6px 0;/* \n\tborder-bottom-style: solid;\n\tborder-bottom-width: 1px; */border-bottom-color:#e5e5e5;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__row-title[data-v-b6f2d064]{font-size:14px;line-height:16px;text-align:center}.uni-steps__column-title[data-v-b6f2d064]{font-size:14px;text-align:left;line-height:18px}.uni-steps__row-desc[data-v-b6f2d064]{font-size:12px;line-height:14px;text-align:center}.uni-steps__column-desc[data-v-b6f2d064]{font-size:12px;text-align:left;line-height:18px}.uni-steps__row-container[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-steps__column-container[data-v-b6f2d064]{\ndisplay:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;\nwidth:30px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__row-line-item[data-v-b6f2d064]{\ndisplay:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-flex:1;-webkit-flex:1;flex:1;height:14px;line-height:14px;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-steps__column-line-item[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-steps__row-line[data-v-b6f2d064]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:1px;background-color:#999}.uni-steps__column-line[data-v-b6f2d064]{width:1px;background-color:#999}.uni-steps__row-line--after[data-v-b6f2d064]{-webkit-transform:translateX(1px);transform:translateX(1px)}.uni-steps__column-line--after[data-v-b6f2d064]{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-transform:translateY(1px);transform:translateY(1px)}.uni-steps__row-line--before[data-v-b6f2d064]{-webkit-transform:translateX(-1px);transform:translateX(-1px)}.uni-steps__column-line--before[data-v-b6f2d064]{height:6px;-webkit-transform:translateY(-1px);transform:translateY(-1px)}.uni-steps__row-circle[data-v-b6f2d064]{width:5px;height:5px;-webkit-border-radius:100px;border-radius:100px;background-color:#999;margin:0 3px}.uni-steps__column-circle[data-v-b6f2d064]{width:5px;height:5px;-webkit-border-radius:100px;border-radius:100px;background-color:#999;margin:4px 0 5px 0}.uni-steps__row-check[data-v-b6f2d064]{margin:0 6px}.uni-steps__column-check[data-v-b6f2d064]{height:14px;line-height:14px;margin:2px 0}",""]),e.exports=t},b630:function(e,t,i){e.exports=i.p+"static/img/wuliu.31e94459.gif"},c86d:function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return n}));var n={uniIcons:i("bf0b").default},o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"uni-steps"},[i("v-uni-view",{class:["column"===e.direction?"uni-steps__column":"uni-steps__row"]},[i("v-uni-view",{class:["column"===e.direction?"uni-steps__column-text-container":"uni-steps__row-text-container"]},e._l(e.options,(function(t,n){return i("v-uni-view",{key:n,class:["column"===e.direction?"uni-steps__column-text":"uni-steps__row-text"]},[i("v-uni-text",{class:["column"===e.direction?"uni-steps__column-title":"uni-steps__row-title"],staticStyle:{color:"#333333"}},[e._v(e._s(t.title))]),i("v-uni-text",{class:["column"===e.direction?"uni-steps__column-desc":"uni-steps__row-desc"],staticStyle:{color:"#999999"}},[e._v(e._s(t.desc))])],1)})),1),i("v-uni-view",{class:["column"===e.direction?"uni-steps__column-container":"uni-steps__row-container"]},e._l(e.options,(function(t,n){return i("v-uni-view",{key:n,class:["column"===e.direction?"uni-steps__column-line-item":"uni-steps__row-line-item"]},[i("v-uni-view",{class:["column"===e.direction?"uni-steps__column-line":"uni-steps__row-line","column"===e.direction?"uni-steps__column-line--before":"uni-steps__row-line--before"],style:{backgroundColor:n<=e.active&&0!==n?e.activeColor:0===n?"transparent":e.deactiveColor}}),n===e.active?i("v-uni-view",{class:["column"===e.direction?"uni-steps__column-check":"uni-steps__row-check"]},[i("uni-icons",{attrs:{color:e.activeColor,type:"checkbox-filled",size:"14"}})],1):i("v-uni-view",{class:["column"===e.direction?"uni-steps__column-circle":"uni-steps__row-circle"],style:{backgroundColor:n<e.active?e.activeColor:e.deactiveColor}}),i("v-uni-view",{class:["column"===e.direction?"uni-steps__column-line":"uni-steps__row-line","column"===e.direction?"uni-steps__column-line--after":"uni-steps__row-line--after"],style:{backgroundColor:n<e.active&&n!==e.options.length-1?e.activeColor:n===e.options.length-1?"transparent":e.deactiveColor}})],1)})),1)],1)],1)},a=[]},d3ec:function(e,t,i){"use strict";var n=i("663b"),o=i.n(n);o.a},d8cd:function(e,t,i){"use strict";i.r(t);var n=i("e624"),o=i("db66");for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("d3ec");var r,l=i("f0c5"),s=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"d782cf34",null,!1,n["a"],r);t["default"]=s.exports},d9b8:function(e,t,i){e.exports=i.p+"static/img/wl.6ae528cd.png"},db66:function(e,t,i){"use strict";i.r(t);var n=i("72e9"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},e624:function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return n}));var n={uniSteps:i("b14e").default},o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"bgc"},[n("v-uni-image",{attrs:{src:i("b630").replace(/^\./,"")}})],1),n("v-uni-view",{staticClass:"plan"},[n("v-uni-image",{attrs:{src:i("d9b8").replace(/^\./,"")}}),n("uni-steps",{attrs:{options:e.options,direction:"column",active:e.active}}),n("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getWuliu()}}},[e._v("联系快递员")])],1)],1)},a=[]}}]);