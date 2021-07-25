<!-- 资质信息 --商户入驻 -->
<template>
		<view>
			<view class="radio">
				<view class="area">法人姓名</view>
				<input type="text" placeholder="请输入法人真实姓名" :value="linkmans" />
			</view>
			<view class="radio">
				<view class="area">法人身份证号</view>
				<input type="text" placeholder="请输入法人身份证号" :value="identity" />
			</view>
			<view class="hang">
				<view class="phopphoto">
					<view>法人代表身份证人像面</view>
					<view class="txt">
						<view>1、人像面需清晰</view>
					</view>
				</view>
				<image src="../../static/appimg.png" @click="addImg5()" v-if="imgs5==''"></image>
				<image :src="cdnUrl+imgs5" @click="addImg5()" v-else></image>
			</view>
			<view class="hang">
				<view class="phopphoto">
					<view>法人代表身份证国徽面</view>
					<view class="txt">
						<view>1、国徽面需清晰拍出有效期等文字信息</view>
					</view>
				</view>
				<image src="../../static/appimg.png" @click="addImg3()" v-if="imgs3==''"></image>
				<image :src="cdnUrl+imgs3" @click="addImg3()" v-else></image>
			</view>
			<view class="time" style="margin-bottom: 20rpx;">
				<view class="left">
					<view class="permit">身份证有效期</view>
				</view>
				<view class="lang" @click="golang()">					
					<image src="../../static/noaffirm.png" v-if="checked==false"></image>
					<image src="../../static/choose.png" v-else></image>长期有效
				</view>
				<picker class="shot" mode="date" @change="bindDateChange1">{{date}}<image src="../../static/mores.png"></image></picker>	
			</view>
			<view class="hang">
				<view class="phopphoto">
					<view>营业执照照片</view>
					<view class="txt">
						<view>1、需文字清晰、边框完整、露出国徽</view>
						<view>2、拍复印件需加盖印章，可用有效特许证件代替</view>
					</view>
				</view>
				<image src="../../static/appimg.png" @click="addImg3()" v-if="imgs3==''"></image>
				<image :src="cdnUrl+imgs3" @click="addImg3()" v-else></image>
			</view>
			<view class="time" style="margin-bottom: 20rpx;">
				<view class="left">
					<view class="permit">营业执照有效期</view>
				</view>
				<view class="lang" @click="golangs()">					
					<image src="../../static/noaffirm.png" v-if="business==false"></image>
					<image src="../../static/choose.png" v-else></image>长期有效
				</view>
				<picker class="shot" mode="date" @change="bindDateChanges2">{{dates}}<image src="../../static/mores.png"></image></picker>	
			</view>
			<view class="addimg" style="margin-bottom: 100rpx;">
				<view class="text">其他相关许可证照片(最多5张）</view>
				<view class="text1" style="margin-bottom: 0;">1、需文字清晰、边框完整、露出国徽</view>
				<view class="text1" style="margin-top: 0;">2、拍复印件需加盖印章，可用有效特许证件代替</view>
				<view v-for="(item,i) in imgs" :key="i" style="display: inline-block;position: relative;">
					<image :src="cdnUrl+item" style="width: 120rpx;height: 120rpx;margin: 0 40rpx 20rpx 0;"></image>
					<image src="../../static/del.png" class="cha" @click="del(i)"></image>
				</view>
				<image src="../../static/appimg.png" @click="addImg"></image>
			</view>
			<view class="xieyi" style="display: flex; margin-left: 200rpx;">
				<view @click="goagree">
					<image src="../../static/xz.png" v-if="agree"></image>
					<image src="../../static/fk_icon.png" v-else></image>
					<text>我已阅读并同意</text>
				</view>
				<text style="color:#F6281B;" @click="getagreement">《开店规则必看》</text>
			</view>
			<view class="butt" @click="getbutt">提交审核</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				linkmans:'',
				identity:'',
				imgs5:'',//人面面
				imgs3:'',//国徽面
				imgs4:'',//营业执照
				imgs:[],//五张图片
				date:'请选择到期时间',
				checked:false,//身份证
				business:false,//营业照
				dates:'请选择到期时间',
				agree:false,
			}
		},
		methods: {
			// goname(){
			// 	this.linkmans=e
			// },
			// goidentity(){
			// 	this.identity=e
			// },
			addImg5(){
				let self = this,
				header = {};// 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
				uni.chooseImage({
				  count: 1,
				  success: function(res) {
					  uni.showLoading({
					  	title:'加载中'
					  })
					uni.uploadFile({
					  url: self.baseUrl+'ugo/api/mall.php?c=uploadCheckImage&token='+uni.getStorageSync('token'),//+url地址
					  filePath: res.tempFilePaths.join(','),//临时路径 tempFilePaths
					  name: 'file',
					  method:'POST',
					  success: function(res) {
					  	uni.hideLoading()
					  	let data = JSON.parse(res.data);
					  	if (data.success) {
					  		uni.showToast({
					  			title: '上传成功'
					  		});
					  		self.imgs5=data.data;
					  	} else {
					  		uni.showToast({
					  			icon: 'none',
					  			title: '上传失败，请重试~'
					  		});
					  	}
					  },fail:function(res){
					  	console.log(res)
					  }
					})
				  }
				})
			},
			addImg3(){
				let self = this,
				header = {};// 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
				uni.chooseImage({
				  count: 1,
				  success: function(res) {
					  uni.showLoading({
					  	title:'加载中'
					  })
					uni.uploadFile({
					  url: self.baseUrl+'ugo/api/mall.php?c=uploadCheckImage&token='+uni.getStorageSync('token'),//+url地址
					  filePath: res.tempFilePaths.join(','),//临时路径 tempFilePaths
					  name: 'file',
					  method:'POST',
					  success: function(res) {
					  	uni.hideLoading()
					  	let data = JSON.parse(res.data);
					  	if (data.success) {
					  		uni.showToast({
					  			title: '上传成功'
					  		});
					  		self.imgs3=data.data;
					  	} else {
					  		uni.showToast({
					  			icon: 'none',
					  			title: '上传失败，请重试~'
					  		});
					  	}
					  },fail:function(res){
					  	console.log(res)
					  }
					})
				  }
				})
			},
			addImg4(){
				let self = this,
				header = {};// 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
				uni.chooseImage({
				  count: 1,
				  success: function(res) {
					  uni.showLoading({
					  	title:'加载中'
					  })
					uni.uploadFile({
					  url: self.baseUrl+'ugo/api/mall.php?c=uploadCheckImage&token='+uni.getStorageSync('token'),//+url地址
					  filePath: res.tempFilePaths.join(','),//临时路径 tempFilePaths
					  name: 'file',
					  method:'POST',
					  success: function(res) {
					  	uni.hideLoading()
					  	let data = JSON.parse(res.data);
					  	if (data.success) {
					  		uni.showToast({
					  			title: '上传成功'
					  		});
					  		self.imgs4=data.data;
					  	} else {
					  		uni.showToast({
					  			icon: 'none',
					  			title: '上传失败，请重试~'
					  		});
					  	}
					  },fail:function(res){
					  	console.log(res)
					  }
					})
				  }
				})
			},
			addImg(){
				let self = this,
					header = {
						// 'Content-Type': 'multipart/form-data'
					};
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title:'加载中'
						})
						uni.uploadFile({
							url: self.$baseUrl + 'ugo/api/app.php?c=uploadOrderImage',
							filePath: res.tempFilePaths.join(','),
							name: 'file',
							formData: {
								token: uni.getStorageSync('token'),
								device: '0'
							},
							// header: header,
							success: function(res) {
								uni.hideLoading()
								let data = JSON.parse(res.data);
								if (data.success) {
									uni.showToast({
										title: '上传成功'
									});
									if(self.imgs.length<=4){
										self.imgs.push(data.data);
									}else{
										uni.showToast({
											icon: 'none',
											title: '最多上传5张图片'
										});
									}
								} else {
									uni.showToast({
										icon: 'none',
										title: '上传失败，请重试~'
									});
								}
							}
						});
					}
				});
			},
			// 删除图片
			del(e){
				for(var i =0; i <this.imgs.length;i++){
					if(i==e){
						this.imgs.splice(i,1)
					}
				}
			},
			// 长期有效显示状态
			golang(){
				if(this.checked==true){
					this.checked=false
				}else{
					this.checked=true
					this.date='请选择到期时间'
				}
			},
			// 其他时间下拉框
			bindDateChange1(e){
				this.checked=false
				this.date = e.target.value
			},
			bindDateChanges2(e){
				this.business=false
				this.dates = e.target.value
			},
			golangs(){
				if(this.business==true){
					this.business=false
				}else{
					this.business=true
					this.dates='请选择到期时间'
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
			// 转跳到协议页面
			getagreement(){
				uni.navigateTo({
					url:'./agreement'
				})
			},
			getbutt(){
				
			},
		},
		onLoad() {
			this.imgs=[]
			this.cdnUrl=this.$cdnUrl
			this.baseUrl=this.$baseUrl
		}
	}
</script>

<style>
page {
	background-color: #F5F5F5;
}
.bgc {
	background-color: #FFFFFF;
}
.radio {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	border-bottom: 1rpx solid #F5F5F5;
	padding: 30rpx;
	box-sizing: border-box;	
	background-color: #FFFFFF;
}
.radio input {
	width: 510rpx;
	height: 30rpx;
	line-height: 30rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	text-align: right;
}
.hang {
	font-size: 26rpx;
	font-family: HiraginoSansGB;
	font-weight: normal;
	color: #222222;
	box-sizing: border-box;
	border-top: 1rpx solid #F5F5F5;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
	background-color: #FFFFFF;
}
.hang .phopphoto {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.hang .phopphoto .txt1 {
	font-family: PingFang SC;
	font-weight: 400;
}
.hang .phopphoto .txt {
	font-size: 24rpx;
	color: #999999;
	padding-top: 20rpx;
}
.hang image {
	width: 130rpx;
	height: 130rpx;
}
.addimg{
	background-color: #FFFFFF;
	padding: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
}
.addimg image{
	width: 120rpx;
	height: 120rpx;
	margin-bottom: 20rpx;
}
.addimg	.cha{
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	top: -20rpx;
	right: 20rpx;
}
.addimg .text {
	font-size: 26rpx;
	color: #333333;
}
.addimg .text1 {
	font-size: 22rpx;
	color: #999999;
	margin: 30rpx 0;
}
.time {
	background-color: #FFFFFF;
	padding: 30rpx 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	font-size: 26rpx;
	display: flex;
	justify-content: space-between;
}
.time .lang image {
	width: 36rpx;
	height: 36rpx;
	vertical-align: middle;
	margin-right: 5rpx;
	padding-left: 40rpx;
}
.time .shot image {
	width: 26rpx;
	height: 26rpx;
	vertical-align: middle;
	margin-left: 15rpx;
}
.butt {
	width: 690rpx;
	height: 90rpx;
	background: #FD635E;
	border-radius: 45rpx;
	line-height: 90rpx;
	text-align: center;
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	margin: 30rpx;
}
.xieyi {
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #000000;
	text-align: center;
	margin-bottom: 20rpx;
	margin-top: 100rpx;
}
.xieyi image {
	width: 32rpx;
	height: 32rpx;
	vertical-align: middle;
	margin-right: 10rpx;
}
</style>
