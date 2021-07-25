<!-- 选择地址 -->
<template>
	<view>
		<view class="search">
			<view class="left"  @click="getAddress">
				<text style="display: inline-block; width: 100rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; margin-right: -10rpx;align-items: center;">{{site}}</text>
				<image src="../../static/down.png" mode=""></image>
			</view>
			<view class="right">
				<input type="text" v-model="searchName" placeholder="小区/办公楼/学校" @input="getName()"/>
				<view class="searchImg"><image src="../../static/search1.png"></image></view>
				<view class="del" @click="del" v-if="delimg==true">
					<image src="../../static/del.png" ></image>
				</view>
			</view>
			<view class="text1" @click="search">搜索</view>
		</view>
		
		<!-- <view class="" v-if="showtxt==true"> -->
			<view class="" v-if="nearSite.length!=0">
				<view class="receive_addr">
					<view class="tip">
						<image src="/static/near_addr.png" mode=""></image>附近地址
					</view>
				</view>
				<block v-for="(item,i) in nearSite" :key='i'>
					<view class="receive_detail" @click="gohome(item)">
						<view class="word">
							{{item.title}}
						</view>
						<view class="word1">
							{{item.address}}
						</view>
					</view>
				</block>
			</view>
			<!-- <block v-for="(item,i) in list" :key='i'>
				<view class="receive_detail" @click="gohome(item.title,item.location.lat,item.location.lng)">
					<view class="word">
						{{item.title}}
					</view>
					<view class="word1">
						{{item.address}}
					</view>
				</view>
			</block> -->
			<view v-else style="text-align: center;margin-top: 20rpx; color: #999;">暂无更多数据</view>
		<!-- </view> -->
		
		<view class="citys" v-if="showCity">
			<view class="city">
				<view class="city_top">
					<view class="city_tabs">
						<block v-for="(item,i) in tabs" :key="i">
							<view :class="[i==currentTab?'txt':'']">
								{{item.name}}
								<view class="tip" v-if="currentTab==i"></view>
							</view>
						</block>
					</view>
					<view class="city_sure" @click="sure">
						确定
					</view>
				</view>
				
				<view class="srcoll_options">
					<scroll-view scroll-y="true" >
						<block v-for="(item,i) in provinceList" :key="i">
							<view :class="[item.region_id==provinceIndex?'txt':'']" @click="getProvinceIndex(item.region_id,item.region_name)">
								{{item.region_name}}
							</view>
						</block>
					</scroll-view>
					<scroll-view scroll-y="true" >
						<block v-for="(item,i) in cityList" :key="i">
							<view :class="[item.region_id==cityIndex?'txt':'']" @click="getCityIndex(item.region_id,item.region_name)">
								{{item.region_name}}
							</view>
						</block>
					</scroll-view>
					<scroll-view scroll-y="true" >
						<block v-for="(item,i) in countryList" :key="i">
							<view :class="[item.region_id==countyIndex?'txt':'']" @click="getCountyIndex(item.region_id,item.region_name)">
								{{item.region_name}}
							</view>
						</block>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {jweixin} from '../../until/jweixin.js'
	export default {
		data() {
			return {
				delimg:false,//删除图片
				value:'',//输入的内容==>地点名称
				site:'',//显示的区
				city_name:'',//市名
				list:[],
				showCity:false,//是否显示省市区列表
				tabs:[
					{name:'省份'},
					{name:'城市'},
					{name:'区县'}
				],
				currentTab:'0',
				provinceList:[],//省列表
				cityList:[],//市列表
				countryList:[],//区列表
				provinceIndex:'-1',
				cityIndex:'-1',
				countyIndex:'-1',
				searchName:'',
				chooseAddress:'',//选择的地址
				nearSite:[],//附近地址列表
				lng:'',
				lat:'',
				provinceName:'',//省名字
				cityName:'',//市名字
				countryName:'',//区名字
			}
		},
		methods: {
			//搜索
			search(){
				this.init()
			},
			getName(){
				this.delimg=true
			},
			//清空搜索框的值
			del(){
				this.searchName=''
				this.delimg=false
				this.nearSite=[]
			},
			init(){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=account/addressToLocation',
					data:{
						address:self.chooseAddress+self.searchName
					}
				}).then(res=> {
					if(res.data.success){
						self.lng=res.data.data.lng
						self.lat=res.data.data.lat
						self.getNear()
					}
				});
			},
			// 获取附近地址
			getNear(){
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=account/locationToAddress',
					data:{
						lng:self.lng,
						lat:self.lat
					}
				}).then(res=> {
					if(res.data.success){
						self.nearSite=res.data.data
					}
				});
			},
			//点击附近地址到首页
			gohome(e){
				uni.setStorageSync('lng',e.location.lng)
				uni.setStorageSync('lat',e.location.lat)
				uni.setStorageSync('address',e.title)
				uni.navigateBack({
				    delta: 2
				});
			},
			//获取省列表
			getAddress(){
				this.showCity=true
				this.currentTab='0'
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=getProvinceList'
				}).then(res => {
					if (res.data.success) {
						self.provinceList = res.data.data.list
					}
				});
			},
			//点击省获取市列表
			getProvinceIndex(e,name){
				this.provinceIndex=e
				this.provinceName=name
				this.currentTab='0'
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=getCityList',
					data:{
						province_id:e
					}
				}).then(res => {
					if (res.data.success) {
						self.cityList = res.data.data.list
						self.countryList=[]
					}
				});
			},
			//点击市获取区列表
			getCityIndex(e,name){
				this.cityIndex=e
				this.cityName=name
				this.currentTab='1'
				let self = this
				self.request({
					url: 'ugo/api/app.php?c=getCountryList',
					data:{
						city_id:e
					}
				}).then(res => {
					if (res.data.success) {
						self.countryList = res.data.data.list
					}
				});
			},
			//获取点击的区
			getCountyIndex(e,name){
				this.countyIndex=e
				this.countyName=name
				this.currentTab='2'
			},
			sure(){
				this.showCity=false
				if(this.countyName!=''){
					this.site=this.countyName;
					this.chooseAddress=this.provinceName+this.cityName+this.countyName;
					uni.setStorageSync('full_name',this.chooseAddress)
					uni.setStorageSync('address',this.site)
					uni.setStorageSync('full_name',this.chooseAddress)
					uni.setStorageSync('address',this.site)
				}
				this.searchName=''
			},
		},
		onLoad(options) {
			this.searchName=options.searchName
			this.chooseAddress=uni.getStorageSync('full_name')
			this.site=uni.getStorageSync('address')
			if(this.searchName!=''){
				this.delimg=true
			}
			this.init()
			// let self = this
			// jweixin.ready(function() {
			// 	jweixin.getLocation({
			// 		type: 'wgs84',
			// 		success: function(res) {
			// 			self.lng = res.longitude
			// 			self.lat = res.latitude
			// 			self.init()
			// 		},
			// 		cancel: function(res) {
			// 			alert('您已禁止获取位置信息')
			// 		}
			// 	});
			// });
		}
	}
</script>

<style lang="scss">
.search {
	width: 100%;
	height: 108rpx;
	display: flex;
	padding: 0 30rpx;
	box-sizing: border-box;
	align-items: center;
	border-bottom: 1px solid #f5f5f5;
	// position: fixed;
	// top: 88rpx;
	// left: 0;
	// z-index: 333;
	.left {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3F3D3D;
		text-align: center;
		display: flex;
		text-align: center;
		image {
			width: 24rpx;
			height: 24rpx;
			vertical-align: middle;
			margin: 10rpx 10rpx 0 5rpx;
		}
	}
	.right {
		// width: 500rpx;
		height: 60rpx;
		position: relative;
		input {
			flex: 1;
			width: 480rpx;
			height: 68rpx;
			background: #F5F5F5;
			border-radius: 10rpx;
			padding-left: 80rpx;
			box-sizing: border-box;
		}
		.searchImg {
			width: 80rpx;
			height: 100%;
			line-height: 70rpx;
			text-align: center;
			position: absolute;
			top: 0;
			left: 0;
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
		.del {
			width: 80rpx;
			height: 70rpx;
			position: absolute;
			top: 0;
			right: 0rpx;
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 20rpx  0 0 25rpx;
			}
		}
	}
	.text1{
		margin-left: 20rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FD635E;
	}
}
.receive_addr{
	padding: 20rpx 30rpx;
	.tip{
		font-size: 26rpx;
		color: #333;
		image{
			width: 30rpx;
			height: 30rpx;
			vertical-align: middle;
			margin-right: 10rpx;
		}
	}
}
.receive_detail{
	padding: 30rpx 60rpx;
	border-bottom: 1px solid #f5f5f5;
	.word{
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	.word1{
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999;
		margin-top: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text{
			margin-left: 10rpx;
		}
	}
}
// .receive_detail{
// 	padding: 30rpx 30rpx;
// 	border-bottom: 1px solid #f5f5f5;
// 	.word{
// 		font-size: 30rpx;
// 		font-family: PingFang SC;
// 		font-weight: 500;
// 		color: #333333;
// 	}
// 	.word1{
// 		font-size: 26rpx;
// 		font-family: PingFang SC;
// 		font-weight: 500;
// 		color: #999;
// 		margin-top: 20rpx;
// 		overflow: hidden;
// 		text-overflow: ellipsis;
// 		white-space: nowrap;
// 		text{
// 			margin-left: 10rpx;
// 		}
// 	}
// }

.citys{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.3);
	position: fixed;
	top: 0;
	left: 0;
	.city{
		width: 100%;
		height: 700rpx;
		background: #FFFFFF;
		position: absolute;
		left: 0;
		bottom: 0;
		.city_top{
			width: 100%;
			height: 88rpx;
			border-bottom: 2rpx solid #e7e7e7;
			display: flex;
			justify-content: space-between;
			.city_sure{
				width: 130rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #D42520;
			}
			.city_tabs{
				display: flex;
				view{
					padding: 0 40rpx;
					height: 88rpx;
					line-height: 88rpx;
					position: relative;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					.tip{
						padding: 0;
						width: 56rpx;
						height: 2rpx;
						background: #9C191F;
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
					}
				}
				.txt{
					color: #333!important;
					font-weight: 500!important;
				}
			}
		}
		.srcoll_options{
			height: 600rpx;
			display: flex;
			scroll-view{
				view{
					text-align: center;
					height: 70rpx;
					line-height: 70rpx;
				}
				.txt{
					color: #D42520;
				}
			}
		}
	}
}
</style>
