<template>
	<view class="goods">
		<view class="top" :style="{ background: showBgc ? '#fff' : '' }">
			<view v-if="goHome" class="arrow" @click="goBack">
				<image src="/static/homes.png" style="width: 36rpx;height:36rpx;"></image>
			</view>
			<!-- <view class="share">
				<image src="/static/share1.png"></image>
			</view> -->
		</view>
		<view class="banner">
			<view class="topImg" style="750rpx">
				<!-- <view class="change" v-if="changeBtn.length==2">
					<block v-for="(item,i) in changeBtn" :key="i">
						<view :class="i==currentChange?'selected':''" @click="getChange(item.index)">{{ item.name }}</view>
					</block>
				</view>
				<view class="change" v-else>
					<view class="selected" >{{ changeBtn[0].name }}</view>
				</view> -->
				<swiper class="banner_img" :autoplay="autoplay" :interval="interval" :duration="duration" circular="true">
					<swiper-item v-if="goods_info.goods_video">
						<video id="myVideo" :enable-progress-gesture="false" @play="play" @pause="stop" :src="cdnUrl + goods_info.goods_video"
						 :poster="cdnUrl + goods_info.goods_video_cover" object-fit="fill" :controls="controls" :duration="videoOften"
						 x5-playsinline="true" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" x5-video-orientation="portraint"
						 style="object-fit: contain;"></video>
					</swiper-item>
					<swiper-item v-for="(item, i) in goods_info.goods_album" :key="i">
						<view class="swiper-item">
							<image :src="cdnUrl + item"></image>
						</view>
					</swiper-item>
				</swiper>
				<!-- <view v-if="showImg" class="total">共{{ goods_info.goods_album.length }}张</view> -->
			</view>
		</view>

		<view class="goodsTitle">
			<view class="title">{{ goods_info.goods_name }}</view>
			
			
		</view>
		<view class="commonBgc"></view>
		<view class="base_msg">
			<!-- <view class="choose" @click="getCoupon" v-if="coupon.length!=0">
				<view style="display:flex">
					<text style="margin-right: 30rpx;color: #333333;">优惠券</text>
					<view class="discount">
						<block class="" v-for="(items,k) in coupon" :key="k">
							<view :class="items.user_hav==2?'coupon':'coupon1'" v-if="k<3">
								领{{items.man_cash/100-items.deduct_cash/100}}元券
							</view>
						</block>
					</view>
				</view> 
				<view class="right_img"><image src="../../../static/back.png"></image></view>
			</view> -->
			<view class="choose" @click="getParameter" v-if="goods_info.goods_text">
				<view style="display:flex;flex: 1;">
					<view style="margin-right: 30rpx;color: #333333;width:60rpx">参数</view>
					<view style="color: #999999;flex:1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
						{{ goods_info.goods_text ? goods_info.goods_text : '暂无' }}
					</view>
				</view>
				<view class="right_img">
					<image src="../../../static/back.png"></image>
				</view>
			</view>
			
		</view>
		<view class="commonBgc"></view>
		
		<view>
			<view class="goods_imgs" v-for="(item, i) in goods_info.goods_introduce" :key="item">
				<image :src="cdnUrl + item" mode="widthFix"></image>
			</view>
		</view>

		<view class="addGoods" @click.stop="add(goods_info.goods_index)">
			立即添加
			
		</view>

		<!-- 优惠券 -->
		<view class="common" v-if="showCoupon">
			<view class="common_con">
				<uni-icons type="closeempty" size="30" class="close" @click="close" color="#999999"></uni-icons>
				<view class="common_tit">优惠券</view>
				<view class="common_tit1">领券</view>
				<scroll-view scroll-y="true" class="ricket_list">
					<block v-for="(item, i) in coupon" :key="i">
						<view :class="[item.user_hav == '2' ? 'ricket1' : 'ricket2']" class="ricket" @click="getRicket(item.coupon_id)">
							<view class="one">
								<view class="ricket_left">
									<view class="money">
										<view class="txt1">￥</view>
										<!-- <view class="txt2">{{item.man_cash/100-item.deduct_cash/100}}</view> -->
										<view class="txt2">20</view>
									</view>
									<view class="glibly">
										<!-- <view class="txt3">满￥{{item.man_cash/100}}减{{item.deduct_cash/100}}</view> -->
										<view class="txt3">30</view>
										<view class="txt4">{{ item.start_time }}至{{ item.end_time }}</view>
									</view>
								</view>
								<view class="right">立即使用</view>
							</view>
							<view class="two">
								<view class="txt">1.适于{{ item.supplier_name }}.2.仅支持在线支付使用</view>
							</view>
						</view>
					</block>
				</scroll-view>
				<view class="sure">完成</view>
			</view>
		</view>

		<!-- 产品参数 -->
		<view class="common" v-if="showParameter">
			<view class="common_con">
				<uni-icons type="closeempty" size="30" class="close" @click="close" color="#999999"></uni-icons>
				<view class="common_tit">产品参数</view>
				<block v-if="goods_texts.length != 0">
					<view class="intro" v-for="(item, i) in goods_texts" :key="i">
						<view class="left1">{{ item.name }}</view>
						<view class="right2">{{ item.val }}</view>
					</view>
				</block>

				<view style="text-align: center;margin-top: 20px;color: #ccc;" v-else>暂无参数信息</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		jweixin
	} from '../../../until/jweixin.js'
	export default {
		data() {
			return {
				cdnUrl: '',
				goods_id: '', //商品id
				controls: true,
				autoplay: true,
				interval: 2000,
				videoOften: 0,
				duration: 500,
				videoTit: '商品详情',
				currentChange: '0',
				// showVideo:true,
				showImg: true,
				changeBtn: [{
					index: '0',
					name: '视频'
				}, {
					index: '1',
					name: '图片'
				}],
				showBgc: false,
				totalNum: 0, //购物车总数
				stars: [{
						icon: '../../../static/star.png',
						icon1: '../../../static/star1.png',
						flag: false
					},
					{
						icon: '../../../static/star.png',
						icon1: '../../../static/star1.png',
						flag: false
					},
					{
						icon: '../../../static/star.png',
						icon1: '../../../static/star1.png',
						flag: false
					},
					{
						icon: '../../../static/star.png',
						icon1: '../../../static/star1.png',
						flag: false
					},
					{
						icon: '../../../static/star.png',
						icon1: '../../../static/star1.png',
						flag: false
					}
				], //评价星星
				evaluateInfo: [],
				showCoupon: false, //事都显示优惠券弹窗
				showParameter: false, //是否显示参数弹框
				specsModel: false, //规格的弹窗
				sku: [], //规格信息
				sku_value: [], //规格值信息
				sku_price: [], //价格信息
				feeModel: false, //配送费弹窗
				parameterModel: false, //参数弹窗
				current_spacs: '-1', //规格当前索引
				current_spacs1: '-1', //规格属性当前索引
				goods_texts: [], //参数
				coupon: [], //优惠券列表
				goods_info: {
					goods_integral: ''
				},
				goods_count: 1, //商品数量
				goods_price: '', //商品价格
				score: '', //积分
				scorePrice: "", //积分价格
				sku_stock: '', //库存
				sku_spacs: '', //规格
				skuIndex_list: [],
				skuIndex: '',
				supplier_info: {}, //店铺信息
				sku_pic: '', //选择商品规格显示的图片
				chooseOption: '0',
				total_cost: '',
				total_price: '',
				low_price: '',
				cartIndex: '',
				videoContext: null,
				videoFlag: false,
				showLogin: true,
				goHome: false,
				goods_name: '',
				goods_album: '',
			};
		},
		onReady(res) {
			this.videoContext = uni.createVideoContext('myVideo');
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
					url: 'ugo/api/app.php?c=account/getGoodsInfo',
					data: {
						id: self.goods_id
					}
				}).then(res => {
					if (res.data.success) {
						self.goods_info = res.data.data; //商品详情所有信息
						self.goods_texts = res.data.data.goods_texts; //商品参数信息
						self.supplier_info = res.data.data.supplier_info; //店铺信息
						self.sku = res.data.data.goods_sku_property; //规格属性名
						self.sku_value = res.data.data.goods_sku_values; //规格属性值
						self.sku_price = res.data.data.goods_sku_price; //商品不同规格的价格
						self.coupon = res.data.data.coupon;
						self.goods_name = self.goods_info.goods_name
						self.goods_album = self.goods_info.goods_album[0]
						this.share();
						this.share1();
						for (var i = 0; i < self.coupon.length; i++) {
							self.coupon[i].start_time = self.holo.formatdate(self.coupon[i].start_time * 1000);
							self.coupon[i].end_time = self.holo.formatdate(self.coupon[i].end_time * 1000);
						}
						self.evaluateInfo.comment_time = self.holo.formatTime(self.evaluateInfo.comment_time * 1000);
						for (var i = 0; i < self.stars.length; i++) {
							if (i < self.evaluateInfo.comment_score) {
								self.stars[i].flag = true;
							}
						}
						let audioContext = uni.createInnerAudioContext();
						audioContext.autoplay = false;
						audioContext.src = self.cdnUrl + self.goods_info.goods_video;
						audioContext.onCanplay(() => {
							audioContext.duration;
							audioContext.buffered;
							//如果不写上面2行，打印audioContext，duration，buffered都有值，但打印audioContext.duration或audioContext.buffered值为0
							if (audioContext.duration * 1 > 0 || audioContext.buffered * 1 > 0) {
								// 部分iphone手机audioContext.duration 会为为0，所以判断audioContext.duration是否为0
								self.videoOften = audioContext.duration == 0 ? audioContext.buffered : audioContext.duration;
							}
						});
						//轮播图片视频
						// if(self.goods_info.goods_video==''){
						// 	this.showImg=true,
						// 	this.showVideo=false
						// 	this.changeBtn=[{index:'0',name:'图片'}]
						// }else{
						// 	this.showImg=false,
						// 	this.showVideo=true
						// }
						self.getMyCart();
					}
				});
			},
			//获取当前店铺购物车数量价格
			getMyCart() {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=nearby_store/getMyCart',
					data: {
						supplier_id: self.supplier_info.supplier_id
					}
				}).then(res => {
					if (res.data.success) {
						self.totalNum = res.data.data.num;
						self.total_cost = res.data.data.total_sku_cost_price;
						self.total_price = res.data.data.total_sku_market_price;
						self.cartIndex = res.data.data.cart;
						self.low_price = res.data.data.low_price;
					}
				});
			},
			//去店铺首页
			goShopDetail(e) {
				uni.navigateTo({
					url: '/pages/common/shopHome?id=' + e
				});
			},
			goCar() {
				uni.switchTab({
					url: '/pages/car/car'
				});
			},
			// 打电话
			getPhone(e) {
				console.log(e);
				let self = this;
				uni.makePhoneCall({
					phoneNumber: e
				});
			},
			//提交订单
			confirmOrder() {
				let self = this;
				if (Number(self.total_cost) < Number(self.low_price)) {
					self.holo.toast({
						icon: 'none',
						title: '未达到起送价格' + self.low_price / 100 + '元'
					});
				} else {
					uni.navigateTo({
						url: '/pages/common/confirmOrder?goods_count=' + self.totalNum + '&cartIndex=' + self.cartIndex + '&type=' +
							'car'
					});
				}
			},
			//切换视频图片
			getChange(e) {
				var index = e;
				if (index == 1) {
					(this.currentChange = index), (this.showImg = true), (this.showVideo = false);
				} else {
					(this.currentChange = index), (this.showImg = false), (this.showVideo = true);
				}
			},
			//优惠券弹框
			getCoupon() {
				this.showCoupon = true;
			},
			//领取优惠券
			getRicket(e) {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=activity/getDiscount',
					data: {
						coupon_id: e
					}
				}).then(res => {
					if (res.data.success) {
						self.holo.toast({
							title: res.data.mag
						});
						this.showCoupon = false;
						self.init();
					}
				});
			},
			//打开参数弹框
			getParameter() {
				this.showParameter = true;
			},
			//关闭参数弹框
			close() {
				this.showParameter = false;
				this.specsModel = false;
				this.showCoupon = false;
			},
			//点击规格
			getSpacs(e) {

				this.specsModel = true;
				this.goods_count = 1;
				this.chooseOption = e; //0点击规格  1加入购物车  2结算
				if (this.sku.length != 0) {
					// 默认选中第一项展示库存价格
					this.addShop();
				} else {
					this.goods_price = this.sku_price[0].sku_cost_price / 100;
					this.score = this.sku_price[0].sku_integral_price / 100;

					this.scorePrice = this.sku_price[0].sku_score_price / 100;

					this.sku_spacs = this.sku_price[0].sku_name;
					this.sku_stock = this.sku_price[0].sku_inventory > 0 ? this.sku_price[0].sku_inventory : '0';
					this.skuIndex_list.push(this.sku_price[0].sku_info);
					this.skuIndex = this.sku_price[0].sku_index;
					this.sku_pic = this.sku_price[0].sku_pic;
				}
			},
			// 默认选中第一项
			addShop() {
				let self = this;
				for (var i = 0; i < self.sku.length; i++) {
					self.sku[i].list = [];
					for (var j = 0; j < self.sku_value.length; j++) {
						if (self.sku[i].sku_index == self.sku_value[j].sku_parent) {
							self.sku[i].list.push(self.sku_value[j]);
						}
					}
				}
				// 默认选中第一个选项
				self.skuIndex_list = [];
				for (var i = 0; i < self.sku.length; i++) {
					for (var j = 0; j < self.sku[i].list.length; j++) {
						if (j == 0) {
							self.$set(self.sku[i].list[0], 'flag', true);
							self.skuIndex_list.push(self.sku[i].sku_index + ':' + self.sku[i].list[0].sku_index);
						} else {
							self.$set(self.sku[i].list[j], 'flag', false);
						}
					}
				}
				// 根据默认值取价格跟库存
				self.obtainSpecs();
			},
			// 点击切换获取规格和库存
			getPrice(parent, child, pn, cn) {
				let self = this;
				for (var i = 0; i < self.skuIndex_list.length; i++) {
					if (self.skuIndex_list[i].split(':')[0] == parent) {
						self.skuIndex_list.splice(i, 1);
					}
				}
				// for(var i = 0; i < self.sku.length; i++){
				for (var j = 0; j < self.sku[pn].list.length; j++) {
					if (self.sku[pn].list[j].sku_index === child) {
						self.sku[pn].list[j].flag = true;
						var a = self.sku[pn].list[j].sku_parent + ':' + self.sku[pn].list[j].sku_index;
						if (self.skuIndex_list.indexOf(a) == -1) {
							self.skuIndex_list.splice(pn, 0, a);
							self.obtainSpecs();
						}
					} else {
						self.sku[pn].list[j].flag = false;
					}
				}
				// }
			},
			// 获取库存规格
			obtainSpecs() {
				for (var i = 0; i < this.sku_price.length; i++) {
					if (this.skuIndex_list.join(',') == this.sku_price[i].sku_info) {
						this.goods_price = this.sku_price[i].sku_cost_price / 100;

						this.score = this.sku_price[i].sku_integral_price / 100;
						this.scorePrice = this.sku_price[i].sku_score_price / 100;
						this.sku_spacs = this.sku_price[i].sku_name;
						this.sku_stock = this.sku_price[i].sku_inventory > 0 ? this.sku_price[i].sku_inventory : '0';
						this.skuIndex = this.sku_price[i].sku_index;
						this.sku_pic = this.sku_price[i].sku_pic;

					}
				}
			},
			goBack() {
				window.location.href = this.$baseUrl + 'loveUgo/#/'
			},
			//选择商品数量
			addCount() {
				if (this.goods_count < this.sku_stock) {
					this.goods_count++;
				} else {
					uni.showToast({
						icon: 'none',
						title: '库存不足哦~'
					});
				}
			},
			descCount() {
				if (this.goods_count > 1) {
					this.goods_count--;
				} else {
					uni.showToast({
						icon: 'none',
						title: '至少选择一个哦~'
					});
				}
			},
			//分享
			share() {
				let self = this
				jweixin.ready(function() {
					jweixin.onMenuShareAppMessage({
						title: 'A+U购',
						desc: self.goods_name,
						link: window.location.href + '&share=1', // 分享链接
						// imgUrl:self.$cdnUrl + 'ugoadmin/images/20201212/2020121213342778929_1607751267.png',
						imgUrl: self.$cdnUrl + self.goods_album,
						success: function() {},
						fail: function(res) {
							alert(JSON.stringify(res));
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
							self.showShare = false
						}
					})
				})
			},
			// 分享到朋友圈
			share1() {
				let self = this
				jweixin.ready(function() {
					jweixin.onMenuShareTimeline({
						title: '分享朋友圈测试',
						// title: self.goods_name,
						link: window.location.href + '&share=1', // 分享链接
						imgUrl: self.$cdnUrl + self.goods_album,
						success: function() {
							alert('分享成功');
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
							self.showShare = false
						}
					})
				})
			},
			// 提交订单或者添加购物车
			sure_shop() {
				let self = this;
				if (uni.getStorageSync('token')) {
					if (self.sku_stock == 0) {
						uni.showToast({
							icon: 'none',
							title: '库存不足哦~'
						});
					} else {
						// 0点击规格  1加入购物车  2结算
						if (self.chooseOption == '1') {
							self.request({
								url: 'ugo/api/app.php?c=addCart',
								data: {
									goods_index: self.goods_id,
									sku_index: self.skuIndex,
									goods_count: self.goods_count,
									supplier_id: self.supplier_info.supplier_id
								}
							}).then(res => {
								if (res.data.success) {
									self.getMyCart();
									self.holo.toast({
										title: res.data.msg
									});
									self.specsModel = false;
								} else {
									if (res.data.msg == '登录状态失效，请重新登录~！') {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										});
									}
								}
							});
						} else if (self.chooseOption == '0') {
							self.specsModel = false;
						} else {
							// uni.navigateTo({
							// 	url:'./confirmOrder?goods_index='+self.goods_id+'&sku_index='+self.skuIndex+'&goods_count='+self.goods_count
							// })
						}
					}
				} else {
					self.specsModel = false;
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
			// 收藏商品
			collect(e) {
				if (uni.getStorageSync('token')) {
					let self = this;
					self.request({
						url: 'ugo/api/app.php?c=goods/addCollect',
						data: {
							data_id: self.goods_id,
							collect_type: '0',
							type: e
						}
					}).then(res => {
						if (res.data.success) {
							self.holo.toast({
								title: res.data.msg
							});
							self.init();
						} else {
							self.holo.toast({
								icon: 'none',
								title: res.data.msg
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
			//打开全部评价
			getComment(e) {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: './comment?id=' + this.goods_id
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
			//点击播放暂停轮播
			play() {
				this.autoplay = false;
			},
			//点击暂停开始轮播
			stop() {
				this.autoplay = true;
			},
			add(goodsIndex){
				this.request({
					url: 'ugo/api/app.php?c=supplier/addShareGoods',
					data: {
						token: uni.getStorageSync('token'),
						goods_index:goodsIndex
					}
				}).then(res => {
					
					
					if (res.data.success) {
					
						uni.navigateTo({
							url:'./addSucess?back=2'
						})
						
					}
				});
			},
			
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.showLogin = false;
			}
			uni.setNavigationBarTitle({
				title: '商品详情'
			})
		},
		onLoad(option) {
			this.cdnUrl = this.$cdnUrl;
			this.goods_id = option.id;
			if (option.share) {
				this.goHome = true;
			}
			this.init();
		},
		// onPageScroll(e) {
		// 	if (e.scrollTop > 300) {
		// 		this.showBgc = true;
		// 	} else {
		// 		this.showBgc = false;
		// 	}
		// }
	};
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.goods {
		height: 100%;

		// padding-bottom: 100rpx;
		// box-sizing: border-box;
		.top {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			z-index: 333;

			.arrow {
				width: 120rpx;
				height: 100%;
				line-height: 90rpx;
				text-align: center;

				image {
					width: 22rpx;
					height: 37rpx;
				}
			}

			.share {
				width: 120rpx;
				height: 100%;
				line-height: 90rpx;
				text-align: center;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.banner {
			position: relative;
			height: 750rpx;

			.topImg {
				width: 100%;
				position: relative;
				height: 750rpx;

				.change {
					position: absolute;
					left: 50%;
					bottom: 30rpx;
					transform: translateX(-50%);
					display: flex;
					z-index: 333;

					view {
						width: 90rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: rgba(153, 153, 153, 0.3);
						border-radius: 30rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 300;
						color: rgba(255, 255, 255, 1);
						margin: 0 10rpx;
					}

					.selected {
						background: rgba(153, 153, 153, 1);
					}
				}

				.banner_img {
					width: 100%;
					height: 750rpx;
					position: relative;

					image {
						width: 100%;
						height: 750rpx;
					}

					video {
						width: 100%;
						height: 100%;
					}
				}

				.total {
					position: absolute;
					bottom: 30rpx;
					right: 30rpx;
					padding: 0 10rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					color: #fff;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 15rpx;
					font-size: 20rpx;
				}
			}
		}

		.goodsTitle {
			padding: 30rpx;
			background-color: #fff;

			.title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
			}

			.price {
				margin-top: 20rpx;

				.txt {
					color: #ff1c1c;
					font-size: 24rpx;
				}

				.txt1 {
					font-size: 48rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #ff1c1c;
				}

				.txt2 {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					text-decoration: line-through;
					color: #999999;
					margin-left: 10rpx;
				}
			}

			.btns {
				height: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;

				.collect {
					width: 118rpx;
					height: 47rpx;
					line-height: 47rpx;
					text-align: center;
					background: #ffffff;
					border: 1rpx solid #333333;
					border-radius: 24rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;

					image {
						width: 27rpx;
						height: 26rpx;
						vertical-align: middle;
						margin-right: 5rpx;
						margin-top: -3rpx;
					}
				}

				.addShop {
					width: 220rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background: linear-gradient(30deg, #fd4950, #ff6f60);
					border-radius: 30rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ffffff;
				}
			}
		}

		.base_msg {
			padding: 0 30rpx;

			view {
				height: 90rpx;
				line-height: 90rpx;
			}

			.address {
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				color: rgba(51, 51, 51, 1);
				border-bottom: 1rpx solid #f5f5f5;

				image {
					width: 26rpx;
					height: 26rpx;
					vertical-align: middle;
				}
			}

			.choose {
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				font-family: Source Han Sans CN;

				.right_img {
					width: 18rpx;

					image {
						width: 18rpx;
						height: 30rpx;
					}
				}

				.discount {
					display: flex;
					margin: 25rpx 0;

					view {
						width: 140rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fff;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}

					.coupon {
						background: url(../../../static/quan1.png) no-repeat;
						background-size: 100% 100%;
					}

					.coupon1 {
						background: url(../../../static/quan.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}
		}

		.evaluate {
			padding: 0 30rpx;

			.evaluate_tit {
				margin: 30rpx 0 40rpx;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			.user_msg {
				display: flex;
				justify-content: space-between;

				.user_left {
					display: flex;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.star {
						width: 22rpx;
						height: 22rpx;
						margin: 0 0 0 10rpx;
					}

					.label {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}

				.time {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}

			.content {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				margin-top: 20rpx;
				padding-left: 80rpx;
			}

			.imgs {
				display: flex;
				flex-wrap: wrap;
				padding-left: 80rpx;

				image {
					width: 130rpx;
					height: 130rpx;
					margin: 20rpx 10rpx 0;
				}
			}

			.lookAll {
				margin-top: 30rpx;
				width: 100%;
				height: 90rpx;
				text-align: center;

				text {
					display: inline-block;
					width: 150rpx;
					height: 50rpx;
					line-height: 50rpx;
					margin-top: 20rpx;
					text-align: center;
					background: #ffffff;
					border: 1rpx solid #999999;
					border-radius: 25rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					color: #333;
				}
			}
		}

		

		.goods_imgs {
			width: 100%;
			margin-bottom: 100rpx;

			image {
				width: 100%;
			}
		}

		.addGoods {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			height: 90rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 90rpx;
			background: #FD4753;
			box-shadow: 0px -1rpx 1rpx 0px rgba(102, 102, 102, 0.19);

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

		.common {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 22222;

			.common_con {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				min-height: 800rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 30rpx 30rpx 0px 0px;

				.close {
					position: absolute;
					right: 30rpx;
					top: 30rpx;
					color: #999999;
				}

				.common_tit {
					height: 120rpx;
					line-height: 120rpx;
					text-align: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
				}

				.common_tit1 {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					padding: 0 30rpx 30rpx 30rpx;
				}

				.ricket_list {
					margin-bottom: 100rpx;
					height: 630rpx;
				}

				.ricket1 {
					background-image: url(../../../static/youhui1.png);
				}

				.ricket2 {
					background-image: url(../../../static/youhui.png);
				}

				.ricket {
					width: 655rpx;
					height: 210rpx;
					background-size: cover;
					padding: 30rpx 20rpx;
					box-sizing: border-box;
					margin-bottom: 15rpx;
					font-family: PingFang SC;
					color: #ffffff;
					font-weight: bold;
					margin: auto;

					.one {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 26rpx;

						.ricket_left {
							display: flex;
							justify-content: space-between;

							.money {
								display: flex;

								.txt1 {
									font-size: 34rpx;
									padding-top: 10rpx;
								}

								.txt2 {
									font-size: 84rpx;
								}
							}

							.glibly {
								margin-top: 20rpx;
								margin-left: 10rpx;

								.txt4 {
									font-size: 20rpx;
									margin-top: 10rpx;
								}
							}
						}
					}

					.two {
						.txt {
							font-size: 20rpx;
							opacity: 0.6;
						}
					}
				}

				.intro {
					display: flex;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					padding: 0 40rpx;
					margin-bottom: 50rpx;

					.left1 {
						color: rgba(153, 153, 153, 1);
						width: 130rpx;
					}

					.right1 {
						color: rgba(51, 51, 51, 1);
						flex: 1;
					}
				}

				.sure {
					width: 690rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					background: #fc4950;
					border-radius: 40rpx;
					position: absolute;
					bottom: 10rpx;
					left: 30rpx;
					color: #fff;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
				}
			}

			.common_con1 {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				min-height: 530rpx;
				max-height: 900rpx;
				overflow-y: auto;
				padding-bottom: 270rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 30rpx 30rpx 0px 0px;

				.close {
					position: absolute;
					right: 30rpx;
					top: 30rpx;
					color: #999999;
				}

				.spacs_img {
					display: flex;
					padding: 30rpx 30rpx 0 30rpx;

					.img {
						margin-right: 20rpx;
						width: 200rpx;
						height: 200rpx;

						image {
							width: 200rpx;
							height: 200rpx;
							border-radius: 10rpx;
						}
					}

					.price {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: rgba(255, 28, 28, 1);
						margin-top: 20rpx;

						text {
							font-size: 30rpx;
						}
					}

					.choose {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 300;
						color: rgba(51, 51, 51, 1);
						margin: 20rpx 0;
					}

					.rest {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 300;
						color: rgba(153, 153, 153, 1);
					}
				}

				.spacs_info {
					padding: 0 30rpx;

					.spacs_tit {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 300;
						color: rgba(51, 51, 51, 1);
						margin-top: 30rpx;
					}

					.options {
						view {
							padding: 10rpx 20rpx;
							border-radius: 10rpx;
							font-size: 26rpx;
							font-family: Source Han Sans CN;
							font-weight: 300;
							color: rgba(51, 51, 51, 1);
							display: inline-block;
							border: 1rpx solid #f5f5f5;
							margin: 20rpx 20rpx 0 0;
						}

						.option {
							background: rgba(253, 99, 94, 0.2);
							border: 1rpx solid #fd635e;
						}
					}
				}

				.sure_num {
					width: 100%;
					position: fixed;
					bottom: 0;
					left: 0;
					background-color: #fff;

					.buy_num {
						padding: 0 30rpx;
						height: 88rpx;
						line-height: 88rpx;
						border-top: 1rpx solid #f5f5f5;
						border-bottom: 1rpx solid #f5f5f5;
						display: flex;
						justify-content: space-between;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);

						.num {
							image {
								width: 36rpx;
								height: 36rpx;
								vertical-align: middle;
							}

							text {
								margin: 0 30rpx;
							}
						}
					}

					.sure {
						margin: 30rpx;
						height: 90rpx;
						line-height: 90rpx;
						text-align: center;
						background: #fc4950;
						border-radius: 45rpx;
						font-size: 36rpx;
						font-family: Source Han Sans CN;
						font-weight: 300;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}
	}
</style>
