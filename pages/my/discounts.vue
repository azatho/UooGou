<!-- 优惠券页面 -->
<template>
	<view>
		<view class="tab">
			<block v-for="(item,i) in tablist" :key='item.id'>
				<view :class="seletedIndex==item.id?'txt1':'txt2'" @click="tabstatus(item.id)">
					{{item.tab1}}
				</view>
			</block>
		</view>
		<view class="noricket" v-if="DiscountList.length==0">
			<image src="../../static/kaquan.png"></image>
			<view style="text-aligncenter;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">暂无优惠券</view>
		</view>
		<view v-else>
			<view class="ricket">
				<view :class="seletedIndex==0?'wsy':'ysy'" v-for="(item,i) in DiscountList" :key='i' @click="getdiscount(item.supplier_id)">
					<view class="one">
						<view class="left">
							<view class="money">
								<view class="txt1">￥</view>
								<view class="txt2">{{item.youhui_deduct_cash/100}}</view>
							</view>
							<view class="glibly">
								<view class="txt3">满￥{{item.youhui_man_cash/100}}减{{item.youhui_deduct_cash/100}}</view>
								<view class="txt4">{{item.youhui_start_time}}至</view>
								<view class="txt4">{{item.youhui_end_time}}</view>
							</view>
						</view>
						<view class="right" v-if="item.status==0">立即使用</view>
						<view class="right" v-else-if="item.status==1">已使用</view>
						<view class="right"v-else>已过期</view>
					</view>
					<view class="two">
						<view class="txt">1.适于{{item.supplier_name}}.2.仅支持在线支付使用</view>
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
				noricket:false,
				tablist:[//tab栏切换
					{tab1:'未使用',id:'0'},
					{tab1:'已使用',id:'1'},
					{tab1:'已过期',id:'2'}
				],
				seletedIndex:'0', // 点击状态ID
				page:0,
				pageCount:'',
				cdnUrl:'',
				DiscountList:[],//存放所有数据
			}
		},
		methods: {
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=activity/getDiscountList',
					data:{
						token:uni.getStorageSync('token'),
						status:self.seletedIndex,
						page:self.page
					}
				}).then(res=>{
					if(res.data.success){
						self.pageCount = res.data.pageCount
						for(var i = 0; i<res.data.data.length;i++){
							res.data.data[i].youhui_start_time=self.holo.formatTime(res.data.data[i].youhui_start_time*1000)
							res.data.data[i].youhui_end_time=self.holo.formatTime(res.data.data[i].youhui_end_time*1000)
							self.DiscountList.push(res.data.data[i])
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
			// tab栏切换
			tabstatus(id){
				this.seletedIndex=id
				this.page=0
				this.DiscountList=[]
				this.init()
			},
			// 转跳到对应的店铺
			getdiscount(supplier_id){
				if(this.seletedIndex==0){
					console.log(supplier_id);
					uni.navigateTo({
						url:'../common/shopHome?id='+supplier_id
					})
				}
			},
		},
		onReachBottom(){
			if(this.page<this.pageCount-1){
				this.page++
				this.init()
			}
		},
		onShow() {
			this.DiscountList=[]
			this.init()
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
.noricket {
	margin: 200rpx auto;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #999999;
	text-align: center;
}
.noricket image{
	width: 476rpx;
	height: 372rpx;
	margin-top: 100rpx;
}
.tab {
	width: 100%;
	height: 70rpx;
	background: #FFFFFF;
	line-height: 70rpx;
	position: fixed;
	top: 80rpx;
	left: 0;
	font-size: 26rpx;
	font-family: PingFang SC;
	background-color: #FFFFFF;
	display: flex;
	justify-content: space-around;
}
.tab .txt1 {
	font-weight: bold;
	color: #FC4950;
}
.tab .txt2 {
	font-weight: 400;
	color: #333333;
}
/* 未使用 */
.ricket {
	margin: 85rpx 45rpx;
}
.ricket image {
	width: 100%;
	height: 100%;
}
.ricket .wsy {
	background-image: url(../../static/youhui.png);
	width: 655rpx;
	height: 210rpx;
	background-size: cover;
	padding: 40rpx 40rpx 20rpx 30rpx;
	box-sizing: border-box;
	margin-bottom: 15rpx;
	font-family: PingFang SC;
	color: #FFFFFF;
	font-weight: bold;
}
.ricket .wsy .one {
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
}
.ricket .one .left {
	display: flex;
	justify-content: space-between;
	
}
.left .money{
	display: flex;
}
.left .money .txt1{
	font-size: 34rpx;
	padding-top: 10rpx;
}
.left .money .txt2{
	font-size: 84rpx;
}
.left .glibly {
	padding-top: 10rpx;
	margin-left: 25rpx;
}
.left .glibly .txt4 {
	margin-top: 10rpx;
	font-size: 20rpx;
	font-weight: 400;
}
.ricket .one .right {
	vertical-align: middle;
	padding-top: 30rpx;
}
.ricket .two .txt {
	font-size: 20rpx;
	opacity: 0.6;
}
/* 已使用 */
.ricket .ysy {
	background-image: url(../../static/youhui1.png);
	width: 655rpx;
	height: 210rpx;
	background-size: cover;
	padding: 40rpx 40rpx 20rpx 30rpx;
	box-sizing: border-box;
	margin-bottom: 15rpx;
	font-family: PingFang SC;
	color: #FFFFFF;
	font-weight: bold;
}
.ricket .ysy .one {
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
}
/* 已过期 */
.ricket .ygq {
	background-image: url(../../static/youhui1.png);
	width: 655rpx;
	height: 210rpx;
	background-size: cover;
	padding: 40rpx 40rpx 20rpx 30rpx;
	box-sizing: border-box;
	margin-bottom: 15rpx;
	font-family: PingFang SC;
	color: #FFFFFF;
	font-weight: bold;
}
.ricket .ygq .one {
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
}
</style>
