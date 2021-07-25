<!-- 领取成功页面 -->
<template>
	<view>
		<view class="one">
			<image src="../../../static/addSuccess457.png" style=""></image>
			<view>提现申请提交成功</view>
		</view>
		<view class="check" @click="examine()">返回</view>
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
			// 转跳到门店页面
			examine(){
				uni.navigateBack({
					delta:2
				})
			},
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
	background: #F5281C;
	border-radius: 45px;
	line-height: 90rpx;
	text-align: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	margin: 50rpx 30rpx;
}
</style>

