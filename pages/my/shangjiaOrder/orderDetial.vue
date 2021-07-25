<!-- 订单详情页面 -->
<template>
	<view>
		<!-- 头 -->
		<view class="head">
			{{orderInfo.order_status==0?'已取消':orderInfo.order_status==1?'待支付':orderInfo.order_status==2?'待发货':orderInfo.order_status==4?'已部分发货':orderInfo.order_status==5?'待收货':orderInfo.order_status==6?'已完成':orderInfo.order_status==7?'退款审核中':orderInfo.order_status==9?'已取消':orderInfo.order_status==5?'待收货':orderInfo.order_status==6?'已完成':orderInfo.order_status=='8'?'退款中':''}}
		</view>
		<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view> 
		<!-- 地址 -->
		<view class="site">
			<view class="img">
				<image src="../../../static/address1.png"></image>
				<view class="center">
					<view class="txt">{{orderInfo.order_contacts}}
					  <text>{{orderInfo.order_phone}}</text>
					   <image src="../../../static/callPhone.png" mode="" style="width:46rpx;height:46rpx;vertical-align:middle;margin:0 10rpx;" @click="callPhone(orderInfo.order_phone)"></image>
					</view>
					<view class="dizhi">{{orderInfo.order_address}}
					<image src="../../../static/maoAdress.png" mode="" style="width:46rpx;height:46rpx;vertical-align:middle;margin:0 10rpx;" @click="getmap(orderInfo.lng,orderInfo.lat,orderInfo.order_address)"></image>
					</view>
				</view>
			</view>
			<view class="right">
				<!-- <image src="../../static/back.png"></image> -->
			</view>
		</view>
		<!-- 送达时间 -->
		<view class="time" v-if="orderInfo.order_status!=0">
			<view class="txt1">预计送达时间</view>
			<view class="txt2">
				{{orderInfo.promptly_status}} {{orderInfo.promptly_time}} 
			</view>
		</view>
		<view class="time" v-else>
			<view class="txt1">预计送达时间</view>
			<view class="txt3">
				{{orderInfo.promptly_status}}  {{orderInfo.promptly_time}}</image>
			</view>
		</view>
		<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view>
		<!-- 商品详情 -->
		<view class="list">
			<view class="one" @click="goShop(orderInfo.supplier_id,orderInfo.supplier_status)">
				<view class="left">
					<image src="../../../static/case.png" class="img1"></image>
					{{orderInfo.supplier_name}}
					<image src="../../../static/back1.png" class="img2"></image>
				</view>
			</view>
			<!-- 确认收货时显示的样式 -->
			<block v-for="(items,k) in goods_list" :key ="k">
				<view class="two" @click="goDetail(items.goods_index,items.goods_id,items.is_ok,items.jump_type)" v-if="orderInfo.order_status==5">
					<view class="img">
						<image :src="cdnUrl+items.goods_icon" v-if="items.goods_icon"></image>
						<view v-else style="width: 100%;height: 100%;border:1px solid #f5f5f5;color:#ccc; text-align: center; line-height: 160rpx;">
							暂无图片
						</view>
					</view>
					<view class="details">
						<view class="title">{{items.goods_name || '暂无名称'}}</view>
						<view style="display: flex;justify-content: space-between;align-items:center">
							<view class="bgc">{{items.goods_norms?items.goods_norms:'无'}}</view>
							<view class="xia"><view class="num">×{{items.goods_count?items.goods_count:'暂无'}}</view></view>
						</view>
						<view class="xia">
							<view class="univalence">{{items.goods_cost!=0?'￥'+items.goods_cost/100:''}}{{items.goods_cost!=0&&items.goods_integral!=0?'+':""}}{{items.goods_integral!=0?items.goods_integral/100+'积分':''}}</view>
							<!-- <view class="btn2" @click="afterSale(items,orderInfo.barter_button,orderInfo.refund_button,orderInfo.ps_phone,orderInfo.frequent_phone)">申请售后</view> -->
						</view>
					</view>
				</view>
				<view class="two" @click="goDetail(items.goods_index,items.goods_id,items.is_ok,items.jump_type)" v-else>
					<view class="img">
						<image :src="cdnUrl+items.goods_icon" v-if="items.goods_icon"></image>
						<view v-else style="width: 100%;height: 100%;border:1px solid #f5f5f5;color:#ccc; text-align: center; line-height: 160rpx;">
							暂无图片
						</view>
					</view>
					<view class="details">
						<view class="title">{{items.goods_name || '暂无名称'}}</view>
						<view style="width: 250rpx; overflow: hidden;white-space: nowrap;"><text class="bgc">{{items.goods_norms?items.goods_norms:'无'}}</text></view>
						<view class="xia">
							<view class="univalence">{{items.goods_cost!=0?'￥'+items.goods_cost/100:''}}{{items.goods_cost!=0&&items.goods_integral!=0?'+':""}}{{items.goods_integral!=0?items.goods_integral/100+'积分':''}}</view>
							<view class="num">×{{items.goods_count?items.goods_count:'暂无'}}</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 备注 -->
			<view class="remark">
				<view>备注</view>
				<view class="txt2">{{orderInfo.order_remark?orderInfo.order_remark:'你没有填写备注'}}</view>
			</view>
		</view>
		<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view>
		<!-- 订单价格 -->
		<view class="price">
			<view class="goodprice">
				<view class="one">商品总价</view>
				<view class="two">{{orderInfo.order_goods_price!=0?'￥'+orderInfo.order_goods_price/100:''}}{{orderInfo.order_goods_price!=0&&orderInfo.order_score_price!=0?'+':''}}{{orderInfo.order_score_price!=0?orderInfo.order_score_price/100+'积分':''}}</view>
			</view>
			<view class="goodprice">
				<view class="one">配送费</view>
				<view class="two">￥{{orderInfo.order_freight_price?orderInfo.order_freight_price/100:'0'}}</view>
			</view>
			<view class="goodprice" v-if="orderInfo.order_deduct_youhui!=0">
				<view class="one">优惠券</view>
				<view class="two">￥{{orderInfo.order_deduct_youhui/100}}</view>
			</view>
			<view class="goodprice">
				<view class="one1">订单总价</view>
				<view class="two1">{{orderInfo.order_total_price!=0?'￥'+orderInfo.order_total_price/100:''}}{{orderInfo.order_total_price!=0&&orderInfo.order_score_price!=0?'+':''}}{{orderInfo.order_score_price!=0?orderInfo.order_score_price/100+'积分':''}}</view>
			</view>
		</view>
		<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view>
		<!-- 配送员信息-->
		<div class="order1" v-if="orderInfo.order_status>2 && orderInfo.order_status<7" style="margin-bottom: 10rpx!important;">
			<view class="txt"><text></text>配送员信息</view>
			<view class="serial">配送员姓名：{{sendName}}</view>
			<view class="serial" style="display: flex;justify-content: start;align-items: center;">
				<view class="">
					配送员电话：{{sendPhone}}
				</view>
			  <image src="../../../static/callPhone.png" mode="" style="width:46rpx;height:46rpx;margin:0 10rpx;" @click="callPhone(sendPhone)"></image>
			</view>  
		</div>
		<!-- 订单信息 -->
		<view class="order">
			<view class="txt"><text></text>订单信息</view>
			<view class="serial">
				<view>订单编号：{{orderInfo.order_id}}</view>
				<view class="copy" @click="fz(orderInfo.order_id)">复制</view>
			</view>
			<view class="serial">下单时间：{{orderInfo.order_time}}</view>
			<view class="serial" v-if="orderInfo.order_status==0">取消时间：{{orderInfo.cancel_time}}</view>
			<view class="serial" v-if="orderInfo.order_status!=0&&orderInfo.order_status!=1">支付时间：{{orderInfo.payment_time}}</view>
			<view class="serial"  v-if="orderInfo.order_status==5||orderInfo.order_status==6">发货时间：{{orderInfo.fahuo_time}}</view>
			<view v-if="orderInfo.order_status==6">收货时间：{{orderInfo.confirm_time}}</view>
		</view>
		<!-- 按钮 -->
		<view class="btn">
			<!-- 5种按钮状态, 三种按钮样式   goods_status-->
			<view :class="orderInfo.order_status==5 || orderInfo.order_status==6?'btn3':orderInfo.order_status==7 || orderInfo.order_status==2?'btn1':'btn3'" @click="getStatus(orderInfo.order_status,orderInfo)">
				{{orderInfo.order_status==0?'已取消':orderInfo.order_status==1?'去支付':orderInfo.order_status==2?'立即发货':orderInfo.order_status==7?'审核':orderInfo.order_status==9?'已取消':orderInfo.order_status==5?'待收货':orderInfo.order_status==6?'已完成':orderInfo.order_status=='8'?'退款中':''}}
			</view>
		</view>
		<!-- 发货弹窗 -->
		<view class="msk" v-if="isSendFahuo" style="width:100%;height:100%;background: rgba(0,0,0,0.5);position: fixed;left: 0;top:0;">
			<view class="mskBox" style="width:500rpx;background: #fff;position: absolute;left: 50%;top:50%;transform: translate(-50%,-50%);border-radius: 10rpx;">
				<h2 style="font-size: 30rpx;font-family: PingFang SC;font-weight: 500;color: #333333;text-align: center;margin-top:30rpx;">请输入配送员信息</h2>
			    <div style="width: 400rpx;height:80rpx;background: #F5F5F5;margin:0 auto;display: flex;align-items: center;margin-top:30rpx;padding:0 20rpx;border-radius: 10rpx;">
				   <p style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #333333;">姓名：</p>
				   <input type="text" v-model="name" value="" placeholder="请输入配送员姓名" style="flex:1;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;" />
				   
				</div>
				<div style="width: 400rpx;height:80rpx;background: #F5F5F5;margin:0 auto;display: flex;align-items: center;margin-top:30rpx;padding:0 20rpx;border-radius: 10rpx;">
				   <p style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #333333;">电话：</p>
				   <input type="number" v-model="phone" value="" placeholder="请输入配送员电话" style="flex:1;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;" />
				</div>
				<div @click="sendFh" style="text-align: center;padding: 20rpx 0;font-size: 30rpx;font-family: PingFang SC;font-weight: 400;color: #F7271C;border-top:1px solid #f5f5f5;margin-top:10rpx;">
					确定
				</div>
				<image src="../../../static/open.png" @click="gbfh" mode="" style="width:32rpx;height: 32rpx;position: absolute;right: 19rpx;top:19rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_index:'',//订单自增编号
				time:true,//订单是否取消==>送达时间
				orderInfo:{},
				cdnUrl:'',
				goods_list:[],
				data:'',//
				sendName:'',
				sendPhone:'',
				order_indexs:'',
				isSendFahuo:'',
				phone:'',
				name:''
			}
		},
		methods: {
			// 打开地图
			getmap(longitude,latitude,merchant_name){
				uni.openLocation({
					latitude: Number(latitude),
					longitude:Number(longitude),
					name:merchant_name,
					success: function () {
						console.log(latitude,longitude);
					},
					fail: function (res){
						console.log(res)
					}
				});	
			},
			init(){
				let self = this;
				self.request({
					url:'ugo/api/app.php?c=mallOrderInfoV2',
					data:{
						token: uni.getStorageSync('token'),
						order_index:self.order_index
					},
				}).then(res=>{
						if(res.data.success){
							this.sendName = uni.getStorageSync('sendName');
							this.sendPhone = uni.getStorageSync('sendPhone');
							self.goods_list=res.data.data.goods_list
							self.orderInfo=res.data.data
							self.orderInfo.order_time=self.holo.formatTime(self.orderInfo.order_time*1000)//下单时间
							// self.orderInfo.promptly_time=self.holo.formatTime(self.orderInfo.promptly_time*1000)//立即送达
							self.orderInfo.fahuo_time=self.holo.formatTime(self.orderInfo.fahuo_time*1000)//发货时间
							self.orderInfo.payment_time=self.holo.formatTime(self.orderInfo.payment_time*1000)//支付时间
							self.orderInfo.confirm_time=self.holo.formatTime(self.orderInfo.confirm_time*1000)//确认收货时间
							self.orderInfo.cancel_time=self.holo.formatTime(self.orderInfo.cancel_time*1000)//取消时间
						}else{
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						console.log(rej);
				})
			},
			//去店铺主页
			goShop(id,supplier){
				// console.log(id);
				if(supplier!=3){
					uni.navigateTo({
						url:'../common/shopHome?id='+id
					})
				}else{
					uni.navigateTo({
						url:'../my/NoShop?id='+id
					})
				}
			},
			//拨打电话
			callPhone(phone){
					uni.makePhoneCall({
						phoneNumber: phone,
					})
			},
			// 去对应的商品页面
			goDetail(index,id,status,type){
				if(type=='3'){
					console.log(type);
					uni.navigateTo({
						url:'../group/seckillDetail?skill_id='+id
					})
				}else{
					if(status=='1'){
						uni.navigateTo({
							url:'../common/goodsDetail?id='+index
						})
					}else{
						uni.navigateTo({
							url:'../my/Nocommunity'
						})
					}
				}
			},
			// 申请售后按钮
			afterSale(e,barter_button,refund_button,ps_phone,frequent_phone){
				uni.navigateTo({
					url:'../common/afterSale?goods_index='+e.order_goods_index+'&barter_button='+barter_button+'&refund_button='+refund_button+'&goods_count='+e.goods_count+'&goods_icon='+e.goods_icon+'&goods_name='+e.goods_name+'&goods_norms='+e.goods_norms+'&goods_cost='+e.goods_cost+'&ps_phone='+ps_phone +'&frequent_phone='+frequent_phone
				})
				event.stopImmediatePropagation();
			},
			//确认发货
			sendFh(){
				if(this.phone.length!=11){
					 uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
					return;
				}
				this.request({
					url:'ugo/api/app.php?c=order/order_sends',
					type:'POST',
					data:{
						order_index:this.order_indexs,
						phone:this.phone,
						name:this.name
					}
				}).then(res=>{
				    uni.showToast({
				    	title:res.data.msg,
						icon:'none'
				    });
					this.init();
					uni.setStorageSync('sendPhone',this.phone);
					uni.setStorageSync('sendName',this.name);
					this.phone = '';
					this.name = '';
					this.isSendFahuo = false;
				})
			},
			gbfh(){
				this.isSendFahuo = false;
			},
			// 复制
			fz(id){
				let self=this
				uni.setClipboardData({
					data:id, 
					success:function(data){
						uni.getClipboardData({
							success:function(data){
								self.holo.toast({
									icon:'none',
									title:'复制成功~'
								})
							},
							fail:function(err){},
							complete:function(res){} 
						})
					}, 
					fail:function(err){}, 
					complete:function(res){} 
				})
			},
			//取消订单
			cancleOrder(e){
				let self = this;
				uni.showModal({
				    content: '确定取消吗？',
				    success: function (res) {
				        if (res.confirm) {
							self.request({
								url: 'ugo/api/app.php?c=cancelOrder',
								data: {
									token: uni.getStorageSync('token'),
									order_index:e,
									app_type:'3',
								},
							}).then(res=>{
								if(res.data.success){
									uni.showToast({
										title:res.data.msg
									})
									uni.switchTab({
										url:'./order'
									})
								}else{
									uni.showToast({
										icon:'none',
										title:res.data.msg
									})
								} 
							},rej=>{
								console.log(rej);
							})
				        } else if (res.cancel) {
				        }
				    }
				})
			},
			//根据不同状态进行不同操作
			getStatus(e,orderInfo){
				let self = this;
				if(e==7){
					uni.showModal({
						title:'提示',
						content:'确定要通过该退款审核吗？',
						cancelText:'拒绝',
						confirmText:'退款',
						confirmColor:'#F7271C',
						success:function(res){
							if(res.confirm){
								self.refund_order('order/refund_order',orderInfo.order_id);
							}else if(res.cancel){
								self.refund_order('order/refuse_refund',orderInfo.order_id);
							}
						}
					})
				}else if(e==2){
					 this.order_indexs = orderInfo.order_index;
					 self.isSendFahuo = true;
				}
			},
			//审核售后
			refund_order(url,order_id){
				this.request({
					url:'ugo/api/app.php?c='+url,
					data:{
						order_id:order_id
					}
				}).then(res=>{
					this.init();
					uni.showToast({
						title:res.data.message,
						icon:'none'
					})
				})
			},
			onBridgeReady(order_total_price){
                        let self = this
                        WeixinJSBridge.invoke(
                      'getBrandWCPayRequest', {
                         "appId":self.payInfo.appId,     //公众号名称，由商户传入
                         "timeStamp":self.payInfo.timeStamp,         //时间戳，自1970年以来的秒数     
                         "nonceStr":self.payInfo.nonceStr, //随机串     
                         "package":self.payInfo.package,     
                         "signType":'MD5',         //微信签名方式：     
                         "paySign":self.payInfo.paySign //微信签名 
                      },
					function(res){
						if(res.err_msg == "get_brand_wcpay_request:ok" ){
							// 使用以上方式判断前端返回,微信团队郑重提示：
						//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
								self.request({
									url:'ugo/api/app.php?c=checkPayOrder',
										data:{
											order_index:self.orderInfo.order_index
										}
								}).then(res=>{
									if(res.data.success){
										uni.navigateTo({
											url:'/pages/common/successPay?order_total_price='+order_total_price
										})
									}
								})
                      }
                   }); 
                },
			// 查看物流
			gowuliu(order_index){
				uni.navigateTo({
					url:'./logistics?order_index='+order_index
				})
			},
		},
		onLoad(option) {
			this.order_index=option.index
			this.cdnUrl=this.$cdnUrl
			this.init() 
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
.head {
	width: 750rpx;
	height: 70rpx;
	background: #F6281B;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 70rpx;
	padding: 0 30rpx;
}
/* 地址 */
.site {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 40rpx 30rpx 20rpx;
	background-color: #FFFFFF
}
.site image {
	width: 100%;
	height: 100%;
}
.site .img {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.img image {
	width: 64rpx;
	height: 64rpx;
}
.site .img .center {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-left: 30rpx;
	/* width: 470rpx; */
}
.img .center .txt {
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}
.center .txt text {
	font-size: 24rpx;
	color: #999999;
	margin-left: 10rpx;
}
.img .center .dizhi {
	margin-top: 10rpx;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.site .right {
	width: 17rpx;
	height: 32rpx;
}
/* 送达时间 */
.time {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	border-top: 1rpx solid #F5F5F5;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	background-color: #FFFFFF
}
.time .txt2 {
	font-size: 26rpx;
	font-weight: 400;
	color: #F6281B;
}
.time .txt3 {
	font-size: 26rpx;
	font-weight: 400;
	color: #CCCCCC;
}
.time image {
	width: 17rpx;
	height: 32rpx;
	margin-left: 20rpx;
	vertical-align: middle;
}
/* 订单详情 */
.list {
	background-color: #FFFFFF;
	padding: 30rpx;
	box-sizing: border-box;
	background-color: #FFFFFF;
}
.list image {
	width: 100%;
	height: 100%;
}
.list .one {
	display: flex;
	justify-content: space-between;
	font-family: Source Han Sans CN;
	font-size: 30rpx;
}
.list .one .left {
	font-weight: 400;
	color: #333333;
	display: flex;
	align-items: center;
}
.list .one .img1 {
	width: 37rpx;
	height: 33rpx;
	margin-right: 10rpx;
}
.list .one .img2 {
	width: 13rpx;
	height: 26rpx;
	padding-top:4rpx;
	margin-left: 20rpx;
}
.list .two {
	display: flex;
	border-bottom: 1rpx solid #F5F5F5;
	padding: 30rpx 0;
	box-sizing: border-box;
}
.list .two .img {
	width: 160rpx;
	height: 160rpx;
	margin-right: 20rpx;
}
.list .two .details {
	flex: 1;
}
.two .details .title {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.two .details .bgc {
	height: 40rpx;
	background: #F5F5F5;
	border-radius: 4rpx;
	line-height: 40rpx;
	/* text-align: center; */
	overflow: hidden;
	padding: 0 15rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	margin: 20rpx 0;
}
.two .details .xia {
	display: flex;
	justify-content: space-between;
	font-family: Source Han Sans CN;
}
.details .xia .univalence {
	font-size: 30rpx;
	font-weight: 400;
	color: #FF3636;
}
.details .xia .btn2 {
	width: 140rpx;
	height: 48rpx;
	border: 1rpx solid #F6281B;
	border-radius: 24rpx;
	line-height: 48rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #F6281B;
}
.details .xia .num {
	font-size: 26rpx;
	font-weight: 300;
	color: #999999;
}
.list .remark {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	margin-top: 20rpx;
}
.list .remark .txt2 {
	margin-top: 20rpx;
	font-size: 26rpx;
	font-weight: 400;
}
/* 价格单元 */
.price {
	padding: 20rpx 30rpx 0;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	background-color: #FFFFFF;
}
.price .goodprice {
	display: flex;
	justify-content: space-between;
	padding-bottom: 20rpx;
}
.price .goodprice .one1 {
	color: #333333;
}
.price .goodprice .two1 {
	color: #FF3F3F;
}
/* 订单信息 */
.order {
	width: 100%;
	padding: 35rpx 30rpx;
	background-color: #FFFFFF;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #9A9A9A;
	box-sizing: border-box;
	margin-bottom: 150rpx;
	
}
.order1{
	width: 100%;
	padding: 35rpx 30rpx;
	background-color: #FFFFFF;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #9A9A9A;
	box-sizing: border-box;
	margin-bottom: 10rpx;
}
.order1 .txt{
	display: flex;
	align-items: center;
	font-size: 30rpx;
	font-weight: 500;
	color: #343434;
	padding-bottom: 30rpx;
}
.order1 .txt text{
	display: inline-block;
	width: 4rpx;
	height: 30rpx;
	background: #F6281B;
	margin-right: 10rpx;
	vertical-align: middle;
}
.order1 .serial{
	display: flex;
	justify-content: space-between;
	padding-bottom: 25rpx;
}
.order .txt{
	display: flex;
	align-items: center;
}
.order .txt text {
	display: inline-block;
	width: 4rpx;
	height: 30rpx;
	background: #F6281B;
	margin-right: 10rpx;
	vertical-align: middle;
}
.order .txt {
	font-size: 30rpx;
	font-weight: 500;
	color: #343434;
	padding-bottom: 30rpx;
}
.order .serial {
	display: flex;
	justify-content: space-between;
	padding-bottom: 25rpx;
}
.order .serial .copy {
	text-decoration: underline;
	color: #F6281B;
}
/* 按钮 */
.btn {
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	flex-direction: row-reverse;
	width: 749rpx;
	height: 90rpx;
	background: #FFFFFF;
	padding: 10rpx 30rpx;
	box-sizing: border-box;
}
.btn .btn1 {
	width: 180rpx;
	height: 70rpx;
	padding: 0 10rpx;
	background: #F6281B;
	border-radius: 35rpx;
	line-height: 70rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #FFFFFF;
	margin-left: 40rpx;
}
.btn .btn2 {
	width: 180rpx;
	height: 70rpx;
	padding: 0 10rpx;
	border: 1rpx solid #F6281B;
	border-radius: 35rpx;
	line-height: 70rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #F6281B;
}
.btn .btn3 {
    width: 135rpx;
	height: 48rpx;
	padding: 0 10rpx;
	border: 1rpx solid #CCCCCC;
	border-radius: 25rpx;
	line-height: 50rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #999999;
}
</style>
