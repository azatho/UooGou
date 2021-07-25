<template>
	<view class="near">
		<view class="" v-if="list.length!=0">
			<!-- 轮播图2 -->
			<view class="topImg" v-if="images.length!=0">
				<swiper class="swiper" :indicator-dots="indicatorDots" circular="true" :autoplay="autoplay" :interval="interval"
				 :duration="duration" indicator-color="#ccc" indicator-active-color="#fff">
					<swiper-item v-for="(item, i) in images" :key="i" @click="getbanner(item)">
						<image :src="cdnUrl+item.image"></image>
					</swiper-item>
				</swiper>
			</view>
			<view style="width: 100%;height: 50rpx;" v-if="images.length!=0"></view>
			<view class="shops">
				<view class="title">
					附近门店
				</view>
				<view class="con" >
					<block v-for="(item,i) in list" :key="i">
						<view class="con_detail" @click="getshop(item.supplier_id)">
							<view class="img">
								<image :src="cdnUrl+item.supplier_icon" mode=""></image>
							</view>
							<view class="right">
								<view class="title">
									{{item.supplier_name}}
								</view>
								<view class="middle">
									<view class="sale" v-if="item.comment_ratio!=''">
										<block v-for="(items,j) in item.src" :key="j">
											<image :src="items.icon" class="star"></image>
										</block>
										月售{{item.sales}}
									</view>
									<view class="sale" v-else>暂无评分</view>
									<view class="dis">
										29分钟<text>|</text>{{item.distance>=1000?(item.distance/1000).toFixed(1)+'km':item.distance+'m'}}
									</view>
								</view>
								<view class="freight">
									起送￥{{item.low_price/100}}<text>|</text><text v-if="item.base_price!=0">基础配送费:￥{{item.base_price/100}}元</text>
									<text v-else>免配送费</text>
								</view>
								<view class="discount">
									<block v-for="(items,i) in item.coupon" :key="i">
										<view class="">
											<view :class="items.user_hav==2?'coupon':'coupon1'">
												满{{items.man_cash/100}}减{{items.deduct_cash/100}}
											</view>
										</view>
									</block>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="noshop" v-else>
			<image src="/static/noshop(1).png" mode=""></image>
		</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				cdnUrl: '',
				list:[],
				id:'',//分类id
				store_class:'',
				page:0,
				count:10,
				pageCount:0,
				lng:'',
				lat:'',
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				interval1: 2000,
				vertical: true,
				images: [], //banner列表
				stars:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false}
				],//评价星星
			}
		},
		methods:{
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=account/getStoreList',
					data:{
						user_lng:self.lng,
						user_lat:self.lat,
						page:self.page,
						count:self.count,
						store_class:self.store_class
					}
				}).then(res=>{
					if(res.data.success){
						if(res.data.data.store){
							
							self.images=res.data.data.activity_banner
							if(self.images.length>1){
								self.indicatorDots=true
							}
							self.pageCount=res.data.data.total%self.count
							for(var i = 0; i < res.data.data.store.length;i++){
								if(res.data.data.store[i].comment_ratio==0){
									var src=[
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.store[i].comment_ratio==1){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.store[i].comment_ratio==2){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.store[i].comment_ratio==3){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.store[i].comment_ratio==4){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.store[i].comment_ratio==5){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
									]
								}
								res.data.data.store[i].src=src
								self.list.push(res.data.data.store[i])
							}
						}
					}
				})
			},
			// 点击banner
			getbanner(e){
				if(e.type==1){
					uni.navigateTo({
						url:'../common/goodsDetail?id='+e.content
					})
				}
				if(e.type==2){
					uni.navigateTo({
						url:'../common/shopHome?id='+e.content
					})
				}
			},
			getshop(id){
				uni.navigateTo({
					url:'../common/shopHome?id='+id
				})
			}
		},
		onReachBottom() {
			if(this.page<this.pageCount){
				this.page++
				this.init()
			}
		},
		onLoad(options) {
			this.cdnUrl = this.$cdnUrl;
			uni.setNavigationBarTitle({
			    title: options.name
			});
			this.id = options.id
			this.store_class=options.store_class
			if(options.store_class==''){
				this.store_class=options.id
			}
			this.lng= options.lng
			this.lat= options.lat
			this.list=[]
			this.init()
		}
	}
</script>

<style lang="scss">
	.noshop{
		width: 402rpx;
		height: 417rpx;
		margin: 200rpx auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.topImg{
		width: 100%;
		height: 275rpx;
		.swiper {
			width: 100%;
			height: 342rpx;
		}
		image {
			width: 100%;
			height: 100%;
		}
	}
	.shops{
		padding: 40rpx 30rpx;
		.title{
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		.con{
			.con_detail{
				width: 100%;
				display: flex;
				margin-top: 40rpx;
				.img{
					width: 160rpx;
					height: 160rpx;
					border-radius: 10rpx;
					margin-right: 24rpx;
					image{
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
					}
				}
				.right{
					flex: 1;
					overflow:hidden;
					border-bottom: 1rpx solid #f5f5f5;
					.title{
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.middle{
						display: flex;
						justify-content: space-between;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						margin: 5rpx 0;
						.sale{
							image{
								width: 22rpx;
								height: 22rpx;
								margin-right: 10rpx;
							}
						}
						.dis{
							text{
								margin: 0 10rpx;
							}
						}
					}
					.freight{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						text{
							margin: 0 10rpx;
						}
					}
					.discount{
						display: flex;
						margin: 20rpx 0;
						.coupon{
							width: 120rpx;
							height: 38rpx;
							line-height: 38rpx;
							text-align: center;
							background: url(../../static/quan.png) no-repeat;
							background-size: 100% 100%;
							position: relative;
							font-size: 16rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #fff;
							margin-bottom: 10rpx;
							margin-right: 10rpx;
						}
						.coupon1{
							width: 120rpx;
							height: 38rpx;
							line-height: 38rpx;
							text-align: center;
							background: url(../../static/quan1.png) no-repeat;
							background-size: 100% 100%;
							position: relative;
							font-size: 16rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FD4950;
							margin-bottom: 10rpx;
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
