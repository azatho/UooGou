<!-- 换货/退货详情页面 -->
<template>
	<view class="">
		<view class="step" >
			<view class="line"></view>
			<view class="step_con" v-for="(item,i) in stepArr" :key="i">
				<view>
					<image :src="item.src"></image>
				</view>
				<view v-if="goodsInfo.barter_status==item.step" style="font-weight: 500;color: #212121;">
					{{item.stepName}}
				</view>
				<view v-else>
					{{item.stepName}}
				</view>
			</view>
		</view>
		<view class="msg_list" >
			<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
			<view class="msg" >
				<view class="tit" >
					<view class="">
						售后编号 {{service_order_index}}
					</view>
					<view :class="goodsInfo.barter_status == '2' ? 'word_status' : 'word_status1'">
						{{status}}
					</view>
				</view>
				<view class="con">
					<view class="img">
						<image :src="cdnUrl+goodsInfo.barter_goods_icon" mode=""></image>
					</view>
					<view class="right">
						<view class="right_msg">
							{{goodsInfo.barter_goods_name}}
						</view>
						<view class="num">
							<view class="">
								<text class="text1">￥</text>
								<text class="text2">{{goodsInfo.barter_goods_cost/100?goodsInfo.barter_goods_cost/100:'暂无'}}</text>
							</view>
							<view class="count">
								<text class="text4">×</text>{{goodsInfo.barter_goods_count?goodsInfo.barter_goods_count:'暂无'}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="goodsInfo.refund_status == 2">
			<view style="padding: 0 30rpx;">
				<view class="content">
					<view style="color: #D50D0D;">拒绝原因：{{goodsInfo.barter_refuse_reason}}</view>
				</view> 
			</view>
		</view>
		
		<view v-if="goodsInfo.barter_status == 3">
			<view style="width:100%;height:20rpx;background:rgba(245,245,245,1);"></view>
			<view class="refund" @click="getExpress">
				<view class="">选择快递公司</view>
				<view class="refund_title">{{ express }}</view>
				<image src="../../static/back.png" mode=""></image>
			</view>
		
			<view class="refund">
				<view class="">快递单号</view>
				<input type="text" value="" placeholder="请输入快递单号" @input="getContent" style="text-align: right;" />
			</view>
		
			<view style="width:100%;height:20rpx;background:rgba(245,245,245,1);"></view>
			<view class="addressMsg">
				<view class="title">收货人信息</view>
				<view class="name">
					<view class="">{{ goodsInfo.return_address.contact }}</view>
					<view class="">{{ goodsInfo.return_address.tel }}</view>
				</view>
				<view class="address">{{ goodsInfo.return_address.address }}</view>
			</view>
		
			<view class="sumbit" @click="sumbit">提交申请</view>
		</view>
		<view v-if="goodsInfo.barter_status == 6" style="display:flex;margin: 30rpx;">
			<view class="" style="font-size: 26rpx;font-weight: blod;color: #333;">
				提示：
			</view>
			<view class="" style="flex:1;font-size: 26rpx;font-weight: blod;color: #333;">
				商家已通过审核，请等待商家联系您（或您联系商家）进行后续换货流程
			</view>
		</view>
		<view v-if="goodsInfo.barter_status == 2">
			<view style="padding: 0 30rpx;">
				<view class="content">
					<view style="color: #D50D0D;">拒绝原因：{{goodsInfo.barter_refuse_reason}}</view>
				</view> 
			</view>
			<view class="again" @click="again">
				再次申请
			</view>
		</view>
		
		<view v-if="goodsInfo.barter_status == 4 || goodsInfo.barter_status == 5">
			<view style="width:100%;height:20rpx;background:rgba(245,245,245,1);"></view>
			<view style="padding: 0 30rpx;">
				<view class="content">
					<view class="">提交时间</view>
					<view class="">{{ goodsInfo.check_time }}</view>
				</view>
				<view class="content">
					<view class="">申请时间</view>
					<view class="">{{ goodsInfo.barter_time }}</view>
				</view>
			</view>
			
		</view>
		
		<view v-if="goodsInfo.barter_status == 7">
			<view style="width:100%;height:20rpx;background:rgba(245,245,245,1);"></view>
			<view style="padding: 0 30rpx;">
				<view class="content">
					<view class="">提交时间</view>
					<view class="">{{ goodsInfo.check_time }}</view>
				</view>
				<view class="content">
					<view class="">申请时间</view>
					<view class="">{{ goodsInfo.barter_time }}</view>
				</view>
				<view class="content">
					<view class="">订单完成时间</view>
					<view class="">{{ goodsInfo.barter_time }}</view>
				</view>
			</view>
		</view>
		
		<view class="btns" v-if="goodsInfo.barter_status == 6">
			<!-- 提示：商家已通过审核，请等待商家联系您（或您联系商家）进行后续换货流程 -->
			<view class="sure" @click="confirm(goodsInfo.service_order_index)">
				确认收货
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				cdnUrl:'',
				service_order_index:'',
				goodsInfo:{},
				status: '',
				showExpress: false,
				expressList: [],
				express: '',
				express_com: '',
				express_num: '',
				stepArr:[]
			}
		},
		methods:{
			init(){
				let self = this;
				this.request({
					url: 'ugo/api/app.php?c=barterOrderInfo',//换货详情接口
					data: {
						token: uni.getStorageSync('token'),
						service_order_index:self.service_order_index,
						device:''
					},
				}).then(res=>{
						if(res.data.success){
							self.goodsInfo=res.data.data
							self.goodsInfo.check_time=self.holo.formatTime(self.goodsInfo.check_time*1000)
							self.goodsInfo.barter_time=self.holo.formatTime(self.goodsInfo.barter_time*1000)
							// for(var i = 0; i< self.goodsInfo.stepArr.length;i++){
							// 	if((i+1)==self.goodsInfo.step){
							// 		self.status=self.goodsInfo.stepArr[i].stepName
							// 	}
							// 	if(self.goodsInfo.refund_status!='2' && (i+1)<=self.goodsInfo.step){
							// 		self.goodsInfo.stepArr[i].src='../../static/sure(2).png'
							// 	}else{
							// 		self.goodsInfo.stepArr[i].src="../../static/grid.png"
							// 	}
							// }
							// if(self.goodsInfo.barter_status=='2'){
							// 	self.goodsInfo.stepArr[0].src="../../static/sure(2).png"
							// 	self.goodsInfo.stepArr[1].src="../../static/refuse.png"
							// }
							if(self.goodsInfo.barter_status==1){
								self.stepArr=[{
										"step": 1,
										"src":"../../static/sure(2).png",
										"stepName": "审核中"
									},
									{
										"step": 2,
										"src":"../../static/grid.png",
										"stepName": "审核结果"
									},
									
									{
										"step": 3,
										"src":"../../static/grid.png",
										"stepName": "已完成"
									}
								]
							}
							if(self.goodsInfo.barter_status==2){
								self.stepArr=[{
										"step": 1,
										"src":"../../static/sure(2).png",
										"stepName": "审核中"
									},
									{
										"step": 2,
										"src":"../../static/refuse.png",
										"stepName": "审核拒绝"
									},
									
									{
										"step": 3,
										"src":"../../static/grid.png",
										"stepName": "已完成"
									}
								]
							}
							if(self.goodsInfo.barter_status==6){
								self.stepArr=[{
										"step": 1,
										"src":"../../static/sure(2).png",
										"stepName": "审核中"
									},
									{
										"step": 2,
										"src":"../../static/sure(2).png",
										"stepName": "审核通过"
									},
									
									{
										"step": 3,
										"src":"../../static/grid.png",
										"stepName": "已完成"
									}
								]
							}
							if(self.goodsInfo.barter_status==7){
								self.stepArr=[{
										"step": 1,
										"src":"../../static/sure(2).png",
										"stepName": "审核中"
									},
									{
										"step": 2,
										"src":"../../static/sure(2).png",
										"stepName": "审核通过"
									},
									
									{
										"step": 3,
										"src":"../../static/sure(2).png",
										"stepName": "已完成"
									}
								]
							}
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
			again(){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=reCreateServiceOrder',//拒绝后再次申请售后
					data: {
						token: uni.getStorageSync('token'),
						service_order_index:self.service_order_index,
						service_type:'2',
						device:''
					},
				}).then(res=>{
						if(res.data.success){
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:'-1'
								})
							},500)
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
			//获取快递公司
			getExpress() {
				this.showExpress = !this.showExpress;
				if (this.showExpress) {
					let self = this;
					self.request({
						url: 'ugo/api/app.php?c=expressList',//发货快递列表
						data: {
							token: uni.getStorageSync('token')
						},
					}).then(res=>{
						for (var i = 0; i < res.data.data.length; i++) {
							res.data.data[i].flag = false;
						}
						self.expressList = res.data.data;
					},rej=>{
						console.log(rej);
					})
				}
			},
			close() {
				this.showExpress = false;
			},
			//获取选择的快递公司
			getCode(e) {
				for (var i = 0; i < this.expressList.length; i++) {
					if (e == this.expressList[i].value) {
						this.expressList[i].flag = true;
						this.express_com = this.expressList[i].value;
						this.express = this.expressList[i].text;
					} else {
						this.expressList[i].flag = false;
					}
				}
			},
			//快递单号
			getContent(e) {
				this.express_num = e.detail.value;
			},
			//提交
			sumbit() {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=setExpress',//填写物流单号
					data: {
						token: uni.getStorageSync('token'),
						service_order_index: self.service_order_index,
						type: '2',
						express_com: self.express_com,
						express_num: self.express_num,
						device: ''
					},
				}).then(res=>{
						if (res.data.success) {
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
							self.init()
						} else {
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						console.log(rej);
				})
			},
			confirm(order_index){
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=confirmBarterOrder',//换修货用户确认收货
					data: {
						token: uni.getStorageSync('token'),
						service_order_index:order_index,
						device:''
					},
				}).then(res=>{
						if(res.data.success){
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
							self.page=0
							self.init()
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
			look(e){
				uni.navigateTo({
					url:'./logistics1?order_index='+e //查看物流
				})
			}
		},
		onShow(){
			this.init()
			this.cdnUrl=this.$cdnUrl
		},
		onLoad(option){
			this.service_order_index=option.service_order_index
		}
		
	}
</script>

<style lang="scss">
	.step{
		padding: 30rpx;
		display: flex;
		justify-content: space-around;
		position: relative;
		.line{
			position: absolute;
			width: 70%;
			height: 2rpx;
			background-color: #f5f5f5;
			top: 50rpx;
			left: 15%;
			z-index: -1;
		}
		.step_con{
			width: 120rpx;
			text-align: center;
			font-size: 26rpx;
			font-family: Hiragino Sans GB;
			font-weight: normal;
			color: #999999;
			image{
				width: 38rpx;
				height: 38rpx;
				margin-bottom: 20rpx;
			}
		}
	}
	.tab{
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 30rpx;
		view{
			width: 50%;
			text-align: center;
			text{
				display: inline-block;
			}
		}
		.current{
			border-bottom: 4rpx solid #05B781;
			color: #05B781;
		}
	}
	.none{
		margin: 200rpx;
		text-align: center;
	}
	.msg{
		margin: 15rpx 0;
		background-color: #fff;
		padding: 20rpx 0;
		border-radius:10rpx;
		.tit{
			padding: 0 30rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			display: flex;
			justify-content: space-between;
			.word_status{
				color: #EF1D22;
			}
			.word_status1{
				color:rgba(37,173,109,1);
			}
		}
		.con{
			margin-top: 30rpx;
			height: 160rpx;
			padding: 20rpx 30rpx;
			display: flex;
			border-top: 1rpx solid #f5f5f5;
			.img{
				margin-right: 20rpx;
				image{
					width: 160rpx;
					height: 160rpx;
				}
			}
			.right{
				padding-top: 10rpx;
				flex: 1;
				.right_msg{
					height: 80rpx;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					line-height: 40rpx;
				}
				.num{
					margin-top: 20rpx;
					font-family:PingFang SC;
					color:rgba(153,153,153,1);
					display: flex;
					justify-content: space-between;
					.text1{
						font-size:22rpx;
						color:rgba(255,54,54,1);
					}
					.text2{
						font-size:30rpx;
						color:rgba(255,54,54,1);
					}
					.count{
						font-size: 30rpx;
						color: #999;
						.text4{
							font: 22rpx;
						}
					}
				}
			}
		}
		.btn{
			display: flex;
			border-top: 1rpx solid #f5f5f5;
			padding: 20rpx 30rpx 0;
			.cancle_btn{
				width:135rpx;
				height:50rpx;
				line-height: 50rpx;
				text-align: center;
				border-radius:25rpx;
				margin-left: auto;
				background:rgba(255,255,255,1);
				border:1px solid #05B781;
				color:#05B781;
			}
		}
	}
	
	.refund {
		padding: 30rpx;
		position: relative;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		.refund_title {
			margin-right: 50rpx;
		}
		image {
			position: absolute;
			right: 30rpx;
			top: 34rpx;
			width: 17rpx;
			height: 32rpx;
		}
	}
	.reason {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 1rpx solid #f5f5f5;
		border-radius: 50rpx 50rpx 0 0;
		background-color: #fff;
		z-index: 222;
		max-height: 700rpx;
		overflow-y: auto;
		padding-bottom: 90rpx;
		.refund {
			padding: 30rpx;
			position: relative;
			.refund_title {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			image {
				position: absolute;
				right: 30rpx;
				top: 40rpx;
				width: 32rpx;
				height: 32rpx;
			}
		}
		.close {
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			background-color: #f5f5f5;
			position: fixed;
			right: 0;
			bottom: 0;
			width: 100%;
		}
	}
	.addressMsg {
		padding: 20rpx 30rpx;
		.title {
			font-size: 26rpx;
			font-family: FZLanTingHei-EB-GBK;
			font-weight: 600;
			color: #212121;
		}
		.name {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #212121;
			margin: 30rpx 0;
		}
		.address {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #212121;
		}
	}
	.sumbit {
		width: 590rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background: #008963;
		border-radius: 45rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #ffffff;
		position: fixed;
		bottom: 20rpx;
		left: 80rpx;
	}
	.content{
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #212121;
		height: 90rpx;
		line-height: 90rpx;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.btns{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50rpx;
		padding: 20rpx 0;
		background-color: #fff;
		display: flex;
		justify-content : flex-end;
		view{
			width: 135rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			border-radius: 24rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
		}
		.look{
			border: 1rpx solid #05B781;
			border:1px solid #05B781;
			color: #05B781;
		}
		.sure{
			background: #05B781;
			color: #fff;
			margin: 0 30rpx;
		}
	}
	.again{
		width: 180rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 26rpx;
		color: #fff;
		background: #25AE6D;
		border-radius: 35rpx;
		margin-top: 30rpx;
		margin-right: 30rpx;
		margin-left: auto;
	}
</style>
