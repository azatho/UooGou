<!-- 我的评论列表页面 -->
<template>
	<view>
		<view v-if="evaluateInfo.length!=''">
			<view class="critic"  v-for="(item,i) in evaluateInfo" :key='i'>
				<view class="img">
					<!-- 店铺的头像 -->
					<image :src="cdnUrl+item.supplier_icon"></image>
				</view>
				<view class="right">
					<!-- 第一行 -->
					<view class="one" @click="goshop(item.comment_supplier_id)">
						<view class="shopstar">
							<!-- 商家名 -->
							<view class="" style="display: flex;align-items: center;">
								<view class="shop" style="max-width: 120px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;flex: 1;">
								  <text>{{item.supplier_name}}</text>	
								</view>
								<image src="../../static/back.png" style="width: 13rpx;height: 26rpx;margin-left: 10rpx;"></image>
							</view>
							<view>
								<block v-for="(items,j) in item.src" :key="j">
									<image :src="items.icon" class="star"></image>
								</block>
							</view>
						</view>
						<view class="time">{{item.comment_time}}</view>
					</view>
					<!-- 第二行 -->
					<view class="two">{{item.comment_content}}</view>
					<!-- 图片行 -->
					<view class="tupian">
						<image :src="cdnUrl+itemt" v-for="(itemt,k) in item.comment_images" :key="k" @click="prewImg(k,item.comment_images)"></image>
					</view>
					<!-- 第三行 -->
					<view class="three" v-for="(itm,t) in item.comment_list" :key='t' @click="goshangpin(itm.goods_index,itm.goods_status)">
						<view class="img1">
							<image :src="cdnUrl+itm.goods_icon" v-if="itm.goods_icon"></image>
						<view v-else style="width: 100%;height: 100%;border:1px solid #FFFFFF;color:#ccc; text-align: center; line-height: 108rpx; font-size: 20rpx;">
							暂无图片
						</view>
						</view>
						<view class="right">
							<view class="title">{{itm.goods_name || '暂无名称'}}</view>
							<view class="last">
								<view class="mony" >{{itm.goods_cost!=0?'￥'+itm.goods_cost/100:''}}{{itm.goods_coupon!=0&&itm.goods_cost!=0?'+':''}}{{itm.goods_coupon!=0?itm.goods_coupon/100+'积分':''}}</view>
								<view class="num">×{{itm.goods_count}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="none">没有更多评论了~</view>
		</view>
		<view v-else style="text-align: center; margin-top: 200rpx;">
			<image src="../../static/zwpl.png" style="width: 374rpx;height: 314rpx;"></image>
			<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">暂无评论内容</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:0,
				pageCount:'',
				cdnUrl:'',
				imgsarray:[],
				stars:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false}
				], //评价星星
				evaluateInfo:[],//数据集合
			}
		},
		methods: {
			init(){
				let self = this;
				self.request({
					url:'ugo/api/app.php?c=account/getMyCommentList',
					data:{
						token:uni.getStorageSync('token'),
						page:self.page
					},
				}).then(res=>{
					if(res.data.success){
						self.pageCount=res.data.pageCount
						if(res.data.data.list.length!=0){
						for(var i = 0; i < res.data.data.list.length;i++){
							res.data.data.list[i].comment_time = self.holo.formatdate(res.data.data.list[i].comment_time*1000)
							if(res.data.data.list[i].comment_score/10==0){
								var src=[
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data.list[i].comment_score/10==1){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data.list[i].comment_score/10==2){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data.list[i].comment_score/10==3){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data.list[i].comment_score/10==4){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data.list[i].comment_score/10==5){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
								]
							}
							res.data.data.list[i].src=src
							self.evaluateInfo.push(res.data.data.list[i])
						}
						}else{
							self.evaluateInfo=[]
						}
					}
				},rej=>{
					console.log(rej);
				})
			},
			//查看大图
			prewImg(index,imgs){
				var self  = this;
				for(var i = 0;i<imgs.length;i++){
					imgs[i]=self.cdnUrl+imgs[i]
					self.imgsarray.push(imgs[i])
				}
				// console.log(self.imgsarray);
				uni.previewImage({
					current:index-1,
					urls:self.imgsarray,
					loop:true,
					indicator: 'number'
				})
			},
			// 到门店
			goshop(id){
				// if (supplier_status == 2) {
					uni.navigateTo({
						url: '../common/shopHome?id=' +id
					})
				// } else {
				// 	uni.navigateTo({
				// 		url: './NoShop'
				// 	})
				// }
			},
			// 到商品页面
			goshangpin(id,goods_status){
				if (goods_status == 2) {
					uni.navigateTo({
						url: '../common/goodsDetail?id=' + id
					})
				} else {
					uni.navigateTo({
						url: './Nocommunity'
					})
				}
			}
		},
		onReachBottom(){
			if(this.page<this.pageCount-1){
				this.page++
				this.init()
			}
		},
		onShow() {
			this.evaluateInfo=[]
			this.page=0
			this.cdnUrl=this.$cdnUrl
			this.init()
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
	.none {
		text-align: center;
		margin-top: 10rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}
.critic {
	background-color: #FFFFFF;
	margin: 20rpx 30rpx;
	border-radius: 10px;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
}
.critic image {
	width: 100%;
	height: 100%;
}
.critic .img {
	width: 120rpx;
	height: 120rpx;
	border-radius: 10rpx;
	margin-right: 30rpx;
}
.critic .right {
	flex: 1;
}
.critic .one {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.one .shopstar .shop{
	font-size: 30rpx;
	font-weight: bold;
	color: #333333;
}
.one .shopstar .star {
	width: 30rpx;
	height: 28rpx;
	margin-right: 10rpx;
}
.one .time {
	font-size: 26rpx;
	font-weight: 400;
	color: #999999;
}
.critic .right .two {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.critic .right .three {
	display: flex;
	justify-content: space-between;
	background: #F5F5F5;
	padding: 12rpx 20rpx 15rpx;
	margin-top: 20rpx;
}
.three .img1 {
	width: 108rpx;
	height: 108rpx;
	margin-right: 20rpx;
}
.three .right .title{
	font-size: 20rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	flex: 1;
}
.three .right .last {
	display: flex;
	justify-content: space-between;
	font-family: Source Han Sans CN;
	margin-top: 30rpx;
}
.three .last .mony {
	font-size: 25rpx;
	font-weight: 400;
	color: #ED5736;
}
.three .last .num {
	font-size: 22rpx;
	font-weight: 300;
}
.tupian {
	display: flex;
	flex-wrap: wrap;
}
.tupian image {
	width: 130rpx;
	height: 130rpx;
	margin-top: 20rpx;
	margin-right: 20rpx;
}
</style>
