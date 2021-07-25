<!-- 新增地址 -->
<template>
	<view>
		<view class="hang">
			<text class="txt">收货人</text>
			<input type="text"  placeholder="请输入收货人姓名" :value="value1" @input="getName" />
		</view>
		<view class="hang">
			<text class="txt">手机号码</text>
			<input type="number" placeholder="请输入手机号码" :value="value2" @input="getPhone" />
		</view>
		<!-- 省市区选择组件 -->
		<citydata @get_reginId="getId" :nnn="objs"></citydata>
		<view class="hang" @click="selctAddress">
			<text class="txt">选择地址</text>
			<view style="width: 520rpx; color: #333333; font-size: 26rpx;">
				{{value4 || '请选择地址'}}
			</view>
			<view style="position: absolute;right:30px;color: #333333;">
				>
			</view>
		</view>
		<view class="hang" style="border-bottom: 0rpx;">
			<text class="txt">门牌号</text>
			<input type="text" placeholder="例如:1层1101" v-model='value5'/>
		</view>
		<view style="width: 100%;height: 20rpx; margin-top: 40rpx;background-color: #F5F5F5;"></view>
		<view class="hang1">
			<view>设置默认地址</view>
			<view class="img" @click="defaults()">
				<image src="../../static/wxz.png" v-if="showxz"></image>
				<image src="../../static/yxz.png" v-else></image>
			</view>
		</view>
		<view class="btn" @click="save()">保存</view>
	</view>
</template>

<script>
	import citydata from './citydata'
	export default { 
		data() {
			return {
				flag:true,
				value1: '', //收货人
				value2: '', //手机号
				value3: '', //所在地区
				value4: '', //详细地址
				value5: '', //详细地址
				showxz: false, //是否设置为默认地址
				address_index: '', //收货地址id
				default_address: '0', //地址的状态==>0表示添加收货地址 1表示编辑收货地址
				value: [],
				provinceIndex: '10',
				objs:{},
				lng:'',
				lat:''
			}
		},
		components:{
			citydata
		},
		methods: {
			init() {
				let self = this
				self.request({
					url: "ugo/api/app.php?c=personal/user_address_list",
					data: {
						token: uni.getStorageSync('token'),
						address_id: self.address_index,
					},
				}).then(res => {
					if (res.data.success) {
						for (var i = 0; i < res.data.data.list.length; i++) {
							self.value1 = res.data.data.list[i].contacts
							self.value2 = res.data.data.list[i].phone
							self.value4 = res.data.data.list[i].address.split('-')[0];
							self.value5 = res.data.data.list[i].address.split('-')[1];
							self.province_id = res.data.data.list[i].province_id;
							self.city_id = res.data.data.list[i].province_id;
							self.county_id = res.data.data.list[i].province_id;
							self.province_name = res.data.data.list[i].province_name;
							self.city_name = res.data.data.list[i].city_name;
							self.county_name = res.data.data.list[i].county_name;
							self.objs = {
								show:true,//必传
								province_name:res.data.data.list[i].province_name,
								city_name:res.data.data.list[i].city_name,
								county_name:res.data.data.list[i].county_name,
								province_id:res.data.data.list[i].province_id,
								city_id:res.data.data.list[i].city_id,
								county_id:res.data.data.list[i].county_id
							}
							if (res.data.data.list[i].default_address == 1) {
								self.showxz = true
								self.default_address = 1
							} else {
								self.showxz = false
								self.default_address = 0
							}
						}
					}
				}, rej => {
					console.log(rej);
				})
			},
			// 名字
			getName(e) {
				this.value1 = e.detail.value
			},
			// 手机号
			getPhone(e) {
				this.value2 = e.detail.value
			},
			//选择地址
			selctAddress(){
				if(this.city_name){
					// uni.navigateTo({
					// 	url:'/pages/my/selectAddress?city_name='+this.city_name + '&province_name = '+this.province_name +'&county_name='+this.county_name
					// })
					uni.navigateTo({
						url:'./selectAddress?city_name='+this.city_name + '&province_name = '+this.province_name +'&county_name='+this.county_name
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: '请先选择区域'
					})
				}
			},
			// 是否设置为默认地址
			defaults() {
				this.showxz = !this.showxz
				if (this.showxz) {
					this.default_address = 1
				} else {
					this.default_address = 0
				}
			},
			//获取省市区id
			getId(obj){
				this.province_name = obj.province_name;
				this.city_name = obj.city_name;
				this.county_name = obj.county_name;
				this.province_id = obj.province_id;
				this.city_id = obj.city_id;
				this.county_id = obj.county_id;
			    this.value4 = '';
				this.value5 = '';
			},
			// 保存
			save() {
				let self = this
				if (self.value1 == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入收货人姓名'
					})
				} else if (self.value2 == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码'
					})
				} else if (self.region == '') {
					uni.showToast({
						icon: 'none',
						title: '请选择所在区域'
					})
				} else if (!self.value4) {
					uni.showToast({
						icon: 'none',
						title: '请选择地址'
					})
				}else if(!self.value5){
					uni.showToast({
						icon: 'none',
						title: '请输入门牌号'
					})
				} else {
					if(self.flag==true){
						self.request({
							url: "ugo/api/app.php?c=personal/edit_user_address",
							data: {
								token: uni.getStorageSync('token'),
								lat:self.lat,
								lng:self.lng,
								address_id: self.address_id,
								contacts: self.value1,
								phone: self.value2,
								address: self.value4 + '-' + self.value5,
								default_address: self.default_address,
								province_id: self.province_id,
								province_name: self.province_name,
								city_id: self.city_id,
								city_name: self.city_name,
								county_id: self.county_id,
								county_name: self.county_name,
								address_index: self.address_index
							},
						}).then(res => {
							if (res.data.success) {
								self.flag=false
								uni.showToast({
									title: res.data.msg
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta: 1
									})
								},1000)
							} else {
								uni.showToast({
									title: res.data.msg
								})
								self.flag=true
							}
						}, rej => {
							console.log(rej);
						})
						self.flag=true
					}
				}
			},
		},
		onLoad(option) {
			console.log(88888)
			if (option.id) {
				uni.setNavigationBarTitle({
					title: '编辑地址'
				})
				this.address_index = option.id
				this.address_id = 1
				this.init();
			} else {
				uni.setNavigationBarTitle({
					title: '新增地址'
				})
				this.address_index = ''
				this.address_id = 0
			}
		}
	}
</script>

<style lang="scss">
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

	.hang1 {
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		padding: 50rpx 30rpx;
		box-sizing: border-box;
	}

	.hang1 .img image {
		width: 120rpx;
		height: 50rpx;
	}

	.btn {
		margin: 300rpx 30rpx;
		width: 690rpx;
		height: 90rpx;
		background: #FD494F;
		border-radius: 45rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
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
