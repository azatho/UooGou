<template>
	<view style="padding: 0 30rpx;">
		<wuliu @getfreight_id="getwuliu"/>
		<view style="display: flex;align-items: center;padding: 20rpx 0;border-bottom: 1px solid #f5f5f5;">
					<p style="
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;">物流单号</p>
					 <input type="text" v-model="express_number" value="" placeholder="请输入" style="flex:1;text-align: right;
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
	import wuliu from './wuliu'
	export default {
		components:{
			wuliu
		},
		data() {
			return {
				order_index:'',
				express_number:'',
				express_company:''
			}
		},
		onLoad(e) {
			this.order_index = e.order_index;
		},
		methods: {
			getwuliu(express_company){
				this.express_company = express_company;
			},
			send(){
				this.request({ 
					url:'ugo/api/app.php?c=order/order_sendsV2',
					type:'POST',
					data:{
						order_index:this.order_index,
						express_number:this.express_number,
						express_company:this.express_company
					},
				}).then(res=>{
					if(res.data.success){
						this.holo.toast({title:res.data.message});
						setTimeout(res=>{
							uni.navigateBack({
								delta: 1
							});
						},2000)
					}else{
						this.holo.toast({title:res.data.message});
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
