<!-- 地址管理==收货地址 -->
<template>
	<view>
		<view class="bgi" v-if="sitelist.length==0">
			<image src="../../static/sitebgi.png"></image>
			<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">您还没有添加收货地址</view>
		</view>
		<view class="inform" v-else>
			<block v-for="item in sitelist" :key="item.address_id" >
				<view @click="selectAdress(item)">
					<view @click="getback(item.address_id,item.default_address)"> <!--  -->
						<view class="one">
							<text>{{item.contacts}}</text>
							<text class="txt1">{{item.phone}}</text>
						</view>
						<view class="two" style="padding:10rpx 30rpx;box-sizing: border-box;">{{item.full_address}}</view>
					</view>
					<view class="three">
						<view class="left" @click.stop="sites(item.address_id,item.default_address)" v-if="item.default_address==1">
							<image src="../../static/xz.png"></image>
							<text>默认地址</text>
						</view>
						<view class="left" @click.stop="sites(item.address_id,item.default_address)" v-else>
							<image src="../../static/fk_icon.png"></image>
							<text>默认地址</text>
						</view>
						<view class="right">
							<view class="img1" @click.stop="compile(item.address_id)">
								<image src="../../static/bj.png"></image><text>编辑</text>
							</view>
							<view class="img2" @click.stop="del(item.address_id)">
								<image src="../../static/del1.png"></image><text>删除</text>
							</view>
						</view>
					</view>
					<view style="width: 100%;height: 20rpx;background-color: #F5F5F5;"></view>
				</view>
		
			</block>
		</view>
		<view class="btn" @click="addsite()">新增收货地址</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sitelist:[],//数据集合
				address_id:'',//地址id
			}
		},
		methods: {
			// 点击选择收货地址
			selectAdress(e){
				let pages = getCurrentPages();//当前页面栈
				let prevPage = pages[pages.length - 2];//上一页面
				if(prevPage.route!='pages/my/my'){//判断从哪一个页面进入的，如果从我的页面中地址管理进入不跳页面
					uni.setStorageSync('addressList',e);
					uni.navigateBack({
						delta:1
					})
				}else{
					
				}
		
			},
			init(){
				let self = this
				this.request({
					url:"ugo/api/app.php?c=personal/user_address_list",
					data:{
						token:uni.getStorageSync('token'),
						address_id:self.address_id
					},
				}).then(res=>{
					if(res.data.success){
						if(res.data.data.list.length!=0){
							self.sitelist=res.data.data.list
						}
					}
				},rej=>{
					console.log(rej);
				}) 
			},
			// 是否设置为默认地址
			sites(address_id,e){
				let self = this
				if(e==1){
					self.holo.toast({
						icon:'none',
						title:'已经是默认地址了'
					})
				}else{
					this.request({
						url:"ugo/api/app.php?c=personal/default_user_address",//设置为默认地址
						data:{
							token:uni.getStorageSync('token'),
							address_id:address_id,
						},
					}).then(res=>{
							if(res.data.success){
								self.holo.toast({
									title:res.data.msg
								})
								self.init()
								// setTimeout(function() {
								// 	uni.navigateBack({
								// 		delta:1
								// 	})
								// }, 500);
							}
					},rej=>{
						console.log(rej);
					})
				}
			},
			// 点击返回上一页
			getback(address_id,e){
				// this.sites(address_id,e)
			},
			// 编辑
			compile(id){
				uni.navigateTo({
					url:'./addsite?id='+id
				})
				// console.log(111);
			},
			// 删除
			del(id){
				let self = this
				self.request({
					url: "ugo/api/app.php?c=personal/del_user_address",
					data: {
						token: uni.getStorageSync('token'),
						address_id: id,
					},
				}).then(res => {
					if (res.data.success) {
						self.holo.toast({
							title: res.data.msg
						})
						self.init()
					}else{
						self.holo.toast({
							title: res.data.msg
						})
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 新增地址
			addsite(){
				uni.navigateTo({
					url:'./addsite'
				})
			},
		},
		onShow() {
			this.init()
		}
	}
</script>

<style>
	page {
		position: relative;
	}
.bgi{
	width: 445rpx;
	height: 435rpx;
	margin: 200rpx auto;
	text-align: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
}
.bgi image {
	width: 100%;
	height: 100%;
}
/* 底部按钮 */
.btn {
	position: fixed;
	bottom: 30rpx;
	left: 30rpx;
	width: 690rpx;
	height: 90rpx;
	background: #FD494F;
	border-radius: 45rpx;
	line-height: 90rpx;
	text-align: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
}
/* 数据 */
.inform {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
}
.inform image {
	width: 100%;
	height: 100%;
}
.inform .one {
	padding:0 30rpx;
	box-sizing: border-box;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	margin-top: 20rpx;
}
.inform .one .txt1{
	margin-left: 45rpx;
	font-weight: 400;
	font-size: 26rpx;
}
.inform .two {
	padding:0 30rpx;
	box-sizing: border-box;
	padding: 20rpx 0 30rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	border-bottom: 1rpx solid #F5F5F5;
}
.inform .three {
	padding:0 30rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}
.inform .three image{
	width: 36rpx;
	height: 36rpx;
	vertical-align: middle;
}
.inform .three text {
	margin-left: 20rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #8F8F8F;
}
.inform .three .right {
	display: flex;
	justify-content: space-between;
}
.three .right .img2 {
	margin-left: 40rpx;
}
</style>
