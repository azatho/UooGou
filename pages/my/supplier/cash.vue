<template>
	<view class="box">
		<view class="header">
			<view class="header-t">
				<view class="header-l">
					<view class="text">
						可提现金额 (元) :
					</view>
					<view class="num">
						{{money.balance }}
					</view> 
				</view>
				<view class="header-r" @click="openRules()" >
					<view class="text" style="color: #FFFFFF;">
						提现规则
					</view>
					<u-modal v-model="rulesShow" title="提现规则说明" :title-style="{'margin-bottom':'30rpx','font-size':'30rpx','font-weight':'bold'}" :content-style="{'font-size':'26rpx','color':'#f5f5f5','matgin-bottom':'10rpx'}">
						<view v-for="(item,index) in rulesList" :key="item" style="color: #333333;margin-left: 30rpx;">{{item}}</view>
					</u-modal>
					<image src="../../../static/wh.png" class="img"></image>
				</view>
			</view>
			<view class="header-b">
				<view class="item-l">
					提现中 (元) : {{money.in_cash}}
				</view>
				<view class="item-r">
					累计提现 (元) : {{money.cumulative}}
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
		<view class="banner">
			<view class="item" style="display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<image src="../../../static/card.png" class="img"></image>
					<view class="text">
						银行卡
					</view>
				</view>
				<view  class="bind" v-if="isBinkCard" @click="goWithdrawal">
					提现 >
				</view>
				<view  class="bind"  v-else  @click="goAddMyCard">
					立即绑定银行卡 >
				</view>
			</view>
			<view class="line">
			</view>
			<view class="item" style="display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<image src="../../../static/weChatPay.png" class="img"></image>
					<view class="text" >
						微信
					</view>
				</view>
				<view class="bind" @click="$u.throttle(gowx,1000)">
					提现 > 				
				</view>
<!-- 				<view class="bind" @click="$u.throttle(wxBind,1000)" v-else>
					立即绑定微信 >
				</view> -->
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
			<!-- <image src="../../static/null.png" class="img"></image> -->
			<view v-if="moneyRecordList.data.length>0">
				<view class="item" v-for="(item,index) in moneyRecordList.data" :key="item.extract_index">
					<view class="item-l">
						<view class="text-t">
							<view class="weight">
								提现
							</view>
							<view class="solid">
								{{wxOrCard(item.withdrawal_type)}}
							</view>
						</view>
						<view class="text-b">
							{{$timeConvert(item.extract_time)}}
						</view>
					</view>
					<view class="item-r">
						<view class="num">
							{{$returnFloat(item.extract_money)}}
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
				<!-- <img src="../../../static/datanull.png" alt="" style="width: 480rpx;height: 360rpx;" > -->
				<!-- <img :src="c('/CxtxUni/static/datanull.png')" alt="" style="width: 480rpx;height: 360rpx;" > -->
			</view>
			
		</view>
		<view>
			<uni-popup ref="popup" type="center">
				<view class="dialog">
					<view class="dia-t">
						驳回原因
					</view>
					<view class="dia-c">
						{{refund_reason}}
					</view>
					<view class="dia-f" @tap="close">
						我知道了
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				// 用户标识全局的
				token: "",
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
				refund_reason:""
			}
		},
		// onLoad() {
		// 	this.token = uni.getStorageSync("xxytoken")
		// 	// 拿到提现金额等数据
		// 	agentCenterApi.withdraw({
		// 		// token: this.token
		// 	}).then(res => {
		// 		if (res.status == 200&&res.result!=null) {
		// 			this.money = res.result
		// 		} else {
		// 			uni.showToast({
		// 				title: res.message,
		// 				icon: "none"
		// 			})
		// 		}
		// 	})
		// 	// 拿到提现列表数据
		// 	agentCenterApi.withdrawalRecord({
		// 		token:this.token,
		// 		total:"10",
		// 		page:this.pageIndex
		// 		}).then(res => {
		// 		if (res.status == 200&&res.result!=null) {
		// 			this.moneyRecordList = res.result
		// 		} else if(res.status!=200) {
		// 			uni.showToast({
		// 				title: res.message,
		// 				icon: "none"
		// 			})
		// 		}
		// 	});
		// 	// 查询是否绑定过银行卡
		// 	agentCenterApi.binkCard({token:this.token}).then(res=>{
		// 		if(res.status==200&&res.result!=''){
		// 			this.isBinkCard=true
		// 		}else{
					
		// 		}
		// 	});
		// 	// 查询是否绑定过微信
		// 	agentCenterApi.user_wechant({token:this.token}).then(res=>{
		// 		if(res.status==200){
		// 			if(res.result.type==1){
		// 				this.isWeChat=true
		// 			}else {
						
		// 			}
		// 		}
		// 	})
		// },
		methods: {
			// 跳转到提现页面
			goWithdrawal(){
				uni.navigateTo({
					// url:"../withdrawal/withdrawal?cash="+this.money.cash+'&bink=1'
					url:'../withdrawal'
				})
			},
			goAddMyCard(){
				uni.navigateTo({
					url:'../bankCard'
					// url:"../addMyCard/addMyCard?cash="+this.money.cash
				})
			},
			gowx(){
				wx.getUserProfile({
					desc:"用于完善用户信息",
					success:(res)=>{
						uni.navigateTo({
							url:"../withdrawal/withdrawal?userInfo="+JSON.stringify(res.userInfo)+'&cash='+this.money.cash+'&weixin=1'
						})
					}
				})
			},
			openRules(){
				agentCenterApi.rules({type:"3"}).then(res=>{
					if(res.status==200&&res.result!=null){
						this.rulesList=res.result;
						this.rulesShow=true;
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				})
			},
			// 节流
			// throttle(fn,delay){
			//     let valid = true
			//     return function() {
			//        if(!valid){
			//            //休息时间 暂不接客
			//            return false 
			//        }
			//        // 工作时间，执行函数并且在间隔期内把状态位设为无效
			//         valid = false
			//         setTimeout(() => {
			//             fn()
			//             valid = true;
			//         }, delay)
			//     }
			// },
			// 跳转到微信提现
			wxBind(){
				var that=this
				wx.login({
				  success (res) {
					  agentCenterApi.get_openid({
						  token:that.token,
						  code:res
					  }).then(res=>{
						  if(res.status==200){  
						  }else{
							  uni.showToast({
							  	title:res.message,
								icon:"none"
							  })
						  }
					  })
				  }
				})
				wx.getUserProfile({
					desc:"用于完善用户信息",
					success:(res)=>{
						uni.navigateTo({
							url:"../myCard/withdrawal?userInfo="+JSON.stringify(res.userInfo)+'&cash='+this.money.cash+'&weixin=1'
						})
					},
					fail:()=>{
						isclick=true
					}
					
				})
				// wx.login({
				//   success (res) {
				// 	  agentCenterApi.get_openid({
				// 		  token:this.token,
				// 		  code:res
				// 	  }).then(res=>{
				// 		  if(res.status==200){
							  
				// 		  }else{
				// 			  uni.showToast({
				// 			  	title:res.message,
				// 				icon:"none"
				// 			  })
				// 		  }
				// 	  })
				//   }
				// })
			},
			// 查看原因打开弹层
			open(e) {
				this.refund_reason=e.refund_reason
				// 通过组件定义的ref调用uni-popup方法
				this.$refs.popup.open()
			},
			// 关闭弹层
			close() {
				this.$refs.popup.close()
			},
			// 将得到的状态转换为对应的值
			wxOrCard(e){
				if(e==1){
					return "微信零钱"
				}else{
					return "银行卡"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		.header {
			width: 750rpx;
			height: 260rpx;
			background: linear-gradient(45deg, #FF862B, #FF964F);
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
				background: #4794FF;
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
			height: 182rpx;

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
