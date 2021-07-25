<!-- 推广分享 -->
<template>
	<view style="height: 100%;">
		<view class="bgc1">
			<view class="bgc2">
				<view class="bgc3">
					<image :src="qrcode_all"></image>
					<view class="txt">扫一扫立即加入</view>
					<!-- <view class="btn" @click="goshear(img)">分享</view> -->
				</view>
			</view>
			<view class="bgc22">
				<view class="left">
					<view class="text1">分享</view>
					<view class="text2" v-if="qrcode_sum">{{qrcode_sum}}</view>
					<view class="text2" v-else>0</view>
					<view class="text1">位好友</view>
				</view>
				<view class="right" @click="look">
					查看全部>>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		jweixin
	} from '../../until/jweixin.js'
	export default{
		data(){
			return{
				// img:this.$baseUrl + '/ugo/api/app.php?c=personal/myQrcode&token='+uni.getStorageSync('token'),
				cdnUrl:'',
				baseUrl:'',
				openId:'',
				qrcode_all:'',
				qrcode_sum:''//推广的人数
			}
		},
		methods:{
			init() {
				if (uni.getStorageSync('token')) {
					let self = this
					self.request({
						url: 'ugo/api/app.php?c=personal/myQrcode',
						data: {
							token: uni.getStorageSync('token'),
						},
					}).then(res => {
						if (res.data.success) {
							// uni.setStorageSync('ewm',self.cdnUrl + res.data.data.qrcode_url1 + '?s=' + Math.floor(Math.random()*10));
							// self.qrcode_url = self.cdnUrl + res.data.data.qrcode_url1 + '?s=' + Math.floor(Math.random()*10);
							uni.setStorageSync('all',self.cdnUrl + res.data.data.qrcode_url);
							self.qrcode_all = self.cdnUrl + res.data.data.qrcode_url;
							self.qrcode_sum = res.data.data.num;
						}
					})
				}
			},
            share(){
            	let self = this
            	jweixin.ready(function() {
            		jweixin.onMenuShareAppMessage({
            			desc: "加入优购，一起简单购物",
            			title: "A+U购",
            			link: self.$baseUrl + "loveUgo/#/", // 分享链接
            			imgUrl: self.$cdnUrl +
            				"ugoadmin/images/20201212/2020121213342778929_1607751267.png",
            			success: function() {},
            			fail: function(res) {
            				alert(JSON.stringify(res));
            			},
            			cancel: function() {
            				// 用户取消分享后执行的回调函数
            				self.showShare = false;
            			},
            		});
            	})
            },
			look(){
				uni.navigateTo({
					url:'/pages/my/registershareList'
				}) 
			},
		},
		
		onShow() {
			this.cdnUrl=this.$cdnUrl
			this.baseUrl=this.$baseUrl
			this.openId = uni.getStorageSync('openId');
			this.share();
			this.init();
		},
		onLoad(){
		
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.bgc1 {
		width: 750rpx;
		height: 100%;
		background: url(../../static/regesterbgc.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 50rpx;
		box-sizing: border-box;
	}
	.bgc2 {
		width: 700rpx;
		height: 900rpx;
		background: url(../../static/regesterbgc1.png)center no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		padding: 40rpx 35rpx;
		box-sizing: border-box;
	}
	.bgc3{
		width: 615rpx;
		height: 350rpx;
		background: url(../../static/regesterbgc2.png)center no-repeat;
		background-size: cover;
		text-align: center;
	}
	.bgc3 image {
		width: 310rpx;
		height: 310rpx;
		margin: 385rpx 160rpx 10rpx;
	}
	.bgc3 .txt {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	.bgc3 .btn {
		width: 490rpx;
		height: 90rpx;
		background: #FF5F53;
		border-radius: 45rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 90rpx;
		text-align: center;
		margin-left: 70rpx;
		margin-top: 30rpx;
	}
	.bgc22 {
		width: 670rpx;
		height: 343rpx;
		background: url(../../static/regesterbgc3.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		top: 883rpx;
		left: 50%;
		margin-left: -335rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
	.bgc22 .left{
		margin-left: 40rpx;
		margin-top: 190rpx;
		font-size: 26rpx;
		color: #333333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: start;
		-webkit-justify-content: flex-start;
		justify-content: flex-start;
		-webkit-box-align: baseline;
		-webkit-align-items: baseline;
		align-items: baseline;
	}
	.bgc22 .left .text2{
		font-size: 50rpx;
		color: #F3281C;
		font-weight:bold ;
		margin: 0rpx 10rpx;
	}
	
	.bgc22 .right{
		margin-top: 200rpx;
		font-size: 26rpx;
		color: #333333;
		text-decoration: underline;
		padding: 30rpx 40rpx;
	}
	
</style>


