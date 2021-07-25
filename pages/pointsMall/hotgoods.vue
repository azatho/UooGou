<!-- 扶贫商品||最新商品 -->
<template>
	<view>
		<view class="box">
			<view class="banner">
				<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000" :circular='true'>
					<swiper-item v-for="(item,index) in shopListInfo.data.activity_banner" @click="goOther(item)" :key='index'>
							<img :src="$cdnUrl+item.image" alt="">
					</swiper-item>
				</swiper>
			</view>
			<!-- 	<view class="boxImg">
					<image :src="pageType==3?'../../static/newGoods.png':'../../static/helpingFarmers.png'" mode=""></image>
				</view> -->
		<!-- 中间内容 -->
		<view class="bodyConent">
			<view class="bodyConentItem" @click="goInfor(item)" v-for="(item,index) in shopListInfo.data.list">
				<view class="itemImg">
					<image :src="$cdnUrl+item.goods_icon"></image>
				</view>
				<view class="itemText">
					<view class="itemTitle">{{item.goods_name}}</view>
					<view class="itemPrice" v-if="item.goods_type==1">
						<span style='margin-left: 5rpx;' v-if='item.goods_score_cost!=0'>{{'￥'+$returnFloat(item.goods_score_cost)+'+'}}</span>						
						<image src="../../static/jifen.png"></image>
						<span v-if='item.goods_type==1'>{{$returnFloat(item.goods_integral)}}积分</span>
					</view>
					<view class="itemPrice" v-if="item.goods_type==0">
						<span style='margin-left: 5rpx;' v-if='item.goods_cost!=0'>{{'￥'+$returnFloat(item.goods_cost)}}</span>
					</view>
					<view class="itemNumber">{{item.goods_sale}}件已兑换</view>
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
				pageType:'',//展示扶贫商品||最新商品
				pageIndex:1,//当前是第几页
				shopListInfo:{
					data:{
						list:[]
					}
				},//商品信息
			}
		},
		onLoad(e){
			let title=''
			this.pageType=e.type
			this.pageType==0?title='助农产品':title='最新上架'
			uni.setNavigationBarTitle({
			        title:title
			})
		},
		onShow(){
			this.pageIndex=1
			this.shopListInfo={
				data:{
					list:[]
				}
			}
			this.ajaxInfo()
		},
		onReachBottom(){
			if(this.pageIndex<this.shopListInfo.page){
				this.pageIndex++
				this.ajaxInfo()
			}
		},
		methods: {
			// 轮播图跳转
			goOther(e){
				if (e.type == 1) {
					uni.navigateTo({
						url: 'exchangeGoodsDetail?id='+e.content
					});
				}
			},
			//点击商品
			goInfor(e) {
				uni.navigateTo({
					url:"exchangeGoodsDetail?id="+e.goods_index
				})
			},
			// 获取商品信息
			ajaxInfo(){
				let self = this
				let type =''
				self.pageType==0?type=1:type=2
				self.request({
					url:"ugo/api/app.php?c=account/getScoreHelpList",
					data:{
						type:type,
						limit:20,
						page:self.pageIndex
					}
				}).then(res => {
				        if (res.data.success) {
							self.shopListInfo.data.list.length>0?self.shopListInfo.data.list=[...self.shopListInfo.data.list,...res.data.data.list]:self.shopListInfo=res.data
				        } else {
									uni.showToast({
									title: res.data.message,
									icon: 'none'
				                })
				        }
				})
			}
		}
	}
</script>

<style lang="scss">
.box{
	background-color: white;
	position: relative;
	.banner {
		width: 100%;
		height: 300rpx;
		.swiper {
			width: 100%;
			height: 300rpx;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
	// .boxImg{
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	height: 390rpx;
	// 	width: 100%;
	// 	image{
	// 		width: 100%;
	// 		height: 100%;
	// 	}
	// }
	
	// 商品内容
	.bodyConent {
		// position: absolute;
		// left: 0;
		// top: 250rpx;
		height: 100%;
		width: 100%;
		padding: 0rpx 30rpx 20rpx;
		min-height: calc(100vh - 150rpx);
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-content: flex-start;
		box-sizing: border-box;
		.bodyConentItem {
			margin-top: 20rpx;
			width: 335rpx;
			height: 528rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			box-shadow: 0 0 2px #b4b8bf;
			.itemImg {
				// padding: 40rpx 25rpx 10rpx;
				height: 335rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
	
			.itemText {
				padding: 20rpx;
	
				.itemTitle {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
	
				.itemPrice {
					// height: 25rpx;
					line-height: 50rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF3F3F;
	
					image {
						width: 26rpx;
						height: 26rpx;
					}
				}
	
				.itemNumber {
					height: 22rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
}
</style>
