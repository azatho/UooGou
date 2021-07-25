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
		<view class="bgc" v-if="orderList.length==0">
			<image src="../../../static/zwsj.png"></image>
			<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">您还没有相关订单</view>
		</view>
			<!-- 列表 -->
		<view v-else>
			<view class="list" v-for="(item,i) in orderList" :key ="i"> 
				<view class="one" @click="goshop(item.order_supplier,item.supplier_status)">
					<view class="left">
						<image src="../../../static/case.png" class="image1"></image>
						{{item.supplier_name}}
						<image src="../../../static/back1.png" class="image2"></image>
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
							<view class="univalence">{{items.goods_cost!=0?'￥'+items.goods_cost/100:''}}{{items.goods_cost!=0&&items.goods_integral!=0?'+':''}}{{items.goods_integral!=0?items.goods_integral/100+'积分':''}}</view>
							<view class="num">×{{items.goods_count}}</view>
						</view>
					</view>
				</view>
				<view class="three">
					<view class="allClass">订单总价：{{item.order_total_price!=0?'￥'+item.order_total_price/100:''}}{{item.order_total_price!=0&&item.order_coupon!=0?'+':''}}{{item.order_coupon!=0?item.order_coupon/100+'积分':''}}</view>
					<view class="btn">
						<!-- 5种按钮状态, 三种按钮样式   goods_status-->
						<view :class="item.order_status==5 || item.order_status==6?'btn3':item.order_status==7 || item.order_status==2?'btn1':'btn3'" @click="getStatus(item.order_status,item)">
							{{item.order_status==0?'已取消':item.order_status==1?'去支付':item.order_status==2?'立即发货':item.order_status==7?'审核':item.order_status==9?'已取消':item.order_status==5?'待收货':item.order_status==6?'已完成':item.order_status=='8'?'退款中':''}}
						</view>
					</view>
				</view>
			</view>
		</view> 
		<!-- 发货弹窗 -->
		<view class="msk" v-if="isSendFahuo" style="width:100%;height:100%;background: rgba(0,0,0,0.5);position: fixed;left: 0;top:0;">
			<view class="mskBox" style="width:500rpx;background: #fff;position: absolute;left: 50%;top:50%;transform: translate(-50%,-50%);border-radius: 10rpx;">
				<h2 style="font-size: 30rpx;font-family: PingFang SC;font-weight: 500;color: #333333;text-align: center;margin-top:30rpx;">请输入配送员信息</h2>
			    <div style="width: 400rpx;height:80rpx;background: #F5F5F5;margin:0 auto;display: flex;align-items: center;margin-top:30rpx;padding:0 20rpx;border-radius: 10rpx;">
				   <p style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #333333;">姓名：</p>
				   <input type="text" v-model="name" value="" placeholder="请输入配送员姓名" style="flex:1;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;" />
				</div>
				<div style="width: 400rpx;height:80rpx;background: #F5F5F5;margin:0 auto;display: flex;align-items: center;margin-top:30rpx;padding:0 20rpx;border-radius: 10rpx;">
				   <p style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #333333;">电话：</p>
				   <input type="number" v-model="phone" value="" placeholder="请输入配送员电话" style="flex:1;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;" />
				</div>
				<div @click="sendFh" style="text-align: center;padding: 20rpx 0;font-size: 30rpx;font-family: PingFang SC;font-weight: 400;color: #F7271C;border-top:1px solid #f5f5f5;margin-top:10rpx;">
					确定
				</div>
				<image src="../../../static/open.png" @click="gbfh" mode="" style="width:32rpx;height: 32rpx;position: absolute;right: 19rpx;top:19rpx;"></image>
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
					{id:'2',title:'待发货'},
					{id:'3',title:'待收货'},
					{id:'4',title:'已完成'},
					{id:'5',title:'售后'},
				],
				phone:'',
				name:'',
				order_index:'',
				selectid:'0',
				page:0,
				pageCount:'',
				cdnUrl:'',
				user_coupon:0,//用户积分
				orderList:[],
				isSendFahuo:false
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
				let self=this
				self.request({
					url:'ugo/api/app.php?c=order/mallOrderListV2',
					data:{
						page:self.page,
						type:self.selectid,
					},
				}).then(res=>{
					if(res.data.success){
						self.pageCount = res.data.pageCount
						self.user_coupon = res.data.data.user_coupon
						for(var i = 0; i<res.data.data.list.length;i++){
							if(res.data.data.list[i].order_status == '0')res.data.data.list[i].order_name = '已取消';
							if(res.data.data.list[i].order_status == '1')res.data.data.list[i].order_name = '待付款';
							if(res.data.data.list[i].order_status == '2')res.data.data.list[i].order_name = '待发货';
							if(res.data.data.list[i].order_status == '5')res.data.data.list[i].order_name = '待收货';
							if(res.data.data.list[i].order_status == '6')res.data.data.list[i].order_name = '已完成';
							if(res.data.data.list[i].order_status == '7')res.data.data.list[i].order_name = '售后';
							if(res.data.data.list[i].order_status == '8')res.data.data.list[i].order_name = '退款中';
							if(res.data.data.list[i].order_status == '9')res.data.data.list[i].order_name = '退款成功';
							console.log(res.data.data.list[i].order_status == '0');
							self.orderList.push(res.data.data.list[i])
						}
						console.log(self.orderList);
					}else{
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
						url:'../../common/shopHome?id='+id
					})
				}else{
					uni.navigateTo({
						url:'../../my/NoShop?id='+id
					})
				}
			},
			// 商品订单详情页面
			goparticulars(id){
				uni.navigateTo({
					url:'./orderDetial?index='+id
				})
			},
			//根据不同状态进行不同操作
			getStatus(e,item){
				let self = this;
				if(e==7){
					uni.showModal({
						title:'提示',
						content:'确定要通过该退款审核吗？',
						cancelText:'拒绝',
						confirmText:'退款',
						confirmColor:'#F7271C',
						success:function(res){
							if(res.confirm){
								self.refund_order('order/refund_order',item.order_id);
							}else if(res.cancel){
								self.refund_order('order/refuse_refund',item.order_id);
							}
						}
					})
				}else if(e==2){
					this.order_index = item.order_index;
					 self.isSendFahuo = true;
				}
			},
			//确认发货
			sendFh(){
				if(this.phone.length!=11){
					 uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
					return;
				}
				this.request({
					url:'ugo/api/app.php?c=order/order_sends',
					type:'POST',
					data:{
						order_index:this.order_index,
						phone:this.phone,
						name:this.name
					}
				}).then(res=>{
					if (res.data.success){
						this.orderList=[]
						this.init(); 
						uni.setStorageSync('sendPhone',this.phone);
						uni.setStorageSync('sendName',this.name);
						this.phone = '';
						this.name = '';
						this.isSendFahuo = false;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:'none'
						});
					}
				})
			},
			gbfh(){
				this.isSendFahuo = false;
			},
			//审核售后
			refund_order(url,order_id){
				this.request({
					url:'ugo/api/app.php?c='+url,
					data:{
						order_id:order_id
					}
				}).then(res=>{
					this.orderList=[]
					this.init();
					uni.showToast({
						title:res.data.message,
						icon:'none'
					})
				})
			},
			onBridgeReady(order_total_price){
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
			this.selectid = e.id;
			console.log(this.selectid);
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
