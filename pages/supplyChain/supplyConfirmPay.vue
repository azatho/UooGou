<template>
	<view>
		<view class="text1" >
			支付金额
		</view>
		<view style="margin-bottom: 50rpx;">
			<view class="text2" v-if="price">
				现金:&nbsp;&nbsp;￥{{$returnFloat(price)}}
			</view>
			<view class="text2" v-if="order_total_score!=0">
				积分:&nbsp;&nbsp;{{$returnFloat(order_total_score)}}
			</view>
		</view>

<!-- 		<view class="text4" v-if="order_send_score">
			提示：支付成功后将获得： {{$returnFloat(order_send_score)}}积分
		</view> -->
		<view class="line20"></view>
		<view class="scorePay-box" v-if="order_total_score!=0">
			<view class="left">
				<image src="../../static/golds.png" style="width: 44rpx;height: 44rpx;margin-right: 20rpx;" mode=""></image>
				<view class="text">
					<view class="">积分支付</view>
					<view class="">我的积分：{{$returnFloat(userinfo.score)}}</view>
				</view>
			</view>
			
			<view class="right">
				<image src="../../static/payChoice.png" mode="" style="width: 36rpx;height: 36rpx;"></image>
			</view>
		</view>
		<view class="line20" ></view>
		<view class="scorePay-box">
			<view class="left">
				<image src="../../static/wechatPayIcon.png" style="width: 44rpx;height: 44rpx;margin-right: 20rpx;" mode=""></image>
				<view class="text">
					微信支付
				</view>
			</view>
		
			<view class="right">
				<image src="../../static/payChoice.png" mode="" style="width: 36rpx;height: 36rpx;"></image>
			</view>
		</view>
		
		<view  class="confirmPay" @click="confirmPay">
			确认支付
		</view>
		
	</view>
</template>

<script>
	import {
		jweixin
	} from "../../until/jweixin.js";
	export default {
		data() {
			return {
				confirmObj:{},
				type:"",
				userinfo: {
					score:'0'
				}, //用于存放个人信息
				order_id:"",//订单号
				order_index:"",//订单ID
				price:"",//订单价钱
				order_total_score:'',//订单积分价钱
				order_send_score:"",//获取的积分
				payInfo:{},//提交订单返回的结果
				cart_index:'',//购物车提交订单时cart_index
				jumpType:"",
			}
		},
		methods: {
			// 调起支付接口
			carAdd(){
				let self=this
				self.request({
					url: 'ugo/api/app.php?c=rechargeOrderUgo',
					data: {
						order_index: self.order_index,
						order_money:self.price,
						order_score:self.order_total_score,
						type: '1',
					}
				}).then(res => {
					if (res.data.success) { 
						self.payInfo = res.data.data
						self.wxPay()
						// if (typeof WeixinJSBridge == "undefined") {
						// 	if (document.addEventListener) {
						// 		console.log(document.addEventListener)
						// 		document.addEventListener('WeixinJSBridgeReady', self.onBridgeReady, false);
						// 		console.log(document.addEventListener)
						// 	} else if (document.attachEvent) {
						// 		document.attachEvent('WeixinJSBridgeReady', self.onBridgeReady);
						// 		document.attachEvent('onWeixinJSBridgeReady', self.onBridgeReady);
						// 	}
						// } else {
						// 	self.onBridgeReady();
						// }
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			wxPay(){
				let self = this
				jweixin.ready(function() {
					jweixin.chooseWXPay({
				  timestamp: self.payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				  nonceStr: self.payInfo.nonceStr, // 支付签名随机串，不长于 32 位
				  package: self.payInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				  signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				  paySign: self.payInfo.paySign, // 支付签名
				  success: function (res) {
					  uni.navigateTo({
					  	url:"successPay?jumpType=car"+'&order_total_price='+self.price+'&order_total_score='+self.order_total_score
					  })
					  console.log(res)
				    // 支付成功后的回调函数
				  },
				  fail:function(res){
					  uni.showToast({
					  	title:'支付失败，请重新支付',
						icon:"none"
					  })
					  console.log(res)
				  }
				});
				});
				
			},
			prePage (){
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				// #ifdef H5
				return prePage;
				// #endif
				return prePage.$vm;
			},
			confirmPay(){
				let self = this
				if(self.userinfo.score<self.order_total_score){
					uni.showToast({
						title:'您的积分不足，无法购买',
						icon:'none'
					})
				}else{
					this.carAdd();
				}
			},
			getUserInfo(){
				let self=this
				self.request({
					url:'ugo/api/mall.php?c=getUserInfo',
					data:{
						token:uni.getStorageSync('token'),
					}
				}).then(res=>{
					if (res.data.success) {
						self.userinfo = res.data.data;
						uni.setStorageSync('rank',self.userinfo.rank)
					}else {
						// self.showlogin = false;
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
						
					}
				},rej=>{
					console.log(rej);
				})
			},
		},
		onBridgeReady(){
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
					let url=''
					if(self.jumpType=='group'){
						url='ugo/api/app.php?c=group/checkPayOrder'
					}else{
						url='ugo/api/app.php?c=order/checkPayOrder'
					}
					self.request({
						url:url,
						data:{
							order_index:self.order_index
						}
					}).then(res=>{
						if(res.data.success){
							if(self.jumpType=='group'){
								uni.navigateTo({
									url:'/pages/common/successPay?order_total_price='+self.price+'&jumpType='+self.jumpType+'&tuan_id='+self.tuan_id
								})  
							}else{
								uni.navigateTo({
									url:'/pages/common/successPay?order_total_price='+self.price+'&jumpType='+self.jumpType+'&order_total_score='+self.order_total_score
								})
							}
						}
					})
				}else{
					if(res.err_msg=='get_brand_wcpay_request:cancel'){
						uni.showToast({
							title:'您已取消支付',
							icon:'none'
						})
						if(self.jumpType=='group'){
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},500)
						}else{
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/order/order'
								})
							},500)
						}
						
					}else{
						self.holo.toast({
							title:'支付失败',
							icon:'none'
						})
						if(self.jumpType=='group'){
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/common/ptOrderList'
								})
							},500)
						}else{
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/order/order'
								})
							},500)
						}
					}
				}
			}); 
		},
		onShow() {
			this.getUserInfo();
		},
		onLoad(option) {
			this.cart_index=option.order_id
			this.order_index=option.order_index
			this.price=option.price
			this.order_total_score=option.order_total_score
			this.order_send_score=option.send_score
		}
	};
</script>

<style lang="scss" scoped>
	.text1{
		margin-top: 67rpx;
		margin-bottom: 30rpx;
		font-size: 30rpx;
		text-align: center;
	}
	.text2{
		font-size: 50rpx;
		font-weight: bold;
		color: #333333;
		//text-align: center;
		margin-left: 220rpx;		
	}
	.text4{
		width: 600rpx;
		height: 90rpx;
		background: #F5F5F5;
		border-radius: 4rpx;
		font-size: 26rpx;
		color: #666666;
		line-height: 90rpx;
		text-align: center;
		margin: 0 auto;
		margin-top: 39rpx;
		margin-bottom: 74rpx;
	}
	.confirmPay{
		position: fixed;
		bottom: 30rpx;
		left: 30rpx;
		width: 690rpx;
		height: 90rpx;
		background: #F6281B;
		border-radius: 45rpx;
		text-align: center;
		line-height: 90rpx;
		color: #FFFFFF;
		// margin: 0 auto;
		// position: absolute;
		// bottom: 40rpx;
		// left: 50%;
		// margin-left: -345rpx;
	}
	.line20{
		width: 750rpx;
		height: 20rpx;
		background: #F5F5F5;
	}
	.scorePay-box{
		height: 100rpx;
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		
		.left{
			margin-left: 30rpx;
			font-size: 13px;
			color: #333333;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: start;
			-webkit-justify-content: flex-start;
			justify-content: flex-start;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
		}
		
		.right{
			margin-right: 30rpx;
		}
		
	}
</style>
