<!-- 提现申请审核页面 -->
<template>
	<view>
		<!-- steps步骤条  纵向排列-->
		<uni-steps :options="options" direction="column" :active='active' ></uni-steps>
		<view class="btn" @click="resubmit">确认</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	export default {
		components: {uniSteps},
		data() {
			return {
				options:[
					{title:'200 元提现申请已提交',desc:'2019-04-19 17:27'},
					{title:'处理中，预计48小时到账',desc:'提现高峰时，5个工作日内到账'},
					{title:'银行卡提现成功',desc:'请去提现记录里查看结果'},
				],//格式源				
				active:0,//当前步骤
				state:'0',//切换审核进度是否成功
				time:'',//提交的时间
				cash_amount:'',//提现的金额
			}
		},
		methods: {
			// init初始化
			init(){
				if(uni.getStorageSync('token')){
						this.options[0].desc=this.holo.formatTime(this.time*1000)
						this.options[0].title=this.cash_amount+' 元提现申请已提交'
				}
			},
			// 确认
			resubmit(){
				uni.navigateTo({
					url:'/pages/my/management?apply_rank='+uni.getStorageSync('rank')
				})
			}
		},
		onLoad(options){
			this.cdnUrl=this.$cdnUrl
			this.cash_amount=options.cash_amount/100
			this.time=options.time
			this.init()
			console.log(options.time);
		}
	}
</script>

<style>
.txt {
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 500;
	margin: -5rpx 50rpx;
	color: #333333;
}
.txt text {
	color: #FC4950;
	margin-left: 20rpx;
}
.btn {
	width: 690rpx;
	height: 90rpx;
	background: #FC4950;
	border-radius: 45rpx;
	line-height: 90rpx;
	text-align: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	margin: 200rpx 30rpx;
}
</style>

