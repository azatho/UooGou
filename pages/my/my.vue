<template>
	<view>
		<!-- 头部 -->
		<view class="top" v-if="showlogin">
			<image src="../../static/message.png" class="xiaoxi" @click="goinformation()"></image>
			<view class="hang1" @click="setUserInfo">
				<view class="left">
					<view class="img">
						<image :src="userinfo.head_img || userinfo.photo" class="img1"></image>
						<view class="img2" v-if="userinfo.rank==2">服务中心</view>
						<view class="img2" v-else-if="userinfo.rank==3">运营合伙人</view>
						<view class="img2" v-else-if="userinfo.rank==4">城市合伙人</view>
						<view class="img2" v-else>普通会员</view>
					</view>
					<view class="txt">
						<view class="txt1">{{userinfo.name}}</view>
						<view class="txt2">{{userinfo.phone}}</view>
					</view>
				</view>
				<view class="right" @click.stop="goPointsMall(1)">
					<img src="../../static/exchangePayIcon.png" alt="签到图标"
						style="width: 36rpx;height: 36rpx;margin-left: 20rpx;">
					<view class="font-26"
						style="font-weight: 400;height: 48rpx;line-height: 48rpx;margin-left: 20rpx;color: #FEE275;">签到
					</view>
				</view>
			</view>
			<view class="hang2">
				<view class="one" @click="gocollect()">
					<view class="txt1">{{userinfo.collect_goods_count||0}}</view>
					<view class="txt2">收藏商品</view>
				</view>
				<view class="one" @click="goshopcollect()">
					<view class="txt1">{{userinfo.collect_shop_count||0}}</view>
					<view class="txt2">收藏店铺</view>
				</view>
				<view class="one" @click="browsing()">
					<view class="txt1">{{userinfo.user_foot_count||0}}</view>
					<view class="txt2">浏览记录</view>
				</view>
				<view class="one" @click="discounts()">
					<view class="txt1">{{userinfo.user_discount_count||0}}</view>
					<view class="txt2">优惠券</view>
				</view>
			</view>
			<!-- 订单管理 -->
			<view class="integral">
				<view>
					<view style="color: #333333;font-size: 24rpx;">积分余额:</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="color: #333333;
						font-size: 77rpx;
						font-family: Arial;
						margin-top: 10rpx;">{{$returnFloat(userinfo.score)}}</view>
						<view style="color: #F14034;
						border-radius: 25rpx;
						border: 1px solid #F74F43;
						width: 135rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;" @click="goPointsMall(0)">查看</view>
					</view>
				</view>
			</view>
			<view class="indent">
				<view class="one" @click="goallindent(0)">
					<view class="left">订单管理</view>
					<view class="right">
						<text>全部订单</text>
						<image src="../../static/back.png" class="img1"></image>
					</view>
				</view>
				<view class="two">
					<view class="first" @click="goallindent(1)">
						<view class="img1">
							<image src="../../static/qian1.png"></image>
						</view>
						<view class="txt">待支付</view>
					</view>
					<view class="first" @click="goallindent(2)">
						<view class="img1">
							<image src="../../static/qian2.png"></image>
						</view>
						<view class="txt">待发货</view>
					</view>
					<view class="first" @click="goallindent(3)">
						<view class="img1">
							<image src="../../static/qian3.png"></image>
						</view>
						<view class="txt">待收货</view>
					</view>
					<view class="first" @click="goallindent(4)">
						<view class="img1">
							<image src="../../static/qian4.png"></image>
						</view>
						<view class="txt">已完成</view>
					</view>
					<!-- <view class="first" @click="gonoshop()"> -->
					<!-- v-if="userinfo.refund_button==1&&userinfo.barter_button==1 || userinfo.refund_button==0&&userinfo.barter_button==1|| userinfo.refund_button==1&&userinfo.barter_button==0" -->
					<!-- 	<view class="img1">
							<image src="../../static/qian5.png"></image>
						</view>
						<view class="txt">售后</view>
					</view> -->
				</view>
				<view class="three" @click="gogroup()">
					<view class="one" style="margin-top: 25rpx; border-top: 2rpx solid #F5F5F5; padding-top: 10rpx;">
						<view class="left" style="margin-top: 5rpx;">拼团订单</view>
						<view class="right" style="margin-top: 5rpx;">
							<image src="../../static/back.png" class="img1"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="top" v-else>
			<view class="register">
				<view style="font-size: 30rpx;">您还未登陆哦~</view>
				<button class="bttn" @click="goLogin" plain="true">登录</button>
			</view>
		</view>
		<!-- 代理 -->
		<view v-if="showlogin" style="position: relative;top: 195rpx;">
			<view class="agency" v-if="userinfo.rank==2||userinfo.rank==3||userinfo.rank==4" @click="management()">
				<view class="left">
					<image src="../../static/daiguan.png" class="img1"></image>
					<text>管理中心</text>
				</view>
				<view class="right">
					<image src="../../static/back.png"></image>
				</view>
			</view>
			<view class="agency" v-else @click="applyposition()">
				<view class="left">
					<image src="../../static/dai.png" class="img1"></image>
					<text>申请成为合伙人</text>
				</view>
				<view class="right">
					<image src="../../static/back.png"></image>
				</view>
			</view>
		</view>
		<view style="height: 125rpx;" v-if="showlogin"></view>
		<!-- 常用功能 -->
		<view class="feature">
			<view class="txt">常用功能</view>
			<view class="layout">
				<view class="fath" @click="enter()">
					<image src="../../static/case1.png"></image>
					<text>{{userinfo.is_supplier==1?'商户中心':'商户入驻'}}</text>
				</view>
				<view class="fath" @click="supplierEnter()">
					<image src="../../static/gys.png"></image>
					<text>{{userinfo.is_supplier==2?'供应商中心':'供应商入驻'}}</text>
				</view>
				<view class="fath" @click="site()">
					<image src="../../static/myAddressSite.png" style='width:48rpx;height:48rpx'></image>
					<text>地址管理</text>
				</view>
				<view class="fath" @click="register()">
					<image src="../../static/tuisong.png" style='width:48rpx;height:48rpx'></image>
					<text>推广分享</text>
				</view>
				<view class="fath" @click="gocritic()">
					<image src="../../static/myrefund.png" ></image>
					<text>我的评论</text>
				</view>
				<view class="fath" @click="kefu()">
					<image src="../../static/kefu.png"></image>
					<text>在线客服</text>
				</view>
				<view class="fath" @click="aboutUs()">
					<image src="../../static/about.png"></image>
					<text>关于我们</text>
				</view>
				<view class="fath" @click="problem()">
					<image src="../../static/myquestion.png"></image>
					<text>常见问题</text>
				</view>
				<view class="fath" @click="feedback()">
					<image src="../../static/feedback.png"></image>
					<text>意见反馈</text>
				</view>
				<view class="fath" @click="help()">
					<image src="../../static/help.png"></image>
					<text>帮助中心</text>
				</view>
				<view class="fath" @click="newList()">
					<image src="../../static/newList.png"></image>
					<text>新闻公告</text>
				</view>
			</view>
		</view>
		<!-- 底部文字 -->
		<!-- <view class="foot">
			<view>400-8086-828</view>
			<view>http://www.jianyunkeji.cn</view>
			<view>本系统由简云科技提供技术支持</view>
		</view> -->
	</view>
</template>

<script>
	import '../../until/MEIQIA.js'
	export default {
		data() {
			return {
				showlogin: true, //判断是否登录
				userinfo: {
					score: '0'
				}, //用于存放个人信息
				cdnUrl: '', //存放网络图片地址
				// agency: false, //是否是代理
				apply_status: "", //用户审核状态
			};
		},
		methods: {
			// 去新闻列表页
			newList(){
				uni.navigateTo({
					url:"../index/news"
				})
			},
			// 去积分商城
			goPointsMall(e) {
				uni.navigateTo({
					url: "../pointsMall/index?type=" + e
				})
			},
			//判断是否登录
			isLogin() {
				if (uni.getStorageSync('token')) {
					this.showlogin = true;
					this.getUserInfo();
				} else {
					this.showlogin = false;
				}
			},
			//登录
			login(res) {
				console.log(res)
				var self = this;
				this.request({
					url: 'ugo/api/mall.php?c=registerForPhoneCode',
					data: {
						referrer_openid: uni.getStorageSync('referrer_openid'),
						openid: res.openid,
						access_token: res.access_token,
						regiester: 'base'
					}
				}).then(res => {
					if (res.data.cmd === 'no_user') { //判断用户是否注册过
						window.location.href = this.$baseUrl + 'loveUgo/#/pages/my/login'
					} else {
						//注册过直接登录
						if (res.data.success) {
							self.userinfo = res.data.data;
							uni.setStorageSync('token', res.data.data.token);
							this.getUserInfo()
							self.showlogin = true;
							if (self.userinfo.photo.split('http').length != 2) {
								self.userinfo.photo = self.cdnUrl + self.userinfo.photo
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
							self.userinfo.cash = Number(self.userinfo.cash / 100).toFixed(2);
							self.holo.toast({
								icon: 'none',
								title: res.data.msg
							})
						}
					}
				});
			},
			// 获取审核信息
			getApplyInfo() {
				let self = this;
				self.request({
					url: "ugo/api/app.php?c=rank_apply/getApplyInfo",
					data: {}
				}).then(res => {
					if (res.data.success) {
						self.apply_status = res.data.data.apply_status
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			// 获取个人信息
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
			// 到用户个人信息页面
			setUserInfo() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: './userInfo'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 登录
			goLogin() {
				this.getCode('snsapi_base');
			},
			// 消息页面
			goinformation() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: './information'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 收藏商品
			gocollect() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: './collectlist'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 收藏店铺
			goshopcollect() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: './shopcollect'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 浏览记录
			browsing() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: './browsing'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 优惠券
			discounts() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: './discounts'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 到全部订单==>订单列表
			goallindent(e) {
				if (uni.getStorageSync('token')) {
					uni.setStorageSync('type', e)
					uni.switchTab({
						url: '../order/order'
					})
					// console.log(uni.setStorageSync('type'));
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 售后
			gonoshop() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						// url:'./afterSaleList?barter_button='+this.userinfo.barter_button+'&refund_button='+this.userinfo.refund_button
						url: './afterSaleList'
					})
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 到拼团订单页面
			gogroup() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: '../common/ptOrderList'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 申请管理
			applyposition() {
				if (uni.getStorageSync('token') != '') {
					if (this.userinfo.rank == 1) {
						uni.navigateTo({
							url: './applyposition'
						});
					}
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 管理中心
			management() {
				if (uni.getStorageSync('token') != '') {
					if (this.userinfo.rank == 4 || this.userinfo.rank == 3 || this.userinfo.rank == 2) {
						uni.navigateTo({
							url: './management?apply_rank=' + this.userinfo.rank
						});
					}
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 商户入驻
			enter() {
				if (uni.getStorageSync('token') == '') {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
					return
				}
				if (this.userinfo.is_supplier == 2 || this.userinfo.is_supplier == 3&&this.userinfo.supplier_status !=3) {
					if (this.userinfo.supplier_status == 2) {
						uni.showToast({
							title: "您已经是供应商，不可入驻商家",
							icon: 'none',
						})
						return
					} 
					if(this.userinfo.supplier_status == 1){
						uni.showToast({
							title: "您已提交过供应商入驻申请,不可申请入驻商家，请前往供应商中心查看审核进度",
							icon: 'none',
						})
						return
					}
				}
				uni.navigateTo({
					url: './shopEnter'
				});
			},
			// 供应商入驻
			supplierEnter() {
				if (uni.getStorageSync('token') == '') {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
					return
				}
				if (this.userinfo.is_supplier == 3 ) {
					uni.showToast({
						title: "您已经是特殊供应商，不可入驻供应商",
						icon: 'none',
					})
					return
				}
				if (this.userinfo.is_supplier == 1&&this.userinfo.supplier_status !=3) {
					if (this.userinfo.supplier_status == 2) {
						uni.showToast({
							title: "您已经是商家，不可入驻供应商",
							icon: 'none',
						})
						return
					} 
					if(this.userinfo.supplier_status == 1){
						uni.showToast({
							title: "您已提交过商家入驻申请,不可申请入驻供应商，请前往商家中心查看审核进度",
							icon: 'none',
						})
						return
					}
				}
				uni.navigateTo({
					url: './supplier/progressEnter'
				});
			},
			// 地址管理
			site() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: './site'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 推荐分享
			register() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: './registerShar'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 我的评论
			gocritic() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: './critic'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 我的客服
			kefu() {
				_MEIQIA('showPanel');
			},
			// 常见问题页面
			problem() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: './problem'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 意见反馈页面
			feedback() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: './feedback'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 帮助中心页面
			help() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: './help'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
			// 关于我们页面
			aboutUs() {
				if (uni.getStorageSync('token') != '') {
					uni.navigateTo({
						url: './aboutUs'
					});
				} else {
					this.holo.toast({
						icon: 'none',
						title: '未登录，请重新登录'
					})
				}
			},
		},
		onShow() {
			this.cdnUrl = this.$cdnUrl;
			this.isLogin();
			if (this.getUrlCode('code') && !uni.getStorageSync('token')) {
				this.request({
					url: 'ugo/api/mall.php?c=getOpenId',
					data: {
						code: this.getUrlCode('code')
					}
				}).then(res => {
					if (res.data.success) {
						uni.setStorageSync('openId', res.data.data.openid);
						this.login(res.data.data)
					} else {
						this.holo.toast({
							title: res.data.msg
						})
					}
				});
			}
		}
	};
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	/* 头部 */
	.top {
		width: 750rpx;
		height: 430rpx;
		background-image: url(../../static/mybgi.png);
		background-size: cover;
		color: #ffffff;
		position: relative;
	}

	.top .xiaoxi {
		width: 36rpx;
		height: 34rpx;
		position: absolute;
		right: 30rpx;
		top: 40rpx;
	}

	.top .register {
		color: #ffffff;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.top .bttn {
		width: 260rpx;
		height: 60rpx;
		line-height: 55rpx;
		text-align: center;
		border-radius: 50rpx;
		border: 1rpx solid #fff !important;
		color: #ffffff;
		margin-top: 30rpx;
	}

	.top .hang1 {
		margin: 0 0 0 30rpx;
		padding-top: 110rpx;
		display: flex;
		justify-content: space-between;
	}

	.hang1 image {
		width: 100%;
		height: 100%;
	}

	.hang1 .left {
		display: flex;
		justify-content: space-between;
	}

	.hang1 .left .img {
		position: relative;
	}

	.hang1 .left .img1 {
		width: 114rpx;
		height: 114rpx;
		border-radius: 50%;
	}

	.hang1 .left .img2 {
		width: 138rpx;
		height: 35rpx;
		background: #FFFFFF;
		border: 1px solid #FD494F;
		border-radius: 18rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		text-align: center;
		line-height: 35rpx;
		font-weight: 500;
		color: #FD494F;
		position: absolute;
		left: -10rpx;
		top: 90rpx;
	}

	.hang1 .left .txt {
		color: #ffffff;
		font-family: PingFang SC;
		margin-left: 25rpx;
		padding-top: 20rpx;
	}

	.hang1 .txt .txt1 {
		font-size: 34rpx;
		font-weight: 500;
	}

	.hang1 .txt .txt2 {
		font-size: 24rpx;
		font-weight: 400;
	}

	.hang1 .right {
		width: 146rpx;
		height: 48rpx;
		background-color: rgba(48, 48, 48, 0.5);
		/* opacity: 0.5; */
		border-radius: 24rpx 0 0 24rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
	}

	.top .hang2 {
		margin: 40rpx 30rpx 0;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}

	.top .hang2 .one {
		width: 25%;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
	}

	.hang2 .one .txt1 {
		font-size: 40rpx;
	}

	.hang2 .one .txt2 {
		font-size: 24rpx;
	}

	/* 订单管理 */
	.indent {
		position: absolute;
		left: 0;
		top: 600rpx;
		width: 690rpx;
		height: 300rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 15rpx 0rpx rgba(179, 179, 179, 0.4);
		border-radius: 10rpx;
		margin: 0 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.integral {
		position: absolute;
		left: 0;
		top: 400rpx;
		width: 690rpx;
		height: 180rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 15rpx 0rpx rgba(179, 179, 179, 0.4);
		border-radius: 10rpx;
		margin: 0 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.indent image {
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}

	/* 第一行 */
	.indent .one {
		display: flex;
		justify-content: space-between;
		font-family: PingFang SC;
		font-weight: 400;
		font-size: 26rpx;
	}

	.indent .one .left {
		color: #333333;
		font-weight: 500;
	}

	.indent .one .right {
		color: #999999;
		font-size: 24rpx;
	}

	.one .right .img1 {
		width: 14rpx;
		height: 26rpx;
		margin-left: 10rpx;
	}

	/* 第二行 */
	.indent .two {
		display: flex;
		justify-content: space-between;
		margin-top: 35rpx;
	}

	.indent .two .first {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		text-align: center;
	}

	.two .first .img1 {
		width: 44rpx;
		height: 43rpx;
		margin: auto;
	}

	.two .first .txt {
		padding-top: 25rpx;
	}

	/* 成为代理 */
	.agency {
		width: 690rpx;
		height: 100rpx;
		background: url(../../static/dlbgc.png) no-repeat;
		background-size: cover;
		line-height: 100rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		background-color: #3b3b3b;
		margin: 300rpx 30rpx 0;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.agency image {
		width: 100%;
		height: 100%;
	}

	.agency .left {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #f1d3a8;
	}

	.agency .left .img1 {
		width: 44rpx;
		height: 44rpx;
		margin-right: 25rpx;
		vertical-align: middle;
	}

	.agency .right {
		width: 13rpx;
		height: 23rpx;
		vertical-align: middle;
	}

	/* 常用功能 */
	.feature {
		width: 690rpx;
		background: #ffffff;
		border: 1rpx solid #f5f5f5;
		border-radius: 10rpx;
		margin: 93rpx 30rpx 30rpx;
	}

	.feature .txt {
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		margin: 20rpx 0 50rpx 23rpx;
	}

	.feature .layout {
		display: flex;
		flex-wrap: wrap;
	}

	.feature .fath {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		width: 25%;
		padding: 0 !important;
		font-size: 26rpx !important;
		line-height: none !important;
		color: #666 !important;
		margin-bottom: 46rpx;
	}

	.feature .fath image {
		width: 44rpx;
		height: 44rpx;
	}

	.feature .fath text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		height: 66rpx;
		line-height: 66rpx;
	}

	.foot {
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 36rpx;
		margin: 30rpx 0;
	}
</style>
