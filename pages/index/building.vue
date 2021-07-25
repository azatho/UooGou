<template>
	<view >
		<view class="img-box">
			<image src="../../static/building.png" mode=""></image>
		</view>
		<view class="txt">
			正在建设中,敬请期待...
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:e.title
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.img-box{
	 width:683rpx;
	  height: 693rpx;
	  margin: 142rpx auto 0;
	 image {
	  width: 100%;
	  height: 100%;
	 }
	 
	
}
.txt{
	margin-top: 69rpx;
	font-size: 30rpx;
	text-align: center;
	color: #999999;
}
</style>
