<template>
	<view>
		<view style="display: flex;align-items: center;padding: 20rpx 30rpx;border-bottom: 1px solid #f5f5f5;margin-top: 30rpx;">
			<p style="
font-size: 26rpx;
font-family: PingFang SC;
font-weight: 400;
color: #333333;">配送员姓名</p>
			 <input type="text" v-model="name" value="" placeholder="请输入" style="flex:1;text-align: right;
font-size: 26rpx;
font-family: PingFang SC;
font-weight: 400;
color: #999999;" />
		</view>
		<view style="display: flex;align-items: center;padding: 20rpx 30rpx;border-bottom: 1px solid #f5f5f5;">
					<p style="
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;">配送员手机号</p>
					 <input type="number" v-model="phone" value="" placeholder="请输入" style="flex:1;text-align: right;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;" />
				</view>
		 <view class="confime" @click="send()">
		 	确定
		 </view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_index:'',
				phone:'',
				name:''
			}
		},
		onLoad(e) {
			this.order_index = e.order_index;
		},
		methods: {
			send(){
				this.request({ 
					url:'ugo/api/app.php?c=order/order_sends',
					type:'POST',
					data:{
						order_index:this.order_index,
						name:this.name,
						phone:this.phone
					}
				}).then(res=>{
					if(res.data.success){
						this.holo.toast({title:res.data.msg});
						setTimeout(res=>{
							uni.navigateBack({
								delta: 1
							});
						},2000)
					}else{
						this.holo.toast({title:res.data.msg});
					}
				})
			}
		}
	}
</script>

<style scoped>
  .confime{
	  width: 690rpx;
	  height: 90rpx;
	  background: #FF862B;
	  border-radius: 45px;
	  text-align: center;
	  line-height: 90rpx;
	  font-size: 30rpx;
	  font-family: PingFang SC;
	  font-weight: 500;
	  color: #FFFFFF;
	  margin: 108rpx auto;
  }
</style>
