<!-- 申请管理页面 -->
<template>
	<view v-if="yincang">
		<view v-if="applyInfo.apply_status==1||applyInfo.apply_status==2">
			<!-- steps步骤条  纵向排列-->
			<uni-steps :options="options" direction="column" :active="0" v-if="applyInfo.apply_status==1"></uni-steps>
			<view v-if="applyInfo.apply_status==2">
				<uni-steps :options="options1" direction="column" :active="2" ></uni-steps>
				<view class="txt">失败原因：{{applyInfo.apply_reason}}<text @click="resubmit()">重新提交</text></view>
			</view>
		</view>
		<view v-if="applyInfo.apply_status==''">
			<view class="txt1">选择申请身份</view>
			<view class="radio">
				<view v-for="(item,i) in identity" :key='i' @click="goidentity(i,item.name)">
					<image :src="i==suoyin?item.icon2:item.icon"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="radio">
				<view class="area">选择区域</view>
				<view style="width: 520rpx; color: #999999; font-size: 26rpx; text-align: right;" @click="addressModel">
					<text  v-if="type=='城市合伙人'">{{regions}}</text>
					<text  v-else>{{region}}</text>
					<image src='../../static/back.png' style="width: 15rpx; height: 30rpx; margin-left: 15rpx;"></image>
				</view>
			</view>
			<view class="radio">
				<view class="area">姓   名:</view>
				<input type="text" placeholder="请输入您的名字" :value="value1" @confirm='confirm' @input='goname'/>
			</view>
			<view class="radio">
				<view class="area">联系电话:</view>
				<input type="number" placeholder="请输入联系电话" :value="value2" @confirm='confirm' @input='gonumber'/>
			</view>
			<view class="radio">
				<view class="area">联系地址</view>
				<view style="width: 520rpx; color: #999999; font-size: 26rpx; text-align: right;" @click="addressModels">
					{{regionsss}}
					<image src='../../static/back.png' style="width: 15rpx; height: 30rpx; margin-left: 15rpx;"></image>
				</view>
			</view>
			<view class="xxdz">
				<input type="text" placeholder="请输入详细地址" :value="value3" @confirm='confirm' @input='goxxdz'/>
			</view>
			<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view>
			<!-- 上传图片 -->
			<view class="hang">
				<view class="phopphoto">
					<view>申请人身份证国徽面</view>
					<view class="txt">
						<view>1、国徽面需清晰、无遮挡、拍出有效日期等文字</view>
					</view>
				</view>
				<image src="../../static/appimg.png" @click="addImg2()" v-if="imgs2==''"></image>
				<image :src="cdnUrl+imgs2" @click="addImg2()" v-else></image>
			</view>
			<view class="hang">
				<view class="phopphoto">
					<view>申请人身份证人像面</view>
					<view class="txt">
						<view>1、正面照需清晰、无遮挡</view>
					</view>
				</view>
				<image src="../../static/appimg.png" @click="addImg3()" v-if="imgs3==''"></image>
				<image :src="cdnUrl+imgs3" @click="addImg3()" v-else></image>
			</view>
			<view class="hang">
				<view class="phopphoto">
					<view>申请人手持身份证件照</view>
					<view class="txt">
						<view>1、正面需清晰拍出人物五官和文字信息</view>
						<view>2、不可自拍、不可自拍身份证</view>
					</view>
				</view>
				<image src="../../static/appimg.png" @click="addImg4()" v-if="imgs4==''"></image>
				<image :src="cdnUrl+imgs4" @click="addImg4()" v-else></image>
			</view>
			<!-- 按钮 -->
			<view class="xieyi" style="display: flex; margin-left: 200rpx;">
				<view @click="goagree">
					<image src="../../static/xz.png" v-if="agree"></image>
					<image src="../../static/fk_icon.png" v-else></image>
					<text>我已阅读并同意</text>
				</view>
				<text style="color:#F6281B;" @click="getagreement">《区域管理协议》</text>
			</view>
			<view class="next" @click="present()">提交</view>
		</view>
		<!-- 区域选择表 -->
		<view class="addressModel" v-if="visible" @click="cancel_address">
			<view class="showModel" >
				<picker-view   :value="value" @change="bindChange">
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
		
		<!-- 联系地址的弹窗 -->
		<view class="addressModel" v-if="visibles" @click="cancel_addresss">
			<view class="showModel" >
				<picker-view :value="value" @change="bindChanges">
				    <picker-view-column>
				        <view class="item" v-for="(item,index) in provinceLists" :key="index">{{item.region_name}}</view>
				    </picker-view-column>
				    <picker-view-column>
				        <view class="item" v-for="(item,index) in cityLists" :key="index">{{item.region_name}}</view>
				    </picker-view-column>
				    <picker-view-column>
				        <view class="item" v-for="(item,index) in countryLists" :key="index">{{item.region_name}}</view>
				    </picker-view-column>
				</picker-view>
				<view class="btns">
					<view class="sure" @click="cancel_addresss">
						取消
					</view>
					<view class="cancel" @click="sure_addresss">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniSteps},
		data() {
			return {
				phone:'',//判断用户是否注册手机号
				yincang:false,//隐藏页面内容
				identity: [
					{ id: 0, icon: '../../static/fk_icon.png', icon2: '../../static/fk_icon2.png', name: '城市合伙人' },
					{ id: 1, icon: '../../static/fk_icon.png', icon2: '../../static/fk_icon2.png', name: '运营合伙人' },
					{ id: 2, icon: '../../static/fk_icon.png', icon2: '../../static/fk_icon2.png', name: '服务中心' }
				],
				suoyin: 0,
				type: '城市合伙人',
				applyInfo:{
					apply_status:""
				},//返现接口存放的数据集合
				// 审核进度变量
				options:[
					{title:'信息提交成功,等待审核',desc:'2019-04-19 17:27'},
				],//格式源
				options1:[
					{title:'信息提交成功,等待审核',desc:'2019-04-19 17:27'},
					{title:'信息审核失败',desc:'2019-04-19 17:27'},
				],				
				active:'0',//当前步骤
				state:'0',//切换审核进度是否成功
				
				value1:'',//姓名
				value2:'',//电话
				value3:'',//详细地址
				imgs2:'',//法人1
				imgs3:'',//法人2
				imgs4:'',//法人3
				agree:false,
				cdnUrl:'',
				baseUrl:'',
				// 选择区域
				visible: false,//区域选择框
				region:'省市区县等', //所在区域
				regions:'省市区县等', //城市合伙人所在区域
				province_name:'',//市名
				city_name:'',//城市名
				county_name:'',//区名
				province_id:'',
				city_id:'',
				county_id:'',
				provinceList:[],
				cityList:[],
				countryList:[],
				value:[],
				current_value:[0,0,0],
				// 联系地址
				visibles: false,//区域选择框
				province_names:'',//市名
				city_names:'',//城市名
				county_names:'',//区名
				province_ids:'',
				city_ids:'',
				county_ids:'',
				provinceLists:[],
				cityLists:[],
				countryLists:[],
				current_values:[1,1,1],
				regionsss:'请选择您的联系地址',//联系地址
			}
		},
		onShow(){
		   this.init()
		},
		methods: {
			// 审核进度和返现内容
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=rank_apply/getApplyInfo',
					data:{
						token:uni.getStorageSync('token'),
					},
				}).then(res=>{
					if(res.data.success){
						self.yincang=true
						self.applyInfo=res.data.data
						self.applyInfo.apply_status=res.data.data.apply_status
						if(self.applyInfo.apply_status==1){
							self.options[0].desc=self.holo.formatTime(self.applyInfo.add_time*1000)
						}
						if(self.applyInfo.apply_status==2){
							self.options1[0].desc=self.holo.formatTime(self.applyInfo.add_time*1000)
							self.options1[1].desc=self.holo.formatTime(self.applyInfo.update_time*1000)
						}
						// // 做测试==>要删掉
						// if(self.applyInfo.apply_status==3){
						// 	self.applyInfo.apply_status=''
						// }//结束
						
						self.value1=res.data.data.apply_user_name
						self.value2=res.data.data.apply_user_phone
						self.value3=res.data.data.user_address
						self.imgs2=res.data.data.user_pic_back
						self.imgs3=res.data.data.user_pic
						self.imgs4=res.data.data.user_and_pic
						// 地址
						self.province_id=res.data.data.apply_province
						self.city_id=res.data.data.apply_city
						self.county_id=res.data.data.apply_county
						self.province_ids=res.data.data.user_province
						self.city_ids=res.data.data.user_city
						self.county_ids=res.data.data.user_county
						if(self.province_id!=''){
							self.province()
						}
						if(self.province_ids!=''){
							self.provinces()
						}
						if(res.data.data.apply_rank){
							if(res.data.data.apply_rank==4){
								self.suoyin=0
							}else if(res.data.data.apply_rank==3){
								self.suoyin=1
							}else if(res.data.data.apply_rank==2){
								self.suoyin=2
							}else{}
						}
					}else{
						self.yincang=true
						self.applyInfo.apply_status=''
						if(self.applyInfo.apply_status=''){
							self.yincang=true
						}
						self.request({
							url:'ugo/api/mall.php?c=get_user_info',
							data:{
								token:uni.getStorageSync('token')
							}
						}).then(res=>{
							if(res.data.success){
								self.phone=res.data.data.userinfo.phone
								if(self.phone==''){
									self.yincang=false
									uni.showModal({
										title: '提示',
										content: '尚未绑定手机号，请先绑定',
										cancelColor:'#999999',
										confirmText:'去绑定',
										confirmColor:'#FC4950',
										success: function success(res) {
											if (res.confirm) {
												uni.navigateTo({
													url:'./boundPhoe'
												})
											}else{
												uni.navigateBack({
													delta:1
												})
											}
										}
									});
								}
							}
						},rej=>{
							console.log(rej);
						})
					}
				},rej=>{
					console.log(rej)
				})
			},
			// 返现地址
			// 省
			province(){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getProvinceList",
					data:{
						token:uni.getStorageSync('token'),
					},
				}).then(res=>{
					if(res.data.success){
						self.provinceList=res.data.data.list
						for(var i=0; i<self.provinceList.length;i++){
							if(self.provinceList[i].region_id==self.province_id){
								self.city(res.data.data.list[i].region_id)
								self.province_name = self.provinceList[i].region_name
							}
						}
						console.log(self.province_name);
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 市区
			city(e){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getCityList",
					data:{
						token:uni.getStorageSync('token'),
						province_id:e,
					},
				}).then(res=>{
					if(res.data.success){
						self.cityList=res.data.data.list
						for(var i=0; i<self.cityList.length;i++){
							if(self.cityList[i].region_id==self.city_id)
								if(self.suoyin!=0||self.type!='城市合伙人'){
									self.county(res.data.data.list[i].region_id)
								}
							self.city_name = self.cityList[i].region_name
						}
						if(self.suoyin==0||self.type=='城市合伙人'){
							this.regions=this.province_name+','+this.city_name
						}
					}
				},rej=>{
					console.log(rej);
				}) 
			},
			// 乡镇
			county(e){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getCountryList",
					data:{
						token:uni.getStorageSync('token'),
						city_id:e,
					},
				}).then(res=>{
						if(res.data.success){
							self.countryList=res.data.data.list
							for(var i=0; i<self.countryList.length;i++){
								if(self.countryList[i].region_id==self.county_id){
									self.county_name = self.countryList[i].region_name
								}
							}
							if(self.suoyin!=0||self.type!='城市合伙人'){
								this.region=this.province_name+','+this.city_name+','+this.county_name
							}
						}
				},rej=>{
					console.log(rej);
				})
			},
			// 联系地址
			// 省
			provinces(){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getProvinceList",
					data:{
						token:uni.getStorageSync('token'),
					},
				}).then(res=>{
					if(res.data.success){
						self.provinceLists=res.data.data.list
						for(var i=0; i<self.provinceLists.length;i++){
							if(self.provinceLists[i].region_id==self.province_ids){
								self.citys(res.data.data.list[i].region_id)
								self.province_names = self.provinceLists[i].region_name
							}
						}
						console.log(self.province_names);
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 市区
			citys(e){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getCityList",
					data:{
						token:uni.getStorageSync('token'),
						province_id:e,
					},
				}).then(res=>{
					if(res.data.success){
						self.cityLists=res.data.data.list
						for(var i=0; i<self.cityLists.length;i++){
							if(self.cityLists[i].region_id == self.city_ids){
								self.countys(res.data.data.list[i].region_id)
								self.city_names = self.cityLists[i].region_name
							}
						}
						console.log(self.city_names);
					}
				},rej=>{
					console.log(rej);
				}) 
			},
			// 乡镇
			countys(e){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getCountryList",
					data:{
						token:uni.getStorageSync('token'),
						city_id:e,
					},
				}).then(res=>{
						if(res.data.success){
							self.countryLists=res.data.data.list
						for(var i=0; i<self.countryLists.length;i++){
							if(self.county_ids == self.countryLists[i].region_id){
								self.county_names = self.countryLists[0].region_name
							}
						}
						this.regionsss=this.province_names+','+this.city_names+','+this.county_names
						}
				},rej=>{
					console.log(rej);
				})
			},
			// 身份选择
			goidentity(i, name) {
				(this.suoyin = i), (this.type = name);
			},	
			// 重新提交文字==>变回到门店申请页面
			resubmit(){
				this.applyInfo.apply_status=''
			},
			// 获取用户名
			goname(e){
				this.value1=e.detail.value
			},
			// 获取用户电话
			gonumber(e){
				this.value2=e.detail.value
			},
			// 获取用户详细地址
			goxxdz(e){
				this.value3=e.detail.value
			},
			// 上传图片
			addImg2(){
				let self = this,
				header = {};// 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
				uni.chooseImage({
				  count: 1,
				  success: function(res) {
					  uni.showLoading({
					  	title:'加载中'
					  })
					uni.uploadFile({
					  url: self.baseUrl+'ugo/api/mall.php?c=uploadCheckImage&token='+uni.getStorageSync('token'),//+url地址
					  filePath: res.tempFilePaths.join(','),//临时路径 tempFilePaths
					  name: 'file',
					  method:'POST',
					  success: function(res) {
					  	uni.hideLoading()
					  	let data = JSON.parse(res.data);
					  	if (data.success) {
					  		uni.showToast({
					  			title: '上传成功'
					  		});
					  		self.imgs2=data.data;
					  	} else {
					  		uni.showToast({
					  			icon: 'none',
					  			title: '上传失败，请重试~'
					  		});
					  	}
					  },fail:function(res){
					  	console.log(res)
					  }
					})
				  }
				})
			},
			addImg3(){
				let self = this,
				header = { };// 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
				uni.chooseImage({
				  count: 1,
				  success: function(res) {
					  uni.showLoading({
					  	title:'加载中'
					  })
					uni.uploadFile({
					  url: self.baseUrl+'ugo/api/mall.php?c=uploadCheckImage&token='+uni.getStorageSync('token'),//+url地址
					  filePath: res.tempFilePaths.join(','),//临时路径 tempFilePaths
					  name: 'file',
					  method:'POST',
					 //  formData: {
						// identity_img:res.tempFilePaths.join(',')
					 //  },
					  // header: header,
					  success: function(res) {
					  	uni.hideLoading()
					  	let data = JSON.parse(res.data);
					  	if (data.success) {
					  		uni.showToast({
					  			title: '上传成功'
					  		});
					  		self.imgs3=data.data;
					  	} else {
					  		uni.showToast({
					  			icon: 'none',
					  			title: '上传失败，请重试~'
					  		});
					  	}
					  },fail:function(res){
					  	console.log(res)
					  }
					})
				  }
				})
			},
			addImg4(){
				let self = this,
				header = {
				  // 'Content-Type': 'multipart/form-data'// 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
				};
				uni.chooseImage({
				  count: 1,
				  success: function(res) {
					  uni.showLoading({
					  	title:'加载中'
					  })
					uni.uploadFile({
					  url: self.baseUrl+'ugo/api/mall.php?c=uploadCheckImage&token='+uni.getStorageSync('token'),//+url地址
					  filePath: res.tempFilePaths.join(','),//临时路径 tempFilePaths
					  name: 'file',
					  method:'POST',
					 //  formData: {
						// identity_img:res.tempFilePaths.join(',')
					 //  },
					 //  header: header,
					  success: function(res) {
					  	uni.hideLoading()
					  	let data = JSON.parse(res.data);
					  	if (data.success) {
					  		uni.showToast({
					  			title: '上传成功'
					  		});
					  		self.imgs4=data.data;
					  	} else {
					  		uni.showToast({
					  			icon: 'none',
					  			title: '上传失败，请重试~'
					  		});
					  	}
					  },fail:function(res){
					  	console.log(res)
					  }
					})
				  }
				})
			},
			// 所在区域
			addressModel(){
				this.visible=!this.visible
				this.getProvinceList()
			},
			// 省
			getProvinceList(){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getProvinceList",
					data:{
						token:uni.getStorageSync('token'),
					},
				}).then(res=>{
					if(res.data.success){
						self.provinceList=res.data.data.list
						self.getCityList(res.data.data.list[0].region_id)
						self.province_id = self.provinceList[0].region_id
						self.province_name = self.provinceList[0].region_name
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 市区
			getCityList(e){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getCityList",
					data:{
						token:uni.getStorageSync('token'),
						province_id:e,
					},
				}).then(res=>{
					if(res.data.success){
						self.cityList=res.data.data.list
						if(self.suoyin!=0||self.type!='城市合伙人'){
							self.getCountryList(res.data.data.list[0].region_id)
						}
						// self.getCountryList(res.data.data.list[0].region_id)
						self.city_id = self.cityList[0].region_id
						self.city_name = self.cityList[0].region_name
					}
				},rej=>{
					console.log(rej);
				}) 
			},
			// 乡镇
			getCountryList(e){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getCountryList",
					data:{
						token:uni.getStorageSync('token'),
						city_id:e,
					},
				}).then(res=>{
						if(res.data.success){
							self.countryList=res.data.data.list
							self.county_id = self.countryList[0].region_id
							self.county_name = self.countryList[0].region_name
						}
				},rej=>{
					console.log(rej);
				})
			},
			// 中间区域选择
			bindChange(e){
				const val = e.detail.value
				if (val[0] != this.current_value[0]) {
					let a = val[0];
					if(val[0]){
						 this.getCityList(this.provinceList[a].region_id);
						 this.current_value.splice(0,1,a)
						 this.province_id = this.provinceList[a].region_id;
						 this.province_name = this.provinceList[a].region_name
					}
				}
				if (val.length==2 && val[1] != this.current_values[1]) {
					let b = val[1];
					if(val[1]){
						if(this.suoyin!=0||this.type!='城市合伙人'){
							this.getCountryList(this.cityList[b].region_id)
						}
						// this.getCountryList(this.cityLists[b].region_id);
						this.city_name = this.cityList[b].region_name;
						this.current_value.splice(1,1,b)
						this.city_id = this.cityList[b].region_id;
					}
				}
				if ( val.length ==3 && val[2]!= this.current_value[2]) {
						let c = val[2];
						this.county_name = this.countryList[c].region_name;
						this.current_value.splice(2,1,c)
						this.county_id = this.countryList[c].region_id;
				}
			},
			// 区域选择框隐藏
			cancel_address(){
				this.visible=false
			},
			// 区域选择框点击确定
			sure_address(){
				this.visible=false
				this.region=this.province_name+','+this.city_name+','+this.county_name
				this.regions=this.province_name+','+this.city_name
				this.getrankApply()
			},
			// 验证是否可以申请
			getrankApply(){
				let self = this
				let apply_rank=''
				if(self.suoyin==0){
					apply_rank=4
				}else if(self.suoyin==1){
					apply_rank=3
				}else{
					apply_rank=2
				}
				self.request({
					url:"ugo/api/app.php?c=rank_apply/checkRankApply",
					data:{
						apply_rank:apply_rank,
						apply_province:self.province_id,
						apply_city:self.city_id,
						apply_county:self.county_id,
					},
				}).then(res=>{
					if(res.data.success){
					}else{
						self.holo.toast({
							icon:'none',
							title:res.data.msg
						})
						setTimeout(function() {
							self.holo.toast({
								icon:'none',
								title:'请重新选择'
							})
							self.regions=''
							self.region=''
						}, 1000);
					}
				},rej=>{
					console.log(rej);
				})
			},
			
			// 联系地址
			// 所在区域
			addressModels(){
				this.visibles=!this.visibles
				this.getProvinceLists()
			},
			// 省
			getProvinceLists(){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getProvinceList",
					data:{
						token:uni.getStorageSync('token'),
					},
				}).then(res=>{
					if(res.data.success){
						self.provinceLists=res.data.data.list
						self.getCityLists(res.data.data.list[0].region_id)
						self.province_ids = self.provinceLists[0].region_id
						self.province_names = self.provinceLists[0].region_name
					}
				},rej=>{
					console.log(rej);
				})
			},
			// 市区
			getCityLists(e){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getCityList",
					data:{
						token:uni.getStorageSync('token'),
						province_id:e,
					},
				}).then(res=>{
					if(res.data.success){
						self.cityLists=res.data.data.list
						self.getCountryLists(res.data.data.list[0].region_id)
						self.city_ids = self.cityLists[0].region_id
						self.city_names = self.cityLists[0].region_name
					}
				},rej=>{
					console.log(rej);
				}) 
			},
			// 乡镇
			getCountryLists(e){
				let self = this
				self.request({
					url:"ugo/api/app.php?c=getCountryList",
					data:{
						token:uni.getStorageSync('token'),
						city_id:e,
					},
				}).then(res=>{
						if(res.data.success){
							self.countryLists=res.data.data.list
							self.county_ids = self.countryLists[0].region_id
							self.county_names = self.countryLists[0].region_name
						}
				},rej=>{
					console.log(rej);
				})
			},
			// 中间区域选择
			bindChanges(e){
				const val = e.detail.value;
				if (val[0] != this.current_values[0]) {
					let a = val[0];
					if(val[0]){
						 this.getCityLists(this.provinceLists[a].region_id);
						 this.current_values.splice(0,1,a)
						 this.province_ids = this.provinceLists[a].region_id;
						 this.province_names = this.provinceLists[a].region_name
					}
				}
				if (val.length==2 && val[1] != this.current_values[1]) {
					let b = val[1];
					if(val[1]){
						this.getCountryLists(this.cityLists[b].region_id);
						this.city_names = this.cityLists[b].region_name;
						this.current_values.splice(1,1,b)
						this.city_ids = this.cityLists[b].region_id;
					}
				}
				if ( val.length ==3 && val[2]!= this.current_values[2]) {
						let c = val[2];
						this.county_names = this.countryLists[c].region_name;
						this.current_values.splice(2,1,c)
						this.county_ids = this.countryLists[c].region_id;
				}
				// if(val[0]!=this.current_values[0]){
				// 	let a = val[0]
				// 	this.getCityLists(this.provinceLists[a].region_id)
				// 	this.current_values[0]=a
				// 	this.province_ids = this.provinceLists[a].region_id
				// 	this.province_names = this.provinceLists[a].region_name
				// }
				// if(val[1]!=this.current_values[1] && val[0]==this.current_values[0]){
				// 	let b = val[1]
				// 	this.getCountryLists(this.cityLists[b].region_id)
				// 	this.current_values[1]=b
				// 	this.city_ids = this.cityLists[b].region_id
				// 	this.city_names = this.cityLists[b].region_name
				// }if(val[1]==this.current_values[1] && val[0]==this.current_values[0] && val[2]!=this.current_values[2]){
				// 	let c = val[2]
				// 	this.current_values[2]=c
				// 	this.county_ids = this.countryLists[c].region_id
				// 	this.county_names = this.countryLists[c].region_name
				// }
			},
			// 区域选择框隐藏
			cancel_addresss(){
				this.visibles=false
			},
			// 区域选择框点击确定
			sure_addresss(){
				this.visibles=false
				this.regionsss=this.province_names+','+this.city_names+','+this.county_names
			},
			// 是否同意
			goagree(){
				if(this.agree==true){
					this.agree=false
				}else {
					this.agree=true
				}
			},
			// 转跳到协议页面
			getagreement(){
				uni.navigateTo({
					url:'./agreement?type=0'
				})
			},
			// 提交
			present(){
				let self=this
				let apply_rank=''
				if(self.suoyin==0){
					apply_rank=4
				}else if(self.suoyin==1){
					apply_rank=3
				}else{
					apply_rank=2
				}
				if (!self.value1) {
					uni.showToast({
						icon:'none',
					    title: '姓名不能为空',
					    duration: 1000
					});
				}else if(!(/^1[0-9]{10}$/.test(self.value2))){
					uni.showToast({
						icon:'none',
					    title: '请输入正确的手机号',
					    duration: 1000
					});
				}else if(!self.value3){
						uni.showToast({
							icon:'none',
						    title: '详细地址不能为空',
						    duration: 1000
						});
				}else if(self.imgs2.length==''){
					uni.showToast({
						icon:'none',
					    title: '法人身份证头像面不能为空',
					    duration: 1000
					});
				}else if(self.imgs3.length==''){
					uni.showToast({
						icon:'none',
					    title: '法人身份证国徽面不能为空',
					    duration: 1000
					});
				}else if(self.imgs4.length==''){
					uni.showToast({
						icon:'none',
					    title: '法人代表手持身份证件照不能为空',
					    duration: 1000
					});
				}else if(!self.agree){
					self.holo.toast({
							icon:'none',
						    title: '请勾选阅读并同意选项',
						    duration: 1000
					});
				} else{
					self.request({
						url:'ugo/api/app.php?c=rank_apply/addEditRankApply',
						data:{
							token:uni.getStorageSync('token'),
							// apply_index:'',
							apply_rank:	apply_rank,
							apply_province:self.province_id,
							apply_city:self.city_id,
							apply_county:self.county_id,
							apply_user_name:self.value1,
							apply_user_phone:self.value2,
							user_address:self.value3,
							user_province:self.province_ids,
							user_city:self.city_ids,
							user_county:self.county_ids,
							user_pic:self.imgs2,
							user_pic_back:self.imgs3,
							user_and_pic:self.imgs4,
						}
					}).then(res=>{
						if(res.data.success){
							self.holo.toast({
								title:res.data.msg
							})
							setTimeout(function() {
								uni.switchTab({
									url:'./my'
								})
							}, 1000);
						}else {
							self.holo.toast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						console.log(rej);
					})
				}
			},
		},
		onLoad() {
			this.cdnUrl=this.$cdnUrl
			this.baseUrl=this.$baseUrl
		}
	}
</script>

<style lang="scss">

.txt1 {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #222222;
	padding: 30rpx 30rpx 0;
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
	border-bottom: 1rpx solid #F5F5F5;
	padding: 30rpx;
	box-sizing: border-box;	
	.area{
		width: 130rpx;
	}
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
.xxdz {
	padding: 30rpx;
	margin-left: 170rpx;
}
.xxdz input {
	width: 560rpx;
	height: 30rpx;
	line-height: 30rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
}
.hang {
	font-size: 26rpx;
	font-family: HiraginoSansGB;
	font-weight: normal;
	color: #222222;
	box-sizing: border-box;
	margin-bottom: 150rpx;
	border-top: 1rpx solid #F5F5F5;
	padding: 35rpx 30rpx;
	margin: -1rpx;
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
.next {
	margin: 15rpx auto;
	width: 690rpx;
	height: 90rpx;
	background-color: #F6281B;
	border-radius: 45rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 90rpx;
	text-align: center;
}
/* 区域选择框 */
.addressModel{
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: rgba(0,0,0,.5);
		z-index: 22;
		.showModel {
			width: 100%;
			height: 700rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 111111;
			background-color: #fff;
			picker-view{
				width: 100%;
				height: 600rpx;
			}
			.item {
				line-height: 34px;
				text-align: center;
			}
			.btns{
				display: flex;
				view{
					width: 50%;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
				}
			}
			.sure{
				border-right: 1rpx solid #f5f5f5;
			}
		}
	}
// 审核进度
.txt {
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 500;
	margin: -5rpx 50rpx;
	color: #333333;
}
.txt text {
	color: #FC4950;
	margin-left: 20rpx;
}
</style>
