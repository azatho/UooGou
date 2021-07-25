<template>
	<view>
		<view class="status_bar">
			<view class="left_img" @click="back"><image src="../../static/leftback.png" mode=""></image></view>
			<view class="input">
				<input type="text" v-model="value" placeholder="请输入关键词"/>
				<image src="../../static/search(1).png" class="search_img" @click="search"></image>
				<view class="del" @click="del">
					<image src="../../static/del.png" ></image>
				</view>
			</view>
			<view class="searchWord" @click="search">
				搜索
			</view>
		</view>
		
		<view class="" v-if="list.length!=0">
			<block v-for="(item,i) in list" :key="i">
				<view class="goods_msg" @click="goGoodsDetail(item.goods_index,item.activity_id,item.activity_type)">
					<view class="good_img">
						<image :src="cdnUrl+item.goods_icon" mode=""></image>
					</view>
					<view class="right">
						<view class="title">
							{{item.goods_name}}
						</view>
						<view class="tip">
							<text>月售{{item.goods_sale}}</text>
							<text>好评{{item.comment_ratio}}%</text>
						</view>
						<view class="discount">
							<block v-for="(items,k) in item.coupons" :key="k">
								<view :class="items.user_hav==1?'coupon1':'coupon'">
									<text>{{items.deduct_cash/100}}</text><text style="margin-left:10rpx">{{items.user_hav==1?'已领取':'领取'}}</text>
								</view>
							</block>
						</view>
						<view class="price">
							￥{{item.goods_cost/100}}<text>￥{{item.goods_price/100}}</text>
						</view>
					</view>
				</view>
				<view class="shop_msg" @click="goShopDetail(item.goods_supplier)">
					<image src="/static/case.png" mode=""></image>{{item.goods_supplier_name}}<text>进店></text>
				</view>
			</block>
		</view>
		<view class="noneImg" v-else>
			<image src="../../static/zwsj.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>

export default {
	data() {
		return {
			cdnUrl:'',
			value:'',
			lng:'',
			lat:'',
			list:[],
			page:'0',
			type:'',
		};
	},
	methods: {
		init(){
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=searchGoodsList',
				data:{
					page:self.page,
					user_lng:self.lng,
					user_lat:self.lat,
					goods_name:self.value,
					type:self.type
				}
			}).then(res=> {
				if(res.data.success){
					self.list = res.data.data.list;
				}
			});
		},
		//返回到首页
		back() {
			if (this.type==0){
				uni.switchTab({
					url: './index'
				});
			}else{
				uni.redirectTo({
					url: '../supplyChain/index'
				});
			}
	
		},
		//搜索
		search(){
			this.init()
		},
		//清空搜索框的值
		del(){
			this.value=''
		},
		//商品详情
		goGoodsDetail(e,id,type){
			if(type=='0'){
				uni.navigateTo({
					url:'/pages/common/goodsDetail?id='+e
				})
			}
			if(type=='6'){
				uni.navigateTo({
					url:'/pages/group/seckillDetail?skill_id='+id
				})
			}
			if(type=='5'){
				uni.navigateTo({
					url:'/pages/group/goodsDetail?id='+id
				})
			}
		},
		//店铺主页
		goShopDetail(e){
			uni.navigateTo({
				url:'/pages/common/shopHome?id='+e
			})
		},
	},
	onShow() {
		this.init();
	},
	onLoad(options) {
		this.type=options.type
		this.cdnUrl=this.$cdnUrl
		this.value = options.value
		this.lat=options.lat
		this.lng=options.lng
	}
};
</script>

<style lang="scss">
.noneImg{
	margin: 200rpx 0 0;
	text-align: center;
	image{
		width: 640rpx;
		height: 480rpx;
	}
}
.status_bar {
	padding: 15rpx 30rpx;
	display: flex;
	.left_img {
		width: 50rpx;
		height: 70rpx;
		image {
			margin-top: 19rpx;
			width: 18rpx;
			height: 32rpx;
		}
	}
	.input {
		width: 410rpx;
		height: 70rpx;
		padding: 0 70rpx 0 60rpx;
		line-height: 70rpx;
		height: 70rpx;
		background: rgba(238, 241, 244, 1);
		border-radius: 35rpx;
		position: relative;
		input {
			height: 70rpx !important;
			line-height: 70rpx !important;
		}
		.search_img {
			width: 30rpx;
			height: 28rpx;
			position: absolute;
			top: 20rpx;
			left: 25rpx;
		}
		.del {
			width: 80rpx;
			height: 70rpx;
			position: absolute;
			top: 0;
			right: 0;
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 20rpx  0 0 25rpx;
			}
		}
	}
	.searchWord{
		height: 70rpx;
		flex: 1;
		text-align: center;
		line-height: 70rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
}

.goods_msg{
	padding: 40rpx 30rpx 0;
	display: flex;
	.good_img{
		image{
			width: 160rpx;
			height: 160rpx;
			background: #F5F5F5;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}
	.right{
		.title{
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space:wrap;
			display:-webkit-box;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2;
		}
		.tip{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			margin: 8rpx 0 15rpx;
			text{
				margin-right: 30rpx;
			}
		}
		.discount{
			display: flex;
			flex-wrap: wrap;
			view{
				width: 150rpx;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				position: relative;
				font-size: 16rpx;
				font-family: PingFang SC;
				font-weight: 400;
				margin-bottom: 10rpx;
				margin-right: 10rpx;
			}
			.coupon{
				background: url(../../static/quan.png) no-repeat;
				background-size: 100% 100%;
				color: #fff;
			}
			.coupon1{
				background: url(../../static/quan1.png) no-repeat;
				background-size: 100% 100%;
				color: #ff3b32;
			}
			
		}
		.price{
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,63,63,1);
			text{
				margin-left: 20rpx;
				font-size:22rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				text-decoration:line-through
			}
		}
	}
}
.shop_msg{
	width: 690rpx;
	margin: auto;
	padding: 0 0 0 180rpx;
	box-sizing: border-box;
	border-bottom: 2rpx solid #f5f5f5;
	height: 66rpx;
	line-height: 66rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	image{
		width: 29rpx;
		height: 29rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}
	text{
		margin-left: 20rpx;
	}
}
</style>
