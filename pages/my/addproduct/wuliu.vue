<template>
	<view>
		<view class="detail">订单编号：{{order_id}}</view>
		<view class="detail">国内承运人：{{expName}}</view>
		<view class="detail">买家姓名：{{order_contacts}}</view>
		<view class="detail">买家电话：{{order_phone}}</view>
		<view class="" style="padding: 0 30rpx;margin-top:30rpx;">
			<u-time-line>
				<u-time-line-item nodeTop="2" v-for="(item,index) in list" :key="item.time">
					<!-- 此处自定义了左边内容，用一个图标替代 -->
					<template v-slot:node v-if="index==0">
						<view class="u-node" style="background: #19be6b;">
							<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-desc">{{item.status}}</view>
							<view class="u-order-time">{{item.time}}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id:'',
			order_contacts:'',
			order_phone:'',
			expName:'',
			list:[]
		};
	},
	onLoad(e){
		this.order_id = e.order_id;
		this.init(e.express_number,e.order_index);
	},
	methods: {
		init(express_number,order_index){
			this.request({
				url:'ugo/api/app.php?c=order/searchExpress',
				type:'POST',
				data:{
					express_number:express_number,
					order_index:order_index
				}
			}).then(res=>{
				this.order_contacts = res.data.data.result.order_contacts;
				this.order_phone = res.data.data.result.order_phone;
				this.expName = res.data.data.result.expName;
				this.list = res.data.data.result.list
			})
		}
	}
};
</script>

<style scoped>
.detail {
	padding: 10rpx 30rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
}
.u-node {
	width: 44rpx;
	height: 44rpx;
	border-radius: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #d0d0d0;
}

.u-order-title {
	color: #333333;
	font-weight: bold;
	font-size: 32rpx;
}

.u-order-desc {
	color: rgb(150, 150, 150);
	font-size: 28rpx;
	margin-bottom: 6rpx;
}

.u-order-time {
	color: rgb(200, 200, 200);
	font-size: 26rpx;
}
</style>
