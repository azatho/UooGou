<!-- 绑定手机号 -->
<template>
	<view>
		<!-- <view style="margin-top: 100rpx;"></view> -->
		<view class="hang">
			<view>
				<image src="../../static/pop.png"></image>
				<input type="number" placeholder="请输入手机号码" :value="value1" @input="getPhone"/>
			</view>
		</view>
		<view class="hang">
			<view>
				<image src="../../static/yanzheng1.png"></image>
				<input type="number" placeholder="请输入验证码" :value="value2" @input='getSum' /> 
				<view class="yanzheng" @click="yanzheng()" v-if="showtext==true">获取验证码</view>
				<view class="yanzheng" v-else>{{second}}s重新发送</view>
			</view>
		</view>
		<button class="btn" @click="getbound()">绑定</button>
		<!-- <view class="tac">
			<image src="../../static/logo1.png"></image>
			<view class="txt">©2020 某某某有限公司.AII rights reserved.</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1:'',
				value2:'',
				value3:'',//推荐人手机号===>用不到
				img:'',//图片验证码
				second:60,//倒计时秒数
				showtext:true,
			}
		},
		methods: {
			// 绑定手机号
			getPhone(e){
				this.value1=e.detail.value
			},
			// 验证码
			getSum(e){
				this.value2=e.detail.value
			},
			// 倒计时
			getcode(){
				this.showtext=false
				 var interval=setInterval(()=>{
					let times = --this.second
					this.second = times<10?'0'+times:times //小于10秒补0
				 },1000)
				setTimeout(()=>{
					clearInterval(interval)
					this.second=60
					this.showtext=true
				},60000)
			},
			// 获取验证码
			yanzheng(){
				let self=this
				if(uni.getStorageSync('token')){
					if(self.value1==''){
						self.holo.toast({
							icon:'none',
							title:'请输入手机号'
						})
					}else{
						self.request({
							url:'ugo/api/mall.php?c=applyPhoneCode',
							data:{
								phone:self.value1,
								verify_type:1,
								image_code:self.img
							}
						}).then(res=>{
							if(res.data.success){
								self.holo.toast({
									icon:'none',
									title:res.data.msg
								})
								self.getcode()//倒计时
							}else{
								self.holo.toast({
									icon:'none',
									title:res.data.msg
								})
							}
						},rej=>{
							console.log(rej);
						})
					}
				}
			},
			// 绑定
			getbound(){
				let self=this
				if(self.value1==''){
					self.holo.toast({
						icon:'none',
						title:'请输入手机号'
					})
				}else if(self.value2==''){
					self.holo.toast({
						icon:'none',
						title:'请输入验证码'
					})
				}else{
					self.request({
						url:'ugo/api/mall.php?c=account/bindPhone',
						data:{
							token:uni.getStorageSync('token'),
							phone:self.value1,
							phone_code:self.value2
						}
					}).then(res=>{
						if(res.data.success){
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1,
								})
							},200)
						}else{
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						console.log(rej);
					})
				}	
			},
			onShow() {
				this.cdnUrl = this.$cdnUrl
				this.baseUrl = this.$baseUrl
			}
		}
	}
</script>

<style>
	page{
		position: relative;
		height: 100%;
		width: 100%;
	}
.hang {
	padding: 0 50rpx;
	box-sizing: border-box;
}
.hang view {
	position: relative;
}
.hang image{
	width: 32rpx;
	height: 41rpx;
	position: absolute;
	left: 0;
	top: 45rpx;
}
.hang input {
	padding-top: 45rpx;
	padding-bottom: 45rpx;
	/* width: 650px; */
	height: 130rpx;
	border-bottom: 1rpx solid #F5F5F5;
	padding-left: 75rpx;
	box-sizing: border-box;
}
.hang .yanzheng {
	position: absolute;
	right: 0;
	top: 45rpx;
	width: 150rpx;
	height: 50rpx;
	font-size: 18rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	background-color: #F5F5F5;
	border-radius: 45px;
	text-align: center;
	line-height: 50rpx;
}
.btn {
	width: 690rpx;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	background: #FD484F;
	border-radius: 45rpx;
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	margin-top: 200rpx;
}
.tac {
	position: absolute;
	bottom: 30rpx;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	font-size: 18rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #999999;
}
.tac image {
	width: 80rpx;
	height: 80rpx;
}
</style>
