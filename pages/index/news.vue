
<template>
	<view class="">
		<view class="" v-if="news_list.length!=0">
			<view class="news_list" v-for="(item, i) in news_list" :key="i" @click="goNews(item.url)">
				<view style="display:flex;justify-content: space-between;">
					<view class="news_title">{{ item.title }}</view>
					<view class="news_time">{{ item.time }}</view>
				</view>
				<view class="news_itro">{{ item.edit_user }}</view>
			</view>
		</view>
		<view class="noneImg" v-else>
			<image src="../../static/zwsj.png" mode=""></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			news_list: []
		};
	},
	methods: {
		init() {
			let self = this;
			this.request({
				url: 'ugo/api/app.php?c=account/appGongGao',
			}).then(res=> {
					for (let i = 0; i < res.data.data.length; i++) {
						res.data.data[i].time = self.holo.formatTime(res.data.data[i].time * 1000);
					}
					self.news_list = res.data.data;
				})
		},
		goNews(e) {
			uni.navigateTo({
				url: '../common/common?src=' + e
			});
		}
	},
	onShow() {
		this.init();
	}
};
</script>

<style lang="scss">
.news_list {
	padding: 20rpx 30rpx;
	border-bottom: 1px solid #f5f5f5;
	.news_title {
		font-size: 30rpx;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.news_time {
		color: #999;
		font-size: 26rpx;
	}
	.news_itro {
		color: #666;
		font-size: 26rpx;
		margin-top: 10rpx;
	}
}
.noneImg{
	text-align: center;
	margin-top: 200rpx;
	image{
		width: 640rpx;
		height: 480rpx;
	}
}


</style>
