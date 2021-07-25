<!-- 提现页面 -->
<template>
	<view class="" >
		<view class="cardMsg">
			<view class="card_img">
				<img :src="cdnUrl+userInfo.head_img" alt="" style="border-radius: 50%;">
			</view>
			<view>
				<view class="card_msg" >
					<view class="card_name">
						{{userInfo.name}}
					</view>
				</view>
			</view>
			<!-- <view class="card_choose" v-if="statusStyle==3"  @click="goChangeBankCard"> -->
				<!-- <image src="../../../static/myCenter/right.png" mode="" style="height: 27rpx;width: 15rpx;"></image> -->
			<!-- </view> -->
		</view>
		<view class="money">
			<view class="word">
				提现金额
			</view>
			<view class="ipt">
				<view class="money_mark">
					￥
				</view>
				<input type="number" placeholder="请输入提现金额" v-model="withdrawalMoney" :class="withdrawalMoney!=''?'current':''"/>
				<view class="" class="del_money" @click="delMoney">
				</view>
			</view>
			<view class="left_monry">
				可提现余额：{{$returnFloat(withdrawalInfo.available_cash)}}
				<view class="all_money" @click="getAll">
					全部提现
				</view>
			</view>
		</view>
		<view class="rule">
			<view class="" >
				提现规则：
			</view>
			<view>
				<view class="" v-for="(item,index) in ruleList" :key="index" style="margin-bottom: 20rpxs;">
					 {{item}}
				</view>
			</view>

		</view>
		<view class="sure" @click="confirm" :class="extract_type==2?'sure':'sure1'">
			确定提现
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cdnUrl:'',
			cash:'',
			show:false,
			cardMsg:{},
			txcash:0,
			show_style:'',
			token:"",
			withdrawalMoney:"",
			ruleList:[],
			userInfo:{
				head_img:"",
				name:"",
			},//用户个人信息
			statusStyle:"",
			withdrawalInfo:"",//提现页面信息
			extract_type:"",//用户身份
		};
	},
	methods: {
		// 确认提现
		confirm(){
			let self =this;
			self.request({
				url:"ugo/api/mall.php?c=user_apply_withdrawV2",
				data:{
					cash_amount:self.withdrawalMoney*100,
					extract_type:self.extract_type
				}
			}).then(res => {
				console.log(res)
			        if (res.data.success) {
						console.log(111)
						uni.redirectTo({
							url:'withdrawalSuccess'
						})
			        } else {
			                uni.showToast({
			                title: res.data.message,
			                icon: 'none'
			                })
			        }
			})
		},
		// 获取提现页面信息
		withdrawal(){
			let self =this
			self.request({
				url:"/ugo/api/mall.php?c=card/get_wechat_info",
				data:{
					type:self.extract_type
				}
			}).then(res => {
				console.log(res)
			        if (res.data.success) {
						self.withdrawalInfo=res.data.data
						self.ruleList=res.data.data.show_style.split("<br/>")
			        } else {
			              uni.showToast({
			                      title:res.data.message,
			                      icon:'none'
			              })
			        }
			})
		},
		// 获取个人信息
		getUserInfo(){
			let self=this
			self.request({
				url:'ugo/api/mall.php?c=getUserInfo',
				data:{
				}
			}).then(res=>{
				console.log(res)
				if (res.data.success) {
					// self.showlogin = true;
					self.userInfo = res.data.data;
				}else {
					// self.showlogin = false;
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
	onShow(){
		this.getUserInfo()
		this.withdrawal()
	},
	onLoad(e) {
		this.cash=e.mycash
		this.cdnUrl=this.$cdnUrl
		this.extract_type=e.extract_type
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
	.card_img img{
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
		color: #509EE0;
		font-size: 24rpx;
	}
	.rule{
		/* width: 180rpx; */
		padding: 30rpx;
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
		background: #FF862B;
		border-radius: 45rpx;
		margin: 50rpx 30rpx 0;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
	}
	.sure1{
		width: 690rpx;
		height: 90rpx;
		background: #F5281C;
		border-radius: 45rpx;
		margin: 50rpx 30rpx 0;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
	}
</style>
