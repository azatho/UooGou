(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-browsing"],{"228f":function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return a}));var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",[a("v-uni-view",{staticClass:"flexd"},[a("v-uni-view",{staticClass:"left",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.black()}}},[a("v-uni-image",{attrs:{src:e("d742").replace(/^\./,"")}})],1),a("v-uni-view",{staticClass:"center"},[t._v("浏览记录")]),t.showbj?a("v-uni-view",{staticClass:"right",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.compile()}}},[t._v("编辑")]):a("v-uni-view",{staticClass:"right",staticStyle:{color:"#333333"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.compiles()}}},[t._v("完成")])],1),0==t.list.length?a("v-uni-view",{staticClass:"bgi"},[a("v-uni-image",{attrs:{src:e("4487").replace(/^\./,"")}}),a("v-uni-view",{staticStyle:{"text-align":"center","font-size":"26rpx","font-family":"PingFang SC","font-weight":"400",color:"#999999",margin:"50rpx 0"}},[t._v("暂无浏览记录")])],1):a("v-uni-view",{staticClass:"brows",staticStyle:{"margin-bottom":"100rpx"}},[a("v-uni-view",{staticStyle:{"margin-top":"88rpx"}}),t._l(t.list,(function(i,e){return a("v-uni-view",{key:e,staticClass:"carry"},[a("v-uni-view",{staticClass:"time"},[t._v(t._s(i[0].foot_time))]),t._l(t.list[e],(function(i,n){return a("v-uni-view",{key:n,staticClass:"record",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gobuy(i.goods_index)}}},[0==t.showbj?a("v-uni-view",{staticClass:"checked",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.getRadio(i.index,e,n)}}},[a("v-uni-label",{staticClass:"radio"},[i.flag?a("v-uni-radio",{staticStyle:{transform:"scale(0.9)"},attrs:{value:"r1",checked:"true",color:"#FD484F"}}):a("v-uni-radio",{staticStyle:{transform:"scale(0.9)"},attrs:{value:"r1"}})],1)],1):t._e(),a("v-uni-view",{staticClass:"img"},[i.goods_icon?a("v-uni-image",{attrs:{src:t.cdnUrl+i.goods_icon}}):a("v-uni-view",{staticStyle:{width:"100%",height:"100%",border:"1px solid #f5f5f5",color:"#ccc","text-align":"center","line-height":"120rpx"}},[t._v("暂无图片")])],1),a("v-uni-view",{staticClass:"txt"},[a("v-uni-view",{staticClass:"tilte"},[t._v(t._s(i.goods_name||"暂无名称"))]),a("v-uni-view",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[a("v-uni-view",{staticClass:"two"},[0==i.goods_type||2==i.goods_type?a("v-uni-view",{staticClass:"money"},[t._v(t._s(0!=i.goods_cost?"￥"+i.goods_cost/100:""))]):t._e(),0!=i.goods_type?a("v-uni-view",{staticClass:"money",staticStyle:{"margin-top":"5rpx"}},[t._v(t._s(2==i.goods_type&&0!=i.goods_cost?"或":"")+t._s(0!=i.goods_score_cost?"￥"+i.goods_score_cost/100:"")+t._s(i.goods_integral&&0!=i.goods_score_cost?"+":"")+t._s(0!=i.goods_integral?i.goods_integral/100+"积分":""))]):t._e()],1),a("v-uni-view",{staticClass:"gobuy",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gobuy(i.goods_index)}}},[t._v("去购买")])],1)],1)],1)}))],2)}))],2),0==t.showbj?a("v-uni-view",{staticClass:"btn"},[a("v-uni-view",{staticClass:"left",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getAllRadio()}}},[a("v-uni-label",[a("v-uni-radio",{staticStyle:{transform:"scale(0.9)"},attrs:{checked:t.browsall,color:"#FD484F"}})],1),t._v("全选")],1),a("v-uni-view",{staticClass:"right",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cancelCollect()}}},[t._v("删除")])],1):t._e()],1)},o=[]},"3be2":function(t,i,e){"use strict";e.r(i);var a=e("8da2"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=n.a},4487:function(t,i,e){t.exports=e.p+"static/img/zwsj.5201ab9c.png"},"718c":function(t,i,e){var a=e("e71d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("abcc54b8",a,!0,{sourceMap:!1,shadowMode:!1})},"89fd":function(t,i,e){"use strict";e.r(i);var a=e("228f"),n=e("3be2");for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);e("d7f2");var s,l=e("f0c5"),c=Object(l["a"])(n["default"],a["b"],a["c"],!1,null,"2a91fa75",null,!1,a["a"],s);i["default"]=c.exports},"8da2":function(t,i,e){"use strict";(function(t){e("c975"),e("a15b"),e("a434"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{cdnUrl:"",list:[],showbj:!0,browsall:!1,checkedRadio:[],counts:0}},methods:{init:function(){var i=this,e=this;e.request({url:"ugo/api/mall.php?c=footList",data:{token:uni.getStorageSync("token")}}).then((function(t){if(t.data.success){for(var a=0;a<t.data.data.list.length;a++)for(var n=0;n<t.data.data.list[a].length;n++)t.data.data.list[a][n].flag=!1,i.counts++;e.list=t.data.data.list}}),(function(i){t("log",i," at pages/my/browsing.vue:93")}))},black:function(){uni.navigateBack({delta:1})},compile:function(){this.showbj=!1},compiles:function(){this.showbj=!0},gobuy:function(t){uni.navigateTo({url:"../common/goodsDetail?id="+t})},getRadio:function(t,i,e){for(var a=0;a<this.list[i].length;a++)e==a&&(this.list[i][e].flag=!this.list[i][e].flag,1==this.list[i][e].flag&&"-1"==this.checkedRadio.indexOf(this.list[i][e].index)?this.checkedRadio.push(this.list[i][e].index):this.checkedRadio.splice(this.checkedRadio.indexOf(this.list[i][e].index),1));for(var n=0;n<this.list.length;n++)for(var o=0;o<this.list[n].length;o++)0==this.list[n][o].flag?this.browsall=!1:this.checkedRadio.length==this.counts&&this.list[n][o].flag&&(this.browsall=!0)},getAllRadio:function(){if(this.checkedRadio=[],this.browsall=!this.browsall,1==this.browsall)for(var t=0;t<this.list.length;t++){this.list[t].flag=!0;for(var i=0;i<this.list[t].length;i++)this.list[t][i].flag=!0,this.checkedRadio.push(this.list[t][i].index)}else{for(t=0;t<this.list.length;t++){this.list[t].flag=!1;for(i=0;i<this.list[t].length;i++)this.list[t][i].flag=!1}this.checkedRadio=[]}},cancelCollect:function(){var t=this;0==t.checkedRadio.length?t.holo.toast({icon:"none",title:"请至少选择一个记录"}):uni.showModal({content:"确定删除吗？",success:function(i){i.confirm&&t.request({url:"ugo/api/mall.php?c=delFoot",data:{token:uni.getStorageSync("token"),foot_ids:t.checkedRadio.join(",")}}).then((function(i){i.data.success?(t.init(),t.checkedRadio=[],t.browsall=!1,t.holo.toast({title:i.data.msg})):t.holo.toast({icon:"none",title:i.data.msg})}))}})}},onShow:function(){this.init(),this.cdnUrl=this.$cdnUrl}};i.default=a}).call(this,e("0de9")["log"])},d742:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAgCAYAAAD0S5PyAAACIklEQVRIS63Wy0tUYRjH8e/vnHHyni3auDAvh1GYWsSgQiBELapFEEW0EII27qMc27eSxv/AVkEUgdCiyyJCcGGS0ibB8ZYLd0FUXjLzvE84ecrERu3M+QM+vO/7/J7nOeI/vlSqvVlOPYhaGQ90UKOh4cSR8mTFDcRNQYWZDR0ICYLOWh/XjbgNajLsK8aTfSPpo+nqjcNV15D1AilgE3gY4gb3hdTXZyprKr3LQNYgLWnVjEcKXS7/YXx6T6Sx8XR50l+9gMgC7ZKtYRqSC+9NzU+8B6woEhAcIqg758m7JTiF2bpJTz2ngam5sXeA2yxMESRT1trinUXqRXSZsSF45hTmZmYm3kZAMSTR2pLpMnlZSWfAzEwvcBqYnh8bBcLt0djtJF4QdHT60IfsPMgDe41z/fm5mhEY3tiZrZ2I19bSedLksoYuSpRhjJhTbnp++RVMru8Wzu2I2pozx83372BcQiSBN5jLhXx+OTs7+/1f6f6NpFKZNizRJ9xVMyoQ4xbS/8NVPV9YGF4r1h4FpPVYRxPJQg66zaxasFn//pW1xNDi4ui3vfpLQdCe9uX1mLnroBrJZjDlEl9WHk9+nFzeCyiUOBV0DCKuCOqAT5i7i790P5/PL+0HKB1SkuuU5GGje8cu8RYUP2xbUOzYRzeL3YARFHsUbEHxh1IBKsF4/HWg2IM6eqDYKyOCYi+vCIq9RiMo9kL/02d//1r8BENAX2iIIl0qAAAAAElFTkSuQmCC"},d7f2:function(t,i,e){"use strict";var a=e("718c"),n=e.n(a);n.a},e71d:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,"uni-page-body[data-v-2a91fa75]{position:relative}uni-page-body uni-image[data-v-2a91fa75]{width:100%;height:100%}.flexd[data-v-2a91fa75]{position:fixed;left:0;top:0;width:%?749?%;height:%?88?%;background:#fff;-webkit-box-shadow:%?0?% %?0?% %?5?% %?0?% rgba(0,0,0,.16);box-shadow:%?0?% %?0?% %?5?% %?0?% rgba(0,0,0,.16);line-height:%?88?%;padding:0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-family:PingFang SC;z-index:111111}.flexd .left[data-v-2a91fa75]{width:%?17?%;height:%?32?%}.flexd .center[data-v-2a91fa75]{font-size:%?36?%;font-weight:700;color:#333}.flexd .right[data-v-2a91fa75]{font-size:%?26?%;font-weight:400;color:#fd484f}.bgi[data-v-2a91fa75]{width:%?374?%;height:%?314?%;margin:%?300?% auto}\n\n\t/* 浏览记录内容 */.carry[data-v-2a91fa75]{padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:%?26?%;font-family:PingFang SC;color:#333}.carry .time[data-v-2a91fa75]{font-size:%?30?%;font-weight:500;margin-bottom:%?20?%}.carry .record[data-v-2a91fa75]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-bottom:%?10?%;padding:%?10?% 0;-webkit-box-sizing:border-box;box-sizing:border-box;border-bottom:%?1?% solid #f5f5f5}.carry .record .checked[data-v-2a91fa75]{width:%?36?%;height:%?36?%;margin-right:%?25?%}.carry .record .img[data-v-2a91fa75]{width:%?120?%;height:%?120?%;margin-right:%?20?%}.carry .txt[data-v-2a91fa75]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.carry .txt .tilte[data-v-2a91fa75]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.carry .two[data-v-2a91fa75]{\n/* \t\tdisplay: flex;\n\t\tjustify-content: space-between; */margin-top:%?20?%}.carry .two .money[data-v-2a91fa75]{color:#cf4f49;font-size:%?26?%}.carry  .gobuy[data-v-2a91fa75]{width:%?100?%;height:%?40?%;background:#fd484f;-webkit-border-radius:%?20?%;border-radius:%?20?%;line-height:%?40?%;text-align:center;font-size:%?22?%;color:#fff}\n\n\t/* 底部按钮 */.btn[data-v-2a91fa75]{width:%?750?%;height:%?100?%;line-height:%?100?%;padding:0 %?30?%;padding-right:0;-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;left:0;bottom:0;background:#fff;-webkit-box-shadow:%?0?% %?0?% %?2?% %?0?% rgba(0,0,0,.3);box-shadow:%?0?% %?0?% %?2?% %?0?% rgba(0,0,0,.3);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-family:PingFang SC}.btn uni-image[data-v-2a91fa75]{width:%?36?%;height:%?36?%;margin-right:%?10?%;vertical-align:middle}.btn .left[data-v-2a91fa75]{font-size:%?26?%;font-weight:400;color:#333}.btn .right[data-v-2a91fa75]{width:%?200?%;height:%?100?%;background:#fd484f;font-size:%?30?%;font-weight:500;color:#fff;line-height:%?100?%;text-align:center}",""]),t.exports=i}}]);