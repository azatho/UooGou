<!-- 消息中心页面 -->
<template>
	<view>
		<view style="width: 100%; height: 100%; background-color: #F5F5F5;">
			<view class="hang" @click="xitong">
				<view class="left">
					<view class="img">
						<image src="../../static/xx1.png"></image>
						<view class="imgdw" v-if="xitongs.weidu>0">
							<image src="../../static/xx5.png"></image>
							<view class="txt5">{{xitongs.weidu}}</view>
						</view>
					</view>
					<view class="txt">
						<view>系统通知</view>
						<view class="txt1">{{xitongs.message_text?'':''}}</view>
					</view>
				</view>
				<view class="right" v-if="tixians.weidu>0">{{xitongs=={}?xitongs.message_time:''}}</view>
			</view>
<!-- 			<view class="hang" @click="kefu">
				<view class="left">
					<view class="img">
						<image src="../../static/xx2.png"></image>
						<view class="imgdw">
							<image src="../../static/xx5.png"></image>
							<view class="txt5">1</view>
						</view>
					</view>
					<view class="txt">
						<view>客服消息</view>
						<view class="txt1">您的私人定制酒已设计完成，请您确认一下...</view>
					</view>
				</view>
				<view class="right">2019/08/10</view>
			</view> -->
			<view class="hang" @click="dingdan">
				<view class="left">
					<view class="img">
						<image src="../../static/xx3.png"></image>
						<view class="imgdw" v-if="dingdans.weidu >0">
							<image src="../../static/xx5.png"></image>
							<view class="txt5" >{{dingdans.weidu}}</view>
						</view>
					</view>
					<view class="txt">
						<view>订单信息</view>
						<view class="txt1">{{dingdans.message_text}}</view>
					</view>
				</view>
				<view class="right" v-if="dingdans.weidu>0">{{dingdans.message_time}}</view>
			</view>
			<view class="hang" @click="tixian" v-if="apply_rank!=1">
				<view class="left">
					<view class="img">
						<image src="../../static/xx4.png"></image>
						<view class="imgdw" v-if="tixians.weidu>0">
							<image src="../../static/xx5.png" ></image>
							<view class="txt5">{{tixians.weidu}}</view>
						</view>
					</view>
					<view class="txt">
						<view>提现消息</view>
						<view class="txt1">{{tixians.message_text}}</view>
					</view>
				</view>
				<view class="right" v-if="tixians.weidu>0">{{tixians.message_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				apply_rank: '', //用户的状态
				page: 0,
				pageCount: 0,
				dingdans: {}, //订单
				tixians: {}, //提现
				xitongs: {}, //系统
			}
		},
		methods: {
			init() {
				if (uni.getStorageSync('token')) {
					let self = this;
					self.request({
						url: 'ugo/api/app.php?c=account/messageList',
						data: {
							token: uni.getStorageSync('token'),
							type: 'zhongxin',
						},
					}).then(res => {
						if (res.data.success) {
							self.xitongs = res.data.data.list.xitong //系统
							self.dingdans = res.data.data.list.dingdan //订单
							self.tixians = res.data.data.list.tixian //提现
							self.xitongs.message_time = self.holo.formatdate(self.xitongs.message_time * 1000)
							self.dingdans.message_time = self.holo.formatdate(self.dingdans.message_time * 1000)
							self.tixians.message_time = self.holo.formatdate(self.tixians.message_time * 1000)
						}
					}, rej => {
						console.log(rej);
					})
				}
			},
			// 转跳到系统通知页面
			xitong() {
				uni.navigateTo({
					url: './messages'
				})
			},
			// 转跳到订单消息页面
			dingdan() {
				uni.navigateTo({
					url: './massage'
				})
			},
			// 转跳到提现消息
			tixian() {
				uni.navigateTo({
					url: './messages1'
				})
			},
		},
		// 上拉加载(小程序自带函数)
		onReachBottom() {
			if (this.page < this.pageCount - 1) {
				this.page++
				this.init()
			}
		},
		onShow(){
			this.apply_rank = uni.getStorageSync('rank')
			this.init()
		},
		onLoad(options) {
			
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.hang {
		border-top: 1rpx solid #F5F5F5;
		background-color: #FFFFFF;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.hang image {
		width: 100%;
		height: 100%;
	}

	.hang .left {
		display: flex;
	}

	.hang .left .img {
		width: 64rpx;
		height: 64rpx;
		margin-right: 20rpx;
		position: relative;
	}

	.left .img .imgdw {
		position: absolute;
		right: -6rpx;
		top: -10rpx;
		width: 28rpx;
		height: 28rpx;
	}

	.img .imgdw image {
		width: 28rpx;
		height: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}

	.img .imgdw .txt5 {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 15rpx;
		font-family: PingFang SC;
		font-weight: bold;
		text-align: center;
		color: #F8F6F9;
	}

	.hang .left .txt {
		flex: 1;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.left .txt .txt1 {
		width: 461rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		margin-top: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.hang .right {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}
</style>
