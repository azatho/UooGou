<!-- 售后列表 -->
<template>
	<view class="">
		<view class="tab">
			<block v-for="(item,i) in tabList" :key="i">
				<view  @click="getCurrent(i)">
					<text :class="current==i?'current':''">{{item.name}}</text>
				</view>
			</block>
		</view>
		
		
		<view class="msg_list" v-if="list.length!=0">
			<block v-for="(item,i) in list" :key ="i">
				<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
				<view class="msg" >
					<view class="tit" >
						<view class="">
							售后编号 {{item.service_order}}
						</view>
						<view :class="item.status=='2'?'word_status':'word_status1'" >
							{{item.text}}
						</view>
					</view>
					<view class="con">
						<view class="img">
							<image :src="cdnUrl+item.goods_icon" mode=""></image>
						</view>
						<view class="right">
							<view class="right_msg">
								{{item.goods_name}}
							</view>
							<view class="num">
								<view class="">
									<text class="text1">￥</text>
									<text class="text2">{{item.goods_cost/100}}</text>
								</view>
								<view class="count">
									<text class="text4">×</text>{{item.goods_count}}
								</view>
							</view>
						</view>
					</view>
					<view class="btn">
						<view class="cancle_btn" @click="detail(item.service_order_index)">
							售后详情
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="none" v-else>
			<image src="../../static/zwsj.png"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cdnUrl:'',
				tabList:[
					{name:'换货'},
					{name:'退货'}
				],
				current:'0',
				type:'2',//1退款 2换货返修
				page:0,
				pageCount:'',
				list:[]
			}
		},
		methods:{
			getCurrent(e){
				this.current=e
				if(e==0){
					this.type='2'
				}else{
					this.type='1'
				}
				this.page=0;
				this.list=[]
				this.init()
			},
			init(){
				let self = this;
				this.request({
					url: 'ugo/api/app.php?c=serviceOrderList',//售后列表
					data: {
						token: uni.getStorageSync('token'),
						page:self.page,
						type:self.type,
						device:''
					},
				}).then(res=>{
						if(res.data.success){
							self.pageCount=res.data.pageCount
							for(var i = 0; i<res.data.data.list.length;i++){
								self.list.push(res.data.data.list[i])
							}
						}else{
							this.holo.toast({
								icon:'none',
								title:'登录失效,请重新登录'
							})
						}
				},rej=>{
					console.log(rej);
				})
			},
			detail(e){
				if(this.current==0){
					uni.navigateTo({
						url:'./exchangeDetail?service_order_index='+e
					})
				}else{
					uni.navigateTo({
						url:'./refundDetail?service_order_index='+e
					})
				}
				
			}
		},
		onShow(){
			this.list=[]
			this.init()
			this.cdnUrl=this.$cdnUrl
		},
		onLoad(option){
			if(option.barter_button == 1 && option.refund_button==1){
				this.tabList=[
					{name:'换货'},
					{name:'退货'}
				]
			}else if(option.barter_button == 0 && option.refund_button==1){
				this.tabList=[
					{name:'退货'}
				]
			}else if(option.barter_button == 1 && option.refund_button==0){
				this.tabList=[
					{name:'换货'}
				]
			}
		},
		onReachBottom(){
			if(this.page<this.pageCount-1){
				this.page++
				this.init()
			}
		},
	}
</script>

<style lang="scss">
	.tab{
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 30rpx;
		view{
			width: 50%;
			text-align: center;
			text{
				display: inline-block;
			}
		}
		.current{
			border-bottom: 4rpx solid #05B781;
			color: #05B781;
		}
	}
	.none{
		margin: 200rpx;
		text-align: center;
	}
	.none image {
		width: 374rpx;
		height: 314rpx;
	}
	.msg{
		margin: 15rpx 0;
		background-color: #fff;
		padding: 20rpx 0;
		border-radius:10rpx;
		.tit{
			padding: 0 30rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			display: flex;
			justify-content: space-between;
			.word_status{
				color: #EF1D22;
			}
			.word_status1{
				color:rgba(37,173,109,1);
			}
		}
		.con{
			margin-top: 30rpx;
			height: 160rpx;
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
				padding-top: 10rpx;
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
		.btn{
			display: flex;
			border-top: 1rpx solid #f5f5f5;
			padding: 20rpx 30rpx 0;
			.cancle_btn{
				width:135rpx;
				height:50rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 50rpx;
				text-align: center;
				border-radius:25rpx;
				margin-left: auto;
				background:rgba(255,255,255,1);
				border:1px solid #05B781;
				color:#05B781;
			}
		}
	}
</style>
