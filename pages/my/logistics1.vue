<!-- 物流页面 -->
<template>
	<view class="">
		<view class="scroll">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view :class="current==i?'active':'scroll-view-item_H'" v-for="(item,i) in titleList" :key="i" @click="getCurrent(i)">{{item.name}}</view>
			</scroll-view>
		</view>
		
		<view v-if="show==false">
			<view class="express_msg">
				<view style="color:rgba(0,139,78,1);">
					{{express_status==1?'已全部发货':'只发货一部分'}}
				</view>
				<view class="">
					订单编号：{{expressInfo.order_id || "暂无"}}
				</view>
				<view class="">
					国内承运人：{{expressInfo.expName || "暂无"}}
				</view>
				<view class="">
					买家姓名：{{expressInfo.order_contacts || "暂无"}}
				</view>
				<view class="">
					买家电话：{{expressInfo.order_phone || "暂无"}}
				</view>
			</view>
			
			<view class="steps">
				<uni-steps :options="expressList" direction="column" :active="0" style="color:#999!important"></uni-steps>
			</view>
		</view>
		<view v-else class="none">
			暂无物流信息
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default{
		components: {uniSteps},
		data(){
			return{
				order_index:'',
				current:0,
				express_status:'',//0部分发货  1全部发货
				titleList:[],
				expressInfo:'',
				expressList:[],
				stepList:[],
				show:false
			}
		},
		methods:{
			getCurrent(e){
				this.current=e
				this.expressList=[]
				for(var i = 0; i < this.stepList.length;i++){
					if(e==i){
						this.show=false
						this.expressInfo = this.stepList[i].result
						for(var k = 0; k < this.stepList[e].result.list.length;k++){
							var obj={}
							obj.title=this.stepList[e].result.list[k].status
							obj.desc=this.stepList[e].result.list[k].time
							this.expressList.push(obj)
						}
					}else{
						this.show=true
					}
				}
			},
			init(){
				let self = this;
				self.request({
					url: 'api/app.php?c=searchExpress',//查看物流
					data: {
						token: uni.getStorageSync('token'),
						order_index:self.order_index
					},
				}).then(res=>{
					if(res.data.success){
						var data = res.data.data
						self.express_status = data.express_status
						for(var i = 0; i < data.list.length;i++){
							var obj={} 
							obj.name='物流'+(i+1)
							self.titleList.push(obj)
						}
						if(self.express_status=='0'){
							var obj={}
							obj.name='物流'+(data.list.length+1)
							self.titleList.push(obj)
						}
						self.stepList = data.list
						self.getCurrent(0)
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				},rej=>{
					console.log(rej);
				})
			}
		},
		onShow(){
			this.expressList=[]
			this.titleList=[]
			this.init()
		},
		onLoad(option){
			this.order_index=option.order_index
		}
	}
</script>

<style lang="scss">
	.scroll{
		padding: 0 30rpx;
		.scroll-view_H {
			// 段落中的文本不进行换行
			white-space: nowrap;
			width: 100%;
			.scroll-view-item_H {
				display: inline-block;
				padding: 30rpx;
				font-size: 26rpx;
				color:rgba(153,153,153,1);
				font-family:PingFang SC;
			}
			.active{
				display: inline-block;
				padding: 30rpx;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(0,139,78,1);
				border-bottom: 4rpx solid #008B4E;
			}
		}
	}
	.express_msg{
		padding: 30rpx;
		view{
			margin-top: 10rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
	}
	.steps{
		padding: 30rpx;
		.uni-steps__column-text.data-v-61dda2da{
			text{
				color: #999!important;
			}
		}
		.uni-steps__column-text.data-v-61dda2da{
			border-bottom: 1rpx solid #f5f5f5!important;
		}
	}
	.none{
		text-align: center;
		margin: 50rpx;
	}
</style>

