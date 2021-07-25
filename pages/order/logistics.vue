<!-- 查看物流页面 -->
<template>
	<view>
		<view class="bgc">
			<image src="../../static/wuliu.gif"></image>
		</view>
		<view class="plan">
			<image src="../../static/wl.png"></image>
			<uni-steps :options="options" direction="column" :active="active"></uni-steps>
			<view class="btn" @click="getWuliu()">联系快递员</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		components:{
			uniSteps
		},
		data() {
			return {
				options:[
					{title:'快递员小哥上门取货',desc:'14:20分'},
					{title:'配送中',desc:'快递员小哥正赶往目的地，请耐心等待'},
					{title:'待收货',desc:'预计15：00分送达'},
				],//格式源				
				active:0,//当前步骤
				state:'0',//切换审核进度是否成功
				statedata:[],//数据集合
				order_index:'',
				phoneNumber:'19939326664',//电话号
			}
		},
		methods: {
			init(){
				let self = this;
				self.request({
					url:'ugo/api/app.php?c=order/lookLogistics',
					data:{
						order_index:self.order_index
					},
				}).then(res=>{
					if(res.data.success){
						self.statedata=res.data.data.data
						self.phoneNumber=res.data.data.phone
						for(var i=0;i<self.statedata.length;i++){
							self.options[0].desc=self.statedata[0].fahuo+'分'
							
							self.options[2].desc='预计'+self.statedata[2].receiving_time+'分到达'
						}
					}
				})
			},
			// 联系物流
			getWuliu(){
				console.log(111);
				let self = this;
				uni.makePhoneCall({
					phoneNumber:self.phoneNumber
				})
			},
		},
		onLoad(options) {
			this.order_index=options.order_index
			this.init()
		}
	}
</script>

<style>
page{
	height: 100%;
	position: relative;
}
.bgc {
	width: 749rpx;
	height: 765rpx;
	background-color: #F9E6E6;
}
.bgc image {
	width: 747rpx;
	height: 422rpx;
	margin-top: 30rpx;
}
.plan {
	width: 750rpx;
	height: 743rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 5rpx 24rpx 0rpx rgba(6, 0, 1, 0.1);
	border-radius: 50rpx 50rpx 0rpx 0rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	padding: 220rpx 100rpx 0;
	box-sizing: border-box;
}
.plan image {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	width: 512rpx;
	height: 306rpx;
}
.plan .btn {
	width: 320rpx;
	height: 95rpx;
	background: #FC4950;
	border-radius: 48rpx;
	font-size: 36rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 95rpx;
	text-align: center;
	margin: 100rpx auto;
}
a{
	text-decoration: none;
}
a:visited{
	text-decoration: none;
}
.btn1 {
	display: inline-block;
	width: 320rpx;
	height: 95rpx;
	background: #FC4950;
	border-radius: 48rpx;
	font-size: 36rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
	line-height: 95rpx;
	margin-left: 50rpx;
	margin-top: 30rpx;
}
</style>
