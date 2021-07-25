<!--积分商城  -->
<template>
	<view>
		<!-- 轮播图 -->
		<view class="banner" >
			<swiper class="swiper"  :autoplay="true" :interval="3000" :duration="1000" :circular='true'>
				<swiper-item v-for="(item,index) in shopList.data.activity_banner" @click="goOther(item)" :key='index'>
						<img :src="cdnUrl+item.image" alt="" >
				</swiper-item>
			</swiper>
		</view>
		
		<!-- //分区内容 -->
		<view class="zone">
			<view class="item" v-for="(item,index) in zoneObj" :key = 'index' @click="goZone(index)">
				<view class="itemImg">
					<image :src="item.img" mode=""></image> 
				</view>
				<view class="itemText">
					{{item.text}}
				</view> 
			</view>
		</view>

		<!-- 头部内容 -->
		<view class="headTitle">
			<view class="headTitleItem font-24" @click="getColor(index)" :class="{action:headColor==index}"
				v-for="(item,index) in headTitlt" :key="item">
				<view style="display: flex;">
					<view>{{item}}</view>
					<view v-if="index>0" style="position: relative;">
						<span class="iconfont icon-paixujiantoushang" :class="upSelct==0&&index==headColor?'icon-style1':'icon-style'"></span>
						<span class="iconfont icon-paixujiantouxia"   :class="upSelct==1&&index==headColor?'icon-style1':'icon-style'" style="position: absolute;transform: translateX(-100%);"></span>
					</view>
				</view>
			</view>
		</view>
		<!-- <view><111/view> -->
		<!-- 中间内容 -->
		<view class="bodyConent">
			<view class="bodyConentItem" @click="goInfor(item)" v-for="(item,index) in shopList.data.list">
				<view class="itemImg">
					<image :src="cdnUrl+item.goods_icon"></image>
				</view>
				<view class="itemText">
					<view class="itemTitle">{{item.goods_name}}</view>
					<view class="itemPrice" v-if="item.goods_type==1">
						<span style='margin-left: 5rpx;' v-if='item.goods_score_cost!=0'>{{'￥'+$returnFloat(item.goods_score_cost)+'+'}}</span>						
						<image src="../../static/jifen.png"></image>
						<span v-if='item.goods_type==1'>{{$returnFloat(item.goods_integral)}}积分</span>
					</view>
					<view class="itemPrice" v-if="item.goods_type==0">
						<span style='margin-left: 5rpx;' v-if='item.goods_cost!=0'>{{'￥'+$returnFloat(item.goods_cost)}}</span>
					</view>
					<view class="itemNumber">{{item.goods_sale}}件已兑换</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdnUrl:this.$cdnUrl,//图片解析地址
				headTitlt: ['综合', "积分", "兑换量"], //头部渲染列表
				headColor: 0, //头部颜色对应的值
				showPop: true, //弹出层的
				zoneObj:[{
					img:'../../static/exchange4.png',
					text:'助农产品'
				},{
					img:'../../static/fenlei.png',
					text:'商品分类'
				},{
					img:'../../static/exchange3.png',
					text:'我的积分'
				},{
					img:"../../static/exchange2.png",
					text:"最新上架"
				}],//分区信息图片文字
				images: [], //banner列表
				pageIndex:1,//页数
				upSelct:0,//选择的正序或者倒序
				shopList:{
					data:{
						page:1,
						activity_banner:[],//轮播图消息
						list:[],//商品信息
					}
				},//商城信息
			}
		},
		onShow(){
			this.pageIndex=1
			this.shopList={
					data:{
						activity_banner:[],
						list:[],
						page:1
					}
				}
			this.ajaxIndexInfo()
		},
		onReachBottom(){
			if(this.pageIndex<this.shopList.page){
				this.pageIndex++
				this.ajaxIndexInfo()
			}
		},
		methods: {
			// 轮播图跳转
			goOther(e){
				if (e.type == 1) {
					uni.navigateTo({
						url: 'exchangeGoodsDetail?id='+e.content
					});
				}
			},
			//获取兑换商城主页信息
			ajaxIndexInfo(){
				let self =this 
				self.request({
					url:"ugo/api/app.php?c=account/getScoreCenterList",
					data:{
						type:this.headColor+1,
						up:self.upSelct+1,
						limit:20,
						page:self.pageIndex
					}
				}).then(res => {
				        if (res.data.success) {
							self.shopList.data.list.length>0?self.shopList.data.list=[...self.shopList.data.list,...res.data.data.list]:self.shopList=res.data
				        } else {
				                uni.showToast({
				                title: res.message,
				                icon: 'none'
				                })
				        }
				})
			},
			//点击分区
			goZone(e){
				if (e==0||e==3){
					uni.navigateTo({
						url:"./hotgoods?type="+e
					})
				}else if (e==2){
					
					uni.redirectTo({
						url:'index'
					})
				}else if (e==1){
					uni.navigateTo({
						url:"commodityClassification"
					})
				}
	
			},
			//点击头部切换
			getColor: function(e) {
				if(this.headColor==e)this.upSelct=!this.upSelct
				this.headColor = e
				this.pageIndex=1;
				this.shopList.data.list=[]
				this.ajaxIndexInfo()
			},
			//点击商品
			goInfor(e) {
				uni.navigateTo({
					url:"exchangeGoodsDetail?id="+e.goods_index
				})
			},
			//点击了popups close
			popclose() {
				console.log('点击了Close');
				this.showPop = false
			},
			//点击了popups ok
			popOk() {
				console.log('点击了ok');
				this.popclose()
			}
		}
	}
</script>

<style lang="scss">
	.icon-style{
		color: #CCCCCC;
	}
	.icon-style1{
		color: #333333;
	}
	//轮播图
	.banner {
		width: 100%;
		height: 300rpx;
		.swiper {
			width: 100%;
			height:300rpx;
		}
	
		img {
			width: 100%;
			height: 100%;
		}
	}
	
	//分区内容
	.zone{
		height: 189rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-around;
		box-sizing: border-box;
		padding: 20rpx 0;
		border-bottom: 20rpx solid #F5F5F5;
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			.itemImg{
				width: 88rpx;
				height: 88rpx;
				text-align: center;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.itemText{
				height: 25rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	
	// 头部内容
	.headTitle {
		height: 60rpx;
		line-height: 60rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-around;
		.headTitleItem {
			margin-top: 10rpx;
			text-align: center;
		}
		.action {
			color: red;
		}
	}

	// 中间内容
	.bodyConent {
		padding: 0rpx 30rpx 20rpx;
		// min-height: calc(100vh - 150rpx);
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-content: flex-start;

		.bodyConentItem {
			margin-top: 20rpx;
			width: 335rpx;
			// height: 480rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			box-shadow: 0 0 2px #b4b8bf;
			.itemImg {
				// padding: 40rpx 25rpx 10rpx;
				height: 335rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}

			.itemText {
				padding: 20rpx;

				.itemTitle {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}

				.itemPrice {
					// height: 25rpx;
					line-height: 50rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF3F3F;

					image {
						width: 26rpx;
						height: 26rpx;
					}
				}

				.itemNumber {
					height: 22rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
</style>
