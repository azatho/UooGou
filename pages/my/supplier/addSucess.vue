<template>
	<view>
		<view class="topTitle" style="font-size: 32rpx;font-weight: 700;">
				添加成功
				<view class="back" @click="goBack">
					<image src="../../../static/backarrow.png" mode=""></image> 
				</view>
		</view>
		<view class="line1">
			<image src="../../../static/addSuccess456.png" mode=""></image>
		</view>
		<view class="line2">
			{{type==1?'':'共享'}}商品添加成功
		</view>
		<view class="line3">
			请前往商品管理补充商品信息
		</view>
		<view class="line4" @click="toGoodsManage">
			前往商品管理
		</view>
		<view class="line5" @click="toadd">
			继续添加
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backNum:"-1",
				type:"",
			}
		},
		onLoad(options) {
			this.backNum=options.back
			this.type=options.type
		},
		methods: {
			// 返回中心页
			goBack(){
				uni.redirectTo({
					url:'progressEnter'
				})
			},
			toGoodsManage(){
				uni.navigateTo({
					url:'./goodsManage'
				})
			},
			toadd(){
				console.log(this.backNum);
				this.backNum=Number(this.backNum)
				if(this.backNum!='-1'){
					uni.navigateBack({
						delta:this.backNum
					})
					
				}else{
					uni.navigateTo({
						url:'./shareAdd'
					})
				}
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
