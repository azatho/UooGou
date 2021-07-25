<!-- 我的收藏页面 -->
<template>
	<view>
		<view v-if="list.length!=0">
			<mark-slide-list :list="list" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></mark-slide-list>
		</view>
		<view class="bgi" v-else style="margin: 200rpx auto;">
			<image src="../../static/zwsc.png"></image>
			<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">暂无收藏内容</view>
		</view>
	</view>
</template>

<script>
	import {jweixin} from '../../until/jweixin.js'
	import markSlideList from '../../components/mark-slide-list/mark-slide-list.vue'
	export default {
		components: {
			markSlideList
		},
		data() {
			return {
				showAll:false,
				list: [],
				buttonList: [
					{
						title: '删除',
						background: '#F6281B',
					}
				],
				lng:'',
				lat:'',
			}
		},
		methods: {
			// 获取定位
			getlocation(){
				let self=this
				jweixin.ready(function() {
					jweixin.getLocation({
						type: 'wgs84',
						success: function(res) {
							self.lng = res.longitude
							self.lat = res.latitude
							self.init();
							self.holo.loading();
						},
						cancel: function(res) {
							alert('您已禁止获取位置信息')
						}
					});
				});
			},
			// init初始化
			init() {
				if (uni.getStorageSync('token')) {
					let self = this
					self.request({
						url: 'ugo/api/app.php?c=goods/getCollectList',
						data: {
							token: uni.getStorageSync('token'),
							type: 0, //商品
							user_lng:self.lng, //经度
							user_lat:self.lat, //纬度
						},
					}).then(res => {
						if (res.data.success) {
							self.showAll=true
							self.holo.hideLoding();
							self.list = res.data.data //data中所有数据的集合
							// for (var i = 0; i < self.list.length; i++) {
							// 	self.list[i].slide_x=0
							// }
						}
					}, rej => {
						console.log(rej)
					})
				}
			},
			changeMethod(data, button, index) {
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=goods/addCollect',
					data: {
						token: uni.getStorageSync('token'),
						data_id: data.collect_data_id,
						collect_type:0,
						type: 1,
					},
				}).then(res => {
					console.log(res)
					if (res.data.success) {
						self.init()
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}, rej => {
					console.log(rej)
				})
			},
			clickMethod(data) {
				if (data.goods_status == 2) {
					data.activity_type == 0 && uni.navigateTo({
						url: '../common/goodsDetail?id=' + data.collect_data_id
					})
					data.activity_type == 6 && uni.navigateTo({
						url: '../group/seckillDetail?skill_id=' + data.activity_id
					})
					data.activity_type == 5 && uni.navigateTo({
						url: '../group/goodsDetail?id=' + data.activity_id
					})
				} else {
					uni.navigateTo({
						url: './Nocommunity'
					})
				}
			},
			
		},

		onShow() {
			this.getlocation()
		}
	}
</script>

<style>
.bgi {
	width: 476rpx;
	height: 372rpx;
}
.bgi image {
	width: 100%;
	height: 100%;
}
</style>
