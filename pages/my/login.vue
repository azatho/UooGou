<!-- 授权登录页面 -->
<template>
	<view>
		<view class="img">
			<image class='i-logo' :src="cdnUrl+'config/ugo/logo.png'"></image>
		</view>
		<view class="word word1">我的昵称</view>
		<view class="word word2">申请获取你的公开信息（昵称、头像等）</view>
		<button class="btn" v-if="show" style="margin-top:100rpx;"  @click="getWeChatCode">公众号授权</button>
		<button class="btn" v-else style="margin-top:100rpx;">公众号用户快捷登录</button>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				cdnUrl:'',
				show:true,
				referrer_openid:'',//推荐人手机号
				openid:'',//注册人openid
				regiester:"",//走登录还是注册
			}
		},
		methods: {
			   //登录
			 login(res){
				 this.holo.loading();
				 this.request({
				 	url: 'ugo/api/mall.php?c=registerForPhoneCode',
				 	data: {
				 		referrer_openid:uni.getStorageSync('referrer_openid'),
						openid:res.openid,
						access_token:res.access_token,
						regiester:'userinfo'
				 	}
				 }).then(res => {
				 	if (res.data.cmd === 'no_user') {  //判断用户是否注册过
				 		 window.location.href =this.$baseUrl +'loveUgo/#/pages/my/login'
				 	}else  {
						if (res.data.data.token){
							uni.setStorageSync('token',res.data.data.token)
							this.holo.hideLoding();
							//注册过直接登录,拿到用户信息
							uni.switchTab({
								url:'/pages/my/my'
							})
						}else{
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
					
				 	}
				 });
			 },
			// 公众号授权
			getWeChatCode(){
			   this.getCode('snsapi_userinfo');
			},
		},
		onLoad(e) {
			this.cdnUrl=this.$cdnUrl
			if (this.getUrlCode('code')) {
				this.request({
					url: 'ugo/api/mall.php?c=getOpenId',
					data: {
						code: this.getUrlCode('code')
					}
				}).then(res => {
					if(res.data.success){
						this.login(res.data.data)
					}else{
						this.holo.toast({
							title:res.data.msg
						})
					}
				});
			}
		}
	}
</script>

<style>
	.img {
		padding: 200rpx 0 100rpx;
		text-align: center;
	}

	image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 15rpx;
		box-shadow: 0px 0px 32px 0px rgba(166, 166, 166, 0.3);
	}

	.word {
		text-align: center;
	}

	.word1 {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 66rpx;
	}

	.word2 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 66rpx;
	}

	.btn {
		width: 690rpx !important;
		height: 90rpx;
		line-height: 90rpx;
		color: #fff;
		background: #008B4D;
		border-radius: 10rpx;
		padding: 0 !important;
		margin-top: 50rpx;
	}
	.bottoms{
		font-size: 26rpx;
		color: #cccccc;
		text-align: center;
		position: absolute;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.bottoms image {
		width: 38rpx;
		height: 38rpx;
		vertical-align: middle;
		margin-top: 20rpx;
	}	
</style>
