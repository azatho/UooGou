<!-- 个人资料页面 -->
<template>
	<view>
		<view class="hang" @click="getImg()">
			<view class="txt">头像</view>
			<view class="right">
				<view class="one">
					<image :src="userinfo.photo" mode=""></image>
				</view>
				<view class="two"><image src="../../static/back.png"></image></view>
			</view>
		</view>
		<view class="hang" @click="getName(userinfo.name)">
			<view class="txt">昵称</view>
			<view class="right">
				{{userinfo.name}}
				<view class="two"><image src="../../static/back.png"></image></view>
			</view>
		</view>
		<view class="hang" @click="editSex()">
			<view class="txt">性别</view>
			<view class="right">
				{{userinfo.sex}}
				<view class="two"><image src="../../static/back.png"></image></view>
			</view>
		</view>
		<view class="hang"  v-if="userinfo.phone==''" @click="getphone()">
			<view class="txt">手机号</view>
			<view class="right">
				请绑定
				<view class="two"><image src="../../static/back.png"></image></view>
			</view>
		</view>
		<view class="hang"  v-else @click="chPhone(userinfo.phone)">
			<view class="txt">手机号</view>
			<view class="right">
				{{userinfo.phone}}
				<view class="two"><image src="../../static/back.png"></image></view>
			</view>
		</view>
		<view class="hang">
			<view class="txt">推荐人</view>
			<view class="right">
				{{userinfo.referrer_phone?userinfo.referrer_phone:'暂无'}}
			</view>
		</view>
		<view class="hang">
			<view class="txt">注册时间</view>
			<view class="right">
				{{userinfo.regtime}}
			</view>
		</view>
		<!-- <view class="hang">
			<view class="txt">绑定微信账号</view>
			<view class="right" style="color: #999999;">
				未绑定
				<view class="two"><image src="../../static/back.png"></image></view>
			</view>
		</view> -->
		<view class="hang" @click="gopush()">
			<view class="txt">消息推送设置</view>
			<view class="right">
				<view class="two"><image src="../../static/back.png"></image></view>
			</view>
		</view>
		<button class="butt" @click="quit()">退出登录</button>
		<view class="model" v-if="showModel" @click="cancel">
			<view class="model_con">
				<view class="sex" @click="getSex('男')">男</view>
				<view class="sex" @click="getSex('女')">女</view>
				<view class="line"></view>
				<view class="sex"@click="cancel()">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdnUrl:'',
				baseUrl:'',
				showModel:false,//性别弹窗
				userinfo:[],//存储userinfo所有数据
				user:[],//存储data中的数据
			}
		},
		methods: {
			init(){
				let self=this
				if(uni.getStorageSync('token')){
					self.request({
						url:'ugo/api/mall.php?c=get_user_info',
						data:{
							token:uni.getStorageSync('token')
						}
					}).then(res=>{
						if(res.data.success){
							self.userinfo=res.data.data.userinfo
							self.user=res.data
							self.userinfo.regtime=self.holo.formatTime(self.userinfo.regtime*1000)
							if(self.userinfo.photo.indexOf('https')){
								self.userinfo.photo=self.cdnUrl+self.userinfo.photo
							}else{
								self.userinfo.photo
							}
						}
					},rej=>{
						console.log(rej);
					})
				}
			},
			// 修改头像
			getImg() {
				let self = this,
					header = {
						// "Content-Type": "multipart/form-data"
					};
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.uploadFile({
							url: self.baseUrl + 'ugo/api/app.php?c=uploadHeadImage', //+url地址
							filePath: res.tempFilePaths.join(','),
							name: 'file',
							method:'GET',
							formData: {
								token: uni.getStorageSync('token'),
								device: ''
							},
							// header: header,
							success: function(res) {
								uni.showToast({
									title: '更换头像成功~'
								})
								self.init();
							},
						})
					}
				})
			},
			// 修改名字
			getName(name){
				uni.navigateTo({
					url:'./getName?name='+name
				})
			},
			// 绑定手机号
			getphone(){
				uni.navigateTo({
					url:'./boundPhoe'
				})
			},
			// 修改手机号
			chPhone(e){
				uni.navigateTo({
					url:'./amendPhone?phone='+e
				})
			},
			// 打开性别弹窗
			editSex(){
				this.showModel=true
			},
			// 上传性别
			getSex(e){
				let self=this
				self.request({
					url:'ugo/api/app.php?c=personal/setMyInfo',
					data:{
						token:uni.getStorageSync('token'),
						name:self.name,
						sex:e
					},
				}).then(res=>{
					if(res.data.success){
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
						self.init()
						self.showModel=false
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 弹窗取消按钮
			cancel(){
				this.showModel=false
			},
			// 消息推送
			gopush(){
				uni.navigateTo({
					url:"./pushServer"
				})
			},
			// 退出登录
			quit(){
				let self=this
				self.holo.showModal({
					title:'提示',
					content:'您确定退出登录吗？',
					success(res){
						if(res.confirm){
							self.request({
								url:'ugo/api/app.php?c=account/loginOut',
								data:{
									token:uni.getStorageSync('token'),
								},
							}).then(res=>{
								uni.clearStorageSync('token');
								if(res.data.success){
									self.holo.toast({
										title:'退出成功'
									});
									setTimeout(() => {
										window.location.href = window.location.origin + window.location.pathname
									}, 500)
								}
							})
						}
					}
				})
			},
		},
		onShow() {
			this.cdnUrl = this.$cdnUrl
			this.baseUrl = this.$baseUrl
			this.init()
		}
	}
</script>

<style>
	page{
		position: relative;
		/* padding-bottom: 100rpx; */
	}
.hang {
	border-top: 2rpx solid #F5F5F5;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	display: flex;
	justify-content: space-between;
	text-align: center;
	line-height: 50px;
	padding: 5rpx 30rpx;
	box-sizing: border-box;
}
.hang image {
	width: 100%;
	height: 100%;
	vertical-align: middle;
}
.hang .txt1 {
	color: #999999;
}
.hang .txt2 {
	width: 120rpx;
	height: 50rpx;
}
.hang .right {
	display: flex;
	justify-content: space-between;
}
.hang .right .one  image{
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}
.hang .right .two {
	width: 17rpx;
	height: 32rpx;
	margin-left: 20rpx;
}
.butt {
	width: 690rpx;
	height: 90rpx;
	background: #F6281B;
	border-radius: 45rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 90rpx;
	text-align: center;
	position: fixed;
	bottom: 30rpx;
	left: 30rpx;
}
.model {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, .5);
	z-index: 1;
}
.model .model_con {
	width: 690rpx;
	position: absolute;
	bottom: 30rpx;
	left: 50%;
	transform: translate(-50%);
	background-color: #F5F5F5;
	border-radius: 20rpx;
}
.model .model_con .sex {
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	font-size: 26rpx;
	color: #333333;
}
.model .model_con .line {
	width: 100%;
	height: 10rpx;
	background-color: #eee;
}
</style>
