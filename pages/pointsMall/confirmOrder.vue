<!-- 兑换商品——确认订单 -->
<template>
	<view class="">
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<view v-if="showAddress" class="address" @click="goAddress">
			<view class="img">
				<image src="../../static/address1.png" mode=""></image>
			</view>
			<view class="right" style="width: 500rpx;">
				<view class="right_msg">
					{{addressInfo.contacts}}
					<text>{{addressInfo.phone}}</text>
				</view>
				<view class="address_msg">{{addressInfo.full_address}}</view>
			</view>
			<view>
				<image src="../../static/back.png" mode="" style="width: 17rpx;height: 32rpx;margin-left: 60rpx;"></image>
			</view>
		</view>
		<view v-else class="noAddress" @click="goAddress" style="font-size: 26rpx;background-color: #FFFFFF;">
			您暂时还没有收货地址,去设置地址
		</view>
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<view class="msg">
			<view class="con">
				<view class="img">
					<image :src="cdnUrl+goods_info.goods_icon" mode=""></image>
				</view>
				<view class="right">
					<view class="right_msg">{{goods_info.goods_name}}</view>
					<view class="norms">{{goods_info.sku_name?goods_info.sku_name:'无'}}</view>
					<view class="num">
						<view class="" v-if='goods_info.goods_type==0'>
							<text class="text1">￥</text>
							<text class="text2" >{{goods_info.sku_score_price?$returnFloat(goods_info.sku_score_price):'暂无'}}</text>
						</view>
						<view class="" v-if='goods_info.goods_type==1'>
							<!-- <text class="text1"></text> -->
							<text class="text2" >
								{{goods_info.sku_score_price!='0'?'￥'+$returnFloat(goods_info.sku_score_price)+'+':''}}{{goods_info.sku_integral_price?$returnFloat(goods_info.sku_integral_price):''}}积分
							</text>
						</view>
						<view class="count">
							<text class="text4">×</text>
							{{goods_count?goods_count:'暂无'}}
						</view>
					</view>
				</view>
			</view>

			<!-- </view> -->
			<view class="remark">
				<textarea value="" placeholder="给商家留言（选填）" @input="getContent" />
				</view>
		</view>
		<view style="background-color: #F5F5F5;width: 100%;height: 20rpx;"></view>
		<view class="base_msg">
			<view class="msg_con">
				<view class="">商品总价</view>
				<view class="">￥{{goods_info.order_goods_price/100?goods_info.order_goods_price/100:'0'}}</view>
			</view>
			<view class="msg_con" v-if="goods_info.goods_type==1">
				<view class="">积分</view>
				<view class="">{{goods_info.total_score!=0?goods_info.total_score/100:'0'}}积分</view>
			</view>
			<view class="msg_con">
				<view class="">配送费</view>
				<view class="">￥{{$returnFloat(freight)}}</view>
			</view>
			<view class="msg_con">
				<view class="total">订单总价</view>
				<view class="price" v-if="goods_info.goods_type==0">
					<text v-if="goods_info.order_total_price!=0">{{freight!=0?'￥'+(goods_info.order_total_price/100+freight/100):'￥'+goods_info.order_total_price/100}}</text>
					<text v-else> {{freight!=0?'￥'+freight/100:''}}</text>
				</view>
				<view class="price" v-if="goods_info.goods_type==1">
					<text v-if="goods_info.order_total_price!=0">{{freight!=0?'￥'+(goods_info.order_total_price/100+freight/100):'￥'+goods_info.order_total_price/100}}{{goods_info.sku_integral_price!=0?'+'+goods_info.total_score/100+'积分':''}}</text>
					<text v-else>
					{{freight!=0?'￥'+freight/100:''}}{{freight!=0&&goods_info.sku_integral_price!=0?'+':''}}{{goods_info.sku_integral_price!=0?goods_info.total_score/100+'积分':''}}
					</text>
			</view>
		</view>
		<view class="sumbit_bgc">
			<view class="money">
				应付金额：
				<text v-if="goods_info.goods_type==0">	
					<text v-if="goods_info.order_total_price!=0">{{freight!=0?'￥'+(goods_info.order_total_price/100+freight/100):'￥'+goods_info.order_total_price/100}}</text>
					<text v-else> {{freight!=0?'￥'+freight/100:''}}</text>
				</text>
				<text v-if="goods_info.goods_type==1"><text v-if="goods_info.order_total_price!=0">{{freight!=0?'￥'+(goods_info.order_total_price/100+freight/100):'￥'+goods_info.order_total_price/100}}{{goods_info.sku_integral_price!=0?'+'+goods_info.total_score/100+'积分':''}}</text>
					<text v-else>
					{{freight!=0?'￥'+freight/100:''}}{{freight!=0&&goods_info.sku_integral_price!=0?'+':''}}{{goods_info.sku_integral_price!=0?goods_info.total_score/100+'积分':''}}
					</text></text>
			</view>
			<view class="sumbit" @click="sure">
				提交订单
			</view>
		</view>
	</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			freight:"0",//运费
			goods_type:"",//商品价格分类
			cdnUrl:'',//图片解析地址
			sku_index:'',//规格id
			goods_count:'',//数量
			goods_info:{},//订单全部信息
			addressInfo:{},//地址信息
			showAddress:false,
			address_id:'',//收获地址id
			order_remark:'',//订单备注
			express_price:'',//配送费
			total_money:'',//订单总价
			total_price:'',//商品总价
			master_id:'',
			payInfo:{},//提交订单返回的结果
			cart_index:'',//购物车提交订单时cart_index
			showOrderStatus:false,
			skill_goods_id:'',
			order_index:'',//查询订单支付结果
			price:'',
			flag:false,
			nexrPagePrice:"",//该订单所需金额
			nexrPageScore:"",//该订单所需积分
		}
	},
	methods:{
		// 获取运费
		getFreight(){
			let self =this 
			self.request({
				url:"ugo/api/app.php?c=goods/cartExpressV3",
				data:{
					goods_index:self.master_id,
					goods_count:self.goods_count,
					address_id:self.address_id
				}
			}).then(res => {
				console.log(res)
			        if (res.data.success) {
			        self.freight=res.data.data.express_price
			        } else {
			                uni.showToast({
			                title: res.message,
			                icon: 'none'
			                })
			        }
			})
		},
		//获取地址
		getAddress(){
			let self = this
			self.request({
				url:"ugo/api/app.php?c=personal/user_address_list",
			}).then(res=>{
				if(res.data.data.list.length!=0){
					for(let i = 0; i < res.data.data.list.length;i++){
						if(res.data.data.list[i].default_address=='1'){
							self.showAddress=true
							self.addressInfo=res.data.data.list[i]
							self.address_id = res.data.data.list[i].address_id
						}
					}
					this.getFreight()
				}else{
					self.showAddress=false
					self.addressInfo={}
					self.address_id = ''
				}
			}) 
		},
		// 到地址管理界面
		goAddress(){
			uni.navigateTo({
				url:'../my/site'
			})
		},
		//获取拼团提交的订单信息
		init(){ 
			let self=this
			self.request({
				url:'ugo/api/app.php?c=score/getOrderInfo',
				data:{
					goods_index:self.master_id,
					sku_index:self.sku_index,
					goods_count:self.goods_count
				},
			}).then(res=>{
				if(res.data.success){
					self.goods_info=res.data.data;
				}
			})
		},
		//提交订单
		sure(){
			let self =this
			if(this.address_id==''){
				uni.showToast({
					icon:'none',
					title:'还未添加收货地址'
				})
				return
			}
			// if(this.address_id==''){
			// 	uni.showToast({
			// 		icon:'none',
			// 		title:'还未添加收货地址'
			// 	})
			// 	return
			// }
			// if(this.address_id==''){
			// 	uni.showToast({
			// 		icon:'none',
			// 		title:'还未添加收货地址'
			// 	})
			// 	return
			// }
			self.request({
				url:"ugo/api/app.php?c=scoreSubmitOrder",
				data:{
					goods_index:self.master_id,
					sku_index:self.sku_index,
					order_remark:self.order_remark,
					goods_count:self.goods_count,
					user_address_id:self.address_id,
					express_price:self.freight
				}
			}).then(res => {
			        if (res.data.success) {
						self.nexrPagePrice=res.data.data.order_total_price
						self.nexrPageScore=res.data.data.order_total_score
						// return
						uni.redirectTo({
							url:'payOrder?price='+self.nexrPagePrice+'&order_total_score='+self.nexrPageScore+'&order_index='+res.data.data.order_index
						})
			        } else {
			                uni.showToast({
			                title: res.data.message,
			                icon: 'none'
			                })
			        }
			})
			
		},
		//获取系统的时间
		getSystemDate(){
			console.log(new Date())
		},
		// 获得textarea（备注）的值
		getContent(e){
			this.order_remark = e.detail.value
		}
	},
	onShow(){
		if(uni.getStorageSync('addressList')){
			this.addressInfo=uni.getStorageSync('addressList')
			this.address_id=this.addressInfo.address_id
			this.showAddress=true
		}else{
			this.getAddress()
		}
	},
	// 监听页面被隐藏
	onHide(){
		uni.removeStorageSync('addressList')
	},
	// 监听页面被卸载
	onUnload(){
		uni.removeStorageSync('addressList')
	},
	onLoad(option){
		this.cdnUrl=this.$cdnUrl
		this.master_id = option.goods_index
		this.sku_index = option.sku_index
		this.goods_count = option.goods_count
		this.showOrderStatus=true
		this.init()
	}
};
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.noAddress{
		padding: 30rpx;
	}
.address {
	background-color: #FFFFFF;
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1rpx solid #f5f5f5;
	.img {
		margin-right: 20rpx;
		image {
			width: 58rpx;
			height: 58rpx;
		}
	}
	.right {
		// flex: 1;
		// position: relative;
		.right_msg {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			text {
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);
				margin-left: 10rpx;
			}
		}
		.address_msg {
			font-size: 26rpx;
			font-weight: 400;
			margin-top: 10rpx;
		}
		image {
			width: 18rpx;
			height: 32rpx;
			position: absolute;
			top: 20rpx;
			right: 30rpx;
		}
	}
}

.order_status{
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	height: 90rpx;
	background: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.status{
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		image{
			width: 44rpx;
			height: 44rpx;
			vertical-align: middle;
			margin-right: 20rpx;
		}
	}
	.pt{
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.time{
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FD4950;
		image{
			width: 17rpx;
			height: 32rpx;
			vertical-align: middle;
			margin-left: 20rpx;
		}
		.txt{
			color: #999;
		}
	}
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
			image{
				width: 37rpx;
				height: 33rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
		}
		.con{
			height: 160rpx;
			padding: 20rpx 30rpx;
			display: flex;
			flex-wrap: wrap;
			.img{
				margin-right: 20rpx;
				image{
					width: 160rpx;
					height: 160rpx;
				}
			}
			.right{
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
				.norms{
					display: inline-block;
					padding: 10rpx;
					background:rgba(245,245,245,1);
					border-radius:4rpx;
					color:rgba(153,153,153,1);
					font-size:24rpx;
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
		.remark{
			box-sizing: border-box;
			height: 150rpx;
			background-color: #f5f5f5;
			margin: 80rpx 30rpx 0rpx 30rpx;
			padding: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			border-radius: 10rpx;
			textarea{
				font-size: 26rpx;
				width: 100%!important; 
				height: 100%!important;
			}
		}
	}
	.base_msg{
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;
		// padding-bottom: 170rpx;
		.msg_con{
			display: flex;
			justify-content: space-between;
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
			margin-top: 30rpx;
			.total{
				color: #333;
			}
			.price{
				color:#FF3F3F;
			}
		}
		.msg_con:first-child{
			margin-top: 0;
		}
	}
	.sumbit_bgc{
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 100rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 2rpx solid #f5f5f5;
		.money{
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			text{
				color: #FC4950;
			}
		}
		.sumbit{
			width: 180rpx;
			height: 70rpx;
			background: #FC4950;
			border-radius: 35rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			border-radius: 45rpx;
			margin-left: 20rpx;
		}
	}
	.common{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.5);
		z-index: 22222;
		.common_con{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height:650rpx;
			background:rgba(255,255,255,1);
			border-radius:30rpx 30rpx 0px 0px;
			.close{
				position: absolute;
				right: 30rpx;
				top: 30rpx;
				color: #999999;
			}
			.common_tit{
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				border-bottom: 2rpx solid #f5f5f5;
			}
			.intro{
				display: flex;
				height: 530rpx;
				.classify_left{
				  width: 140rpx;
				  height: 100%;
				  background-color: #f5f5f5;
				  .style{
				    height: 90rpx!important;
				    line-height: 90rpx;
				    text-align: center;
				    font-size:26rpx;
				    color: #333;
				    background-color: #fff;
				  }
				  .style1{
				    height: 90rpx!important;
				    line-height: 90rpx;
				    text-align: center;
				    font-size:26rpx;
				    color: #333;
				  }
				}
				.classify_right{
					flex: 1;
					box-sizing: border-box;
					.con{
						padding: 0 30rpx;
						display: flex;
						justify-content: space-between;
						height: 90rpx;
						line-height: 90rpx;
						border-bottom: 2rpx solid #f5f5f5;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						.time1{
							color: #FD4950;
						}
					}
				}
			}
		}
	}
	
</style>
