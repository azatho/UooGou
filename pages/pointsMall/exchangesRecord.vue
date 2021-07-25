<!-- 积分兑换记录 -->
<template>
	<view class="box">
		<view v-if="exchangeList.list==0" style="text-align:center;"> 
			<img src="../../static/noshop(1).png" alt="暂无数据" style="margin-top: 200rpx;width: 480rpx;height: 360rpx;">
			<view class="font-30" style="color: #999999;">暂无数据</view>
		</view>
		<view class="boxItem" v-else v-for="(item,index) in exchangeList.list" @click="goInfor(item)">
				<view class="itemTime">
						{{holo.formatTime(item.payment_time*1000)}}
				</view>
				<view class="itemConten">
					<view class="itemImg">
						<image :src="$cdnUrl+item.goods_list[0].goods_icon" mode=""></image>
					</view>
					<view class="itemText">
						{{item.goods_list[0].goods_name}}
					</view>
					<view class=" ">
						<!-- 对应下商品type的价格显示 -->
						<view class="font-24">
							<view v-if='item.order_total_price!=0' >{{'-￥'+$returnFloat(item.order_total_price)}}</view>
							<view>{{item.goods_list[0].goods_type==1&&item.order_coupon!=0?'-'+$returnFloat(item.order_coupon)+'积分':''}}</view>
						</view>
					</view>
					<view style="margin-left: 30rpx;"><image style="width: 13rpx;height: 26rpx;" src="../../static/back.png" mode=""></image></view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				pageIndex:0,//默认起始页
				exchangeList:{
					list:[]
				},//兑换记录
			}
		},
		// 下拉生命周期事件
		onReachBottom(){
			if(this.pageIndex<this.exchangeList.page){
				this.pageIndex++
				this.ajax()
			}else{
				
			}
		},
		onShow(){
			this.exchangeList={list:[]}
			this.pageIndex=0;
			this.ajax()
		},
		
		methods: {
			// 跳转到订单详情页面
			goInfor(e){
				console.log(e)
				uni.navigateTo({
					url:'pointShopOrder?index='+e.order_index
				})
			},
			// 请求兑换列表数据
			ajax(){
				let self =this
				self.request({
					url:"ugo/api/app.php?c=order/mallScoreOrderList",
					data:{
						page:self.pageIndex
					}
				}).then(res => {
				        if (res.data.success) {
							// 原先是否有数据，如果有，拼接数据，如果没有直接赋值
							self.exchangeList.list.length>0?self.exchangeList.list=[...self.exchangeList.list,...res.data.data.list]:self.exchangeList=res.data.data
				        } else {
				                uni.showToast({
				                title: res.data.message,
				                icon: 'none'
				                })
				        }
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
</style>
<style lang="scss">
.box{
	padding: 20rpx 25rpx;
	box-sizing: border-box;
	.boxItem{
		margin-bottom: 20rpx;
		height: 200rpx;
		background: #FFFFFF;
		border-radius: 10px;
		padding: 20rpx;
		box-sizing: border-box;
		.itemTime{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
		.itemConten{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.itemImg{
				width: 100rpx;
				height: 100rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.itemText{
				flex: 1;
				font-size: 26rpx;
				line-height: 40rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				padding: 10rpx;
				overflow: hidden;
				-webkit-line-clamp: 2;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
			}
			.itemIntegral{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				   &:after {
				        content: ">";
								font-weight: 600;
								font-size: 35rpx;
								opacity: 0.5;
				    }
			}
		}
	}
}
</style>
