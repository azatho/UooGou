<!-- 转赠积分页面 -->
<template>
	<view class="page">
		<view class="number">
			<view class="itemTile">
				转增积分
			</view>
			<view class="itemNum">
				<input class="uni-input" type="number" @input="minNum" :value="number" maxlength="10"
					placeholder="请输入积分数量" />
			</view>
		</view>
		<view class="tel">
			<view class="telText">
				转赠账户
			</view>
			<input class="uni-input" @input="getTel" v-model="tel" type="number" maxlength="11"
				placeholder="请输入对方的手机号"  placeholder-style="font-size:24rpx"/>
		</view>

		<!-- 会员信息 -->
		<view class="vipInfor" v-if="isShow">
			<view class="vipHead">
				会员信息：
			</view>
			<view class="vipItem">
				<view class="vipImg">
					<image :src=$cdnUrl+userInfo.photo mode=""></image>
				</view>
				<view class="vipText">
					<view class="">
						{{userInfo.name}}
					</view>
					<view class="">
						{{userInfo.phone}}
					</view>
				</view>
			</view>
		</view>
		<view class="none" v-else>
		</view>
		<button class="btn" type="warn" @click="affirm">确认转赠</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: "", //手机号
				number: "", //积分数量
				isShow: false, //是否显示会员信息,
				userInfo: null, //被赠人信息
				to_user_id: "",
			};
		},
		methods: {
			//判断积分是否为负
			minNum(e) {
				if (e.target.value < 0) {
					e.target.value = 1
				}
				this.number = e.target.value
			},
			getTel() { //获取手机号
				if (this.tel.length == 11) {
					let flag = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(this.tel)
					if (!flag) {
						uni.showToast({
							title: '手机号有误',
							duration: 1500,
							icon: "none"
						});
						return false;
					}
					this.request({
						url: 'ugo/api/app.php?c=account/getInfoByPhone',
						data: {
							phone: this.tel
						},
					}).then((result) => {
						if (result.data.success) {
							this.userInfo = result.data.data
							this.to_user_id = result.data.data.to_user_id
							this.isShow = true
						} else {
							uni.showToast({
								title: result.data.message,
								duration: 1500,
								icon: "none" 
							});
						}
					})
				} else {
					uni.showToast({
					        title:res.dara.message,
					        icon:'none'
					})
				}
			},
			//转赠成功页面
			affirm() {
				let self=this
				if (!self.number) {
					uni.showToast({
						title: "请输入转赠积分数量",
						icon: "none"
					});
					return
				}
				if(!self.userInfo){
					uni.showToast({
						title: "请输入正确转赠人手机号",
						icon: "none"
					});
					return
				}
				self.request({
					url: 'ugo/api/app.php?c=account/sendScore',
					data: {
						score: self.number,
						to_user_id: self.to_user_id
					},
				}).then(res => {
					if(res.data.success){
						uni.navigateTo({
							url:"paySuccess?score="+self.number
						})
					}else{
						uni.showToast({
						        title:res.data.message,
						        icon:'none'
						})
					}
					//请求成功后跳转，可也能会是失败
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 100vh;
		background-color: #F5F5F5;
	}

	.number {
		height: 220rpx;
		background: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;

		.itemTile {
			height: 120rpx;
			line-height: 120rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}

		.itemNum {
			height: 100rpx;
		}
	}

	.tel {
		margin-top: 20rpx;
		height: 90rpx;
		background-color: white;
		display: flex;
		align-items: center;

		.telText {
			width: 150rpx;
			text-align: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}


	//会员信息
	.vipInfor {
		padding: 10rpx 25rpx;

		.vipHead {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}

		.vipItem {
			margin-top: 10rpx;
			display: flex;

			.vipImg {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.vipText {
				padding-left: 15rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
	}

	.none {
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 15rpx;
		color: #666666;
	}

	//btn
	.btn {
		margin-top: 40rpx;
		width: 90%;
		background: #F4483C;
		font-size: 30rpx;
		border-radius: 45rpx;
	}
</style>
