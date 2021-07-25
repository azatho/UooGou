<template>
	<view class="near">
	<!-- 	<view class="topTitle">
			附近门店
			<view class="back" @click="goBack">
				<image src="../../static/backarrow.png" mode=""></image>
			</view>
		</view> -->
		<view class="classify">
			<view @click="getComprehensive" :class="comprehensive==true?'classify_tit':''">
				综合
			</view>
			<view class="sale" @click="getSale" :class="showSales==true?'classify_tit':''">
				销量
				<image :src="sales==2?'../../static/up_choose.png':'../../static/up.png'" class="up"></image>
				<image :src="sales==1?'../../static/down_choose.png':'../../static/down1.png'" class="down"></image>
			</view>
			<view class="sale" @click="getDis" :class="showPrice==true?'classify_tit':''">
				距离
				<image :src="distances==2?'../../static/up_choose.png':'../../static/up.png'" class="up"></image>
				<image :src="distances==1?'../../static/down_choose.png':'../../static/down1.png'" class="down"></image>
			</view>
			<view :class="showType==true?'classify_tit':''"  @click="getTypes">
				门店类型
				<uni-icons :type="showType1==true?'arrowup':'arrowdown'" size="15" color="#ccc" style="margin-left: 10rpx;"></uni-icons>
			</view>
		</view>
		<view class="shops" v-if="list.length!=0">
			<view v-for="(item,i) in list" :key="i" @click="getShop(item.supplier_id)" style="border: 1rpx solid #F5F5F5;padding: 10rpx;margin-bottom: 30rpx;">
				<view class="con_detail" >
					<view class="img" style="border: 1rpx solid #F5F5F5;">
						<image :src="cdnUrl+item.supplier_icon" mode=""></image>
					</view>
					<view class="right">
						<view class="title">
							{{item.supplier_name}}
						</view>
						<view class="middle">
							<view class="sale" v-if="item.comment_ratio!=''">
								<block v-for="(icon,j) in stars" :key="j">
									<image :src="icon.icon" class="star" v-if="j<item.comment_ratio"></image>
									<image :src="icon.icon1" class="star" v-else></image>
								</block>
								<!-- 月售{{item.sales}} -->
							</view>
							<view class="sale" v-else>
								<text style="display:inline-block ;margin:0 10px 0 0">
								   暂无评分
								</text>
							</view> 
							<view class="dis">
								销量{{item.sales}}<text>|</text>{{item.distance>=1000?(item.distance/1000).toFixed(1)+'km':item.distance+'m'}}
							</view>
						</view>
			<!-- 			<view class="freight ">
							起送￥{{item.low_price/100}}<text>|</text>
							<text v-if="item.base_price!=0">基础配送费：￥{{item.base_price/100}}</text>
							<text v-else>免配送费</text>
						</view> -->
		<!-- 				<view class="discount">
							<view class="" v-for="(items,k) in item.coupon" :key="k">
								<view :class="items.user_hav==2?'coupon':'coupon1'">
									{{items.deduct_cash/100}}元 <text style="margin-left: 10rpx;">{{items.user_hav==2?'领取':'已领取'}}</text>
								</view>
							</view>
						</view> -->
					</view>
				</view>
				<view style="display:flex;"> 
					<view v-for="(items,index) in item.goods_list" :key="index" >
						<image :src="cdnUrl+items.goods_icon" mode="" style="width: 160rpx;height: 160rpx;margin:20rpx  0  0 10rpx;border: 1rpx solid #F5F5F5;border-radius: 10px;"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="noshop" v-else>
			<image src="/static/noshop(1).png" mode=""></image>
		</view>
		
		<view class="allClass" v-if="showType1">
			<view class="allClassify">
				<view class="con">
					<block v-for="(item,i) in classify" :key="i">
						<view :class="i==current_type?'cur':''" @click="getType(i,item.id)">
							{{item.name}}
						</view>
					</block>
				</view>
				<view class="btns">
					<view class="reset" @click="reset">
						重置
					</view>
					<view class="sure" @click="sure">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				cdnUrl:'',
				comprehensive:true,
				showSales:false,
				showPrice:false,
				sale_flag:false, //标记销量
				price_flag:false,//标记价格
				showType:false,//点击门店类型
				showType1:false,//显示门店类型分类
				classify: [],//门店类型
				current_type:'-1',//当前选择的门店类型
				store_class:'',//门店类型
				list:[],
				stars:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false}
				],//评价星星
				user_lng:'',
				user_lat:'',
				sales:0,
				distances:2,
				page:'0',
				count:'10',
				pageCount:''
			}
		},
		methods:{
			goBack(){
				uni.switchTab({
					url:'./index'
				})
			},
			init(){
				uni.showLoading({
				    title: '加载中'
				});
				let self = this
				self.request({
					url:'ugo/api/app.php?c=account/getStoreListV2',
					data:{
						user_lng:self.user_lng,
						user_lat:self.user_lat,
						sales:self.sales,
						distances:self.distances,
						page:self.page,
						count:self.count,
						store_class:self.store_class
					}
				}).then(res=>{
					if(res.data.success){
						self.pageCount=res.data.data.total/self.count
						if(res.data.data.store){
							for(var i = 0; i < res.data.data.store.length;i++){
								self.list.push(res.data.data.store[i])
							}
						}
						uni.hideLoading()
					}
				})
			},
			getShop(e){
				uni.navigateTo({
					url:'/pages/common/shopHome?id='+e+'&supplierID=0'
				})
			},
			//显示分类框
			getTypes(){
				this.showType1=true
				this.comprehensive=false
				this.showSales=false
				this.showPrice=false
				this.showType=true
				this.sales=''
				this.distances=''
			},
			//获取分类
			getType(e,id){
				this.current_type = e
				this.store_class=id
			},
			sure(){
				this.showType1=false
				if(this.current_type=='-1' && this.showType1==false){
					this.comprehensive=true
					this.showType=false
				}else if(this.store_class!='-1' && this.showType1==false){
					// this.store_class=this.current_type
					this.comprehensive=true
					this.showType=false
					this.list=[]
					this.init()
				}
			},
			reset(){
				this.current_type='-1'
				this.store_class=''
				this.init()
			},
			//点击综合
			getComprehensive(){
				this.comprehensive=true
				this.showSales=false
				this.showPrice=false
				this.showType=false
				this.showType1=false
				this.sales=''
				this.distances=''
				this.list=[]
				this.init()
			},
			//点击销量
			getSale(){
				this.sale_flag=!this.sale_flag
				this.showSales=true
				this.comprehensive=false
				this.showPrice=false
				this.showType=false
				this.showType1=false
				this.distances=0
				if(this.sale_flag && this.showSales){
					console.log(this.sale_flag);
					console.log(this.showSales);
					this.sales='2'
				}else{
					console.log(this.sale_flag);
					console.log(this.showSales);
					this.sales='1'
				}
				this.list=[]
				this.init()
			},
			//点击价格
			getDis(){
				this.price_flag=!this.price_flag
				this.showPrice=true
				this.comprehensive=false
				this.showSales=false
				this.showType=false
				this.showType1=false
				this.sales=0
				if(this.price_flag && this.price_flag){
					this.distances='2'
				}else{
					this.distances='1'
				}
				this.list=[]
				this.init()
			},
		},
		onReachBottom(){
			if(this.page<this.pageCount){
				this.page++
				this.init()
			}
		},
		onShow() {
			this.cdnUrl=this.$cdnUrl
			this.user_lng = uni.getStorageSync('lng')
			this.user_lat = uni.getStorageSync('lat')
			this.list=[]
			this.init()
			let self = this
			self.request({
				url:'ugo/api/app.php?c=account/typeFixed'
			}).then(res=>{
				if(res.data.success){
					self.classify=res.data.data
				}
			})
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
			    title: option.name
			});
		}
	}
</script>

<style lang="scss">
	.near{
		padding-top: 100rpx;
	}
	
	.noshop{
		width: 402rpx;
		height: 417rpx;
		margin: 200rpx auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.classify{
		width: 100%;
		box-sizing: border-box;
		height: 68rpx;
		line-height: 68rpx;
		padding: 0 30rpx;
		border-top: 1rpx solid #f5f5f5;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		position: fixed;
		top: 88rpx;
		left: 0;
		background-color: #fff;
		z-index: 33;
		view{
			width: 25%;
			text-align: center;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.classify_tit{
			color: #FD494F;
		}
		.sale{
			position: relative;
			image{
				width: 10rpx;
				height: 8rpx;
				position: absolute;
			}
			.up{
				top: 27rpx;
				right: 40rpx;
			}
			.down{
				top: 37rpx;
				right: 40rpx;
			}
		}
	}
	.shops{
		padding: 0 30rpx;
		.con_detail{
			width: 100%;
			display: flex;
			// margin-top: 20rpx;
			.img{
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
				margin-right: 24rpx;
				image{
					width: 80rpx;
					height: 80rpx;
					border-radius: 10rpx;
				}
			}
			.right{
				flex: 1;
				overflow:hidden;
				// border-bottom: 1rpx solid #f5f5f5;
				.title{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.middle{
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin: 5rpx 0;
					.sale{
						image{
							width: 22rpx;
							height: 22rpx;
							margin-right: 10rpx;
						}
					}
					.dis{
						text{
							margin: 0 10rpx;
						}
					}
				}
				.freight{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					text{
						margin: 0 10rpx;
					}
				}
				.discount{
					display: flex;
					margin: 20rpx 0;
					.coupon{
						width: 144rpx;
						height: 38rpx;
						line-height: 38rpx;
						text-align: center;
						background: url(../../static/quan.png) no-repeat;
						background-size: 100% 100%;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fff;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}
					.coupon1{
						width: 154rpx;
						height: 38rpx;
						line-height: 38rpx;
						text-align: center;
						background: url(../../static/quan1.png) no-repeat;
						background-size: 100% 100%;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FD4950;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
	.allClass{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 158rpx;
		left: 0;
		box-sizing: border-box;
		background-color: rgba(0,0,0,.3);
		z-index: 22233333;
		.allClassify{
			box-sizing: border-box;
			background-color: #fff;
			.con{
				padding: 20rpx 30rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				view{
					width: 200rpx;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					background: #FFFFFF;
					border: 1rpx solid #CCCCCC;
					border-radius: 4rpx;
					margin-bottom: 30rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				.cur{
					background: rgba(252, 73, 80, 0.3);
					border: 1rpx solid #FC4950;
				}
			}
			.btns{
				display: flex;
				view{
					width: 50%;
					height: 90rpx;
					background: #ccc;
					line-height: 90rpx;
					text-align: center;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
				.reset{
					background: #ccc;
				}
				.sure{
					background: #FC4950;
				}
			}
			
		}
	}
</style>
