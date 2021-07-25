<!-- 我的消息页面 -->
<template>
	<view v-if="render">
		<view v-if="msgList.length!=0">
			<view class="empty" @click="empty">
				<image src="../../static/del2.png"></image>清空
			</view>
			<view class="msg_list" style="margin-top: 90rpx;">
				<block v-for="(item,i) in msgList" :key ="i">
					<view class="msg" >
						<view class="tit">提现消息
							<view class="time">
								{{item.message_time}}
							</view>
						</view>
						<view class="con" @click="goDetail()">
							<view class="right">
								<view class="right_msg">
									{{item.message_text}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view> 
		<view class="none" v-else>
			暂无消息
		</view>
	</view>
</template>

<script>
	// import {formatdate} from '@/until/common.js'
	export default {
		data() {
			return {
				cdnUrl:'',
				page:0,
				render:true,
				pageCount:0,
				msgList:[],
				message_type:'',//消息类型
			}
		},
		methods: {
			init(){
				if(uni.getStorageSync('token')){
					let self = this;
					self.request({
						url: 'ugo/api/app.php?c=account/messageList',
						data: {
							token: uni.getStorageSync('token'),
							type:'tixian',
							page:self.page
						},
						}).then(res=>{
							if(res.data.success){
								self.pageCount = res.data.pageCount
								// 实现加载多页面
								for(var i=0; i<res.data.data.list.length; i++){
									self.msgList.push(res.data.data.list[i])
									self.msgList[i].message_time=self.holo.formatTime(self.msgList[i].message_time*1000)
								}
								self.render=true
							}
						},rej=>{
							console.log(rej);
						})
				}
			},
			empty(){
				let self = this;
				// 显示消息提示框
				uni.showModal({
				    content: '确定清空吗？',
				    success: function (res) {
				        if (res.confirm) {
				            self.request({
				            	url: 'ugo/api/app.php?c=clearMessage',
				            	data: {
				            		token: uni.getStorageSync('token'),
				            		type:'tixian' 
				            	},
				            }).then(res=>{
								if(res.data.success){
									uni.showToast({
										title:res.data.msg
									})
									self.init()
									self.msgList=[]
								}
							},rej=>{
								console.log(rej)
							})
				        } else if (res.cancel) {
							
				        }
				    }
				});
				
				
			}
		},
		// 上拉加载(小程序自带函数)
		onReachBottom(){
			if(this.page<this.pageCount-1){
				this.page++
				this.init()
			}
		},
		onShow() {
			this.cdnUrl=this.$cdnUrl
			this.msgList=[]
			this.page=0
			this.init()
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
		position: absolute;
	}
	.none{
		text-align: center;
		margin: 80rpx;
	}
	.empty{
		width: 150rpx;
		border-radius: 30rpx;
		background-color: #fff;
		height: 50rpx;
		line-height: 50rpx; 
		text-align: center;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color: #40A4E0;
		position: absolute;
		top: 20rpx;
		right: 30rpx;
			image {
				width: 36rpx;
				height: 36rpx;
				vertical-align: middle;
				margin-right: 15rpx;
			}
	}
	.msg{
		margin: 15rpx 30rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius:10rpx;
		.tit{
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			display: flex;
			justify-content: space-between;
			.time{
				color: #999;
			}
		}
		.con{
			margin-top: 30rpx;
			height: 100rpx;
			padding: 0 30rpx;
			background-color: #F8F8F8;
			display: flex;
			.img{
				margin-right: 20rpx;
				image{
					width: 160rpx;
					height: 100%;
				}
			}
			.right{
				padding-top: 20rpx;
				.right_msg{
					height: 120rpx;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					line-height: 40rpx;
				}
				.num{
					margin-top: 20rpx;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(153,153,153,1);
				}
			}
		}
	}
	
</style>

