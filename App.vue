<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
   @import "uview-ui/index.scss";
	.color-red{
		color: #F35F55;
	}
	.color1-white{
		color: #FFFFFF;
	}
	.font-20{
		font-size: 20rpx;
	}
	.font-22{
		font-size: 22rpx;
	}
	.font-24{
		font-size: 24rpx;
	}
	.font-26{
		font-size: 26rpx;
	}
	.font-28{
		font-size: 28rpx;
	}
	.font-30{
		font-size: 30rpx;
	}
	.font{
		font-weight: 400;
		font-family: PingFang SC;
	}
	/*每个页面公共css */
	.commonBgc{
		width: 100%;
		height: 20rpx;
		background-color: #f5f5f5;
	}
	.topTitle{
		text-align: center;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 11rpx;
		font-family: FZCuYuan-M03S;
		font-weight: 500;
		color: #000;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		z-index: 999;
		.back{
			position: absolute;
			top: 0;
			left: 0;
			width: 120rpx;
			height: 88rpx;
			image{
				width: 17rpx;
				height: 32rpx;
			}
		}
	}
	.shareModel{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.5);
		z-index: 999;
		.model{
			width: 395rpx;
			height: 239rpx;
			position: absolute;
			top: 0;
			right: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.login{
			width: 580rpx;
			height: 620rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			text-align: center;
			image{
				width: 495rpx;
				height: 253rpx;
				margin-top: 30rpx;
			}
			view{
				text-align: center;
			}
			.tip{
				margin: 40rpx 0 26rpx;
				font-size: 42rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #333333;
			}
			.tip1{
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #999;
			}
			.btn{
				width: 366rpx;
				height: 81rpx;
				background: #F93A2D;
				border-radius: 41rpx;
				color: #fff;
				line-height: 81rpx;
				margin: auto;
				margin-top: 60rpx;
			}
		}
	}
</style>
