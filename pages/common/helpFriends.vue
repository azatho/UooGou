<template>
	<view class="">
		<!-- 拼团人未满 -->
		<view class="" v-if="orderInter.res_join_count>0">
			<view class="goods_con" @click="joinDetail(orderInter.master_id)">
				<view class="img">
					<image :src="cdnUrl + orderInter.goods_icon" mode=""></image>
				</view>
				<view class="right">
					<view class="right_msg">{{ orderInter.goods_name }}</view>
					<view class="norms">{{ orderInter.sku_name }}</view>
					<view class="num">
						<view class="">
							<text class="text1">￥</text>
							<text class="text2">{{ orderInter.goods_price / 100 || 0 }}</text>
						</view>
					</view>
					<view class="count">
						<text class="text4">×</text>
						{{ orderInter.goods_num }}
					</view>
				</view>
			</view>
			<view class="commonBgc"></view>
			<view class="join_con">
				<view class="number">仅剩{{ orderInter.res_join_count }}个名额，{{orderInter.remain_time }}</view>
				<view class="photo">
					<view class="imgs">
						<view style="display: flex;" class="imgs">
							<image :src="cdnUrl + orderInter.headImage[0]" mode=""></image>
						</view>
						<view class="tip" style="flex: 1;">拼主</view>
					</view>
					<view class="dian">
						<image src="../../static/dian.png" mode=""></image>
					</view>
					<view class="imgs">
						<image src="../../static/question.png" mode=""></image>
					</view>
				</view>
				<view class="join_btn" @click="join">参与拼团</view>
				<view class="rule">
					拼团规则：
					<text>好友拼单，人满发货，超时未拼单成功退款</text>
				</view>
			</view>
		</view>
		<!-- 拼团成功 -->
		<view class="" v-else>
			<view class="join_con1">
				<view class="number">
					拼团成功
				</view>
				<view class="photo">
					<view class="imgs">
						<image :src="cdnUrl+orderInter.headImage[0]" mode=""></image>
						<view class="tip">
							拼主
						</view>
					</view>
					<view class="dian">
						<image src="../../static/dian.png" mode="" v-if="total_count>2"></image>
					</view>
					<view class="imgs">
						<image :src="cdnUrl+orderInter.headImage[total_count-1]" mode=""></image>
					</view>
				</view>
				<view class="btns">
					<view class="home" @click="goHome">
						回到首页
					</view>
					<view class="order" @click="goList">
						查看订单
					</view>
				</view>
			</view>
		</view>
		
		<view class="commonBgc" v-if="list.length != 0"></view>
		<view class="recommend" v-if="list.length != 0">
			<view class="recommend_tit">
				<view class="line"></view>
				<view class="title">为你推荐</view>
				<view class="line"></view>
			</view>
			<view class="goods">
				<view class="goods_con1" v-for="item in list" :key="item.goods_index" @click="gotime(item.id)">
					<image :src="cdnUrl + item.goods_icon" mode=""></image>
					<view class="name">
						<text class="pt">拼团</text>
						{{ item.group_goods_name || '暂无' }}
					</view>
					<view class="price">
						<view class="">￥{{ item.group_price / 100 || 0 }}</view>
						<view class="goPt" @click="gotime(item.id)">去拼团</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		jweixin
	} from '../../until/jweixin.js'
	export default {
		data() {
			return {
				cdnUrl: '',
				page: 1,
				lng: '',
				lat: '',
				orderInter: {},
				list: [],
				tuan_id: '',
				remain_time: '',
				total_count:'0'
			};
		},
		methods: {
			init() {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=groupShare',
					data: {
						tuan_id: self.tuan_id
					}
				}).then(
					res => {
						if (res.data.success) {
						 	self.orderInter = res.data.data;
							self.total_count=self.orderInter.group_user_count
							if(self.orderInter.res_join_count>0){
								var residue = res.data.data.remain_time;
								self.orderInter.remain_time = self.holo.countdown(residue) + '后结束'; //倒计时时间
								if (residue>= 0) {
									var timer = setInterval(() => {
										 --residue
										if (residue <= 0) {
											clearInterval(timer);
											self.orderInter.remain_time = '已结束'; //倒计时时间
											return;
										}
										self.orderInter.remain_time = self.holo.countdown(residue) + '后结束'; //倒计时时间
									}, 1000);
								} else {
									self.orderInter.remain_time = '已结束'; //倒计时时间
								}
							}
						}
						this.share()
					},
					rej => {
						console.log(rej);
					}
				);
			},
			init1() {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=group/appGroupList',
					data: {
						page: self.page,
						user_lng: uni.getStorageSync('lng'),
						user_lat: uni.getStorageSync('lat')
					}
				}).then(res => {
					if (res.data.success) {
						self.list = res.data.data.groupList;
					}
				});
			},
			joinDetail(tuan_id) {
				uni.navigateTo({
					url: '../group/goodsDetail?id=' + tuan_id
				});
			},
			join() {
				let self = this;
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/common/confirmOrder?goods_index=' + self.orderInter.master_id + '&sku_index=' + self.orderInter.goods_sku_index +
							'&goods_count=' + self.orderInter.goods_num + '&type=' + 'group' + '&tuan_id=' + self.tuan_id
					})
				} else {
					uni.showModal({
						content: '未登录，请先登录',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								});
							}
						}
					});
				}
			},
			goList(){
				uni.navigateTo({
					url:'/pages/common/ptOrderList'
				})
			},
			goHome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			// 去拼团按钮
			gotime(e) {
				uni.navigateTo({
					url: '../group/goodsDetail?id=' + e
				});
			},
			// 分享
			share(){
				let self = this
				jweixin.ready(function() {
					jweixin.onMenuShareAppMessage({
						title: '一起来拼团',
						desc: self.orderInter.goods_name,
						link: self.$baseUrl+'loveUgo/#/pages/common/helpFriends?tuan_id='+self.tuan_id, // 分享链接
						imgUrl:self.$cdnUrl+self.orderInter.goods_icon,
						success: function () { 
							self.showShar=false;
						},
						fail: function (res) {
							alert(JSON.stringify(res));
						},
						cancel: function () { 
						    // 用户取消分享后执行的回调函数
						}
					})
				})
			},
		},
		onLoad(option) {
			this.tuan_id = option.tuan_id;
			this.cdnUrl = this.$cdnUrl;
			this.init();
			this.init1();
		}
	};
</script>

<style lang="scss">
	.goods_con {
		margin-top: 30rpx;
		padding: 20rpx 30rpx;
		display: flex;
		border-top: 1rpx solid #f5f5f5;

		.img {
			margin-right: 20rpx;

			image {
				width: 160rpx;
				height: 160rpx;
			}
		}

		.right {
			flex: 1;
			position: relative;

			.right_msg {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				line-height: 40rpx;
			}

			.norms {
				display: inline-block;
				padding: 10rpx;
				background: rgba(245, 245, 245, 1);
				border-radius: 4rpx;
				color: rgba(153, 153, 153, 1);
				font-size: 24rpx;
			}

			.num {
				margin-top: 20rpx;
				font-family: PingFang SC;
				color: rgba(153, 153, 153, 1);
				display: flex;
				justify-content: space-between;

				.text1 {
					font-size: 22rpx;
					color: rgba(255, 54, 54, 1);
				}

				.text2 {
					font-size: 30rpx;
					color: rgba(255, 54, 54, 1);
				}
			}

			.count {
				font-size: 30rpx;
				color: #999;
				position: absolute;
				top: 50%;
				right: 30rpx;
				transform: translateY(-50%);

				.text4 {
					font: 22rpx;
				}
			}
		}
	}

	.join_con {
		padding: 30rpx 0;

		.number {
			font-size: 30rpx;
			text-align: center;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}

		.photo {
			display: flex;
			height: 120rpx;
			line-height: 120rpx;
			justify-content: center;
			margin: 60rpx 0;
			.imgs {
				border-radius: 50%;
				position: relative;
				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
				.tip {
					position: absolute;
					top: 10rpx;
					left: -20rpx;
					width: 72rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					background: #fc4950;
					border-radius: 15rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ffffff;
				}
			}

			.dian {
				width: 32rpx;
				height: 6rpx;
				margin: 0 40rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.join_btn {
			margin: 20rpx auto 0;
			width: 500rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #fc4950;
			border-radius: 45rpx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;
		}

		.rule {
			font-size: 26rpx;
			text-align: center;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 50rpx;

			text {
				color: #999;
			}
		}
	}
.join_con1{
		padding: 30rpx 0;
		.number{
			font-size: 30rpx;
			text-align: center;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FC4950;
		}
		.photo{
			display: flex;
			height: 120rpx;
			line-height: 120rpx;
			justify-content: center;
			margin: 60rpx 0;
			.imgs{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				position: relative;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				.tip{
					position: absolute;
					top: 10rpx;
					left: -20rpx;
					width: 72rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					background: #FC4950;
					border-radius: 15rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			.dian{
				width: 32rpx;
				height: 6rpx;
				margin: 0 40rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.btns{
			width: 100%;
			display: flex;
			justify-content: center;
			view{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				width: 250rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				border-radius: 45rpx;
			}
			.home{
				background: #FC4950;
				color: #FFFFFF;
			}
			.order{
				color: #FC4950;
				background: #FFFFFF;
				border: 1px solid #FC4950;
				margin-left: 60rpx;
			}
		}
	}
	.recommend {
		.recommend_tit {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx 0 30rpx;

			.line {
				width: 100rpx;
				height: 1rpx;
				background: rgba(153, 153, 153, 1);
			}

			.title {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin: 0 20rpx;
			}
		}

		.goods {
			padding: 20rpx 29rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.goods_con1 {
				width: 330rpx;
				height: 500rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				overflow: hidden;

				image {
					width: 330rpx;
					height: 330rpx;
					border-radius: 10rpx;
					border: 2rpx solid #f5f5f5;
				}

				.name {
					width: 310rpx;
					margin: 10rpx 0 10rpx 10rpx;
					height: 70rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;

					.pt {
						display: inline-block;
						width: 60rpx;
						height: 30rpx;
						line-height: 30rpx;
						text-align: center;
						background: linear-gradient(30deg, #fd4950, #ff6f60);
						border-radius: 4rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #ffffff;
						margin-right: 10rpx;
					}
				}

				.price {
					height: 80rpx;
					line-height: 80rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 63, 63, 1);
					margin-left: 16rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.goPt {
						width: 100rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: #fc4950;
						border-radius: 20rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #ffffff;
					}
				}
			}
		}
	}
</style>
