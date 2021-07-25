<template>
	<view class="">
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<view v-if="showAddress" class="address" @click="goAddress" style="background-color: #FFFFFF;">
			<view class="img">
				<image src="../../static/address1.png" mode=""></image>
			</view>
			<view class="right">
				<view class="right_msg">
					{{addressInfo.contacts}}
					<text>{{addressInfo.phone}}</text>
				</view>
				<view class="address_msg">{{addressInfo.full_address}}</view>
				<image src="../../static/back.png" mode=""></image>
			</view>
		</view>
		<view v-else class="noAddress" @click="goAddress" style="font-size: 26rpx;background-color: #FFFFFF;">
			您暂时还没有收货地址,去设置地址
		</view>
<!-- 
		<block v-if="showOrderStatus">
			<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
			<view class="order_status">
				<view class="status">
					<image src="/static/persons.png" mode=""></image>
					订单状态
				</view>
				<view class="pt">
					正在拼团
				</view>
			</view>
		</block> -->
	<!-- 	<block v-else>
			<view class="order_status" @click="showTime">
				<view class="status" style="font-size: 26rpx;">
					预计送达时间
				</view>
				<view class="time">
					<text :class="[serviceTime=='请选择送达时间'?'txt':'']">{{serviceTime}}</text>
					<image src="../../static/back.png" mode=""></image>
				</view>
			</view>
		</block> -->

		<view style="background-color: #f5f5f5;width: 100%;height: 10rpx;"></view>
		<view class="msg">
			<view class="tit">
				<!-- @click="goShop(orderInfo.order_supplier)" -->
				<image src="../../static/case.png" mode=""></image>
				{{goods_info.supplier_name}}
					<span class='tit-tip' v-if='goods_info.supplier_type==0'>社区店</span>
					<span class='tit-tip' v-if='goods_info.supplier_type==1'>供货商</span>
				<!-- <uni-icons type="arrowright" size="22" style="vertical-align: middle;"></uni-icons> -->
			</view>
			<view v-if="jumpType=='car'">
				<view v-for="(item,i) in goods_list" :key="i" class="con">
					<view class="img">
						<image :src="cdnUrl+item.goods_icon" mode=""></image>
					</view>
					<view class="right">
						<view class="right_msg">{{item.goods_name}}</view>
						<view class="norms">{{item.goods_norms?item.goods_norms:'无'}}</view>
						<view class="num">
							<view class="" v-if='goods_info.can_order==1'>
									<text class="text1">￥</text>
									<text class="text2">{{item.goods_type!=0?item.goods_score_price/100:item.goods_cost/100}}</text>
									<text class="text2" v-if="item.goods_type!=0">+{{item.goods_integral/100}}积分</text>
								
							</view>
							<view v-if="goods_info.can_order==0">
								<text class="text1">￥</text>
								<text class="text2">{{item.goods_type==1?item.goods_score_price/100:item.goods_cost/100}}</text>
								<text class="text2" v-if="item.goods_type==1">+{{item.goods_integral/100}}积分</text>
							</view>
							<view class="count">
								<text class="text4">×</text>
								{{item.goods_count?item.goods_count:'暂无'}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="con" v-else>
				<view class="img">
					<image :src="cdnUrl+goods_list.goods_icon" mode=""></image>
				</view>
				<view class="right">
					<view class="right_msg">{{goods_list.goods_name}}</view>
					<view class="norms">{{goods_list.sku_name?goods_list.sku_name:'无'}}</view>
					<view class="num">
						<view class="">
							<text class="text1">￥</text>
							<text class="text2"
								v-if="jumpType=='seckill'">{{goods_list.skill_price/100?goods_list.skill_price/100:'暂无'}}</text>
							<text class="text2"
								v-else>{{goods_list.group_price/100?goods_list.group_price/100:'暂无'}}</text>
						</view>
						<view class="count">
							<text class="text4">×</text>
							{{goods_count?goods_count:'暂无'}}
						</view>
					</view>
				</view>
			</view>

			<!-- </view> -->
			<view class="remark">
				<textarea value="" placeholder="给商家留言（选填）" @input="getContent" />
			</view>
		</view>

		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>

		<view class="base_msg" v-if="jumpType=='car'">
			<view class="msg_con">
				<view class="">商品总价</view>
				<view class="">￥{{goods_info.total_price/100?goods_info.total_price/100:'0'}}</view>
			</view>
			<view class="msg_con" v-if="goods_info.total_score!=0">
				<view class="">积分</view>
				<view class="">{{goods_info.total_score/100?goods_info.total_score/100:'0'}}积分</view>
			</view>
			<view class="msg_con">
				<view class="">配送费</view>
				<view class="">￥{{freight/100}}</view>
			</view>
<!-- 			<view class="msg_con" v-if="goods_info.coupon_one!=0">
				<view class="">优惠券</view>
				<view class="">￥{{goods_info.coupon_one/100}}</view>
			</view> -->
			<view class="msg_con">
				<view class="total">订单总价</view>
				<view class="price">￥{{goods_info.pay_total_price?goods_info.pay_total_price/100+freight/100:'0'}}
					<text class="price" v-if="goods_info.total_score!=0">+{{goods_info.total_score/100}}积分</text>
				</view>

			</view>
		</view>
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<!-- 如果有可获得的积分 才显示 -->
		<view class="getScore-box" v-if="goods_info.send_score">
			<view class="">
				本次订单可获得
			</view>
			<view class="gs-right">
				<image src="../../static/theScoreIcon.png" style="width: 36rpx;height: 36rpx;margin-right: 10rpx;"
					mode=""></image>
				{{goods_info.send_score/100}} 积分
			</view>
		</view>
		
<!-- 
		<view class="base_msg" v-else>
			<view class="msg_con">
				<view class="">商品总价</view>
				<view class="">￥{{goods_info.order_goods_price/100?goods_info.order_goods_price/100:'0'}}</view>
			</view>
			<view class="msg_con">
				<view class="">配送费</view>
				<view class="">￥{{goods_info.base_price/100?goods_info.base_price/100:'0'}}</view>
			</view>
			<view class="msg_con">
				<view class="total">订单总价</view>
				<view class="price">￥{{goods_info.order_total_price/100?goods_info.order_total_price/100:'0'}}</view>
			</view>
		</view> -->
		<view style="background-color: #f5f5f5;width: 100%;height: 156rpx;"></view>
		<view class="sumbit_bgc" v-if="jumpType=='car'">
			<view class="money">
				应付金额：<text>￥{{goods_info.pay_total_price?goods_info.pay_total_price/100+freight/100:'0'}}</text>
				<text v-if="goods_info.total_score!=0">+{{goods_info.total_score/100}}积分</text>
			</view>
			<view class="sumbit" @click="sure">
				提交订单
			</view>
		</view>

		<view class="sumbit_bgc" v-else>
			<view class="money">
				应付金额：<text>￥{{goods_info.order_total_price?goods_info.order_total_price/100+freight/100:'0'}}</text>
				<text v-if="goods_info.total_score">+{{goods_info.total_score/100}}积分</text>
			</view>
			<view class="sumbit" @click="sure">
				提交订单
			</view>
		</view>

<!-- 		<view class="common" v-if="showTimer">
			<view class="common_con">
				<uni-icons type="closeempty" size="30" class="close" @click="closeTime" color="#999999"></uni-icons>
				<view class="common_tit">
					选择预计送达时间
				</view>
				<view class="intro">
					<view class="classify_left">
						<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;">
							<view :class="currentDay==i?'style':'style1'" v-for="(item,i) in days" :key="i"
								@click="getCurrent(i,item.name,item.date)">{{item.name}}</view>
						</scroll-view>
					</view>
					<view class="classify_right">
						<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;">
							<block v-for="(item,i) in times" :key="i">
								<view class="con" @click="getTime(i,item)">
									<view :class="[i==currentTime?'time1':'']">
										{{item}}
									</view>
									<view :class="[i==currentTime?'time1':'']" v-if="total_time.base_price!=0">
										{{total_time.base_price/100}}元配送费
									</view>
									<view :class="[i==currentTime?'time1':'']" v-else>
										免配送费
									</view>
								</view>
							</block>
						</scroll-view>
					</view>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				freight:0,//运费
				cdnUrl: '',
				tuan_id: '', //团id
				master_id: '', //团主键值
				sku_index: '', //规格id
				goods_count: '', //数量
				goods_info: {}, //订单全部信息
				goods_list: {}, //商品信息
				addressInfo: {}, //地址信息
				showAddress: false,
				address_id: '', //收获地址id
				order_remark: '', //订单备注
				express_price: '', //配送费
				orderType: '', //判断是拼团还是普通商品提交的订单
				showTimer: false, //显示送达时间
				days: [],
				currentDay: '0', //选择今天还是明天
				chooseDay: '',
				currentTime: '-1', //选择的日期
				total_time: {}, //总时间数据
				times: [],
				serviceTime: '请选择送达时间',
				total_money: '', //订单总价
				total_price: '', //商品总价
				master_id: '',
				payInfo: {}, //提交订单返回的结果
				cart_index: '', //购物车提交订单时cart_index
				showOrderStatus: false,
				skill_goods_id: '',
				jumpType: '',
				order_index: '', //查询订单支付结果
				promptly_status: '', //送达日期
				promptly_time: '', //送达时间段
				price: '',
				flag: false,
				canOrder: -1,
				opType: "",
				is_can_order:"",//用户积分是否够积分
			}
		},
		methods: {
			// 获取运费
			getAddressMoney(){
				let self =this;
				console.log(self.addressInfo)
				self.request({
					url:"ugo/api/app.php?c=goods/cartExpressV2",
					data:{
						cart_index:self.cart_index,
						address_id:self.address_id,
					}
				}).then(res => {
				        if (res.data.success) {
							self.freight=res.data.data
				        } else {
				                uni.showToast({
				                title: res.message,
				                icon: 'none'
				                })
				        }
				})
			},
			//获取地址
			getAddress() {
				// console.log(111);
				let self = this
				self.request({
					url: "ugo/api/app.php?c=personal/user_address_list",
				}).then(res => {
					if (res.data.data.list.length != 0) {
						// console.log(123);
						for (let i = 0; i < res.data.data.list.length; i++) {
							if (res.data.data.list[i].default_address == '1') {
								self.showAddress = true
								self.addressInfo = res.data.data.list[i]
								self.address_id = res.data.data.list[i].address_id
								self.getAddressMoney()
							}
						}
					} else {
						self.showAddress = false
						self.addressInfo = {}
						self.address_id = ''
					}
				})
			},
			goAddress() {
				uni.navigateTo({
					url: '../my/site'
				})
			},
			//切换天
			getCurrent(e, name, date) {
				this.currentDay = e
				this.chooseDay = name
				this.promptly_status = date
				this.currentTime = '-1'
				if (e == '0') {
					this.times = this.total_time.today
				} else if (e == '1') {
					this.times = this.total_time.tomorrow
				}
			},
			//显示送达时间弹出框
			showTime() {
				this.showTimer = true
				this.currentTime = '-1'
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=order/getTime',
					data: {
						supplier_id: self.goods_info.supplier_id
					}
				}).then(res => {
					if (res.data.success) {
						self.total_time = res.data.data
						self.times = self.total_time.today
						self.days = [{
								name: '今天',
								date: res.data.data.todays
							},
							{
								name: '明天',
								date: res.data.data.tomorrows
							},
						]
						self.chooseDay = self.days[0].name
						self.promptly_status = self.days[0].date
					}
				})

			},
			closeTime() {
				this.showTimer = false
			},
			getTime(e, time) {
				this.currentTime = e
				this.promptly_time = time
				this.serviceTime = this.chooseDay + '：' + time
				this.showTimer = false
			},
			//获取拼团提交的订单信息
			init() {
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=group/getOrderInfo',
					data: {
						id: self.master_id,
						sku_index: self.sku_index,
						goods_count: self.goods_count
					},
				}).then(res => {
					if (res.data.success) {
						self.goods_info = res.data.data;
						self.goods_list = res.data.data.list;
					}
				})
			},
			//获取购物车提交的订单详情
			init1() {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=cartOrderV2',
					data: {
						cart_index: self.cart_index,
						can_order:self.is_can_order
					}
				}).then(res => {
					if (res.data.success) {
						self.goods_info = res.data.data[0];
						self.goods_list = res.data.data[0].list;
						self.canOrder = res.data.data[0].can_order;

					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				})
			},
			//获取秒杀提交的订单详情
			init2() {
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=skill/getOrderInfo',
					data: {
						id: self.skill_goods_id,
						sku_index: self.sku_index,
						goods_count: self.goods_count,
					}
				}).then(res => {
					if (res.data.success) {
						self.goods_info = res.data.data;
						self.goods_list = res.data.data.list;
					}
				})
			},
			//提交订单
			sure() {
				let self = this
				// if (this.opType == 'seckill' || this.opType == 'car') {
				// 	if (this.promptly_time == '') {
				// 		this.holo.toast({
				// 			title: '请选择当前时间之后的时间段~',
				// 			icon: 'none'
				// 		})
				// 		return
				// 	}
				// }
				//canOrder 是总积分数不够的意思
				// if (this.canOrder == 0) {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '您的积分余额不足，将使用现金支付！',
				// 		confirmColor: '#F6281B'
				// 	})
				// 	return
				// }

				if (this.address_id == '') {
					uni.showToast({
						icon: 'none',
						title: '还未添加收货地址'
					})
					return
				}

				// if (this.serviceTime == '请选择时间') {
				// 	uni.showToast({
				// 		title: '请选择时间',
				// 		icon: 'none'
				// 	})
				// 	retutn
				// } else {

					if (self.jumpType == 'group') {


						uni.navigateTo({
							url: 'confirmPay?type=group'
						})

						// self.groupAdd()
					} else if (self.jumpType == 'seckill') {

						uni.navigateTo({
							// url:'confirmPay?type=seckillAdd'
							url: 'confirmPay?type=carAdd'
						})
						// self.seckillAdd()
					} else if (self.jumpType == 'car') {
						self.carAdd()
						// uni.navigateTo({
						// 	url: 'confirmPay?type=carAdd'
						// })
						// self.carAdd()
					}
				// }
			},
			//拼团订单提交
			groupAdd() {
				let self = this
				let type = ''
				if (self.tuan_id) {
					type = '1'
				} else {
					type = '0'
				}
				self.request({
					url: 'ugo/api/app.php?c=group/joinNewGroup',
					data: {
						master_id: self.master_id,
						tuan_id: self.tuan_id,
						sku_index: self.sku_index,
						order_remark: self.order_remark,
						user_address_id: self.address_id + ',' + self.city_id + ',' + self.county_id,
						express_price: self.goods_info.base_price,
						type: type,
						order_type: 2,
					}
				}).then(res => {
					if (res.data.success) {
						self.order_index = res.data.data.order_index
						self.price = res.data.data.order_total_price
						self.tuan_id = res.data.data.tuan_id
						self.request({
							url: 'ugo/api/app.php?c=rechargeOrderUgo',
							data: {
								order_index: res.data.data.order_index,
								order_money: res.data.data.order_total_price,
								type: '2'
							}
						}).then(res => {
							if (res.data.success) {
								self.payInfo = res.data.data
								if (typeof WeixinJSBridge == "undefined") {
									if (document.addEventListener) {
										document.addEventListener('WeixinJSBridgeReady', self
											.onBridgeReady, false);
									} else if (document.attachEvent) {
										document.attachEvent('WeixinJSBridgeReady', self.onBridgeReady);
										document.attachEvent('onWeixinJSBridgeReady', self.onBridgeReady);
									}
								} else {
									self.onBridgeReady();
								}
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			//秒杀订单提交
			seckillAdd() {
				if (this.promptly_time == '') {
					this.holo.toast({
						title: '请选择当前时间之后的时间段~！',
						icon: 'none'
					})
				} else {
					let self = this
					self.request({
						url: 'ugo/api/app.php?c=skillSubmitOrder',
						data: {
							skill_goods_id: self.skill_goods_id,
							goods_count: self.goods_count,
							sku_index: self.sku_index,
							order_remark: self.order_remark,
							user_address_id: self.address_id,
							express_price: self.goods_info.base_price,
							promptly_status: self.promptly_status, //送达时间
							promptly_time: self.promptly_time, //送达时间段
							order_type: 3,
						}
					}).then(res => {
						if (res.data.success) {
							self.order_index = res.data.data.order_index
							self.price = res.data.data.order_total_price
							self.request({
								url: 'ugo/api/app.php?c=rechargeOrderUgo',
								data: {
									order_index: res.data.data.order_index,
									order_money: res.data.data.order_total_price,
									type: '3'
								}
							}).then(res => {
								if (res.data.success) {
									self.payInfo = res.data.data
									if (typeof WeixinJSBridge == "undefined") {
										if (document.addEventListener) {
											document.addEventListener('WeixinJSBridgeReady', self
												.onBridgeReady, false);
										} else if (document.attachEvent) {
											document.attachEvent('WeixinJSBridgeReady', self
											.onBridgeReady);
											document.attachEvent('onWeixinJSBridgeReady', self
												.onBridgeReady);
										}
									} else {
										self.onBridgeReady();
									}
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				}
			},
			//获取系统的时间
			getSystemDate() {
				console.log(new Date())
			},
			//购物车订单提交
			carAdd() {
				let self = this
				console.log(self.cart_index)
				self.request({
					url: 'ugo/api/app.php?c=submitOrderFromCartV2',
					data: {
						cart_index: self.cart_index,
						order_remark: self.order_remark,
						user_address_id: self.address_id,
						express_price: self.freight,
						promptly_status: self.promptly_status, //送达时间
						promptly_time: self.promptly_time, //送达时间段
						order_type: 5,
						can_order: self.canOrder,
						send_score:self.goods_info.send_score//支付所获取的积分
					}
				}).then(res => {
					if (res.data.success) {
						let order_id= res.data.data.list[0].order_id
						self.order_index = res.data.data.list[0].order_index
						self.price = res.data.data.order_total_price
						let order_total_score = self.goods_info.total_score
						let order_send_score=self.goods_info.send_score
						uni.redirectTo({
							url:'supplyConfirmPay?order_id='+order_id+'&order_index='+self.order_index+'&price='+self.price+'&order_total_score='+order_total_score+'&send_score='+order_send_score
						})
						// self.request({
						// 	url: 'ugo/api/app.php?c=rechargeOrderUgo',
						// 	data: {
						// 		order_index: self.order_index,
						// 		order_money: res.data.data.order_total_price,
						// 		type: '1',
						// 		order_score: order_total_score
						// 	}
						// }).then(res => {
						// 	if (res.data.success) {
						// 		self.payInfo = res.data.data
						// 		if (typeof WeixinJSBridge == "undefined") {
						// 			if (document.addEventListener) {
						// 				document.addEventListener('WeixinJSBridgeReady', self
						// 					.onBridgeReady, false);
						// 			} else if (document.attachEvent) {
						// 				document.attachEvent('WeixinJSBridgeReady', self.onBridgeReady);
						// 				document.attachEvent('onWeixinJSBridgeReady', self.onBridgeReady);
						// 			}
						// 		} else {
						// 			self.onBridgeReady();
						// 		}
						// 	} else {
						// 		uni.showToast({
						// 			title: res.data.msg,
						// 			icon: 'none'
						// 		})
						// 	}
						// })
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})

			},
			onBridgeReady() {
				let self = this
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": self.payInfo.appId, //公众号名称，由商户传入
						"timeStamp": self.payInfo.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": self.payInfo.nonceStr, //随机串     
						"package": self.payInfo.package,
						"signType": 'MD5', //微信签名方式：     
						"paySign": self.payInfo.paySign //微信签名 
					},
					function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							let url = ''
							if (self.jumpType == 'group') {
								url = 'ugo/api/app.php?c=group/checkPayOrder'
							} else {
								url = 'ugo/api/app.php?c=order/checkPayOrder'
							}
							self.request({
								url: url,
								data: {
									order_index: self.order_index
								}
							}).then(res => {
								if (res.data.success) {
									if (self.jumpType == 'group') {
										uni.navigateTo({
											url: '/pages/common/successPay?order_total_price=' + self
												.price + '&jumpType=' + self.jumpType + '&tuan_id=' +
												self.tuan_id
										})
									} else {
										uni.navigateTo({
											url: '/pages/common/successPay?order_total_price=' + self
												.price + '&jumpType=' + self.jumpType
										})
									}
								}
							})
						} else {
							if (res.err_msg == 'get_brand_wcpay_request:cancel') {
								uni.showToast({
									title: '您已取消支付',
									icon: 'none'
								})
								if (self.jumpType == 'group') {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 500)
								} else {
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/order/order'
										})
									}, 500)
								}

							} else {
								self.holo.toast({
									title: '支付失败',
									icon: 'none'
								})
								if (self.jumpType == 'group') {
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/common/ptOrderList'
										})
									}, 500)
								} else {
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/order/order'
										})
									}, 500)
								}
							}
						}
					});
			},
		getContent(e) {
				this.order_remark = e.detail.value
			}
		},
		// 监听页面被隐藏
		onHide(){
			uni.removeStorageSync('addressList')
		},
		// 监听页面被卸载
		onUnload(){
			uni.removeStorageSync('addressList')
		},
		onShow() {
			if(uni.getStorageSync('addressList')){
				this.addressInfo=uni.getStorageSync('addressList')
				this.address_id=this.addressInfo.address_id
				this.showAddress=true
			}else{
				this.getAddress()
			}
			this.getAddressMoney()
		},
		onLoad(option) {
			this.cdnUrl = this.$cdnUrl
			this.opType = option.type
			if (option.type == 'group') {
				this.master_id = option.goods_index
				this.sku_index = option.sku_index
				this.goods_count = option.goods_count
				this.showOrderStatus = true
				this.jumpType = option.type
				if (option.tuan_id) {
					this.tuan_id = option.tuan_id
				}
				console.log(option.tuan_id);
				this.init()
			} else if (option.type == 'seckill') {
				this.skill_goods_id = option.goods_index
				this.sku_index = option.sku_index
				this.goods_count = option.goods_count
				this.showOrderStatus = false
				this.jumpType = option.type
				this.init2()
			} else if (option.type == 'car') {
				this.cart_index = option.cartIndex
				this.showOrderStatus = false
				this.jumpType = option.type
				this.is_can_order=option.can_order
				this.init1()
			}
		}
	};
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.noAddress {
		padding: 30rpx;
	}

	.tit-tip{
		width: 90rpx;
		height: 30rpx;
		background: linear-gradient(-38deg, #FF6326, #FF4D5A);
		border-radius: 4rpx;
		color: #FFFFFF;
		line-height: 30rpx;
		font-size: 26rpx;
		text-align: center;
		margin-left: 10rpx;
		padding: 0 6rpx;
	}
	.address {
		padding: 20rpx 30rpx;
		display: flex;
		border-top: 1rpx solid #f5f5f5;

		.img {
			margin-right: 20rpx;

			image {
				width: 58rpx;
				height: 58rpx;
			}
		}

		.right {
			flex: 1;
			position: relative;

			.right_msg {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);

				text {
					font-size: 24rpx;
					color: rgba(153, 153, 153, 1);
					margin-left: 10rpx;
				}
			}

			.address_msg {
				font-size: 26rpx;
				font-weight: 400;
				margin-top: 10rpx;
			}

			image {
				width: 18rpx;
				height: 32rpx;
				position: absolute;
				top: 20rpx;
				right: 30rpx;
			}
		}
	}

	.order_status {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 90rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.status {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;

			image {
				width: 44rpx;
				height: 44rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
		}

		.pt {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}

		.time {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FD4950;

			image {
				width: 17rpx;
				height: 32rpx;
				vertical-align: middle;
				margin-left: 20rpx;
			}

			.txt {
				color: #999;
			}
		}
	}

	.msg {
		margin: 15rpx 0;
		background-color: #fff;
		padding: 20rpx 0;
		border-radius: 10rpx;

		.tit {
			padding: 0 30rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);

			image {
				width: 37rpx;
				height: 33rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
		}

		.con {
			margin-top: 30rpx;
			height: 160rpx;
			padding: 20rpx 30rpx;
			display: flex;
			flex-wrap: wrap;
			border-top: 1rpx solid #f5f5f5;

			.img {
				margin-right: 20rpx;

				image {
					width: 160rpx;
					height: 160rpx;
				}
			}

			.right {
				flex: 1;

				.right_msg {
					// height: 80rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					line-height: 40rpx;
				}

				.norms {
					display: inline-block;
					padding: 10rpx;
					background: rgba(245, 245, 245, 1);
					border-radius: 4rpx;
					color: rgba(153, 153, 153, 1);
					font-size: 24rpx;
				}

				.num {
					margin-top: 20rpx;
					font-family: PingFang SC;
					color: rgba(153, 153, 153, 1);
					display: flex;
					justify-content: space-between;

					.text1 {
						font-size: 22rpx;
						color: rgba(255, 54, 54, 1);
					}

					.text2 {
						font-size: 30rpx;
						color: rgba(255, 54, 54, 1);
					}

					.count {
						font-size: 30rpx;
						color: #999;

						.text4 {
							font: 22rpx;
						}
					}
				}
			}
		}

		.remark {
			box-sizing: border-box;
			height: 150rpx;
			background-color: #f5f5f5;
			margin: 80rpx 30rpx 0 30rpx;
			padding: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			border-radius: 10rpx;

			textarea {
				font-size: 26rpx;
				width: 100% !important;
				height: 100% !important;
			}
		}
	}

	.base_msg {
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		.msg_con {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-top: 30rpx;

			.total {
				color: #333;
			}

			.price {
				color: #FF3F3F;
			}
		}

		.msg_con:first-child {
			margin-top: 0;
		}
	}

	.sumbit_bgc {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 100rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-top: 2rpx solid #f5f5f5;

		.money {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;

			text {
				color: #FC4950;
			}
		}

		.sumbit {
			width: 180rpx;
			height: 70rpx;
			background: #FC4950;
			border-radius: 35rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			border-radius: 45rpx;
			margin-left: 20rpx;
		}
	}

	.common {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 22222;

		.common_con {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 650rpx;
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
				border-bottom: 2rpx solid #f5f5f5;
			}

			.intro {
				display: flex;
				height: 530rpx;

				.classify_left {
					width: 140rpx;
					height: 100%;
					background-color: #f5f5f5;

					.style {
						height: 90rpx !important;
						line-height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						color: #333;
						background-color: #fff;
					}

					.style1 {
						height: 90rpx !important;
						line-height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						color: #333;
					}
				}

				.classify_right {
					flex: 1;
					box-sizing: border-box;

					.con {
						padding: 0 30rpx;
						display: flex;
						justify-content: space-between;
						height: 90rpx;
						line-height: 90rpx;
						border-bottom: 2rpx solid #f5f5f5;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;

						.time1 {
							color: #FD4950;
						}
					}
				}
			}
		}
	}

	.getScore-box {
		height: 96rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 32rpx;

		.gs-right {
			display: flex;
			align-items: center;
		}
	}
</style>
