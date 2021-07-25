<template>
	<view>
		<view class="status_bar">
			<view class="left_img" @click="back"><image src="../../static/leftback.png" mode=""></image></view>
			<view class="input">
				<input type="text" v-model="value" placeholder="请输入商品名称"/>
				<image src="../../static/search(1).png" class="search_img" @click="search"></image>
				<view class="del" @click="del">
					<image src="../../static/del.png" ></image>
				</view>
			</view>
			<view class="searchWord" @click="search">
				搜索
			</view>
		</view>
		
		<view v-if="history_list.length!=0">
			<view class="title" >
				<view class="word">历史搜索</view>
				<view class="del" @click="empty"><image src="../../static/del1.png" mode=""></image></view>
			</view>
			<view class="history_list">
				<block v-for="(item,j) in history_list" :key="j">
					<view class="history" v-if="item" @click="jump(item)">{{ item }}</view>
				</block>
			</view>
		</view>
		<view class="none_history" v-else>
			暂无搜索历史
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			history_list: [],
			value: '',
			lng:'',
			lat:'',
			type:"0",
		};
	},
	methods: {
		//获取历史记录
		init() {
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=goods/searchHistory',
				data:{
					type:this.type
				}
			}).then(res=> {
				if(res.data.success){
					self.history_list = res.data.data;
				}
			});
		},
		//返回到首页
		back() {
			if (this.type==0){
				uni.switchTab({
					url: './index'
				});
			}else{
				uni.redirectTo({
					url: '../supplyChain/index'
				});
			}
		},
		jump(e){
			this.value = e
			this.search()
		},
		//点击搜索跳到搜索页面
		search(){
			if(this.value!=''){
				uni.navigateTo({
					url:'./searchList?value='+this.value+'&lng='+this.lng+'&lat='+this.lat+'&type='+this.type
				})
			}else{
				uni.showToast({
					icon:'none',
					title:'请输入要搜索关键词'
				})
			}
		},
		//清空输入框的值
		del(){
			this.value=''
		},
		//删除历史记录
		empty(){
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=searchEmpty',
				data:{
					type:this.type
				}
			}).then(res=> {
				if(res.data.success){
					self.init()
				}
			});
		}
		
	},
	onShow() {
		this.init();
	},
	onLoad(options) {
		options.type?this.type=options.type:this.type=0
		this.lat=options.lat
		this.lng=options.lng
	}
};
</script>

<style lang="scss">
.status_bar {
	padding: 15rpx 30rpx;
	display: flex;
	.left_img {
		width: 50rpx;
		height: 70rpx;
		image {
			margin-top: 19rpx;
			width: 18rpx;
			height: 32rpx;
		}
	}
	.input {
		width: 410rpx;
		height: 70rpx;
		padding: 0 70rpx 0 60rpx;
		line-height: 70rpx;
		height: 70rpx;
		background: rgba(238, 241, 244, 1);
		border-radius: 35rpx;
		position: relative;
		input {
			height: 70rpx !important;
			line-height: 70rpx !important;
		}
		.search_img {
			width: 30rpx;
			height: 28rpx;
			position: absolute;
			top: 20rpx;
			left: 25rpx;
		}
		.del {
			width: 80rpx;
			height: 70rpx;
			position: absolute;
			top: 0;
			right: 0;
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 20rpx  0 0 25rpx;
			}
		}
	}
	.searchWord{
		height: 70rpx;
		flex: 1;
		text-align: center;
		line-height: 70rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
}
.title {
	padding: 0 30rpx;
	display: flex;
	height: 70rpx;
	align-items: center;
	justify-content: space-between;
	.word {
		ont-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}
	.del {
		width: 50rpx;
		text-align: right;
		image {
			width: 32rpx;
			height: 32rpx;
		}
	}
}
.history_list {
	display: flex;
	padding: 0 30rpx;
	flex-wrap: wrap;
	.history {
		padding: 10rpx 40rpx;
		background-color: #f5f5f5;
		border-radius: 30rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		margin: 20rpx 20rpx 0 0;
	}
}
.none_history{
	text-align: center;
	margin-top: 100rpx;
}
</style>
