<template>
	<view class="index">
		<!-- 	<view class="topTitle">
			A+U购
		</view> -->
		<view class="mask" v-if="isMaskShow" @click="closeMask">
			
		</view>
		<view class="search">
			<view class="left" @click="goAddress()">
				<text style="
            display: inline-block;
            width: 130rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: -10rpx;
            align-items: center;
          ">{{ address }}</text>
				<image src="../../static/down2.png" mode=""></image>
			</view>
			<view class="right" @click="goSearch()">
				请输入商品名称<strong></strong>
				<view class="searchImg">
					<image src="../../static/search(1).png"></image>
				</view>
			</view>
			<view class="message" @click="goMessage()">
				<image src="../../static/message.png" mode=""></image>
			</view>
		</view>

		<view class="topSearch">
			<view class="topTip" @click="openTips" style="z-index: 0;">
				
				<view class="">
					首页
				</view>
				<image src="../../static/topTip1.png" mode="" v-if="toptip==1"></image>
				<image src="../../static/topTip2.png" mode="" v-if="toptip==2"></image>
			</view>
			<view style="color: #333; font-weight: bold"> 首页 </view>
			<!-- <block v-for="(item, i) in classify" :key="i">
				<view class="" @click="goClassify(item.name, item.id)" v-if="i < 6">
					{{ item.abbreviation }}
				</view>
			</block> -->
			
			<block v-for="(item, i) in sortArr" :key="i" >
				<view class="sortClass"  @click="clksort(item)">
					{{ item }}
				</view>
			</block>
			<!-- <view class="classify" @click="getClass" v-if="classify.length > 6" style="background: #fff;">
				<image src="/static/classifyy.png" mode=""></image>分类
			</view> -->
			<!-- <view style="display: flex;align-items: center;"> -->
				<view class="tipbox" v-if="toptip==2" style="padding: 20rpx 15rpx; ">
						<view class="tipbox-item" v-for="(item,index) in classify" :key='index'>
							<view class=" " @click="goClassify(item.name, item.id)">
								{{item.name}}
							</view>
						</view>
				</view>
			<!-- </view> -->
		</view>
		
		
		<!-- 轮播图 -->
		<view class="banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" circular="true" :autoplay="autoplay" :interval="interval"
			 :duration="duration" indicator-color="#ccc" indicator-active-color="#fff">
				<swiper-item v-for="(item, i) in images" :key="i" @click="getbanner(item)">
					<image :src="cdnUrl + item.image"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 新闻 -->
		<view class="news" v-if="news.length != 0">
			<view class="news_img">
				<image src="../../static/news.png"></image>
			</view>
			<view class="news_word">
				<swiper :autoplay="autoplay" :interval="interval1" :vertical="vertical" circular="true">
					<swiper-item v-for="(item, i) in news" :key="i">
						<view class="word" >恭喜商家“{{item.supplier_name}}”成功入驻爱加优购平台！</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- <view class="more" @click="goMoreNews">更多
				<image src="../../static/rightarrow.png" mode=""></image>
			</view> -->
		</view>
		<view class="signIn-box">
			
				<image src="../../static/indexSignIn.png" mode="" @click="toSignIn"></image>
			
			
				<image src="../../static/indexScoreMall.png" mode="" @click="toScoreMall"></image>
		
		</view>
		
		<!-- 分类 -->
		<view class="classify">
			<block v-for="(item, i) in classify" :key="i">
				<view class="class_con" @click="goClassify(item.name, item.id)">
					<view class="class_image">
						<image :src="cdnUrl + item.image" mode=""></image>
					</view>
					{{ item.name }}
				</view>
			</block>
		</view>

		<!-- <view class="hostSale">
			<image src="../../static/hostGoods.png" mode=""></image>
		</view> -->
		<!-- 轮播图2 -->
		<view class="hostSale">
			<swiper class="swiper" :indicator-dots="indicatorDots1" circular="true" :autoplay="autoplay" :interval="interval"
			 :duration="duration" indicator-color="#ccc" indicator-active-color="#fff">
				<swiper-item v-for="(item, i) in images2" :key="i" @click="getbanner(item)">
					<image :src="cdnUrl + item.image"></image>
				</swiper-item>
			</swiper>
		</view>
		 
		<view class="commonBgc" v-if="seckillGoods.length != 0 || groupGoods.length != 0"></view>
		<!-- 秒杀拼团 -->
		<view class="limitTime">
			<view class="limit_top" v-if="seckillGoods.length != 0" @click="goSeckill">
				<view class="title">
					<view class="word">限时秒杀</view>
					<image src="../../static/ms.png" class="img"></image>
				</view>
				<view class="goods">
					<block v-for="(item, i) in seckillGoods" :key="i">
						<view class="goods_con">
							<view class="class_image">
								<image :src="cdnUrl + item.goods_icon" mode=""></image>
							</view>
							<view class="price"> ￥{{ item.skill_price / 100 }} </view>
							<view class="price1"> ￥{{ item.goods_cost / 100 }} </view>
						</view>
					</block>
				</view>
			</view>
			<view class="limit_top" v-if="groupGoods.length != 0" @click="goGroup">
				<view class="title">
					<view class="word">拼团</view>
					<view class="word1">
						<image src="../../static/pt1.png" mode=""></image>
					</view>
					<image src="../../static/pt.png" class="img1"></image>
				</view>
				<view class="goods">
					<block v-for="(item, i) in groupGoods" :key="i">
						<view class="goods_con">
							<view class="class_image">
								<image :src="cdnUrl + item.goods_icon" mode=""></image>
							</view>
							<view class="price"> ￥{{ item.group_price / 100 }} </view>
							<view class="price1"> ￥{{ item.goods_cost / 100 }} </view>
						</view>
					</block>
				</view>
			</view>
		</view>

		<!-- 附近门店 -->
		<view class="nearShops" v-if="stores.length != 0">
			<view class="title" @click="goNear">
				<view class="word">
					<image src="/static/nearAddr.png" mode=""></image>附近门店
				</view>
				<view class="word1">更多<image src="../../static/rightarrow.png" mode=""></image></image>
				</view>
			</view>
			<view class="con">
				<block v-for="(item, i) in stores" :key="i">
					<view class="con_detail" @click="goshopDetail(item.supplier_id)">
						<image :src="cdnUrl + item.supplier_icon" mode=""></image>
						<view class="name">
							{{ item.supplier_name }}
						</view>
						<view class="distance">
							<image src="../../static/address1(1).png" mode=""></image>
							{{
                item.distance >= 1000
                  ? (item.distance / 1000).toFixed(1) + "km"
                  : item.distance + "m"
              }}
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 进货 供应链   轮播图3 -->
		
		<view class="hostSale">
			<swiper class="swiper" :indicator-dots="indicatorDots2" circular="true" :autoplay="autoplay" :interval="interval"
			 :duration="duration" indicator-color="#ccc" indicator-active-color="#fff">
				<swiper-item v-for="(item, i) in images3" :key="i" @click="gylclk(item)">
					<image :src="cdnUrl + item.image"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 优选好物 -->
		<view class="recommend" v-if="goodsList.length != 0">
			<view class="recommend_tit">
				<view class="word">
					<image src="/static/hostSales1.png" mode=""></image>优选好物
				</view>
			</view>
			<view class="common_goods">
				<block v-for="(item, i) in goodsList" :key="i">
					<view class="common_con" @click="
              goshopDetail(item.supplier_id, item.goods_sort, item.goods_index)
            ">
						<view class="">
							<image :src="cdnUrl + item.goods_icon" mode=""></image>
							<view class="name">
								{{ item.goods_name }}
							</view>
							<view class="discount" style="margin-left: 10rpx">
								<view class="" v-for="(items, k) in item.coupon" :key="k">
									<!-- <view class="coupon" v-if="k<2">
										满{{items.man_cash/100}}减{{items.deduct_cash/100}}
									</view> -->
									<view :class="items.is_have == 0 ? 'coupon' : 'coupon1'">
										{{ items.deduct_cash / 100 }}元
										<text style="margin-left: 10rpx">{{
                      items.is_have == 0 ? "领取" : "已领取"
                    }}</text>
									</view>
								</view>
							</view>
							<view class="price">
								<view class="" v-if="item.goods_type==0">￥{{ item.goods_cost / 100}}</view>
								<view class="" v-if="item.goods_type==1">
									{{ item.goods_score_cost!=0?'￥'+item.goods_score_cost/100:''}}{{item.goods_score_price!=0&&item.goods_integral!=0?'+':''}}{{item.goods_integral!=0?item.goods_integral/ 100+'积分':'' }}
								</view>
								<view class="" v-if="item.goods_type==2">
									<view>
										{{ item.goods_cost!=0? '￥'+item.goods_cost / 100:''}}
									</view>
									{{item.goods_score_cost!=0?'或￥'+item.goods_score_cost / 100:''}}{{item.goods_integral!=0&&item.goods_score_cost!=0?'+':''}}{{item.goods_integral!=0?item.goods_integral/ 100+'积分':''}}
								</view>
								<!-- ￥{{ item.goods_cost / 100}}<text v-if="item.goods_cost != item.goods_price">{{item.goods_price / 100}}</text> -->
								
							</view>
						</view>
						<view class="shop">
							<view class="img">
								<image :src="cdnUrl + item.supplier_icon" mode=""></image>
							</view>
							<view class="right_shop">
								<view class="title">
									{{ item.supplier_name }}
								</view>
								<view class="tip" v-if="item.base_price != 0">
									基础配送费：{{ item.base_price / 100 }}元
								</view>
								<view class="tip" v-else> 免配送费 </view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>

		<view class="" style="text-align: center; margin: 20px 0" v-if="showNogoods">
			<image src="/static/nogoods.png" mode="" style="width: 380rpx; height: 313rpx"></image>
		</view>

		<view class="allClass" v-if="showClassify">
			<view class="allClassify">
				<view class="con">
					<block v-for="(item, i) in classify" :key="i">
						<view :class="i == current_classify ? 'cur' : ''" @click="getClassify(i)">
							{{ item.abbreviation }}
						</view>
					</block>
				</view>
				<view class="sure" @click="sure"> 确定 </view>
			</view>
		</view>
		<view class="shareModel" v-if="showLogin">
			<view class="login">
				<image src="../../static/indexLogin.png" mode=""></image>
				<view class="tip"> 您还未登录 </view>
				<view class="tip1"> 请先登录再进行其他操作 </view>
				<view class="btn" @click="goToLogin"> 立即登录 </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		jweixin
	} from "../../until/jweixin.js";
	export default {
		data() {
			return {
				userinfo:"",//用户个人信息
				cdnUrl: "",
				page: "1", //优选好物第几页
				count: "5",
				pageCount: "",
				lng: "",
				lat: "",
				address: "正在获取...", //定位的地址
				indicatorDots: false,
				indicatorDots1: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				interval1: 3000,
				vertical: true,
				images: [], //banner列表
				images2: [], //banner列表2
				current_classify: "",
				classfiyName: "", //选中当前的name
				store_class: "", //门店类型
				classify: [], //分类列表
				news: [], //新闻列表
				seckillGoods: [], //秒杀商品列表
				groupGoods: [], //拼团商品列表
				stores: [], //附近门店列表
				goodsList: [], //优选好物列表
				showClassify: false,
				full_name: "",
				showNogoods: false,
				showLogin: false,
				referrer_openid: "",
				
				//4月26 新增
				// 首页分类列表
				sortArr:['共享人才','橱窗品牌','生态农产品','消费助农'],
				toptip:1,   
				images3: [], //banner列表3
				indicatorDots2: false,
				isMaskShow:false
			};
		},
		onShow() {
			let self = this;
			self.page=1;
			self.goodsList=[]
			if (uni.getStorageSync("lng")) {
				this.lng = uni.getStorageSync("lng");
				this.lat = uni.getStorageSync("lat");
				this.getAreaSupplier();
				this.getLocationAddress();
			}
			if (uni.getStorageSync('token')!=''){
				this.getUserInfo()
			}
			// self.lng=113.62493 
			// self.lat=34.74725
			// self.getAreaSupplier()
			// uni.setStorageSync('lng',self.lng)
			// uni.setStorageSync('lat',self.lat)
			// self.getLocationAddress();
			self.share(); 
		},
		created() {},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: 'A+U购'
			})
			this.cdnUrl = this.$cdnUrl;
			if (option.sing) {
				this.showLogin = true;
				this.referrer_openid = option.sing;
				uni.setStorageSync("referrer_openid", option.sing);
			} else {
				this.showLogin = false;
			}
			let self = this;
			jweixin.ready(function() {
				jweixin.getLocation({
					type: "gcj02",
					success: function(res) {
						self.lng = res.longitude;
						self.lat = res.latitude;
						self.getAreaSupplier();
						uni.setStorageSync("lng", self.lng);
						uni.setStorageSync("lat", self.lat);
						self.getLocationAddress();
					},
					cancel: function(res) {
						alert("您已禁止获取位置信息");
					},
				});
			});
		},
		methods: {
			//分享
			share() {
				let self = this;
				jweixin.ready(function() {
					jweixin.onMenuShareAppMessage({
						desc: "让购物更简单，让用户更方便。",
						title: "A+U购",
						link: self.$baseUrl + "loveUgo/#/", // 分享链接
						imgUrl: self.$cdnUrl +
							"ugoadmin/images/20201212/2020121213342778929_1607751267.png",
						success: function() {},
						fail: function(res) {
							alert(JSON.stringify(res));
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
							self.showShare = false;
						},
					});
				});
			},
			//去登录
			goToLogin() {
				let url = window.location.origin + "/loveUgo/#/pages/my/my";
				this.getCode("snsapi_base", url);
			},
			//获取首页的信息
			init() {
				let self = this;
				self.request({
						url: "ugo/api/app.php?c=account/appIndex",
						data: {
							user_lng: self.lng,
							user_lat: self.lat,
							page:self.page,
							count:20
						},
					})
					.then((res) => {
						if (res.data.success) {
							self.classify = res.data.data.icon_class; //分类门店
							self.images = res.data.data.activity_banner; //banner图
							self.images2 = res.data.data.activity_banner2; //第二个轮播图
							self.images3 = res.data.data.activity_banner3; //第三个轮播图
							self.news = res.data.data.news; //新闻
							self.seckillGoods = res.data.data.secKill; //秒杀商品
							self.groupGoods = res.data.data.groupBooking; //拼团商品
							self.stores = res.data.data.stores; //附近门店
							self.pageCount=res.data.page
							self.goodsList.length>0?this.goodsList = [...this.goodsList,...res.data.data.goodslist]:this.goodsList=res.data.data.goodslist; //附近门店
							if (self.goodsList.length == 0 && self.stores.length == 0) {
								self.showNogoods = true;
							}
							if (self.images.length > 1) {
								self.indicatorDots = true;
							}
							if (self.images2.length > 1) {
								self.indicatorDots1 = true;
							}
							if (self.images3.length > 1) {
								self.indicatorDots2 = true;
							}
						}
					});
			},
			// 获取当前位置服务的商家
			getAreaSupplier() {
				var self = this;
				self
					.request({
						url: "ugo/api/app.php?c=getAreaSupplier",
						data: {
							user_lng: self.lng,
							user_lat: self.lat,
						},
					})
					.then((res) => {});
			},
			//根据坐标获取附近地址
			getLocationAddress() {
				var self = this;
				self.request({
						url: "ugo/api/app.php?c=account/locationToAddress",
						data: {
							lng: self.lng,
							lat: self.lat,
						},
					})
					.then((res) => {
						if (res.data.success) {
							self.address = res.data.data[0].ad_info.district;
							self.full_name =
								res.data.data[0].ad_info.province +
								res.data.data[0].ad_info.city +
								res.data.data[0].ad_info.district;
							uni.setStorageSync("full_name", self.full_name); //地址全称  如河南省郑州市中原区
							uni.setStorageSync("address", self.address); //区名称
							console.log(self.address);
							self.init();
						}
					});
			},
			//获取优选好物
			getSelectGoods() {
				let self = this;
				self
					.request({
						url: "ugo/api/app.php?c=account/appGoodList",
						data: {
							page: self.page,
							user_lng: self.lng,
							user_lat: self.lat,
							count: self.count,
						},
					})
					.then((res) => {
						if (res.data.success) {
							for (var i = 0; i < res.data.data.list.length; i++) {
								self.goodsList.push(res.data.data.list[i]);
							}
							self.pageCount = parseInt(res.data.data.total.total / self.count);
						}
					});
			},
			//选择地址
			goAddress() {
				uni.navigateTo({
					url: "/pages/index/chooseAddress",
				});
			},
			goMessage() {
				uni.navigateTo({
					url: "/pages/my/information",
				});
			},
			// 点击banner
			getbanner(e) {
				if (e.type == 1) {
					uni.navigateTo({
						url: "../common/goodsDetail?id=" + e.content,
					});
				}
				if (e.type == 2) {
					uni.navigateTo({
						url: "../common/shopHome?id=" + e.content,
					});
				}
				if (e.type == 4) {
					uni.navigateTo({
						url: "/pages/index/nearShop?lat=" + this.lat + "&lng=" + this.lng,
					});
				}
				if (e.type==5) {
					if (this.userinfo.is_supplier==0||this.userinfo.is_supplier==2) {
						uni.navigateTo({
							url:'../my/supplier/progressEnter?pageIndex=1'
						})
					}
				}
				if(e.type==6){
					if (this.userinfo.rank==1) {
						uni.navigateTo({
							url:'../my/applyposition'
						})
					}else{
						uni.navigateTo({
							url: '../my/management?apply_rank=' + this.userinfo.rank
						})
					}
				}
			
			},
			//公告详情
			goNewsDetail(e) {
				uni.navigateTo({
					url: "/pages/common/common?src=" + e,
				});
			},
			//更多公告
			goMoreNews() {
				uni.navigateTo({
					url: "/pages/index/news",
				});
			},
			//去搜索页面
			goSearch() {
				uni.navigateTo({
					url: "/pages/index/search?lat=" + this.lat + "&lng=" + this.lng,
				});
			},
			//打开分类弹窗
			getClass() {
				this.current_classify = "-1";
				this.classfiyName = "";
				this.showClassify = !this.showClassify;
			},
			//得到选择的分类
			getClassify(e) {
				this.current_classify = e;
				for (var i = 0; i < this.classify.length; i++) {
					if (e == i) {
						this.classfiyName = this.classify[i].name;
						this.store_class = this.classify[i].id;
						console.log(this.store_class);
					}
				}
			},
			//确定选择的分类
			sure() {
				if (this.classfiyName != "" && this.store_class != "") {
					this.goClassify(this.classfiyName, this.store_class);
				}
				this.showClassify = false;
			},
			//分类入口
			goClassify(name, id) {
				this.isMaskShow=false
				this.toptip=1
				uni.navigateTo({
					url: "/pages/index/classifyShop1?name=" +
						name +
						"&id=" +
						id +
						"&lat=" +
						this.lat +
						"&lng=" +
						this.lng +
						"&store_class=" +this.store_class+'&type=0'
				});
			},
			//限时秒杀页面
			goSeckill() {
				uni.navigateTo({
					url: "/pages/index/seckill",
				});
			},
			//拼团
			goGroup() {
				let self = this;
				uni.navigateTo({
					url: "/pages/index/makeGroup?lat=" + self.lat + "&lng=" + this.lng,
				});
			},
			//附近门店更多入口
			goNear(e) {
				uni.navigateTo({
					url: "/pages/index/nearShop?lat=" + this.lat + "&lng=" + this.lng,
				});
			},
			//商品详情页
			goGoodsDetail(e) {
				uni.navigateTo({
					url: "/pages/common/goodsDetail?id=" + e,
				});
			},
			//秒杀详情
			goSeckillDetail(e) {
				uni.navigateTo({
					url: "/pages/group/seckillDetail?skill_id=" + e,
				});
			},
			//拼团详情
			goGroupDetail(e) {
				uni.navigateTo({
					url: "/pages/group/goodsDetail?id=" + e,
				});
			},
			goshopDetail(e, goods_sort, goods_index) {
				// e后边是我添加的
				uni.navigateTo({
					url: "/pages/common/shopHome?id=" +
						e +
						"&goods_sort=" +
						goods_sort +
						"&goods_index=" +
						goods_index,
				});
			},
			//4月26
			openTips(){
				if(this.toptip==1){
					this.toptip=2
					this.isMaskShow=true
				}else{
					this.toptip=1
					this.isMaskShow=false
				}
			},
			//
			clksort(e){
				// uni.navigateTo({
					
				// })
				uni.navigateTo({
					url:'./building?title='+e
				})
			},
			gylclk(e){
				if (uni.getStorageSync('token')!=''){
					if (e.type == 1) {
						uni.navigateTo({
							url: "../common/goodsDetail?id=" + e.content,
						});
					}
					if (e.type == 2) {
						uni.navigateTo({
							url: "../common/shopHome?id=" + e.content,
						});
					}
					if (e.type==3){
						if(this.userinfo.is_supplier==1&&this.userinfo.supplier_status==2){
							uni.navigateTo({
								url:"../supplyChain/index"
							})
						}else{
							uni.showToast({
								title:'您不是正在经营中商家，无法使用供应链系统',
								icon:'none'
							})
						}
					
					}
					if (e.type == 4) {
						uni.navigateTo({
							url: "/pages/index/nearShop?lat=" + this.lat + "&lng=" + this.lng,
						});
					}
				}else{
					uni.showToast({
						title:'您还未登陆，请先登陆',
						icon:'none'
					})
				}

			},
		getUserInfo() {
			let self = this
			self.request({
				url: 'ugo/api/mall.php?c=getUserInfo',
				data: {
					token: uni.getStorageSync('token'),
				}
			}).then(res => {
				if (res.data.success) {
					// self.showlogin = true;
					self.userinfo = res.data.data;
					uni.setStorageSync('rank', self.userinfo.rank)
					if (self.userinfo.head_img.split('http').length != 2) {
						self.userinfo.head_img = self.cdnUrl + self.userinfo.head_img
					}
					if (self.userinfo.phone != 0) {
						// 正则表达式手机号隐藏中间4位
						if (self.userinfo.phone) {
							self.userinfo.phone = self.userinfo.phone.replace(/^(\d{3})\d{4}(\d+)/,
							'$1****$2');
						}
					} else {
						self.userinfo.phone = ''
					}
				} else {
					// self.showlogin = false;
					self.holo.toast({
						icon: 'none',
						title: res.data.msg
					})
		
				}
			}, rej => {
				console.log(rej);
			})
		},
			closeMask(){
				this.isMaskShow=false
				this.toptip=1
			},
			//进签到页
				toSignIn(){
					if (uni.getStorageSync('token') == ''){
						uni.showToast({
							title:'您还未登陆，请先登陆',
							icon:'none',
							duration:1000
						})
						setTimeout(function(){
							uni.switchTab({
								url:'../my/my'
							})
						},1000)
					}else{
						uni.navigateTo({
							url:'../pointsMall/index?type=1'
						})
					}
			
				},
			//进积分商城
				toScoreMall(){
					if (uni.getStorageSync('token') == ''){
						uni.showToast({
							title:'您还未登陆，请先登陆',
							icon:'none'
						})
					setTimeout(function(){
						uni.switchTab({
							url:'../my/my'
						})
					},1000)
					}else{
					uni.navigateTo({
						url:'../pointsMall/exchangeshop'
					})
					}
				}
		},
		onReachBottom() {
			console.log(this.page)
			console.log(this.pageCount)
			if (this.page<this.pageCount){
				this.page++
				this.init()
			}
		},
	};
</script>

<style>
/* 	page{
		height: 100%;
	} */
</style>
<style lang="scss">
	.index {
		padding-top: 96rpx;
		position: relative;
		height: 100%;
		box-sizing: border-box;
	}

	.search {
		width: 100%;
		height: 98rpx;
		display: flex;
		padding: 0 30rpx;
		box-sizing: border-box;
		align-items: center;
		// background: linear-gradient(180deg, #FC5A4F 0%, #F52F21 100%);
		background-color: #f63b42;
		position: fixed;
		top: 0rpx;
		left: 0;
		z-index: 333;

		.left {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;
			text-align: center;
			display: flex;
			align-items: center;
			image {
				width: 18rpx;
				height: 11rpx;
				vertical-align: middle;
				margin: 8rpx 10rpx 0 5rpx;
			}
		}

		.right {
			width: 458rpx;
			height: 60rpx;
			line-height: 60rpx;
			position: relative;
			background-color: #fff;
			border-radius: 30rpx;
			margin-left: 20rpx;
			padding-left: 80rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			color: #7e7e7e;

			.searchImg {
				width: 80rpx;
				height: 100%;
				line-height: 70rpx;
				text-align: center;
				position: absolute;
				top: 0;
				left: 0;

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}

		.message {
			position: absolute;
			top: 32rpx;
			right: 30rpx;

			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}

	.topSearch {
		position: relative;
		width: 100%;
		height: 73rpx;
		line-height: 73rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 300;
		color: #b1b1b1;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		view {
			padding: 0 13rpx;
			display: inline-block;
		}
		
		.classify {
			position: absolute;
			top: 0;
			right: 30rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			color: #f63b42;
			padding: 0;
			display: flex;
			align-items: center;
			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}
	}

	.banner {
		width: 100%;
		height: 300rpx;

		.swiper {
			width: 100%;
			height: 300rpx;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

	.hostSale {
		width: 702rpx;
		height: 222rpx;
		margin: auto;
		margin-top: 40rpx;

		.swiper {
			width: 100%;
			height: 222rpx;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

	.classify {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.class_con {
			width: 120rpx;
			text-align: center;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #4d4d4d;
			
			.class_image {
				width: 85rpx;
				height: 85rpx;
				border-radius: 50%;
				margin: auto;
				margin-top: 30rpx;
				margin-bottom: 20rpx;
				image {
					width: 85rpx;
					height: 85rpx;
					border-radius: 50%;
					
				}
			}
		}
	}

	.news {
		width: 690rpx;
		height: 70rpx;
		margin: 0 30rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		align-items: center;

		.news_img {
			width: 60rpx;
			height: 40rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.news_word {
			flex: 1;
			padding-right: 20rpx;
			swiper {
				height: 70rpx;
				.word {
					height: 70rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 26rpx;
					line-height: 75rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #f63b42;
				}
			}
		}
		.more {
			height: 70rpx;
			line-height: 70rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			color: #999;
			display:flex;
			align-items: center;
			image {
				width: 28rpx;
				height: 28rpx;
				padding-top: 5rpx;
			}
		}
	}

	.limitTime {
		display: flex;
		justify-content: space-between;
		.limit_top {
			width: 370rpx;
			height: 346rpx;
			background: #ffffff;
			box-shadow: 0px 0px 24rpx rgba(87, 114, 149, 0.16);
			border-radius: 12rpx;

			.title {
				display: flex;
				align-items: center;
				width: 370rpx;
				height: 88rpx;
				background: linear-gradient(360deg,
					#ff7d92 0%,
					#e3131a 52%,
					#ff7d92 100%);
				border-radius: 12rpx;
				position: relative;

				.word {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #fff;
					margin-left: 24rpx;
				}

				image {
					position: absolute;
					bottom: 0;
					right: 0;
				}

				.img {
					width: 64rpx;
					height: 100%;
				}

				.img1 {
					width: 80rpx;
					height: 100%;
				}

				.word1 {
					display: felx;
					align-items: center;
					image {
						width: 100rpx;
						height: 72rpx;
						right: 50rpx;
						z-index: 222;
					}

					.title {
						margin-right: 10upx;
					}

					.custom {
						display: flex;
						color: #fff;
						margin-left: 60rpx;
					}

					.custom :nth-child(odd) {
						background-color: #fff;
						padding: 4rpx 4rpx;
						color: #a78708;
						border-radius: 10rpx;
						text-align: center;
					}

					.custom :nth-child(even) {
						padding: 0 10rpx;
					}
				}
			}

			.goods {
				display: flex;

				// justify-content: center;
				.goods_con {
					width: 50%;
					margin-top: 15rpx;

					.class_image {
						width: 120rpx;
						height: 120rpx;
						margin: auto;

						image {
							width: 100%;
							height: 100%;
							margin-bottom: 20rpx;
						}
					}
				}

				.price {
					font-size: 26rpx;
					color: #f83023;
					font-weight: 500;
					text-align: center;
					margin: 20rpx 0 4rpx;
				}

				.price1 {
					font-size: 20rpx;
					color: #c9c9c9;
					font-weight: 400;
					text-align: center;
					text-decoration: line-through;
				}
			}
		}
	}

	.nearShops {
		padding: 0 24rpx;
		background-color: #fff;
		position: sticky;
		top: 88rpx;
		z-index: 800;

		.title {
			width: 100%;
			margin: 24rpx 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.word {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				display: flex;
				align-items: center;
				image {
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle;
				}
			}
			.word1 {
				font-size: 26rpx;
				font-family: PingFang SC;
				color: #999;
				display:flex;
				align-items: center;
				image {
					width: 28rpx;
					height: 28rpx;
					padding-top: 5rpx;
				}
			}
		}

		.con {
			display: flex;

			.con_detail {
				width: 164rpx;
				background: #f63b42;
				box-shadow: 0px 0px 24rpx rgba(87, 114, 149, 0.16);
				border-radius: 12rpx 12rpx 0 0;
				margin-right: 15rpx;

				image {
					width: 164rpx;
					height: 164rpx;
					border-radius: 12rpx;
					background-color: #fff;
				}

				.name {
					padding: 0 10rpx;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fefefe;
				}

				.distance {
					font-size: 16rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fff;
					margin-bottom: 5rpx;

					image {
						width: 24rpx;
						height: 24rpx;
						vertical-align: middle;
						margin: 0 10rpx 0 14rpx;
						background-color: rgba(0, 0, 0, 0);
					}
				}
			}
		}
	}

	.recommend {
		padding: 30rpx 24rpx 0;
		.recommend_tit {
			width: 100%;
			margin: 24rpx 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.word {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				display: flex;
				align-items: center;
				image {
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle;
				}
			}

			.word1 {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999;

				image {
					width: 24rpx;
					height: 24rpx;
					vertical-align: middle;
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
				height: 640rpx;
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
					// height: 70rpx;
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
					padding: 0;
					display: flex;

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
				}

				.price {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 63, 63, 1);
					margin-left: 16rpx;
					// text {
					// 	margin-left: 20rpx;
					// 	font-size: 22rpx;
					// 	font-family: PingFang SC;
					// 	font-weight: 400;
					// 	color: rgba(153, 153, 153, 1);
					// 	text-decoration: line-through;
					// }
				}

				.shop {
					// width: 310rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: #f63b42;
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
							color: #cfcfcf;
						}
					}
				}
			}
		}
	}

	.allClass {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 170rpx;
		left: 0;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 22233333;

		.allClassify {
			box-sizing: border-box;
			background-color: #fff;

			.con {
				padding: 20rpx 30rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				view {
					width: 200rpx;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					background: #ffffff;
					border: 1rpx solid #cccccc;
					border-radius: 4rpx;
					margin-bottom: 30rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.cur {
					background: rgba(252, 73, 80, 0.3);
					border: 1rpx solid #fc4950;
				}
			}

			.sure {
				width: 100%;
				height: 90rpx;
				background: #fc4950;
				line-height: 90rpx;
				text-align: center;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}
		}
	}
	//4月26
	.sortClass{
		font-size: 23rpx;
		
	}
	.topTip{
		font-size: 26rpx;
		color: #FFFFFF;
		
		width: 129rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		z-index: 99999999;
		background: #FD8D88;
		border-radius: 0rpx 25rpx 25rpx 0rpx;
		image{
			width: 20rpx;
			height: 20rpx;
		}
		line-height: 50rpx;
	}
	.tipbox{
		align-items: center;
		z-index: 99999999;
		top: 65rpx;
		position: absolute;
		width: 400rpx;
		// height: 400rpx;
		background: #FFFFFF;
		border-radius: 0rpx 6rpx 6rpx 0rpx;
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		
		
	}
	.tipbox-item{
		width: 160rpx;
		height: 50rpx;
		border: 1rpx solid #CCCCCC;
		border-radius: 6rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		color: #666666;
		margin-left: 16rpx;
 		text-align: center;
	}
	.tipbox-item1{
		
		width: 160rpx;
		height: 50rpx;
		background-color:  #FFEFF0;;
		border: 1rpx solid #CCCCCC;
		border-radius: 6rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		color: #F2343B;
		margin-left: 16rpx;
		text-align: center;
	}
	.StockUp{
		width: 707rpx;
		height: 202rpx;
		margin-left: 21rpx;
		margin-top: 20rpx;
		image{
			width: 100%;
			height: 100%;
			
		}
	}
	
	.mask{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background:rgba(0, 0, 0, 0.6);
		font-weight: 400;
		z-index: 10000;
		display: flex;
		justify-content: center;
	}
	.signIn-box{
		
		image{
			width: 330rpx;
			height: 160rpx;
			margin-left: 30rpx;
			margin-top: 7rpx;
		}
	}
</style>
