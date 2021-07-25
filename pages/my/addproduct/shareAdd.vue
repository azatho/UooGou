<template>
	<view class="main-box">
		<view class="classify">
			<block v-if="current == '0'">
				<view class="classify_left" v-if="menuList.length != 0">
					<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;">
						<view v-for="(item, i) in menuList" :key="i" @click.stop="getCurrent(item.id,i)  ">
							<view class="" :class="sort == item.id ? 'style' : 'style1'">
								{{ item.name }}
							</view>
		
							<view class="" v-if="currentIndex==i">
								<view class="" v-for="(item1,index1) in item.good_class2_arr">
		
									<view :class="innerSort == item1.id ? 'innerstyle' : 'innerstyle1'" @click.stop="getCurrent1(item1.id,index1)">
										{{item1.name}}
									</view>
								</view>
							</view>
		
						</view>
		
					</scroll-view>
		
				</view>
				<view class="classify_right" v-if="menuList.length != 0">
					<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;">
						<block v-for="(item, i) in list" :key="i">
							<view class="con" @click="goodsDetail(item.goods_index)">
								<view class="img">
									<image :src="cdnUrl + item.goods_icon" mode=""></image>
								</view>
								<view class="right">
									<view class="name">
										{{item.goods_name}}
									</view>
		
									<view class="addbtn" @click.stop="add(item.goods_index)">
										立即添加
									</view>
									
								</view>
								
								
							</view>
						</block>
						<view class="nomore">
							没有更多了...
						</view>
					
					</scroll-view>
				</view>
				<view style="margin: 30px auto;color:#C0C0C0" v-if="isimgShow">
					<image src="../../../static/zwsj1.png" style="width:520rpx;height:400rpx;" mode=""></image>
				</view>
			</block>
			<!-- <view v-if="current != '0'">
				<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;" v-if="goodsList.length != 0">
					<view class="common_goods">
						<block v-for="(item, i) in goodsList" :key="i">
							<view class="common_con" @click="goodsDetail(item.goods_index)">
								<image :src="cdnUrl + item.goods_icon" mode=""></image>
								<view class="name">{{ item.goods_name }}</view>
								<view class="price">
									￥{{ item.goods_cost / 100 ? item.goods_cost / 100 : '暂无' }}
									<text v-if="item.goods_cost != item.goods_price">{{ item.goods_price / 100 ? item.goods_price / 100 : '暂无' }}</text>
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
				<view style="margin: 30px auto;color:#C0C0C0" v-if="isimgShow">
					<image src="../../../static/zwsj1.png" mode="" style="width:520rpx;height:400rpx;"></image>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 supplier_id: '', //店铺id
				 cdnUrl: '',
				 tabs: [{
				 	name: '全部商品'
				 }, {
				 	name: '销量排行'
				 }, {
				 	name: '最新上架'
				 }],
				 current: '0',
				 menuList: [], //左边导航列表
				 sort: '0', //左边导航索引
				 list: [],
				 number: 0, //
				 goodsList: [],
				
				 good_list: {}, //当前商品的
				 totalNum: 0, //购物车总数
				 total_cost: 0, //
				 total_price: 0,
				 cartIndex: '', //
				 low_price: '', //起送价格   单位 分
				 valueName: '', //搜索商品的名字
				 collect: false, //是否收藏
				 shop_coupon: [], //优惠券列表
				 showLogin: true,
				 goods_sort: '', //定位到所在列
				 goods_indexs: '', //定位为第一条
				 dataone: '',
				 isimgShow: false, //默认进来隐藏图片
				 currentIndex: -1,
				 
				 innerIndex: -1, //二级分类的下标
				 innerSort: -1, //二级分类的id
			}
		},
		methods: {
			goLogin() {
				uni.switchTab({
					url: '/pages/my/my'
				});
			},
			init() {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=supplier/getAdminClassList',
					data: {
						token: uni.getStorageSync('token')
					}
				}).then(res => {
					
					console.log(res)
					if (res.data.success) {
					
						
						this.menuList=res.data.data
						let theid=this.menuList[0].id
						
						this.getCurrent(theid,0)
					}
				});
			},
			add(goodsIndex){
				this.request({
					url: 'ugo/api/app.php?c=supplier/addShareGoods',
					data: {
						token: uni.getStorageSync('token'),
						goods_index:goodsIndex
					}
				}).then(res => {
					
					console.log(res)
					if (res.data.success) {
					//返回层数 1
						uni.navigateTo({
							url:'./addSucess?back=1'
						})
						
					}
				});
			},
			
			
			//菜品的切换
			getCurrent(e, f) {
				this.currentIndex = f
				this.innerIndex = -1
				this.innerSort = -1
				this.sort = e;
				let self = this;
			
				for (var i = 0; i < self.menuList.length; i++) {
					if (e == self.menuList[i].id) {
						self.list = self.menuList[i].list;
						console.log(self.list);
					}
				}
			
			
			},
			//菜品的切换
			getCurrent1(e, f) {
			
			
			
			
				let self = this;
				self.innerSort = e
				console.log('innersort' + e);
				self.innerIndex = f
				// for (var i = 0; i < self.menuList.length; i++) {
				// 	if (e == self.menuList[i].id) {
				// 		self.list = self.menuList[i].list;
				// 	}
				// }
				self.list = self.menuList[self.currentIndex].good_class2_arr[self.innerIndex].list
				console.log(self.currentIndex);
				console.log(self.innerIndex);
				console.log(self.list);
			
			},
			
			goodsDetail(e) {
				uni.navigateTo({
					
					url:'./supplierGoodsDetail?id=' + e,
				});
			
			},
			
			
		},
	onShow() {
	
		
	},
	// watch:{
	// 	menuList:function(newName,oldName){
	// 		console.log(newName);
	// 		console.log(888);
	// 		// this.isimg = !newName.length
	// 		this.isimg = newName.length?false:true	
	// 	}
	// },
	onLoad(option) {
		this.cdnUrl = this.$cdnUrl;
	
		
		this.init();
		this.menuList = [];
		if (uni.getStorageSync('token')) {
			this.showLogin = false;
		}
		
	}
	}
</script>


<style lang="scss">
	page{
		height: 100%;
		
	}
	.main-box{
		height: 100%;
	}
.classify {
				
				height: 100%;
				flex: 1;
				display: flex;
				overflow-y: auto;

				.classify_left {
					width: 200rpx;
					height: 100%;
					background-color: #f5f5f5;

					.style {
						height: 90rpx !important;
						line-height: 90rpx;
						height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						// color: #FF862B;
						font-weight: bold;
						background-color: #fff;
						border-left: 4rpx solid #FF862B;
					}

					.style1 {
						height: 90rpx !important;
						line-height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						color: #7a7a7a;
					}

					.innerstyle {
						height: 90rpx !important;
						line-height: 90rpx;
						height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						color: #FF862B;
						font-weight: bold;
						background-color: #fff;

					}

					.innerstyle1 {
						height: 90rpx !important;
						line-height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						color: #7a7a7a;
						background-color: #FFFFFF;
						
					}
				}

				.classify_right {
					flex: 1;
					padding: 0 30rpx;
					box-sizing: border-box;
					
					.con {
						display: flex;
						margin-bottom: 40rpx;
						position: relative;
						height: 135rpx;
						.img {
							width: 112rpx;
							height: 120rpx;
							margin-right: 27rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.right {
							
							position: relative;
							flex: 1;
							border-bottom: 1px solid #f5f5f5;

							.name {
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #222222;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
							}

							.rule {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999999;
							}

							.price {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #ff3f3f;
								margin-top: 10rpx;
							}

							.price1 {
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999;
								text-decoration: line-through;
								margin: 4rpx 0 15rpx 0;
							}
						}

						.addShop {
							position: absolute;
							bottom: 9rpx;
							right: 30rpx;
							display: flex;
							align-items: center;

							.num {
								height: 38rpx;
								line-height: 38rpx;
								font-size: 36rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
								margin: 0 20rpx;
							}

							.desc {
								width: 38rpx;
								height: 38rpx;

								image {
									width: 38rpx;
									height: 38rpx;
								}
							}

							.choose {
								width: 90rpx;
								height: 40rpx;
								text-align: center;
								line-height: 40rpx;
								border-radius: 20rpx;
								background: #f6281b;
								color: #fff;
								font-size: 22rpx;
								position: relative;

								.number {
									position: absolute;
									right: -20rpx;
									top: -15rpx;
									width: 32rpx;
									height: 32rpx;
									line-height: 32rpx;
									text-align: center;
									border-radius: 50%;
									background-color: rgba(51, 51, 51, 0.8);
									color: #fff;
								}
							}
						}
					}
				}
			}
			.addbtn{
				position: absolute;
				right: 0;
				bottom: 6rpx;
				width: 150rpx;
				height: 50rpx;
				background: #FFFFFF;
				border: 1rpx solid #FF862B;
				border-radius: 25rpx;
				color: #FF862B ;
				font-size: 16rpx;
				line-height: 50rpx;
				text-align: center;
				box-sizing: border-box;
			}
			.nomore{
				text-align: center;
				color: #999999;
			}
</style>
