(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-agencyAudit"],{"1f1e":function(t,e,i){"use strict";var n=i("61fd"),o=i.n(n);o.a},"4a63":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uniSteps:i("b14e").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[1==t.statedata.apply_status?i("uni-steps",{attrs:{options:t.options,direction:"column",active:0}}):t._e(),2==t.statedata.apply_status?i("v-uni-view",[i("uni-steps",{attrs:{options:t.options1,direction:"column",active:2}}),i("v-uni-view",{staticClass:"txt"},[t._v("失败原因："+t._s(t.statedata.apply_reason)),i("v-uni-text",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.resubmit()}}},[t._v("重新提交")])],1)],1):t._e()],1)},a=[]},"5a51":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".txt[data-v-048f1a08]{font-size:%?24?%;font-family:PingFang SC;font-weight:500;margin:%?-5?% %?50?%;color:#333}.txt uni-text[data-v-048f1a08]{color:#fc4950;margin-left:%?20?%}",""]),t.exports=e},"5d4e":function(t,e,i){"use strict";i.r(e);var n=i("90f8"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"5e48":function(t,e,i){var n=i("5a51");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("0d283908",n,!0,{sourceMap:!1,shadowMode:!1})},"61fd":function(t,e,i){var n=i("b24d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("38441afe",n,!0,{sourceMap:!1,shadowMode:!1})},"76ee":function(t,e,i){"use strict";(function(t){var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("b14e")),a=(n(i("bf0b")),{components:{uniSteps:o.default},data:function(){return{options:[{title:"信息提交成功,等待审核",desc:"2019-04-19 17:27"}],options1:[{title:"信息提交成功,等待审核",desc:"2019-04-19 17:27"},{title:"信息审核失败",desc:"2019-04-19 17:27"}],active:"0",state:"0",statedata:{add_time:"1603949301",update_time:"1603955827",apply_status:"2",apply_reason:"2222",is_del:"0"}}},methods:{init:function(){var e=this;e.request({url:"ugo/api/app.php?c=rank_apply/getApplyInfo",data:{token:uni.getStorageSync("token"),apply_index:0}}).then((function(t){e.statedata=t.data.data,0==e.statedata.merchant_status&&(e.options[0].desc=e.holo.formatTime(e.statedata.add_time)),-1==e.statedata.merchant_status&&(e.options1[0].desc=e.holo.formatTime(e.statedata.add_time),e.options1[1].desc=e.holo.formatTime(e.statedata.update_time))}),(function(e){t("log",e," at pages/my/agencyAudit.vue:58")}))},resubmit:function(){uni.navigateTo({url:"./applyposition"})}},onLoad:function(t){this.cdnUrl=this.$cdnUrl}});e.default=a}).call(this,i("0de9")["log"])},8316:function(t,e,i){"use strict";var n=i("5e48"),o=i.n(n);o.a},"90f8":function(t,e,i){"use strict";var n=i("4ea4");i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("bf0b")),a={name:"UniSteps",components:{uniIcons:o.default},props:{direction:{type:String,default:"row"},activeColor:{type:String,default:"#FC4950"},deactiveColor:{type:String,default:"#999999"},active:{type:Number,default:0},options:{type:Array,default:function(){return[]}}},data:function(){return{}}};e.default=a},b14e:function(t,e,i){"use strict";i.r(e);var n=i("c86d"),o=i("5d4e");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("1f1e");var l,r=i("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"b6f2d064",null,!1,n["a"],l);e["default"]=s.exports},b24d:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".uni-steps[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;width:100%;\n\n\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__row[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__column[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.uni-steps__row-text-container[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-steps__column-text-container[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1}.uni-steps__row-text[data-v-b6f2d064]{\ndisplay:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__column-text[data-v-b6f2d064]{padding:6px 0;/* \n\tborder-bottom-style: solid;\n\tborder-bottom-width: 1px; */border-bottom-color:#e5e5e5;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__row-title[data-v-b6f2d064]{font-size:14px;line-height:16px;text-align:center}.uni-steps__column-title[data-v-b6f2d064]{font-size:14px;text-align:left;line-height:18px}.uni-steps__row-desc[data-v-b6f2d064]{font-size:12px;line-height:14px;text-align:center}.uni-steps__column-desc[data-v-b6f2d064]{font-size:12px;text-align:left;line-height:18px}.uni-steps__row-container[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-steps__column-container[data-v-b6f2d064]{\ndisplay:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;\nwidth:30px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-steps__row-line-item[data-v-b6f2d064]{\ndisplay:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-flex:1;-webkit-flex:1;flex:1;height:14px;line-height:14px;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-steps__column-line-item[data-v-b6f2d064]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-steps__row-line[data-v-b6f2d064]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:1px;background-color:#999}.uni-steps__column-line[data-v-b6f2d064]{width:1px;background-color:#999}.uni-steps__row-line--after[data-v-b6f2d064]{-webkit-transform:translateX(1px);transform:translateX(1px)}.uni-steps__column-line--after[data-v-b6f2d064]{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-transform:translateY(1px);transform:translateY(1px)}.uni-steps__row-line--before[data-v-b6f2d064]{-webkit-transform:translateX(-1px);transform:translateX(-1px)}.uni-steps__column-line--before[data-v-b6f2d064]{height:6px;-webkit-transform:translateY(-1px);transform:translateY(-1px)}.uni-steps__row-circle[data-v-b6f2d064]{width:5px;height:5px;-webkit-border-radius:100px;border-radius:100px;background-color:#999;margin:0 3px}.uni-steps__column-circle[data-v-b6f2d064]{width:5px;height:5px;-webkit-border-radius:100px;border-radius:100px;background-color:#999;margin:4px 0 5px 0}.uni-steps__row-check[data-v-b6f2d064]{margin:0 6px}.uni-steps__column-check[data-v-b6f2d064]{height:14px;line-height:14px;margin:2px 0}",""]),t.exports=e},c86d:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uniIcons:i("bf0b").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-steps"},[i("v-uni-view",{class:["column"===t.direction?"uni-steps__column":"uni-steps__row"]},[i("v-uni-view",{class:["column"===t.direction?"uni-steps__column-text-container":"uni-steps__row-text-container"]},t._l(t.options,(function(e,n){return i("v-uni-view",{key:n,class:["column"===t.direction?"uni-steps__column-text":"uni-steps__row-text"]},[i("v-uni-text",{class:["column"===t.direction?"uni-steps__column-title":"uni-steps__row-title"],staticStyle:{color:"#333333"}},[t._v(t._s(e.title))]),i("v-uni-text",{class:["column"===t.direction?"uni-steps__column-desc":"uni-steps__row-desc"],staticStyle:{color:"#999999"}},[t._v(t._s(e.desc))])],1)})),1),i("v-uni-view",{class:["column"===t.direction?"uni-steps__column-container":"uni-steps__row-container"]},t._l(t.options,(function(e,n){return i("v-uni-view",{key:n,class:["column"===t.direction?"uni-steps__column-line-item":"uni-steps__row-line-item"]},[i("v-uni-view",{class:["column"===t.direction?"uni-steps__column-line":"uni-steps__row-line","column"===t.direction?"uni-steps__column-line--before":"uni-steps__row-line--before"],style:{backgroundColor:n<=t.active&&0!==n?t.activeColor:0===n?"transparent":t.deactiveColor}}),n===t.active?i("v-uni-view",{class:["column"===t.direction?"uni-steps__column-check":"uni-steps__row-check"]},[i("uni-icons",{attrs:{color:t.activeColor,type:"checkbox-filled",size:"14"}})],1):i("v-uni-view",{class:["column"===t.direction?"uni-steps__column-circle":"uni-steps__row-circle"],style:{backgroundColor:n<t.active?t.activeColor:t.deactiveColor}}),i("v-uni-view",{class:["column"===t.direction?"uni-steps__column-line":"uni-steps__row-line","column"===t.direction?"uni-steps__column-line--after":"uni-steps__row-line--after"],style:{backgroundColor:n<t.active&&n!==t.options.length-1?t.activeColor:n===t.options.length-1?"transparent":t.deactiveColor}})],1)})),1)],1)],1)},a=[]},cd66:function(t,e,i){"use strict";i.r(e);var n=i("4a63"),o=i("d6f9");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("8316");var l,r=i("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"048f1a08",null,!1,n["a"],l);e["default"]=s.exports},d6f9:function(t,e,i){"use strict";i.r(e);var n=i("76ee"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a}}]);