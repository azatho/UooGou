<!-- 全部评价页面 ==>不知道从哪个页面进来-->
<template>
	<view class="">
		<view class="btns">
			<view :class="type==0?'selected':''" @click="getType(0)">
				全部{{nums.totalCount}}
			</view>
			<view :class="type==1?'selected':''" @click="getType(1)">
				好评{{nums.highComment}}
			</view>
			<view :class="type==2?'selected':''" @click="getType(2)">
				中评{{nums.middleComment}}
			</view>
			<view :class="type==3?'selected':''" @click="getType(3)">
				差评{{nums.poorComment}}
			</view>
			<view :class="type==4?'selected':''" @click="getType(4)">
				有图{{nums.hasImage}}
			</view>
		</view>
		<view class="none" v-if="evaluateInfo.length==0">
			暂无评论
		</view>
		<view class="comments" v-else>
			<block v-for="(item,k) in evaluateInfo" :key="k">
				<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
				<view class="user_msg" >
					<view class="user_left">
						<image :src="cdnUrl+item.comment_icon" ></image>
						<view class="">
							<view class="">
								{{item.comment_nick}}
								<block v-for="(items,i) in item.src" :key="i">
									<image :src="items.icon" class="star"></image>
								</block>
								
							</view>
							<view class="label">
								{{item.sku_name}}
							</view>
						</view>
					</view>
					<view class="time">
						{{item.comment_time}}
					</view>
				</view>
				<view class="content">
					{{item.comment_content}}
				</view>
				<view class="imgs">
					<image :src="cdnUrl+item" v-for="(item,j) in item.commemt_image" :key="j"></image>
				</view>
				
			</block>
		</view>
	</view>
</template>

<script>
	// import {formatdate} from '@/util/common.js'
	export default{
		data(){
			return{
				page:0,
				pageCount:'',
				cdnUrl:'',
				goods_id:'',//商品id
				type:'0',
				evaluateInfo:[],
				nums:{},
				stars:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',falg:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',falg:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',falg:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',falg:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',falg:false}
				],//评价星星
			}
		},
		methods:{
			init(){
				let self = this;
				self.request({
					url:'ugo/api/app.php?c=account/getMyCommentList',//评论列表
					data:{
						token:uni.getStorageSync('token'),
						page:self.page,
						goods_id:self.goods_id,
						type:self.type
					},
				}).then(res=>{
					if(res.data.success){
						// self.nums=res.data.data.title
						// self.pageCount=res.data.pageCount
						if(res.data.data.list.length!=0){
							for(var i = 0; i < res.data.data.list.length;i++){
								res.data.data.list[i].comment_time = self.holo.formatTime(res.data.data.list[i].comment_time*1000)
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
						console.log(self.evaluateInfo);
					}
				},rej=>{
					console.log(rej);
				})
			},
			getType(e){
				this.type = e
				this.page=0
				this.evaluateInfo=[]
				this.init()
			}
		},
		onShow(){
			this.evaluateInfo=[]
			this.init()
		},
		onLoad(option) {
			this.cdnUrl=this.$cdnUrl,
			this.goods_id=option.id
		},
		onReachBottom(){
			if(this.page<this.pageCount-1){
				this.page++
				this.init()
			}
		}
	}
</script>

<style lang="scss">
	.btns{
		padding: 30rpx 30rpx 0;
		position: fixed;
		top: 80rpx;
		left: 0;
		background-color: #fff;
		view{
			width:150rpx;
			height:60rpx;
			display: inline-block;
			line-height: 60rpx;
			text-align: center;
			background:rgba(204,204,204,1);
			border-radius:30rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			margin: 0 20rpx 30rpx 0;
		}
		.selected{
			background:rgba(38,173,112,1);
		}
	}
	.none{
		margin: 350rpx 0 0;
		text-align: center;
	}
	.comments{
		padding-top: 250rpx;
		.user_msg{
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			.user_left{
				display: flex;
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				image{
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.star{
					width: 22rpx;
					height: 22rpx;
					margin: 0 0 0 10rpx;
				}
				.label{
					
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
			.time{
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
		}
		.content{
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin-top: 20rpx;
			padding-left: 110rpx;
		}
		.imgs{
			display: flex;
			flex-wrap: wrap;
			padding-left: 110rpx;
			margin-bottom: 20rpx;
			image{
				width: 130rpx;
				height: 130rpx;
				margin: 20rpx 10rpx 0;
			}
			
		}
	}
	
</style>
