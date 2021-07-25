<!-- 商户入驻---店铺资料 -->
<template>
	<view>
		<!-- 导航栏 -->
		<view class="flexd">
			<view class="left" @click="black()"><image src="../../static/backarrow.png"></image></view>
			<view class="center" v-if="reveal == 1">店铺资料</view>
			<view class="center" v-else>资质认证</view>
			<view></view>
		</view>
		<view class="bgc" v-if="reveal == 1">
			<view class="proposer">
				<view class="radio">
					<view class="area">经营类目</view>
					<view style="width: 520rpx; color: #999999; font-size: 26rpx; text-align: right;" @click="getcategory">
						<text>{{ category }}</text>
						<image src="../../static/back.png" style="width: 15rpx; height: 30rpx; margin-left: 15rpx;"></image>
					</view>
				</view>
				<view class="radio">
					<view class="area">营业时间</view>
					<view style="width: 520rpx; color: #999999; font-size: 26rpx; text-align: right;">
						<!-- @click="gettaking" -->
						<view style="display: flex;justify-content: flex-end;">
							<picker mode="time" @change="bindDateChange" :value="taking" :start="startDate" :end="endDate" class="starts" style="margin-left: 200rpx;">
								{{ taking }}
							</picker>
							——
							<picker mode="time" @change="bindDateChanges" :value="takingend" :start="taking" :end="endDate" class="starts">{{ takingend }}</picker>
						</view>
					</view>
				</view>
				<view class="radio">
					<view class="area">店铺名称</view>
					<input type="text" placeholder="请输入店铺名称" :value="shopaddress" @input="goshop" />
				</view>
				<view class="radio">
					<view class="area">联系人</view>
					<input type="text" placeholder="请输入联系人" :value="linkman" @input="goname" />
				</view>
				<view class="radio">
					<view class="area">联系电话</view>
					<input type="text" placeholder="请输入联系电话" :value="phone" @input="gophone" />
				</view>
				<view class="radio">
					<!-- <citydata @get_reginId="getId" :id='1' :nnn="objs"></citydata> -->
					<view class="area">店铺地址</view>
					<view style="width: 520rpx; color: #999999; font-size: 26rpx; text-align: right;" @click="getstaddress">
						<text>{{ staddress }}</text>
						<image src="../../static/back.png" style="width: 15rpx; height: 30rpx; margin-left: 15rpx;"></image>
					</view>
				</view>
				<view class="inpadd">
					<input type="text" placeholder="请输入详细地址" v-model="address" />
					<view class="btn" @click="getmap">获取坐标</view>
				</view>
				<!-- @click="getChooserLoction" -->
				<view class="map">
					<!--  @click="regionChange" -->
					<map :longitude="longitude" :latitude="latitude" :markers="covers" :enable-zoom="false" :enable-scroll="false"	 scale="16" style="width: 100%; height: 288rpx;" ></map>
					<!-- <iframe src="http://test.jianyunkeji.net/loveUgo/locationPicker.html?search=1&type=1&key=HQKBZ-O3E36-6L3SU-MRXQU-RFFYQ-NZBJ5&referer=uooGou" style='width: 100%;height: 100%;'></iframe> -->
					<!-- <iframe src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=HQKBZ-O3E36-6L3SU-MRXQU-RFFYQ-NZBJ5&referer=uooGou" style='width: 100%;height: 100%;'></iframe> -->
				</view>
				<view class="titles">提示：此处会自动获取当前位置，可以不点击获取坐标</view>
				<!-- 上传图片 -->
				<view class="hang">
					<view class="phopphoto">
						<view>店铺LOGO（1张）</view>
						<view class="txt">
							<view>1.若无logo可上传店铺门头照</view>
							<view>2.建议图片尺寸比例：1*1</view>
						</view>
					</view>
					<image src="../../static/appimg.png" @click="addImg2()" v-if="imgs2 == ''"></image>
					<image :src="cdnUrl + imgs2" @click="addImg2()" v-else></image>
				</view>
				<view class="next" @click="presents()">下一步</view>
				<!--@click="presents()" -->
			</view>
		</view>

		<view class="bgc" v-if="reveal == 2">
			<view class="radio">
				<view class="area">法人姓名</view>
				<input type="text" placeholder="请输入法人真实姓名" :value="linkmans" @input="getname" />
			</view>
			<view class="radio">
				<view class="area">法人身份证号</view>
				<input type="text" placeholder="请输入法人身份证号" :value="identity" style="width: 510rpx;" @input="getidentity" />
			</view>
			<view class="hang" style="border-bottom:2rpx solid #f5f5f5">
				<view class="phopphoto">
					<view>法人代表身份证人像面</view>
					<view class="txt"><view>1、人像面需清晰</view></view>
				</view>
				<image src="../../static/appimg.png" @click="addImg5()" v-if="imgs5 == ''"></image>
				<image :src="cdnUrl + imgs5" @click="addImg5()" v-else></image>
			</view>
			<view class="hang">
				<view class="phopphoto">
					<view>法人代表身份证国徽面</view>
					<view class="txt"><view>1、国徽面需清晰拍出有效期等文字信息</view></view>
				</view>
				<image src="../../static/appimg.png" @click="addImg3()" v-if="imgs3 == ''"></image>
				<image :src="cdnUrl + imgs3" @click="addImg3()" v-else></image>
			</view>
			<view class="time" style="margin-bottom: 20rpx;">
				<view class="left"><view class="permit">身份证有效期</view></view>
				<view class="lang" @click="golang()">
					<image src="../../static/noaffirm.png" v-if="checked == false"></image>
					<image src="../../static/choose.png" v-else></image>
					长期有效
				</view>
				<picker class="shot" mode="date" :start="startData()" @change="bindDateChange1">
					{{ date }}
					<image src="../../static/mores.png"></image>
				</picker>
			</view>
			<view style="width: 100%;height:20rpx;background-color: #f5f5f5;"></view>
			<view class="hang" style="border-bottom:2rpx solid #f5f5f5">
				<view class="phopphoto">
					<view>营业执照照片</view>
					<view class="txt">
						<view>1、需文字清晰、边框完整、露出国徽</view>
						<view>2、拍复印件需加盖印章，可用有效特许证件代替</view>
					</view>
				</view>
				<image src="../../static/appimg.png" @click="addImg4()" v-if="imgs4 == ''"></image>
				<image :src="cdnUrl + imgs4" @click="addImg4()" v-else></image>
			</view>
			<view class="time" style="margin-bottom: 20rpx;">
				<view class="left"><view class="permit">营业执照有效期</view></view>
				<view class="lang" @click="golangs()">
					<image src="../../static/noaffirm.png" v-if="business == false"></image>
					<image src="../../static/choose.png" v-else></image>
					长期有效
				</view>
				<picker class="shot" mode="date" :start="startData()" @change="bindDateChanges2">
					{{ dates }}
					<image src="../../static/mores.png"></image>
				</picker>
			</view>
			<view style="width: 100%;height:20rpx;background-color: #f5f5f5;"></view>
			<view class="addimg" style="margin-bottom: 100rpx;">
				<view class="text">其他相关许可证照片(最多5张）</view>
				<view class="text1" style="margin-bottom: 0;">1、需文字清晰、边框完整、露出国徽</view>
				<view class="text1" style="margin-top: 0;">2、拍复印件需加盖印章，可用有效特许证件代替</view>
				<view v-for="(item, i) in imgs" :key="i" style="display: inline-block;position: relative;">
					<image :src="cdnUrl + item" style="width: 120rpx;height: 120rpx;margin: 0 40rpx 20rpx 0;"></image>
					<image src="../../static/del.png" class="cha" @click="dels(i)"></image>
				</view>
				<image src="../../static/appimg.png" @click="addImg"></image>
			</view>
			<view class="xieyi" style="display: flex; margin-left: 200rpx;">
				<view @click="goagree">
					<image src="../../static/xz.png" v-if="agree == true"></image>
					<image src="../../static/fk_icon.png" v-else></image>
					<text>我已阅读并同意</text>
				</view>
				<text style="color:#F6281B;" @click="getagreement">《开店规则必看》</text>
			</view>
			<view class="butt" @click="getbutt">提交审核</view>
		</view>
		<!-- 联系地址的弹窗 -->
		<view class="addressModel" v-if="visibles" @click="cancel_addresss">
			<view class="showModel">
				<picker-view :value="value" @change="bindChanges">
					<picker-view-column>
						<view class="item" v-for="(item, index) in provinceLists" :key="index">{{ item.region_name }}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in cityLists" :key="index">{{ item.region_name }}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in countryLists" :key="index">{{ item.region_name }}</view>
					</picker-view-column>
				</picker-view>
				<view class="btns">
					<view class="sure" @click="cancel_addresss">取消</view>
					<view class="cancel" @click="sure_addresss">确定</view>
				</view>
			</view>
		</view>
		<!-- 经营类目弹窗 -->
		<view class="tanchuang" v-if="operate">
			<view class="beijing">
				<view class="operats">
					<view class="text">请选择经营类目</view>
					<view class="del" @click="del"><image src="../../static/del.png"></image></view>
					<view class="operxuan">
						<block v-for="(item, id) in operatrs" :key="id">
							<view :class="item.id == operatrsid ? 'xuan' : 'xuan1'" @click="getoperatrs(item.id, item.name)">{{ item.name }}</view>
						</block>
					</view>
					<view class="sure" @click="getsure()">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<!-- <script src="https://mapapi.qq.com/web/mapComponents/geoLocation/v/geolocation.min.js"></script> -->
<!-- <script charset="utf-8" src="https://map.qq.com/api/gljs?v=1.exp&key=HQKBZ-O3E36-6L3SU-MRXQU-RFFYQ-NZBJ5"></script> -->

<script>
import citydata from './citydata';
import { jweixin } from '../../until/jweixin.js';
export default {
	components: {
		citydata
	},
	data() {
		return {
			cdnUrl: '',
			baseUrl: '',
			category: '请选择经营类目', //经营类目
			taking: '开始时间', //营业时间
			takingend: '结束时间',
			open_time: '', //营业时间(集合)
			startDate: '',
			endDate: '',
			linkman: '', //联系人
			phone: '', //联系电话
			shopaddress: '',
			staddress: '请选择店铺地址', //店铺地址
			address: '', //详细地址
			imgs2: '', //店铺logo
			operate: false, //经营类目弹窗
			quantum: false, //经营时间弹窗
			location: false, //地址弹窗
			operatrs: [],
			operatrsid: 1,
			value: [],
			visibles: false, //区域选择框
			province_names: '', //市名
			city_names: '', //城市名
			county_names: '', //区名
			province_ids: '-1',
			city_ids: '-1',
			county_ids: '-1',
			provinceLists: [],
			cityLists: [],
			countryLists: [],
			current_values: [-1, -1, -1],
			lng: '39.214459',
			lat: '113.302524',
			// 下一步
			linkmans: '',
			identity: '',
			imgs5: '', //人面面
			imgs3: '', //国徽面
			imgs4: '', //营业执照
			imgs: [], //五张图片
			date: '请选择到期时间',
			checked: false, //身份证
			business: false, //营业照
			dates: '请选择到期时间',
			agree: true,
			reveal: 1,
			reveals: false,
			card_indate: '', //身份证有限期
			license_indate: '', //营业执照有效期
			objs: {}, //省市回显

			// 审核返现
			supplier_status: '', //审核状态
			// 地图选点
			addmap: '',
			latitude: null,
			longitude: null,
			covers: [
				{
					latitude: null,
					longitude: null,
					iconPath: '../../static/address1.png'
				}
			],
			id: 0,
			clickStatus: false,
			takingStart: 0,
			takingendStart: 0
		};
	},
	methods: {
		// 返回上一页
		//限制身份证有效期选择
		startData() {
			var now = new Date();
			var year = now.getFullYear(); //年
			var month = now.getMonth() + 1; //月
			var day = now.getDate(); //日
			if (String(month).length == 1) {
				month = String('0') + String(month);
			}
			if (String(day).length == 1) {
				day = String('0') + String(day);
			}
			return year + '-' + month + '-' + day;
		},
		//获取省市区id
		getId(obj) {
			this.address = '';
			console.log(obj);
			if (obj.province_name && obj.city_name && obj.county_name) {
				this.staddress = obj.province_name + obj.city_name + obj.county_name;
				this.province_names = obj.province_name;
				this.city_names = obj.city_name;
				this.county_names = obj.county_name;
				this.province_ids = obj.province_id;
				this.city_ids = obj.city_id;
				this.county_ids = obj.county_id;
			}
		},
		// 返回上一页
		black() {
			if (this.reveal == 2) {
				this.reveal = 1;
				this.objs = {
					show: true, //必传
					province_name: this.province_names,
					city_name: this.city_names,
					county_name: this.county_names,
					province_id: this.province_ids,
					city_id: this.city_ids,
					county_id: this.county_ids
				};
			} else {
				uni.navigateTo({
					url: './shopEnter'
				});
			}
		},
		initmap() {
			window.addEventListener(
				'message',
				function(event) {
					// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
					var loc = event.data;
					if (loc && loc.module == 'locationPicker') {
						//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
					}
				},
				false
			);
		},
		// 获取经营类目
		manages() {
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=account/typeFixed'
			}).then(res => {
				if (res.data.success) {
					self.operatrs = res.data.data;
					self.getSupplierStatus();
				}
			});
		},
		getcategory() {
			this.operate = true;
		},
		getoperatrs(e, name) {
			this.operatrsid = e;
			this.category = name;
		},
		getsure() {
			if (this.category == '请选择经营类目') {
				this.category = '蔬菜粮油';
				this.operatrsid = 1;
			}
			this.operate = false;
		},
		del() {
			this.operate = false;
		},
		// 营业时间
		gettaking() {},
		// 开始时间
		bindDateChange(e) {
			this.taking = e.target.value;
		},
		// 结束时间
		bindDateChanges(e) {
			this.takingend = e.target.value;
		},
		// 联系人
		goname(e) {
			this.linkman = e.detail.value;
		},
		// 法人姓名
		getname(e) {
			this.linkmans = e.detail.value;
		},
		// 法人身份证
		getidentity(e) {
			// var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			// if(e.detail.value.length==18){
			// if(reg.test(e.detail.value)){
			this.identity = e.detail.value;
			// 	}else {
			// 		uni.showToast({
			// 			icon:'none',
			// 		    title: '请输入正确的身份证号',
			// 		    duration: 300
			// 		});
			// 	}
			// }
		},
		// 电话
		gophone(e) {
			this.phone = e.detail.value;
		},
		// 店铺地址
		getstaddress() {
			this.visibles = true;
			this.getProvinceLists();
		},
		goshop(e) {
			this.shopaddress = e.detail.value;
		},
		// 区域选择框隐藏
		cancel_addresss() {
			this.visibles = false;
		},
		// 区域选择框点击确定
		sure_addresss() {
			this.visibles = false;
			this.latFlag = false;
			
			this.staddress = this.province_names + this.city_names + this.county_names;
		},
		// 省
		getProvinceLists() {
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=getProvinceList',
				data: {
					token: uni.getStorageSync('token')
				}
			}).then(
				res => {
					if (res.data.success) {
						self.provinceLists = res.data.data.list;
						self.getCityLists(res.data.data.list[0].region_id);
						self.province_ids = self.provinceLists[0].region_id;
						self.province_names = self.provinceLists[0].region_name;
					}
				},
				rej => {
					console.log(rej);
				}
			);
		},
		// 市区
		getCityLists(e) {
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=getCityList',
				data: {
					token: uni.getStorageSync('token'),
					province_id: e
				}
			}).then(
				res => {
					if (res.data.success) {
						self.cityLists = res.data.data.list;
						self.getCountryLists(res.data.data.list[0].region_id);
						self.city_ids = self.cityLists[0].region_id;
						self.city_names = self.cityLists[0].region_name;
					}
				},
				rej => {
					console.log(rej);
				}
			);
		},
		// 乡镇
		getCountryLists(e) {
			let self = this;
			self.request({
				url: 'ugo/api/app.php?c=getCountryList',
				data: {
					token: uni.getStorageSync('token'),
					city_id: e
				}
			}).then(
				res => {
					if (res.data.success) {
						self.countryLists = res.data.data.list;
						self.county_ids = self.countryLists[0].region_id;
						self.county_names = self.countryLists[0].region_name;
					}
				},
				rej => {
					console.log(rej);
				}
			);
		},
		// 中间区域选择
		bindChanges(e) {
			const val = e.detail.value;
			if (val[0] != this.current_values[0]) {
				let a = val[0];
				console.log('选择了省')
			     if(val[0]){
					 this.getCityLists(this.provinceLists[a].region_id);
					 this.current_values.splice(0,1,a)
					 this.province_ids = this.provinceLists[a].region_id;
					 this.province_names = this.provinceLists[a].region_name
				 }
			}
			if (val.length==2 && val[1] != this.current_values[1]) {
				let b = val[1];
				console.log('选择了市')
				if(val[1]){
					this.getCountryLists(this.cityLists[b].region_id);
					this.city_names = this.cityLists[b].region_name;
					this.current_values.splice(1,1,b)
					this.city_ids = this.cityLists[b].region_id;
				}
			}
					 console.log(val.length ==3);
			if ( val.length ==3 && val[2]!= this.current_values[2]) {
				let c = val[2];
				this.county_names = this.countryLists[c].region_name;
				this.current_values.splice(2,1,c)
				this.county_ids = this.countryLists[c].region_id;
			}
		},
		// 获取坐标
		getmap() {
			let self = this;
			if (self.province_ids == '-1') {
				uni.showToast({
					icon: 'none',
					title: '请选择店铺地址'
				});
				return false;
			}
			if (self.address == '') {
				uni.showToast({
					icon: 'none',
					title: '请输入详细地址'
				});
				return false;
			}
			self.clickStatus = true;
			self.request({
				url: 'ugo/api/app.php?c=supplier/addressToLocation',
				data: {
					address: self.staddress + this.address
				}
			}).then(res => {
				if (res.data.message == 'query ok') {
					uni.setStorageSync('latitude', res.data.result.location.lat);
					uni.setStorageSync('longitude', res.data.result.location.lng);
					self.latitude = res.data.result.location.lat;
					self.longitude = res.data.result.location.lng;
					self.mapxq();
				} else {
					// console.log(res);
				}
			});
		},
		// // 地址展示详情
		mapxq() {
			let self = this;
			self.covers = [
				{
					latitude: self.latitude || Number(uni.getStorageSync('latitude')),
					longitude: self.longitude || Number(uni.getStorageSync('longitude')),
					iconPath: ''
				}
			];
			self.latitude = self.latitude || uni.getStorageSync('latitude');
			self.longitude = self.longitude || uni.getStorageSync('longitude');
		},
		// 上传图片
		addImg2() {
			let self = this,
				header = {}; // 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
			uni.chooseImage({
				count: 1,
				success: function(res) {
					uni.showLoading({
						title: '加载中'
					});
					uni.uploadFile({
						url: self.baseUrl + 'ugo/api/mall.php?c=uploadCheckImage&token=' + uni.getStorageSync('token'), //+url地址
						filePath: res.tempFilePaths.join(','), //临时路径 tempFilePaths
						name: 'file',
						method: 'POST',
						success: function(res) {
							uni.hideLoading();
							let data = JSON.parse(res.data);
							if (data.success) {
								uni.showToast({
									title: '上传成功'
								});
								self.imgs2 = data.data;
							} else {
								uni.showToast({
									icon: 'none',
									title: '上传失败，请重试~'
								});
							}
						},
						fail: function(res) {
							// console.log(res)
						}
					});
				}
			});
		},
		// 选择地址
		getChooserLoction(){
				let self=this
				// 打开地图选择位置
				uni.chooseLocation({
				    success: function (res) {
						self.address=res.address
						self.latitude=res.latitude
						self.longitude=res.longitude
						self.covers = [
							{
								latitude: self.latitude,
								longitude: self.longitude,
								iconPath: ''
							}
						];
				    }
				});
		},
		// 下一步
		presents() {
			let self = this;
			console.log(self.taking);
			if (self.category == '请选择经营类目') {
				uni.showToast({
					icon: 'none',
					title: '经营类目不能为空'
				});
			} else if (self.taking == '开始时间') {
				uni.showToast({
					icon: 'none',
					title: '开始时间不能为空'
				});
			} else if (self.takingend == '结束时间') {
				uni.showToast({
					icon: 'none',
					title: '结束时间不能为空'
				});
			} else if (!self.shopaddress) {
				uni.showToast({
					icon: 'none',
					title: '店铺名称不能为空'
				});
			} else if (!self.linkman) {
				uni.showToast({
					icon: 'none',
					title: '联系人不能为空'
				});
			} else if (!/^1[0-9]{10}$/.test(self.phone)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的手机号'
				});
			} else if (self.province_ids == '-1' && self.city_ids == '-1' && self.county_ids == '-1') {
				uni.showToast({
					icon: 'none',
					title: '请选择所在区域'
				});
			} else if (!self.address) {
				uni.showToast({
					icon: 'none',
					title: '详细地址不能为空'
				});
				// }else if(!self.clickStatus){
				// 		uni.showToast({
				// 			icon:'none',
				// 		    title: '请点击获取坐标',
				// 		});
			} else if (self.imgs2.length == '') {
				uni.showToast({
					icon: 'none',
					title: '店铺logo不能为空'
				});
			} else {
				this.reveal = 2;
			}
		},
		addImg5() {
			let self = this,
				header = {}; // 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
			uni.chooseImage({
				count: 1,
				success: function(res) {
					uni.showLoading({
						title: '加载中'
					});
					uni.uploadFile({
						url: self.baseUrl + 'ugo/api/mall.php?c=uploadCheckImage&token=' + uni.getStorageSync('token'), //+url地址
						filePath: res.tempFilePaths.join(','), //临时路径 tempFilePaths
						name: 'file',
						method: 'POST',
						success: function(res) {
							uni.hideLoading();
							let data = JSON.parse(res.data);
							if (data.success) {
								uni.showToast({
									title: '上传成功'
								});
								self.imgs5 = data.data;
							} else {
								uni.showToast({
									icon: 'none',
									title: '上传失败，请重试~'
								});
							}
						},
						fail: function(res) {
							// console.log(res)
						}
					});
				}
			});
		},
		addImg3() {
			let self = this,
				header = {}; // 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
			uni.chooseImage({
				count: 1,
				success: function(res) {
					uni.showLoading({
						title: '加载中'
					});
					uni.uploadFile({
						url: self.baseUrl + 'ugo/api/mall.php?c=uploadCheckImage&token=' + uni.getStorageSync('token'), //+url地址
						filePath: res.tempFilePaths.join(','), //临时路径 tempFilePaths
						name: 'file',
						method: 'POST',
						success: function(res) {
							uni.hideLoading();
							let data = JSON.parse(res.data);
							if (data.success) {
								uni.showToast({
									title: '上传成功'
								});
								self.imgs3 = data.data;
							} else {
								uni.showToast({
									icon: 'none',
									title: '上传失败，请重试~'
								});
							}
						},
						fail: function(res) {
							// console.log(res)
						}
					});
				}
			});
		},
		addImg4() {
			let self = this,
				header = {}; // 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
			uni.chooseImage({
				count: 1,
				success: function(res) {
					uni.showLoading({
						title: '加载中'
					});
					uni.uploadFile({
						url: self.baseUrl + 'ugo/api/mall.php?c=uploadCheckImage&token=' + uni.getStorageSync('token'), //+url地址
						filePath: res.tempFilePaths.join(','), //临时路径 tempFilePaths
						name: 'file',
						method: 'POST',
						success: function(res) {
							uni.hideLoading();
							let data = JSON.parse(res.data);
							if (data.success) {
								uni.showToast({
									title: '上传成功'
								});
								self.imgs4 = data.data;
							} else {
								uni.showToast({
									icon: 'none',
									title: '上传失败，请重试~'
								});
							}
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}
			});
		},
		addImg() {
			let self = this,
				header = {
					// 'Content-Type': 'multipart/form-data'
				};
			uni.chooseImage({
				count: 1,
				success: function(res) {
					uni.showLoading({
						title: '加载中'
					});
					uni.uploadFile({
						url: self.$baseUrl + 'ugo/api/app.php?c=uploadOrderImage',
						filePath: res.tempFilePaths.join(','),
						name: 'file',
						formData: {
							token: uni.getStorageSync('token'),
							device: '0'
						},
						// header: header,
						success: function(res) {
							uni.hideLoading();
							let data = JSON.parse(res.data);
							if (data.success) {
								uni.showToast({
									title: '上传成功'
								});
								// self.imgs=data.data;
								if (self.imgs.length <= 4) {
									self.imgs.push(data.data);
								} else {
									uni.showToast({
										icon: 'none',
										title: '最多上传5张图片'
									});
								}
							} else {
								uni.showToast({
									icon: 'none',
									title: '上传失败，请重试~'
								});
							}
						}
					});
				}
			});
		},
		// 删除图片
		dels(e) {
			for (var i = 0; i < this.imgs.length; i++) {
				if (i == e) {
					this.imgs.splice(i, 1);
				}
			}
		},
		// 长期有效显示状态
		golang(e) {
			if (this.checked == true) {
				this.checked = false;
			} else {
				this.checked = true;
				this.date = '请选择到期时间';
				this.card_indate = 0;
			}
		},
		// 其他时间下拉框
		bindDateChange1(e) {
			this.checked = false;
			this.date = e.target.value;
			this.card_indate = this.date;
			console.log(this.card_indate);
		},
		bindDateChanges2(e) {
			this.business = false;
			this.dates = e.target.value;
			this.license_indate = this.dates;
		},
		golangs() {
			if (this.business == true) {
				this.business = false;
			} else {
				this.business = true;
				this.dates = '请选择到期时间';
				this.license_indate = 0;
			}
		},
		// 是否同意
		goagree() {
			if (this.agree == true) {
				this.agree = false;
			} else {
				this.agree = true;
			}
		},
		// 转跳到协议页面
		getagreement() {
			uni.navigateTo({
				url: './agreement?type=' + '1'
			});
		},
		getbutt() {
			let self = this;
			if (!self.linkmans) {
				uni.showToast({
					icon: 'none',
					title: '法人姓名不能为空'
				});
			} else if (!self.identity) {
				uni.showToast({
					icon: 'none',
					title: '法人身份证号不能为空'
				});
			} else if (self.imgs5.length == '') {
				uni.showToast({
					icon: 'none',
					title: '人像面不能为空'
				});
			} else if (self.imgs3.length == '') {
				uni.showToast({
					icon: 'none',
					title: '国徽面不能为空'
				});
			} else if (!self.checked && self.card_indate == '') {
				uni.showToast({
					icon: 'none',
					title: '请选择身份证有效期'
				});
			} else if (self.imgs4.length == '') {
				uni.showToast({
					icon: 'none',
					title: '营业执照不能为空'
				});
			} else if (self.license_indate == '' && !self.business) {
				uni.showToast({
					icon: 'none',
					title: '请选择营业执照有效期'
				});
			} else if (!self.agree) {
				uni.showToast({
					icon: 'none',
					title: '请勾选开店规则'
				});
			} else {
				self.request({
					method: 'POST',
					url: 'ugo/api/app.php?c=supplier/addEditSupplierInfo',
					data: {
						token: uni.getStorageSync('token'),
						store_class: self.operatrsid, //id
						open_time: self.taking + '-' + self.takingend,
						supplier_name: self.shopaddress,
						frequent_phone: self.phone,
						frequent_name: self.linkman,
						supplier_province: self.province_ids,
						supplier_city: self.city_ids,
						user_province: self.province_ids,
						user_city: self.city_ids,
						supplier_county: self.county_ids,
						supplier_address: self.address,
						supplier_lng: self.longitude,
						supplier_lat: self.latitude,
						supplier_contacts: self.linkmans,
						card_number: self.identity,
						supplier_icon: self.imgs2,
						front_image: self.imgs5,
						reverse_image: self.imgs3,
						license_image: self.imgs4,
						card_indate: self.card_indate,
						license_indate: self.license_indate,
						other_card: self.imgs.join(',')
					}
				}).then(
					res => {
						if (res.data.success) {
							self.holo.toast({
								title: res.data.msg
							});
							setTimeout(function() {
								uni.navigateTo({
									url: './shopEnter'
								});
							}, 1000);
						} else {
							self.holo.toast({
								icon: 'none',
								title: res.data.msg
							});
						}
					},
					rej => {
						console.log(rej);
					}
				);
			}
		},
		// 审核
		getSupplierStatus() {
			let self = this;
			if (uni.getStorageSync('token')) {
				self.request({
					url: 'ugo/api/app.php?c=supplier/getSupplierStatus',
					data: {
						token: uni.getStorageSync('token')
					}
				}).then(
					res => {
						if (res.data.success) {
							self.supplier_status = res.data.data.supplier_status;
							if (self.supplier_status == 3) {
								self.getSupplierInfo();
							}
						}
					},
					rej => {
						console.log(rej);
					}
				);
			}
		},
		getSupplierInfo() {
			let self = this;
			if (uni.getStorageSync('token')) {
				self.request({
					url: 'ugo/api/app.php?c=supplier/getSupplierInfo',
					data: {
						token: uni.getStorageSync('token')
					}
				}).then(
					res => {
						if (res.data.success) {
							self.operatrsid = res.data.data.store_class;
							self.open_time = res.data.data.open_time;
							self.shopaddress = res.data.data.supplier_name;
							self.linkman = res.data.data.frequent_name;
							self.phone = res.data.data.frequent_phone;
							self.address = res.data.data.supplier_address;
							self.lng = res.data.data.supplier_lng;
							self.lat = res.data.data.supplier_lat;
							self.imgs2 = res.data.data.supplier_icon;
							self.linkmans = res.data.data.supplier_contacts;
							self.identity = res.data.data.card_number;
							self.imgs5 = res.data.data.front_image;
							self.imgs3 = res.data.data.reverse_image;
							self.date = res.data.data.card_indate;
							self.imgs4 = res.data.data.license_image;
							self.dates = res.data.data.license_indate;
							self.province_ids = res.data.data.supplier_province;
							self.city_ids = res.data.data.supplier_city;
							self.county_ids = res.data.data.supplier_county;
							self.province_names = res.data.data.province_name;
							self.city_names = res.data.data.city_name;
							self.county_names = res.data.data.county_name;
							self.objs = {
								show: true, //必传
								province_name: res.data.data.province_name,
								city_name: res.data.data.city_name,
								county_name: res.data.data.county_name,
								province_id: res.data.data.supplier_province,
								city_id: res.data.data.supplier_city,
								county_id: res.data.data.supplier_county
							};
							this.staddress = res.data.data.province_name + res.data.data.city_name + res.data.data.county_name;
							// !self.checked && self.card_indate=='' 身份证有效期判断回显
							if (res.data.data.card_indate == 0) {
								self.checked = true;
							} else {
								self.card_indate = res.data.data.card_indate;
							}
							// self.license_indate=='' && !self.business   营业执照有效期判断回显
							if (res.data.data.license_indate == 0) {
								self.business = true;
							} else {
								self.license_indate = res.data.data.license_indate;
							}
							//获取坐标
							self.clickStatus = true;
							self.getmap();
							if (res.data.data.other_card != '') {
								self.imgs = res.data.data.other_card.split(',');
							}
							if (self.operatrsid != '') {
								for (var i = 0; i < self.operatrs.length; i++) {
									if (self.operatrsid == self.operatrs[i].id) {
										self.category = self.operatrs[i].name;
									}
								}
							}

							self.taking = self.open_time.split('-')[0];
							self.takingend = self.open_time.split('-')[1];
							if (self.date == 0) {
								this.checked = true;
								self.date = '请选择到期时间';
							}
							if (self.dates == 0) {
								this.business = true;
								self.dates = '请选择到期时间';
							}
						}
					},
					rej => {
						console.log(rej);
					}
				);
			}
		}
	},
	onLoad() {
		let self = this;
		// if(uni.getStorageSync('longitude') && uni.getStorageSync('longitude')!=''){
		// 	self.mapxq();
		// }else{
		// 	self.longitude = uni.getStorageSync('lat');
		// 	self.latitude = uni.getStorageSync('lng');

		// }
		jweixin.ready(function() {
			jweixin.getLocation({
				type: "gcj02",
				success: function(res) {
					uni.setStorageSync('longitude',res.longitude)
					uni.setStorageSync('latitude',res.latitude)
					self.longitude = res.longitude;
					self.latitude = res.latitude;
					self.mapxq();
				},
				cancel: function(res) {
					alert("您已禁止获取位置信息");
					self.longitude = uni.getStorageSync('lat');
					self.latitude = uni.getStorageSync('lng');
				},
			});
		});
	},
	onShow() {
		let self = this;
		this.cdnUrl = this.$cdnUrl;
		this.baseUrl = this.$baseUrl;
		this.manages();
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
page image {
	width: 100%;
	height: 100%;
}
.flexd {
	position: fixed;
	left: 0;
	top: 0;
	width: 749rpx;
	height: 88rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.16);
	line-height: 88rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	font-family: PingFang SC;
	z-index: 111111;
}

.flexd .left {
	width: 17rpx;
	height: 32rpx;
}

.flexd .center {
	font-size: 36rpx;
	font-weight: bold;
	color: #333333;
}
.bgc {
	background-color: #ffffff;
	margin-top: 88rpx;
}
.starts {
	width: 120rpx;
	text-align: center;
}
.radio {
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* margin-top: 20rpx; */
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	border-bottom: 1rpx solid #f5f5f5;
	padding: 30rpx;
	box-sizing: border-box;
}
.radio image {
	width: 26rpx;
	height: 26rpx;
	vertical-align: middle;
	margin-right: 10rpx;
}
.radio input {
	width: 560rpx;
	height: 30rpx;
	line-height: 30rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	text-align: right;
}
.inpadd {
	padding: 30rpx;
	display: flex;
}
.inpadd input {
	width: 560rpx;
	height: 30rpx;
	line-height: 30rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
}
.btn {
	width: 140rpx;
	height: 50rpx;
	line-height: 50rpx;
	background: #fd635e;
	border-radius: 10rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #ffffff;
	text-align: center;
}
.map {
	width: 100%;
	// height: 500rpx;
	height: 288rpx;
}
.titles {
	padding: 10rpx 0 10rpx 30rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #fd635e;
}
.hang {
	font-size: 26rpx;
	font-family: HiraginoSansGB;
	font-weight: normal;
	color: #222222;
	box-sizing: border-box;
	padding: 35rpx 30rpx;
	display: flex;
	justify-content: space-between;
}
.hang .phopphoto {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.hang .phopphoto .txt1 {
	font-family: PingFang SC;
	font-weight: 400;
}
.hang .phopphoto .txt {
	font-size: 24rpx;
	color: #999999;
	padding-top: 20rpx;
}
.hang image {
	width: 130rpx;
	height: 130rpx;
}
.next {
	margin: 15rpx auto;
	width: 690rpx;
	height: 90rpx;
	background-color: #f6281b;
	border-radius: 45rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
	line-height: 90rpx;
	text-align: center;
}
.tanchuang {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
}
.beijing {
	width: 100%;
	height: 660rpx;
	background: #ffffff;
	border-radius: 30rpx 30rpx 0px 0px;
	position: fixed;
	left: 0;
	bottom: 0;
}
.operats {
	padding: 30rpx;
	position: relative;
}
.operats .text {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	text-align: center;
}
.operats .del image {
	position: absolute;
	right: 30rpx;
	top: 30rpx;
	width: 34rpx;
	height: 34rpx;
}
.operats .operxuan {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 30rpx;
}
.operats .operxuan .xuan {
	width: 216rpx;
	height: 60rpx;
	background: rgba(246, 40, 27, 0.15);
	border-radius: 6rpx;
	line-height: 60rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #f6281b;
	margin-bottom: 30rpx;
}
.operats .operxuan .xuan1 {
	width: 216rpx;
	height: 60rpx;
	background: rgba(153, 153, 153, 0.15);
	border-radius: 6rpx;
	line-height: 60rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	margin-bottom: 30rpx;
}
.operats .sure {
	width: 690rpx;
	height: 90rpx;
	background: #f6281b;
	border-radius: 45rpx;
	line-height: 90rpx;
	text-align: center;
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
	position: absolute;
	left: 30rpx;
	bottom: -140rpx;
}
/* 区域选择框 */
.addressModel {
	width: 100%;
	height: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
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
.addimg {
	background-color: #ffffff;
	padding: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
}
.addimg image {
	width: 120rpx;
	height: 120rpx;
	margin-bottom: 20rpx;
}
.addimg .cha {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	top: -20rpx;
	right: 20rpx;
}
.addimg .text {
	font-size: 26rpx;
	color: #333333;
}
.addimg .text1 {
	font-size: 22rpx;
	color: #999999;
	margin: 30rpx 0;
}
.time {
	background-color: #ffffff;
	padding: 0 30rpx;
	height: 70rpx;
	font-family: PingFang SC;
	font-weight: 400;
	font-size: 26rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.time .lang image {
	width: 36rpx;
	height: 36rpx;
	vertical-align: middle;
	margin-right: 5rpx;
	padding-left: 40rpx;
}
.time .shot image {
	width: 26rpx;
	height: 26rpx;
	vertical-align: middle;
	margin-left: 15rpx;
}
.butt {
	width: 690rpx;
	height: 90rpx;
	background: #fd635e;
	border-radius: 45rpx;
	line-height: 90rpx;
	text-align: center;
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
	margin: 30rpx;
}
.xieyi {
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #000000;
	text-align: center;
	margin-bottom: 20rpx;
	margin-top: 100rpx;
}
.xieyi image {
	width: 32rpx;
	height: 32rpx;
	vertical-align: middle;
	margin-right: 10rpx;
}
</style>
