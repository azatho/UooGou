<template>
	<view>
		<view class="line1">
			<image src="../../../static/addSuccess456.png" mode=""></image>
		</view>
		<view class="line2">
			商品添加成功
		</view>
		<view class="line3">
			请前往商品管理手动上架
		</view>
		<view class="line4" @click="toGoodsManage">
			前往商品管理
		</view>
		<view class="line5" @click="toadd">
			返回商家中心
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backNum:"-1"
			}
		},
		onLoad(options) {
			this.backNum=options.back
		},
		methods: {
			toGoodsManage(){
				uni.navigateTo({
					url:'./progressEnter?popupShow=1'
				})
			},
			toadd(){
				uni.navigateTo({
					url:'./progressEnter'
				})
			}
			
		}
	}
</script>

<style lang="scss">
		.line1{
			width: 146rpx;
			height: 185rpx;
			margin-top: 150rpx;
			image{
				width: 146rpx;
				height: 185rpx;
			}
			margin: 150rpx auto 0;
		}
		.line2{
			margin-top: 52rpx;
			text-align: center;
			font-weight: bolder;
		}
		.line3{
			margin-top: 13rpx;
			text-align: center;
			color: #999999;
		}
		.line4{
			text-align: center;
			width: 690rpx;
			height: 90rpx;
			background: #FFFFFF;
			border: 1rpx solid #FF862B;
			border-radius: 45rpx;
			line-height: 90rpx;
			color: #FF862B;
			margin-left: 30rpx;
			margin-top: 56rpx;
		}
		.line5{
			text-align: center;
			width: 690rpx;
			height: 90rpx;
			background: #FF862B;
			border-radius: 45rpx;
			line-height: 90rpx;
			color: #FFFFFF;
			margin-left: 30rpx;
			margin-top: 30rpx;
		}
</style>
