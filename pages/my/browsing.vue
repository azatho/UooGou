<!-- 浏览记录页面 -->
<template>
	<view>
		<!-- 导航栏 -->
		<view class="flexd">
			<view class="left" @click="black()">
				<image src="../../static/backarrow.png"></image>
			</view>
			<view class="center">浏览记录</view>
			<view class="right" v-if="showbj" @click="compile()">编辑</view>
			<view class="right" v-else style="color: #333333;" @click="compiles()">完成</view>
		</view>
		<view class="bgi" v-if="list.length==0">
			<image src="../../static/zwsj.png"></image>
			<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">暂无浏览记录</view>
		</view>
		<view class="brows" v-else style="margin-bottom: 100rpx;" >
			<view style="margin-top: 88rpx;"></view>
			<view class="carry" v-for="(items,k) in list" :key="k" >
				<view class="time">{{items[0].foot_time}}</view>
				<view class="record" v-for="(item,i) in list[k]" :key="i"  @click="gobuy(item.goods_index)">
					<view class="checked" v-if="showbj==false" @click.stop="getRadio(item.index,k,i)">
						<label class="radio">
							<radio value="r1" checked="true" style="transform:scale(0.9)" v-if="item.flag" color="#FD484F"></radio>
							<radio value="r1"style="transform:scale(0.9)" v-else></radio>
						</label>
					</view>
					<view class="img">
						<image :src="cdnUrl+item.goods_icon" v-if="item.goods_icon"></image>
						<view v-else style="width: 100%;height: 100%;border:1px solid #f5f5f5;color:#ccc; text-align: center; line-height: 120rpx;">
							暂无图片
						</view>
					</view>
					<view class="txt">
						<view class="tilte">{{item.goods_name || '暂无名称'}}</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view class="two">
								<view class="money" v-if="item.goods_type==0||item.goods_type==2">{{item.goods_cost!=0?'￥'+item.goods_cost/100:''}}</view>
								<view class="money" v-if="item.goods_type!=0" style="margin-top: 5rpx;">{{item.goods_type==2&&item.goods_cost!=0?'或':''}}{{item.goods_score_cost!=0?'￥'+item.goods_score_cost/100:''}}{{item.goods_integral&&item.goods_score_cost!=0?'+':''}}{{item.goods_integral!=0?item.goods_integral/100+'积分':''}}</view>
							</view>
							<view class="gobuy" @click="gobuy(item.goods_index)">去购买</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<view class="btn" v-if="showbj==false">
			<view class="left" @click="getAllRadio()">
				<label>
					<radio :checked="browsall" color="#FD484F" style="transform:scale(0.9)"></radio>
				</label>
				全选
			</view>
			<view class="right" @click="cancelCollect()">删除</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdnUrl: '',
				list: [], //存放所有数据
				showbj: true, //编辑/完成 状态切换
				browsall: false, //全部选中
				checkedRadio: [], //全选
				counts: 0,
			}
		},
		methods: {
			init() {
				let self = this;
				self.request({
					url: 'ugo/api/mall.php?c=footList',
					data: {
						token: uni.getStorageSync('token'),
					},
				}).then(res => {
					if (res.data.success) {
						for (var i = 0; i < res.data.data.list.length; i++) {
							// console.log(i);
							for (var j = 0; j < res.data.data.list[i].length; j++) {
								res.data.data.list[i][j].flag = false
								// this.counts =res.data.data.list[i][j]++
								this.counts++
							}
						}
						self.list = res.data.data.list
					}
				}, rej => {
					console.log(rej);
				})
			},
			// 返回上一页
			black() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 编辑/完成 按钮切换
			compile() {
				this.showbj = false
			},
			compiles() {
				this.showbj = true
			},
			// 去购买
			gobuy(e) {
				uni.navigateTo({
					url:'../common/goodsDetail?id='+e
				})
			},
			// 单个是否选中
			getRadio(e, pi, ci) { //订单号  每一天  每一天的每一条浏览记录
				for (let j = 0; j < this.list[pi].length; j++) {
					if (ci == j) {
						this.list[pi][ci].flag = !this.list[pi][ci].flag
						if (this.list[pi][ci].flag == true && this.checkedRadio.indexOf(this.list[pi][ci].index) == '-1') {
							this.checkedRadio.push(this.list[pi][ci].index)

						} else {
							this.checkedRadio.splice(this.checkedRadio.indexOf(this.list[pi][ci].index), 1)
						}
					}
				}

				for (let j = 0; j < this.list.length; j++) {
					for (let i = 0; i < this.list[j].length; i++) {

						if (this.list[j][i].flag == false) {
							this.browsall = false;

						} else if (this.checkedRadio.length == this.counts && this.list[j][i].flag) {
							// console.log(this.checkedRadio.length+1 ===index)
							this.browsall = true;
						}
					}
				}
			},
			// 是否全选
			getAllRadio() {
				this.checkedRadio = []
				this.browsall = !this.browsall
				if (this.browsall == true) {
					for (var i = 0; i < this.list.length; i++) {
						this.list[i].flag = true
						for (var j = 0; j < this.list[i].length; j++) {
							this.list[i][j].flag = true
							this.checkedRadio.push(this.list[i][j].index)
						}
					}
				} else {
					for (var i = 0; i < this.list.length; i++) {
						this.list[i].flag = false
						for (var j = 0; j < this.list[i].length; j++) {
							this.list[i][j].flag = false
						}
					}
					this.checkedRadio = []
				}
			},
			// 删除
			cancelCollect() {
				let self = this;
				if (self.checkedRadio.length == 0) {
					self.holo.toast({
						icon: 'none',
						title: '请至少选择一个记录'
					})
				} else {
					uni.showModal({
						content: '确定删除吗？',
						success: function(res) {
							if (res.confirm) {
								self.request({
									url: 'ugo/api/mall.php?c=delFoot',
									data: {
										token: uni.getStorageSync('token'),
										foot_ids: self.checkedRadio.join(','),
									}
								}).then(res => {
									if (res.data.success) {
										self.init()
										self.checkedRadio = []
										self.browsall = false
										self.holo.toast({
											title: res.data.msg
										})
									} else {
										self.holo.toast({
											icon: 'none',
											title: res.data.msg
										})
									}
								})
							}
						}
					})
				}
			},
		},
		onShow() {
			this.init()
			this.cdnUrl = this.$cdnUrl
		}
	}
</script>

<style>
	page {
		position: relative;
	}

	page image {
		width: 100%;
		height: 100%;
	}

	.flexd {
		position: fixed;
		left: 0;
		top: 0;
		width: 749rpx;
		height: 88rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.16);
		line-height: 88rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		font-family: PingFang SC;
		z-index: 111111;
	}

	.flexd .left {
		width: 17rpx;
		height: 32rpx;
	}

	.flexd .center {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.flexd .right {
		font-size: 26rpx;
		font-weight: 400;
		color: #FD484F;
	}

	.bgi {
		width: 374rpx;
		height: 314rpx;
		margin: 300rpx auto;
	}

	/* 浏览记录内容 */
	.carry {
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: PingFang SC;
		color: #333333;
	}

	.carry .time {
		font-size: 30rpx;
		font-weight: 500;
		margin-bottom: 20rpx;
	}

	.carry .record {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
		border-bottom: 1rpx solid #F5F5F5;
	}

	.carry .record .checked {
		width: 36rpx;
		height: 36rpx;
		margin-right: 25rpx;
	}

	.carry .record .img {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
	}

	.carry .txt {
		flex: 1;
	}

	.carry .txt .tilte {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.carry .two {
/* 		display: flex;
		justify-content: space-between; */
		margin-top: 20rpx;
	}

	.carry .two .money {
		color: #CF4F49;
		font-size: 26rpx;
	}

	.carry  .gobuy {
		width: 100rpx;
		height: 40rpx;
		background: #FD484F;
		border-radius: 20rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 22rpx;
		color: #FFFFFF;
	}

	/* 底部按钮 */
	.btn {
		width: 750rpx;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 30rpx;
		padding-right: 0;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 2rpx 0rpx rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: space-between;
		font-family: PingFang SC;
	}

	.btn image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}

	.btn .left {
		font-size: 26rpx;
		font-weight: 400;
		color: #333333;
	}

	.btn .right {
		width: 200rpx;
		height: 100rpx;
		background: #FD484F;
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 100rpx;
		text-align: center;
	}
</style>
