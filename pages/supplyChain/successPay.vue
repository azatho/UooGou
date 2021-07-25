<template>
	<view class="">
		<view class="topTitle" style="font-size: 32rpx;font-weight: 700;">
			支付成功
			<view class="back" @click="goBack">
				<image src="../../static/backarrow.png" mode=""></image>
			</view>
		</view>
		<view class="img">
			<image src="../../static/sure.png" mode=""></image>
		</view>

		<block v-if="showShare">
			<view class="success">
				支付金额：<text>{{order_total_price/100}}元</text>
				支付积分：<text>{{order_total_score/100}}元</text>
			</view>
			<view class="success" v-if="num!=0">
				还差{{num}}人，分享给好友
			</view>
			<view class="success" v-else>
				拼团成功
			</view>
			<button class="look" @click="share(1)" v-if="num!=0">
				邀请好友拼单
			</button> 
			<button class="look" @click="lookOrder" v-else>
				查看订单
			</button>
			<view class="goHome" @click="goHome">
				去首页逛逛
			</view>
		</block>
		<block v-else>
			<view class="success">
				支付金额： <text>￥{{order_total_price/100}} 元</text>
			</view>
			<view class="success" v-if="order_total_score && order_total_score!= 0">
				支付积分：<text>{{order_total_score/100}} </text>
			</view>
			<view class="look" @click="goHome">
				返回首页
			</view>
			<view class="goHome" @click="look">
				查看订单
			</view>
		</block>
		<view class="shareModel" v-if="showImg" @click="showImg=false">
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
				order_total_price:'',//订单总价
				order_total_score:'',//订单支付积分
				showShare:false,//显示邀请好友拼单
				showImg:false,
				tuan_id:'',
				num:'',//拼团剩余人数
				goods_name:'',
				goods_icon:'',
			}
		},
		methods:{
			goBack(){
				uni.redirectTo({
					url:'./index'
				})
			},
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=paySuccess',
					data:{
						tuan_id:self.tuan_id
					}
				}).then(res=>{
					if(res.data.success){
						self.num = res.data.data.res_join_count
						self.goods_name=res.data.data.goods_name
						self.goods_icon=res.data.data.goods_icon
						if(self.num>0){
							self.showImg = true
						}
						self.share()
					}
				})
			},
			//查看订单
			look(){
				uni.navigateTo({
					url:'/pages/my/addproduct/jinhuojilu'
				})
			},
			// lookOrder(){
			// 	uni.navigateTo({
			// 		url:'/pages/su/ptOrderList'
			// 	})
			// },
			// 分享
			share(e){
				let self = this
				if(e==1){
					self.showImg=true;
				}
				jweixin.ready(function() {
					jweixin.onMenuShareAppMessage({
						title: '一起来拼团',
						desc: self.goods_name,
						link: self.$baseUrl+'loveUgo/#/pages/common/helpFriends?tuan_id='+self.tuan_id, // 分享链接
						imgUrl:self.$cdnUrl+self.goods_icon,
						success: function () { 
							self.showImg=false;
						},
						fail: function (res) {
							alert(JSON.stringify(res));
						},
						cancel: function () { 
						    // 用户取消分享后执行的回调函数
						}
					})
				})
				this.showShare=true
			},
			//去首页
			goHome(){
				uni.redirectTo({
					url:'/pages/supplyChain/index'
				})
			},
		},
		onLoad(option){
			if(option.jumpType=='group'){
				this.tuan_id=option.tuan_id
				this.order_total_price = option.order_total_price
				this.init()
				this.showShare=true
			}else{
				this.showShare=false
				this.order_total_price = option.order_total_price
				this.order_total_score = option.order_total_score
			}
		}
	}
</script>

<style lang="scss">
	.img{
		text-align: center;
		image{
			width: 146rpx;
			height: 186rpx;
			margin: 150rpx 0 50rpx;
		}
	}
	.success{
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999;
		
		text{
			color: #333;
		}
	}
	.look{
		margin: 100rpx 30rpx 0;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background: #FC4950;
		border-radius: 45px;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.goHome{
		margin: 50rpx 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 45px;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FC4950;
		border: 1px solid #FC4950;
	}
</style>
