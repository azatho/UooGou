<template>
	<view class="goods" v-cloak>
		<view class="topBtn" :style="{ background: showBgc ? '#fff' : '' }">
			<view v-if="goHome" class="arrow" @click="goBack"><image src="/static/homes.png" style="width: 36rpx;height:36rpx;"></image></view>
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
					<swiper-item class="video" v-if="groupInfo.goods_video != ''">
						<video
							id="myVideo"
							:enable-progress-gesture="false"
							@play="play"
							@pause="stop"
							:src="cdnUrl + groupInfo.goods_video"
							:poster="cdnUrl + groupInfo.goods_video_cover"
							object-fit="fill"
							:controls="controls"
							:duration="videoOften"
							x5-playsinline="true"
							playsinline="true"
							webkit-playsinline="true"
							x-webkit-airplay="true"
							x5-video-orientation="portraint"
							style="object-fit: contain;"
						></video>
					</swiper-item>
					<block v-for="(item, i) in groupInfo.goods_album" :key="i">
						<swiper-item>
							<view class="swiper-item"><image :src="cdnUrl + item"></image></view>
						</swiper-item>
					</block>
				</swiper>
				<!-- <view v-if="showImg" class="total">共{{ groupInfo.goods_album.length }}张</view> -->
			</view>
		</view>

		<view class="goodsTitle">
			<view class="price">
				<text class="txt">￥</text>
				<text class="txt1">{{ groupInfo.group_price / 100 ? groupInfo.group_price / 100 : '0' }}</text>
				<text class="txt2">{{ groupInfo.goods_cost / 100 ? groupInfo.goods_cost / 100 : '0' }}</text>
			</view>
			<view class="title">
				<text>拼团</text>
				{{ groupInfo.goods_name }}
			</view>
		</view>
		<view class="commonBgc"></view>
		<view class="base_msg">
			<view class="choose" @click="getParameter" v-if="groupInfo.goods_text">
				<view style="display:flex;flex: 1;">
					<view style="margin-right: 30rpx;color: #333333;width:60rpx">参数</view>
					<view style="color: #999999;flex:1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
						{{ groupInfo.goods_text ? groupInfo.goods_text : '暂无' }}
					</view>
				</view>
				<view class="right_img"><image src="../../static/back.png"></image></view>
			</view>
		</view>
		<view class="base_msg">
			<view class="choose" @click="getSpacs(2)">
				<view style="display:flex;flex: 1">
					<view style="margin-right: 30rpx;color: #333333;">选择</view>
					<view style="color: #999999;flex:1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ skuValue }}</view>
				</view>
				<view class="right_img"><image src="../../static/back.png"></image></view>
			</view>
		</view>
		<view class="commonBgc"></view>
		<view class="base_msg">
			<view class="choose">
				<view style="display:flex">
					<text style="color: #333;font-size: 30rpx;font-weight: 500;" v-if="groupInfo.tuan_count == 0">{{ groupInfo.tuan_count }}人在拼团，请直接发起拼团</text>
					<text style="color: #333;font-size: 30rpx;font-weight: 500;" v-else>{{ groupInfo.tuan_count }}人已发起拼团可直接参与</text>
				</view>
				<view class="right_img1" style="color: #999;font-size: 24rpx;" @click="lookMore" v-if="groupInfo.tuan_count != 0">查看更多>></view>
			</view>
			<view class="none" v-if="groupInfo.tuan_count == 0">暂时无人拼团</view>
			<view :class="[tuan_list.length == 1 ? 'scroll' : 'scrolll']" v-else>
				<scroll-view scroll-y="true" class="scroll-Y">
					<block v-for="(item, i) in tuan_list" :key="i">
						<view class="demo" @click="goJoin(item.tuan_id)">
							<view class=""><image :src="cdnUrl + item.photo" mode=""></image></view>
							<view class="name">{{ item.name }}</view>
							<view class="time">
								<view class="num">还差{{ item.num }}人拼成</view>
								<view class="resetTime">
									<!-- {{item.surplus_time}} -->
									<countdown :leftTime="item.surplus_time" endTime="2020-12-4 00:00:00" />
								</view>
							</view>
							<view class="btn">去拼单</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<view class="commonBgc"></view>
		<view class="shopMsg">
			<view class="left" @click="goShopDetail(supplier_info.supplier_id)">
				<image src="../../static/case.png" class="case"></image>
				{{ supplier_info.supplier_name }}
				<image src="../../static/back1.png" class="image"></image>
			</view>
			<view class="right" @click="getLink(supplier_info.supplier_phone)">
				<image src="../../static/tel.png"></image>
				联系商家
			</view>
		</view>
		<view>
			<view class="img" v-for="(item, i) in groupInfo.goods_introduce" :key="item"><image :src="cdnUrl + item" mode="widthFix"></image></view>
		</view>

		<view class="common" v-if="specsModel">
			<view class="common_con1">
				<uni-icons type="closeempty" size="30" class="close" @click="close" color="#999999"></uni-icons>
				<view class="spacs_img">
					<view class="img"><image :src="cdnUrl + sku.sku_pic" mode=""></image></view>
					<view class="" style="flex:1">
						<view class="sku_price">
							￥
							<text>{{ btnType == '0' ? groupInfo.goods_cost / 100 : groupInfo.group_price / 100 }}</text>
						</view>
						<view>
							<view class="choose">已选：{{ sku.sku_name }}</view>
							<view class="rest">剩余库存：{{ sku.sku_inventory }}</view>
						</view>
					</view>
				</view>
				<!-- <view class="spacs_info">
					<view class="spacs_tit">
						{{sku_spacs[0]}}
					</view>
					<view class="sku_options">
						<view class="option">
							{{sku_spacs[1]}}
						</view>
					</view>
				</view> -->

				<view v-if="sku.sku_name != '无'">
					<view class="spacs_info">
						<view class="spacs_tit">{{ sku_spacs[0] }}</view>
						<view class="sku_options">
							<view class="option">{{ sku_spacs[1] }}</view>
						</view>
					</view>
				</view>
				<view class="" v-else>
					<view class="spacs_info">
						<view class="spacs_tit">规格</view>
						<view class="sku_options"><view class="option">无规格</view></view>
					</view>
				</view>

				<view class="sure_num">
					<view class="buy_num">
						<view class="">购买数量</view>
						<view class="num">
							<image src="../../static/desc.png" @click="descCount"></image>
							<text>{{ goods_count }}</text>
							<image src="../../static/add.png" @click="addCount"></image>
						</view>
					</view>
					<view class="sure" @click="sure_shop">确定</view>
				</view>
			</view>
		</view>

		<view class="addGoods">
			<view class="collect" @click="getCollect(supplier_info.goods_index)">
				<view class="img"><image :src="flag ? '/static/star.png' : '/static/mycollect.png'" mode=""></image></view>
				{{ flag ? '已收藏' : '收藏' }}
			</view>
			<view class="collect" @click="goCar">
				<view class="img"><image src="/static/car1.png" mode=""></image></view>
				购物车
				<view class="carNum" v-if="groupInfo.cartCount != 0">{{ groupInfo.cartCount }}</view>
			</view>
			<view class="buyBtn" @click="getSpacs(0)">
				<view>￥{{groupInfo.goods_cost/100?groupInfo.goods_cost/100:'0'}}</view>
				<view>单独购买</view>
			</view>
			<view class="make" @click="getSpacs(1)">
				<view>￥{{groupInfo.group_price/100?groupInfo.group_price/100:'0'}}</view>
				<view>发起拼团</view>
			</view>
		</view>

		<view class="commonModel" v-if="showMake">
			<view class="model">
				<view class="title">
					正在拼团
					<view class="close" @click="closeMake">×</view>
				</view>
				<view :class="[tuan_list.length < 3 ? 'scroll1' : 'scrolll1']">
					<scroll-view scroll-y="true" class="scroll-Y">
						<block v-for="(item, i) in tuan_list" :key="i">
							<view class="demo" @click="goJoin(item.tuan_id)">
								<view class=""><image :src="cdnUrl + item.photo" mode=""></image></view>
								<view class="time">
									<view class="num">
										<text class="name">{{ item.name }}</text>
										还差{{ item.num }}人
									</view>
									<view class="resetTime"><countdown :leftTime="item.surplus_time" endTime="2020-12-4 00:00:00" /></view>
								</view>
								<view class="btn">去拼单</view>
							</view>
						</block>
					</scroll-view>
				</view>
			</view>
		</view>

		<view class="commonModel" v-if="showJoin">
			<view class="model">
				<view class="title">
					参加{{ tuanInfo.name }}的拼团
					<view class="close" @click="closeJoin">×</view>
				</view>
				<view class="join_con">
					<view class="number" style="display:flex;justify-content: center;">
						<view class="">仅剩{{ tuanInfo.num }}个名额，</view>
						<countdown :leftTime="tuanInfo.surplus_time" endTime="2020-12-4 00:00:00" />
					</view>
					<view class="photo">
						<view class="imgs">
							<image :src="cdnUrl + tuanInfo.photo" mode=""></image>
							<view class="tip">拼主</view>
						</view>
						<view class="dian"><image src="../../static/dian.png" mode=""></image></view>
						<view class="imgs"><image src="../../static/question.png" mode=""></image></view>
					</view>
					<view class="join_btn" @click="join(tuanInfo.tuan_id)">参与拼团</view>
				</view>
			</view>
		</view>

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
import countdown from '@/components/cz-countdown/cz-countdown.vue';
import { jweixin } from '../../until/jweixin.js';
export default {
	components: { countdown },
	data() {
		return {
			cdnUrl: '',
			controls: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			videoOften: 0,
			currentChange: '0',
			showVideo: true,
			showImg: false,
			changeBtn: [{ index: '0', name: '视频' }, { index: '1', name: '图片' }],
			goods_id: '', //拼团id
			goods_index: '', //商品id
			showBgc: false,
			goods_texts: [], //参数信息
			time: new Date('2020/04/24 01:00:00').getTime() - new Date('2020/04/24 00:20:00').getTime(),
			stars: [
				{ icon: '../../static/star.png', icon1: '../../static/star1.png', flag: false },
				{ icon: '../../static/star.png', icon1: '../../static/star1.png', flag: false },
				{ icon: '../../static/star.png', icon1: '../../static/star1.png', flag: false },
				{ icon: '../../static/star.png', icon1: '../../static/star1.png', flag: false },
				{ icon: '../../static/star.png', icon1: '../../static/star1.png', flag: false }
			], //评价星星
			evaluateInfo: {}, //评价
			showParameter: false, //是否显示参数弹框
			flag: false, //收藏与否
			showMake: false, //正在拼团弹窗
			showJoin: false, //参加谁谁谁的拼团弹窗
			groupInfo: {
				cartCount: 0,
				tuan_count: ''
			},
			tuan_list: [], //拼团列表
			supplier_info: {}, //店铺信息
			specsModel: false, //规格弹窗
			sku: {}, //所有的规格信息
			sku_spacs: [], //默认显示的规格信息
			skuIndex: '', //规格的index
			skuValue: '规格', //反显的规格
			goods_count: 1, //商品数量
			btnType: '', //点击的是发起拼团还是单独购买  0 单独购买  1发起拼团
			base_price: '', //配送费
			tuanInfo: {}, //点击参与拼团的拼主信息
			goHome: false,
			goods_name:'',
			goods_album:'',
			
		};
	},
	methods: {
		//切换视频图片
		getChange(e) {
			var index = e;
			if (index == 1) {
				(this.currentChange = index), (this.showImg = true), (this.showVideo = false);
			} else {
				(this.currentChange = index), (this.showImg = false), (this.showVideo = true);
			}
		},
		goBack() {
			window.location.href = this.$baseUrl + 'loveUgo/#/';
		},
		init() {
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=group/groupGoodsInfo',
				data: {
					id: self.goods_id
				}
			}).then(res => {
				if (res.data.success) {
					self.groupInfo = res.data.data; //商品详情所有信息
					self.goods_index = res.data.data.goods_index; //商品id
					self.goods_texts = res.data.data.goods_texts; //商品参数信息
					self.base_price = res.data.data.supplier_info.base_price; //配送费
					self.evaluateInfo = res.data.data.score_info; //评价信息
					self.tuan_list = res.data.data.tuan_list; //拼团信息
					self.supplier_info = res.data.data.supplier_info; //店铺信息
					self.evaluateInfo.comment_time = this.holo.formatdate(self.evaluateInfo.comment_time * 1000);
					self.goods_name=self.groupInfo.goods_name
					self.goods_album=self.groupInfo.goods_album[0]
					self.share()
					this.share1()
					for (var i = 0; i < self.stars.length; i++) {
						if (i < self.evaluateInfo.comment_score / 10) {
							self.stars[i].flag = true;
						}
					}
					if (self.supplier_info.yet_collect == 0) {
						self.flag = true;
					} else {
						self.flag = false;
					}
					// //轮播图片视频
					// if(self.groupInfo.goods_video==''){
					// 	this.showImg=true,
					// 	this.showVideo=false
					// 	this.changeBtn=[{index:'0',name:'图片'}]
					// }else{
					// 	this.showImg=false,
					// 	this.showVideo=true
					// }

					let audioContext = uni.createInnerAudioContext();
					audioContext.autoplay = false;
					audioContext.src = self.cdnUrl + self.groupInfo.goods_video;
					audioContext.onCanplay(() => {
						audioContext.duration;
						audioContext.buffered;
						//如果不写上面2行，打印audioContext，duration，buffered都有值，但打印audioContext.duration或audioContext.buffered值为0
						if (audioContext.duration * 1 > 0 || audioContext.buffered * 1 > 0) {
							// 部分iphone手机audioContext.duration 会为为0，所以判断audioContext.duration是否为0
							self.videoOften = audioContext.duration == 0 ? audioContext.buffered : audioContext.duration;
						}
					});
					for (var i = 0; i < res.data.data.goods_sku_price.length; i++) {
						if (res.data.data.group_sku_index == res.data.data.goods_sku_price[i].sku_index) {
							self.sku = res.data.data.goods_sku_price[i];
							self.skuIndex = self.sku.sku_index;
							if (self.sku.sku_name != '无') {
								self.sku_spacs = self.sku.sku_name.split(' ');
							}
						}
					}
				}
			});
		},
		// //点击规格
		getSpacs(e) {
			this.btnType = e;
			let self = this;
			if (this.skuValue != '规格' && this.btnType == 1) {
				uni.navigateTo({
					url: '/pages/common/confirmOrder?goods_index=' + self.goods_id + '&sku_index=' + self.skuIndex + '&goods_count=' + self.goods_count + '&type=' + 'group'
				});
			} else {
				this.specsModel = true;
			}
		},

		//选择商品数量
		addCount() {
			if (this.goods_count < this.sku.sku_inventory) {
				this.goods_count++;
			} else {
				uni.showToast({
					icon: 'none',
					title: '库存不足哦~'
				});
			}
		},
		descCount() {
			let self = this;
			if (this.goods_count > 1) {
				this.goods_count--;
			} else {
				uni.showToast({
					icon: 'none',
					title: '至少选填一个'
				});
				uni.showToast({
					title: '提示',
					content: '这是一个模态弹窗',
					success: function(res) {
						self.holo.hideLoding();
						console.log(999);
					},
					fail: function(res) {
						console.log(res);
					}
				});
			}
		},
		// 提交订单或者添加购物车 btnType 0单独购买  1发起拼团
		sure_shop() {
			if (uni.getStorageSync('token')) {
				let self = this;
				if (self.btnType != '2') {
					if (self.sku.sku_inventory == 0) {
						uni.showToast({
							icon: 'none',
							title: '库存不足哦~'
						});
					} else {
						if (self.btnType == '1') {
							uni.navigateTo({
								url:
									'/pages/common/confirmOrder?goods_index=' +
									self.goods_id +
									'&sku_index=' +
									self.skuIndex +
									'&goods_count=' +
									self.goods_count +
									'&type='+'group'
							});
						} else {
							self.request({
								url: 'ugo/api/app.php?c=addCart',
								data: {
									goods_index: self.goods_index,
									sku_index: self.skuIndex,
									goods_count: self.goods_count
								}
							}).then(res => {
								if (res.data.success) {
									uni.showToast({
										title: res.data.msg
									});
									self.init();
									self.specsModel = false;
								}else{
									uni.showToast({
									        title:res.data.message,
									        icon:'none'
									})
								}
							});
						}
					}
				} else {
					this.specsModel = false;
					self.skuValue = self.sku.sku_name;
				}
			} else {
				this.specsModel = false;
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
		//查看评论
		getComment() {
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
		goShopDetail(e) {
			uni.navigateTo({
				url: '../common/shopHome?id=' + e
			});
		},
		getLink(e) {
			uni.makePhoneCall({
				phoneNumber: e //仅为示例
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
		},
		//点击收藏
		getCollect(e,goods_index) {
			if (uni.getStorageSync('token')) {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=goods/addCollect',
					data: {
						data_id: self.goods_index,
						collect_type: '0',
						type: self.flag?1:0
					}
				}).then(res=>{
					if (res.data.success) {
					self.flag = !self.flag;
						uni.showToast({
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
		goCar() {
			uni.switchTab({
				url: '/pages/car/car'
			});
		},
		//打开正在拼团的弹窗
		lookMore() {
			this.showMake = true;
		},
		//关闭正在拼团的弹窗
		closeMake() {
			this.showMake = false;
		},
		//打开参与拼团的弹窗
		goJoin(id) {
			if (uni.getStorageSync('token')) {
				this.showJoin = true;
				this.showMake = false;
				for (var i = 0; i < this.tuan_list.length; i++) {
					if (id == this.tuan_list[i].tuan_id) {
						this.tuanInfo = this.tuan_list[i];
					}
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
		//关闭参与拼团的弹窗
		closeJoin() {
			this.showJoin = false;
		},
		join(e) {
			let self = this;
			if (uni.getStorageSync('token')) {
				uni.navigateTo({
					url:
						'/pages/common/confirmOrder?goods_index=' +
						self.goods_id +
						'&sku_index=' +
						self.skuIndex +
						'&goods_count=' +
						self.goods_count +
						'&type=' +
						'group' +
						'&tuan_id=' +
						e
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
		//分享
		share() {
			let self = this;
			jweixin.ready(function() {
				jweixin.onMenuShareAppMessage({
					title: '让购物更简单，让用户更方便。',
					desc: self.goods_name,
					link: window.location.href + '&share=1', // 分享链接
					imgUrl:self.$cdnUrl+self.goods_album,
					success: function() {},
					fail: function(res) {
						alert(JSON.stringify(res));
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
						self.showShare = false;
					}
				});
			});
		},
		// 分享到朋友圈
		share1(){
			let self = this
			jweixin.ready(function() {
				jweixin.onMenuShareTimeline({
					title: self.goods_name,
					desc:'让购物更简单，让用户更方便。',
					link: window.location.href+'&share=1', // 分享链接
					imgUrl:self.$cdnUrl+self.goods_album,
					success: function () {
					},
					fail: function (res) {
						alert(JSON.stringify(res));
					},
					cancel: function () { 
					    // 用户取消分享后执行的回调函数
						self.showShare=false
					}
				})
			})
		},
	},
	onLoad(options) {
		this.cdnUrl = this.$cdnUrl;
		this.goods_id = options.id;
		uni.setStorageSync('orderType', '0');
		if (options.share) {
			this.goHome = true;
		}
		this.init();
	},
	onShow() {
		this.specsModel = false;
		this.skuValue = '规格';
		// this.share();
		uni.setNavigationBarTitle({
			title: '商品详情'
		})
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
[v-cloak] {
	display: none;
}
.goods {
	padding-bottom: 90rpx;
	.topBtn {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 999999;
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
				z-index: 33;
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
				bottom: 80rpx;
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
		padding: 0 30rpx 30rpx;
		background-color: #fff;
		.title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333;
			text {
				display: inline-block;
				width: 60rpx;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
				background: linear-gradient(30deg, #fd4950, #ff6f60);
				border-radius: 4rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ffffff;
				margin-right: 10rpx;
			}
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
	}

	.base_msg {
		padding: 0 30rpx;
		.choose {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			height: 90rpx;
			line-height: 90rpx;
			.right_img {
				width: 18rpx;
				image {
					width: 18rpx;
					height: 30rpx;
				}
			}
		}
		.scroll {
			height: 122rpx;
		}
		.scrolll {
			height: 242rpx;
		}
		.scroll-Y {
			height: 100%;
			.demo {
				height: 120rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 2rpx solid #f5f5f5;
				image {
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					margin-top: 10rpx;
				}
				.name {
					width: 250rpx;
					margin: 0 10rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.time {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					margin-right: 10rpx;
					.num {
						font-weight: 500;
						color: #e02e24;
					}
					.resetTime {
						color: #333333;
					}
				}
				.btn {
					width: 125rpx;
					height: 55rpx;
					line-height: 55rpx;
					text-align: center;
					background: #fd635e;
					border-radius: 10rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}
		.none {
			border-top: 1rpx solid #f5f5f5;
			text-align: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			height: 160rpx;
			line-height: 160rpx;
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

	.shopMsg {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		align-items: center;
		height: 80rpx;
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
		padding-left: 30rpx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 90rpx;
		background: #ffffff;
		box-shadow: 0px -1rpx 1rpx 0px rgba(102, 102, 102, 0.19);
		display: flex;
		align-items: center;
		.collect {
			width: 100rpx;
			height: 100%;
			text-align: center;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			position: relative;
			.img {
				width: 36rpx;
				height: 36rpx;
				margin: 10rpx auto 5rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.carNum {
				position: absolute;
				top: 5rpx;
				right: 10rpx;
				width: 26rpx;
				height: 26rpx;
				line-height: 26rpx;
				text-align: center;
				background: #ffc600;
				border-radius: 13rpx;
				font-size: 16rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}
		.buyBtn{
					width: 260rpx;
					height: 98rpx;
					text-align: center;
					background: #F49B95;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #fff;
					margin-left: 25rpx;
					padding-top: 10rpx;
					box-sizing: border-box;
				}
		.make{
			width: 260rpx;
			height: 98rpx;
			text-align: center;
			background: linear-gradient(30deg, #FD4950, #FF6F60);
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #fff;
			padding-top: 10rpx;
			box-sizing: border-box;
		}		
	}

	.common {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 2;
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
				margin: 50rpx 0;
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
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
			z-index: 333;
			.close {
				position: absolute;
				right: 30rpx;
				top: 30rpx;
				color: #999999;
			}
			.spacs_img {
				display: flex;
				padding: 30rpx 30rpx 0 30rpx;
				// width:200rpx;
				height: 200rpx;
				.img {
					margin-right: 20rpx;
					width: 200rpx;
					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 10rpx;
					}
				}
				.sku_price {
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
				.sku_options {
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
						border: 1rpx solid#FD635E;
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
					background: #fd635e;
					border-radius: 45rpx;
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: 300;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}

	.commonModel {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 9999;
		.model {
			width: 630rpx;
			background: #ffffff;
			border-radius: 20rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.title {
				padding: 20rpx 50rpx;
				// height: 80rpx;
				// line-height: 86rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				text-align: center;
				border-bottom: 2rpx solid #f5f5f5;
				position: relative;
				.close {
					width: 80rpx;
					height: 86rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 40rpx;
					color: #333;
					position: absolute;
					top: 0;
					right: 0;
				}
			}
			.scroll1 {
				height: 240rpx;
				padding-bottom: 30rpx;
			}
			.scrolll1 {
				height: 480rpx;
				padding-bottom: 30rpx;
			}
			.scroll-Y {
				height: 100%;
				box-sizing: border-box;
				.demo {
					height: 120rpx;
					padding: 0 30rpx;
					display: flex;
					align-items: center;
					border-top: 2rpx solid #f5f5f5;
					image {
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
						margin-top: 10rpx;
						margin-right: 10rpx;
					}

					.time {
						width: 350rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						.name {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-right: 10rpx;
						}
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						margin-right: 10rpx;
						color: #333333;
					}
					.btn {
						width: 140rpx;
						height: 55rpx;
						background: #fc4950;
						border-radius: 28px;
						line-height: 55rpx;
						text-align: center;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
					}
				}
			}
			.join_con {
				padding: 30rpx 0;
				.number {
					font-size: 30rpx;
					text-align: center;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				.photo {
					display: flex;
					height: 120rpx;
					line-height: 120rpx;
					justify-content: center;
					margin: 60rpx 0;
					.imgs {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						position: relative;
						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
						.tip {
							position: absolute;
							top: 10rpx;
							left: -20rpx;
							width: 72rpx;
							height: 30rpx;
							line-height: 30rpx;
							text-align: center;
							background: #fc4950;
							border-radius: 15rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #ffffff;
						}
					}
					.dian {
						width: 32rpx;
						height: 6rpx;
						margin: 0 40rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				.join_btn {
					margin: 20rpx auto 0;
					width: 500rpx;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					background: #fc4950;
					border-radius: 45rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}
	}
}
</style>
