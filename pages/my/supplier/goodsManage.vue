<template>
	<view style="background: #F5F5F5;">
		<view class="topTitle" style="font-size: 32rpx;font-weight: 700;">
				商品管理
				<view class="back" @click="goBack">
					<image src="../../../static/backarrow.png" mode=""></image> 
				</view>
		</view>
		<view class="glTitle" style="background-color: #FFFFFF;">
			<view :class="index === suoyin ? 'active' : ''" :key="item.type" v-for="(item, index) in table" @click="select(index, item.type)">{{ item.title }}</view>
		</view>
		<view class="content" v-for="(item, index) in list.data" style="background-color: #FFFFFF;margin-bottom: 20rpx;padding-bottom:10rpx;">
			<view class="contentList">
				<view class="contentListTop">
					<view class="img"><image :src="$cdnUrl + item.goods_icon" style="width: 100%;height:100%;border-radius: 10rpx;" mode=""></image></view>
					<view class="contentListright">
						<h2>
							<p
								v-if="item.activity_type == 5 || item.active == 6"
								style="display:inline-block;background:linear-gradient(180deg, #FF6643, #FF8666);padding: 0 10rpx;color: #fff;margin-right: 10rpx;"
							>
								{{ item.activity_type == 5 ? '拼团' : '秒杀' }}
							</p>
							<text>{{ item.goods_name }}</text>
						</h2>
				<p class="price" v-if="item.goods_type==0||item.goods_type==2">￥{{ item.goods_cost / 100 }}</p>
				<p class="jf" v-if="item.goods_type==1">{{item.goods_score_cost!=0?'￥'+ item.goods_score_cost / 100:'' }}{{item.goods_score_cost!=0&&item.goods_integral?'+':''}}{{ item.goods_integral!=0?item.goods_integral / 100+'积分' :''}}</p>
				<p class="jf" v-if="item.goods_type==2">或{{item.goods_score_cost!=0?'￥'+ item.goods_score_cost / 100:'' }}{{item.goods_score_cost!=0&&item.goods_integral?'+':''}}{{ item.goods_integral!=0?item.goods_integral / 100+'积分' :'' }}</p>
						<view class="" style="display: flex;justify-content: space-between;">
							<p class="scj">￥{{ item.goods_price / 100 }}</p>
							<p class="xl">销量{{ item.goods_sale }} | 库存{{ item.goods_sku_count }}</p>
						</view>
					</view>
				</view>
			</view>
			<view class="btnList">
				<view type="default" @click="editGood(item.is_one,item.goods_index,item.sku_index)">编辑</view>
				<view type="default" @click="isGround(item.goods_index)">{{ suoyin == 0 ? '下架' : '上架' }}</view>
				<view type="default" @click="kucun(item.is_one,item.goods_index,item.goods_sku_count,item.sku_inventory)">库存管理</view>
				<view type="default" @click="delGood(item.goods_index)">删除</view>
			</view>
		</view>
		<view v-if='list.data.length==0' style="text-align: center;background-color: #FFFFFF;">
			<image src="../../../static/noshop(1).png" mode="" style="width: 480rpx;height: 360rpx;margin-top: 200rpx;"></image>
			<view style="color: #999999;" class="font-26">暂无商品</view>
		</view>
		<!-- 修改库存模态框 -->
		<view class="msk" v-if="isSzKc">
			<view class="content">
				<view class="contentTitle">
					管理库存
				</view>
				<view class="contentCenter">
					<view class="">修改可订库存</view>
					<input v-model="nums" type="number" :value="nums" />
				</view>
				<view class="contentCenter">
					<view class="">修改实际库存</view>
					<input v-model="nums2" type="number" :value="nums2" />
				</view>
				<view class="contentBtn">
					<view @click="cancel">取消</view>
					<view @click="qrs" class="confime">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			table: [
				{
					type: 2,
					title: '已上架'
				},
				{
					type: 3,
					title: '已下架'
				}
			],
			suoyin: 0,
			datas: {
				type: 2,
				limit: 10,
				page: 1
			},
			pages: 0,
			list: {
				data:[]
			},
			isSzKc:false,
			nums:0, //可订库存数量
			nums2:0,//实际库存数量
			goodsIndex:''
		};
	},
	created() {
		this.init();
	},
	onReachBottom() {
		if (this.pages > this.datas.page) {
			this.datas.page++;
			this.init();
		}
	},
	methods: {
		// 返回供应商主页
		goBack(){
			uni.redirectTo({
				url:'progressEnter'
			})
		},
		init() {
			this.request({
				url: 'ugo/api/app.php?c=supplier/getGoodsList',
				data: this.datas
			}).then(res => {
				if (res.data.success) {
					this.list.data.length>0?this.list.data=[...this.list.data,res.data.data]:this.list = res.data;
					this.pages = res.data.page;
				}
			});
		},
		select(index, type) {
			this.suoyin = index;
			this.datas.type = type;
			this.list={data:[]};
			this.datas.page=0
			this.init();
		},
		//编辑商品
		editGood(is_one,goods_index,sku_index) {
			if(is_one==0){
				this.holo.toast({title:'多规格只能在后台进行编辑'});
				return;
			}
			uni.navigateTo({
				url:'./editproduct?goods_index='+goods_index+'&sku_index='+sku_index
			})
		},
		// 上/下架
		isGround(goods_index) {
			let title = '';
			let content = '';
			if(this.suoyin==0){
				title='提示';
				content = '确定要下架吗?';
			}else if(this.suoyin ==1){
				title='提示';
				content = '确定要上架吗?';
			}
			uni.showModal({
				title: title,
				content: content,
				success:(res)=>{
			        if(res.confirm){ 
						this.request({
							url: 'ugo/api/app.php?c=supplier/changeGoodsStatus',
							data: {
								goods_index: goods_index,
								type: 1
							}
						}).then(res => {
							this.holo.toast({
								title: res.data.msg,
								icon: 'none'
							});
							this.datas.page=0
							this.list={data:[]};
							this.init();
						});
					}				
				}
			})
		},
		//库存
		kucun(is_one,goods_index,goods_sku_count,sku_inventory) {
			if(is_one==0){
				this.holo.toast({title:'多规格只能在后台进行编辑'});
				return;
			}
			this.isSzKc = true;
			this.goodsIndex = goods_index
			this.nums = sku_inventory;
			this.nums2 = goods_sku_count;
		},
		cancel(){
			this.isSzKc = false;
		},
		qrs(){
			if(parseInt(this.nums2)<parseInt(this.nums)){
				uni.showToast({
				        title:'可订库存数必须小于实际库存数',
				        icon:'none'
				})
				return
			}
			this.request({
				url:'ugo/api/app.php?c=supplier/changeGoodsStatus',
				data:{
					goods_index:this.goodsIndex,
					type:4,
					num:this.nums2,
					num2:this.nums
				}
			}).then(res=>{
				this.holo.toast({
					title:res.data.msg,
					icon:'none'
				})
				this.isSzKc = false;
				this.datas.page=0
				this.list={data:[]};
				this.init();
			})
		},
		//标记/取消特价
		bwtj(goods_index, activity_type) {
			let title = '';
			let content = '';
			if (activity_type == 0) {
				title = "提示";
				content = "确定要标记为特价吗?"
			} else if (activity_type == 7) {
				title = '提示';
				content = '确定要取消特价吗?';
			}
			uni.showModal({
				title: title,
				content: content,
				success:(res)=>{
                    if(res.confirm){ 
						this.request({
							url: 'ugo/api/app.php?c=supplier/changeGoodsStatus',
							data: {
								goods_index: goods_index,
								type: 2
							}
						}).then(res => {
							this.holo.toast({
								title: res.data.msg,
								icon: 'none'
							});
							this.datas.page=0
							this.list={data:[]};
							this.init();
						});
					}				
				}
			})
		},
		//删除商品
		delGood(goods_index) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该商品吗?',
				success: res => {
					if (res.confirm) {
						uni.showLoading({ title: '正在删除' });
						this.request({
							url: 'ugo/api/app.php?c=supplier/changeGoodsStatus',
							data: {
								goods_index: goods_index,
								type: 3
							}
						}).then(res => {
							uni.hideLoading();
							this.holo.toast({
								title: res.data.msg,
								icon: 'none'
							});
							this.datas.page=0
							this.list={data:[]};
							this.init();
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
	.msk{
		background:rgba(0,0,0,.5) ;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		.content{
			width: 610rpx;
			padding: 20rpx 0;
			background: #FFFFFF;
			border-radius: 20rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			.contentTitle{
				text-align: center;
				padding: 20rpx 0;
				border-bottom: 1px solid #f5f5f5;
				font-size: 30rpx;
				font-family: Hiragino Sans GB;
				font-weight: normal;
				color: #222222;
			}
			.contentCenter{
				margin: 30rpx 0;
				display: flex;
				align-items: center;
				padding: 0 58rpx;
				view{
					font-size: 26rpx;
					font-family: Hiragino Sans GB;
					font-weight: normal;
					color: #999999;
				}
				input{
					padding: 0 20rpx;
					box-sizing: border-box;
					height: 70rpx;
					flex: 1;
					margin-left: 43rpx;
					background: #F7F7F7;
					border-radius: 6px;
				}
			}
			.contentBtn{
				display: flex;
				justify-content: space-around;
				text-align: center;
				view{
					margin: 10rpx 0;
					width: 225rpx;
					height: 70rpx;
					line-height: 70rpx;
					border: 1px solid #999999;
					border-radius: 35px;
				}
               .confime{
				   background: #008964;
				   color: #fff;
			   }
			}
		}
	}
.glTitle {
	display: flex;
	view {
		width: 50%;
		text-align: center;
		padding: 10rpx 0;
		border-bottom: 1px solid #f5f5f5;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	view.active {
		position: relative;
		color: #f5281c;
	}
	view.active::after {
		content: '';
		width: 40rpx;
		height: 4rpx;
		background: #f5281c;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
}
.contentListTop {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx 0 30rpx;
	.img {
		width: 180rpx;
		height: 180rpx;
		background: pink;
		border-radius: 10rpx;
	}
	.contentListright {
		flex: 1;
		margin-left: 23rpx;
		h2 {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.price {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ff1c1c;
		}
		.jf {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ff1c1c;
		}
		.scj {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			text-decoration: line-through;
			color: #999999;
		}
		.xl {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}
}
.btnList {
	display: flex;
	padding: 0 0 0 40rpx;
    justify-content: flex-end;
	margin-top: 43rpx;
	view {
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin-right: 20rpx;
		background: #ffffff;
		border: 1px solid #f5281c;
		border-radius: 25rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #f4291c;
	}
}
</style>
