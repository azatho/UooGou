<!-- 积分明细页面 -->
<template>
	<view>
		<view v-if="dataList.data.length==0" style="text-align: center">
			<view  class="noData" >
				<view>			
					<img src="../../static/noshop(1).png" alt="没有数据" style='width: 480rpx;height: 360rpx;'>
				</view>
			</view>
			<view class="font-30" style="color: #999999;">暂无数据</view>
		</view>

		<view class="data" v-else v-for="(item,index) in dataList.data" :key='index'>
			<view>
				<view class="font-26" style="color: #333333;">{{item.type_name}}</view>
				<view class="font-22" style="color: #999999;margin-top: 10rpx;">{{holo.formatSeconds(item.time)}}</view>
			</view>
			<view class="num font-26" style="color: #999999;font-weight: bold;height: 60rpx;line-height: 60rpx;">{{item.type>100?'-':'+'}}{{$returnFloat(item.amount)}}</view>
		</view>
	</view>
</template>
<!-- 111 -->
<script>
	export default {
		data() {
			return {
				navIndex:"0",//默认选中的导航栏
				dataList:{
					data:[]
				},//列表数据
				pageIndex:"1",//当前页数
			}
		},
		onShow(){
			this.navIndex=0;
			this.dataList={
				data:[]
			}
			this.pageIndex=1
			this.ajaxPoint()
		},
		onReachBottom(){
			if(this.pageIndex<this.dataList.page){
				this.pageIndex++
				this.ajaxPoint()
			}
		},
		methods: {
			// 请求列表数据
			ajaxPoint(){
				let self =this
				self.request({
					url:"ugo/api/app.php?c=account/getScoreList",
					data:{
						type:self.navIndex+1,
						limit:"20",
						page:self.pageIndex,
						status:1
					}
				}).then(res => {
				        if (res.data.success) {
							self.dataList.data.length>0?self.dataList.data=[...self.dataList.data,...res.data.data]:self.dataList=res.data
				        } else {
				                uni.showToast({
				                title: res.message,
				                icon: 'none'
				                })
				        }
				})
			},
			// 点击切换导航栏
			selectNav(e){
				this.navIndex=e;
				this.dataList={
					data:[]
				}
				this.pageIndex=1
				this.ajaxPoint()
			},
		}
	}
</script>

<style scoped lang="scss">
.nav{
	height: 80rpx;
	line-height: 80rpx;
	background-color: #F5F5F5;
	display: flex;
	justify-content: space-around;
}
.navSelct{
	color: #FC4950;
	border-bottom: 4rpx solid #FC4950;
}
.noData{
	display: flex;
	justify-content: center;
	// flex-directio:column;
	margin-top: 200rpx;
}
.data{
	border-bottom: 1rpx solid #F5F5F5;
	padding: 30rpx;
	// height: 60rpx;
	display: flex;
	justify-content: space-between;
}
</style>
