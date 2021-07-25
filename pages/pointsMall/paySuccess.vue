<!-- 转赠成功页面 -->
<template>
	<view>
		<view class="one">
			<image src="../../static/sure.png"></image>
			<view>转赠成功</view>
			<view class="font-30" style="color: #999999;margin-top: 35rpx;">转赠积分:  <span style="margin-left: 10rpx;color: #333333;">{{score}}</span></view>
		</view>
		<view class="check" @click="examine()">返回积分商城</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				score:'',
			}
		},
		methods: {
			// 转跳到门店页面
			examine(){
				uni.navigateBack({
					delta:2
				})
			},
		},
		onLoad(options){
			this.score=options.score
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
