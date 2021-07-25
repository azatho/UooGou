<template>
	<view class="group">
		<view class="top">
			拼团享优惠
		</view>
		<view class="" v-if="list.length!=0">
			<image src="../../static/group.png" class="bgc"></image>
			<view class="logoImg">
				<image src="../../static/group1.png"></image>
			</view>
			<view class="goods">
				<block v-for="(item,i) in list" :key="i">
					<view class="con" @click="goGroup(item.id)">
						<view class="img">
							<image :src="cdnUrl+item.goods_icon" mode=""></image>
						</view>
						<view class="right">
							<view class="name">
								{{item.group_name}}
							</view>
							<view class="rule">
								已拼团{{item.group_num}}件
							</view>
							<view class="price"> 
								￥{{item.group_price/100}}
							</view>
							<view class="price1">
								￥{{item.goods_cost/100}}
							</view>
						</view>
						<view class="goGroup">
							去拼团
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="noneImg" v-else>
			<image src="../../static/zwsj.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cdnUrl:'',
				list:[],
				page:1,
				lng:'',
				lat:'',
			}
		},
		methods:{
			init(){
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=group/appGroupList',
					data:{
						page:self.page,
						user_lng:self.lng,
						user_lat:self.lat,
					}
				}).then(res => {
					if (res.data.success) {
						self.list = res.data.data.groupList
					}
				});
			},
			goGroup(e){
				uni.navigateTo({
					url:'/pages/group/goodsDetail?id='+e
				})
			}
		},
		onLoad(option) {
			this.lng=option.lng
			this.lat=option.lat
			this.cdnUrl=this.$cdnUrl
			this.init()
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	.top{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		z-index: 333;
		font-size: 32rpx;
		.arrow{
			width: 120rpx;
			height: 100%;
			line-height: 80rpx;
			text-align: center;
			position: absolute;
			top: 0;
			left: 0;
			image{
				width: 22rpx;
				height: 37rpx;
			}
		}
	}
	.noneImg{
		width: 640rpx;
		height: 480rpx;
		margin: auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.group{
		padding-top: 380rpx;
		display: flex;
		flex-direction: column;
		height: 100%;
		.bgc{
			width: 100%;
			height: 462rpx;
			position: fixed;
			top: 80rpx;
			left: 0;
		}
		.logoImg{
			width: 100%;
			height: 292rpx;
			background: linear-gradient(#ff5f58, #ff7649);
			position: fixed;
			top: 80rpx;
			left: 0;
			z-index: 22222;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.goods{
			padding: 0 30rpx;
			flex: 1;
			.con{
				width: 690rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 7rpx 0px rgba(192, 192, 192, 0.35);
				border-radius: 10rpx;
				display: flex;
				margin-bottom: 20rpx;
				position: relative;
				padding: 30rpx 22rpx 0;
				box-sizing: border-box;
				.img{
					width: 158rpx;
					height: 159rpx;
					margin-right: 27rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.right{
					flex: 1;
					border-bottom: 1px solid #f5f5f5;
					.name{
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #222222;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.rule{
						width: 150rpx;
						text-align: center;
						padding: 5rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						background: #F5F5F5;
						border-radius: 4px;
						margin-top: 10rpx;
					}
					.price{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FF3F3F;
						margin-top: 20rpx;
						margin-left: 20rpx;
					}
					.price1{
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999;
						text-decoration: line-through;
						margin: 4rpx 0 15rpx 20rpx;
					}
				}
				.goGroup{
					position: absolute;
					bottom: 30rpx;
					right: 30rpx;
					width: 150rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background: linear-gradient(30deg, #FD4950, #FF6F60);
					border-radius: 30rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
