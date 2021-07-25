<!-- 提现成功页面 -->
<template>
	<view>
		<view class="one">
			<image src="../../static/sure.png"></image>
			<view>提现成功{{money}}元</view>
		</view>
		<view class="check" @click="examine()">返回代理中心</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:'',
				cdnUrl:'',
			}
		},
		methods: {
			// 返回到代理中心页面
			examine(){
				uni.navigateBack({
					delta:4
				})
			},
		},
		onLoad(options){
			this.money=options.money
			this.cdnUrl=this.$cdnUrl
		}
	}
</script>

<style>
.one{
	text-align: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #343434;
	padding-top: 150rpx;
}
.one image {
	width: 146rpx;
	height: 185rpx;
	padding-bottom: 50rpx;
}
.check {
	width: 690rpx;
	height: 90rpx;
	background: #FC4950;
	border-radius: 45rpx;
	line-height: 90rpx;
	text-align: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	margin: 50rpx 30rpx;
}
</style>


