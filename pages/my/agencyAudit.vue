<!-- 代理审核审核进度==>没有用了(页面合并在申请代理页面) -->
<template>
	<view>
		<!-- steps步骤条  纵向排列-->
		<uni-steps :options="options" direction="column" :active="0" v-if="statedata.apply_status==1"></uni-steps>
		<view v-if="statedata.apply_status==2">
			<uni-steps :options="options1" direction="column" :active="2" ></uni-steps>
			<view class="txt">失败原因：{{statedata.apply_reason}}<text @click="resubmit()">重新提交</text></view>
		</view>
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
					{title:'信息提交成功,等待审核',desc:'2019-04-19 17:27'},
				],//格式源
				options1:[
					{title:'信息提交成功,等待审核',desc:'2019-04-19 17:27'},
					{title:'信息审核失败',desc:'2019-04-19 17:27'},
				],				
				active:'0',//当前步骤
				state:'0',//切换审核进度是否成功
				statedata:{
					"add_time":"1603949301",//提交申请时间
					"update_time": "1603955827",//审核成功（审核失败）时间
					"apply_status": "2",// 审核状态  1审核中   2审核失败  3审核成功
					"apply_reason": "2222",//驳回原因
					"is_del": "0",
				},//数据集合
			}
		},
		methods: {
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=rank_apply/getApplyInfo',
					data:{
						token:uni.getStorageSync('token'),
						apply_index:0
					},
				}).then(res=>{
					self.statedata=res.data.data
					if(self.statedata.merchant_status==0){
						self.options[0].desc=self.holo.formatTime(self.statedata.add_time)
					}
					if(self.statedata.merchant_status==-1){
						self.options1[0].desc=self.holo.formatTime(self.statedata.add_time)
						self.options1[1].desc=self.holo.formatTime(self.statedata.update_time)
					}
				},rej=>{
					console.log(rej)
				})
			},
			// 重新提交文字==>转跳到门店申请页面
			resubmit(){
				uni.navigateTo({
					url:'./applyposition'
				})
			}
		},
		onLoad(options){
			this.cdnUrl=this.$cdnUrl
			// this.init()
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
</style>
