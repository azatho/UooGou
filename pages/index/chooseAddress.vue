<template>
	<view class="" style="padding: 100rpx 0;">
		<view class="search">
			<view class="left" @click="getAddress">
				<text style="display: inline-block; width: 130rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; margin-right: -10rpx;align-items: center;">{{site}}</text>
				<image src="../../static/down.png" mode=""></image>
			</view>
			<view class="right">
				<input type="text" placeholder="小区/办公楼/学校" v-model="searchName"/>
				<view class="searchImg"><image src="../../static/search1.png"></image></view><view class="text1" @click="getsearch">搜索</view>
			</view>
		</view>
		<view class="current_addr">
			<view class="tip">
				当前位置
			</view>
			<view class="detail_addr">
				<view class="addr" @click="goindex(full_name)">
					{{full_name}}
				</view>
				<view class="location" @click="getLocation">
					<image src="../../static/location(1).png" mode=""></image>
					重新定位
				</view>
			</view>
		</view>
		
		<view class="" v-if="sitelist.length!=0">
			<view class="receive_addr">
				<view class="tip">
					<image src="/static/house(1).png" mode=""></image>收货地址
				</view>
			</view>
			<block v-for="(item,i) in sitelist" :key='i'>
				<view class="receive_detail" @click="gosearch(item.full_address,item.address)">
					<view class="word">
						{{item.full_address}}
					</view>
					<view class="word1">
						{{item.contacts}} <text>{{item.phone}}</text>
					</view>
				</view>
			</block>
		</view>
		
		<view class="">
			<view class="receive_addr">
				<view class="tip">
					<image src="/static/near_addr.png" mode=""></image>附近地址
				</view>
			</view>
			<block v-for="(item,i) in nearSite" :key='i'>
				<view class="receive_detail" v-if="i<5 && i>0" @click="gohome(item)">
					<view class="word">
						{{item.title}}
					</view>
					<view class="word1">
						{{item.address}}
					</view>
				</view>
			</block>
		</view>
		
		<view class="add_addr" @click="addsite">
			<image src="../../static/addaddr.png" mode=""></image>
			新增收货地址
		</view>
		
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
	export default{
		data(){
			return{
				showCity:false,
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
				sitelist:[],//收货地址
				address_id:'',//地址id
				site:'',//左上角区域的名字
				full_name:'',//定位的全称
				// address:'',//定位地址全称
				nearSite:[],// 附近地址l列表
				laat:'',
				lng:'',
				provinceName:'',//省名字
				cityName:'',//市名字
				countryName:'',//区名字
				chooseAddress:'',
				searchName:'',//输入的搜索的名字
			}
		},
		created(){
			this.getLocation();
		},
		methods:{
			// 收货地址列表接口
			init(){
				let self = this
				this.request({
					url:"ugo/api/app.php?c=personal/user_address_list",
					data:{
						address_id:self.address_id
					},
				}).then(res=>{
					if(res.data.success){
						if(res.data.data.list.length!=0){
							self.sitelist=res.data.data.list
						}
					}
				},rej=>{
					console.log(rej);
				}) 
			},
			//重新定位
			getLocation(){
				var self = this;
			     jweixin.ready(function() {
			     	jweixin.getLocation({
			     		type: 'gcj02',
			     		success: function(res) {
			     			self.lng = res.longitude
			     			self.lat = res.latitude
			     			self.getLocationAddress();
			     		},
			     		cancel: function(res) {
			     		   
			     		}
			     	});
			     });
				// this.getNear()
			},
			//获取地理位置
			getLocationAddress(){
			  var self = this;	
				self.request({
					url: 'ugo/api/app.php?c=account/locationToAddress',
					data:{
						lng:self.lng,
						lat:self.lat
					}
				}).then(res=> {
					if(res.data.success){
						self.full_name=res.data.data[0].address+res.data.data[0].title
						// self.address=res.data.data[0].address
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
						self.site = res.data.data[0].ad_info.district
					}
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
				this.showCity=false;
				if(this.countyName!='' && this.countyName){
					this.site=this.countyName;
					this.chooseAddress=this.provinceName+this.cityName+this.countyName;
					uni.setStorageSync('full_name',this.chooseAddress)
					uni.setStorageSync('address',this.site)
				}
			},
			// 点击当前地址到首页
			goindex(full_name){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=account/addressToLocation',
					data:{
						address:full_name
					}
				}).then(res=> {
					if(res.data.success){
						self.lng=res.data.data.lng
						self.lat=res.data.data.lat
						uni.setStorageSync('lng',res.data.data.lng)
						uni.setStorageSync('lat',res.data.data.lat)
						uni.navigateBack({
							data:1
						})
					}
				});
			},
			// 点击收货地址到首页
			gosearch(full_name,address){
				let self = this;
				self.request({
					url: 'ugo/api/app.php?c=account/addressToLocation',
					data:{
						address:full_name
					}
				}).then(res=> {
					if(res.data.success){
						self.lng=res.data.data.lng
						self.lat=res.data.data.lat
						uni.setStorageSync('lng',res.data.data.lng)
						uni.setStorageSync('lat',res.data.data.lat)
						uni.navigateBack({
							data:2
						})
					}
				});
			},
			//点击附近地址到首页
			gohome(e){
				uni.setStorageSync('lng',e.location.lng)
				uni.setStorageSync('lat',e.location.lat)
				uni.navigateBack({
					data:'1'
				})
			},
			// 搜索地址
			getsearch(){
				uni.navigateTo({
					url:'./siteSearch?searchName='+this.searchName
				})
			},
			// 新增收货地址
			addsite(){
				uni.navigateTo({
					url:'../my/addsite'
				})
			},
		},
		onShow() {
			
		},
		onLoad(options) {
			this.lat=uni.getStorageSync('lat')
			this.lng=uni.getStorageSync('lng')
			this.site=uni.getStorageSync('site')
			this.chooseAddress=uni.getStorageSync('chooseAddress')
			
			//获取收货地址
			this.init()
			//获取附近地址
			this.getNear()
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
	background-color: #fff;
	position: fixed;
	top: 88rpx;
	left: 0;
	z-index: 333;
	.left {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3F3D3D;
		align-items: center;
		display: flex;
		text-align: center;
		image {
			width: 24rpx;
			height: 24rpx;
			vertical-align: middle;
			margin: 5rpx 10rpx 0 5rpx;
		}
	}
	.right {
		width: 540rpx;
		height: 60rpx;
		position: relative;
		display: flex;
		justify-content: space-between;
		input {
			width: 540rpx;
			height: 68rpx;
			background: #F5F5F5;
			border-radius: 10rpx;
			padding-left: 80rpx;
			box-sizing: border-box;
			flex: 1;
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
}

.current_addr{
	padding: 20rpx 30rpx;
	.tip{
		font-size: 26rpx;
		color: #999;
	}
	.detail_addr{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		border-bottom: 1px solid #f5f5f5;
		.addr{
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333;
			flex: 1;
		}
		.location{
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FF0000;
			image{
				width: 30rpx;
				height: 30rpx;
				vertical-align: middle;
				margin: -5rpx 10rpx 0 30rpx;
			}
		}
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
.add_addr{
	width: 100%;
	height: 95rpx;
	line-height: 95rpx;
	text-align: center;
	background: #FFFFFF;
	box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.1);
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	position: fixed;
	bottom: 0;
	left: 0;
	image{
		width: 36rpx;
		height: 36rpx;
		margin: 5rpx 10rpx 0 0;
	}
}

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
