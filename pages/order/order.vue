<!-- 订单页面 -->
<template>
	<view>
			<!-- 状态栏 -->
		<view class="tab">
			<block v-for="(item,i) in tab" :key='item.id'>
				<view :class="selectid==item.id?'txt1':''" @click="gotabbal(item.id)">
					{{item.title}}
				</view>
			</block>
		</view>
		<view style="width: 100%;height: 80rpx;"></view>
		<!-- <view class="bgc" v-if="orderList.length==0"> -->
			<view class="bgc" v-if="loading&&orderList.length==0">
			<image src="../../static/zwsj.png"></image>
			<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">您还没有相关订单</view>
		</view>
			<!-- 列表 -->
		<view v-else>
			<view class="list" v-for="(item,i) in orderList" :key ="i">
				<view class="one" @click="goshop(item.order_supplier,item.supplier_status)">
					<view class="left">
						<image src="../../static/case.png" class="image1"></image>
						{{item.supplier_name}}
						<image src="../../static/back1.png" class="image2"></image>
					</view>
					<view :class="item.order_status==0||item.order_status==6?'right':'right1'">
						{{item.order_name}}
					</view>
				</view>
				<view class="two" v-for="(items,k) in orderList[i].goods_list" :key ="k"  @click="goparticulars(item.order_index,item.statusgoods)">
					<view class="img">
						<image :src="cdnUrl+items.goods_icon" v-if="items.goods_icon"></image>
						<view v-else style="width: 100%;height: 100%;border:1px solid #f5f5f5;color:#ccc; text-align: center; line-height: 160rpx;">
							暂无图片
						</view>
					</view>
					<view class="details">
						<view class="title"> <text style="display:inline-block;background-color: red;color: #fff;padding: 0 5rpx;margin-right: 5rpx;border-radius: 5rpx;">{{item.order_type=='3'?'秒杀':''}}</text> 
							{{items.goods_name || '暂无名称'}}</view>
						<view class="xia">
							<view class="univalence">{{items.goods_cost!=0?'￥'+items.goods_cost/100:''}}{{items.goods_integral!=0&&items.goods_cost!=0?'+':''}}{{items.goods_integral!=0?items.goods_integral/100+'积分':''}}</view>
							<view class="num">×{{items.goods_count}}</view>
						</view>
					</view>
				</view>
				<view class="three">
					<view class="allClass">订单总价：{{item.order_total_price!=0?'￥'+item.order_total_price/100:''}}{{item.order_total_price!=0&&item.order_coupon!=0?'+':''}}{{item.order_coupon==0?'':item.order_coupon/100+'积分'}}</view>
					<view class="btn">
						<!-- 5种按钮状态, 三种按钮样式   goods_status-->
						<view class="btn2"  v-if="item.order_status==1"  @click="cancleOrder(item.order_index)">取消订单</view>
						<view :class="item.order_status==0 || item.order_status==9?'btn3':item.order_status==7?'btn3':'btn1'" @click="getStatus(item.order_status,item)" v-if="item.order_status!=6 && item.order_status!=3 && item.order_status!=4">
							{{item.order_status==0?'已取消':item.order_status==1?'去支付':item.order_status==2?'退款':item.order_status==7?'退款':item.order_status==9?'已取消':item.order_status==5?'确认收货':''}}
						</view>
						<view class="btn1" @click="getStatus(item.order_status,item)" v-if="item.order_status==6 && item.goods_list[0].goods_status==2">去评价</view>
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
				tab:[
					{id:'0',title:'全部'},
					{id:'1',title:'待支付'},
					{id:'2',title:'待发货'},
					{id:'3',title:'待收货'},
					{id:'4',title:'已完成'},
				],
				selectid:'0',
				page:0,
				pageCount:'',
				cdnUrl:'',
				user_coupon:0,//用户积分
				orderList:[],
				loading:false
			}
		},
		methods: {
			// tab栏切换
			gotabbal(id){
				this.selectid=id
				this.page=0,
				this.orderList=[]
				this.init()
			},
			init(){
				this.loading=false
				uni.showLoading({
					title: '加载中'
					
				});
				let self=this
				self.request({
					url:'ugo/api/app.php?c=mallOrderList',
					data:{
						page:self.page,
						type:self.selectid,
					},
				}).then(res=>{
					if(res.data.success){
						uni.hideLoading()
						this.loading=true
						self.pageCount = res.data.pageCount
						self.user_coupon = res.data.data.user_coupon
						for(var i = 0; i<res.data.data.list.length;i++){
							if(res.data.data.list[i].order_status == '0')res.data.data.list[i].order_name = '已取消';
							if(res.data.data.list[i].order_status == '1')res.data.data.list[i].order_name = '待付款';
							if(res.data.data.list[i].order_status == '2')res.data.data.list[i].order_name = '待发货';
							if(res.data.data.list[i].order_status == '5')res.data.data.list[i].order_name = '待收货';
							if(res.data.data.list[i].order_status == '6')res.data.data.list[i].order_name = '已完成';
							if(res.data.data.list[i].order_status == '7')res.data.data.list[i].order_name = '退款审核中';
							if(res.data.data.list[i].order_status == '8')res.data.data.list[i].order_name = '退款中';
							if(res.data.data.list[i].order_status == '9')res.data.data.list[i].order_name = '退款成功';
							console.log(res.data.data.list[i].order_status == '0');
							self.orderList.push(res.data.data.list[i])
						}
						console.log(self.orderList);
					}else{
						uni.hideLoading()
						this.loading=true
						if(res.data.msg=='登录状态失效，请重新登录~！'){
							uni.showModal({
								content:'未登录，请先登录',
								success:function(res) {
									if (res.confirm) {
										uni.switchTab({
											url:'/pages/my/my'
										})
									} else if (res.cancel) {
									   uni.switchTab({
										url:'/pages/index/index'
									   })
									}
								}
							})
						}
					}
				})
			},
			// 到商品所属的商店
			goshop(id,status){
				if(status!=3){
					uni.navigateTo({
						url:'../common/shopHome?id='+id
					})
				}else{
					uni.navigateTo({
						url:'../my/NoShop?id='+id
					})
				}
			},
			// 商品订单详情页面
			goparticulars(id){
				uni.navigateTo({
					url:'./particulars?index='+id
				})
			},
			// 按钮
			// 取消订单
			cancleOrder(e,order_status){
				let self=this;
				let title=''
				if(order_status){
					title='您确定退款吗'
				}else{
					title='您确定取消吗'
				}
				uni.showModal({
					content:title,
					success:function(res){
						if(res.confirm){
							self.request({
								url:'ugo/api/app.php?c=cancelOrder',
								data:{
									token: uni.getStorageSync('token'),
									order_index:e,
									app_type:'3',
								},
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
							},rej=>{
								console.log(rej);
							})
						}
					}
				})
			},
			//根据不同状态进行不同操作
			getStatus(e,item){
				let self = this;
				if(e==0){//已取消按钮==>不作操作
					
				}else if(e==6){//已完成==>评价按钮  评价页面
				// console.log(item.order_index);
					uni.navigateTo({
						url:'./publishComment?index='+item.order_index
					})
				}else if(e==1){//待支付==>取消订单和去支付按钮  支付接口
				
					uni.navigateTo({
						url:'../common/confirmPay?order_id='+item.order_id+'&order_index='+item.order_index+'&price='+item.order_total_price+'&order_total_score='+item.order_coupon+'&send_score='+item.order_send_score
					})
					// console.log('支付');
					// console.log(item.order_index);
					// console.log(item.order_total_price);
					// self.request({
					// 	url:'ugo/api/app.php?c=rechargeOrderUgo',
					// 	data:{
					// 		order_index:item.order_index,
					// 		order_money:item.order_total_price,
					// 		type:item.order_type,
					// 		order_score:item.order_coupon
					// 	}
					// }).then(res=>{
					// 	if(res.data.success){
					// 		console.log(res.data.data);
					// 		self.payInfo=res.data.data
					// 		if (typeof WeixinJSBridge == "undefined"){
					// 			if( document.addEventListener ){
					// 				document.addEventListener('WeixinJSBridgeReady', self.onBridgeReady, false);
					// 			}else if (document.attachEvent){
					// 				document.attachEvent('WeixinJSBridgeReady', self.onBridgeReady); 
					// 				document.attachEvent('onWeixinJSBridgeReady', self.onBridgeReady);
					// 			}
					// 		}else{
					// 			self.onBridgeReady(item.order_total_price);
					// 		}
					// 	}else{
					// 		console.log('失败');
					// 		self.holo.toast({
					// 			icon:'none',
					// 			title:res.data.msg
					// 		})
					// 	}
					// })
				}else if(e==2){//待发货==>退款按钮   到订单详情页面
					uni.showModal({
					    title: '提示',
					    content: '您确定要取消订单并退款吗？',
					    success: function (res) {
					        if (res.confirm) {
					            self.request({
					            	url: 'ugo/api/app.php?c=createServiceOrderV2',
					            	data: {
					            		token: uni.getStorageSync('token'),
					            		order_index:item.order_index,
					            	},
					            }).then(res=>{
					            	if(res.data.success){
					            		uni.showToast({
					            			title:res.data.msg,
					            			icon:'none'
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
					            },rej=>{
					            	console.log(rej);
					            })
					        } else if (res.cancel) {
								
					        }
					    }
					});
			
				}else if(e==5 || e==4){//已全部发货==>确认收货按钮
					self.request({
						url: 'ugo/api/app.php?c=order/confirmOrder',
						data: {
							token: uni.getStorageSync('token'),
							order_index:item.order_index,
						},
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
					},rej=>{
						console.log(rej);
					})
				}
			},
			onBridgeReady(order_total_price){
				console.log(order_total_price);
			            let self = this
			            WeixinJSBridge.invoke(
			          'getBrandWCPayRequest', {
			             "appId":self.payInfo.appId,     //公众号名称，由商户传入
			             "timeStamp":self.payInfo.timeStamp,         //时间戳，自1970年以来的秒数     
			             "nonceStr":self.payInfo.nonceStr, //随机串     
			             "package":self.payInfo.package,     
			             "signType":'MD5',         //微信签名方式：     
			             "paySign":self.payInfo.paySign //微信签名 
			          },
					function(res){
						if(res.err_msg == "get_brand_wcpay_request:ok" ){
			                    // 使用以上方式判断前端返回,微信团队郑重提示：
			            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							self.request({
							        url:'ugo/api/app.php?c=checkPayOrder',
							        data:{
							                order_index:self.orderList.order_index
							        }
							}).then(res=>{
								if(res.data.success){
									uni.navigateTo({
										url:'/pages/common/successPay?order_total_price='+order_total_price,
									})
								}
							})
						}
					});
			    },
		},
		onShow(){
			if(uni.getStorageSync('type')){
				this.selectid=uni.getStorageSync('type')
				uni.removeStorageSync('type')
			}else{
				this.selectid=0
			}
			this.cdnUrl=this.$cdnUrl
			this.orderList=[]
			this.page=0
			console.log(this.orderList.length);
			if(!this.orderList.length){
			  this.init()	
			}
		},
		onReachBottom(){
			if(this.page<this.pageCount-1){
				this.page++
				this.init()
			}
		},
		onLoad(e) {
			this.selectid=e.id
		}
	}
</script>

<style>
page {
	background-color: #F5F5F5;
	position: relative;
}
.bgc {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	margin: 300rpx auto;
}
.bgc image {
	width: 374rpx;
	height: 314rpx;
	opacity: 0.5;
}
/* tab栏 */
.tab {
	position: fixed;
	left: 0;
	top: 80rpx;
	margin-top:0rpx;
	background-color: #FFFFFF;
	height: 80rpx;
	width: 100%;
	line-height: 80rpx;
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 500;
	padding: 0 30rpx 10rpx;
	box-sizing: border-box;
	z-index: 11;
}
.txt1 {
	color: #FC4950;
	border-bottom: 4rpx solid #FC4950;
}
/* 订单样式 */
.list {
	background-color: #FFFFFF;
	padding: 30rpx;
	box-sizing: border-box;
	margin-top: 10rpx;
}
.list image {
	width: 100%;
	height: 100%;
}
/* 第一行 */
.list .one {
	display: flex;
	justify-content: space-between;
	font-family: Source Han Sans CN;
	font-size: 30rpx;
	padding-bottom: 10rpx;
	border-bottom: 1rpx solid #F5F5F5;
}
.list .one .left {
	font-weight: 400;
	color: #333333;
	display: flex;
	align-items: center;
}
.list .one .right {
	font-weight: 300;
	color: #999999;
}
.list .one .right1 {
	font-weight: 300;
	color: #FD494F;
}
.list .one .image1 {
	width: 37rpx;
	height: 33rpx;
	margin-right: 20rpx;
}
.list .one .image2 {
	width: 13rpx;
	height: 26rpx;
	margin-left: 20rpx;
}
/* 第二行 */
.list .two {
	display: flex;
	border-bottom: 1rpx solid #F5F5F5;
	margin: 20rpx 0;
	padding: 30rpx 0;
	box-sizing: border-box;
}
.list .two .img {
	width: 160rpx;
	height: 160rpx;
	margin-right: 20rpx;
}
.list .two .details {
	flex: 1;
}
.two .details .title {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.two .details .xia {
	display: flex;
	justify-content: space-between;
	font-family: Source Han Sans CN;
	margin-top: 50rpx;
}
.details .xia .univalence {
	font-size: 30rpx;
	font-weight: 400;
	color: #FF3636;
}
.details .xia .num {
	font-size: 26rpx;
	font-weight: 300;
	color: #999999;
}
/* 第三行 */
.list .three {
	display: flex;
	justify-content: space-between;
}
.list .three .allClass {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #000033;
}
.list .three .btn {
	display: flex;
}
.three .btn .btn1 {
	width: 135rpx;
	height: 50rpx;
	padding: 0 10rpx;
	background: #F6281B;
	border-radius: 25rpx;
	line-height: 50rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #FFFFFF;
}
.three .btn .btn2 {
	width: 135rpx;
	height: 48rpx;
	padding: 0 10rpx;
	border: 1rpx solid #F6281B;
	border-radius: 25rpx;
	line-height: 50rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #F6281B;
	margin-right: 40rpx;
}
.three .btn .btn3 {
	width: 135rpx;
	height: 48rpx;
	padding: 0 10rpx;
	border: 1rpx solid #CCCCCC;
	border-radius: 25rpx;
	line-height: 50rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #999999;
}
</style>
