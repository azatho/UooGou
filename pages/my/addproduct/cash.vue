<template>
	<view class="box">
		<view class="header" :class="extract_type==1?'header2':'header1'">
			<view class="header-t">
				<view class="header-l">
					<view class="text">
						可提现金额 (元) :
					</view>
					<view class="num">						
						{{$returnFloat(cashInfo.cash)}}
					</view> 
				</view>
				<view class="header-r" @click="openRules()" >
					<view class="text" style="color: #FFFFFF;">
						提现规则
					</view>
					<u-modal v-model="rulesShow" title="提现规则说明" :title-style="{'margin-bottom':'30rpx','font-size':'30rpx','font-weight':'bold'}" :content-style="{'font-size':'26rpx','color':'#f5f5f5','matgin-bottom':'10rpx'}">
						<view v-for="(item,index) in cashInfo.show_style" :key="item" style="color: #333333;margin-left: 30rpx;height: 40rpx;line-height:40rpx;">{{item}}</view>
					</u-modal>
					<image src="../../../static/wh.png" class="img"></image>
				</view>
			</view>
			<view class="header-b">
				<view class="item-l">
					提现中 (元) : {{$returnFloat(cashInfo.extract_cash)}}
				</view>
				<view class="item-r">
					累计提现 (元) : {{$returnFloat(cashInfo.extracting_money)}}
				</view>
			</view>
		</view>
		<view class="way">
			<view class="blue">
			</view>
			<view class="text">
				请选择提现方式
			</view>
		</view>
		<view class="banner" @click="gowx">
			<view class="item" style="display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<image src="../../../static/payment.png" class="img"></image>
					<view class="text" >
						微信
					</view>
				</view>
				<view class="bind">
					提现 > 				
				</view>
			</view>
		</view>
		<view class="way">
			<view class="blue">
			</view>
			<view class="text">
				提现记录
			</view>
		</view>
		<view class="footer">
			<view v-if="cashChangeList.data.length>0">
				<view class="item" v-for="(item,index) in cashChangeList.data" :key="item.extract_index">
					<view class="item-l">
						<view class="text-t">
							<view class="weight">
								提现
							</view>
							<view class="solid">
								{{item.type_name}}
							</view>
						</view>
						<view class="text-b">
							{{holo.formatTime(item.time*1000)}}
						</view>
					</view>
					<view class="item-r">
						<view class="num">
							{{$returnFloat(item.amount)}}
						</view>
						<view class="text111" v-if="item.payment_status==2">
							<view class="text-l" @click="open(item)">
								查看驳回原因
							</view>
							<view class="text-r">
								提现中
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else style="text-align: center;margin-top: 100rpx;">
				<img src="../../../static/noshop(1).png" alt="" style="width: 344rpx;height: 293rpx;" >
				<!-- <img :src="c('/CxtxUni/static/datanull.png')" alt="" style="width: 480rpx;height: 360rpx;" > -->
			</view>
			
		</view>
		<view>
				<!-- <view class="dialog" v-if='showModel'>
					<view class="dia-t">
						驳回原因
					</view>
					<view class="dia-c">
						{{refund_reason}}
					</view>
					<view class="dia-f" @click="close">
						我知道了
					</view>
				</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModel:false,
				cashInfo:{
					cash:0,
					extract_cashL:0,
					extracting_money:100
				},//余额信息
				// 得到的金额数据对象  
				money: {},
				// 得到的提现记录数据
				moneyRecordList: {
					data:[]
				},
				// 提现列表请求页数
				pageIndex:"1",
				rulesShow:false,
				rulesList:"",
				// 是否绑定银行卡
				isBinkCard:true,
				// 是否绑定微信
				isWeChat:false,
				userInfo:{},
				hasUserInfo:false,
				refund_reason:"",
				cashChangeList:{
					data:[]
				},//提现记录
				extract_type:"",//用户身份
			}
		},
		onShow() {
			this.pageIndex=1;
			this.cashChangeList={data:[]}
			this.balance_info();
			this.cash_change();
		},
		onReachBottom(){
			if(this.pageIndex<this.cashChangeList.page){
				this.pageIndex++;
				this.cash_change();
			}
		},
		onLoad(e){
			this.extract_type=e.extract_type
		},
		methods: {
			close(){
				this.showModel=true
				 // this.$refs.popup.close()
			},
			// 打开驳回原因弹窗
			open(e){
				// this.refund_reason=e.refund_reason
				// this.$refs.popup.open('center')
				// this.showModel=true
				uni.showModal({
					title:'驳回原因',
					content:e.refund_reason,
					showCancel:false,
					confirmText:'我知道了'
				})
				
			},
			// 跳转到微信提现页面
			gowx(){
				uni.redirectTo({
					url:"withdrawal?mycash="+this.cashInfo.cash+'&extract_type='+this.extract_type
				})
			},
			// 提现记录
			cash_change(){
				let self =this;
				self.request({
					url:"ugo/api/app.php?c=supplier/getCashChangeListV2",
					data:{
						page:self.pageIndex,
						type:4,
					}
				}).then(res => {
				        if (res.data.success) {
							this.cashChangeList.data.length>0?this.cashChangeList.data=[...res.data.data,...this.cashChangeList.data]:this.cashChangeList=res.data
				        } else {
				                uni.showToast({
				                title: res.data.message,
				                icon: 'none'
				                })
				        }
				})
			},
			// 获取用户提现信息
			balance_info(){
				 let self =this
				 self.request({
					 url:"ugo/api/mall.php?c=card/get_cash_info",
					 data:{
						 extract_type:self.extract_type,
					 }
				 }).then(res => {
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
			// 打开规则说明弹窗
			openRules(){
				this.rulesShow=true
			},
		}
		}
</script>

<style lang="scss" scoped>
	.box {
		.header1{
			background-color: #FF862B;
		}
		.header2{
			background-color: #FF3636;
		}
		.header {
			width: 750rpx;
			height: 260rpx;
			padding: 30rpx;
			box-sizing: border-box;
			.header-b {
				display: flex;
				justify-content: space-between;
				margin-top: 81rpx;

				.item-l {
					width: 245rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 23rpx;
				}

				.item-r {
					width: 268rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 23rpx;

				}
			}

			.header-t {
				display: flex;
				justify-content: space-between;


				.header-l {
					width: 216rpx;

					.text {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 25rpx;
					}

					.num {
						width: 179rpx;
						font-size: 60rpx;
						font-family: Arial;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 45rpx;
						margin-top: 27rpx;
					}
				}

				.header-r {
					width: 180rpx;
					height: 50rpx;
					background:rgba($color: #FFFFFF, $alpha: 0.3);
					color: #e1edff;
					border-radius: 25rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.text {
						margin-left: 10rpx;
						margin-bottom: 6rpx;
					}

					.img {
						width: 32rpx;
						height: 32rpx;
						margin: 6rpx;
					}
				}

			}


		}

		.way {
			width: 750rpx;
			height: 70rpx;
			background: #F5F5F5;
			display: flex;
			align-items: center;

			.blue {
				width: 5rpx;
				height: 30rpx;
				background: #FF6351;
				margin-left: 30rpx;
			}

			.text {
				width: 182rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 25rpx;
				margin-left: 17rpx;
				margin-bottom: 2rpx;

			}
		}

		.banner {
			width: 750rpx;
			height: 91rpx;

			.item {
				display: flex;
				align-items: center;
				height: 90rpx;
				margin-left: 31rpx;

				.img {
					width: 44rpx;
					height: 44rpx;
				}

				.text {
					width: 78rpx;
					line-height: 25rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-left: 22rpx;

				}

				.bind {
					margin-right: 30rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 25rpx;
				}
			}

			.line {
				width: 719rpx;
				height: 2rpx;
				background: #F5F5F5;
				margin-left: 31rpx;

			}
		}

		.footer {

			width: 100%;

			.img {
				width: 344rpx;
				height: 298rpx;
				margin-top: 201rpx;
				margin-left: 202rpx;
			}

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid #f5f5f5;

				.item-l {
					margin: 30rpx 0;
					margin-left: 30rpx;

					.text-t {
						display: flex;
						justify-content: flex-start;
						margin-bottom: 10rpx;

						.weight {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}

						.solid {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-left: 10rpx;
						}
					}

					.text-b {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}

				.item-r {
					margin-right: 30rpx;

					.num {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FF5454;
						text-align: right;
					}

					.text {
						display: flex;
						justify-content: space-between;
						width: 220rpx;
						text-align: right;

						.text-l {

							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							text-decoration: underline;
							color: #2897FF;
							margin-right: 35rpx;


						}

						.text-r {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							display: inline-block;

						}
					}
				}
			}
		}

		.text111 {
			text-align: right;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			width: 300rpx;

			.text-l {
				text-decoration: underline;
				color: #2897FF;
				margin-right: 35rpx;
				display: inline-block;
			}

			.text-r {
				display: inline;
			}

		}
	}

	.dialog {
		width: 500rpx;
		height: 300rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;

		.dia-t {

			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			margin: 30rpx auto;
			text-align: center;

		}

		.dia-c {

			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			margin: 0 28rpx;


		}

		.dia-f {
			width: 100%;
			height: 90rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #4894FE;
			text-align: center;
			line-height: 90rpx;
			margin-top: 25rpx;
			border-top: 2rpx solid #f5f5f5;

		}

	}
</style>
