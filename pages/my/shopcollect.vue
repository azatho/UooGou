<!-- 收藏店铺 -->
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
	import markSlideList from '../../components/mark-slide-list/mark-slide-list-shop.vue'
	export default {
		data() {
			return {
				showAll:false,
				lng:'',
				lat:'',
				list: [],
				buttonList: [
					{
						title: '删除',
						background: '#F6281B',
					}
				],
			}
		},
		components: {
			markSlideList
		},
		methods: {
			// 获取定位
			// getlocation(){
			// 	let self=this
			// 	jweixin.ready(function() {
			// 		jweixin.getLocation({
			// 			type: 'wgs84',
			// 			success: function(res) {
			// 				self.lng = res.longitude
			// 				self.lat = res.latitude
			// 				self.init();
			// 				self.holo.loading();
			// 			},
			// 			cancel: function(res) {
			// 				alert('您已禁止获取位置信息')
			// 			}
			// 		});
			// 	});
			// },
			// init初始化
			init(){
				if(uni.getStorageSync('token')){
					let self=this
					self.request({
						url:'ugo/api/app.php?c=goods/getCollectList',
						data:{
							token:uni.getStorageSync('token'),
							type:1,
							user_lng:uni.getStorageSync('lng'), //经度
							user_lat:uni.getStorageSync('lat'), //纬度
						},
					}).then(res=>{
						if(res.data.success){
							self.showAll=true
							self.holo.hideLoding();
							self.list=res.data.data //data中所有数据的集合
							for(var i = 0; i < res.data.data.length;i++){
							if(res.data.data[i].comment_ratio==0){
								var src=[
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data[i].comment_ratio==1){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data[i].comment_ratio==2){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data[i].comment_ratio==3){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star1.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data[i].comment_ratio==4){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star1.png'},
								]
							}else if(res.data.data[i].comment_ratio==5){
								var src=[
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
									{icon:'../../static/star.png'},
								]
							}
							res.data.data[i].src=src
							console.log(self.list);
							console.log(res.data.data[i]);
							}
						}
					},rej=>{
						console.log(rej)
					})
				}
			},
			changeMethod(data, button, index){
				let self=this
				self.request({
					url: 'ugo/api/app.php?c=goods/addCollect',
					data: {
						token: uni.getStorageSync('token'),
						data_id: data.collect_data_id,
						collect_type:1,
						type: 1,
					},
				}).then(res=>{
					if(res.data.success){
						self.init()
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						});
					}
				},rej=>{
					console.log(rej)
				})
			},
			clickMethod(data){
				// console.log('点击行回调', data)
				if(data.supplier_status==1){
					uni.navigateTo({
						url: '../common/shopHome?id=' + data.collect_data_id
					})
				}else{
					uni.navigateTo({
						url:'./NoShop'
					})
				}
			}
		},
		onLoad() {
			this.init()
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
