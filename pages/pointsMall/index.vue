<!-- 积分商城页面 -->
<template>
	<view>
		<view class="backImg">
			<view style="height: 20rpx;"></view>
			<view class="headImg">
				<view class="font font-24">积分余额:</view>
				<view class="txt">
					<view style="font-size: 77rpx;line-height: 100rpx;">{{$returnFloat(singInNum.user_total_score)}}</view>
					<view class="headBtn font-26" @click="goPointShop()">立即兑换</view>
				</view>
			</view>
		</view>
		<view class="integralFunction">
			<view class="integralBtn" @click="goPointDetails">
				<view><img src="../../static/integralBtn1.png" alt="" ></view>
				<view class="txt">积分明细</view>
			</view>
			<view class="integralBtn" @click="goPointTransfer">
				<view> <img src="../../static/integralBtn2.png" alt="" ></view>
				<view class="txt">积分转赠</view>
			</view>
			<view class="integralBtn" @click="goPointShop">
				<view> <img src="../../static/integralBtn3.png" alt="" ></view>
				<view class="txt">积分商城</view>
			</view>
			<view class="integralBtn" @click="goExchangeRecord">
				<view> <img src="../../static/integralBtn4.png" alt="" ></view>
				<view class="txt">兑换记录 </view>
			</view>
			<view class="integralBtn" @click="goMyRecord">
				<view> <img src="../../static/integralBtn5.png" alt="" ></view>
				<view class="txt">我的订单</view>
			</view>
		</view>
		<view class="singnIn">
			<view class="txtBody">
				<view class="font-30">已连续签到<span>{{singInNum.total_day}}天</span></view>
				<view class="font-24 ruleTxt" @click="showRulePop" >积分规则<img src="../../static/exclamatoryMark.png" alt="积分规则"></view>
			</view>
			<view class="font-22" style="color: #999999;margin-top: 15rpx;">明日签到可获得<span style="color: #F05348;margin-left: 20rpx;">{{singInNum.set_info[singInNum.total_day]}}积分</span></view>
			<view class="singnInImg">
				<view v-for="(item,index) in singInNum.set_info" :key="index" @click="singInSuccess(index,0)">
					<view :class="index<singInNum.total_day?'img1':'img'">
						<img src="../../static/signIn.png" alt="" style="" v-if='index>=singInNum.total_day'>
						<view v-else style="width: 47rpx;height: 47rpx;margin-top: 20rpx;"></view>
						<view :class="index<singInNum.total_day?'color1-white font-30':'color-red font-30'">+{{item}}</view>
					</view>
					<view class="font-26" style="color: #333333;">第{{returnDayNum(index)}}天</view>
				</view>
			</view>
		</view>
		<view >
			<view class="task">
				<view class="txt1 font-30" >赚取积分</view>
				<view class="txt2 font-20" >做任务赚更多积分</view>
				<view v-for="(item,index) in taskList" :key="index" style="display: flex;padding: 30rpx;align-items: center;">
					<img :src="item.url" alt="" style="width: 60rpx;height: 60rpx;">
					<view style="width: 400rpx;margin-left: 30rpx; flex-grow:1">
						<view class="font-24" style="color: #333333;">{{item.taskTile}}</view>
						<view class="font-20" style="color:#999999;margin-right: 30rpx;">{{item.taskContent}} 
							<span style='color: #F73C2F;'>{{item.taskPoint}}</span> <span>{{item.taskContent3?item.taskContent3:''}}</span>
							<view v-if="item.taskContent2!=''">{{item.taskContent2}}
								<span style='color: #F73C2F;'>{{number+'%'}}</span> 的积分
							</view>
						</view>
					</view>
					<view class="font-20" :class="index=='0'&&singInNum.subscribe==1?'btn1':'btn'" @click="doTask(index)">{{index=='0'&&singInNum.subscribe==1?'已关注':item.taskBtn}}</view>
				</view>
			</view>
		</view>
		<!-- 积分规则弹出层 -->
		<view class="popups" v-show="showPop">
				<view class="popupsContent">
					<view class="popupsTitle">
						积分规则说明
					 	<view class="close" @click="popOk">
							<image src="../../static/chahao.png" mode="" style="width: 32rpx;height: 32rpx;"></image>
						</view>
					</view>
					<view class="popupstext">
						<text>
							{{singInNum.activity_dis}}
						</text>
					</view>
					<view class="popupOk" @click="popOk">
						我已知晓
					</view>
				</view>
		</view>
		<!-- 签到成功弹出层 -->
		<view class="popups-singIn" v-show="showSingInSuccess">
				<view class="popupsContent-singIn">
					<img class='img1' src="../../static/todaySignInSuccess.png" alt="成功图片">
					<view class="conent" style="">
						<view>
							<img class='img2' src="../../static/leftSign.png" alt="左装饰图">
							获得 <span style="font-size: 56rpx;color: #EF8134;">{{getPoint.change_score}}</span> 积分
							<img class='img3' src="../../static/rightSignIn.png" alt="右装饰图" >
						</view>
						<view class="font-28 text" >明天签到可得 <span>{{getPoint.tomorrow_score}}</span>积分</view>
						<view class="btn" @click="showSingInSuccess=false" >
							知道了
						</view>
					</view>
					<img class='icon-chahao' src="../../static/icon-chahao.png" width='30rpx' height='30rpx' alt="" @click='showSingInSuccess=false'>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdnUrl:'',
				number:"",
				oldPage:"",//从哪个页面跳转过来的
				getPoint:{
					change_score:"0",//今日签到获得的积分
					tomorrow_score:"0",//明日签到能获得的积分
				},//用来接收签到接口返回参数
				showSingInSuccess:false,//签到成功弹出层
				showPop:false,//规则说明弹出层				
				singInNum:{
					user_total_score:0,
					set_info:[]
				},//积分
				qrcode_wechat:[],//公众号二维码
				taskList:[
					{
						url:"./static/taskImg1.png",
						taskTile:"关注“爱加优购”公众号",
						taskContent:"成功关注后可获得",
						taskContent2:'',
						taskPoint:"200积分",
						taskBtn:"去关注"
					},
					{
						url:"./static/taskImg2.png",
						taskTile:"邀请好友",
						taskContent:"1.推荐成功一位且好友关注公众号可获得",
						taskContent2:'2.推荐会员消费，可获得其',
						taskPoint:"50积分",
						taskPoint1:"",
						taskBtn:"去邀请"
					},
					{
						url:"./static/taskImg3.png",
						taskTile:"购买商品",
						taskContent:"购买商品时将按照商品金额的",
						taskContent2:"",
						taskContent3:'比例获得积分',
						taskPoint:"",
						taskBtn:"去首页"
					},
				],//任务列表内容,现在是写死的.如果以后要写活直接调接口让后台返回相同的数据结构就行,请求里接收依稀
			}
		},
		onShow(){
			this.init()
		},
		onLoad(e){
			this.init1()
			this.cdnUrl=this.$cdnUrl
			this.oldPage=e.type
			if(e.type==1){
				this.singInSuccess(this.singInNum.total_day,1)
			}
		},
		methods: {
			init1(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=account/appConfig',
				}).then(res=>{
					self.qrcode_wechat.push(this.cdnUrl+res.data.qrcode_wechat)//二维码图片
				},rej=>{
					console.log(rej)
				})
				
			},
			// 获取签到信息
			init(){
				let self=this
				self.request({
					url:"ugo/api/app.php?c=account/getSignInfo",
					data:{}
				}).then(res => {
				        if (res.data.success) {
							this.singInNum=res.data.data
							self.taskList[0].taskPoint=res.data.data.key+'积分'
							self.taskList[1].taskPoint=res.data.data.key2+'积分'
							self.number=res.data.data.key3
							self.taskList[2].taskPoint=res.data.data.key4+":"+res.data.data.key5
				        } else {
									uni.showToast({
									title: res.data.message,
									icon: 'none'
				                })
				        }
				})
			},
			// 做任务
			doTask(e){
				console.log(e)
				if (e==0){
					if (this.singInNum.subscribe!=1){
						// 点击放大图片
							uni.previewImage({
								current:0,
								urls:this.qrcode_wechat
							})
					}
				}
				if (e==1){
					uni.navigateTo({
						url:'../my/registerShar'
					})
				}
				if (e==2){
					uni.switchTab({
						url:'../index/index'
					})
					// uni.navigateTo({
					// 	url:'../index/index'
					// })
				}
			},
			// 签到
			singInSuccess(e,r){
				let self=this;
				if(e==self.singInNum.total_day){
					self.request({
						url:'ugo/api/app.php?c=account/clickSign',
						data:{}
					}).then(res => {
					        if (res.data.success) {
								self.getPoint=res.data.data
								self.showSingInSuccess=true
								this.init()
					        } else if (r==0){
					                uni.showToast({
					                title: res.data.message,
					                icon: 'none'
					                })
					        }
					})
				}else{
					
				}
			},
			// 返回对应的签到周期天数
			returnDayNum(e){	
				let day=['一','二','三','四','五','六','七']
				return day[e]
			},
			// 积分规则弹窗确定按钮
			popOk(){
				this.showPop=false
			},
			//打开积分规则说明模态框
			showRulePop(){
				this.showPop=true
			},
			// 跳转到积分兑换记录页面
			goExchangeRecord(){
				uni.navigateTo({
					url:"exchangesRecord"
				})
			},
			// 跳转到积分商城
			goPointShop(){
				uni.navigateTo({
					url:"exchangeshop"
				})
			},
			// 跳转到积分明细页面
			goPointDetails(){
				uni.navigateTo({
					url:"pointsDetails"
				})
			},
			// 跳转到转赠页面
			goPointTransfer(){
				uni.navigateTo({
					url:"IntegralTransferred"
				})
			},
			// 跳转到订单记录页面
			goMyRecord(){
				uni.navigateTo({
					url:"myRecord"
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
</style>
<style scoped lang="scss">

	.task{
		margin:30rpx;
		background-color: #FFFFFF;
	}
	.task .txt1{
		font-weight: 500;
		color: #333333;
		margin: 0rpx 30rpx 10rpx 30rpx;
		padding-top: 30rpx;
	}
	.task .txt2{
		color: #999999;
		margin-left: 30rpx;
	}
	.task .btn{
		border: 1px solid #F73C2F;
		border-radius: 20px;
		width: 90rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		color: #F73C2F;
	}
	.task .btn1{
		border: 1px solid #999999;
		border-radius: 20px;
		width: 90rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		color: #999999;
	}
	.singnIn .txtBody .ruleTxt{
		line-height:40rpx ;
		height: 40rpx;
	}
	.singnIn .txtBody .ruleTxt img{
		margin-left: 10rpx;
		width: 24rpx;
		height: 24rpx;
	}
	.backImg .headImg .txt{
		width: 630rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	// 弹出层
	.popups-singIn{
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0 ,0.5);
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
			
		.popupsContent-singIn{
			position: relative;
			width: 567rpx;
			height: 404rpx;
			background-color: white;
			border-radius: 10rpx;
			.img1{
				width: 400rpx;
				height: 250rpx;
				position: absolute;
				bottom: 354rpx;
				left: 83rpx;
			}
			.conent{
				margin-top: 130rpx;
				text-align: center;
				.img2{
					width: 39rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}
				.img3{
					width: 39rpx;
					height: 26rpx;
					margin-left: 10rpx;
				}
				.text{
					margin-top: 10rpx;
					color: #8C8C8C;
					letter-spacing: 5rpx;
				}
				span{
					font-size: 27rpx;
					color: #EF8134;
					font-weight: bold
				}
				.btn{
					margin-top: 53rpx;
					font-size: 36rpx;
					width: 271rpx;
					height: 67rpx;
					background-color: #F6CB4B;
					color: #FFFFFF;
					margin: 53rpx auto;
					line-height: 67rpx;
					border-radius: 34rpx;
					text-align: center;
				}
			}
			.icon-chahao{
				position: absolute;
				top: 478rpx;
				left: 50%;
				transform:translateX(-50%)
				// top: 200rpx;
				// top: 500rpx;
			}
		}
	}
	.popups{
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0 ,0.5);
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		.popupsContent{
			width: 500rpx;
			height: 560rpx;
			background-color: white;
			border-radius: 10rpx;
			.popupsTitle{
				position: relative;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 600;
				color: #333333;
				.close{
					right: 0;
					top: 0;
					position: absolute;
					width: 80rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					color: #999999;
				}
				
			}
			
			.popupstext{
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 300;
				color: #999999;
				line-height: 36rpx;
				padding: 30rpx;
				height: 400rpx;
				overflow-y: auto;
			}
			.popupOk{
				text-align: center;
				color: #F6281B;
				border-top: 1px solid #F5F5F5;
				height: 80rpx;
				line-height:80rpx;
			}
		}
	}
	.singnIn{
		margin-left: 30rpx;
		background-color: #FFFFFF;
		width: 690rpx;
		height: 310rpx;
		padding: 30rpx 20rpx 0 20rpx;
	}
	.singnIn .txtBody{
		display: flex;
		justify-content: space-between;
	}
	.singnIn .txtBody span{
		color: #F05348;
		margin-left: 20rpx;
	}
	.singnIn  .singnInImg{
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
	}
	.singnIn .singnInImg .img{
		width: 78rpx;
		height: 116rpx;
		border: 2rpx solid #F35F55;
		border-radius: 20rpx;
		margin-bottom: 10rpx;
		text-align: center;
	}
	.singnIn .singnInImg .img1{
		width: 78rpx;
		height: 116rpx;
		border: 2rpx solid #F35F55;
		border-radius: 25rpx;
		margin-bottom: 10rpx;
		text-align: center;
		background-size: 78rpx 116rpx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAB0CAYAAAAW2WWwAAAQl0lEQVR42u2deWxl9XXHP+d3732rn9exPR57GIbAkAEEhEUhDWkgaiEhpFJJG2hJpHQjFAiNFJSlkcgkaZQupIqSBgEhVMqitqJNlSKikASyiKFtYJowJDPDMCyz2mM89rPf81vv/Z3+8bvGy9jDLM+eIdwjPc3Y78nv/b73e7bvOdcWjsN00yZTjcqXesiVIBer6BuBIZQCIh6vDWsoOiUwIio7QLdE6I+zXtuTsmmTPdYfJsfy4uqnPrrO+OYWq/IBQQf4DTRFho3oN21o785+/ou7Wwpk6Y47+oKsfAb0z0ACXhemTZCvN6v66cJdd42eMJDVT330RgxfFqSb16EpjGP19uznv/jt4wJSb7opqPe1fxX4CxID+Fp6dOpWue++5lEDqZtuytWbhe8gXJ3gN4+ej6SD0nWy6b7KqwKpN90U1Fe1PZSAeAQwx8rvWchMs/B19d62rwJXoy5AJI8FD7g6xmhpRlY/8ZEbxci3EtodBTGtvj/7t1/69mFAlu64uc8PMtsFuhOYji6bh83axsJd94wC+DNPBEH6s6gmIB59Ad4dBOnPAje/wsjKx28/zcAu5PVSbLeMlk2Lnpn7uy/v8eOMcysQoJqAc2wWGNXbgI+JbtpkapVD+wQGTqafkPIg4yHtaaQzg3RmIJ9CsgFkfLCgtSZUGmipAcUaWqyi5SbUI2jak/Xph9O5niG/OjV6mfHMyQHRE8j4SF8eGSggfQWkkAU/QDzAKBjzSu0hqmAFtUCk0GigxQo6MoUeKKGTdahFrLBnDVSnRi/zPWOu1JV2aSOQ8zHrOpD13ciqAhKkwIsg3A+N55DqXrBjYMsIIYoBSYNpQ7w+8Neh+Q1IoQcd6ICNDXS4iH1uHB2tQC1cOT4Yc6Wvai9ZURDTHjLYjjmnD1ndg6RSEO5CKj+H+tNItB+kMVP8vlKhydzCQ+LvlPLgnQbZt0D+EuSstchgD7pnDPvrUfRQDaKVcHm9xBd0w4rxsT2NOWcVZsMA0laA5g7k0INI/TmQmnN1DIQ+eAaqFqzMgmqAlADWubpfgXAbMrUdSg+i2cug/b3I2YNIbw77zEHsC0WoLy87VTnbR1kz5/IvUzIRpDeLuWQIWduHeHVk8gGo/gQxNfB9iFJQVaiJY1vOQE0h1Fk6Svycei65BAJpwFOQaaT2A6j9H9p+PdL7Nsybc9B5ALt1FMqNZcyVMuCratuyAimCDLbhXbYW6euDaB8y+hUk2g2eD2EK6uKSylToQMkJBAqd3vz+S+MvIgUVaCqIgUgcg3MGkUMwfi/UfwUdH8CcdzqS9bFPDaPF2jIxUgs+av1lBXEgj/eW9Uh/P1Q3IxMPIDIJXgBVA2UFsVAQ6PLAm2FeDOBiQp8v0OY5ZC1QimL2GmgPkCCC6k+h8RJ0fwQ5+wzwDNETe2Gqvjz5BlWW6yFdaby3nIasXoNUHkXG70bMJGgKqp5j1gzz0uJcVeSwpnaB+jK/APUEunxo98AqNDyop8AEiN2NGfsc6DCyfg3ehash6y/LWZcPyHyAuXgQ6e+F6mYoPoB4DWimYFJhOnJxsNNzYMwFSg9XCA5zcV3w/4xxjLYWxptQEjdekgnk0BcQU0Y2DGLO7I7f77UApCeYs3qQ9atBDyHjX0dM3TGxrBBaB6ARF+sWZdsR5OeFLm/nxM+ccW5fU6h5YFJIcwQZ/xKSTWEuXIv0519Jt6cwkCA9Wcz5Q0g6g4x/FZEJIAV19w/dvotzugQwcsxpc5adFmg30OFB3cK0gPGRxrPI9ENIZwFz0SDkg1McyKyHedMQ0pFDyt9FmjvAeFARKIbOBT1ZnkIhvRZ63gvZi1zMNcBECM0AAg8m/xPCfciaHszpnbFHnIpAguubh7pAp6D8mDtAw3Mgti0TiOJD7lwY+iQMfRz8LsfMgoEsULHQFMTUkMl/QbIFZGM/ZLyWnd1vaYOf8jDru5FcHqYfQ3TEFdoYyFoH5MIkIidaeBSg612w5sOQOw+ao9A4OOvznT5U1BXxhEjtGbS5C+nuQ9a0o8+NuWx/ovJBSxmZ8ZB1PeCBlL7vXLppYDqEDj/uSk4gFh6mBvbBwK2w7vOQvwhM2i1IaGPOhRIH1KQF64EfIqWHkIyPOXc15IJTjJFGkP4C5HJI7SlEJ8CmoBEXzRJ3Iy1j/6BjYe/7IZgzIbFVnM42N3YKTDShEICvSGMHaotITw7pSKNTtVOIkWkP84Y+p+aUH3UdCuJ64syctNyK6xYMwOBHoe+D80F0473ZN5l5ryB28VAgAnQSae6CwEN621rFyBbJTGkP6W8HqSDhvliqEafWpE0Lxf3emIl/DH77IjEzD3M3CzXWPwuei5UR4IdQ34HkLoyBtKcOI6U97WrEaASoOzeuKtT1xGrEeZ8271y578bFQQQwOcisn30vndW6qEUuZgM0doKfhu62U6v8kY4MeAYJx0BCd4BatHj/fLwlTtdVMPAhCFYtPW0GaLt08X7dxKKmFSSacF1PR65Frm1blGxyaSdlReNA5KQtI64Ab8V0LP8mGPoEpNYuTuuoCtXtMPYgFH80P0bOlFkZE8+AABuBrSHZVEvKn9Zl7bTnmKfl2cFWSuasIByhbvTawF8F0RSEE4dnpNQaWHMb5DYuwm6F5ssw9h9w8H6o7QZbWSSUiKscJC6J1IKWQPItGZa1DEgxxn1mjeIYZKEc64YzPfBh8SwL6dOg5zrouhoOfRdG7p0PhMnCqj+Azt9x7r0wQ1d3woEvw/h/QTi+tNihOLXdaFxRKNgGcIoBqdaiKIJxscjGH3yxAlzSkBqA7ndD742QfYPrUPwOKP4QKr+epW/+fOj/c/A7F7xhCOVfwJ7PwNRm0KMQbHUBysaPZ0ItAFJbVf7Um/HZ4yucjl3bqouVM5ZZD51XQe/7ILtxPkDp02HgFth9J4RjLqmsvhky6+bTS0OY/Bns/RsoPeli8lLAyZyL6MdxGwU1YNohsrQCg9Yxslx3o0+vy7ViXuTkLDtHJlNg9Yeg+z2QXufmLfNcPe1cfOJ7MP4wtL8NOq6Y79IawuRP4aVPQmXbEjFjETBnHt7MGMOAZNF68dRybYoVd3WDHkR9x5IQN9BaFcwCOXK/i2ur3gf5C5w7L+yfV90A9b3Q/0FXgL8CSgTFH8OeO+e4/1FVyy7MTFvIWUgr6udBI7Q4fYrFyENll2DaVgMBmJpzpWI0K+QKUNsF9T1QfBR6fh/6/xQyp8+yTryYhQbaLpllrUZQ+jns+TRMbz06EOe6tQINIBu5ZOOvR5t19NBUS4BsWUGu1QY6VgYpoF6/y6hGZ4dScz+rNqC+G0bug+dvg4lHIJqew8ou6LoGvI7Z7Dz9NOz+66MHkQWjCKuQN24Orh6kz4NmFQ5OnmLCbqWBffYAWm9C/nLnSgGwKjV/W2LeASsw9Ti8eAcc/Gdojs3JqKm4ZlTH4n1fgNJTrx4TF2NlpDBlndAbCGgBTZ0FjQgdbhmQlpY8miH2+YNQqaC5y4EcSBQfIjpC92AdO/f9Pez/Bxcb51pjGPb/I0z8aOns/GpWimLVJ3Sf1R8Erw8tVrAvT7bk/AartOxRrmF3j4LNovmLwYZgIkeLKTt7D8VimIZjMPIA7Pkc1F50Vzoqwei3XLGtxzjYn+mtrbqNjDbjNIAmaOFatBFht+6ByVpLzt7aUUOtiW7fj25YC4XroPo04k87dbwS7/F4RxAw7DSM/btj6dDHoPYSjH4DwuLxRP84uVlo8yHt9iY1dSaavghGhrE7hqHRmgWr1gIZRtgXxzD7xpANAy5Wlr8HWc+dbDKaM89eikk1V0eKB40RqO87bp2DknVhpddAoGjDRzv+CK1XiX7xEkxVW7aU6rd8u3WyQrR5O9LfAZ3XQ+WXSDgCfrznPxGXQ3KE5BsWYfSbJzAQi3v9Ugh5N6ehGUH+HZB6I/rSAeyv9jk2tmrS0vK5tlX0xZexv3webQja85eozYIXHypUd8hWDL+WYmIjjouFwGVqG6LSi7a/H50sYR/fAWOluCw7lVdWqg3s/z6PvrgP/DPQjj9EQ4F0E3p81/GMhe7AZsGmxGKC7FJfLxYTpyMYD51Cn7dAHaWArvoI2vSxW3Zhnx12azMtPLO/LIvrCjo6RfTYr5CuHNL/exC+jJa/jwRN0ABquKWBLg8CM78fnwuqcOSh2dznq9ZVB3nPLQZow1UQvX8F3unotp1E//0cTLd+6bR1w6/FwHx+lOiRp/GuyUDvn4DXgUx+B/yG282JPDfZK8WrLBmZrxQdqd17RRmPe+hQIe9DF5AKQSxq29FVt0FwAfaF54l+sBUOlZflrgd/WW+lCCPs1r3gCd7vXoD0XosN1mLG7wavBEEKmkBVYMJCXlxMm1FsDLPdzVw0Q423dnFbZw0LWQMpC6bpVCgZxPZ+GDHrsM/tJHr4l+j+4rLdOiLVa69Y/l38wMNsHMBcdRFmcADsHqT4DaS53cn/ViAyTn6z4lyUeMaCzgrEQVw2zUwmswZ86zoeT2MWpiH/drT9BhcTt+3C/vCZZQXRAfnut6/MTQ2eQdZ2Y644B7PxDUguA9OPYsoPgT3oAMVzSaKBc3k/1jMb8UdMxXMXGwsiKcDECwHqo6kNaNsNEJyFFovYp54l2rwTJirLfhOTVK/57ZW7W0kE2rOYS9bjvfmN0NuH+A2o/g9SeRyaLyGUHUhRnIp1QWZGZ4dYVkA60PR5aO5KSG10KtTeA9ifbcPuHIFqY2WOVn3X21b+Ts6Uj/S1Yy49A3PuOujsQNIG7DhS2wHN7RAeQKJSvBA1s2TggUmjXg/4Q2j6XAjWA51otYYeHMVuecEV2xMVx9yV4kj1nZefvFtiswHSXUA2DmLOGkQGuiGTdTs5vsZ3gDXiyaQ48VcCsAEaAo0GlKvYPaPojr1OfZqqui5mhU2q73zryb+3OB1APu3uSVzThQx0I/1dSHsbZFLgxwuhzRCtVKFYRg9OoPvH0QMTblwwXV+h2+VORvlz1KpRA2oN9FAJffYAr0Xzk5vdWwZkAkLCyATI30QgE99OGJkkm4SRiSUxMmHka8NMAkHCyCRrJ8kmscS1k2STAJkAmVgCZAJkAmRiCZAJkAmQCZCJJUAmQCZAJkAmlgCZAJkAmVgCZAJkAuTrAEg55t9xkNgiFhlFSgkOJ2YCJSMwmkBxYqbosAF2JlCcIJDKTqPYLQkUJ+jawpNGI30sgeIEGRnZH4uCqV1+wT5O5h+YfG3bcObxp4eMgFXV5E9BH69bq35LwMYFefhPuF+KkNixWTPtsHOdTW7ztj0oDyS4HHPd84Bs3rZnXosYqt6pquMJOkeN4nioeudhvXbhia2jgt6eAHTUxePthSe2ji4qWmQ3P/Nt0K8lKL0qiPc7rOaIFgtfk6kGtwKPJGgtaY9kasEtC795GJCyZUszU/WvE3g4wewwceLhTNW/TrZsaS7y3BLsvQK/1jz/K4jcnEAIqN6TCbZ+WH5CuATIR7b6Wy+4PkLvFpHu1yd+Oo5ya+6Jrf96pNe9qkKe3vz0v0XKRlHuQV9HRbvSRLk3Uja+GohHxci5Vv2tjevEpG5R+MBvcG8+LPBNtY27s09s330M8fN4Lhamevn5l4ryDoWLBc5WkSGBAvEfOXkNWKRQEtV9Cs8KbFHhsezjW5+UY/5l5/D/XpzTtklp+ewAAAAASUVORK5CYII=);
	}
	.singnIn .singnInImg  img{
		width: 47rpx;
		height: 47rpx;
		margin-top: 10rpx;
	}
	.integralBtn{
		text-align: center;
	}
	.integralBtn img{
		width: 92rpx;
		height: 86rpx;
	}
	.integralBtn .txt{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-top: 20rpx;
	}
	.integralFunction{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		width: 690rpx;
		// height: 150rpx;
		margin: 80rpx 0 30rpx 30rpx; 
		border-radius: 10rpx;
		padding: 20rpx 30rpx;
	}
	.headImg{
		color: #FFFFFF;
		padding: 30rpx;
		margin-left: 30rpx;
		border-radius: 5rpx;
		width: 690rpx;
		height: 260rpx;
		background-size: 690rpx 260rpx;
		background-image: url(data:image/png;base64,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);
		background-repeat:no-repeat;
	}
	.backImg{
		width: 750rpx;
		height: 220rpx;
		background-size: 750rpx 220rpx;
		background-image: url(data:image/png;base64,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);
	}
	
	.headBtn{
		background-color: #FCD653;
		color: #F14034;
		width: 135rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 25rpx;
	}
</style>
