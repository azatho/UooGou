<template>
	<view class="goods">
		<view class="top" :style="{'background':showBgc?'#fff':''}">
			<view v-if="goHome" class="arrow" @click="goBack">
				<image src="/static/homes.png" style="width: 36rpx;height:36rpx;"></image>
			</view>
			<!-- <view class="share">
				<image src="/static/share1.png"></image>
			</view> -->
		</view>
		<view class="banner">
			<view class="topImg" style="750rpx">
				<!-- <view :class="current==0?'change':'change1'" v-if="changeBtn.length==2">
					<block v-for="(item,i) in changeBtn" :key="i">
						<view :class="i==currentChange?'selected':''" @click="getChange(item.index)">{{ item.name }}</view>
					</block>
				</view>
				<view :class="current==0?'change':'change1'" v-else>
					<view class="selected" >{{ changeBtn[0].name }}</view>
				</view> -->
				<!-- <view v-if="showVideo" class="video">
					<video :src="cdnUrl+seckillInfo.goods_video" :poster="cdnUrl+seckillInfo.goods_video_cover" object-fit="fill" :controls="controls"></video>
				</view> -->
				<swiper class="banner_img" :autoplay="autoplay" :interval="interval" :duration="duration" circular="true" @change="changeVideo">
					<swiper-item class="video" v-if="seckillInfo.goods_video!=''">
						<video id="myVideo" :enable-progress-gesture="false" @play="play" @pause="stop" :src="cdnUrl + seckillInfo.goods_video"
						 :poster="cdnUrl + seckillInfo.goods_video_cover" object-fit="fill" :controls="controls" :duration="videoOften"
						 x5-playsinline="true" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" x5-video-orientation="portraint"
						 style="object-fit: contain;"></video>
					</swiper-item>
					<block v-for="(item,i) in seckillInfo.goods_album" :key="i">
						<swiper-item>
							<view class="swiper-item">
								<image :src="cdnUrl+item"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<!-- <view v-if="showImg" :class="current==0?'total':'total1'">共{{ seckillInfo.goods_album.length }}张</view> -->
			</view>
			<view class="timer" v-if="current==0">
				<view class="">
					秒杀剩余：
				</view>
				<countdown-timer ref="countdown" :time="time" @finish="onFinish" autoStart>
					<view style="font-size: 26rpx;">
						<text style="background: #FF0000;color: #fff;display: inline-block;padding: 2rpx 20rpx;margin: 0 10rpx;">{{day}}</text>
						天
						<text style="background: #FF0000;color: #fff;display: inline-block;padding: 2rpx 20rpx;margin: 0 10rpx;">{{hour}}</text>时
						<text style="background: #FF0000;color: #fff;display: inline-block;padding: 2rpx 20rpx;margin: 0 10rpx;">{{minute}}</text>分开始</view>
				</countdown-timer>
				<view style="margin-left: 20rpx;font-size: 26rpx;">
					秒杀价￥{{seckillInfo.skill_price/100}}
				</view>
				<!-- 	<view class="">
					{{seckillInfo.skill_text}}
				</view> -->
			</view>
		</view>
		<view class="seckill" v-if="current==1">
			<view class="left">
				<view class="price">
					￥{{seckillInfo.skill_price/100?seckillInfo.skill_price/100:'0'}}
				</view>
				<view class="price1">
					<text class="txt">限时秒杀</text><text class="txt1">￥{{seckillInfo.goods_cost/100?seckillInfo.goods_cost/100:'0'}}</text>
				</view>
			</view>
			<view class="right">
				<view class="">
					距离结束
				</view>
				<view class="">
					{{end_time}}
				</view>
			</view>
		</view>

		<view class="goodsTitle">
			<view class="title">
				{{seckillInfo.goods_name}}
			</view>

			<view class="btns" v-if="current==0">
				<view class="price">
					<text class="txt">￥</text><text class="txt1">{{seckillInfo.goods_cost/100}}</text> <text class="txt2">￥{{seckillInfo.goods_price/100}}</text>
				</view>
			<!-- 	<view class="collect" :style="seckillInfo.yet_collect==0?'border:1px solid #fd484f;color:#fd484f' : 'border:1px solid #aaa;color:#aaa;'"
				 @click="collect(seckillInfo.yet_collect)">
					<image v-if="seckillInfo.yet_collect==0" src="/static/collectStar.png" mode=""></image>
					{{seckillInfo.yet_collect==0?'收藏':'已收藏'}}
				</view> -->
			</view>
		</view>
		<view class="commonBgc"></view>
		<view class="base_msg">
			<view class="choose" @click="getParameter" v-if="seckillInfo.goods_text">
				<view style="display:flex;flex: 1;">
					<view style="margin-right: 30rpx;color: #333333;width:60rpx">参数</view>
					<view style="color: #999999;flex:1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{seckillInfo.goods_text?seckillInfo.goods_text:'暂无'}}</view>
				</view>
				<view class="right_img">
					<image src="../../static/back.png"></image>
				</view>
			</view>
			<view class="choose" @click="getSpacs(0)">
				<view style="display:flex;flex: 1;">
					<view style="margin-right: 30rpx;color: #333333;">选择</view>
					<view style="color: #999999;">规格</view>
				</view>
				<view class="right_img">
					<image src="../../static/back.png"></image>
				</view>
			</view>
		</view>
		<view class="commonBgc"></view>
		<view class="shopMsg">
			<view class="left" @click="getHome(supplier_info.supplier_id)">
				<image src="../../static/case.png" class="case"></image>
				{{supplier_info.supplier_name}}
				<image src="../../static/back1.png" class="image"></image>
			</view>
			<view class="right" @click="getPhone(supplier_info.supplier_phone)">
				<image src="../../static/tel.png"></image>
				联系商家
			</view>
		</view>
		<view>
			<view class="img" v-for="(item,i) in seckillInfo.goods_introduce" :key="i">
				<image :src="cdnUrl+item" mode="widthFix"></image>
			</view>
		</view>


		<view class="addGoods">
			<!-- <view class="" v-if="seckillInfo.cartCount==0">
				<image src="../../static/addcar1.png" class="carImg">
				</image>
				<view class="word">
					购物车是空的
				</view>
				<view class="account1">
					去结算
				</view>
			</view> -->
			<!-- <image src="../../static/addcar.png" mode="" class="carImg">
					<view class="totalNum">{{seckillInfo.cartCount}}</view>
				</image> -->
			<!-- <view class="word">
					<text class="price">￥129</text>
					<text class="price1">￥122</text>
				</view> -->
				
				<view class="collect" 
				 @click="collect(seckillInfo.yet_collect)">
				 <view class="">
				 	<image v-if="seckillInfo.yet_collect==0" src="/static/collectStar.png" mode=""></image>
					<image v-else src="/static/mycollect.png" mode=""></image>
				 </view>
					<view :style="seckillInfo.yet_collect==0? 'color:#FD484F' : 'color:#828282'">
						{{seckillInfo.yet_collect==0?'收藏':'已收藏'}}
					</view>
					
				</view>
			<view class="account1" v-if="current==0">
				加入购物车
			</view>
			<view class="account" @click="getSpacs" v-else>
				加入购物车
			</view>
		</view>

		<!-- 产品参数 -->
		<view class="common" v-if="showParameter">
			<view class="common_con">
				<uni-icons type="closeempty" size="30" class="close" @click="close" color="#999999"></uni-icons>
				<view class="common_tit">
					产品参数
				</view>
				<block v-if="goods_texts.length!=0">
					<view class="intro" v-for="(item,i) in goods_texts" :key="i">
						<view class="left1">
							{{item.name}}
						</view>
						<view class="right2">
							{{item.val}}
						</view>
					</view>
				</block>
				<view style="text-align: center;margin-top: 20px;color: #ccc;" v-else>
					暂无参数信息
				</view>
			</view>
		</view>

		<!-- 规格弹窗 -->
		<view class="common" v-if="specsModel">
			<view class="common_con1">
				<uni-icons type="closeempty" size="30" class="close" @click="close" color="#999999"></uni-icons>
				<view class="spacs_img">
					<view class="img">
						<image :src="cdnUrl+sku.sku_pic" mode=""></image>
					</view>
					<view class="">
						<view class="price">￥<text class="text1">{{seckillInfo.skill_price/100}}</text><text class="text2">￥{{sku.sku_cost_price/100}}</text></view>
						<view>
							<view class="choose">已选：{{sku.sku_name}}</view>
							<view class="rest">剩余库存：{{seckillInfo.surplus}}</view>
						</view>
					</view>
				</view>
				<!-- <view v-if="sku.length!=0">
					<view class="spacs_info">
						<view class="spacs_tit">
							{{sku.sku_name}}
						</view>
						<view class="options" >
							<block v-for="(items,k) in item.list" :key="k">
								<view :class="items.flag?'option':''" @click="getPrice(item.sku_index,items.sku_index,i,k)">
									{{items.sku_name}}
								</view>
							</block>
						</view>
					</view>
				</view> -->
				<view v-if="sku.sku_name!='无'">
					<view class="spacs_info">
						<view class="spacs_tit">
							{{sku_spacs[0]}}
						</view>
						<view class="options">
							<view class="option">
								{{sku_spacs[1]}}
							</view>
						</view>
					</view>
				</view>
				<view class="" v-else>
					<view class="spacs_info">
						<view class="spacs_tit">
							规格
						</view>
						<view class="options">
							<view class="option">
								无规格
							</view>
						</view>
					</view>
				</view>
				<view class="sure_num">
					<view class="buy_num">
						<view class="">购买数量</view>
						<view class="num">
							<image src="../../static/desc.png" @click="descCount"></image>
							<text>{{goods_count}}</text>
							<image src="../../static/add.png" @click="addCount"></image>
						</view>
					</view>
					<view class="sure" @click="incar" v-if="current==1">
						加入购物车
					</view>
					<view class="sure1" v-if="current==0">
						加入购物车
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		jweixin
	} from '../../until/jweixin.js'
	export default {
		data() {
			return {
				cdnUrl: '',
				controls: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				currentChange: '0',
				showVideo: true,
				videoOften: 0,
				day: 0,
				hour: 0,
				minute: 0,
				showImg: false,
				changeBtn: [{
						index: '0',
						name: '视频'
					},
					{
						index: '1',
						name: '图片'
					}
				],
				current: '', //判断是进行中还是未开始 0未开始 1抢购中
				skill_goods_id: '', //抢购商品id
				showBgc: false,
				goods_texts: [], //参数信息
				stars: [{
						icon: '../../static/star.png',
						icon1: '../../static/star1.png',
						flag: false
					},
					{
						icon: '../../static/star.png',
						icon1: '../../static/star1.png',
						flag: false
					},
					{
						icon: '../../static/star.png',
						icon1: '../../static/star1.png',
						flag: false
					},
					{
						icon: '../../static/star.png',
						icon1: '../../static/star1.png',
						flag: false
					},
					{
						icon: '../../static/star.png',
						icon1: '../../static/star1.png',
						flag: false
					}
				], //评价星星
				evaluateInfo: {}, //评价
				showEvaluate: false, //是否显示评价
				showParameter: false, //是否显示参数弹框
				flag: false, //收藏与否
				seckillInfo: {}, //全部信息
				supplier_info: {}, //店铺信息
				specsModel: false, //规格弹窗
				sku: [], //规格信息
				feeModel: false, //配送费弹窗
				parameterModel: false, //参数弹窗
				goods_price: '', //商品价格
				sku_stock: '', //库存
				sku_spacs: '', //规格
				skuIndex: '',
				base_price: '', //配送费
				goods_count: '1', //购买数量
				goods_index: '', //收藏时传的商品id
				start_time: '', //倒计时时间
				end_time: '',
				limit_num: '', //限购数量
				videoContext: null,
				goHome: false,
				goods_name: '',
				goods_album: '',
			}
		},
		onReady(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			//当视频暂停时可以轮播  
			changeVideo(e) {
				if (e.detail.current != 0) {
					this.videoContext.pause()
					this.autoplay = true
				}
			},
			//点击视频暂停轮播
			getVideo() {
				this.autoplay = false
			},
			goBack() {
				window.location.href = this.$baseUrl + 'loveUgo/#/'
			},
			//切换视频图片
			// getChange(e){
			//     var index=e
			//     if(index==1){
			//       this.currentChange=index,
			//       this.showImg=true,
			//       this.showVideo=false
			//     }else{
			//       this.currentChange=index,
			//       this.showImg=false,
			//       this.showVideo=true
			//     }
			//  },
			//打开参数弹框
			getParameter() {
				this.showParameter = true
			},
			//关闭参数弹框
			close() {
				this.showParameter = false
				this.specsModel = false
			},
			getHome(e) {
				uni.navigateTo({
					url: '/pages/common/shopHome?id=' + e
				})
			},
			// 打电话
			getPhone(e) {
				console.log(e);
				let self = this;
				uni.makePhoneCall({
					phoneNumber: e
				})
			},
			// 收藏商品
			collect(e) {
				if (uni.getStorageSync('token')) {
					let self = this
					self.request({
						url: 'ugo/api/app.php?c=goods/addCollect',
						data: {
							data_id: self.goods_index,
							collect_type: '0',
							type: e
						}
					}).then(res => {
						if (res.data.success) {
							self.holo.toast({
								title: res.data.msg
							})
							self.init()
						} else {
							self.holo.toast({
								icon: 'none',
								title: res.data.msg
							})
						}
					})
				} else {
					uni.showModal({
						content: '未登录，请先登录',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								})
							}
						}
					})
				}

			},
			init() {
				let self = this
				var timer = null
				self.request({
					url: 'ugo/api/app.php?c=skill/skillGoodsInfo',
					data: {
						skill_goods_id: self.skill_goods_id
					},
				}).then(res => {
					if (res.data.success) {
						console.log(res.data.data)
						self.seckillInfo = res.data.data //商品详情所有信息
						self.goods_index = res.data.data.goods_index //收藏时传的id
						self.goods_texts = res.data.data.goods_texts //商品参数信息
						self.base_price = res.data.data.supplier_info.base_price //配送费
						self.tuan_list = res.data.data.tuan_list //拼团信息
						self.supplier_info = res.data.data.supplier_info //店铺信息
						self.goods_name = self.seckillInfo.goods_name
						self.goods_album = self.seckillInfo.goods_album[0]
						// self.start_time=self.holo.formatSeconds(res.data.data.start_time)//倒计时时间
						//获取时分秒
						var date = self.seckillInfo.spike_start - new Date().getTime() / 1000;
						if (date > 0) {
							self.day = Math.floor(date / 60 / 60 / 24);
							self.hour = Math.floor(date / 60 / 60 % 24);
							self.minute = Math.floor(date / 60 % 60);
						} else {
							var residue = res.data.data.spike_end - new Date().getTime() / 1000;
							if (residue <= 0) {
								self.end_time = '已结束';
								return;
							}
							self.end_time = self.holo.countdown(residue) //倒计时时间

						}
						self.limit_num = self.seckillInfo.limit_num //秒杀限购数量
						if (res.data.data.score_info.length == 0) {
							self.evaluateInfo = {}
							self.showEvaluate = false
						} else {
							self.showEvaluate = true
							self.evaluateInfo = res.data.data.score_info //评价信息
							self.evaluateInfo.comment_time = this.holo.formatdate(self.evaluateInfo.comment_time * 1000)
							for (var i = 0; i < self.stars.length; i++) {
								if (i < self.evaluateInfo.comment_score / 10) {
									self.stars[i].flag = true
								}
							}
						}
						let audioContext = uni.createInnerAudioContext();
						audioContext.autoplay = false;
						audioContext.src = self.cdnUrl + self.seckillInfo.goods_video;
						audioContext.onCanplay(() => {
							audioContext.duration;
							audioContext.buffered;
							//如果不写上面2行，打印audioContext，duration，buffered都有值，但打印audioContext.duration或audioContext.buffered值为0
							if (audioContext.duration * 1 > 0 || audioContext.buffered * 1 > 0) {
								// 部分iphone手机audioContext.duration 会为为0，所以判断audioContext.duration是否为0
								self.videoOften = audioContext.duration == 0 ? audioContext.buffered : audioContext.duration;
							}
						});
						// //轮播图片视频
						// if(self.seckillInfo.goods_video==''){
						// 	this.showImg=true,
						// 	this.showVideo=false
						// 	this.changeBtn=[{index:'0',name:'图片'}]
						// }else{
						// 	this.showImg=false,
						// 	this.showVideo=true
						// }
						//显示规格
						for (var i = 0; i < res.data.data.goods_sku_price.length; i++) {
							if (res.data.data.skill_sku_index == res.data.data.goods_sku_price[i].sku_index) {
								self.sku = res.data.data.goods_sku_price[i]
								if (self.sku.sku_name != '无') {
									self.sku_spacs = self.sku.sku_name.split(' ')
									console.log(self.sku_spacs)
								}
								self.skuIndex = self.sku.sku_index
							}
						}
					}
				})
			},
			//点击规格
			getSpacs(e) {
				this.specsModel = true;
				this.goods_count = 1
			},
			//选择商品数量
			addCount() {
				// limit_num==0表示不限购
				if (this.limit_num != '0') {
					if (this.goods_count < this.limit_num) {
						this.goods_count++
					} else {
						uni.showToast({
							icon: 'none',
							title: '只能购买这么多哦~'
						})
					}
				} else {
					if (Number(this.goods_count) < Number(this.sku.sku_inventory)) {
						this.goods_count++
					} else {
						uni.showToast({
							icon: 'none',
							title: '库存不足'
						})
					}
				}
			},
			descCount() {
				if (this.goods_count > 1) {
					this.goods_count--
				} else {
					uni.showToast({
						icon: 'none',
						title: '至少选择一个哦~'
					})
				}
			},
			// 提交订单
			// sure_shop() {
			// 	if (uni.getStorageSync('token')) {
			// 		let self = this
			// 		uni.navigateTo({
			// 			url: '/pages/common/confirmOrder?goods_index=' + self.skill_goods_id + '&sku_index=' + self.skuIndex +
			// 				'&goods_count=' + self.goods_count + '&type=' + 'seckill'
			// 		})
			// 	} else {
			// 		uni.showModal({
			// 			content: '未登录，请先登录',
			// 			success: function(res) {
			// 				if (res.confirm) {
			// 					uni.switchTab({
			// 						url: '/pages/my/my'
			// 					})
			// 				}
			// 			}
			// 		})
			// 	}
			// },
			
			incar(){
				this.request({
					url: 'ugo/api/app.php?c=addCart',
					data: {
						goods_index: this.goods_index,
						sku_index: this.skuIndex,
						goods_count: this.goods_count,
						supplier_id: this.supplier_info.supplier_id
					}
				}).then(res => {
					if (res.data.success) {
						// this.getMyCart();
						this.holo.toast({
							title: res.data.msg
						});
						this.specsModel = false;
					} else {
						if (res.data.msg == '登录状态失效，请重新登录~！') {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				});
			},
			// 打开全部评价
			getComment() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/common/comment'
					})
				} else {
					uni.showModal({
						content: '未登录，请先登录',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								})
							}
						}
					})
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
			//分享
			share() {
				let self = this
				jweixin.ready(function() {
					jweixin.onMenuShareAppMessage({
						title: '让购物更简单，让用户更方便。',
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
						title: self.goods_name,
						desc: '让购物更简单，让用户更方便。',
						link: window.location.href + '&share=1', // 分享链接
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
		},
		onLoad(options) {
			if (options.share) {
				this.goHome = true;
			}
			if (options.current == '0') {
				this.current = options.current //0未开始  1正在进行
			} else {
				this.current = '1' //0未开始  1正在进行
			}
			this.skill_goods_id = options.skill_id

			this.cdnUrl = this.$cdnUrl
			this.init()
			console.log(options)
		},
		onShow() {
			this.share();
			this.share1();
			uni.setNavigationBarTitle({
				title: '商品详情'
			})
		},
		// onPageScroll(e){
		// 	if(e.scrollTop>300){
		// 		this.showBgc=true
		// 	}else{
		// 		this.showBgc=false
		// 	}
		// }

	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.goods {
		// height: 100%;
		padding-bottom: 100rpx;

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
					bottom: 120rpx;
					transform: translateX(-50%);
					display: flex;
					z-index: 333;

					view {
						width: 90rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: rgba(153, 153, 153, .3);
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

				.change1 {
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
						background: rgba(153, 153, 153, .3);
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

				.video {
					width: 100%;
					height: 750rpx;
					position: relative;

					video {
						width: 100%;
						height: 100%;
					}
				}

				.banner_img {
					width: 100%;
					height: 750rpx;

					image {
						width: 100%;
						height: 750rpx;
					}
				}

				.total {
					position: absolute;
					bottom: 120rpx;
					right: 30rpx;
					padding: 0 10rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					color: #fff;
					background: rgba(0, 0, 0, .3);
					border-radius: 15rpx;
					font-size: 20rpx;
				}

				.total1 {
					position: absolute;
					bottom: 30rpx;
					right: 30rpx;
					padding: 0 10rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					color: #fff;
					background: rgba(0, 0, 0, .3);
					border-radius: 15rpx;
					font-size: 20rpx;
				}
			}

			.timer {
				width: 100%;
				height: 100rpx;
				justify-content: center;
				display: flex;
				align-items: center;
				background-color: rgba(51, 51, 51, .5);
				position: absolute;
				bottom: 0;
				left: 0;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		.seckill {
			width: 100%;
			height: 100rpx;
			display: flex;

			.left {
				flex: 1;
				background: linear-gradient(30deg, #FD4950, #FF6F60);
				color: #fff;
				padding-left: 50rpx;
				box-sizing: border-box;

				.price {
					font-size: 45rpx;
				}

				.price1 {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;

					.txt {
						display: inline-block;
						padding: 0 5rpx;
						border: 1px solid #FFFFFF;
						border-radius: 20rpx;
					}

					.txt1 {
						text-decoration: line-through;
						margin-left: 10rpx;
					}
				}
			}

			.right {
				width: 185rpx;
				padding-top: 20rpx;
				box-sizing: border-box;
				text-align: center;
				background-color: #333;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
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
					color: #FF1C1C;
					font-size: 24rpx;
				}

				.txt1 {
					font-size: 48rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF1C1C;
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

				

				.addShop {
					width: 220rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background: linear-gradient(30deg, #FD4950, #FF6F60);
					border-radius: 30rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
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
					background: #FFFFFF;
					border: 1rpx solid #999999;
					border-radius: 25rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					color: #333;
				}
			}
		}

		.shopMsg {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			align-items: center;

			.left {
				flex: 1;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				display: flex;
				align-items: center;

				.case {
					width: 38rpx;
					height: 38rpx;
					vertical-align: middle;
					margin-right: 14rpx;
				}

				.image {
					width: 13rpx;
					height: 26rpx;
					margin-left: 10rpx;
				}
			}

			.right {
				height: 80rpx;
				text-align: right;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				display: flex;
				align-items: center;

				image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}
			}
		}

		.img {
			width: 100%;

			image {
				width: 100%;
			}
		}

		.addGoods {
			width: 100%;
			height: 98rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #FFFFFF;
			box-shadow: 0px -1rpx 1rpx 0px rgba(102, 102, 102, 0.19);
			display: flex;
			align-items: center;
			
			
			// .carImg{
			// 	width: 103rpx;
			// 	height: 103rpx;
			// 	position: absolute;
			// 	top: -20rpx;
			// 	left: 30rpx;
			// }
			// .totalNum{
			// 	width: 35rpx;
			// 	height: 35rpx;
			// 	line-height: 35rpx;
			// 	text-align: center;
			// 	color: #fff;
			// 	background: #333333;
			// 	border-radius: 50%;
			// 	position: absolute;
			// 	top: -20rpx;
			// 	left: 100rpx;
			// 	font-size: 18rpx;
			// 	font-family: PingFang SC;
			// }
			.word {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #7A7A7A;
				margin-right: 230rpx;
				float: right;

				.price {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF3F3F;
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
				width: 580rpx;
				height: 80rpx;
				background: linear-gradient(30deg, #FD4950, #FF6F60);
				border-radius: 40rpx;
				color: #fff;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				margin-left: 10rpx;
				
			}

			.account1 {
				width: 582rpx;
				height: 80rpx;
				background: linear-gradient(270deg, #C6C6C6, #E8E8E8);
				box-shadow: 0rpx -1rpx 1rpx 0rpx rgba(102, 102, 102, 0.19);
				border-radius: 40rpx;
				color: #fff;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				margin-left: 10rpx;
				
			}
		}

		.common {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, .5);
			z-index: 22;

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
					background-image: url(../../static/youhui.png);
				}

				.ricket2 {
					background-image: url(../../static/youhui1.png);
				}

				.ricket {
					width: 655rpx;
					height: 210rpx;
					background-size: cover;
					padding: 40rpx 40rpx 20rpx 50rpx;
					box-sizing: border-box;
					margin-bottom: 15rpx;
					font-family: PingFang SC;
					color: #FFFFFF;
					font-weight: bold;
					margin: auto;

					.one {
						display: flex;
						justify-content: space-between;
						font-size: 26rpx;

						.left {
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
								padding-top: 10rpx;
								margin-left: 25rpx;

								.txt4 {
									font-size: 20rpx;
								}
							}
						}

						.right {
							vertical-align: middle;
							padding-top: 30rpx;
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
					background: #FC4950;
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

						.text1 {
							font-size: 30rpx;
						}

						.text2 {
							font-size: 16rpx;
							color: #999;
							margin-left: 10rpx;
							text-decoration: line-through;
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
							border: 1rpx solid #FD635E;
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
						background: #FC4950;
						border-radius: 45rpx;
						font-size: 36rpx;
						font-family: Source Han Sans CN;
						font-weight: 300;
						color: rgba(255, 255, 255, 1);
					}

					.sure1 {
						margin: 30rpx;
						height: 90rpx;
						line-height: 90rpx;
						text-align: center;
						background: linear-gradient(270deg, #C6C6C6, #E8E8E8);
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
	.collect {
		margin-left: 30rpx;
		width: 100rpx;
		height: 80rpx;
		// display: flex;
		// justify-content: center;
		text-align: center;
		font-size: 26rpx;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
</style>
