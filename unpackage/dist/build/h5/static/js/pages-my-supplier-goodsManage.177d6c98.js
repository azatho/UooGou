(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-supplier-goodsManage"],{12762:function(t,i,n){"use strict";n.r(i);var e=n("5ddd"),a=n("29c7");for(var o in a)"default"!==o&&function(t){n.d(i,t,(function(){return a[t]}))}(o);n("8bdd");var s,c=n("f0c5"),r=Object(c["a"])(a["default"],e["b"],e["c"],!1,null,"5ae402ba",null,!1,e["a"],s);i["default"]=r.exports},"1ac1":function(t,i,n){var e=n("ebf0");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("3aa5068a",e,!0,{sourceMap:!1,shadowMode:!1})},"287e":function(t,i,n){"use strict";var e=n("4ea4");n("99af"),n("e25e"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=e(n("2909")),o={data:function(){return{table:[{type:2,title:"已上架"},{type:3,title:"已下架"}],suoyin:0,datas:{type:2,limit:10,page:1},pages:0,list:{data:[]},isSzKc:!1,nums:0,nums2:0,goodsIndex:""}},created:function(){this.init()},onReachBottom:function(){this.pages>this.datas.page&&(this.datas.page++,this.init())},methods:{goBack:function(){uni.redirectTo({url:"progressEnter"})},init:function(){var t=this;this.request({url:"ugo/api/app.php?c=supplier/getGoodsList",data:this.datas}).then((function(i){i.data.success&&(t.list.data.length>0?t.list.data=[].concat((0,a.default)(t.list.data),[i.data.data]):t.list=i.data,t.pages=i.data.page)}))},select:function(t,i){this.suoyin=t,this.datas.type=i,this.list={data:[]},this.datas.page=0,this.init()},editGood:function(t,i,n){0!=t?uni.navigateTo({url:"./editproduct?goods_index="+i+"&sku_index="+n}):this.holo.toast({title:"多规格只能在后台进行编辑"})},isGround:function(t){var i=this,n="",e="";0==this.suoyin?(n="提示",e="确定要下架吗?"):1==this.suoyin&&(n="提示",e="确定要上架吗?"),uni.showModal({title:n,content:e,success:function(n){n.confirm&&i.request({url:"ugo/api/app.php?c=supplier/changeGoodsStatus",data:{goods_index:t,type:1}}).then((function(t){i.holo.toast({title:t.data.msg,icon:"none"}),i.datas.page=0,i.list={data:[]},i.init()}))}})},kucun:function(t,i,n,e){0!=t?(this.isSzKc=!0,this.goodsIndex=i,this.nums=e,this.nums2=n):this.holo.toast({title:"多规格只能在后台进行编辑"})},cancel:function(){this.isSzKc=!1},qrs:function(){var t=this;parseInt(this.nums2)<parseInt(this.nums)?uni.showToast({title:"可订库存数必须小于实际库存数",icon:"none"}):this.request({url:"ugo/api/app.php?c=supplier/changeGoodsStatus",data:{goods_index:this.goodsIndex,type:4,num:this.nums2,num2:this.nums}}).then((function(i){t.holo.toast({title:i.data.msg,icon:"none"}),t.isSzKc=!1,t.datas.page=0,t.list={data:[]},t.init()}))},bwtj:function(t,i){var n=this,e="",a="";0==i?(e="提示",a="确定要标记为特价吗?"):7==i&&(e="提示",a="确定要取消特价吗?"),uni.showModal({title:e,content:a,success:function(i){i.confirm&&n.request({url:"ugo/api/app.php?c=supplier/changeGoodsStatus",data:{goods_index:t,type:2}}).then((function(t){n.holo.toast({title:t.data.msg,icon:"none"}),n.datas.page=0,n.list={data:[]},n.init()}))}})},delGood:function(t){var i=this;uni.showModal({title:"提示",content:"确定要删除该商品吗?",success:function(n){n.confirm&&(uni.showLoading({title:"正在删除"}),i.request({url:"ugo/api/app.php?c=supplier/changeGoodsStatus",data:{goods_index:t,type:3}}).then((function(t){uni.hideLoading(),i.holo.toast({title:t.data.msg,icon:"none"}),i.datas.page=0,i.list={data:[]},i.init()})))}})}}};i.default=o},"29c7":function(t,i,n){"use strict";n.r(i);var e=n("287e"),a=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(i,t,(function(){return e[t]}))}(o);i["default"]=a.a},"48a2":function(t,i,n){t.exports=n.p+"static/img/noshop(1).9fa30672.png"},"5ddd":function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return o})),n.d(i,"a",(function(){return e}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticStyle:{background:"#F5F5F5"}},[e("v-uni-view",{staticClass:"topTitle",staticStyle:{"font-size":"32rpx","font-weight":"700"}},[t._v("商品管理"),e("v-uni-view",{staticClass:"back",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goBack.apply(void 0,arguments)}}},[e("v-uni-image",{attrs:{src:n("d742").replace(/^\./,""),mode:""}})],1)],1),e("v-uni-view",{staticClass:"glTitle",staticStyle:{"background-color":"#FFFFFF"}},t._l(t.table,(function(i,n){return e("v-uni-view",{key:i.type,class:n===t.suoyin?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.select(n,i.type)}}},[t._v(t._s(i.title))])})),1),t._l(t.list.data,(function(i,n){return e("v-uni-view",{staticClass:"content",staticStyle:{"background-color":"#FFFFFF","margin-bottom":"20rpx","padding-bottom":"10rpx"}},[e("v-uni-view",{staticClass:"contentList"},[e("v-uni-view",{staticClass:"contentListTop"},[e("v-uni-view",{staticClass:"img"},[e("v-uni-image",{staticStyle:{width:"100%",height:"100%","border-radius":"10rpx"},attrs:{src:t.$cdnUrl+i.goods_icon,mode:""}})],1),e("v-uni-view",{staticClass:"contentListright"},[e("h2",[5==i.activity_type||6==i.active?e("p",{staticStyle:{display:"inline-block",background:"linear-gradient(180deg, #FF6643, #FF8666)",padding:"0 10rpx",color:"#fff","margin-right":"10rpx"}},[t._v(t._s(5==i.activity_type?"拼团":"秒杀"))]):t._e(),e("v-uni-text",[t._v(t._s(i.goods_name))])],1),0==i.goods_type||2==i.goods_type?e("p",{staticClass:"price"},[t._v("￥"+t._s(i.goods_cost/100))]):t._e(),1==i.goods_type?e("p",{staticClass:"jf"},[t._v(t._s(0!=i.goods_score_cost?"￥"+i.goods_score_cost/100:"")+t._s(0!=i.goods_score_cost&&i.goods_integral?"+":"")+t._s(0!=i.goods_integral?i.goods_integral/100+"积分":""))]):t._e(),2==i.goods_type?e("p",{staticClass:"jf"},[t._v("或"+t._s(0!=i.goods_score_cost?"￥"+i.goods_score_cost/100:"")+t._s(0!=i.goods_score_cost&&i.goods_integral?"+":"")+t._s(0!=i.goods_integral?i.goods_integral/100+"积分":""))]):t._e(),e("v-uni-view",{staticStyle:{display:"flex","justify-content":"space-between"}},[e("p",{staticClass:"scj"},[t._v("￥"+t._s(i.goods_price/100))]),e("p",{staticClass:"xl"},[t._v("销量"+t._s(i.goods_sale)+" | 库存"+t._s(i.goods_sku_count))])])],1)],1)],1),e("v-uni-view",{staticClass:"btnList"},[e("v-uni-view",{attrs:{type:"default"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.editGood(i.is_one,i.goods_index,i.sku_index)}}},[t._v("编辑")]),e("v-uni-view",{attrs:{type:"default"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.isGround(i.goods_index)}}},[t._v(t._s(0==t.suoyin?"下架":"上架"))]),e("v-uni-view",{attrs:{type:"default"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.kucun(i.is_one,i.goods_index,i.goods_sku_count,i.sku_inventory)}}},[t._v("库存管理")]),e("v-uni-view",{attrs:{type:"default"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.delGood(i.goods_index)}}},[t._v("删除")])],1)],1)})),0==t.list.data.length?e("v-uni-view",{staticStyle:{"text-align":"center","background-color":"#FFFFFF"}},[e("v-uni-image",{staticStyle:{width:"480rpx",height:"360rpx","margin-top":"200rpx"},attrs:{src:n("48a2").replace(/^\./,""),mode:""}}),e("v-uni-view",{staticClass:"font-26",staticStyle:{color:"#999999"}},[t._v("暂无商品")])],1):t._e(),t.isSzKc?e("v-uni-view",{staticClass:"msk"},[e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"contentTitle"},[t._v("管理库存")]),e("v-uni-view",{staticClass:"contentCenter"},[e("v-uni-view",{},[t._v("修改可订库存")]),e("v-uni-input",{attrs:{type:"number",value:t.nums},model:{value:t.nums,callback:function(i){t.nums=i},expression:"nums"}})],1),e("v-uni-view",{staticClass:"contentCenter"},[e("v-uni-view",{},[t._v("修改实际库存")]),e("v-uni-input",{attrs:{type:"number",value:t.nums2},model:{value:t.nums2,callback:function(i){t.nums2=i},expression:"nums2"}})],1),e("v-uni-view",{staticClass:"contentBtn"},[e("v-uni-view",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cancel.apply(void 0,arguments)}}},[t._v("取消")]),e("v-uni-view",{staticClass:"confime",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.qrs.apply(void 0,arguments)}}},[t._v("确认")])],1)],1)],1):t._e()],2)},o=[]},"8bdd":function(t,i,n){"use strict";var e=n("1ac1"),a=n.n(e);a.a},d742:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAgCAYAAAD0S5PyAAACIklEQVRIS63Wy0tUYRjH8e/vnHHyni3auDAvh1GYWsSgQiBELapFEEW0EII27qMc27eSxv/AVkEUgdCiyyJCcGGS0ibB8ZYLd0FUXjLzvE84ecrERu3M+QM+vO/7/J7nOeI/vlSqvVlOPYhaGQ90UKOh4cSR8mTFDcRNQYWZDR0ICYLOWh/XjbgNajLsK8aTfSPpo+nqjcNV15D1AilgE3gY4gb3hdTXZyprKr3LQNYgLWnVjEcKXS7/YXx6T6Sx8XR50l+9gMgC7ZKtYRqSC+9NzU+8B6woEhAcIqg758m7JTiF2bpJTz2ngam5sXeA2yxMESRT1trinUXqRXSZsSF45hTmZmYm3kZAMSTR2pLpMnlZSWfAzEwvcBqYnh8bBcLt0djtJF4QdHT60IfsPMgDe41z/fm5mhEY3tiZrZ2I19bSedLksoYuSpRhjJhTbnp++RVMru8Wzu2I2pozx83372BcQiSBN5jLhXx+OTs7+/1f6f6NpFKZNizRJ9xVMyoQ4xbS/8NVPV9YGF4r1h4FpPVYRxPJQg66zaxasFn//pW1xNDi4ui3vfpLQdCe9uX1mLnroBrJZjDlEl9WHk9+nFzeCyiUOBV0DCKuCOqAT5i7i790P5/PL+0HKB1SkuuU5GGje8cu8RYUP2xbUOzYRzeL3YARFHsUbEHxh1IBKsF4/HWg2IM6eqDYKyOCYi+vCIq9RiMo9kL/02d//1r8BENAX2iIIl0qAAAAAElFTkSuQmCC"},ebf0:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.msk[data-v-5ae402ba]{background:rgba(0,0,0,.5);position:fixed;width:100%;height:100%;top:0;left:0}.msk .content[data-v-5ae402ba]{width:%?610?%;padding:%?20?% 0;background:#fff;-webkit-border-radius:%?20?%;border-radius:%?20?%;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.msk .content .contentTitle[data-v-5ae402ba]{text-align:center;padding:%?20?% 0;border-bottom:1px solid #f5f5f5;font-size:%?30?%;font-family:Hiragino Sans GB;font-weight:400;color:#222}.msk .content .contentCenter[data-v-5ae402ba]{margin:%?30?% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?58?%}.msk .content .contentCenter uni-view[data-v-5ae402ba]{font-size:%?26?%;font-family:Hiragino Sans GB;font-weight:400;color:#999}.msk .content .contentCenter uni-input[data-v-5ae402ba]{padding:0 %?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;height:%?70?%;-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:%?43?%;background:#f7f7f7;-webkit-border-radius:6px;border-radius:6px}.msk .content .contentBtn[data-v-5ae402ba]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;text-align:center}.msk .content .contentBtn uni-view[data-v-5ae402ba]{margin:%?10?% 0;width:%?225?%;height:%?70?%;line-height:%?70?%;border:1px solid #999;-webkit-border-radius:35px;border-radius:35px}.msk .content .contentBtn .confime[data-v-5ae402ba]{background:#008964;color:#fff}.glTitle[data-v-5ae402ba]{display:-webkit-box;display:-webkit-flex;display:flex}.glTitle uni-view[data-v-5ae402ba]{width:50%;text-align:center;padding:%?10?% 0;border-bottom:1px solid #f5f5f5;font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#333}.glTitle uni-view.active[data-v-5ae402ba]{position:relative;color:#f5281c}.glTitle uni-view.active[data-v-5ae402ba]::after{content:"";width:%?40?%;height:%?4?%;background:#f5281c;position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.contentListTop[data-v-5ae402ba]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?% %?30?% 0 %?30?%}.contentListTop .img[data-v-5ae402ba]{width:%?180?%;height:%?180?%;background:pink;-webkit-border-radius:%?10?%;border-radius:%?10?%}.contentListTop .contentListright[data-v-5ae402ba]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:%?23?%}.contentListTop .contentListright h2[data-v-5ae402ba]{font-size:%?30?%;font-family:PingFang SC;font-weight:500;color:#333;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.contentListTop .contentListright .price[data-v-5ae402ba]{font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#ff1c1c}.contentListTop .contentListright .jf[data-v-5ae402ba]{font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#ff1c1c}.contentListTop .contentListright .scj[data-v-5ae402ba]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;text-decoration:line-through;color:#999}.contentListTop .contentListright .xl[data-v-5ae402ba]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#999}.btnList[data-v-5ae402ba]{display:-webkit-box;display:-webkit-flex;display:flex;padding:0 0 0 %?40?%;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;margin-top:%?43?%}.btnList uni-view[data-v-5ae402ba]{width:%?120?%;height:%?50?%;line-height:%?50?%;text-align:center;margin-right:%?20?%;background:#fff;border:1px solid #f5281c;-webkit-border-radius:%?25?%;border-radius:%?25?%;font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#f4291c}',""]),t.exports=i}}]);