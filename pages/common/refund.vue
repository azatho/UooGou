<!-- 申请售后页面 -->
<template>
	<view class="">
		<view class="con">
			<view class="img"><image :src="cdnUrl + goods_icon" mode=""></image></view>
			<view class="right">
				<view class="right_msg">{{ goods_name }}</view>
				<view class="norms">{{ goods_norms }}</view>
				<view class="num">
					<view class="">
						<text class="text1">￥</text>
						<text class="text2">{{ goods_cost / 100?goods_cost / 100:'暂无'}}</text>
					</view>
					<view class="count">
						<text class="text4">×</text>
						{{ goods_count?goods_count:'暂无' }}
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="total">
			共{{ goods_count }}件商品 实付：
			<text>¥{{ goods_cost / 100 * goods_count }}</text>
		</view> -->
		<view style="width:100%;height:20rpx;background:rgba(245,245,245,1);"></view>
		
		<view class="refund choose_count">
			<view class="refund_title">
				请选择数量
			</view>
			<view class="count">
				<view class="" @click="desc">
					-
				</view>
				<input type="number" :value="count" @input="getCount" @blur="blur"/>
				<view class="" @click="add">
					+
				</view>
			</view>
		</view>
		
		<view class="refund" @click="getReason">
			 <view>
			 	<view class="refund_title" v-if="type == 1">请选择退款原因</view>
			 	<view class="refund_title" v-else>请选择换货原因</view>
			 </view>
			<view style="display: flex;align-items: center;">
				<view style="margin:0 30rpx;font-size: 25rpx;">{{reason}}</view>
				<image src="../../static/back.png" mode=""></image>
			</view>
		</view>

		<view class="problem">
			<view class="refund_title">问题描述</view>
			<textarea value="" placeholder="请您进行问题描述" @input="getContent" />
		</view>
		
		<view class="addimg">
			<view v-for="(item,i) in service_images" :key="i" style="display: inline-block;position: relative;">
				<image :src="cdnUrl+item" style="width: 120rpx;height: 120rpx;margin: 0 40rpx 20rpx 0;"></image>
				<image src="../../static/del.png" class="cha" @click="del(i)"></image>
			</view>
			<image src="../../static/addtp.png" @click="getImg"></image>
			<view style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">(最多5张)</view>
		</view>

		<view class="sumbit" @click="sumbit">提交申请</view>
		
		<view class="reasonModel" v-if="showReason" @click="close">
			<view  class="reason">
				<view class="" v-for="(item, i) in reasonList" :key="i" @click="getCode(item.code)">
					<view class="refund">
						<view class="refund_title">{{ item.content }}</view>
						<image src="../../static/choose.png" mode="" v-if="item.flag"></image>
						<image src="../../static/fk_icon.png" mode="" v-else></image>
					</view>
				</view>
				<view class="close" @click="close">关闭</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			cdnUrl: '',
			baseUrl: '',
			goods_index: '', //订单商品自增编号
			goods_count: '', //申请售后数量
			count: '', //申请售后数量
			goods_icon: '', //订单tupian
			goods_name: '', //订单名字
			goods_norms: '', //订单规格
			goods_cost: '', //订单价格
			showReason: false,
			reasonList: [],
			reason: '', //售后原因
			type: '', //0换货原因 1退货原因
			service_type: '', //提交申请时 1退款 2换货返修
			barter_type: '', // 1换货 2返修 service_type = 2的时候务必传值
			service_content: '', //问题描述
			service_images: [] ,//图片
			barter_button:'',
			refund_button:'',
		};
	},
	methods: {
		init() {
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=order/serviceReasonList',
				data: {
					token: uni.getStorageSync('token'),
					type: self.type,
				},
			}).then(res=>{
				for (var i = 0; i < res.data.data.length; i++) {
					res.data.data[i].flag = false;
				}
				self.reasonList = res.data.data;
			},rej=>{
				console.log(rej);
			})
		},
		getCount(e){
			this.count=e.detail.value
		},
		blur(e){
			if(e.detail.value>this.goods_count){
				uni.showToast({
					icon:'none',
					title:'数量已超过订单数量' 
				})
				this.count=this.goods_count
			}else if(e.detail.value<1){
				uni.showToast({
					icon:'none',
					title:'至少有一个订单' 
				})
				this.count=1
			}
		}, 
		add(){
			if(this.count<this.goods_count){
				this.count++
			}else{
				uni.showToast({
					icon:'none',
					title:'数量已超过订单数量' 
				})
			}
		},
		desc(){
			if(this.count>1){
				this.count--
			}else{
				uni.showToast({
					icon:'none',
					title:'至少有一个订单'
				})
			}
		},
		getReason() {
			this.showReason = !this.showReason;
		},
		close() {
			this.showReason = false;
		},
		getCode(e) {
			for (var i = 0; i < this.reasonList.length; i++) {
				if (e == this.reasonList[i].code) {
					this.reasonList[i].flag = true;
					this.reason = this.reasonList[i].content;
				} else {
					this.reasonList[i].flag = false;
				}
			}
		},
		getContent(e) {
			this.service_content = e.detail.value;
		},
		getImg() {
			let self = this,
				header = {
					// 'Content-Type': 'multipart/form-data'
				};
			uni.chooseImage({
				count: 1,
				success: function(res) {
					uni.showLoading({
						title:'加载中'
					})
					uni.uploadFile({
						url: self.$baseUrl + 'speciatly/api/app.php?c=uploadOrderImage',
						filePath: res.tempFilePaths.join(','),
						name: 'file',
						formData: {
							token: uni.getStorageSync('token'),
							device: '0'
						},
						// header: header,
						success: function(res) {
							uni.hideLoading()
							let data = JSON.parse(res.data);
							if (data.success) {
								uni.showToast({
									title: '上传成功'
								});
								if(self.service_images.length<=4){
									self.service_images.push(data.data);
								}else{
									uni.showToast({
										icon: 'none',
										title: '最多上传5张图片'
									});
								}
							} else {
								uni.showToast({
									icon: 'none',
									title: '上传失败，请重试~'
								});
							}
						}
					});
				}
			});
		},
		del(e){
			for(var i =0; i <this.service_images.length;i++){
				if(i==e){
					this.service_images.splice(i,1)
				}
			}
		},
		sumbit() {
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=createServiceOrder',
				data: {
					token: uni.getStorageSync('token'),
					order_goods_index: self.goods_index,
					service_type: self.service_type,
					service_goods_count: self.count,
					service_content: self.service_content,
					service_images: self.service_images.join(','),
					barter_type: self.barter_type,
					reason: self.reason,
				},
			}).then(res=>{
				if (res.data.success) {
					uni.showToast({
						title: res.data.msg
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'../my/afterSaleList?refund_button='+self.refund_button+'&barter_button='+self.barter_button
						})
					},200)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					});
				}
			},rej=>{
				cconsole.log(rej);
			})
		}
	},
	onShow() {
		this.init();
	},
	onLoad(option) {
		this.cdnUrl = this.$cdnUrl;
		this.baseUrl = this.$baseUrl;
		this.goods_index = option.goods_index;
		this.goods_count = option.goods_count;
		this.count = option.goods_count;
		this.goods_icon = option.goods_icon;
		this.goods_name = option.goods_name;
		this.goods_norms = option.goods_norms;
		this.goods_cost = option.goods_cost;
		this.service_type = option.type;
		this.barter_button=option.barter_button
		this.refund_button=option.refund_button
		if (this.service_type == 1) {
			uni.setNavigationBarTitle({
				title: '申请退款'
			});
			this.type = '1';
		} else {
			uni.setNavigationBarTitle({
				title: '申请换货'
			});
			this.type = '0';
			this.barter_type = '1';
		}
	},
	mounted() {}
};
</script>

<style lang="scss">
.con {
	margin-top: 30rpx;
	height: 160rpx;
	padding: 20rpx 30rpx;
	display: flex;
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
.total {
	height: 90rpx;
	line-height: 90rpx;
	text-align: right;
	font-size: 26rpx;
	font-family: Hiragino Sans GB;
	font-weight: normal;
	color: #212121;
	padding: 0 30rpx;
	border-top: 1rpx solid #f5f5f5;
	text {
		font-size: 36rpx;
	}
}
.refund {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid #f5f5f5;
	.refund_title {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	image {
		width: 17rpx;
		height: 32rpx;
	}
}
.reasonModel{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5);
	z-index: 22;
	.reason {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 1rpx solid #f5f5f5;
		border-radius: 50rpx 50rpx 0 0;
		background-color: #fff;
		z-index: 222;
		.refund {
			padding: 30rpx;
			position: relative;
			border-bottom: 1rpx solid #f5f5f5;
			.refund_title {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			image {
				position: absolute;
				right: 30rpx;
				top: 40rpx;
				width: 32rpx;
				height: 32rpx;
			}
		}
		.close {
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			background-color: #f5f5f5;
		}
	}
}
.problem {
	padding: 30rpx;
	.refund_title {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	textarea {
		height: 180rpx;
		padding: 20rpx;
		width: 650rpx;
		margin-top: 30rpx;
		background-color: #f5f5f5;
		font-size: 26rpx;
		font-family: Hiragino Sans GB;
		font-weight: normal;
		color: #999999;
	}
}
.photo {
	padding: 0 30rpx;
	image {
		width: 48rpx;
		height: 38rpx;
	}
}
.sumbit {
	width: 590rpx;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	background: #F6281B;;
	border-radius: 45rpx;
	font-size: 36rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #ffffff;
	position: fixed;
	bottom: 20rpx;
	left: 80rpx;
}
.choose_count{
	display: flex;
	justify-content: space-between;
	.count{
		display: flex;
		width: 160rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: #FFFFFF;
		border: 1rpx solid #CCCCCC;
		border-radius: 4rpx;
		view{
			width: 40rpx;
			text-align: center;
		}
		input{
			flex:1;
			text-align: center;
			margin: 0 10rpx;
		}
	}
}
.addimg{
		padding: 30rpx;
		image{
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 20rpx;
		}
		.cha{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: -20rpx;
			right: 20rpx;
		}
	}
</style>
