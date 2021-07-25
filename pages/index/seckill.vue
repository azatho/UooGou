<template>
	<view class="seckill">
		<view class="top">
			<view class="tabbar">
				限时秒杀
			</view>
			<view class="tabs">
				<block v-for="(item,i) in tabs" :key="i">
					<view class="tab" @click="getCurrent(i)">
						<text :class="i==current?'txt2':'txt1'">{{item.name}}</text>
						<view class="line" v-if="i==current"></view>
					</view>
				</block>
			</view>
		</view>
		<view class="bgc"></view>
		
		<view class="goods_con" v-if="current==0">
			<view v-if="list.length!=0">
				<block v-for="(item,i) in list">
					<view class="list" @click="goDetail(item.id)">
						<view class="con">
							<view class="img">
								<image :src="cdnUrl+item.goods_icon" mode=""></image>
							</view>
							<view class="right">
								<view class="title">
									<text>秒杀</text>{{item.goods_name}}
								</view>
								<view class="progress" ></view>
								<view class="price">
									￥{{item.skill_price/100}}<text>￥{{item.goods_cost/100}}</text>
								</view>
							</view>
						</view>
						<view class="address" @click.stop="goShopHome(item.supplier_id)">
							<image src="../../static/address.png" mode=""></image>{{item.supplier_name}}
						</view>
						<view class="button">
							抢先看
						</view>
					</view>
				</block>
			</view>
			<view v-else>
				<image src="../../static/zwsj.png" mode="" style="margin-top: 250rpx;"></image>
			</view>
		</view>
		
		<view class="goods_con" v-else>
			<view v-if="list1.length!=0">
				<block v-for="(item,i) in list1">
					<view class="list">
						<view class="con" @click="goDetail(item.id)">
							<view class="img">
								<image :src="cdnUrl+item.goods_icon" mode=""></image>
							</view>
							<view class="right">
								<view class="title">
									<text>秒杀</text>{{item.skill_name}}
								</view>
								 <view class="progress">
									 <block v-if="item.goods_status=='1'">
									 	<view class="num">
									 	 	已抢{{item.ratio}}% 
									 	 </view>
									 	<view class="percent">
									 		<progress :percent="item.ratio" active stroke-width="5" backgroundColor="#f5f5f5" activeColor="#FD494F"/>
									 	</view>
									 </block>
									 <view class="progress1" v-else>
									 	全部商品已售空
									 </view>
								</view>
								<view class="price">
									￥{{item.skill_price/100}}<text>￥{{item.goods_cost/100}}</text>
								</view>
							</view>
						</view>
						<view class="address" @click="goShopHome(item.supplier_id)">
							<image src="../../static/address.png" mode=""></image>{{item.supplier_name}}
						</view>
						<view class="button" v-if="item.goods_status=='1'" @click="goDetail(item.id)">
							马上抢
						</view>
						<view class="button1" v-else>
							已抢完
						</view>
					</view>
				</block>
			</view>
			<view v-else style="text-align: center;">
				<image src="../../static/zwsj.png" mode="" style="margin-top: 250rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				cdnUrl:'',
				tabs:[
					{name:'即将开始'},
					{name:'正在进行'}
				],
				current:'0',
				list:[],
				list1:[]
			}
		},
		methods:{
			getCurrent(e){
				this.current=e
			},
			goDetail(e){
				let self = this
				uni.navigateTo({
					url:'/pages/group/seckillDetail?skill_id='+e+'&current='+self.current
				})
			},
			goShopHome(e){
				let self = this
				uni.navigateTo({
					url:'/pages/common/shopHome?id='+e
				})
			},
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=skill/skillGoodsList',
					data: {
					  user_lng: uni.getStorageSync('lng'),
					  user_lat: uni.getStorageSync('lat'),
					}
				}).then(res=>{
					if(res.data.success){
						for(var i =0; i <res.data.data.list.length;i++){
							if(res.data.data.list[i].skill_status==0){
								self.list.push(res.data.data.list[i])
							}else{
								self.list1.push(res.data.data.list[i])
							}
						}
					}
				})
			}
		},
		onShow(){
			this.list=[]
			this.list1=[]
			this.cdnUrl=this.$cdnUrl
			this.init()
		}
	}
</script>

<style lang="scss">
	.seckill{
		padding-top: 180rpx;
		.top{
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background-color: #F72D21;
			z-index: 333;
			.tabbar{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				position: relative;
				text-align: center;
				color: #fff;
				font-size: 30rpx;
				.back{
					width: 100rpx;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					position: absolute;
					top: 0;
					left: 0;
					image{
						width: 18px;
						height: 18px;
					}
				}
			}
			.tabs{
				padding: 0 30rpx;
				height: 90rpx;
				display: flex;
				.tab{
					width: 50%;
					line-height: 60rpx;
					text-align: center;
					font-family: PingFang SC;
					color: #FFFFFF;
					position: relative;
					.txt1{
						font-weight: 400;
						font-size: 26rpx;
					}
					.txt2{
						font-weight: bold;
						font-size: 30rpx;
					}
					.line{
						width: 54rpx;
						height: 3rpx;
						background: #FFFFFF;
						border-radius: 2rpx;
						position: absolute;
						bottom: 30rpx;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
		}
		.bgc{
			width: 100%;
			height: 215rpx;
			background: linear-gradient(0deg, #FF5F53, #F6281B);
			position: fixed;
			top: 180rpx;
			left: 0;
			z-index: -1;
		}
		.goods_con{
			padding: 0 30rpx 0;
			.list{
				width: 690rpx;
				height: 260rpx;
				padding: 20rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0px 0px 8rpx 0px rgba(169, 169, 169, 0.25);
				border-radius: 10rpx;
				margin-bottom: 20rpx;
				position: relative;
				.con{
					display: flex;
					.img{
						width: 160rpx;
						height: 160rpx;
						margin-right: 10rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.right{
						flex: 1;
						.title{
							text{
								display: inline-block;
								width: 60rpx;
								height: 30rpx;
								text-align: center;
								line-height: 30rpx;
								background: linear-gradient(-38deg, #FF6326, #FF4D5A);
								border-radius: 4rpx;
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #FFFFFF;
								margin-right: 10rpx;
							}
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #222222;
							height: 80rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.progress{
							display: flex;
							height: 40rpx;
							line-height: 40rpx;
							align-items: center;
							.num{
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #999999;
							}
							.percent{
								width: 200rpx;
								margin-left: 20rpx;
							}
						}
						.progress1{
							height: 40rpx;
							line-height: 40rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
						}
						.price{
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FF3F3F;
							margin-top: 10rpx;
							text{
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 400;
								text-decoration: line-through;
								color: #999999;
								margin-left: 20rpx;
							}
						}
					}
				}
				.address{
					width: 100%;
					box-sizing: border-box;
					position: absolute;
					bottom: 0;
					left: 0;
					padding: 0 30rpx;
					height: 54rpx;
					line-height: 54rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					overflow: hidden;
					white-space: nowrap;
					text-overflow:ellipsis;
					image{
						width: 26rpx;
						height: 25rpx; 
						margin-right: 10rpx;
					}
				}
				.button{
					width: 150rpx;
					height: 60rpx;
					background: #F72D21;
					border-radius: 30rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					position: absolute;
					bottom: 70rpx;
					right: 20rpx;
				}
				.button1{
					width: 150rpx;
					height: 60rpx;
					background: #ccc;
					border-radius: 30rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					position: absolute;
					bottom: 70rpx;
					right: 20rpx;
				}
			}
			
		}
	}
	
</style>
