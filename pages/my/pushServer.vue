<!-- 消息推送页面 -->
<template>
	<view v-if="isShow">
		<view class="hang" @click="claim()">
			<view class="txt1">订货发货提醒</view>
			<view class="txt2">
				<image src="../../static/wxz.png" v-if="value==true"></image>
				<image src="../../static/yxz.png" v-else></image>
			</view>
		</view>
		<view class="hang" @click="courier()">
			<view class="txt1">订单配送提醒</view>
			<view class="txt2">
				<image src="../../static/wxz.png" v-if="value1==true"></image>
				<image src="../../static/yxz.png" v-else></image>
			</view>
		</view>
		<view class="hang" @click="refund()">
			<view class="txt1">退款驳回提醒</view>
			<view class="txt2">
				<image src="../../static/wxz.png" v-if="value2==true"></image>
				<image src="../../static/yxz.png" v-else></image>
			</view>
		</view>
	</view>
</template>

<script>
	// import common from '@/until/common.js';
	export default {
		data() {
			return {
				value:true,//订货
				value1:true,//点单
				value2:true,//退款
				isShow:false
			}
		},
		methods: {
			init(){
				let self=this
				self.request({
					url:'ugo/api/app.php?c=account/msgSwitchNow',
					data:{
						token:uni.getStorageSync('token'),
					},
				}).then(res=>{
					if(res.data.success){
						if(res.data.data.msg_1==1){
							self.value=true
						}else{
							self.value=false
						}
						if(res.data.data.msg_2==1){
							self.value1=true
						}else{
							self.value1=false
						}
						if(res.data.data.msg_3==1){
							self.value2=true
						}else{
							self.value2=false
						}
						self.isShow = true;
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 订货取货按钮
			claim(){
				let self=this
				self.value=!self.value
				let status=''
				if(self.value==true){
					status=1
				}else{
					status=2
				}
				self.request({
					url:'ugo/api/app.php?c=account/msgSwitch',
					data:{
						token:uni.getStorageSync('token'),
						type:1,
						status:status
					},
				}).then(res=>{
					if(res.data.success){
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
						// self.init()
					}else{
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 订单配送
			courier(){
				let self=this
				self.value1=!self.value1
				let status=''
				if(self.value1==true){
					status=1
				}else{
					status=2
				}
				self.request({
					url:'ugo/api/app.php?c=account/msgSwitch',
					data:{
						token:uni.getStorageSync('token'),
						type:2,
						status:status
					},
				}).then(res=>{
					if(res.data.success){
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
						// self.init()
					}else{
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 退款驳回提醒
			refund(){
				let self=this
				self.value2=!self.value2
				let status=''
				if(self.value2==true){
					status=1
				}else{
					status=2
				}
				self.request({
					url:'ugo/api/app.php?c=account/msgSwitch',
					data:{
						token:uni.getStorageSync('token'),
						type:3,
						status:status
					},
				}).then(res=>{
					if(res.data.success){
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
						// self.init()
					}else{
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
					}
				},rej=>{
					console.log(rej);
				})
			},
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style>
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
.hang .right .one {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}
.hang .right .two {
	width: 17rpx;
	height: 32rpx;
	margin-left: 20rpx;
}
</style>
