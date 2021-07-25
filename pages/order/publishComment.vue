<!-- 发布评价页面 -->
<template>
	<view>
		<!-- 店铺名称 -->
		<view class="shop">
			<view class="img"><image :src="cdnUrl+supplier_info.supplier_icon"></image></view>
			<view class="shopname">
				{{supplier_info.supplier_name}}
				<!-- 店铺评分 -->
				<view class="comment" style="padding: 0rpx; margin-top: 10rpx;">
					<text>店铺评分</text>
					<block v-for="(item,i) in stars4" :key="i">
						<image :src="item.flag==true?item.icon:item.icon1" class="star" @click="getshopes(i)"></image>
					</block>
					<text style="margin-left: 30rpx;">{{commentWord4}}</text>
				</view>
			</view>
		</view>
		<!-- 整体评价 -->
		<view class="comment" style="padding: 30rpx;border-bottom: 1rpx solid #f5f5f5;">
			<text>整体评价</text>
			<block v-for="(item,i) in stars1" :key="i">
				<image :src="item.flag==true?item.icon:item.icon1" class="star" @click="getAll(i)"></image>
			</block>
			<text style="margin-left: 30rpx;">{{commentWord1}}</text>
		</view>
		<!-- 商品信息展示 -->
		<view class="shop" v-for="(item,i) in goodsMsg" :key='i'>
			<view class="img" style="width: 148rpx; height: 148rpx;"><image :src="cdnUrl+item.goods_icon"></image></view>
			<view style="flex: 1;">
				<view class="shopname" style="margin: 0;font-size: 26rpx;">{{item.goods_name}}</view>
				<view class="pirce" style="margin-top: 30rpx;">
					<text style="font-size: 25rpx;"></text>
					{{item.goods_cost!=0?'￥'+item.goods_cost/100:''}}{{item.goods_cost!=0&&item.goods_integral!=0?'+':''}}{{item.goods_integral!=0?item.goods_integral/100+'积分':''}}
				</view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="appraise">
			<textarea value="" placeholder="你对收到的商品还满意吗？说说你的看法吧" @input="getCon"/>
		</view>
		<!-- 添加图片 -->
		<view class="addimg">
			<view v-for="(item,i) in imgs" :key="i" style="display: inline-block;position: relative;">
				<image :src="cdnUrl+item" style="width: 120rpx;height: 120rpx;margin: 0 40rpx 20rpx 0;"></image>
				<image src="../../static/del.png" class="cha" @click="del(i)"></image>
			</view>
			<image src="../../static/addtp.png" @click="addImg"></image>
			<view style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">(最多5张)</view>
		</view>
		<view style="width: 100%;height: 20rpx;background-color: #f5f5f5;"></view>
		<!-- 评价2 -->
		<view style="">
			<view class="comment" style="padding: 30rpx;">
				<text>物流评价</text>
				<block v-for="(item,i) in stars2" :key="i">
					<image :src="item.flag==true?item.icon:item.icon1" class="star" @click="logistics(i)"></image>
				</block>
				<text style="margin-left: 30rpx;">{{commentWord2}}</text>
			</view>
			<view class="comment" style="padding: 30rpx;">
				<text>服务评价</text>
				<block v-for="(item,i) in stars3" :key="i">
					<image :src="item.flag==true?item.icon:item.icon1" class="star" @click="service(i)"></image>
				</block>
				<text style="margin-left: 30rpx;">{{commentWord3}}</text>
			</view>
		</view>
		<view class="sumbit" @click="sumbit">
			提交发布
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdnUrl:'',
				goodsMsg:[],
				stars1:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false}
				],//评价星星
				stars2:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false}
				],//评价星星
				stars3:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false}
				],//评价星星
				stars4:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false}
				],//评价星星
				commentWord1:'',
				commentWord2:'',
				commentWord3:'',
				commentWord4:'',
				imgs:[],
				comment_score:'',//商品评分
				comment_content:'',//评价内容
				comment_express_score:'',//物流评分
				comment_service_score:'',//服务评分
				comment_supplier:'',//店铺评分
				order_index:'',
				supplier_info:[],//店铺信息
			}
		},
		methods: {
			init(){
				let self = this;
				self.request({
					url:'ugo/api/app.php?c=mallOrderInfo',//商品详情
					data:{
						token: uni.getStorageSync('token'),
						order_index:self.order_index
					}
				}).then(res=>{
					// self.goodsMsg = res.data.data.goods_list
					self.supplier_info=res.data.data
					for(var i=0; i<res.data.data.goods_list.length;i++){
						self.goodsMsg.push(res.data.data.goods_list[i])
						self.goodsMsg[i].order_goods_index=res.data.data.goods_list[i].order_goods_index
					}
					self.order_goods_index=self.goodsMsg[0].order_goods_index
				},rej=>{
					console.log(rej);
				})
			},
			// 评价内容
			getCon(e){
				this.comment_content=e.detail.value
			},
			// 添加图片
			addImg(){
				let self = this,
					header = {
						// 'Content-Type': 'multipart/form-data'
					};
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title:'加载中'
						})
						uni.uploadFile({
							url: self.$baseUrl + 'ugo/api/app.php?c=uploadOrderImage',
							filePath: res.tempFilePaths.join(','),
							name: 'file',
							formData: {
								token: uni.getStorageSync('token'),
								device: '0'
							},
							// header: header,
							success: function(res) {
								uni.hideLoading()
								let data = JSON.parse(res.data);
								if (data.success) {
									uni.showToast({
										title: '上传成功'
									});
									if(self.imgs.length<=4){
										self.imgs.push(data.data);
									}else{
										uni.showToast({
											icon: 'none',
											title: '最多上传5张图片'
										});
									}
								} else {
									uni.showToast({
										icon: 'none',
										title: '上传失败，请重试~'
									});
								}
							}
						});
					}
				});
			},
			// 删除图片
			del(e){
				for(var i =0; i <this.imgs.length;i++){
					if(i==e){
						this.imgs.splice(i,1)
					}
				}
			},
			// 店铺评价
			getshopes(e){
				if(e==0){
					this.commentWord4='很差'
				}else if(e==1){
					this.commentWord4='差'
				}else if(e==2){
					this.commentWord4='一般'
				}else if(e==3){
					this.commentWord4='好'
				}else{
					this.commentWord4='非常好'
				}
				this.comment_express_score=e
				for(var i = 0; i < this.stars4.length; i++){
					if(i<=e){
						this.stars4[i].flag=true
					}else{
						this.stars4[i].flag=false
					}
				}
			},
			// 整体评价
			getAll(e){
				if(e==0){
					this.commentWord1='很差'
				}else if(e==1){
					this.commentWord1='差'
				}else if(e==2){
					this.commentWord1='一般'
				}else if(e==3){
					this.commentWord1='好'
				}else{
					this.commentWord1='非常好'
				}
				this.comment_score=e
				for(var i = 0; i < this.stars1.length; i++){
					if(i<=e){
						this.stars1[i].flag=true
					}else{
						this.stars1[i].flag=false
					}
				}
			},
			// 物流评价
			logistics(e){
				if(e==0){
					this.commentWord2='很差'
				}else if(e==1){
					this.commentWord2='差'
				}else if(e==2){
					this.commentWord2='一般'
				}else if(e==3){
					this.commentWord2='好'
				}else{
					this.commentWord2='非常好'
				}
				this.comment_express_score=e
				for(var i = 0; i < this.stars2.length; i++){
					if(i<=e){
						this.stars2[i].flag=true
					}else{
						this.stars2[i].flag=false
					}
				}
			},
			// 服务评价
			service(e){
				if(e==0){
					this.commentWord3='很差'
				}else if(e==1){
					this.commentWord3='差'
				}else if(e==2){
					this.commentWord3='一般'
				}else if(e==3){
					this.commentWord3='好'
				}else{
					this.commentWord3='非常好'
				}
				this.comment_service_score=e
				for(var i = 0; i < this.stars3.length; i++){
					if(i<=e){
						this.stars3[i].flag=true
					}else{
						this.stars3[i].flag=false
					}
				}
			},
			// 按钮
			sumbit(){
				let self = this;
				if(self.comment_content==''){
					uni.showToast({
						icon:'none',
						title:'请输入评论内容'
					})
				}else{
					self.request({
						url:'ugo/api/app.php?c=setComment',//评价商品接口===>自己找的
						data:{
							token:uni.getStorageSync('token'),
							order_index:self.order_index,
							comment_score:self.comment_score+1,
							comment_supplier:self.comment_supplier+1,
							comment_content:self.comment_content,
							order_goods_index:self.order_goods_index,
							comment_express_score:self.comment_express_score+1,
							comment_service_score:self.comment_service_score+1,
							comment_images:self.imgs.join(',')
						},
					}).then(res=>{
						if(res.data.success){
							uni.showToast({
								title:res.data.msg
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/my/my'
								})
							},500)
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						console.log(rej);
					})
				}
			},
		},
		onLoad(option) {
			this.imgs=[]
			this.cdnUrl=this.$cdnUrl
			this.order_index=option.index
			this.init()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
.shop {
	display: flex;
	margin: 30rpx;
}
.shop image {
	width: 100%;
	height: 100%;
}
.shop .img {
	width: 120rpx;
	height: 120rpx;
	border-radius: 10rpx;
	margin-right: 20rpx;
}
.shop .shopname {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-top: 10rpx;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.shop .pirce {
	// margin-top: 40rpx;
	font-size: 34rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #FF3636;
}
.comment{
		padding: 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		image{
			width: 30rpx;
			height: 30rpx;
			margin: 0 0 0 20rpx;
			vertical-align: middle;
		}
	}
// 评价
.appraise {
	width: 691rpx;
	height: 201rpx;
	background: #F5F5F5;
	border-radius: 10rpx;
	margin: 30rpx;
	margin-bottom: 0;
	padding: 20rpx;
	box-sizing: border-box;
}
.appraise textarea {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
}
// 图片
.addimg{
		padding: 30rpx;
		image{
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 20rpx;
		}
		.cha{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: -20rpx;
			right: 20rpx;
		}
	}
.sumbit{
		margin: 50rpx 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background: #FF6351;
		border-radius: 45rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
