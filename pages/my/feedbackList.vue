<!-- 回复记录列表页面 -->
<template>
	<view>
		<view v-if="feedbackList.length!=0">
			<block  v-for="item in feedbackList" :key="item.feedback_content">
				<view style="margin-bottom:20rpx">
					<view class="panel" >
						<view class="title">
							<view>{{item.feedback_addtime}}</view>
							<view :class="item.feedback_handle_time>'0'?'color1':'color2'">{{item.feedback_handle_time>'0'?'已回复':'未回复'}}</view>
						</view>
						<view class="content" @click="getDetail(item.feedback_index)">
							<view>
								<text>反馈内容：</text> {{item.feedback_content}}
							</view>
							<view class="detail">查看详情>></view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view v-else class="none">暂无数据</view>
	</view>
</template>

<script>
	// import {formatTime} from '@/until/common.js'
	export default{
		data() {
			return{
				feedbackList:[],
				page:0,
				pageCount:0,//总页数
			}
		},
		methods:{
			init(){
				let self = this;
				this.request({
					url:'ugo/api/app.php?c=account/getFeedbackList',
					data:{
						token:uni.getStorageSync('token'),
						page:self.page
					},
					}).then(res=>{
						self.pageCount=res.data.pageCount
						// self.feedbackList=res.data.data.list
						for(var i=0; i<res.data.data.list.length; i++){
							res.data.data.list[i].feedback_addtime=self.holo.formatTime(res.data.data.list[i].feedback_addtime*1000)
							self.feedbackList.push(res.data.data.list[i])
						}
					},rej=>{
						console.log(rej)
					})
				
			},
			getDetail(e){
				uni.navigateTo({
					url:'./feedbackDetail?index='+e
				})
			}
		},
		// 上拉加载(小程序自带函数)
		onReachBottom(){
			if(this.page<this.pageCount-1){
				this.page++
				this.init()
			}
		},
		onShow(){
			this.init()
			this.feedbackList=[]
			this.page=0
		}
	}
</script>

<style lang="scss">
	page{
	  width: 100%;
	  padding-top: 20rpx;
	  background-color: #F6F5F8;
	}
	.none{
	font-size: 26rpx;
	  text-align: center;
	  margin-top: 50rpx;
	}
	.panel{
	  background-color: #fff;
	  font-size: 26rpx;
	  .title{
	    padding: 15rpx;
	    display: flex;
	    justify-content: space-between;
	    border-bottom: 1rpx solid #F5F5F5;
		.color1{
		  color: #0055F2;
		}
		.color2{
		  color: #F20000;
		}
	  }
	  .content{
	    padding: 15rpx;
		text{
		  font-family:Source Han Sans CN;
		  font-weight:300;
		  color:rgba(153,153,153,1);
		  color: #999;
		}
		.detail{
		  font-size:26rpx;
		  font-family:Source Han Sans CN;
		  font-weight:300;
		  color:rgba(153,153,153,1);
		  text-align: right;
		  color: #999;
		  margin-top: 15rpx;
		}
	  }
	}
	
</style>
