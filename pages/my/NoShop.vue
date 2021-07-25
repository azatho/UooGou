<!-- 店铺不存在页面 -->
<template>
	<view>
		<view class="none_img">
			<image src="../../static/noShops.png"></image>
		</view>
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<!-- 商品推荐 -->
		<view class="recommend">
			<view class="recommends">
				<view class="recommend_tit">
					<view class="line"></view>
					<view class="title">
						商品推荐
					</view>
					<view class="line1"></view>
				</view>
			</view>
			<view class="common_goods">
				<block v-for="(item,i) in goodsList" :key="i">
					<view class="common_con" >
						<view class=""  @click="goShop(item.supplier_id)">
							<image :src="cdnUrl + item.goods_icon" mode=""></image>
							<view class="name">
								{{item.goods_name}}
							</view>
							<view class="discount">
								<view class="" v-for="(items,k) in item.coupon" :key="k">
									<view class="coupon">
										领{{items.man_cash/100-items.deduct_cash/100}}元券
									</view>
								</view>
							</view>
							<view class="price">
								￥{{item.goods_cost/100}}<text>{{item.goods_price/100}}</text>
							</view>
						</view>
						<view class="shop" @click="goShop(item.supplier_id)">
							<view class="img">
								<image :src="cdnUrl+item.supplier_icon" mode=""></image>
							</view>
							<view class="right_shop">
								<view class="title">
									{{item.supplier_name}}
								</view>
								<view class="tip" v-if="item.base_price!=0">
									基础配送费：{{item.base_price/100}}
								</view>
								<view class="tip" v-else>
									免配送费
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {jweixin} from '../../until/jweixin.js'
	export default {
		data() {
			return {
				cdnUrl:'',
				page:'0',//优选好物第几页
				goodsList:[],//优选好物列表
				count: '10',
			}
		},
		methods: {
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=account/appGoodList',
					data:{
						page:self.page,
						user_lng:self.lng,
						user_lat:self.lat,
						count:self.count
					}
				}).then(res=>{
					if(res.data.success){
						for(var i = 0; i < res.data.data.list.length; i++){
							self.goodsList.push(res.data.data.list[i])
						}
						self.pageCount=parseInt(res.data.data.total.total/self.count)
					}
				})
			},
			// goGoodsDetail(e){
			// 	uni.navigateTo({
			// 		url:'/pages/common/goodsDetail?id='+e
			// 	})
			// },
			//去店铺主页
			goShop(e){
				uni.navigateTo({
					url:'/pages/common/shopHome?id='+e
				})
			},
		},
		onLoad() {
			this.init()
			this.cdnUrl=this.$cdnUrl
		},
		onReachBottom() {
			if(this.page<this.pageCount){
				this.page++
				this.init()
			}
		},
		onShow() {
			let self = this
			jweixin.ready(function() {
				jweixin.getLocation({
					type: 'wgs84',
					success: function(res) {
						self.lng = res.longitude
						self.lat = res.latitude
						console.log(self.lng);
						console.log(self.lat);
						self.goodsList=[]
						this.init()
					},
					cancel: function(res) {
						alert('您已禁止获取位置信息')
					}
				});
			});
		}
	}
</script>

<style lang="scss">
	.none_img {
		text-align: center;

		image {
			width: 224rpx;
			height: 215rpx;
			margin: 50rpx 0;
		}
	}

	.recommend {
		padding: 30rpx 24rpx 0;

		.recommends{
			.recommend_tit{
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 20rpx 0 30rpx;
				.line{
					width:100rpx;
					height:2rpx;
					background:rgba(153,153,153,1);
					position: absolute;
					left: 190rpx;
				}
				.line1{
					width:100rpx;
					height:2rpx;
					background:rgba(153,153,153,1);
					position: absolute;
					right: 190rpx;
				}
				.title{
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					margin: 0 20rpx;
					position: relative;
				}
			}
		}

		.common_goods {
			padding: 20rpx 5rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.common_con {
				width: 330rpx;
				height: 600rpx;
				background: rgba(255, 255, 255, 1);
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				overflow: hidden;
				position: relative;

				image {
					width: 330rpx;
					height: 330rpx;
					border-radius: 10rpx 10rpx 0 0;
				}

				.name {
					padding: 0 10rpx;
					margin: 10rpx 0;
					height: 70rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.discount {
					padding: 0 10rpx;
					display: flex;

					.coupon {
						width: 130rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: url(../../static/coupon.png) no-repeat;
						background-size: 100% 100%;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FF3F3F;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}
				}

				.price {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 63, 63, 1);
					margin-left: 16rpx;

					text {
						margin-left: 20rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						text-decoration: line-through
					}
				}

				.shop {
					width: 310rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: #F63B42;
					display: flex;
					align-items: center;
					padding: 10rpx;

					.img {
						image {
							width: 50rpx;
							height: 50rpx;
							margin-right: 10rpx;
						}
					}

					.right_shop {
						width: 260rpx;

						.title {
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #fff;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.tip {
							font-size: 16rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #CFCFCF;

						}
					}
				}
			}
		}

	}
</style>

