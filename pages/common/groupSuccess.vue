<template>
	<view class="">
		<view class="join_con">
			<view class="number">
				拼团成功
			</view>
			<view class="photo">
				<view class="imgs">
					<image src="../../static/payment.png" mode=""></image>
					<view class="tip">
						拼主
					</view>
				</view>
				<view class="dian">
					<image src="../../static/dian.png" mode=""></image>
				</view>
				<view class="imgs">
					<image src="../../static/question.png" mode=""></image>
				</view>
			</view>
			<view class="btns">
				<view class="home" @click="">
					回到首页
				</view>
				<view class="order" @click="goList">
					查看订单
				</view>
			</view>
		</view>
		<view class="commonBgc"></view>
		
		<view class="recommend" v-if="list.length!=0">
			<view class="recommend_tit">
				<view class="line"></view>
				<view class="title">
					为你推荐
				</view>
				<view class="line"></view>
			</view>
			<view class="goods">
				<view class="goods_con" v-for="item in list" :key="item.goods_index" @click="goDetail(item.goods_index)">
					<image :src="cdnUrl+item.goods_icon" mode=""></image>
					<view class="name">
						<text class="pt">拼团</text>
						{{item.group_goods_name||'暂无'}}
					</view>
					<view class="price">
						<view class="">
							￥{{item.group_price/100||'暂无'}}
						</view>
						<view class="goPt" @click="gotime(item.id)">
							去拼团
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				page:'1',
				tuan_id:''
			}
		},
		methods:{
			init(){
				let self=this
				self.request({
					url:'ugo/api/app.php?c=groupShare',
					data:{
						tuan_id:self.tuan_id
					}
				}).then(res=>{
					if(res.data.success){
						self.orderInter=res.data.data
					}
				},rej=>{
					console.log(rej);
				})
			},
			init1(){
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=group/appGroupList',
					data:{
						page:self.page,
						user_lng:uni.getStorageSync('lng'),
						user_lat:uni.getStorageSync('lat'),
					}
				}).then(res => {
					if (res.data.success) {
						self.list = res.data.data.groupList
					}
				});
			},
			goList(){
				uni.navigateTo({
					url:'/pages/common/ptOrderList'
				})
			},
			// 去拼团按钮
			gotime(e){
				uni.navigateTo({
					url:'../group/goodsDetail?id='+e
				})
			},
		},
		onLoad(option) {
			this.lng=option.lng
			this.lat=option.lat
			this.tuan_id=option.tuan_id
			this.cdnUrl=this.$cdnUrl
			this.init()
			this.init1()
		},
	}
</script>

<style lang="scss">
	.join_con{
		padding: 30rpx 0;
		.number{
			font-size: 30rpx;
			text-align: center;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FC4950;
		}
		.photo{
			display: flex;
			height: 120rpx;
			line-height: 120rpx;
			justify-content: center;
			margin: 60rpx 0;
			.imgs{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.tip{
					position: absolute;
					top: 10rpx;
					left: -20rpx;
					width: 72rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					background: #FC4950;
					border-radius: 15rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			.dian{
				width: 32rpx;
				height: 6rpx;
				margin: 0 40rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.btns{
			width: 100%;
			display: flex;
			justify-content: center;
			view{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				width: 250rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				border-radius: 45rpx;
			}
			.home{
				background: #FC4950;
				color: #FFFFFF;
			}
			.order{
				color: #FC4950;
				background: #FFFFFF;
				border: 1px solid #FC4950;
				margin-left: 60rpx;
			}
		}
	}

	.recommend{
		.recommend_tit{
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx 0 30rpx;
			.line{
				width:100rpx;
				height:1rpx;
				background:rgba(153,153,153,1);
			}
			.title{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				margin: 0 20rpx;
			}
		}
		.goods{
			padding: 20rpx 29rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.goods_con{
				width: 330rpx;
				height: 500rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				margin-bottom: 30rpx;
				overflow: hidden;
				image{
					width: 330rpx;
					height: 330rpx;
					border-radius:10rpx ;
					border: 2rpx solid #F5F5F5;
				}
				.name{
					width: 310rpx;
					margin: 10rpx 0 10rpx 10rpx;
					height: 70rpx;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					.pt{
						display: inline-block;
						width: 60rpx;
						height: 30rpx;
						line-height: 30rpx;
						text-align: center;
						background: linear-gradient(30deg, #FD4950, #FF6F60);
						border-radius: 4rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin-right: 10rpx;
					}
				}
				.price{
					height: 80rpx;
					line-height: 80rpx;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(255,63,63,1);
					margin-left:16rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.goPt{
						width: 100rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: #FC4950;
						border-radius: 20rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
					
				} 
			}
		}
	}
</style>
