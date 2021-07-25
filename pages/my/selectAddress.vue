<template>
	<view class="" style="padding: 100rpx 0;">
		<view class="search">
			<view class="left">
				<text style="display: inline-block; width: 100rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; margin-right: -10rpx;align-items: center;">{{site}}</text>
			</view>
			<view class="right">
				<input type="text" placeholder="请输入地址" v-model="searchName" />
				<view class="searchImg">
					<image src="../../static/search1.png"></image>
				</view>
				<view class="text1" @click="getsearch">搜索</view>
			</view>
		</view>
		<view class="" v-if="nearSite.length!=0">
			<block v-for="(item,i) in nearSite" :key='i'>
				<view class="receive_detail" @click="gohome(item)">
					<view class="word">
						{{item.title}}
					</view>
					<view class="word1">
						{{item.address}}
					</view>
				</view>
			</block>
		</view>
		<view v-else style="text-align: center;margin-top: 20rpx; color: #999;">暂无更多数据</view>
	</view>
</template>

<script>
	import {
		jweixin
	} from '../../until/jweixin.js'
	export default {
		data() {
			return {
				showCity: false,
				address_id: '', //地址id
				site: '', //左上角区域的名字
				full_name: '', //定位的全称
				// address:'',//定位地址全称
				nearSite: [], // 附近地址l列表
				laat: '',
				lng: '',
				provinceName: '', //省名字
				cityName: '', //市名字
				countryName: '', //区名字
				chooseAddress: '',
				searchName: '', //输入的搜索的名字
			}
		},
		created() {
			// this.getLocation();
		},
		methods: {
			// 获取附近地址
			getNear() {
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=account/locationToAddress',
					data: {
						lng: self.lng,
						lat: self.lat
					}
				}).then(res => {
					if (res.data.success) {
						self.nearSite = res.data.data;
					}
				});
			},
			sure() {
				this.showCity = false;
				if (this.countyName != '') {
					this.site = this.countyName;
					this.chooseAddress = this.provinceName + this.cityName + this.countyName;
					uni.setStorageSync('full_name', this.chooseAddress)
					uni.setStorageSync('address', this.site)
				}
			},

			// // 点击收货地址到首页
			// gosearch(full_name, address) {
			// 	let self = this;
			// 	self.request({
			// 		url: 'ugo/api/app.php?c=account/addressToLocation',
			// 		data: {
			// 			address: full_name
			// 		}
			// 	}).then(res => {
			// 		if (res.data.success) {
			// 			self.lng = res.data.data.lng
			// 			self.lat = res.data.data.lat
			// 			uni.setStorageSync('lng', res.data.data.lng)
			// 			uni.setStorageSync('lat', res.data.data.lat)
			// 			uni.navigateBack({
			// 				data: 2
			// 			})
			// 		}
			// 	});
			// },
			//点击附近地址到首页
			gohome(e) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				if (prevPage.$vm) {
					prevPage.$vm.value4 = e.title;
					prevPage.$vm.lng = e.location.lng;
					prevPage.$vm.lat = e.location.lat;
				}
				uni.navigateBack({
					data:1
				})
			},
			// 搜索地址
			getsearch() {
				var self = this;
				self.request({
					url: 'ugo/api/app.php?c=account/addressToLocation',
					data: {
						address: self.chooseAddress + self.searchName
					}
				}).then(res => {
					if (res.data.success) {
						self.lng = res.data.data.lng
						self.lat = res.data.data.lat
						self.getNear()
					}
				});
			}
		},
		onShow() {

		},
		onLoad(options) {
			this.chooseAddress = options.province_name + options.city_name + options.county_name;
			if(options.county_name){
				this.site =  options.county_name;
			}else{
				this.site = '暂无'
				uni.showToast({
					icon: 'none',
					title: '请选择所在区域'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.search {
		width: 100%;
		height: 108rpx;
		display: flex;
		padding: 0 30rpx;
		box-sizing: border-box;
		align-items: center;
		border-bottom: 1px solid #f5f5f5;
		background-color: #fff;
		position: fixed;
		top: 90rpx;
		left: 0;
		z-index: 333;
		.left {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #3F3D3D;
			align-items: center;
			display: flex;
			text-align: center;
			margin-right: 20rpx;
			image {
				width: 24rpx;
				height: 24rpx;
				vertical-align: middle;
				margin: 5rpx 10rpx 0 5rpx;
			}
		}

		.right {
			flex: 1;
			height: 60rpx;
			position: relative;
			display: flex;
			justify-content: space-between;
			input {
				width: 350rpx!important;
				height: 68rpx;
				background: #F5F5F5;
				border-radius: 10rpx;
				padding-left: 80rpx;
				box-sizing: border-box;
				flex: 1;
			}
			.searchImg {
				width: 80rpx;
				height: 100%;
				line-height: 70rpx;
				text-align: center;
				position: absolute;
				top: 2rpx;
				left: 0;
				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
			.text1 {
				width: 80rpx;
				margin-left: 20rpx;
				height: 70rpx;
				text-align: center;
				line-height: 70rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FD635E;
			}
		}
	}

	.current_addr {
		padding: 20rpx 30rpx;

		.tip {
			font-size: 26rpx;
			color: #999;
		}

		.detail_addr {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0 30rpx 0;
			border-bottom: 1px solid #f5f5f5;

			.addr {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333;
				flex: 1;
			}

			.location {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF0000;

				image {
					width: 30rpx;
					height: 30rpx;
					vertical-align: middle;
					margin: -5rpx 10rpx 0 30rpx;
				}
			}
		}
	}

	.receive_addr {
		padding: 20rpx 30rpx;

		.tip {
			font-size: 26rpx;
			color: #333;

			image {
				width: 30rpx;
				height: 30rpx;
				vertical-align: middle;
				margin-right: 10rpx;
			}
		}
	}

	.receive_detail {
		padding: 30rpx 60rpx;
		border-bottom: 1px solid #f5f5f5;

		.word {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		.word1 {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999;
			margin-top: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			text {
				margin-left: 10rpx;
			}
		}
	}

	.add_addr {
		width: 100%;
		height: 95rpx;
		line-height: 95rpx;
		text-align: center;
		background: #FFFFFF;
		box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.1);
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		position: fixed;
		bottom: 0;
		left: 0;

		image {
			width: 36rpx;
			height: 36rpx;
			margin: 5rpx 10rpx 0 0;
		}
	}

	.citys {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0;
		left: 0;

		.city {
			width: 100%;
			height: 700rpx;
			background: #FFFFFF;
			position: absolute;
			left: 0;
			bottom: 0;

			.city_top {
				width: 100%;
				height: 88rpx;
				border-bottom: 2rpx solid #e7e7e7;
				display: flex;
				justify-content: space-between;

				.city_sure {
					width: 130rpx;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #D42520;
				}

				.city_tabs {
					display: flex;

					view {
						padding: 0 40rpx;
						height: 88rpx;
						line-height: 88rpx;
						position: relative;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;

						.tip {
							padding: 0;
							width: 56rpx;
							height: 2rpx;
							background: #9C191F;
							position: absolute;
							bottom: 0;
							left: 50%;
							transform: translateX(-50%);
						}
					}

					.txt {
						color: #333 !important;
						font-weight: 500 !important;
					}
				}
			}

			.srcoll_options {
				height: 600rpx;
				display: flex;

				scroll-view {
					view {
						text-align: center;
						height: 70rpx;
						line-height: 70rpx;
					}

					.txt {
						color: #D42520;
					}
				}
			}
		}
	}
</style>
