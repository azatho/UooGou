<template>
	<view style="">
		<view class="detail_status" >
			<!-- {{order_index==1?'待成团（预计拼团成功后24小时内发货）':order_index==3?'待收货':order_index==2?'待发货（预计拼团成功后24小时内发货）':order_index==4?'已完成':'拼团失败'}} -->
			{{orderInfo.tuan_status==1?'待成团（预计拼团成功后24小时内发货）':orderInfo.tuan_status==2&&orderInfo.order_status==5?'待收货':orderInfo.tuan_status==2&&orderInfo.order_status==2?'待发货（预计拼团成功后24小时内发货）':orderInfo.tuan_status==2&&orderInfo.order_status==6?'已完成':orderInfo.tuan_status==4?'退款成功':'拼团失败'}}
		</view>
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		
		<view class="address">
			<view class="img">
				<image src="../../static/address1.png" mode=""></image>
			</view>
			<view class="right">
				<view class="right_msg">
					{{orderInfo.join_contacts}}
					<text>{{orderInfo.join_phone}}</text>
				</view>
				<view class="address_msg">
					{{orderInfo.join_address}}</view>
			</view>
		</view>
		
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		
		<view class="order_status">
			<view class="status">
				<image src="/static/persons.png" mode=""></image>
				订单状态
			</view>
			<view class="pt" v-if="orderInfo.tuan_status!=4||orderInfo.tuan_status!=3">
				{{orderInfo.tuan_status==1?'正在拼团':orderInfo.tuan_status==2?'拼团成功':''}}
			</view>
			<view class="pt1" v-if="orderInfo.tuan_status==3">
				拼团失败，已退款
			</view>
			<view class="pt1" v-if="orderInfo.tuan_status==4">
				退款成功
			</view>
			<view class="pt1" v-if="orderInfo.tuan_status==5">
				拼团失败
			</view>
		</view>
		
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<view class="msg_list">
			<view class="msg" >
				<view class="tit" @click="goShop(orderInfo)">
					<image src="../../static/case.png" mode="" class="image1"></image>
					{{orderInfo.sup_name}}
					<image src="../../static/back1.png" class="image2" mode=""></image>
				</view>
					<view class="con" @click="againbuy(orderInfo.group_master_id,orderInfo.group_is_del)">
						<view class="img">
							<image :src="cdnUrl+orderInfo.goods_icon" mode=""></image>
						</view>
						<view class="right">
							<view class="right_msg">
								<text  style="padding: 5rpx;color:#fff;background: #fd484f;margin:0 5rpx;">拼团</text>{{orderInfo.goods_name}}
							</view>
							<view class="num">
								<view style="">
									<text class="text1">￥</text>
									<text class="text2">{{orderInfo.group_goods_price/100}}</text>
									<text style="font-size: 20rpx;text-decoration:line-through;margin-left: 15rpx;">￥{{orderInfo.goods_cost/100}}</text>
								</view>
								<view class="afterSale" @click.stop="goAfterSale(orderInfo.id,orderInfo)" v-if="orderInfo.order_status==5">
									申请售后
								</view>
							</view>
						</view>
						<view class="count">
							<text class="text4">×</text>{{orderInfo.goods_num}}
						</view>
					</view>
					
					
					<!-- <view class="con_btns" >
						<view class="cancle_order" @click="goAfterSale()">
							申请售后
						</view>
					</view> -->
				<!-- </view> -->
				<view class="images">
					<block class="" v-for="(item,i) in orderInfo.photo" :key="item">
						<image :src="cdnUrl+item.photo" mode="" v-if="i<3"></image>
					</block>
					<image src="../../static/question.png" v-if="orderInfo.tuan_status==1||orderInfo.tuan_status==3"></image>
					<image src="../../static/dian.png" v-if="orderInfo.photo.length>3 && orderInfo.tuan_status==2&&orderInfo.order_status==2 || orderInfo.tuan_status==2&&orderInfo.order_status==5 || orderInfo.tuan_status==2&&orderInfo.order_status==6" class="dian"></image>
				</view>
				<view class="base_msg">
					<view class="msg_con">
						<view class="">商品总价</view>
						<view class="">￥{{orderInfo.group_goods_price/100}}</view>
					</view>
					<view class="msg_con" v-if="orderInfo.express_price!=0">
						<view class="">配送费</view>
						<view class="">￥{{orderInfo.express_price/100}}</view>
					</view>
					<view class="msg_con">
						<view class="total">订单总价</view>
						<view class="price">￥{{orderInfo.total_price/100}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		
		<view class="remark">
			<view class="remark_tit">
				<text class="line"></text>备注
			</view>
			<view class="remark_con">
				{{orderInfo.remark||'暂无'}}
			</view>
		</view>
		
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<view class="order_msg">
			<view class="order_msg_tit">
				<text class="line"></text>订单信息
			</view>
			<view class="order_msg_list" style="position: relative;">
				<text>订单编号：</text>{{orderInfo.join_order_id}}
				<view class="copy_order" @click="copy(orderInfo.join_order_id)">复制</view>
			</view>
			<view class="order_msg_list">
				<text>下单时间：</text>{{orderInfo.join_time}}
			</view>
			<view class="order_msg_list">
				<text>支付时间：</text>{{orderInfo.pay_time}}
			</view>
			<view class="order_msg_list" v-if="orderInfo.tuan_status==2">
				<text>拼团成功：</text>{{orderInfo.pay_time}}
			</view>
			<view class="order_msg_list" v-if="orderInfo.tuan_status==2&&orderInfo.order_status==5 || orderInfo.tuan_status==2&&orderInfo.order_status==6">
				<text>发货时间：</text>{{orderInfo.join_time}}
			</view>
			<view class="order_msg_list" v-if="orderInfo.tuan_status==4">
				<text>退款时间：</text>{{orderInfo.join_time}}
			</view>
		</view>
		<view style="background-color: #f5f5f5;width: 100%;height: 30rpx;margin-bottom: 100rpx;"></view>
		<view class="order_bottom">
			<view class="btns">
				<view class="btn2" v-if="orderInfo.tuan_status==1" @click="share(orderInfo.group_tuan_id)">
					分享
				</view>
				<view class="btn2" v-if="orderInfo.tuan_status==1" @click="againbuy(orderInfo.group_master_id,orderInfo.group_is_del)">
					再次购买
				</view>
				<view class="btn2" v-if="orderInfo.tuan_status==2&&orderInfo.order_status==2" @click="goRefund(orderInfo.order_index)">
					申请退款
				</view>
				<view class="btn2" v-if="orderInfo.tuan_status==2&&orderInfo.order_status==5" @click="getbuy(orderInfo.order_index)">
					确认收货
				</view>
				<view class="btn2" v-if="orderInfo.tuan_status==2&&orderInfo.order_status==6" @click="getpulber(orderInfo.order_index)">
					去评价
				</view>
			</view>
		</view>
		
		<view class="shareModel" v-if="showShare" @click="showShare=false">
			<view class="model">
				<image src="../../static/share2.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		jweixin
	} from '../../until/jweixin.js'
	export default{
		data(){
			return{
				order_index:'1',//订单自增编号
				cdnUrl:'',
				orderInfo:{},
				showShare:false
			}
		},
		methods:{
			init(){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=groupOrderInfo',
					data: {
						id:self.order_index
					},
				}).then(res=>{
					if(res.data.success){
						self.orderInfo=res.data.data
						self.orderInfo.join_time=self.holo.formatTime(self.orderInfo.join_time*1000)//下单时间
						self.orderInfo.pay_time=self.holo.formatTime(self.orderInfo.pay_time*1000)//支付时间
						// self.orderInfo.group_success_time=self.holo.formatTime(self.orderInfo.group_success_time*1000)//成团时间
						self.orderInfo.group_success_time=self.holo.formatTime(self.orderInfo.group_success_time*1000)//拼团成功时间
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 复制
			copy(id){
				let self=this
				uni.setClipboardData({
					data:id, 
					success:function(data){
						uni.getClipboardData({
							success:function(data){
								self.holo.toast({
									icon:'none',
									title:'复制成功~'
								})
							},
							fail:function(err){},
							complete:function(res){} 
						})
					}, 
					fail:function(err){}, 
					complete:function(res){} 
				})
			},
			//去店铺主页
			goShop(e){
				if(this.supplier!=3){
					uni.navigateTo({
						url:'../common/shopHome?id='+e.supplier_id
					})
				}else{
					uni.navigateTo({
						url:'../my/NoShop'
					})
				}
			},
			goDetail(e,status){
				if(status==3){
					uni.navigateTo({
						url:'../my/Nocommunity'
					})
				}else{
					uni.navigateTo({
						url:'../common/goodsDetail?id='+e
					})
				}
				
			},
			goComment(item,id){
				// id订单编号
				uni.navigateTo({
					url:'./publishComment?goods_index='+item.order_goods_index+'&order_index='+id+'&goods_icon='+item.goods_icon+'&goods_name='+item.goods_name
				})
			},
			// 申请退换货
			goAfterSale(id,e){
				// e.id 订单商品自增编号
				// e.goods_count个数
				// e.goods_norms种类
				// e.goods_cost价格
				// e.ps_phone //配送员
				// e.frequent_phone //商家
				uni.navigateTo({
					url:'./afterSale?goods_index='+id+'&goods_count='+e.goods_num+'&goods_icon='+e.goods_icon+'&goods_name='+e.goods_name+'&goods_norms='+e.sku_name+'&goods_cost='+e.goods_cost+'&ps_phone='+e.ps_phone +'&frequent_phone='+e.frequent_phone
				})
			},
			// 再次购买
			againbuy(e,del){
				if(del==0){
					uni.navigateTo({
						url:'/pages/group/goodsDetail?id='+e
					})
				}else{
					uni.showToast({
						title:'此拼团活动已结束',
						icon:'none'
					})
				}
			},
			share(e){
				this.showShare=true
				let self = this
				jweixin.ready(function() {
					jweixin.onMenuShareAppMessage({
						title:'一起来拼单',
						desc: self.orderInfo.goods_name,
						link: self.$baseUrl+'loveUgo/#/pages/common/helpFriends?tuan_id='+e, // 分享链接
						imgUrl:self.$cdnUrl+self.orderInfo.goods_icon,
						success: function () { 
							self.showShare=false
						},
						fail: function (res) {
							alert(JSON.stringify(res));
							self.showShare=false
						},
						cancel: function () { 
						    // 用户取消分享后执行的回调函数
							self.showShare=false
						}
					})
				})
			},
			// 申请退款
			goRefund(e){
				let self = this;
				uni.showModal({
				    content: '确定退款吗？',
				    success: function (res) {
				        if (res.confirm) {
							self.request({
								url: 'ugo/api/app.php?c=createServiceOrderV2',
								data: {
									order_index:e
								},
							}).then(res=>{
								if(res.data.success){
									uni.showToast({
										title:res.data.msg
									})
									self.init()
								}else{
									uni.showToast({
										icon:'none',
										title:res.data.msg
									})
								}
							},rej=>{
								console.log(rej);
							})
				        } else if (res.cancel) {
				        }
				    }
				})
			},
			// 确认收货
			getbuy(e){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=order/confirmOrder',
					data: {
						token: uni.getStorageSync('token'),
						order_index:e,
					},
				}).then(res=>{
					if(res.data.success){
						uni.showToast({
							title:res.data.msg
						})
						self.init()
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 去评价
			getpulber(e){
				uni.navigateTo({
					url:'../order/publishComment?index='+e
				})
			},
			gowuliu(order_index){
				uni.navigateTo({
					url:'../order/logistics?order_index='+order_index
					
				})
			},
		},
		onShow(){
			this.cdnUrl=this.$cdnUrl
			this.init()
		},
		onLoad(option){
			this.order_index=option.index
		}
	}
</script>

<style lang="scss">
	.detail_status{
		padding: 0 30rpx;
		height:70rpx;
		line-height: 70rpx;
		background:#FC4950;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.address{
		padding: 20rpx 30rpx;
		display: flex;
		border-top: 1rpx solid #f5f5f5;
		.img{
			margin-right: 20rpx;
			image{
				width: 58rpx;
				height: 58rpx;
			}
		}
		.right{
			flex: 1;
			.right_msg{
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				text{
					font-size:24rpx;
					color:rgba(153,153,153,1);
					margin-left: 10rpx;
				}
			}
			.address_msg{
				font-size:26rpx;
				font-weight:400;
				margin-top: 10rpx;
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
		.pt1{
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FD4950;
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
			color:#333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: flex;
			align-items: center;
			.image1{
				width: 37rpx;
				height: 33rpx;
				margin-right: 20rpx;
			}
			.image2{
				width: 13rpx;
				height: 24rpx;
				margin: 0 10rpx;
			}
		}
		
		.con{
			margin-top: 30rpx;
			height: 160rpx;
			padding: 20rpx 30rpx;
			display: flex;
			border-top: 1rpx solid #f5f5f5;
			position: relative;
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
					.afterSale{
						width:135rpx;
						height:50rpx;
						line-height: 50rpx;
						text-align: center;
						border-radius:25rpx;
						display: inline-block;
						font-size: 26rpx;
						background:rgba(255,255,255,1);
						border:1px solid #FC4950;
						color:#FC4950;
					}
				}
			}
			.count{
				position: absolute;
				top: 70rpx;
				right: 30rpx;
				font-size: 30rpx;
				color: #999;
				.text4{
					font: 22rpx;
				}
			}
		}
	}
	.remark{
			// border-top: 1rpx solid #f5f5f5;
			padding: 0 30rpx;
			font-size:26rpx;
			font-family:PingFang SC;
			color:rgba(51,51,51,1);
			margin-top: 20rpx;
			.remark_tit{
				font-weight:500;
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				text{
					display: inline-block;
					margin-right: 10rpx;
					width:4rpx;
					height:30rpx;
					background:#FC4950;
				}
				.txt{
					background-color: #FFC600;
				}
			}
			.remark_con{
				color:rgba(51,51,51,1);
				margin-bottom: 30rpx;
			}
		}
		.images{
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 30rpx 0 50rpx;
			image{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-left: -10rpx;
				vertical-align: middle;
			}
			.dian{
				width: 32rpx;
				height: 6rpx;
				margin-left: 15rpx;
			}
		}
	.base_msg{
		padding: 30rpx 30rpx 0;
		.msg_con{
			display: flex;
			justify-content: space-between;
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
			margin-top: 10rpx;
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

	.order_msg{
		padding: 0 30rpx;
		.order_msg_tit{
			font-size:30rpx;
			height: 30rpx;
			line-height: 30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			margin: 30rpx 0;
			display: flex;
			align-items: center;
			text{
				display: inline-block;
				margin-right: 10rpx;
				width:4rpx;
				height:30rpx;
				background:#FC4950;
			}
			.txt{
				background-color: #FFC600;
			}
		}
		.order_msg_list{
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:#656565;
			margin-bottom: 30rpx;
			text{
				margin-right: 30rpx;
			}
			.copy_order{
				position: absolute;
				right: 30rpx;
				top: 0;
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:400;
				text-decoration:underline;
				color:#FC4950;
			}
		}
	}
	.order_bottom{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding: 10rpx 0;
		background-color: #fff;
		text-align: right;
		.btns{
			padding: 0 30rpx;
			view{
				width:135rpx;
				height:50rpx;
				line-height: 50rpx;
				text-align: center;
				border-radius:25rpx;
				display: inline-block;
				margin-left: 30rpx;
				font-size: 26rpx;
			}
			.btn1{
				background: #FFFFFF;
				border: 1px solid #FC4950;
				color: #FC4950;
			}
			.btn2{
				background: #FC4950;
				color: #fff;
			}
		}
	}

</style>
