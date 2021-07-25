<!-- 余额明细页面 -->
<template>
	<view>
		<view class="title">
			<block v-for="(item,i) in tabbal" :key='item.id'>
				<view :class="selectid==item.id?'txt1':''" @click="gotabbal(item.id)">
					{{item.title}}
				</view>
			</block>
		</view>
		<view style="margin-top: 80rpx;"></view>
		<view v-if="list.length!=0">
			<view class="list" v-for="(item,i) in list" :key='i'>
				<view class="left">
					<view>{{item.type_name}}</view>
					<view class="time">{{item.time}}</view>
				</view>
				
				<view :class="item.type>100?'right':'right1'">
					<view style="text-align: right;" >{{item.type>100?'-':'+'}}{{item.amount/100}}</view>
					<block v-if="item.type!=103">
						<view style="text-align: right;" v-if="item.type>100&&item.payment_status==2" class="text1">已驳回 原因:{{item.refund_reason}}</view>
						<view :class="item.payment_status==0?'text2':item.payment_status==1?'text3':''" v-else>
							<!-- {{item.payment_status==0?'待打款':item.payment_status==1?'已打款':''}} -->
						</view>
					</block>
				</view>
				<!-- <view class="right1" v-if="item.payment_status==2">
					<view style="text-align: right;">+{{item.amount/100}}</view>
					<view v-if="item.payment_status==2" class="text1">已驳回 原因:{{item.refund_reason}}</view>
				</view>
				<view class="right" v-else>
					<view style="text-align: right;">-{{item.amount/100}}</view>
					<view v-if="item.payment_status==0" class="text2">待打款</view>
					<view v-if="item.payment_status==1" class="text3">已打款</view>
				</view> -->
			</view>
		</view>
		<view style="margin-top: 200rpx;text-align: center;" v-else>
			<image src="../../static/zwsj.png" mode="" style="width: 400rpx;height:306rpx;"></image>
			<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">暂无内容</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbal:[
					{id:'1',title:'全部'},
					{id:'2',title:'提现记录'},
					{id:'3',title:'收入记录'},
				],
				selectid:'1',
				jian:'提现扣减',
				// jian:'提现驳回增加',
				list:[],
				page:1,
				pageCount:1,
				zhungtai:'1',
			}
		},
		methods: {
			// tab栏切换
			gotabbal(id){
				this.selectid=id
				this.page=1
				this.list=[]
				this.init()
			},
			init(){
				let self=this
				if (uni.getStorageSync('token') != '') {
					this.request({
						url: 'ugo/api/app.php?c=rank_apply/getCashChangeList',
						data: {
							token: uni.getStorageSync('token'),
							page:self.page,
							type:self.selectid
						}
					}).then(res => {
						if(res.data.success){
							self.pageCount = res.data.cmd
							// self.list=res.data.data
							for(var i = 0; i<res.data.data.length;i++){
								self.list.push(res.data.data[i])
								self.list[i].time=self.holo.formatTime(self.list[i].time*1000)
							}
							
						}else{
							this.holo.toast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						console.log(rej);
					});
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
			this.init()
			this.list=[]
			this.page=1
			console.log(111);
		}
	}
</script>

<style>
page{
	position: relative;
}
.title {
	position: fixed;
	top: 88rpx;
	left: 0;
	background-color: #F5F5F5;
	height: 80rpx;
	width: 100%;
	line-height: 80rpx;
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 500;
	padding: 0 75rpx;
	box-sizing: border-box;
}
.txt1 {
	color: #FC4950;
	border-bottom: 4rpx solid #FC4950;
}
/* 列表 */
.list {
	width: 100%;
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #333333;
	padding: 30rpx;
	box-sizing: border-box;
}
.list .left{
	white-space: nowrap;
}
.list .time {
		font-size: 22rpx;
		font-weight: 400;
		color: #999999;
		margin-top: 10rpx;
	}
.list .right {
	flex: 1;
	margin-top: 10rpx;
	font-size: 28rpx;
	margin-left: 20rpx;
}
.list .right1 {
	color: #FC4950;
	margin-top: 10rpx;
	font-size: 28rpx;
}
.text1{
	font-size: 16rpx;
	color: #FC4950;
	font-weight: 400;
}
.text2{
	font-size: 16rpx;
	color: #999999;
	font-weight: 400;
}
.text3{
	font-size: 16rpx;
	color: #23CD57;
	font-weight: 400;
}
</style>
