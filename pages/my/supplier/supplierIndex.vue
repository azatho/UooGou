<template>
	<view>
		<!-- 头部内容 -->
		<view class="head">
			<view class="headLeft">
				<image src="https://avatar-static.segmentfault.com/861/385/861385572-5d36ce0ba82c5_huge128" mode="">
				</image>
			</view>
			<view class="headCenter">
				<view class="headCenterTitle">四十二酒水直供四十二酒水直</view>
				<view class="headCenterTime">营业时间:9:00-20"00</view>
			</view>
			<view class="headRith">
				<switch color="red" @change="" />
				<switch color="red" @change="" />
			</view>
		</view>
		<!-- 黄色的金额 -->
		<view class="yellowPrice">
			<view class="priceLiset">
				<view class="priceItem ">
					<view class="">
						<view class="title">
							可提现余额（元）
						</view>
						<view class="price">
							399.00
						</view>
					</view>
					<view class="icon">
						>
					</view>
				</view>
				<view class="border">
						
				</view>
				<view class="priceItem">
					<view class="">
						<view class="title">
							可提现余额（元）
						</view>
						<view class="price">
							399.00
						</view>
					</view>
					<view class="icon">
						>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.head {
		height: 180rpx;
		background-color: red;
		background-color: white;
		// border: 1px solid red;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx;
		box-sizing: border-box;

		.headLeft {
			width: 120rpx;
			height: 120rpx;

			image {
				width: 100%;
				height: 100%;
				// border: 1px solid red;
			}
		}

		.headCenter {
			flex: 1;
			// border: 1px solid red;
			padding-left: 10rpx;

			.headCenterTitle {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.headCenterTime {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}

		.headRith {
			height: 100%;
			width: 200rpx;
			flex-wrap: wrap;
			display: flex;
			justify-content: center;
			align-content: center;
		}
	}

	// 黄色的金额
	.yellowPrice {
		padding: 30rpx;
		background-color: #F5F5F5;

		.priceLiset {
			background-image: linear-gradient(45deg, #FF862B, #FF964F);
			padding: 20rpx;
			display: flex;
			border-radius: 15rpx;
			.border{
				width: 2px;
				margin: 0 15rpx 0 0;
				opacity: 0.2;
				background-color: white;
			}
			.priceItem {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

				.price {
					font-size: 48rpx;
					font-family: PingFang SC;
					font-weight: 800;
					color: #FFFFFF;
				}

				.icon {
					width: 50rpx;
					opacity: 0.5;
					font-size: 50rpx;
					color: white;
				}
			}
		}
	}
</style>
