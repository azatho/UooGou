<!-- 绑定银行卡页面 -->
<template>
	<view>
		<!-- 绑定银行卡列表 -->
		<view v-if="bind">
			<view class="hang" @click="showModel">
				<view class="txt">请选择开户行</view>
				<view class="right">
					{{value}}<image src="../../static/back.png"></image>
				</view>
			</view>
			<view class="hang">
				<view class="txt">开户人姓名</view>
				<view class="right">
					<input type="text" placeholder="请输入姓名" :value="value1" @input="getName"/>
				</view>
			</view>
			<!-- <view class="hang">
				<view class="txt">身份证号</view>
				<view class="right">
					<input type="number" placeholder="请输入开户人身份证号" :value="value2" @input="getSfz"/>
				</view>
			</view> -->
			<view class="hang">
				<view class="txt">银行卡账号</view>
				<view class="right">
					<input type="number" placeholder="请输入银行卡账号" :value="value3" @input="getNum"/>
				</view>
			</view>
			<view class="hang">
				<view class="txt">确认银行卡账号</view>
				<view class="right">
					<input type="number" placeholder="请确认银行卡账号" :value="value4" @input="getNum1"/>
				</view>
			</view>
			<view class="btn" @click="confirm()">立即绑定</view>
		</view>
		<!-- 我的银行卡列表 -->
		<view class="list" v-else>
			<view class="bgc">
				<view class="img">
					<image :src="cdnUrl+cardMsg.logo" mode=""></image>
				</view>
				<view class="right">
					<view class="title">{{cardMsg.card_bank}}</view>
					<view class="cars">储蓄卡</view>
					<view class="numb">{{cardMsg.card_number}}</view>
				</view>
			</view>
			<view style="margin: 40rpx auto;text-align: center;color:#999;font-size:24rpx">
				更换银行卡请联系客服~
			</view>
		</view>
		<!-- 银行卡样式 -->
		<view class="chooseModel" v-if="visible" @click="cancel_choose">
			<view class="showModel" >
				<picker-view    @change="bindChange">
				    <picker-view-column>
				        <view class="item" v-for="(item,i) in cardList" :key="i">{{item.bank_name}}</view>
				    </picker-view-column>
				</picker-view>
				<view class="btns">
					<view class="sure" @click="cancel_choose">
						取消
					</view>
					<view class="cancel" @click="sure_choose">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdnUrl:'',
				value:'请选择',
				value1:'',//名字
				value2:'',//身份证
				value3:'',//第一次
				value4:'',//第二次
				bind:false,
				visible:false,//弹框的显示和隐藏
				cardList:[],//所有银行卡名列表
				cardName:'',//传的开户行名
				showChange:false,
				cardMsg:{},//存放用户自己的银行卡列表
			}
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
							self.bind = true
							uni.setNavigationBarTitle({
							    title: '绑定银行卡'
							});
							self.getCardName()
						}else if(res.data.msg=='银行卡信息~！'){
							uni.setNavigationBarTitle({
							    title: '我的银行卡'
							});
							self.bind = false
							self.cardMsg = res.data.data.card_info
							self.cardMsg.card_number=self.cardMsg.card_number.replace(/(\d{4})\d+(\d{3})$/, "$1 **** **** **** $2")
						}else{
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
						}
					  } 
				},rej=>{
					console.log(rej)
				})
			},
			// 选择开户行
			showModel(){
				this.visible = true
				this.showChange = false
				this.getCardName()
			},
			// 获取银行卡卡名列表
			getCardName(){
				let self = this
				self.request({
					url:'ugo/api/mall.php?c=user_bank_list',//银行卡列表
					data:{
						token:uni.getStorageSync('token')
					}
				}).then(res=>{
					 if(res.data.success){
						self.cardList=res.data.data
					  } 
				},rej=>{
					console.log(rej)
				})
			},
			// 选择的数据
			bindChange(e){
				let i = e.detail.value[0]
				this.cardName=this.cardList[i].bank_name
				this.showChange = true
			},
			// 隐藏弹框
			cancel_choose(){
				this.visible = false
				this.showChange = false
			},
			// 确定按钮
			sure_choose(){
				this.visible=false
				if(this.showChange == false){
					this.value=this.cardList[0].bank_name
					this.cardName=this.cardList[0].bank_name
				}else{
					this.value=this.cardName
				}
				// console.log(this.cardName);
			},
			// 名字
			getName(e){
				this.value1=e.detail.value
			},
			// 身份证号
			// getSfz(e){
			// 	this.value2=e.detail.value
			// },
			// 卡号第一次
			getNum(e){
				this.value3=e.detail.value
			},
			// 卡号第二次
			getNum1(e){
				this.value4=e.detail.value
			},
			// 立即绑定
			confirm(){
				let self = this
				if(self.cardName == ''){
					uni.showToast({
						icon:'none',
						title:'请选择开户行'
					})
				}else if(self.value1==''){
					uni.showToast({
						icon:'none',
						title:'请输入开户人姓名'
					})
				}else if(self.value3 == ''){
					uni.showToast({
						icon:'none',
						title:'请输入银行卡账号'
					})
				}else if(self.value4==''){
					uni.showToast({
						icon:'none',
						title:'请再次输入银行卡账号'
					})
				}else if(self.value3!=self.value4){
					uni.showToast({
						icon:'none',
						title:'两次输入的银行卡账号不一致'
					})
				}else{
					self.request({
						url:'ugo/api/mall.php?c=submitBankCard',
						data:{
							token:uni.getStorageSync('token'),
							card_bank:self.value,
							card_holder:self.value1,
							card_number:self.value3,
						}
					}).then(res=>{
						 if(res.data.success){
							uni.showToast({
								title:res.data.msg
							})
							self.bind=false
							// self.getCard()
							uni.navigateBack({
								delta:1
							})
						  }else{
							uni.showToast({
							  	title:res.data.msg,
								icon:'none'
							})
						  }
					},rej=>{
						console.log(rej)
					})
				}				
			},
		},
		onShow() {
			this.cdnUrl=this.$cdnUrl
		},
		created(){
			this.getCard()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
.hang {
	padding: 30rpx;
	box-sizing: border-box;
	border-top: 1rpx solid #F5F5F5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	background-color: #FFFFFF;
}
.hang .right {
	color: #999999;
}
.hang .right image{
	width: 12rpx;
	height: 22rpx;
	vertical-align: middle;
	margin-left: 25rpx;
}
.hang .right input {
	text-align: right;
	width: 400rpx;
	height: 30rpx;
	line-height: 30rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
}
.btn {
	width: 690rpx;
	height: 90rpx;
	background: #F6281B;
	border-radius: 45rpx;
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 90rpx;
	text-align: center;
	margin: 150rpx auto;
}
/* 列表 */
.list {
	margin: 30rpx;
}
.list .bgc {
	background-color: #FFFFFF;
	border-radius: 15px;
	display: flex;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	padding: 45rpx 0 50rpx 75rpx;
	box-sizing: border-box;
	margin-bottom: 20rpx;
}
.list .img image{
	width: 78rpx;
	height: 78rpx;
	border-radius: 50%;
	margin-right: 20rpx;
}
.bgc .right .cars {
	font-size: 24rpx;
	color: #000003;
	opacity: 0.5;
	margin: 15rpx;
}
.bgc .right .numb {
	font-size: 36rpx;
}
/* 银行卡选框样式 */
	.chooseModel{
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: rgba(0,0,0,.5);
		z-index: 22;
		.showModel {
			width: 100%;
			height: 700rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 111111;
			background-color: #fff;
			border-radius: 10rpx 0 0 10rpx;
			picker-view{
				width: 100%;
				height: 600rpx;
			}
			.item {
				line-height: 34px;
				text-align: center;
			}
			.btns{
				display: flex;
				view{
					width: 50%;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
				}
			}
			.sure{
				border-right: 1rpx solid #f5f5f5;
			}
		}
	}
</style>
