<!-- 修改名字页面 -->
<template>
	<view>
		<view class="userlist">
			<view>昵称:</view>
			<view style="flex: 1;">
				<input type="text" :value="name" maxlength="8" placeholder="请输入昵称~" @input="getName" />
			</view>
		</view>
		<view class="btn" @click="confirm">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				sex:'',
			}
		},
		methods: {
			getName(e){
				this.name=e.detail.value
			},
			confirm(){
				let self=this
				if(this.name==''){
					self.holo.toast({
						icon:'none',
						title:'昵称不能为空~'
					})
				}else{
					self.request({
						url:'ugo/api/app.php?c=personal/setMyInfo',
						data:{
							token:uni.getStorageSync('token'),
							name:self.name,
							sex:self.sex
						},
					}).then(res=>{
						if(res.data.success){
							self.holo.toast({
								title:res.data.msg
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'./userInfo'
								},500)
							})
						}else{
							self.hoto.toast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						console.log(rej)
					})
				}
			},
		},
		onLoad(options) {
			this.name=options.name
			console.log(options.name);
		}
	}
</script>

<style>
.userlist {
	display: flex;
	padding: 20rpx 30rpx;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
}
.userlist input {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	margin-left: 10rpx;
}
.btn {
	margin: 500rpx 30rpx 0;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	background: #F6281B;
	border-radius: 45px;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
}
</style>
