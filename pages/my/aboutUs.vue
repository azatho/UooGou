<!-- 关于我们页面 -->
<template>
	<view style="background-color: #fff;padding-top: 100rpx;">
		<view class="img">
		  <image :src="cdnUrl+company.platform_logo"></image>
		</view>
		<view style="padding: 0 30rpx;">
			<view class="content" v-if="company.company_name!=''">
			    <view class="">公司名字</view>
			    <view class="">{{company.company_name}}</view>
			</view>
			<view class="content" v-if="company.website!=''">
			    <view class="">官网</view>
			    <view class="">{{company.website}}</view>
			</view>
			<!-- <view class="content" v-if="company.service_mail!=''">
			    <view class="">联系邮箱</view>
			    <view class="">{{company.service_mail}}</view>
			</view> -->
			<view class="content" @click="bigimg()" v-if="company.qrcode_wechat!=''">
			    <view class="">微信公众号</view>
				<image src="../../static/erweima.png"></image>
			</view>
			<view class="content" v-if="company.service_phone!=''">
			    <view class="">联系方式</view>
			    <view class="">{{company.service_phone}}</view>
			</view>
			<view class="copyright" style="border-bottom: 1rpx solid #f5f5f5; padding: 20rpx 0;" v-if="company.company_address!=''">
			    <view class="">联系地址</view>
			    <view style="margin-top: 10rpx;">{{company.company_address}}</view>
			</view>
			
		</view>
		<view class="copyright" v-if="company.copyright!=''">
		    <view class="">版权信息</view>
		    <view style="margin-top: 10rpx;">{{company.copyright}}</view>
		</view>
		<!-- <view style="width:100%;height:20px;background:rgba(245,245,245,1);"></view>
		<view class="agreement" @click="goAgreement">
			查看APP相关协议<image src="../../static/back.png" mode=""></image>
		</view> -->
	</view>
</template>

<script>
	export default{
		data() {
			return{
				company:[],//所有数据存储
				logo:'',
				cdnUrl:'',
				qrcode_wechat:[],
			}
		},
		mounted(){
			
		},
		methods:{
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=account/appConfig',
				}).then(res=>{
					self.company = res.data
					self.qrcode_wechat.push(this.cdnUrl+res.data.qrcode_wechat)//二维码图片
				},rej=>{
					console.log(rej)
				})
				
			},
			// 点击放大图片
			bigimg(){
				uni.previewImage({
					current:0,
					urls:this.qrcode_wechat
				})
			},
			goAgreement(){
				uni.navigateTo({
					url:'./agreement'
				})
			}
		},
		onLoad() {
			this.cdnUrl=this.$cdnUrl
			this.init()
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.img{
		width:150rpx;
		height:150rpx;
		margin: auto;
		box-shadow:0px 0px 32rpx 0px rgba(166,166,166,0.3);
		border-radius:15rpx;
		margin-bottom: 100rpx;
		image{
			width:150rpx;
			height:150rpx;
		}
	}
	.content{
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		image{
			width: 44rpx;
			height: 44rpx;
		}
	}
	.copyright{
		padding: 20rpx 30rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.agreement{
		padding:30rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		image{
			width:17rpx;
			height:32rpx;
			float: right;
		}
	}
</style>

