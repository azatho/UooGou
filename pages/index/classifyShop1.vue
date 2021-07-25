<template>
	<view style="margin-bottom:33rpx;display: flex;flex-wrap: wrap;">
		<view class="topImg" v-if="images.length && lists.length">
			<swiper
				style="width: 100%;"
				class="swiper"
				:indicator-dots="indicatorDots"
				circular="true"
				:autoplay="autoplay"
				:interval="interval"
				:duration="duration"
				indicator-color="#ccc"
				indicator-active-color="#fff"
			>
				<swiper-item v-for="(item, i) in images" :key="i" @click="getbanner(item)" style="width: 100%;">
					<image :src="cdnUrl + item.image" style="width: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view v-if="lists.length" class="goods-List" v-for="(item, index) in lists" :key="item.goods_index" @click="goods_detils(item)">
			<view class="goods-List-top"><image :src="$cdnUrl + item.goods_icon" mode="widthFix"></image></view>
			<view class="goods-List-title">{{ item.goods_name }}</view>
			<!-- 优惠券 -->
			<view class="yhq">
				<view class="coupon" v-if="parseInt(itemc.is_have)==0" v-for="(itemc, indexc) in item.coupon" :key="itemc.deduct_cash">{{ itemc.deduct_cash / 100 }}元 领取</view>
			</view>
			<view class="yhq">
				<view class="coupon1" v-if="parseInt(itemc.is_have)==1" v-for="(itemc, indexc) in item.coupon" :key="itemc.deduct_cash">{{ itemc.deduct_cash / 100 }}元 已领取</view>
			</view>
			<!-- 价格 -->
			<view class="price">
				<view v-if='item.goods_type!=1'> ￥{{ item.goods_cost/100 }}</view>
				<view v-if='item.goods_type==1'>{{item.goods_score_cost!=0?'￥'+(item.goods_score_cost/ 100):'' }}{{item.goods_score_cost!=0&&item.goods_integral!=0?'+':''}}{{item.goods_integral!=0?item.goods_integral/100+'积分':''}}</view>
				<view v-if='item.goods_type==2'>或{{item.goods_score_cost!=0?'￥'+(item.goods_score_cost/ 100):'' }}{{item.goods_score_cost!=0&&item.goods_integral!=0?'+':''}}{{item.goods_integral!=0?item.goods_integral/100+'积分':''}}</view>
			</view>
			<view class="goods-List-bottom">
				<image src="../../static/classify1.png" mode="" style="width: 50rpx;height: 50rpx;border-radius: 50%;"></image>
				<view class="goods-List-bottom-desc">
					<p>{{item.supplier_name+'('+item.supplier_address+')' }}</p>
					<p>{{ item.base_price == 0 ? '免配送' : item.base_price / 100 }}</p>
				</view>
			</view>
		</view>
		<view class="noshop" v-if="!lists.length">
			<image src="/static/noshop(1).png" mode="" style="width: 480rpx;height: 360rpx;"></image>
			<view class="font-30" style="color: #999999;">暂无商品</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			obj: {},
			lists: [],
			images: [],
			indicatorDots: false,
			autoplay: true,
			duration: 500,
			interval: 2000,
			cdnUrl: '',
			total: 0,
			page:1,
			type:"",//从哪个页面跳转过来
		};
	},
	onLoad(options) {
		this.type=options.type
		this.cdnUrl = this.$cdnUrl;
		this.obj = options;
		uni.setNavigationBarTitle({
			title: options.name
		});
		this.list = [];
		this.init(this.obj);
	},
	onReachBottom() {
		if (this.total > this.lists.length) {
			this.page++;
			this.init();
		}
	},
	methods: {
		init() {
			var self = this;
			this.request({
				url: 'ugo/api/app.php?c=account/appGoodList',
				data: {
					user_lng: this.obj.lng,
					user_lat: this.obj.lat,
					goods_class: this.obj.id,
					page: this.page,
					count: 10,
					supplier_type:self.type,
				}
			}).then(function(res) {
				self.images = res.data.data.activity_banner;
				if (self.images.length > 1) {
					self.indicatorDots = true;
				}
				res.data.data.list.forEach(item => {
					self.lists.push(item);
				});
				self.total = res.data.data.total;
			});
		},
		// 去商品详情
		goods_detils(item) {
			uni.navigateTo({
				url: '/pages/common/shopHome?id=' + item.supplier_id + '&goods_sort=' + item.goods_sort + '&goods_index=' + item.goods_index
			});
		},
		// 点击banner
		getbanner(e) {
			if (e.type == 1) {
				uni.navigateTo({
					url: '../common/goodsDetail?id=' + e.content
				});
			}
			if (e.type == 2) {
				uni.navigateTo({
					url: '../common/shopHome?id=' + e.content
				});
			}
		}
	}
};
</script>

<style lang="scss">
.noshop {
	margin: 200rpx auto;
	text-align: center;
	image {
		width: 100%;
		height: 100%;
	}
}
.topImg {
	width: 100%;
	.swiper {
		width: 100%;
	}
	image {
		width: 100%;
		height: 100%;
	}
}
.goods-List {
	width: 45%;
	margin: 15rpx;
	// padding: 10rpx 30rpx;
	box-sizing: border-box;
	border: 0.5px solid #eee;
	.goods-List-top {
		wdith: 100%;
		image {
			width: 100%;
		}
	}
	.goods-List-title {
		padding: 0 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 20rpx;
		overflow: hidden;
		display: -webkit-box;
		word-break: break-all;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.yhq {
		display: flex;
		margin-top: 14rpx;
	}
	.coupon {
		width: 144rpx;
		height: 38rpx;
		line-height: 38rpx;
		text-align: center;
		background: url(../../static/quan.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
		font-size: 16rpx;
		font-family: PingFang SC;
		padding: 0 10rpx;
		font-weight: 400;
		color: #fff;
		margin-bottom: 10rpx;
		margin-right: 5rpx;
	}

	.coupon1 {
		width: 154rpx;
		height: 38rpx;
		line-height: 38rpx;
		text-align: center;
		background: url(../../static/quan1.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
		font-size: 16rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #fd4950;
		margin-bottom: 10rpx;
		margin-right: 5rpx;
	}
	.price {
		// display: flex;
		margin-top: 29rpx;
		padding: 0 30rpx;
		view {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ff3f3f;
		}
		// view:nth-child(2) {
		// 	font-size: 22rpx;
		// 	font-family: PingFang SC;
		// 	font-weight: 400;
		// 	text-decoration: line-through;
		// 	color: #999999;
		// 	margin: 0 20rpx;
		// }
	}
	.goods-List-bottom {
		display: flex;
		align-items: center;
		background: #f53b41;
		border-radius:0 0 10rpx 10rpx;
		margin-top: 41rpx;
		padding: 5rpx 10rpx;
		.goods-List-bottom-desc {
			flex: 1;
			margin: 0 10rpx;
			p:nth-child(1) {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ffffff;
				overflow: hidden;
				display: -webkit-box;
				word-break: break-all;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}
			p:nth-child(2) {
				font-size: 18rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ffdede;
			}
		}
	}
}
</style>
