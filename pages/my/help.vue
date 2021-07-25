<!-- 帮助中心页面 -->
<template>
	<view>
		<view class="" v-if='helpList.length!=0'>
			<view class="help_list" v-for="(item,i) in helpList" :key="i" @click="goDetail(item)">
				<view class="help_list_top">
					{{item.title}}
				</view>
				<view class="help_list_foot">
					<view  class="help_list_foot_left">
						{{item.edit_user}}
					</view>
					<view  class="help_list_foot_right">
						{{item.time}}
					</view>
				</view>
			</view>
		</view>
		<view class="bgi" v-else style="margin: 200rpx auto;"><image src="../../static/zwsj.png"></image></view>
	</view>
</template>

<script>
	// import {formatTime} from '@/until/common.js'
	export default{
		data(){
			return{
				helpList:[]
			}
		},
		methods:{
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=account/appHelp',
					data:{
						token:uni.getStorageSync('token')
					},
					}).then(res=>{
							if(res.data.success){
								for(let i=0; i < res.data.data.length;i++){
									res.data.data[i].time=self.holo.formatTime(res.data.data[i].time*1000)
								}
								self.helpList = res.data.data
								// console.log(self.helpList)
							}
					},rej=>{
						console.log(rej)
					})
			},
			goDetail(e){
				if(e.type==1){
					uni.navigateTo({
						url:'./common?src='+e.url
					})
				}else{
					window.location.href = e.url;
				}
			}
		},
		onShow() {
			this.init()
		}
	}
</script>

<style lang="scss">
	.bgi {
		width: 476rpx;
		height: 372rpx;
	}
	.bgi image {
		width: 100%;
		height: 100%;
	}
	.help_list{
	  background: #fff;
	  border-bottom: 1px solid #f5f5f5; 
	  padding: 20px 10px; 
	  .help_list_top{
		  font-size:26rpx;
		  font-family:PingFang SC;
		  font-weight:500;
		  color:rgba(33,33,33,1);
	  }
	  .help_list_foot{
	    display: flex;
	    justify-content: space-between;
		margin-top: 10rpx;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	  }
	}
	.none{
	  text-align: center;
	  margin-top: 50rpx;
	}
</style>
