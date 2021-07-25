<template>
	<view class="shopHome">
		<view class="topTab" :class="is_supplier==1?'suppler':'goodsShop'">
			<view style="display: flex;align-items: center;j">
				<image v-if="is_supplier!=1" src="../../static/backarrow.png" mode="" style="width: 17rpx;height: 32rpx;margin-left: 30rpx;" @click="backPreviousPage"></image>
				<image v-if="is_supplier==1" src="../../static/back(1).png" mode="" style="width: 32rpx;height: 32rpx;margin-left: 30rpx;" @click="backPreviousPage"></image>
				<view class="ipt" @click="search" style="margin-right: 30rpx;">
					<input type="text" disabled placeholder="搜索店内商品" />
					<view class="search">
						<image src="/static/search(1).png" mode=""></image>
					</view>
				</view>
			</view>
	
		</view>
		<view class="content">
			<view v-if="is_supplier!=1">
				<view class="collect1" v-if="collect" @click="collectShop(1)">已收藏</view>
				<view class="collect" v-else @click="collectShop(0)">
					<image src="../../static/collectStar.png" mode=""></image>
					<span style="position: absolute;top:2rpx;">收藏</span>
				</view>
			</view>

			<view class="refuse">
				<image :src="cdnUrl + shopInfo.supplier_icon" class="shopImg"></image>
				<view class="enemy" v-if="shopInfo.is_open==0">已打烊</view><!-- 变量要修改 -->
			</view>
			<view class="shopTitle" @click="getPhone(shopInfo.supplier_tel)">
				{{ shopInfo.supplier_name }}
				<image src="/static/phone.png" mode=""></image>
			</view>
			<view v-if='is_supplier==1' style="width:200rpx ;height: 10rpx;"></view>
			<view class="shopTip">
				最快29分钟送达
				<span v-if='is_supplier!=1'>
					<text v-if="shopInfo.base_price != 0">配送费：￥{{ shopInfo.base_price / 100?shopInfo.base_price / 100 :0}}元</text>
					<text v-else>免配送费</text>
				</span>
			</view>
			<view style="margin: 10rpx 30rpx 0 30rpx; font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">营业时间：{{shopInfo.open_time}}</view>
			<view class="address">
				<view class="" style="display: inline-block;">
					<image src="../../static/address.png" mode=""></image>
				</view>
				<view class="addr" @click="getmap(shopInfo)">
					{{ shopInfo.supplier_address }}
					<view class="btn" :class="is_supplier==1?'suppler':'goodsShop'">一键导航</view>
				</view>
			</view>
			<view class="discount" v-if="shop_coupon.length != 0">
				<block v-for="(item, i) in shop_coupon" :key="i">
					<view class="coupon box" @click="getCoupon(item.lingqu, item.coupon_id)" v-if='item.lingqu == 1'>
						<view class="" style="width:140rpx;font-size: 20rpx;padding-left: 20rpx;text-align: left">
							<view class="" style="">
								<text style="margin-right: 10rpx">￥</text><text style="font-size: 30rpx;">{{ item.deduct_cash / 100 }}</text>
							</view>
							<view>
								满{{ item.man_cash / 100 }}使用
							</view>
						</view>
						<view class="" style="flex: 1;display: flex;align-items: center;margin-left: 15rpx;">
							<view style="width:18px;font-size:22rpx;line-height: 25rpx;">
								已领取
							</view>
						</view>
					</view>
					<view class="coupon1 box" @click="getCoupon(item.lingqu, item.coupon_id)" v-else>
						<view class="" style="width:140rpx;font-size: 20rpx;padding-left: 20rpx;text-align: left">
							<view class="" style="">
								<text style="margin-right: 10rpx">￥</text><text style="font-size: 30rpx;">{{ item.deduct_cash / 100 }}</text>
							</view>
							<view>
								满{{ item.man_cash / 100 }}使用
							</view>
						</view>
						<view class="" style="flex: 1;display: flex;align-items: center;">
							<view style="width:18px;font-size:22rpx;line-height: 25rpx;">
								领取
							</view>
						</view>
					</view>
				</block>
			</view>
			<view style="width: 100%;height: 20rpx;background-color: #F5F5F5;margin: 20rpx 0;"></view>
			<view class="tabs">
				<block v-for="(item, i) in tabs" :key="i">
					<view class="tab" @click="getTab(i)">
						<text :class="i == current ? 'txt2' : 'txt1'">{{ item.name }}</text>
						<view class="line" v-if="i == current"></view>
					</view>
				</block>
			</view>
			
			<view class="classify">
				<block v-if="current == '0'">
					<view class="classify_left" v-if="menuList.length != 0">
						<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;">
							<view v-for="(item, i) in menuList" :key="i" @click.stop="getCurrent(item.id,i)  ">
								<view class="" :class="sort == item.id ? 'style' : 'style1'">
								 <image v-if="item.id==-10" style="width: 26rpx;height: 26rpx;margin-right: 10rpx;"  src="../../static/tejiaIcon.png" mode=""></image>
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
						<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;" @scrolltolower='shuaxin'>
							<block v-for="(item, i) in list" :key="i">
								<view class="con" @click="goodsDetail(item.goods_index,item.activity_id,item.activity_type,item.skill_status)">
									<view class="img">
										<image :src="cdnUrl + item.goods_icon" mode=""></image>
									</view>
									<view class="right">
										<view class="name"><text v-if="item.activity_type=='5' || item.activity_type=='6'||item.activity_type=='7'"
											 style="padding: 5rpx;color:#fff;background: #fd484f;margin:0 5rpx;"><text v-if="item.activity_type==5">拼团</text>
												<text v-if="item.activity_type==6">秒杀</text>
												<text v-if="item.activity_type==7">特价</text>

											</text>{{ item.goods_name }}</view>

										<!-- <view class="rule">
												{{item.goods_sku}}
											</view> -->
										<view>
											<view class="price" v-if="item.goods_type==0">￥{{ item.goods_cost / 100}}</view>
											<view class="price" v-if="item.goods_type==1">{{ item.goods_score_cost !=0 ?'￥'+ item.goods_score_cost / 100:''}}
												<text v-if="item.goods_integral!=0">{{item.goods_score_cost!=0?'+':''}}{{ item.goods_integral / 100 }}积分</text> </view>
											<view class="price" v-if="item.goods_type==2">￥{{ item.goods_cost!=0? item.goods_cost / 100:''}}</view>
											<view class="price" v-if="item.goods_type==2">{{ item.goods_score_cost!=0 ?'或￥'+item.goods_score_cost/ 100+'+' :'或'}}
												<text v-if="item.goods_integral!=0">{{item.goods_integral / 100 }}积分</text> </view>
											<view class="price1" v-if="item.goods_cost != item.goods_price">￥{{ item.goods_price / 100 ? item.goods_price / 100 : '0' }}</view>
										</view>
										<!-- <view v-if="item.activity_type!='5' && item.activity_type!='6'">
											<view class="price" style="margin-top: 20rpx;">￥{{ item.goods_cost / 100 ? item.goods_cost / 100:'暂无'}} <text v-if="item.goods_integral!=0">+{{ item.goods_integral / 100 }}积分</text> </view>
											<view class="price1" v-if="item.goods_cost != item.goods_price">￥{{ item.goods_price / 100 ? item.goods_price / 100 : '暂无' }}</view>
										</view> -->

										<!-- <view v-if="item.activity_type=='5'">
											<view class="price" style="margin-top: 20rpx;">￥{{ item.group_price / 100 ? item.group_price  / 100:'暂无'}}<text v-if="item.goods_integral!=0">+{{ item.goods_integral / 100 }}积分</text> </view>
											<view class="price1" v-if="(item.goods_cost != item.group_price)">￥{{ item.goods_cost / 100 ? item.goods_cost / 100 : '暂无' }}</view>
										</view>
										<view v-if="item.activity_type=='6'">
											<view class="price" style="margin-top: 20rpx;">￥{{ item.skill_price / 100 ? item.skill_price  / 100:'暂无'}}<text v-if="item.goods_integral!=0">+{{ item.goods_integral / 100 }}积分</text> </view>
											<view class="price1" v-if="(item.goods_cost != item.skill_price)">￥{{ item.goods_cost / 100 ? item.goods_cost / 100 : '暂无' }}</view>
										</view> -->
									</view>
									<view class="addShop" v-if="(item.is_one == '0') && (item.activity_type!='5' && item.activity_type!='6')"
									 @click="goodsDetail(item.goods_index)">
										<view class="choose" :class="is_supplier==1?'suppler':'goodsShop'">
											选规格
											<view class="number" v-if="item.num != '0'">{{ item.num }}</view>
										</view>
									</view>
									<view class="addShop" v-if="(item.is_one == '1') && (item.activity_type!='5' && item.activity_type!='6')">
										<view class="desc" @click.stop="descNum(i, item)" v-if="item.num != 0">
											<image src="/static/desc.png" mode=""></image>
										</view>
										<view class="num" v-if="item.num != 0">{{ item.num }}</view>
										<view class="desc" @click.stop="addNum(i, item)">
											<image v-if='is_supplier==1' src="/static/add2.png" mode=""></image>
											<image v-else src="../../static/add.png" mode=""></image>
										</view>
									</view>
								</view>
							</block>
						</scroll-view>
					</view>
					<view style="margin: 30px auto;color:#C0C0C0" v-if="isimgShow">
						<image src="../../static/zwsj1.png" style="width:520rpx;height:400rpx;" mode=""></image>
					</view>
				</block>
				<view v-if="current != '0'">
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
						<image src="../../static/zwsj1.png" mode="" style="width:520rpx;height:400rpx;"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="addGoods">
			<view class="" v-if="showLogin" @click="goLogin">
				<image src="../../static/addcar1.png" class="carImg"></image>
				<view class="word">还未登录</view>
				<view class="account1">去登录</view>
			</view>
			<view class="" v-else>
				<view class="" v-if="totalNum == 0">
					<image src="../../static/addcar1.png" class="carImg"></image>
					<view class="word">购物车是空的</view>
					<view class="account1">去结算</view>
				</view>
				<view class="" v-else>
					<image :src="is_supplier==1?'../../static/addcar3.png':'../../static/addcar.png'" mode="" class="carImg" @click="goCar">
						<view class="totalNum">{{ totalNum }}</view>
					</image>
					<view class="word">
						<text class="price">{{total_cost!=0?'￥'+ total_cost/ 100:'' }}{{total_cost!=0&&total_score!=0?'+':''}}{{total_score!=0?total_score/100+'积分':''}}</text>
						<text class="price1" v-if="total_cost != total_price">￥{{ total_price / 100 }}</text>
					</view>
					<view :class="is_supplier==1?'accounts':'account'" @click="confirmOrder">去结算</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue';
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				is_supplier:"",//是否是从供应商主页跳转过来的
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
				shopInfo: {},
				good_list: {}, //当前商品的
				totalNum: 0, //购物车总数
				total_cost: 0, //
				total_price: 0,
				total_score:0,//购物车所选商品积分价格
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
			};
		},
		methods: {
			// 店铺主页下拉加载事件
			shuaxin(){
				console.log(777777)
			},
			goLogin() {
				uni.switchTab({
					url: '/pages/my/my'
				});
			},
			search() {
				let self = this;
				uni.navigateTo({
					url: '/pages/common/searchGoods?value=' + self.valueName + '&id=' + self.supplier_id
				});
			},
			// 打电话
			getPhone(e) {
				let self = this;
				uni.makePhoneCall({
					phoneNumber: e
				});
			},
			//领取优惠券
			getCoupon(status, e) {
				let self = this;
				if (uni.getStorageSync('token')) {
					if (status == 1) {
						uni.showToast({
							title: '您已领取过',
							icon: 'none'
						});
					} else {
						self.request({
							url: 'ugo/api/app.php?c=activity/getDiscount',
							data: {
								coupon_id: e
							}
						}).then(res => {
							if (res.data.success) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
								self.init();
							}
						});
					}
				} else {
					uni.showModal({
						content: '未登录，请先登录',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								});
							}
						}
					});
				}
			},
			// 返回上一页
			backPreviousPage(){
				uni.navigateBack({
					delta:1
				})
			},
			//收藏店铺
			collectShop(e) {
				let self = this;
				if (uni.getStorageSync('token')) {
					self.request({
						url: 'ugo/api/app.php?c=goods/addCollect',
						data: {
							data_id: self.supplier_id,
							collect_type: '1',
							type: e
						}
					}).then(res => {
						if (res.data.success) {
							self.holo.toast({
								title: res.data.msg,
								icon: 'none'
							});
							if (e == 0) {
								self.collect = true;
							} else {
								self.collect = false;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					});
				} else {
					uni.showModal({
						content: '未登录，请先登录',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								});
							}
						}
					});
				}
			},
			// 一键导航
			getmap(e) {
				var self = this;
				uni.openLocation({
					latitude: +self.shopInfo.supplier_lat, // 纬度，浮点数，范围为90 ~ -90
					longitude: +self.shopInfo.supplier_lng // 经度，浮点数，范围为180 ~ -180。
				});
			},
			init() {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=nearby_store/nearby_shop',
					data: {
						supplier_id: self.supplier_id
					}
				}).then(res => {
					if (res.data.success) {
						self.shopInfo = res.data.data;
						self.collect = res.data.data.collect;
						self.shop_coupon = res.data.data.shop_coupon;
					}
				});
			},
			//获取分类
			getGoodsClass() {
				let self = this;
				self.list=[]
				self.request({
					url: 'ugo/api/app.php?c=nearby_store/goods_list',
					data: {
						supplier_id: self.supplier_id,
						type: Number(self.current) + 1
					}
				}).then(res => {
					if (res.data.success) {
						if (self.current == 0) {
							self.menuList = res.data.data;
							// if(res.data.data.length	==0){
							// 	self.isimgShow = true
							// }
							self.sort = res.data.data[0].id
					
							for (let i=0;i<res.data.data.length;i++){
								self.list =[...self.list,...res.data.data[i].list] 
							}
							
							// for(var i=0;i<res.data.data.length;i++){
							// 	if(res.data.data[i].list.length!=0){
							// 		self.menuList.push(res.data.data[i])
							// 	}
							// }
							if (res.data) {
								res.data.data.forEach((item, i) => {
									if (item.activity_type == '5') {
										res.data.data[i].goods_cost = item.group_price
										res.data.data[i].goods_price = item.goods_cost
									} else if (item.activity_type == '6') {
										res.data.data[i].goods_cost = item.skill_price
										res.data.data[i].goods_price = item.goods_cost
									}
									// 新添加代码
									if (self.goods_sort && self.goods_indexs) {
										self.sort = self.goods_sort
										if (self.goods_sort == item.id) {
											self.list = item.list
											self.list.forEach((items, k) => {
												if (self.goods_indexs == self.list[k].goods_index) {
													// console.log(k);
													self.dataone = self.list[k]
													self.list.splice(k, 1)
												}
											})
											self.list.unshift(self.dataone)
										}
									} else {
										self.sort = res.data.data[0].id;
										self.list = res.data.data[0].list;
									}
								})
								// 原始代码
								// self.sort = res.data.data[0].id;
								// self.list = res.data.data[0].list;
							}
						} else {
							self.goodsList = res.data.data;
						}
					}
				});
			},
			//获取当前店铺购物车数量价格
			getMyCart() {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=nearby_store/getMyCart',
					data: {
						supplier_id: self.supplier_id
					}
				}).then(res => {
					if (res.data.success) {
						self.totalNum = res.data.data.num;
						self.total_cost = res.data.data.total_sku_cost_price;
						self.total_price = res.data.data.total_sku_market_price;
						self.total_score = res.data.data.total_score;
						self.cartIndex = res.data.data.cart;
						self.low_price = res.data.data.low_price;
					}
				});
			},
			//全部商品销量的切换
			getTab(e) {
				this.current = e;
				this.getGoodsClass();
				this.isimgShow = false
				this.menuList = [];
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
			addNum(index, item) {
				let self = this;
				if (uni.getStorageSync('token')) {
					self.request({
						url: 'ugo/api/app.php?c=nearby_store/addsCart',
						data: {
							goods_index: item.goods_index,
							sku_index: item.sku_index,
							goods_count: parseInt(item.num) + 1,
							supplier_id: self.supplier_id
						}
					}).then(res => {
						if (res.data.success) {
							for (var i = 0; i < self.list.length; i++) {
								if (index == i) {
									self.list[i].num++;
								}
							}
							self.getMyCart();
						}else{
							uni.showToast({
							        title:res.data.message,
							        icon:'none'
							})
						}
					});
				} else {
					uni.showModal({
						content: '未登录，请先登录',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								});
							}
						}
					});
				}
			},
			descNum(index, item) {
				let self = this;
				if (uni.getStorageSync('token')) {
					self.request({
						url: 'ugo/api/app.php?c=nearby_store/addsCart',
						data: {
							goods_index: item.goods_index,
							sku_index: item.sku_index,
							goods_count: parseInt(item.num) - 1,
							supplier_id: self.supplier_id
						}
					}).then(res => {
						if (res.data.success) {
							for (var i = 0; i < self.list.length; i++) {
								if (index == i) {
									self.list[i].num--;
								}
							}
							self.getMyCart();
						}else{
							uni.showToast({
							        title:res.data.message,
							        icon:'none'
							})
						}
					});
				} else {
					uni.showModal({
						content: '未登录，请先登录',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								});
							}
						}
					});
				}
			},
			goodsDetail(e, activity_id, activity_type, current) {
				let self = this;
				if (activity_type == '5') {
					uni.navigateTo({
						url: '/pages/group/goodsDetail?id=' + activity_id
					});
				} else if (activity_type == '6') {
					console.log(current);
					uni.navigateTo({
						url: '/pages/group/seckillDetail?skill_id=' + activity_id + '&current=' + current
					});
				} else {
					uni.navigateTo({
						url: '/pages/common/goodsDetail?id=' + e
					});
				}

			},
			goCar() {
				uni.switchTab({
					url: '/pages/car/car'
				});
			},
			confirmOrder() {
				let self = this;
				if (Number(self.total_cost / 100) < Number(self.low_price / 100)) {
					self.holo.toast({
						icon: 'none',
						title: '未达到起送价格' + Number(self.low_price / 100) + '元'
					});
				} else {
					uni.switchTab({
						url:'../car/car'
					})
					// uni.navigateTo({
					// 	url: '/pages/common/confirmOrder?cartIndex=' + self.cartIndex + '&type=' + 'car'
					// });
				}
			}
		},
		onShow() {

			this.getMyCart();
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
			option.supplierID?this.is_supplier=1:this.is_supplier=2
			this.cdnUrl = this.$cdnUrl;
			this.supplier_id = option.id;
			this.goods_sort = option.goods_sort;
			this.goods_indexs = option.goods_index;
			// console.log(this.goods_sort);
			this.init();
			this.menuList = [];
			if (uni.getStorageSync('token')) {
				this.showLogin = false;
			}
			this.getGoodsClass();
		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.goodsShop{
		background-color: #f6281b;
	}
	.suppler{
		background-color: #FF862B;
		
	}
	.shopHome {
		padding: 170rpx 0 100rpx;
		height: 100%;
		box-sizing: border-box;

		.addGoods {
			position: fixed;
			left: 0;
			bottom: 0;
			height: 98rpx;
			line-height: 98rpx;
			background: #ffffff;
			box-shadow: 0px -1rpx 1rpx 0px rgba(102, 102, 102, 0.19);
			position: relative;
			z-index: 333334;

			.carImg {
				width: 103rpx;
				height: 103rpx;
				position: absolute;
				top: -20rpx;
				left: 30rpx;
			}

			.totalNum {
				width: 35rpx;
				height: 35rpx;
				line-height: 35rpx;
				text-align: center;
				color: #fff;
				background: #333333;
				border-radius: 50%;
				position: absolute;
				top: -20rpx;
				left: 100rpx;
				font-size: 18rpx;
				font-family: PingFang SC;
			}

			.word {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #7a7a7a;
				margin-left: 150rpx;

				.price {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #ff3f3f;
				}

				.price1 {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					text-decoration: line-through;
					color: #999999;
					margin-left: 10rpx;
				}
			}

			.account {
				width: 160rpx;
				height: 60rpx;
				background: linear-gradient(30deg, #f6281b, #ff5f53);
				border-radius: 30rpx;
				color: #fff;
				line-height: 60rpx;
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				position: absolute;
				right: 30rpx;
				top: 20rpx;
			}
			.accounts {
				width: 160rpx;
				height: 60rpx;
				background: linear-gradient(45deg, #FF862B, #FF964F);
				border-radius: 30rpx;
				color: #fff;
				line-height: 60rpx;
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				position: absolute;
				right: 30rpx;
				top: 20rpx;
			}

			.account1 {
				width: 160rpx;
				height: 60rpx;
				background: linear-gradient(270deg, #c6c6c6, #e8e8e8);
				box-shadow: 0px -1px 1px 0px rgba(102, 102, 102, 0.19);
				border-radius: 30rpx;
				color: #fff;
				line-height: 60rpx;
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				position: absolute;
				right: 30rpx;
				top: 20rpx;
			}
		}

		.topTab {
			width: 100%;
			height: 210rpx;
			position: fixed;
			top: 0;
			left: 0;
			padding-top: 20rpx;
			z-index: 333;

			.back {
				width: 100rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				position: absolute;
				top: 20rpx;
				left: 0;

				image {
					width: 18px;
					height: 18px;
					margin-top: 12rpx;
				}
			}

			.ipt {
				width: 612rpx;
				height: 60rpx;
				background: #ffffff;
				border-radius: 30rpx;
				margin-left: 54rpx;
				position: relative;

				.search {
					width: 80rpx;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					text-align: center;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-top: 12rpx;
					}
				}

				input {
					width: 100%;
					height: 100%;
					padding-left: 80rpx;
					box-sizing: border-box;
				}
			}
		}

		.content {
			background: #ffffff;
			border-radius: 20rpx 10rpx 0px 0px;
			padding-top: 20rpx;
			position: relative;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			z-index: 333;

			.collect {
				width: 118rpx;
				height: 47rpx;
				line-height: 47rpx;
				background: #ffffff;
				border: 1px solid #fd484f;
				border-radius: 24px;
				position: absolute;
				right: 30rpx;
				top: 30rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #fd484f;

				image {
					width: 26rpx;
					height: 26rpx;
					vertical-align: middle;
					margin: 0px 10rpx 0 20rpx;
				}
			}

			.collect1 {
				width: 118rpx;
				height: 47rpx;
				line-height: 47rpx;
				text-align: center;
				background: #ffffff;
				border: 1px solid #aaa;
				border-radius: 24px;
				position: absolute;
				right: 30rpx;
				top: 30rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #aaa;
			}

			.refuse {
				position: absolute;
				top: -48rpx;
				left: 30rpx;
				border-radius: 10rpx;

				.enemy {
					width: 140rpx;
					height: 30rpx;
					background: RGBA(253, 212, 209, 1);
					border-radius: 0px 0px 8rpx 8rpx;
					position: absolute;
					left: 0;
					bottom: 0;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #F6281B;
					text-align: center;
					line-height: 30rpx;
				}

				.shopImg {
					width: 140rpx;
					height: 140rpx;
					border-radius: 8rpx;
				}
			}

			.shopTitle {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				margin-left: 190rpx;
				margin-right: 150rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					vertical-align: middle;
					margin-left: 20rpx;
				}
			}

			.shopTip {
				margin-top: 5rpx;
				margin-left: 190rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999;

				text {
					margin-left: 20rpx;
				}
			}

			.address {
				line-height: 30rpx;
				padding: 10rpx 30rpx;
				display: flex;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
					vertical-align: middle;
				}

				.addr {
					display: inline-block;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333;
				}

				.btn {
					display: inline-block;
					width: 111rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					border-radius: 18rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ffffff;
					margin-left: 20rpx;
				}
			}

			.discount {
				display: flex;
				flex-wrap: wrap;
				padding: 0 30rpx;

				.box {
					width: 200rpx;
					height: 82rpx;
					text-align: center;
					position: relative;
					font-size: 16rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fff;
					margin-bottom: 10rpx;
					margin-right: 10rpx;
					display: flex;
				}

				.coupon {
					background: url(../../static/quan3.png) no-repeat;
					background-size: 100% 100%;
					color: #FD4950;
				}

				.coupon1 {
					background: url(../../static/quan2.png) no-repeat;
					background-size: 100% 100%;
					color: #Ffff;
				}
			}

			.tabs {
				height: 90rpx;
				display: flex;
				padding: 0 30rpx;

				.tab {
					width: 150rpx;
					line-height: 60rpx;
					text-align: center;
					font-family: PingFang SC;
					color: #ffffff;
					position: relative;
					font-size: 30rpx;

					.txt1 {
						color: #999;
						font-weight: 400;
					}

					.txt2 {
						color: #333;
						font-weight: bold;
					}

					.line {
						width: 54rpx;
						height: 3rpx;
						background: #fc4950;
						border-radius: 2rpx;
						position: absolute;
						bottom: 30rpx;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}

			.classify {
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
						// color: #f75665;
						font-weight: bold;
						background-color: #fff;
						border-left: 4rpx solid #F5281C;
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
						color: #f75665;
						font-weight: bold;
						background-color: #fff;
					}
					.innerstyle1 {
						height: 90rpx !important;
						line-height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						color: #7a7a7a;
						background-color: #fff;
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

			.common_goods {
				width: 750rpx;
				padding: 20rpx 29rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.common_con {
					width: 330rpx;
					// height: 520rpx;
					padding-bottom: 20rpx;
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
							color: #ff3f3f;
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
							text-decoration: line-through;
						}
					}
				}
			}
		}
	}
</style>
