<!-- 提现账户页面 -->
<template>
	<view>
		<view class="txt">请选择提现账户</view>
	<!-- 	<view class="car" @click="playcar(1)">
			<view class="img1">
				<image src="../../static/yhcar.png"></image>
				<text>银行卡</text>
			</view>
			<view class="img2">
				<image src="../../static/fk_icon.png" v-if="current==1"></image>
				<image src="../../static/xz.png" v-else></image>
			</view>
		</view> -->
		<view class="car">   <!--@click="playcar(2)"--> 
			<view class="img1">
				<image src="../../static/payment.png"></image>
				<text>微信零钱</text>
			</view>
			<view class="img2">
				<!-- <image src="../../static/fixation.png"></image> -->
				<image src="../../static/fk_icon.png" v-if="current==1"></image>
				<image src="../../static/xz.png" v-else></image>
			</view>
		</view>
		<view class="btn" @click="gocard()">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:2, //支付方式
				showClick:false,
				cash:'',
			}
		},
		methods: {
			// 提现方式
			playcar(e){
				if(e==1){
					if(!this.showClick){
						this.current=2
					}
				}else{
					this.current=1
				}
			},
			// 下一步
			gocard(){
				if(this.current=2){
					uni.navigateTo({
						url:'./addproduct/withdrawal?mycash='+this.cash+'&extract_type=0'
						// url:'./withdrawal?cash='+this.cash
					})
				}else{
					uni.navigateTo({
						url:'./addproduct/withdrawal?mycash='+this.cash+'&extract_type=0'
						// url:'./withdrawal?cash='+this.cash
					})
				}
			},
		},
		onLoad(options) {
			this.cash=this.options.cash
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
.txt{
	width: 748rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	padding: 30rpx;
}
.car {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	padding: 30rpx;
	background-color: #FFFFFF;
	margin-bottom: 20rpx;
}
.car image {
	width: 100%;
	height: 100%;
	vertical-align: middle;
}
.car .img1 image {
	width: 44rpx;
	height: 44rpx;
	margin-right: 20rpx;
}
.car .img2 {
	width: 36rpx;
	height: 36rpx;
}
.btn {
	width: 690rpx;
	height: 90rpx;
	background: #FC4950;
	border-radius: 45rpx;
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #F5F5F5;
	line-height: 90rpx;
	text-align: center;
	margin: 400rpx auto;
	
}
</style>
