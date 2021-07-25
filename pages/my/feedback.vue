<!-- 意见反馈页面 --> 
<template>
	<!--pages/yjfk/index.wxml-->
	<view class="containe">
		<image class="background" src="../../static/feedbackBgc1.png" mode="aspectFill"></image>
		<view class="record" @click="goRecord">记录</view>
		<view class="bg_center">
			<image src="../../static/feedbackBgc.png" mode="aspectFill"></image>
			<view class="fk_center">
				<view class="fk_title">您反馈的是：</view>
				<view class="fk_list">
					<view v-for="(item, i) in fk" :key="i" @click="change_fk(i, item.name)">
						<image :src="i === suoyin ? item.icon2 : item.icon" style="width: 39rpx;height:39rpx;"></image>
						<text>{{ item.name }}</text>
					</view>
				</view>
				<!-- 反馈内容 -->
				<view class="contener">
					<view class="contener_title">意见反馈：</view>
					<view style="width:549rpx; height:163rpx;position: relative;margin-top: 10rpx;">
						<image src="../../static/region_bg.png" mode="aspectFill" class="region_bg"></image>
						<textarea
							@input="fk_content"
							placeholder="我们将不断的改进"
							name="textarea"
							maxlength="-1"
							style="width: 100%;height:100%;color: #969696;font-size:24rpx;font-family:PingFang SC;font-weight:400;padding: 10px;"
						/>
					</view>
				</view>
				<view class="weui-input">
					<text>邮箱(选填):</text>
					<input @input="email" placeholder="以便我们给您回复" />
				</view>
				<view class="weui-input">
					<text>其他(选填):</text>
					<input @input="qt" placeholder="如QQ或手机号" type="number" />
				</view>
				<view style="margin-top: 91rpx;">
					<button
						@click="submit"
						style="color: #000;background:#F6281B;width:271rpx;height:80rpx;border-radius:10rpx;font-size:30rpx;font-family:PingFang SC;font-weight:500; border-radius: 40px; color: #FFFFFF;">
						提交
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fk: [
				{ id: 0, icon: '../../static/fk_icon.png', icon2: '../../static/fk_icon2.png', name: '咨询' },
				{ id: 1, icon: '../../static/fk_icon.png', icon2: '../../static/fk_icon2.png', name: '建议' },
				{ id: 2, icon: '../../static/fk_icon.png', icon2: '../../static/fk_icon2.png', name: '其他' }
			],
			suoyin: 0,
			content: '',
			phone: '',
			device_type: '',
			type: '咨询',
			cdnUrl:'',
		};
	},
	methods: {
		ddd(){
			console.log(111);
		},
		change_fk(i, name) {
			console.log(name);
			(this.suoyin = i), (this.type = name);
		},
		fk_content(e) {
			console.log(1111);
			this.content = e.detail.value;
		},
		email(e) {
			this.device_type = e.detail.value;
		},
		qt(e) {
			this.phone = e.detail.value;
		},
		submit() {
			let that = this;
			if (!that.content) {
				uni.showToast({
					icon:'none',
				    title: '反馈内容不能为空',
				    duration: 2000
				});
			}else{
				that.request({
					url:'ugo/api/mall.php?c=feedback',
					data:{
						token:uni.getStorageSync('token'),
						feedback_type: that.type,
						feedback_content: that.content,
						feedback_contact: that.phone,
						feedback_email: that.device_type
					},
					}).then(res=>{
						if(res.data.success){
							uni.showToast({
								icon:'none',
							    title: res.data.msg,
							});
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 2000);
						} else {
							uni.showToast({
								icon:'none',
							    title: res.data.msg,
							    duration: 1000
							});
						}
					},rej=>{
						console.log(rej)
					})
				
			}
		},
		goRecord() {
			uni.navigateTo({
				url:'./feedbackList'
			})
		}
	},
	onShow() {
		this.cdnUrl=this.$cdnUrl
	}
};
</script>

<style lang="scss">
.container {
	width: 100%;
	height: 100%;
}
.background {
	width: 100%;
	height: 100%;
	position: fixed;
	background-size: 100% 100%;
	z-index: -10;
}
.record {
	width: 100rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: right;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	float: right;
	padding-right: 20rpx;
}
.bg_center {
	width: 703rpx;
	height: 1087rpx;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.bg_center > image {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background-size: 100% 100%;
}
.fk_center {
	width: 600rpx;
	height: 850rpx;
	/* border: 1px solid red; */
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.fk_title {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
}
.fk_list {
	display: flex;
	justify-content: space-around;
	margin-top: 20rpx;
}
.fk_list view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 110rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(51, 51, 51, 1);
}
.contener_title {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	margin-top: 20rpx;
}
.region_bg {
	width: 100%;
	height: 100%;
	background-size: 100% 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -2;
}
.weui-input {
	margin-top: 30rpx;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ccc;
	padding: 10rpx 0;
	font-size: 26rpx;
	input{
		font-size: 26rpx;
	}
}
.weui-input text {
	display: inline-block;
	min-width: 210rpx;
}
</style>
