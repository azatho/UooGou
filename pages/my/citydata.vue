<!-- 浏览记录页面 -->
<template>
	<view>
		<view class="hang">
			<text class="txt">所在区域</text>
			<view :class="id ? 'address1' : 'address'" @click="addressModel">
				{{region}}
			</view>
		</view>
		<view class="addressModel" v-if="visible">
			<view class="showModel">
				<picker-view :value="current_value1" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in provinceList" :key="index">{{item.region_name}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in cityList" :key="index">{{item.region_name}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in countryList" :key="index">{{item.region_name}}</view>
					</picker-view-column>
				</picker-view>
				<view class="btns">
					<view class="sure" @click="cancel_address">
						取消
					</view>
					<view class="cancel" @click="sure_address">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				region: '省市区县、乡镇等', //所在区域  
				visible: false,
				current_value: [0, 0, 0],
				current_value1: [0, 0, 0],
				provinceList: [],
				cityList: [],
				countryList: [],
				regions: [], //用来存放滑动地区id
				province_id: '',
				city_id: '',
				county_id: '',
				province_name: '',
				city_name: '',
				county_name: '',
				flag: false,
				show:false,
			    parentsData:{}
			}
		},
		props: {
			'nnn': { //数据list
				type: Object
			},
			'id':{
				type:Number
			}
		},
		created() {
			if(this.nnn.province_id &&  this.nnn.city_id && this.nnn.county_id){
				this.region = this.nnn.province_name + ',' + this.nnn.city_name + ',' + this.nnn.county_name;
			}
		},
		mounted(){
			
		
			
		},
		watch:{
			nnn:function(newval,old){
				this.parentsData = newval;
				this.province_name = newval.province_name
				this.city_name = newval.city_name
				this.county_name = newval.county_name
				this.regions[0] = newval.province_id
				this.regions[1] = newval.city_id
				this.regions[2] = newval.county_id
				this.show = newval.show
				this.region = newval.province_name + ',' + newval.city_name + ',' + newval.county_name;
			}
		},
		methods: {
			addressModel() {
				console.log(11)
				this.visible = !this.visible
				this.flag = false;
				this.getProvinceList()
			},
			// 省
			getProvinceList() {
				let self = this
				self.request({
					url: "ugo/api/app.php?c=getProvinceList",
					data: {
						token: uni.getStorageSync('token'),
					},
				}).then(res => {
					if (res.data.success) {
							self.provinceList = res.data.data.list;
						if(self.show){
							for(var i = 0; i<this.provinceList.length; i++){
								if(self.regions[0] == self.provinceList[i].region_id){
									self.current_value1.splice(0,1,i);
								}
							}
						}
						self.getCityList(res.data.data.list[self.current_value1[0]].region_id)
						self.province_id = res.data.data.list[self.current_value1[0]].region_id;
						self.province_name = res.data.data.list[self.current_value1[0]].region_name;
					}
				})
			},
			// 市区
			getCityList(e) {
				let self = this
				self.request({
					url: "ugo/api/app.php?c=getCityList",
					data: {
						token: uni.getStorageSync('token'),
						province_id: e,
					},
				}).then(res => {
					if (res.data.success) {
						self.cityList = res.data.data.list;
						if(self.show){
							console.log(self.regions[1]);
							for(var i = 0; i<self.cityList.length; i++){
								if(self.regions[1] == self.cityList[i].region_id){
									self.current_value1.splice(1,1,i);
								}
							}
						}
						self.getCountryList(res.data.data.list[self.current_value1[1]].region_id);
						self.city_id = res.data.data.list[self.current_value1[1]].region_id;
						self.city_name = res.data.data.list[self.current_value1[1]].region_name;
					}
				})
			},
			// 乡镇
			getCountryList(e) {
				let self = this
				self.request({
					url: "ugo/api/app.php?c=getCountryList",
					data: {
						token: uni.getStorageSync('token'),
						city_id: e,
					},
				}).then(res => {
					if (res.data.success) {
						self.countryList = res.data.data.list;
						if(self.show){
							for(var i = 0; i<this.countryList.length; i++){
								if(self.regions[2] == self.countryList[i].region_id){
									self.current_value1.splice(2,1,i);
								}
							}
						}
						self.county_id = res.data.data.list[self.current_value1[2]].region_id;
						self.county_name = res.data.data.list[self.current_value1[2]].region_name;
					}
				})
			},
			// 中间区域选择
			bindChange(e) {
				const val0 = e.detail.value[0]
				const val1 = e.detail.value[1]
				const val2 = e.detail.value[2]
				this.flag = true;
				if (val0 != this.current_value[0]) {
					for (var i = 0; i < this.provinceList.length; i++) {
						if (val0 == i) {
							this.regions[0] = this.provinceList[i].region_id
							this.getCityList(this.provinceList[i].region_id)
							this.province_name = this.provinceList[i].region_name
							this.current_value[0] = val0
						}
					}
				}
				if (val1 != this.current_value[1]) {
					for (var i = 0; i < this.cityList.length; i++) {
						if (val1 == i) {
							this.regions[1] = this.cityList[i].region_id
							this.getCountryList(this.cityList[i].region_id)
							this.city_name = this.cityList[i].region_name
							this.current_value[1] = val1;
						}
					}
				}
				if (val2 != this.current_value[2]) {
					for (var i = 0; i < this.countryList.length; i++) {
						if (val2 == i) {
							this.regions[2] = this.countryList[i].region_id
							this.county_name = this.countryList[i].region_name
							this.current_value[2] = val2
						}
					}
				}
			},
			// 区域选择框隐藏
			cancel_address() {
				this.visible = false;
				if(this.show){
					this.show = false;
				}
			},
			// 区域选择框点击确定
			sure_address() {
				this.visible = false;
				if (this.flag) {
					this.current_value1 = [this.current_value[0], this.current_value[1], this.current_value[2]];
					this.province_id = this.regions[0];
					if (this.regions[1]) this.city_id = this.regions[1];
					if (this.regions[2]) this.county_id = this.regions[2];
				}
				this.region = this.province_name + ',' + this.city_name + ',' + this.county_name;
				this.$emit('get_reginId', {
					province_id: this.province_id,
					city_id: this.city_id,
					county_id: this.county_id,
					province_name: this.province_name,
					city_name: this.city_name,
					county_name: this.county_name
				})
			}
		},
		onShow() {

		},
		onLoad(e) {

		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.address{
		 width: 520rpx;
		 color: #333333; 
		 font-size: 26rpx;
	}
	.address1{
		color: rgb(153, 153, 153);
		font-size: 26rpx;
	}
	.hang {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		border-bottom: 1rpx solid #F5F5F5;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #222222;
	}

	.hang input {
		width: 520rpx;
		font-size: 26rpx;
	}

	/* 区域选择框 */
	.citys {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0;
		left: 0;

		.city {
			width: 100%;
			height: 700rpx;
			background: #FFFFFF;
			position: absolute;
			left: 0;
			bottom: 0;

			.city_top {
				width: 100%;
				height: 88rpx;
				border-bottom: 2rpx solid #e7e7e7;
				display: flex;
				justify-content: space-between;

				.city_sure {
					width: 130rpx;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #D42520;
				}

				.city_tabs {
					display: flex;

					view {
						padding: 0 40rpx;
						height: 88rpx;
						line-height: 88rpx;
						position: relative;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;

						.tip {
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

					.txt {
						color: #333 !important;
						font-weight: 500 !important;
					}
				}
			}

			.srcoll_options {
				height: 600rpx;
				display: flex;

				scroll-view {
					view {
						text-align: center;
						height: 70rpx;
						line-height: 70rpx;
					}

					.txt {
						color: #D42520;
					}
				}
			}
		}
	}

	.addressModel {
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 22;

		.showModel {
			width: 100%;
			height: 700rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 111111;
			background-color: #fff;

			picker-view {
				width: 100%;
				height: 600rpx;
			}

			.item {
				line-height: 34px;
				text-align: center;
			}

			.btns {
				display: flex;

				view {
					width: 50%;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
				}
			}

			.sure {
				border-right: 1rpx solid #f5f5f5;
			}
		}
	}
</style>
