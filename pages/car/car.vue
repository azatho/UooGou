<template>
	<view class="" style="padding-bottom: 30px;">
		<view class="msg" v-if="cartList!=0">
			<view v-for="(item,i) in cartList" :key="i" style="background-color: #FFFFFF;">
				<view class="msg_tit">
					<view class="tit_left">
						<view class="choose" @click="getShops(item.supplier_id,i)">
							<image src="../../static/choose.png" mode="" v-if="item.flag"></image>
							<image src="../../static/fk_icon.png" mode="" v-else></image>
						</view>
						<view class="tit" @click="goShop(item.supplier_id)">
							<image src="../../static/case.png" mode="" class="image1"></image>

							<text style="max-width: 260rpx;white-space: nowrap;
					    text-overflow: ellipsis;
					    overflow: hidden;
					    word-break: break-all;">{{item.supplier_name}}</text>
							<view class='tit-tip' v-if='item.supplier_type==0'>社区店</view>
							<view class='tit-tip' v-if='item.supplier_type==1'>供货商</view>
							<image src="../../static/back1.png" mode="" class="image2"></image>
						</view>
					</view>
					<view class="clear" @click="clearCar(item.supplier_id,i)">
						清空购物车
					</view>
				</view>
				<view style="display:flex;align-items:center;" v-for="(items,k) in item.list" :key="k">
					<view class="choose1" v-if="items.goods_status==3">
						<image src="../../static/fixation.png"></image>
					</view>
					<view class="choose1" @click="getGoods(items.cart_index,i,k)" v-else>
						<image src="../../static/choose.png" mode="" v-if="items.flag"></image>
						<image src="../../static/fk_icon.png" mode="" v-else></image>
					</view>
					<view class="con">
						<view class="img">
							<image :src="cdnUrl+items.goods_icon" mode=""></image>
						</view>
						<view class="right" @click="goGoodsDetail(items.goods_index,items.goods_status)">
							<view class="right_msg" style="display: flex;">
									<text class='tit-tip' v-if='items.activity_type==6'>秒杀</text>
									<text class='tit-tip' v-if='items.activity_type==7'>特价</text>
									{{items.goods_name}}
							</view>
							<view class="norms">{{items.goods_norms}}</view>
							<view class="num">
								<view class="">
									<!-- <text class="text1">￥</text>
									<text class="text2">{{items.goods_cost/100}}</text>
									
									<view class="text2" v-if="items.goods_integral>0">或￥{{items.goods_score_price/100}}+{{items.goods_integral/100}}积分</view> -->
									<view class="text2" v-if="items.goods_type==0">￥{{ items.goods_cost / 100}}</view>
									<view class="text2" v-if="items.goods_type==1">
										{{ items.goods_score_price!=0?'￥'+items.goods_score_price/100:''}}
										<text v-if="items.goods_integral!=0">{{items.goods_score_price!=0&&items.goods_integral!=0?'+':''}}{{items.goods_integral/ 100 }}积分</text>
									</view>
									<view class="text2" v-if="items.goods_type==2">
										{{ items.goods_cost !=0 ?'￥'+ items.goods_cost / 100:''}}</view>
									<view class="text2" v-if="items.goods_type==2">
										或{{ items.goods_score_price !=0 ? '￥'+items.goods_score_price / 100:''}}
										<text
											v-if="items.goods_integral!=0&&items.goods_type!=0">{{items.goods_score_price !=0&&items.goods_integral!=0?'+':''}}{{ items.goods_integral / 100 }}积分</text>
									</view>
									<!-- <view class="price" v-if="items.goods_cost != items.goods_price">￥{{ items.goods_price / 100 ? items.goods_price / 100 : '暂无' }}</view> -->


								</view>
								<!-- <view class="count">
									<text class="text4">×</text>
									{{items.goods_count}} 
								</view> -->
								<view class="num_count">
									<image src="../../static/desc.png"
										@click.stop="descCount(i,k,items.goods_count,items.sku_inventory)"></image>
									<text>{{items.goods_count}}</text>
									<image src="../../static/add.png"
										@click.stop="addCount(i,k,items.goods_count,items.sku_inventory)"
										v-if="items.goods_status=='2'"></image>
										<image src="../../static/greyAdd.png" v-else @click.stop=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="total_money">
					<view class="money">
						<view class="money1" v-if="item.totalScorePrice!=0">
							合计：

							<text style="margin-left: 10rpx;">
								￥{{item.totalScorePrice/100}}{{item.total_score!=0?'+'+item.total_score/100+'积分':''}}
							</text>
						</view>
						<!-- <view class="money2" v-if="item.total_money!=0">
							原价：￥{{item.original_cost/100}}
						</view> -->
					</view>
					<view class="pay_btn" @click="sumbit(item,i)">
						去结算
					</view>
				</view>
			</view>
		</view>

		<view class="none_img" v-else>
			<image src="/static/carNone.png" mode=""></image>
			<view
				style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">
				购物车空空如也~</view>
		</view>

		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<view class="recommend" v-if="goodsList.length">
			<view class="recommend_tit">
				<view class="word">
					<image src="/static/hostSales1.png" mode=""></image>优选好物
				</view>
			</view>
			<view class="common_goods">
				<block v-for="(item,i) in goodsList" :key="i">
					<view class="common_con" @click="goShop(item.goods_supplier)">
						<view class="">
							<image :src="cdnUrl + item.goods_icon" mode=""></image>
							<view class="name">
								{{item.goods_name}}
							</view>
							<view class="discount">
								<view class="" v-for="(items,k) in item.coupon" :key="k">
									<view :class="items.is_have==0?'coupon':'coupon1'">
										<text>{{items.deduct_cash/100}}元</text><text
											style="margin-left:10rpx">{{items.is_have==0?'领取':'已领取'}}</text>
									</view>
								</view>
							</view>
							<view class="price">
								￥{{item.goods_cost/100?item.goods_cost/100:'暂无'}}<text
									v-if="item.goods_cost!=item.goods_price">{{item.goods_price/100?item.goods_price/100:'暂无'}}</text>
							</view>
						</view>
						<view class="shop">
							<view class="img">
								<image :src="cdnUrl+item.supplier_icon" mode=""></image>
							</view>
							<view class="right_shop">
								<view class="title">
									{{item.supplier_name}}
								</view>
								<view class="tip" v-if="item.base_price!=0">
									基础配送费：{{item.base_price/100}}
								</view>
								<view class="tip" v-else>
									免配送费
								</view>
							</view>
						</view>
					</view>
				</block>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				total_score_of_goodstype1: "", //商品种类等于1的所需商品积分
				timer: null, //定时器
				cdnUrl: '',
				goodsList: [],
				cartList: [],
				showRadio: false,
				checked: false,
				cart_index: [],
				pageCount: '10',
				page: '0',
				lng: '',
				lat: '',
				count: '10',
				//总积分
				allScore: "",
				//会员积分
				memberScore: "",
				//商家积分
				supplierScore: "",

				// 选中商品的会员积分和
				score1: '',
				// 不支持商家积分的商品积分和
				socre2: '',
			}
		},
		methods: {
			init() {
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=cartList'
				}).then(res => {
					if (res.data.success) {
						//总积分
						this.allScore = res.data.data.all_score
						//会员积分
						this.memberScore = res.data.data.coupon
						//商家积分
						this.supplierScore = res.data.data.supplier_score
						self.cartList = res.data.data.cartList
						if (res.data.data.cartList.length != 0) {
							for (var i = 0; i < self.cartList.length; i++) {
								self.cartList[i].total_money = 0
								self.cartList[i].total_score = 0
								self.cartList[i].totalScorePrice = 0
								//需要的会员积分总数
								// self.cartList[i].totalMemberScore=0
								this.score1 = 0
								//不支持商家积分的积分总数
								this.score2 = 0
								// self.cartList[i].unSupplierScore=0
								self.cartList[i].original_cost = 0
								self.cartList[i].cart_index = []

								self.$set(self.cartList[i], 'flag', false)

								for (var j = 0; j < self.cartList[i].list.length; j++) {
									self.$set(self.cartList[i].list[j], 'flag', false)
								}
							}
						}
					} else {
						if (res.data.msg == '登录状态失效，请重新登录~！') {
							uni.showModal({
								content: '未登录，请先登录',
								success: function(res) {
									if (res.confirm) {
										uni.switchTab({
											url: '/pages/my/my'
										})
									} else if (res.cancel) {
										uni.switchTab({
											url: '/pages/index/index'
										})
									}
								}
							})
						}
					}
				});
			},
			//获取优选好物
			getSelectGoods() {
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=account/appGoodList',
					data: {
						page: self.page,
						user_lng: self.lng,
						user_lat: self.lat,
						count: self.count
					}
				}).then(res => {
					if (res.data.success) {
						for (var i = 0; i < res.data.data.list.length; i++) {
							self.goodsList.push(res.data.data.list[i])
						}
						self.pageCount = parseInt(res.data.data.total.total / self.count)
					}
				})
			},
			//去店铺主页
			goShop(e) {
				uni.navigateTo({
					url: '/pages/common/shopHome?id=' + e
				})
			},
			//去商品详情页
			goGoodsDetail(e, status) {
				if (status == '2') {
					uni.navigateTo({
						url: '/pages/common/goodsDetail?id=' + e
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/Nocommunity'
					})
				}

			},
			//清空购物车
			clearCar(e, index) {
				let self = this
				uni.showModal({
					title:"提示",
					content: '确定清空吗？',
					cancelColor:'#999999',
					confirmText:'确定',
					confirmColor:'#FC4950',
					success: function(res) {
						if (res.confirm) {
							let cart_indexs = []
							for (var i = 0; i < self.cartList[index].list.length; i++) {
								cart_indexs.push(self.cartList[index].list[i].cart_index)
							}
							self.request({
								url: 'ugo/api/app.php?c=deleteCart',
								data: {
									cart_index: cart_indexs.join(',')
								}
							}).then(res => {
								if (res.data.success) {
									uni.showToast({
										title: res.data.msg
									})
									self.init()
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 店铺的全选
			getShops(e, index) {
				for (var i = 0; i < this.cartList.length; i++) {
					if (index == i) {
						this.cartList[index].flag = !this.cartList[i].flag
						if (this.cartList[index].flag) {
							for (var j = 0; j < this.cartList[index].list.length; j++) {
								if (this.cartList[index].list[j].goods_status == '2') {
									this.cartList[index].list[j].flag = true
									if (this.cartList[index].cart_index.indexOf(this.cartList[index].list[j].cart_index) ==
										-1) {
										if (this.cartList[index].list[j].goods_type == 0) {
											this.cartList[index].totalScorePrice += Number(this.cartList[index].list[j]
												.goods_count * this.cartList[index].list[j].goods_cost)
											// this.cartList[index].total_score+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
										} else {
											this.cartList[index].total_score += Number(this.cartList[index].list[j]
												.goods_count * this.cartList[index].list[j].goods_integral)
											this.cartList[index].totalScorePrice += Number(this.cartList[index].list[j]
												.goods_count * this.cartList[index].list[j].goods_score_price)
										}
										if (this.cartList[index].list[j].goods_type == 1) {
											this.total_score_of_goodstype1 += Number(this.cartList[index].list[j]
												.goods_count * this.cartList[index].list[j].goods_integral)
										}
										this.cartList[index].cart_index.push(this.cartList[index].list[j].cart_index)
										this.cartList[index].total_money += Number(this.cartList[index].list[j]
											.goods_count * this.cartList[index].list[j].goods_cost)
										// this.cartList[index].total_score+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
										// this.cartList[index].totalScorePrice+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_score_price)
										// //0支持商家积分        1 不支持商家积分
										// if(this.cartList[index].list[j].use_supplier_score==0){
										// 	// totalMemberScore
										// 	this.score1+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
										// }else if(this.cartList[index].list[j].use_supplier_score==1){
										// 	// unSupplierScore
										// 	this.score2+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
										// }

										this.cartList[index].original_cost += Number(this.cartList[index].list[j]
											.goods_count * this.cartList[index].list[j].goods_price)
									}
								}
							}
						} else {
							for (var j = 0; j < this.cartList[index].list.length; j++) {
								if (this.cartList[index].list[j].goods_status == '2') {
									this.cartList[index].list[j].flag = false
									this.cartList[index].cart_index = []
									if (this.cartList[index].list[j].goods_type == 0) {
										this.cartList[index].totalScorePrice -= Number(this.cartList[index].list[j]
											.goods_count * this.cartList[index].list[j].goods_cost)
									} else {
										this.cartList[index].total_score -= Number(this.cartList[index].list[j]
											.goods_count * this.cartList[index].list[j].goods_integral)
										this.cartList[index].totalScorePrice -= Number(this.cartList[index].list[j]
											.goods_count * this.cartList[index].list[j].goods_score_price)
									}
									if (this.cartList[index].list[j].goods_type == 1) {
										this.total_score_of_goodstype1 -= Number(this.cartList[index].list[j].goods_count *
											this.cartList[index].list[j].goods_integral)
									}
									this.cartList[index].total_money -= Number(this.cartList[index].list[j].goods_count *
										this.cartList[index].list[j].goods_cost)
									// this.cartList[index].total_score-=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
									// this.cartList[index].totalScorePrice-=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_score_price)

									// //0支持商家积分        1 不支持商家积分
									// if(this.cartList[index].list[j].use_supplier_score==0){
									// 	// totalMemberScore
									// 	this.score1-=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
									// }else if(this.cartList[index].list[j].use_supplier_score==1){
									// 	// unSupplierScore
									// 	this.score2-=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
									// }


									this.cartList[index].original_cost -= Number(this.cartList[index].list[j].goods_count *
										this.cartList[index].list[j].goods_price)
								}
							}
						}
						break
					}
				}
			},
			// 商品的选择
			getGoods(e, index, ci) {
				for (var j = 0; j < this.cartList[index].list.length; j++) {
					if (ci == j) {
						this.cartList[index].list[j].flag = !this.cartList[index].list[ci].flag
						let k = this.cartList[index].cart_index.indexOf(this.cartList[index].list[ci].cart_index)
						if (this.cartList[index].list[ci].flag == true && k == -1) {
							if (this.cartList[index].list[j].goods_type == 0) {
								this.cartList[index].totalScorePrice += Number(this.cartList[index].list[j].goods_count *this.cartList[index].list[j].goods_cost)
								// this.cartList[index].total_score+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
							} else {
								this.cartList[index].total_score += Number(this.cartList[index].list[j].goods_count * this.cartList[index].list[j].goods_integral)
								this.cartList[index].totalScorePrice += Number(this.cartList[index].list[j].goods_count *this.cartList[index].list[j].goods_score_price)
							}
							if (this.cartList[index].list[j].goods_type == 1) {
								this.total_score_of_goodstype1 += Number(this.cartList[index].list[j].goods_count * this.cartList[index].list[j].goods_integral)
							}
							this.cartList[index].cart_index.push(this.cartList[index].list[ci].cart_index)
							this.cartList[index].total_money += Number(this.cartList[index].list[j].goods_count * this.cartList[index].list[j].goods_cost)
							// //0支持商家积分        1 不支持商家积分
							// if(this.cartList[index].list[j].use_supplier_score==0){
							// 	// totalMemberScore
							// 	this.score1+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
							// }else if(this.cartList[index].list[j].use_supplier_score==1){
							// 	// unSupplierScore
							// 	this.score2+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
							// }


							this.cartList[index].original_cost += Number(this.cartList[index].list[j].goods_count * this
								.cartList[index].list[j].goods_price)
						} else if (this.cartList[index].list[ci].flag == false && k != -1) {
							this.cartList[index].cart_index.splice(k, 1)
							this.cartList[index].total_money -= Number(this.cartList[index].list[j].goods_count * this
								.cartList[index].list[j].goods_cost)
							if (this.cartList[index].list[j].goods_type == 0) {
								this.cartList[index].totalScorePrice -= Number(this.cartList[index].list[j].goods_count *
									this.cartList[index].list[j].goods_cost)
							} else {
								this.cartList[index].total_score -= Number(this.cartList[index].list[j].goods_count * this
									.cartList[index].list[j].goods_integral)
								this.cartList[index].totalScorePrice -= Number(this.cartList[index].list[j].goods_count *
									this.cartList[index].list[j].goods_score_price)
							}
							if (this.cartList[index].list[j].goods_type == 1) {
								this.total_score_of_goodstype1 -= Number(this.cartList[index].list[j].goods_count * this.cartList[index].list[j].goods_integral)
							}
							// //0支持商家积分        1 不支持商家积分
							// if(this.cartList[index].list[j].use_supplier_score==0){
							// 	// totalMemberScore
							// 	this.score1-=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
							// }else if(this.cartList[index].list[j].use_supplier_score==1){
							// 	// unSupplierScore
							// 	this.score2-=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
							// }
							this.cartList[index].original_cost -= Number(this.cartList[index].list[j].goods_count * this
								.cartList[index].list[j].goods_price)
						}
					}
				}
				//店铺全选
				for (var j = 0; j < this.cartList[index].list.length; j++) {
					if (this.cartList[index].list[j].flag != true) {
						this.cartList[index].flag = false
						break
					} else {
						this.cartList[index].flag = true
					}
				}
			},
			//选择商品数量
			addCount(index, ci, goods_count, sku_stock) {
				for (var j = 0; j < this.cartList[index].list.length; j++) {
					if (ci == j) {
						if (Number(goods_count) < Number(sku_stock)) {
							this.cartList[index].list[j].goods_count++
							if (this.cartList[index].list[j].flag) {
								this.cartList[index].total_money += Number(this.cartList[index].list[j].goods_cost)
								if (this.cartList[index].list[j].goods_type == 1) {
									this.cartList[index].totalScorePrice += Number(this.cartList[index].list[j].goods_score_price);
									this.total_score_of_goodstype1 += Number(this.cartList[index].list[j].goods_count *this.cartList[index].list[j].goods_integral);
									this.cartList[index].total_score += Number(this.cartList[index].list[j].goods_integral);
								}else if (this.cartList[index].list[j].goods_type == 0){
									this.cartList[index].totalScorePrice += Number(this.cartList[index].list[j].goods_cost)
								}else{
									this.cartList[index].totalScorePrice += Number(this.cartList[index].list[j].goods_score_price);
									// this.total_score_of_goodstype1 += Number(this.cartList[index].list[j].goods_count *this.cartList[index].list[j].goods_integral);
									this.cartList[index].total_score += Number(this.cartList[index].list[j].goods_integral);
								}
								// //0支持商家积分        1 不支持商家积分
								// if(this.cartList[index].list[j].use_supplier_score==0){
								// 	// totalMemberScore
								// 	this.score1+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
								// }else if(this.cartList[index].list[j].use_supplier_score==1){
								// 	// unSupplierScore
								// 	this.score2+=Number(this.cartList[index].list[j].goods_count*this.cartList[index].list[j].goods_integral)
								// }
								this.cartList[index].original_cost -= Number(this.cartList[index].list[j].goods_price)
							}
							this.updateCartQuantity(this.cartList[index].list[j].cart_index, this.cartList[index].list[j]
								.goods_count)
						} else {
							this.holo.toast({
								icon: 'none',
								title: '库存不足哦~'
							})
						}
					}
				}
			},
			descCount(index, ci, goods_count, sku_stock) {
				let self = this
				for (var j = 0; j < this.cartList[index].list.length; j++) {
					if (ci == j) {
						if (goods_count > 1) {
							this.cartList[index].list[j].goods_count--
							if (this.cartList[index].list[j].flag) {
								this.cartList[index].total_money -= Number(this.cartList[index].list[j].goods_cost)
								if (this.cartList[index].list[j].goods_type == 1) {
									this.cartList[index].total_score -= Number(this.cartList[index].list[j].goods_integral)
									this.cartList[index].totalScorePrice -= Number(this.cartList[index].list[j].goods_score_price)
									this.total_score_of_goodstype1 -= Number(this.cartList[index].list[j].goods_count *this.cartList[index].list[j].goods_integral)
								}else if(this.cartList[index].list[j].goods_type == 0){
									this.cartList[index].totalScorePrice -= Number(this.cartList[index].list[j].goods_cost)
								}else{
									this.cartList[index].total_score -= Number(this.cartList[index].list[j].goods_integral)
									this.cartList[index].totalScorePrice -= Number(this.cartList[index].list[j].goods_score_price)
								}
								// //0支持商家积分        1 不支持商家积分
								// if (this.cartList[index].list[j].use_supplier_score == 0) {
								// 	// totalMemberScore
								// 	this.score1 -= Number(this.cartList[index].list[j].goods_count * this.cartList[index]
								// 		.list[j].goods_integral)
								// } else if (this.cartList[index].list[j].use_supplier_score == 1) {
								// 	// unSupplierScore
								// 	this.score2 -= Number(this.cartList[index].list[j].goods_count * this.cartList[index]
								// 		.list[j].goods_integral)
								// }
								this.cartList[index].original_cost -= Number(this.cartList[index].list[j].goods_price)
							}
							this.updateCartQuantity(this.cartList[index].list[j].cart_index, this.cartList[index].list[j]
								.goods_count)
						} else {
							let cartIndex = this.cartList[index].list[j].cart_index
							uni.showModal({
								title:"提示",
								content: '确定删除此商品吗？',
								cancelColor:'#999999',
								confirmText:'确定',
								confirmColor:'#FC4950',
								success: function(res) {
									if (res.confirm) {
										self.request({
											url: 'ugo/api/app.php?c=deleteCart',
											data: {
												cart_index: cartIndex
											}
										}).then(res => {
											if (res.data.success) {
												uni.showToast({
													title: res.data.msg
												})
												self.init()
											}
										});
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					}
				}
			},
			//修改商品数量
			updateCartQuantity(cart_index, e) {
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=updateCartQuantity',
					data: {
						cart_index: cart_index,
						count: e
					},

				}).then(res => {
					if (res.data.success) {

					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}

				});
			},
			sumbit(item, i) {
				console.log(item)
				let self = this
				console.log(item)
				if (item.supplier_type == 1) {
					if(this.cartList[i].cart_index.length != 0){
						uni.navigateTo({
							url: '../supplyChain/supplyConfirmOrder?cartIndex=' + self.cartList[i].cart_index.join(
								',') + '&type=car' + '&can_order=0'
						})
					}else{
						this.holo.toast({
							icon: 'none',
							title: '请至少选择一件商品'
						})
					}
			
				} else {
					//总积分不满足 直接提示
					if (this.total_score_of_goodstype1 > this.allScore) {
						console.log(this.total_score_of_goodstype1)
						console.log(this.allScore)
						uni.showToast({
							title: '您的积分不足以结算，请重新选择商品',
							icon: "none"
						})
						return
					}
					if (this.allScore < item.total_score) {
						uni.showToast({
							title: '您的积分不足，将使用现金结算',
							icon: "none"
						})
						// 定时器
						this.timer = setTimeout(() => {
							if (this.cartList[i].cart_index.length != 0) {
								let self = this;
								uni.navigateTo({
									url: '../common/confirmOrder?cartIndex=' + self.cartList[i].cart_index
										.join(',') + '&type=car' + '&can_order=0'
								})
							} else {
								this.holo.toast({
									icon: 'none',
									title: '请至少选择一件商品'
								})
							}
						}, 1500)
					} else {
						if (this.cartList[i].cart_index.length != 0) {
							let self = this;
							uni.navigateTo({
								url: '../common/confirmOrder?cartIndex=' + self.cartList[i].cart_index.join(',') +
									'&type=car' + '&can_order=1'
							})
						} else {
							this.holo.toast({
								icon: 'none',
								title: '请至少选择一件商品'
							})
						}
					}
				}

			}
		},
		onReachBottom() {
			if (this.page < this.pageCount) {
				this.page++
				this.getSelectGoods()
			}
		},
		onLoad() {
			this.cdnUrl = this.$cdnUrl;
		},
		onShow() {
			let self = this
			self.init()
			this.lng = uni.getStorageSync('lng');
			this.lat = uni.getStorageSync('lat');
			self.goodsList = []
			this.total_score_of_goodstype1 = ''
			self.getSelectGoods()
		},
		// 监听页面隐藏事件
		onHide() {
			// 判断是否有定时器任务，如果有清除定时器任务防止对后续页面产生影响
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	.none_img {
		text-align: center;

		image {
			width: 470rpx;
			height: 345rpx;
			margin-top: 150rpx;
		}
	}

	.recommend {
		padding: 30rpx 24rpx 80rpx;
		background-color: #fff;

		.recommend_tit {
			text-align: center;
			display: flex;
			justify-content: center;

			// align-items: center;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 10rpx;
				vertical-align: middle;
			}
		}

		.common_goods {
			padding: 20rpx 5rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.common_con {
				width: 330rpx;
				height: 600rpx;
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

					.coupon1 {
						width: 130rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: url(../../static/quan1.png) no-repeat;
						background-size: 100% 100%;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fd4950;
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
						text-decoration: line-through
					}
				}

				.shop {
					width: 310rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: #F63B42;
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
							color: #CFCFCF;
						}
					}
				}
			}
		}
	}

	.msg {
		// background-color: #fff;
		border-radius: 10rpx;
		// background-color: #fff;

		.msg_tit {
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			line-height: 80rpx;

			.tit_left {
				display: flex;
				max-width: 550rpx;

				.tit {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: flex;
					align-items: center;

					.image1 {
						width: 37rpx;
						height: 33rpx;
						margin-right: 20rpx;
					}

					.image2 {
						width: 13rpx;
						height: 24rpx;
						margin: 0 10rpx;
					}
				}

				.choose {
					margin: 6rpx 30rpx;

					image {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}

			.clear {
				padding-right: 30rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}

		.choose1 {
			height: 160rpx;
			line-height: 160rpx;
			margin: 0 30rpx;

			image {
				width: 36rpx;
				height: 36rpx;
			}
		}

		.con {
			padding: 20rpx 30rpx 20rpx 0;
			display: flex;
			flex: 1;

			.img {
				margin-right: 20rpx;

				image {
					width: 140rpx;
					height: 140rpx;
				}
			}

			.right {
				flex: 1;

				.right_msg {
					height: 80rpx;
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

					.text3 {
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						text-decoration: line-through;
						color: #999999;
						margin-left: 10rpx;
					}

					.count {
						font-size: 30rpx;
						color: #999;

						.text4 {
							font: 22rpx;
						}
					}

					.num_count {
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
			}
		}

		.total_money {
			display: flex;
			justify-content: flex-end;
			padding: 30rpx 0;
			align-items: center;

			.money1 {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				text {
					color: #FD484F;
				}
			}

			.money2 {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				text-decoration: line-through;
			}

			.pay_btn {
				width: 160rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: #F6281B;
				border-radius: 30rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin: 0 30rpx;
			}
		}
	}

	.collect_bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;

		.radio {
			margin-left: 30rpx;
		}

		.del {
			width: 150rpx;
			height: 60rpx;
			margin: 20rpx 30rpx;
			line-height: 60rpx;
			background: #FF3636;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			border-radius: 30rpx;
		}

		.bottom_right {
			.settlement {
				width: 200rpx;
				height: 100rpx;
				line-height: 100rpx;
				background: #25AE6D;
				text-align: center;
				color: #fff;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				margin-left: 20rpx;
			}
		}
	}

	.tit-tip {
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
</style>
