<template>
	<view style="height:100%">
		<view class="bgc1">
			<view class="title">成功邀请：{{qrcode_sum}}</view>
			<view class="bgc2">
				<view class="bgc" v-if="!orderList.length">
					<image src="../../static/zwsj.png" style="margin-top:200rpx"></image>
				</view>
				
				<view style="height: 92%;" v-else>
					<view class="bgc22">
						<view class="left">
							用户信息
						</view>
						<view class="right">
							用户级别
						</view>
					</view>
					<scroll-view scroll-y="true" @scrolltolower="onScrollBottom" style="height: 100%;">
					<block v-for="(item,i) in orderList" :key ="i">
						<view class="scorePay-box">
							<view class="left">
								<image :src="item.photo" style="width: 64rpx;height: 64rpx;margin-right: 10rpx;" mode=""></image>
								<view class="text">
									<view style="color: #666666;font-size: 26rpx;">{{item.name}}</view>
									<view style="color: #999999;font-size: 22rpx;margin-top: 9rpx;">{{item.phone}}</view>
								</view>
							</view>
							
							<view class="right" @click="getsee(item)">
								{{item.rank_name}}<image src="../../static/back2.png" mode="" style="width: 11rpx;height: 23rpx;margin-left: 17rpx;"></image>
							</view>
						</view>
						<view class="line20" ></view>
					</block>
					</scroll-view>
				</view>
			</view>
		</view>
		
		<!-- 查看弹窗 -->
			<view class="window" v-if="see" >
				<view class="particulars">
					<image src="../../static/del-round.png" class="del" @click="getdel()"></image>
					<!-- <image :src="$imgUrl('/CxtxUni/static/index/del-round.png')" mode=""></image> -->
					
					<view style="font-size: 36rpx;font-weight: bold;text-align: center;margin-bottom: 40rpx;">用户详情</view>
					<view class="hang">
						<view>用户头像</view>
						<image :src="teamMember.photo" style="margin-left: 16rpx;"></image>
			
					</view>
					<view class="hang">
						<view>用户昵称</view>：
						<text>{{teamMember.name}}</text>
					</view>
					<view class="hang">
						<view>等级</view>：
						<text class="rank" >{{teamMember.rank_name}}</text>
						
					</view>
					<view class="hang">
						<view>手机号</view>：
						<text v-if="teamMember.phone">{{teamMember.phone}}</text>
						<text v-else>暂无</text>
					</view>
					<view class="hang">
						<view>性别</view>：
						<text v-if="teamMember.sex">{{teamMember.sex}}</text>
						<text v-else>暂无</text>
					</view>
					<view class="hang">
						<view>直接推荐</view>：
						<text>{{teamMember.num}}人</text>
					</view>
					<view class="hang">
						<view>间接推荐</view>：
						<text>{{teamMember.team_num}}人</text>
					</view>
					<view class="hang">
						<view>注册时间</view>：
			
						<text> {{timeConvert(teamMember.regtime,0)}}</text>
			
					</view>
				</view>
			</view>
		<!-- 查看弹窗 end -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:0,
				limit:10,
				cdnUrl:'',
				orderList:[],
				qrcode_sum:'0',//推广的人数
				
				see: false, //弹窗是否显示
				teamMember:{},
			}
		},
		methods: {
			onScrollBottom(){
				if(this.page<this.pageCount-1){
					this.page++
					this.init()
				}
			},
			//时间戳转日期
			timeConvert(timestamp, num) { //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳 
			
				timestamp = timestamp + '';
				timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
				var date = new Date(timestamp);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				if (num == 0) {
					return y + '-' + m + '-' + d;
				} else {
					return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
				}
			},
			init(){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=personal/getMyTeam',
					data: {
						token: uni.getStorageSync('token'),
						page:self.page,
						limit:self.limit
					}
				}).then(res=>{
					console.log(res.data);
					if(res.data.success){
						self.qrcode_sum=res.data.data.num
						for(var i=0;i < res.data.data.list.length;i++){
							if (res.data.data.list[i].photo.split('http').length !=2) {
								res.data.data.list[i].photo = self.cdnUrl + res.data.data.list[i].photo
							} 
							if(res.data.data.list[i].phone!=0){
								// 正则表达式手机号隐藏中间4位
								if(res.data.data.list[i].phone){
									res.data.data.list[i].phone = res.data.data.list[i].phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
								}
							}else{
								res.data.data.list[i].phone=''
							}
							self.orderList.push(res.data.data.list[i])
						}
					}
				})
			},
			// 查看弹窗
			getsee(item) {
				this.see = true
				this.teamMember = item		
			},
			// 关闭查看
			getdel() {
				this.see = false
			},
		},
		onShow(){
			this.orderList=[]
			this.page=0
			this.cdnUrl=this.$cdnUrl
			this.init()
		},
		
	}
</script>

<style>
page{
		height: 100%;
	}
	.bgc1 {
		width: 750rpx;
		height: 100%;
		background: red linear-gradient(to bottom, rgba(248, 92, 83, 1), rgba(246, 40, 27, 1));
		background-size: 100% 100%;
		
		box-sizing: border-box;
	}
	.bgc1 .title{
		font-size: 26rpx;
		padding: 30rpx 32rpx 20rpx;
		color: #FFFFFF;
	}
	.bgc2 {
		width: 700rpx;
		height: 92%;
		background: url(../../static/regesterbgc4.png)center no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		padding: 40rpx 35rpx;
		box-sizing: border-box;
	}
	.bgc {
		width: 100%;
		height: 100%;
		/* background-color: #f5f5f5; */
		text-align: center;
	
	}
	.bgc image{
		width: 380rpx;
		height: 330rpx;
		margin-top: 100rpx;
	}
	
	.bgc22 {
		margin-top: 40rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
	.bgc22 .left{
		margin-left: 40rpx;
		font-size: 26rpx;
		color: #333333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: start;
		-webkit-justify-content: flex-start;
		justify-content: flex-start;
		-webkit-box-align: baseline;
		-webkit-align-items: baseline;
		align-items: baseline;
	}
	.bgc22 .right{
		font-size: 26rpx;
		color: #333333;
		padding: 0rpx 40rpx;
	}
	
	.scorePay-box{
		height: 100rpx;
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	
		
	}
	.scorePay-box .left{
		margin-left: 30rpx;
		font-size: 13px;
		color: #333333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: start;
		-webkit-justify-content: flex-start;
		justify-content: flex-start;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
	.scorePay-box .right{
		margin-right: 30rpx;
		font-size: 26rpx;
		color: #666666;
	} 
	.line20{
		width: 580rpx;
		height: 2rpx;
		background: #F5F5F5;
	}
	
	/* 弹窗 */
	.window {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		font-family: PingFang SC;
		font-weight: 400;
		z-index: 999;
	}
	.particulars {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 500rpx;
		height: 600rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 40rpx;
		box-sizing: border-box;
		z-index: 999;
	}
	
	.particulars .del {
		position: absolute;
		right: 30rpx;
		top: 50rpx;
		width: 36rpx;
		height: 36rpx;
	}
	
	.particulars .hang {
		display: flex;
		font-size: 24rpx;
		color: #333333;
		align-items: center;
		margin: 10rpx;
	}
	
	.particulars .hang image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		vertical-align: middle;
	}
	
</style>
