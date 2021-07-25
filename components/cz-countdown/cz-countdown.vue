<template>
	<view class="countdown" v-if="leftTime>0">
		<view class="day">
			剩余<text style="margin-left: 5rpx;"></text>
		</view>
		<view class="day" v-if="d!=0"><text class="text">{{d}}</text>天</view> 
		<view class="time" style="margin-left: 9rpx;" >{{h<10?'0'+h:h}}</view>
		<text class="text" >:</text>
		<view class="time" >{{m<10?'0'+m:m}}</view>
		<text class="text" >:</text>
		<view class="time" >{{s<10?'0'+s:s}}</view>
	</view>
	<view v-else>
		<view class="day">
			剩余<text style="margin-left: 5rpx;">00:00:00</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			leftTime: {
				type: String,
			},
			endTime:{
				type: String,
			},
		},
		data(){
			return{
				timer:null,
				d:0,
				h:0,
				m:0,
				s:0
			}
		},
		mounted() {
			this.getCountdownTime()
		},
		beforeDestroy(){
			clearInterval(this.timer);
			this.timer = null;
		},
		computed:{
			// sTime(){return this.startTime},
			// eTime(){return this.endTime}
		},
		watch:{
			// endTime(){
			// 	clearInterval(this.timer);
			// 	this.time()
			// }
		},
		methods:{ 
			// time(){
			// 	let leftTime = this.GetDateDiff(this.sTime,this.eTime)
			// 	this.getCountdownTime(leftTime)
			// },
			//计算两个时间差
			GetDateDiff(startTime, endTime) {
			    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
			    startTime = startTime.replace(/\-/g, "/");
			    endTime = endTime.replace(/\-/g, "/");
			    //将计算间隔类性字符转换为小写
			    var sTime = new Date(startTime); 
			    var eTime = new Date(endTime); 
			    return parseInt((eTime.getTime() - sTime.getTime()) / 1000);
			},
			//计算活动结束时间
			getCountdownTime(){
				let time = this.leftTime
				console.log(typeof time);
				if (time>0) {
					this.timer = setInterval(() => {
						if(time < 0){
							clearInterval(this.timer)
							this.h = 0
							this.m = 0
							this.s = 0
						}else{
							this.d = parseInt(time/3600/24);
							this.h = parseInt((time/3600)%24);
							this.m = parseInt((time/60)%60);
							this.s = parseInt(time%60);
							time --
						}
					},1000)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.countdown{display: flex;align-items: center;color: #fff;
	.day{color: #606060;display: flex;align-items: center;
		.text{color: #333333;}
	}
	.time{color: #333333;}
	.text{color: #606060;}
	}
</style>
