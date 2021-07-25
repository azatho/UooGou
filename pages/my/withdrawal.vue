<!-- 银行卡提现页面 -->
<template>
	<view class=""  v-if="show">
		<view class="cardMsg" @click="goBank">
			<view class="card_img">
				<image :src="cdnUrl+cardMsg.logo" mode=""></image>
			</view>
			<view class="card_msg">
				<view class="card_num">
					{{cardMsg.card_number}}
				</view>
				<view class="card_name">
					{{cardMsg.card_bank}}
				</view>
			</view>
			<view class="card_choose">
				<image src="../../static/right_back.png" mode=""></image>
			</view>
		</view>
		<view class="money">
			<view class="word">
				提现金额
			</view>
			<view class="ipt">
				<view class="money_mark">
					￥
				</view>
				<input type="text" :value="moneyValue" placeholder="请输入提现金额" @input="getMoney" :class="moneyValue!=''?'current':''"/>
				<view class="" class="del_money" @click="delMoney">
					<image src="../../static/del.png" ></image>
				</view>
			</view>
			<view class="left_monry">
				可提现余额：{{cash}}
				<view class="all_money" @click="getAll">
					全部提现
				</view>
			</view>
		</view>
		<view class="rule">
			<view class="rule_left">
				提现规则：
			</view>
			<view class="rule_right">
				<!-- <text space="emsp">{{show_style}}</text> -->
				<rich-text :nodes="show_style"></rich-text>
			</view>
		</view>
		<view class="sure" @click="confirm">
			确定提现
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cdnUrl:'',
			cash:0,
			show:false,
			// show:true,
			moneyValue:'',
			cardMsg:{},
			txcash:0,
			show_style:'',
			card_index:'',
		};
	},
	methods: {
		//获取银行卡
		getCard(){
			let self = this
			self.request({
				url:'ugo/api/mall.php?c=card/get_bank_info',
				data:{
					token:uni.getStorageSync('token')
				}
			}).then(res=>{
				 if(res.data.success){
					if(res.data.msg=='此帐号还没有银行卡~！'){
						uni.showModal({
							title: '提示',
							content: '尚未绑定银行卡，请先去绑定',
							cancelColor:'#999999',
							confirmText:'去绑定',
							confirmColor:'#FC4950',
							success: function success(res) {
								if (res.confirm) {
									uni.navigateTo({
										url:'./bankCard'
									})
								}else{
									uni.navigateBack({
										delta:1
									})
								}
							}
						});
					}else{
						self.show = true
						self.cardMsg = res.data.data.card_info
						self.card_index=res.data.data.card_info.card_index
						// 隐藏身份证中间的数字
						self.cardMsg.card_number=self.cardMsg.card_number.replace(/(\d{4})\d+(\d{3})$/, "$1 **** **** **** $2")
						self.show_style=res.data.data.show_style
					}
				  } else {
				    self.holo.toast({
						icon:'none',
						title:res.data.msg
					})
				  }
			},rej=>{
				console.log(rej)
			})
		},
		//获取输入的金额
		getMoney(e){
			this.moneyValue=e.detail.value
		},
		//清除输入的金额
		delMoney(){
			this.moneyValue=''
		},
		getAll(){
			this.moneyValue = this.cash
			
		},
		confirm(){
			let self = this
			if(self.moneyValue==''){
				self.holo.toast({
					icon:'none',
					title:'请输入提现金额'
				})
			}else if(Number(self.moneyValue)>Number(self.cash)){
				self.holo.toast({
					icon:'none',
					title:'余额不足'
				})
			}else{
				console.log(this.moneyValue);
				self.request({
					url:'ugo/api/mall.php?c=user_apply_withdraw',
					data:{
						token:uni.getStorageSync('token'),
						cash_amount:Number(self.moneyValue)*100,
						card_index:self.card_index//提现银行卡id
					}
				}).then(res=>{
					 if(res.data.success){
						 let cash_amount =''
						 let time=''
						 self.cash_amount=res.data.data.cash_amount
						 self.time=res.data.data.time
						self.holo.toast({
							title:res.data.msg
						})
						setTimeout(res=>{
							uni.navigateTo({
								// url:'./withdrawalSuccess?money='+self.moneyValue
								url:'./moneyAudit?cash_amount='+self.cash_amount+'&time='+ +self.time//转跳到审核页面
							})
						},1000)
						console.log(self.time);
					  } else {
					    self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
					  }
				},rej=>{
					console.log(rej)
				})
			}
		},
		goBank(){
			uni.navigateTo({
				url:'/pages/my/bankCard'
			})
		}
	},
	onShow() {
		this.cdnUrl=this.$cdnUrl
		this.getCard()
	},
	onLoad(options) {//应该是从管理中心页面带过去的
		this.txcash=options.txcash  //余额
	}
};
</script>

<style>
	page{
		background-color: #f8f8f8;
	}
	.cardMsg{
	
		background: #555555;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		margin: 102rpx 54rpx 0;
		display: flex;
		align-items: center;
		padding: 45rpx;
	}
	.card_img{
		width: 78rpx;
		height: 78rpx;
	}
	.card_img image{
		width: 78rpx;
		height: 78rpx;
	}
	.card_msg{
		width: 430rpx;
		padding-left: 20rpx;
		color: #fff;
	}
	.card_num{
		font-size: 36rpx;
	}
	.card_name{
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	.card_choose{
		width: 40rpx;
		height: 40rpx;
	}
	.card_choose image{
		width: 40rpx;
		height: 40rpx;
	}
	.money{
		width: 100%;
		padding: 30rpx 30rpx 0 30rpx;
		height: 285rpx;
		background: #FFFFFF;
		box-shadow: 0px 5rpx 7rpx 0px rgba(0, 0, 0, 0.15);
		box-sizing: border-box;
	}
	.word{
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.ipt{
		position: relative;
		padding: 0 80rpx 0 40rpx;
		margin-top: 40rpx;
		border-bottom: 1rpx solid #DFDFDF;
	}
	.money_mark{
		position: absolute;
		bottom: 10rpx;
		left: 0;
		font-size: 36rpx;
		font-family: HiraginoSansGB;
		font-weight: bold;
		color: #212121;
	}
	.ipt input{
		/* border-bottom: 1rpx solid #DFDFDF; */
		height: 80rpx;
		line-height: 80rpx;
	}
	.ipt .current{
		color: #333;
		font-size: 64rpx;
		font-weight: bold;
	}
	.del_money{
		position: absolute;
		bottom: 0;
		right: 0;
		width: 80rpx;
		height: 80rpx;
	}
	.del_money image{
		width: 30rpx;
		height: 30rpx;
		margin: 25rpx;
	}
	.left_monry{
		height: 90rpx;
		line-height: 90rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		position: relative;
	}
	.all_money{
		position: absolute;
		top: 0;
		right: 0;
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 40rpx;
		color: #FC4950;
		font-size: 24rpx;
	}
	.rule{
		padding: 40rpx;
		display: flex;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.rule_right{
		flex: 1;
		line-height: 40rpx;
	}
	.sure{
		width: 690rpx;
		height: 90rpx;
		background: #FC4950;
		border-radius: 45rpx;
		margin: 50rpx 30rpx 0;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
	}
</style>

