<!-- 常见问题页面 -->
<template>
	<view class="">
		<view class="common" v-if="problemList.length!=0">
			<block v-for="(item,i) in problemList" :key="i">
				<view class="problem" @click='click_active(i)'>
					<view style="display: flex;align-items: center;">
						<view class="problem_suoyin" style="width: 40rpx;height: 40rpx;color:#fff;position:relative;">
							<image src="../../static/numBgc.png" style="width:100%;height:100%"></image>
							<text style="position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);font-size:24rpx">{{i+1}}</text>
						</view>
						<view class="problem_title">
							{{item.title}}
						</view>
					</view>
					<uni-icons type="arrowright" :class="i===suoyin?'jt2':''" class="jt1 "></uni-icons>
				</view>
				<view :class="i === suoyin?'active':''" class="problem_list"> 
					<rich-text :nodes="item.htmlString"></rich-text>
				</view>
			</block>
		</view> 
		<view v-else class="none">暂无问题</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default{
		components: {
			uniIcons
		},
		data(){
			return{
				suoyin:'-1',
				flag:false,
				problemList:[]
			}
		},
		methods:{
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=account/getProblemList',
					data:{
						token:uni.getStorageSync('token')
					},
					}).then(res=>{
						if(res.data.success){
							self.problemList = res.data.data
							console.log(self.problemList)
						}
					},rej=>{
						console.log(rej)
					})
			}, 
			click_active(e){
				if(!this.flag){
					this.flag=true
					this.suoyin=e
				}else{
					this.flag=false
					this.suoyin=e='-1'
				}
			    
			  }
		},
		onShow() {
			this.init()
		}
	}
</script>

<style lang="scss">
	.none{
	  text-align: center;
	  margin-top: 50rpx;
	}
	.common{
		.problem {
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  padding: 20rpx 30rpx;
		  background: #fff;
		  .problem_title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			margin: 0 10rpx;
		  }
		}
		.problem_list {
		  width: 100%;
		  height: 0;
		  overflow: hidden;
		  padding: 0 70rpx;
		  background: #fff;
		  font-size: 13px;
		  font-family: PingFang SC;
		  font-weight: 400;
		  color: rgba(153, 153, 153, 1);
		  box-sizing: border-box;
		}
		
		.active {
		   height: auto;
		   white-space:pre-wrap;
		   margin: 0 auto;
		}
		.jt1{
		  transform: rotate(0deg);
		  transition: all .5s;
		}
		.jt2{
		  transform: rotate(-90deg);
		}
	}
</style>

