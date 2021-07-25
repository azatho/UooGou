<template>
	<view id="lookBalance">
		<view class="lookTop">
			<view class="lookTopTime">
				<!-- <image src="../../../static/myCenter/lookB.png" mode=""></image> -->
				<view class="lookitem">
					<view class="lookitemBalance">
						<text>
							账户余额：
						</text>
					</view>
					<view class="lookitemMonery">
						<text>{{$returnFloat(balance)}}</text>
						<text class="deposit" @click="gopage">提现</text>
					</view>
					<view class="depositLog">
						<text>累计提现（元）：{{$returnFloat(cumulative)}}</text>
						<text>提现中（元）：{{$returnFloat(in_cash)}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="lookBottom">
			<text class="bottom"> 余额记录</text>
			<view class="lookBottomTitle">
				<u-tabs :list="list" :is-scroll="false" active-color="#FF862B" :current="current" @change="change">
				</u-tabs>
			</view>
			<!-- v-for=" (item) in  arrisShow" -->
			<view class="item" v-if="arrisShow.length">
				<view class="itemList" v-for="item in  arrisShow" :key="item">
					<view class="itemTitle">
						<text class="moneryTitle">{{item.type_name}}</text>
						<text class="monery">{{$returnFloat1(item.type_amount)}}</text>
					</view>
					<view class="itemTime">
						<text>{{ $time(item.time,2) }}</text>
						<text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==1">提现中</text>
						<text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==2">提现成功</text>
						<text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==3">已驳回</text>
					</view>
				</view>
			</view>
			<view class="item" v-else style="text-align: center;margin-top: 111rpx;">
				<!-- <img src="../../../static/myCenter/datanull.png" alt="" style="width: 344rpx;height: 300rpx;"> -->
				<!-- <img :src="$imgUrl('CxtxUni/static/myCenter/datanull.png')" alt="" style="width: 344rpx;height: 300rpx;"> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				page: 1,
				list: [{
					name: "待结算"
				}, {
					name: "收入"
				}, {
					name: "支出"
				}],
				balance: 0.00,
				in_cash: 0.00,
				cumulative: 0.00,
				arrDjiesuan: [],
				arrShouru: [],
				arrZhichu: [],
				arrisShow: []
			}
		},
		computed: {

		},
		onShow() {
			this.getData({
				type: this.current + 1,
				page: this.page
			})

			this.balance_info()
		},
		async onReachBottom() {
			this.page = this.page + 1
			let data = {
				type: this.current + 1,
				page: this.page
			}
			console.log(data)
			let result = await myCashApi.user_cash_change(data)
			result = result.result.list
			if (data.type == 1) {
				this.arrDjiesuan.push(...result)
				this.arrisShow = this.arrDjiesuan
			}
			if (data.type == 2) {
				this.arrShouru.push(...result)
				this.arrisShow = this.arrShouru
			}
			if (data.type == 3) {
				this.arrZhichu.push(...result)
				this.arrisShow = this.arrZhichu
			}
		},
		methods: {
			returnType(e) {
				if (e == 1) {
					return ""
				}
				if (e == 1) {
					return ""
				}
				if (e == 1) {
					return ""
				}
				if (e == 1) {
					return ""
				}
			},
			gopage() {
				uni.navigateTo({
					url: './cash'
				})
			},
			change(index) {
				this.current = index;
				this.page = 1
				this.getData({
					type: this.current + 1,
					page: "1"
				})
			},
			async getData(data) {
				let result = await myCashApi.user_cash_change(data)
				result = result.result.list
				if (data.type == 1) {
					this.arrDjiesuan = result
					this.arrisShow = this.arrDjiesuan
				}
				if (data.type == 2) {
					this.arrShouru = result
					this.arrisShow = this.arrShouru
				}
				if (data.type == 3) {
					this.arrZhichu = result
					this.arrisShow = this.arrZhichu
				}
			},
			 balance_info() {
				 let self =this
				 self.request({
					 url:"",
					 data:{}
				 }).then(res => {
				         console.log(res)
				         if (res.data.success) {
				         
				         } else {
				                 uni.showToast({
				                 title: res.data.message,
				                 icon: 'none'
				                 })
				         }
				 })
			},
		}
	}
</script>

<style lang="scss" scoped>
	#lookBalance {

		// padding: 30rpx;
		.lookTop {
			padding: 30rpx;
			width: 100%;
			height: 355rpx;
			background: #F5F5F5;
			box-sizing: border-box;

			text {
				font-size: 24rpx;
				color: #FFFFFF;
				font-family: PingFang SC;
				font-weight: 400;
			}

			.lookTopTime {
				position: relative;
				width: 100%;
				height: 100%;
				background: linear-gradient(45deg, #FF862B, #FF964F);

				image {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}

				.lookitem {
					position: absolute;
					z-index: 1;
					width: 100%;
					height: 100%;

					.lookitemBalance {
						padding-top: 28rpx;
						padding-left: 36rpx;
						box-sizing: border-box;
					}

					.lookitemMonery {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 27rpx;

						text {
							font-size: 77rpx;
						}

						.deposit {
							font-size: 26rpx;
							padding: 13rpx 42rpx;
							border-radius: 25rpx;
							background-color: #FFFFFF;
							color: #FF862B;
							border-radius: 25rpx;
							font-family: Source Han Sans CN;
						}
					}

					.depositLog {
						margin-top: 60rpx;
						display: flex;

						text {
							flex: 1;
							padding-left: 37rpx;
						}
					}
				}


			}
		}

		.lookBottom {
			padding: 30rpx;

			.bottom {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FF862B;

				&::before {
					content: "| ";
					vertical-align: baseline;
					font-size: 15px;
					font-family: PingFang SC;
					font-weight: 600;
					color: #FF862B;
				}
			}

			.lookBottomTitle {
				padding: 20rpx 40rpx 0;
				border-bottom: 1px solid RGBA(245, 245, 245, 1);
			}
		}

		.item {
			.itemList {
				padding: 20rpx 0;
				border-bottom: 1px solid RGBA(245, 245, 245, 1);

				.itemTitle {
					display: flex;
					justify-content: space-between;
					margin-bottom: 5rpx;

					.moneryTitle {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}

					.monery {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FD635E;
					}

				}

				.itemTime {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;

					color: #999999;
					display: flex;
					justify-content: space-between;
				}
			}
		}

	}
</style>
