<!-- 申请售后页面 -->
<template>
	<view style="">
		<view class="con">
			<view class="img">
				<image :src="cdnUrl+goods_icon" mode=""></image>
			</view>
			<view class="right">
				<view class="right_msg">
					{{goods_name}}
				</view>
				<view class="norms">
					{{goods_norms}}
				</view>
				<view class="num">
					<view class="">
						<text class="text2" v-if='order_type==0'>{{goods_cost!=0?'￥'+goods_cost/100:'0'}}</text>
						<text class="text2" v-if='order_type==1'>{{goods_price!=0?'￥'+goods_price/100:''}}{{goods_price!=0&&goods_integral!=0?'+':''}}{{goods_integral!=0?goods_integral/100+'积分':''}}</text>
						<text class="text2" v-if='order_type==2'>{{goods_cost!=0?'￥'+goods_cost/100:'0'}}{{goods_price!=0?'￥'+goods_price/100:''}}或{{goods_price!=0&&goods_integral!=0?'+':''}}{{goods_integral!=0?goods_integral/100+'积分':''}}</text>
					</view>
					<view class="count">
						<text class="text4">×</text>{{goods_count?goods_count:'暂无'}}
					</view>
				</view>
			</view>
		</view>
		<view style="width:100%;height:20rpx;background:rgba(245,245,245,1);"></view>
		
		<view class="refund" @click="lxps()" v-if="refund_button!=0">
			<view class="refund_title">
				<view class="refund_title_text">
					联系配送员 {{ps_phone}}
					<image src="../../static/phoner.png" mode="" style="width:30rpx;height: 30rpx;margin: 0 20rpx;"></image>
				</view>
				<!-- <image src="../../static/back.png" mode=""></image> -->
			</view>
			<view class="refund_word">
				未收到产品请联系配送员
			</view>
		</view>
		<view class="refund" @click="lxsj()" v-if="refund_button!=0">
			<view class="refund_title">
				<view class="refund_title_text">
					联系商家 {{frequent_phone}}
					<image src="../../static/phoner.png" mode="" style="width:30rpx;height: 30rpx;margin: 0 20rpx;"></image>
				</view>
				<!-- <image src="../../static/back.png" mode=""></image> -->
			</view>
			<view class="refund_word">
				产品有问题请联系商家
			</view>
		</view>
		<view class="refund" @click="lxpt()" v-if="refund_button!=0">
			<view class="refund_title">
				<view class="refund_title_text">
					联系平台
				</view>
				<view class="" style="display: flex;align-items: center;font-size:26rpx;font-weight: 400; PingFang SC;">
					在线客服
					<image src="../../static/back.png" mode="" style="margin: 10rpx;"></image>
				</view>
			</view>
			<view class="refund_word">
				订单纠纷或订单申诉请联系平台
			</view>
		</view>
	</view>
</template>

<script>
	import '../../until/MEIQIA.js'
export default {
	data() {
		return {
			cdnUrl:'',
			goods_index:'',//订单商品自增编号
			goods_count:'',//申请售后数量
			goods_icon:'',//订单tupian
			goods_name:'',//订单名字
			goods_norms:'',//订单规格
			goods_cost:'',//订单价格
			ps_phone:'',//配送员手机号
			frequent_phone:'',//商家手机号
			order_type:'',//商品类型
			goods_price:"",//积分价格
			goods_integral:'',//积分
		};
	},
	methods: {
		lxps(){
			uni.makePhoneCall({
				phoneNumber:this.ps_phone,
			});
		},
		lxsj(){
			uni.makePhoneCall({
				phoneNumber:this.frequent_phone,
			});
		},
		lxpt(){
			_MEIQIA('showPanel');
		}
	},
	onShow() {
		 
	},
	onLoad(option) {
		this.cdnUrl=this.$cdnUrl;
		this.goods_index=option.goods_index;
		this.goods_count=option.goods_count;
		this.goods_icon=option.goods_icon;
		this.goods_name=option.goods_name;
		this.goods_norms=option.goods_norms;
		this.goods_cost=option.goods_cost;
		this.barter_button=option.barter_button;
		this.refund_button=option.refund_button;
		this.ps_phone = option.ps_phone;
		this.frequent_phone = option.frequent_phone;
		this.order_type=option.order_type
		this.goods_price=option.goods_price
		this.goods_integral=option.goods_integral
		console.log(option)
		
	}
};
</script>

<style lang="scss">
.con{
	margin-top: 30rpx;
	// height: 160rpx;
	padding: 20rpx 30rpx;
	display: flex;
	border-top: 1rpx solid #f5f5f5;
	.img{
		margin-right: 20rpx;
		image{
			width: 160rpx;
			height: 160rpx;
		}
	}
	.right{
		flex: 1;
		.right_msg{
			height: 80rpx;
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-height: 40rpx;
		}
		.norms{
			border-radius:4rpx;
			color:rgba(153,153,153,1);
			font-size:24rpx;
		}
		.num{
			margin-top: 20rpx;
			font-family:PingFang SC;
			color:rgba(153,153,153,1);
			display: flex;
			justify-content: space-between;
			.text1{
				font-size:22rpx;
				color:rgba(255,54,54,1);
			}
			.text2{
				font-size:30rpx;
				color:rgba(255,54,54,1);
			}
			.count{
				font-size: 30rpx;
				color: #999;
				.text4{
					font: 22rpx;
				}
			}
		}
	}
}
.refund{
    display: flex;
	padding: 20rpx;
	flex-direction: column;
	.refund_title{
		display: flex;
		justify-content: space-between;
		align-items: center;
	.refund_title_text{
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
	}
	    image{
			width: 18rpx;
			height:34rpx;
	    }
	}
	.refund_word{
		margin: 10rpx 0;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}
}

</style>

