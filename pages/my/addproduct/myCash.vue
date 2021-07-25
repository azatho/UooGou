<template>
	<view id="lookBalance">
		<view class="lookTop">
			<view class="lookTopTime">
				<!-- <image src="../../../static/myCenter/lookB.png" mode=""></image> -->
				<view class="lookitem" :class="userType==1?'lookitemColor':'lookitemColor1'">
					<view class="lookitemBalance">
						<text>
							账户余额：
						</text>
					</view>
					<view class="lookitemMonery">
						<text>{{$returnFloat(cashInfo.cash)}}</text>
						<text :class="userType==1?'deposit1':'deposit'" @click="gopage">提现</text>
					</view>
					<view class="depositLog">
						<text>累计提现（元）：{{$returnFloat(cashInfo.extract_cash)}}</text>
						<text>提现中（元）：{{$returnFloat(cashInfo.extracting_money)}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="lookBottom" style="padding-top: 30rpx;">
			<text class="bottom" style="padding: 30rpx"> 余额记录</text>
			<view class="lookBottomTitle">
				<view class="nav">
					<view v-for="(item,index) in list" @click="change(index)" :class="index!=navIndex?'':userType==1?'navSelct':'navSelct1'">
						{{item.name}}
					</view>
				</view>
			</view>
			<!-- v-for=" (item) in  arrisShow" -->
			<view class="item" style="padding: 0 30rpx;" v-if="cashChangeList.data.length>0">
				<view class="itemList" v-for="(item,index) in cashChangeList.data" :key="index">
					<view class="itemTitle">
						<text class="moneryTitle">{{item.type_name}}</text>
						<text class="monery">{{$returnFloat(item.amount)}}</text>
					</view>
					<view class="itemTime">
						<text>{{holo.formatTime(item.time*1000) }}</text>
						<text v-if="item.payment_status==0">提现中</text>
						<text v-if="item.payment_status==1">提现成功</text>
						<text v-if="item.payment_status==2">已驳回</text>
					</view>
				</view>
			</view>
			<view class="item" v-else style="text-align: center;margin-top: 111rpx;">
				<img src="../../../static/noshop(1).png" alt="" style="width: 344rpx;height: 300rpx;">
				<view class="font-24" style="color: #999999;">暂无数据</view>
				<!-- <img :src="$imgUrl('CxtxUni/static/myCenter/datanull.png')" alt="" style="width: 344rpx;height: 300rpx;"> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cashInfo:{
					cash:0,
					extract_cashL:0,
					extracting_money:0
				},//余额信息
				current: 0,
				page: 1,
				list: [{
					name: "待结算"
				}, {
					name: "收入"
				}, {
					name: "支出"
				}],
				navIndex:0,//选中的tab栏
				balance: 0.00,
				in_cash: 0.00,
				cumulative: 0.00,
				arrDjiesuan: [],
				arrShouru: [],
				arrZhichu: [],
				arrisShow: [],
				cashChangeList:{
					data:[]
				},//提现记录列表
				userType:'',//同页面身份不同样式不同
			}
		},
		computed: {

		},
		onLoad(e){
			this.userType=e.type
		},
		onShow() {
			this.balance_info(),
			this.change(0)
		},
		onReachBottom() {

		},
		methods: {
			// 点击切换导航栏
			change(e){
				this.navIndex=e;
				this.cashChangeList={
					data:[]
				}
				this.page=1
				this.cash_change()
			},
			// 提现记录
			cash_change(){
				let self =this;
				self.request({
					url:"ugo/api/app.php?c=supplier/getCashChangeListV2",
					data:{
						page:this.page,
						type:self.navIndex+1,
					}
				}).then(res => {
				        if (res.data.success) {
							this.cashChangeList.data.lengeh>0?[...this.cashChangeList.data,...res.data.data]:this.cashChangeList=res.data
				        } else {
				                uni.showToast({
				                title: res.data.message,
				                icon: 'none'
				                })
				        }
				})
			},
			// 账户余额信息
			 balance_info(){
				 let self =this
				 self.request({
					 url:"ugo/api/mall.php?c=card/get_cash_info",
					 data:{
						 extract_type:1,
					 }
				 }).then(res => {
				         console.log(res)
				         if (res.data.success) {
							self.cashInfo=res.data.data
				         } else {
				                 uni.showToast({
				                 title: res.data.message,
				                 icon: 'none'
				                 })
				         }
				 })
			},
			// 跳转至提现页面
			gopage(){
				uni.navigateTo({
					url:'cash?extract_type='+this.userType
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lookitemColor{
		background-color: #FD635E;
	}
	.lookitemColor1{
		background: linear-gradient(45deg, #FF862B, #FF964F);
	}
	.nav{
		height: 80rpx;
		line-height: 80rpx;
		// background-color: #F5F5F5;
		display: flex;
		justify-content: space-around;
	}
	.navSelct{
		color: #FC4950;
		border-bottom: 4rpx solid #FC4950;
	}
	.navSelct1{
		color: #FF862B;
		border-bottom: 4rpx solid #FF862B;
	}
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
				// background: linear-gradient(45deg, #FF862B, #FF964F);

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
					border-radius: 15rpx;
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
						.deposit1 {
							font-size: 26rpx;
							padding: 13rpx 42rpx;
							border-radius: 25rpx;
							background-color: #FFFFFF;
							color: #FD635E;
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
			// padding: 30rpx;

			.bottom {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				// color: #FF862B;

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
