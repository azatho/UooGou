<template>
	<view class="ptorder">
<!-- 		<view class="topTitle">
			拼团列表
		</view> -->
			<view class="tabs">
				<block v-for="(item,i) in tabs" :key="i">
					<view :class="[i==currentTab?'txt':'']" @click="getTab(i)">
						{{item.name}}
						<view class="line" v-if="i==currentTab"></view>
					</view>
				</block>
			</view>
			<view class="bgc" v-if="!orderList.length">
				<image src="../../static/zwsj.png" style="margin-top:200rpx"></image>
				<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">您还没有相关订单</view>
			</view>
			<view class="msg_list" v-else>
				<block v-for="(item,i) in orderList" :key ="i">
					<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
					<view class="msg" >
						<view class="tit" @click="goShop(item)">
							<view class="shopMsg">
								<image src="../../static/case.png" mode="" class="image1"></image>
								{{item.sup_name}}
								<image src="../../static/back1.png" mode="" class="image2"></image>
							</view>
							<view class="word_status1">
								{{item.order_type}}
							</view>
						</view>
						<view class="con" @click="goDetail(item.id)">
							<view class="img">
								<image :src="cdnUrl+item.goods_icon" mode=""></image>
							</view>
							<view class="right">
								<view class="right_msg">
									<text  style="padding: 5rpx;color:#fff;background: #fd484f;margin:0 5rpx;">拼团</text>{{item.goods_name}}
								</view>
								<view class="num">
									<text class="text1">￥</text>
									<text class="text2">{{item.group_goods_price/100}}</text>
									<text style="font-size: 20rpx;text-decoration:line-through;margin-left: 15rpx;">￥{{item.goods_cost/100}}</text>
								</view>
							</view>
							<view class="count">
								<text class="text4">×</text>{{item.goods_num}}
							</view>
						</view>
						<view class="total">
							共{{item.goods_num}}件商品， 实付<text>￥{{item.total_price/100}}</text>
						</view>
						<view class="btn_status">
							
							<view class="images">
								<block v-for="(items,k) in item.join_list" :key='k'>
									<image :src="cdnUrl+items.photo" mode="" v-if="k<3"></image>
								</block>
								<image src="../../static/question.png" v-if="item.tuan_status==1"></image>
								<image src="../../static/dian.png" v-if="item.join_list.length>3 && item.tuan_status==2&&item.order_status==2 || item.tuan_status==2&&item.order_status==5 || item.tuan_status==2&&item.order_status==6" class="dian"></image>
							</view>
							
							<view class="btns">
								<view class="btn1" v-if="item.tuan_status==1" @click="againbuy(item.group_master_id,item.group_is_del)">
									再次购买
								</view>
								<view class="btn2" v-if="item.tuan_status==1" @click="shear(item.tuan_id,item.goods_name,item.goods_icon)">
									分享
								</view>
								<view class="btn2" v-if="item.tuan_status==2&&item.order_status==2" @click="cancleOrder(item.order_index)">
									申请退款
								</view>
								<view class="btn1" v-if="item.tuan_status==2&&item.order_status==5" @click="consignee(item.order_index)">
									确认收货
								</view>
								<view class="btn2" v-if="item.tuan_status==2&&item.order_status==6" @click="getpulber(item.order_index)">
									去评价
								</view>
							</view>
						</view>
					</view>
				</block>
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
				tabs: [
					{name:'全部'},
					{name:'待成团'},
					{name:'待发货'},
					{name:'待收货'},
					{name:'已完成'},
				],
				tuan_status:['正在拼团','拼团成功','待发货','拼团失败','退款成功'],
				currentTab:'0',
				page:0,
				pageCount:'',
				cdnUrl:'',
				type:'0',
				orderList:[],
				user_coupon:0,
				jumpType:'',
				showShare:false
			}
		},
		methods:{
			getTab(e){
				this.currentTab=e
				this.page='0'
				this.orderList=[]
				this.init()
			},
			init(){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=group/groupOrderList',
					data: {
						token: uni.getStorageSync('token'),
						page:self.page,
						type:self.currentTab
					}
				}).then(res=>{
					if(res.data.success){
						self.pageCount=res.data.data.count
						for(var i=0;i<res.data.data.list.length;i++){
							if(res.data.data.list[i].tuan_status==1)res.data.data.list[i].order_type = '正在拼团';
							if(res.data.data.list[i].tuan_status==3)res.data.data.list[i].order_type = '拼团失败';
							if(res.data.data.list[i].tuan_status==4)res.data.data.list[i].order_type = '退款成功';
							if(res.data.data.list[i].tuan_status==2  && res.data.data.list[i].order_status==2)res.data.data.list[i].order_type = '待发货';
							if(res.data.data.list[i].tuan_status==2  && res.data.data.list[i].order_status==5)res.data.data.list[i].order_type = '待收货';
							if(res.data.data.list[i].tuan_status==2  && res.data.data.list[i].order_status==6)res.data.data.list[i].order_type = '已完成';
							if(res.data.data.list[i].tuan_status==2  && res.data.data.list[i].order_status==9)res.data.data.list[i].order_type = '退款成功';
							self.orderList.push(res.data.data.list[i])
						}
					}
				})
			},
			//去店铺主页
			goShop(e){
				uni.navigateTo({
					url:'/pages/common/shopHome?id='+e.goods_supplier
				})
			},
			onClickItem(e) {
				this.type = e.currentIndex; 
				this.page=0
				this.orderList=[]
				this.init()
			},
			//订单详情
			goDetail(e){
				console.log(e);
				uni.navigateTo({
					url:'../common/ptOrderDetail?index='+e
				})
			},
			// 按钮
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
			// 分享
			shear(e,goods_name,goods_icon){
				this.showShare=true
				let self = this
				jweixin.ready(function() {
					jweixin.onMenuShareAppMessage({
						title:'一起来拼单',
						desc: goods_name,
						link: self.$baseUrl+'loveUgo/#/pages/common/helpFriends?tuan_id='+e, // 分享链接
						imgUrl:self.$cdnUrl+goods_icon,
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
			// 确认收货
			consignee(e){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=order/confirmOrder',
					data: {
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
			//取消订单
			cancleOrder(order_index){
				let self = this;
				uni.showModal({
				    content: "确定退款吗",
				    success: function (res) {
				        if (res.confirm) {
							self.request({
								url: 'ugo/api/app.php?c=createServiceOrderV2',
								data: {
									order_index:order_index
								}
							}).then(res=>{
									if(res.data.success){
										uni.showToast({
											title:res.data.msg
										})
										self.page=0
										self.orderList=[]
										self.init()
									}else{
										uni.showToast({
											icon:'none',
											title:res.data.msg
										})
									}
								});
				        } else if (res.cancel) {
				        }
				    }
				})
			},
			//根据不同状态进行不同操作
			getStatus(e,item){
				let self = this;
				if(e==0){
					
				}else if(e==6){
					uni.navigateTo({
						url:'../common/orderDetail?index='+item.order_index
					})
				}else if(e==1){
					uni.navigateTo({
						url:'../common/confirmPay?order_total_price='+item.order_total_price+'&me='+item.me+'&order_type='+item.order_type+'&order_index='+item.order_index+'&user_coupon='+this.user_coupon
					})
				}else if(e==2){
					this.cancleOrder(item.order_index,e)
				}else if(e==5 || e==4){
					self.request({
						url: 'api/app.php?c=confirmOrder',
						data: {
							token: uni.getStorageSync('token'),
							order_index:item.order_index,
							device:''
						},
						success: function(res) {
							if(res.data.success){
								uni.showToast({
									title:res.data.msg
								})
								self.page=0
								self.orderList=[]
								self.init()
							}else{
								uni.showToast({
									icon:'none',
									title:res.data.msg
								})
							}
						}
					});
				}
			}
		},
		onShow(){
			this.orderList=[]
			this.page=0
			this.cdnUrl=this.$cdnUrl
			this.init()
		},
		onReachBottom(){
			if(this.page<this.pageCount-1){
				this.page++
				this.init()
			}
		},
		onLoad(option){
			if(option.type){
				this.currentTab=option.type
			}else{
				this.currentTab=0
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.ptorder{
		padding-top: 80rpx;
		height: 100%;
		box-sizing: border-box;
	}
	.bgc {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		text-align: center;
		image {
			width: 374rpx;
			height: 314rpx;
			margin-top: 100rpx;
		}
	}
	
	.tabs{
		width: 100%;
		height: 90rpx;
		position: fixed;
		top: 80rpx;
		left: 0;
		background-color: #fff;
		display: flex;
		z-index: 333;
		view{
			width: 25%;
			line-height: 90rpx;
			text-align: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			position: relative;
		}
		.line{
			width: 60rpx;
			height: 4rpx;
			background: #FC4950;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
		.txt{
			color: #FC4950;
		}
	}
	.msg_list{
		.msg{
			background-color: #fff;
			border-radius:10rpx;
			.tit{
				padding: 0 30rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-bottom: 2rpx solid #f5f5f5;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				display: flex;
				justify-content: space-between;
				.word_status{
					color: #999;
					font-size: 26rpx;
				}
				.word_status1{
					color:#FC4950;
					font-size: 26rpx;
				}
				.shopMsg{
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
						vertical-align: middle;
						margin-right: 20rpx;
					}
					.image2{
						width: 13rpx;
						height: 24rpx;
						margin: 0 10rpx;
					}
				}
				
			}
			.con{
				height: 160rpx;
				padding: 20rpx 30rpx;
				display: flex;
				position: relative;
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
						.text1{
							font-size:22rpx;
							color:rgba(255,54,54,1);
						}
						.text2{
							font-size:30rpx;
							color:rgba(255,54,54,1);
						}
					}
				}
				.count{
					font-size: 30rpx;
					color: #999;
					position: absolute;
					top: 50%;
					right: 30rpx;
					transform: translateX(-50%);
					.text4{
						font: 22rpx;
					}
				}
			}
			.total{
				text-align: right;
				padding: 0 30rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				margin-bottom: 20rpx;
				text{
					color: #333;
				}
			}
			.btn_status{
				display: flex;
				justify-content: space-between;
				border-top: 1rpx solid #f5f5f5;
				height: 80rpx;
				padding: 0 30rpx 0 50rpx;
				align-items: center;
				.images{
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
				.btns{
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
		}
	}
	
</style>
