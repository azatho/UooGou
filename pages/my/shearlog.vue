<!-- 分享注册页面 -->
<template>
	<view>
		<view class="shearbgc">
			<image class="bgc1" src="../../static/yq1.png"></image>
			<image class="bgc2" src="../../static/yq2.png"></image>
			<view class="kuang">
				<view class="one">
					<input type="number" placeholder="请输入手机号" :value="value1" @input="getPhone"/>
					<image src="../../static/phone1.png" class="img1"></image>
				</view>
				<view class="one">
					<input type="number" placeholder="请输入验证码" :value="value2" @input="getSum"/>
					<image src="../../static/yanzheng.png" class="img2"></image>
					<view class="txt" v-if="showtext==true" @click="yanzheng">获取验证码</view>
					<view class="txt" v-else>{{second}}s重新发送</view>
				</view>
				<view class="one">
					<input type="number" placeholder="请输入邀请人手机号" :value="value3" @input="getrePhone"/>
					<image src="../../static/mytime.png" class="img3"></image>
				</view>
				<view class="phone" v-if="referrer==true">
					<image :src="photo"></image>
					<text>{{name}}</text>
				</view>
				<view class="xieyi" @click="goagree">
					<image src="../../static/xz.png" v-if="agree"></image>
					<image src="../../static/fk_icon.png" v-else></image>
					<text>我已阅读并同意</text>
					<text style="color:#F6281B;">《注册协议》</text>
				</view>
				<view class="next" @click="present()">
					<image src="../../static/btn.png"></image>
					<view class="txt">注册</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				referrer:false,//推荐人信息是否显示
				agree:true,//是否选中已阅读
				value1:'',//手机号
				value2:'',//验证码
				value3:'',//邀请人手机号
				second:60,//倒计时秒数
				showtext:true,
				photo:'',
				name:'',
				cdnUrl:'',
			}
		},
		methods: {
			// 手机号
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

			},
			// 邀请人手机号
			getrePhone(e){
				let self=this
				if(this.getUrlCode('phone')){
					self.value3=this.getUrlCode('phone')
				}else{
					self.value3=e.detail.value
				}
				if(self.value3.length==11){
					if(/^1[0-9]{10}$/.test(self.value3)){
						self.request({
							url:'ugo/api/app.php?c=account/checkPhone',
							data:{
								phone:self.value3
							}
						}).then(res=>{
							if(res.data.success){
								if(res.data.cmd=='popup_to_login'){
									self.photo=res.data.data.photo
									if(self.photo.indexOf('https')){
										self.photo=self.cdnUrl+self.photo
										console.log(self.photo);
										console.log(111);
									}else{
										self.photo
										console.log(self.photo);
									}
									self.name=res.data.data.name
									self.referrer=true
								}else if(res.data.cmd=='register'){
									uni.showToast({
										icon:'none',
										title: res.data.msg
									});
								}else{
									uni.showToast({
										icon:'none',
										title: '未找到',
									});
								}
							}else{
								if(res.data.cmd='no_tuiguang'){//success==false
									self.photo=res.data.data.photo
									self.name=res.data.data.name
								}	
								uni.showToast({
									icon:'none',
									title: res.data.msg
								});
							}
						},rej=>{
							uni.showToast({
								icon:'none',
								title: res.data.msg
							});
						})
					}else{
							uni.showToast({
								icon:'none',
								title: '请输入正确的手机号',
								duration: 2000
							});
					}
				}	
			},
			// 是否同意
			goagree(){
				if(this.agree==true){
					this.agree=false
				}else {
					this.agree=true
				}
			},
			// 注册按钮
			present(){
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
				}else if(self.value3==''){
					self.holo.toast({
						icon:'none',
						title:'请输入邀请人手机号'
					})
				}else if(self.agree!=true){
					self.holo.toast({
						icon:'none',
						title:'请勾选同意'
					})			
				}else{
					self.request({
						url:'ugo/api/mall.php?c=account/bindPhone',
						data:{
							token:uni.getStorageSync('token'),
							phone:self.value1,
							phone_code:self.value2,
							referrer_phone:self.value3
						}
					}).then(res=>{
						if(res.data.success){
							self.holo.toast({
								title:res.data.msg
							})
							uni.switchTab({
								url:'./my'
							})
						}else{
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						uni.redirectTo({
							url: '../my/login'
						})
					})
				}	

			},
		},
		onLoad() {
			this.cdnUrl=this.$cdnUrl
		}
	}
</script>

<style>
.shearbgc {
	width: 100%;
	height: 1334rpx;
	background: url(../../static/shear.png)no-repeat;
	background-size: cover;
	position: relative;
}
.shearbgc .bgc1 {
	width: 558rpx;
	height: 183rpx;
	margin: 100rpx 100rpx 0;
}
.shearbgc .bgc2 {
	width: 540rpx;
	height: 68rpx;
	margin: 20rpx 100rpx 0;
}
.shearbgc .kuang {
	width: 689rpx;
	height: 720rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.15);
	border-radius: 15rpx;
	position: absolute;
	left: 30rpx;
	bottom: 70rpx;
}
.kuang .one {
	position: relative;
	margin: 50rpx 90rpx 0;
}
.kuang image{
	width: 100%;
	height: 100%;
	vertical-align: middle;
}
.kuang .one .img1 {
	width: 34rpx;
	height: 44rpx;
}
.kuang .one .img2 {
	width: 36rpx;
	height: 38rpx;
}
.kuang .one .img3 {
	width: 44rpx;
	height: 40rpx;
}
.kuang .one input {
	width: 500rpx;
	height: 90rpx;
	line-height: 90rpx;
	background: #FFFFFF;
	border: 1rpx solid #CCCCCC;
	border-radius: 45rpx;
	padding-left: 100rpx;
	box-sizing: border-box;
}
.kuang .one image {
	position: absolute;
	left: 30rpx;
	top: 24rpx;
}
.kuang .one .txt {
	position: absolute;
	right: 30rpx;
	top: 24rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FD635E;
}
.kuang .phone {
	margin-left: 100rpx;
	margin-top: 20rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #FD635E;
}
.kuang .phone image{
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	margin-right: 20rpx;
}
.xieyi {
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #000000;
	text-align: center;
	margin-bottom: 20rpx;
	margin-top: 30rpx;
}
.xieyi image {
	width: 32rpx;
	height: 32rpx;
	vertical-align: middle;
	margin-right: 10rpx;
}
.next {
	line-height: 90rpx;
	text-align: center;
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	position: relative;
}
.next .txt {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.next image {
	width: 500rpx;
	height: 90rpx;
}
</style>
