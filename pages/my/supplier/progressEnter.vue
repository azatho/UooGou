<!-- 商户入驻 -->
<template>
	<view v-if="displys">
		<!-- 导航栏 -->
		<view class="flexd">
			<view class="left" @click="black()">
				<image src="../../../static/backarrow.png"></image>
			</view>
			<view class="center" v-if="rank==1">供应商管理中心</view>
			<view class="center" v-if="rank==2">审核进度</view>
			<view></view>
			<view class="center" v-if="rank==3">供应商管理中心</view>
		</view>
		<view class="bgcImg" v-if="rank==1">
			<view class="bgc2">
				
				<image src="../../../static/BussinessIn.png" mode=""></image>
			</view>
			<view class="bgc3">
				<view class="bgc4">
					<view class="yuan"></view>手机端入驻流程<view class="yuan"></view>
				</view>
				<view class="one">
					<view class="left">01</view>
					<view class="right">
						<view>入驻前请先阅读开店须知，确认自己符合个人开店的相关规定</view>
					</view>
				</view>
				<view class="img2">
					<image src="../../../static/enter5.png"></image>
				</view>
				<view class="one">
					<view class="left">02</view>
					<view class="right">
						<view>填写相关店铺、法人证件资料等信息，提交审核</view>
					</view>
				</view>
				<view class="img2">
					<image src="../../../static/enter5.png"></image>
				</view>
				<view class="one">
					<view class="left">03</view>
					<view class="right">
						<view>我们将会在1-5个工作日内完成审核并通知您。</view>
					</view>
				</view>
			</view>
			<view class="bgc3">
				<view class="bgc4">
					<view class="yuan"></view>电脑端入驻流程<view class="yuan"></view>
				</view>
				<view class="one">
					<view class="left">01</view>
					<view class="right">
						<view>打开网址</view>
						<view style="word-break:break-all">{{wangzhi}}
							<image src="../../../static/enter6.png" class="img1" @click="fz(wangzhi)"></image>
						</view>
					</view>
				</view>
				<view class="img2">
					<image src="../../../static/enter5.png"></image>
				</view>
				<view class="one">
					<view class="left">02</view>
					<view class="right">
						<view>点击“供应商入驻”，进行手机号验证</view>
					</view>
				</view>
				<view class="img2">
					<image src="../../../static/enter5.png"></image>
				</view>
				<view class="one">
					<view class="left">03</view>
					<view class="right">
						<view>根据提示信息填写商家的资料，填写后请等待1-5个工作日平台审核</view>
					</view>
				</view>
			</view>
			<view class="bgc5">
				<view class="bgc4">
					<view class="yuan"></view>供应商开店须知<view class="yuan"></view>
				</view>
				<view class="text">
					<view>1.我没有实体店，可以开店吗？</view>
					<view>答：不可以，入驻此平台前，需要有线下实体店铺。</view>
					<view>2.我在平台已经开了个店了，我用别人的身份证再开一个店可以吗？</view>
					<view>答：不可以。未经平台同意，将本人账号提供给他人作开店使用，否则由此导致相关争议、诉讼及因店铺经营中的违法违规行为导致一切人身、财产权益损害，均由本人自行承担全部民事、行政及刑事责任。</view>
					<view>3.我可以把店铺转租给其他人吗?</view>
					<view>答：不可以。未经平台同意，将本人账号提供给他人作开店使用，否则由此导致相关争议、诉讼及因店铺经营中的违法违规行为导致一切人身、财产权益损害，均由本人自行承担全部民事、行政及刑事责任。</view>
					<view>4.我可以开多个店吗?</view>
					<view>答：不可以。一张身份证（一张营业执照）只能开一个店铺。开店后请保持营业执照存续状态，不得注销；如若发现营业执照被注销、吊销，平台将会对店铺做出永久关闭的处置。</view>
					<view>5.我已经开过店，现在想要注销原来的店铺重新开店，可以吗?</view>
					<view>答：不可以，平台暂时不提供注销店铺的服务。用户一但成功开店就无法再用身份证（营业执照）另开一家店铺。</view>
				</view>
			</view>
			<view class="btn" @click="getenter()">
				<image src="../../../static/btn1.png"></image>
			</view>
			<!-- <view @click="getenter()">立即入住</view> -->
		</view>
		<view class="audit" v-if="rank==2">
			<!-- 审核参考applyposition.vue页面 -->
			<view v-if="applyInfo.apply_status==1||applyInfo.apply_status==3">
				<!-- steps步骤条  纵向排列-->
				<uni-steps :options="options" direction="column" :active="0" v-if="applyInfo.apply_status==1" active-color='#FF862B'></uni-steps>
				<view v-if="applyInfo.apply_status==3">
					<uni-steps :options="options1" direction="column" :active="2" active-color='#FF862B'></uni-steps>
					<view class="txt">失败原因：{{applyInfo.refuse_reason}}<text @click="resubmit()">重新提交</text></view>
				</view>
			</view>
		</view>
		<view class="adminsistration" v-if="rank==3">
			<view class="shopadmin">
				<view class="img1">
					<image :src="cdnUrl+SupplierCenter.supplier_icon"></image>
				</view>
				<view class="lables">
					<view class="text">{{SupplierCenter.supplier_name}}</view>
					<view>营业时间：{{SupplierCenter.open_time}}</view>
				</view>
				<view class="pressbutt">
					<view v-if="business==true&&SupplierCenter.is_open==1" @click="getbusiness(SupplierCenter.is_open)" class="one">
						<image src="../../../static/wxz1.png"></image>
						<text>营业中</text>
					</view>
					<view v-else  @click="getbusiness(SupplierCenter.is_open)" class="two">
						<image src="../../../static/yxz.png"></image>
						<text>已打烊</text>
					</view>
				</view>
			</view>
	<!-- 		<view class="money">
				<view class="left" @click="getwithdraw">
					<view class="one">{{SupplierCenter.cash/100||0}}</view>
					<view>账户可提现余额(元)</view>
				</view>
				<view style="width: 1px; height: 170rpx;background-color: #FFFFFF;margin-top: -30rpx;"></view>
				<view class="left" @click="getaccount">
					<view class="one">{{SupplierCenter.virtual_cash/100||0}}</view>
					<view>账户待结算余额(元)</view>
				</view>
			</view> -->
			<!-- 黄色的金额 -->
			<view class="yellowPrice">
				<view class="priceLiset">
					<view class="priceItem " @click="tomyCash">
						<view class="">
							<view class="title">
								可提现余额（元）
							</view>
							<view class="price">
								
								{{$returnFloat(SupplierCenter.cash)}}
								
								
							</view>
						</view>
						<view class="icon">
							>
						</view>
					</view>
					<view class="border">
							
					</view>
					<view class="priceItem" @click="tomyCash1"> 
						<view class="">
							<view class="title">
								待结算金额（元）
							</view>
							<view class="price">
								{{$returnFloat(SupplierCenter.virtual_cash)}}
							</view>
						</view>
						<view class="icon">
							>
						</view>
					</view>
				</view>
			</view>
			<view class="statistics">
				<view class="shang">营收统计</view>
				<view class="xia">
					<view class="oen">
						<view class="num" style="margin-top: 10rpx;">{{$returnFloat(SupplierCenter.today_money)}}</view>
						<view>今日营收</view>
					</view>
					<view class="oen">
						<view class="num" style="margin-top: 10rpx;">{{$returnFloat(SupplierCenter.month_money)}}</view>
						<view>本月营收</view>
					</view>
					<view class="oen">
						<view class="num" style="margin-top: 10rpx;">{{$returnFloat(SupplierCenter.all_money)}}</view>
						<view>累计营收</view>
					</view>
				</view>
			</view>
			<!-- 订单管理 -->
			<view class="orderBox">
				<view class="orderBoxTitle">
					<view class="">订单管理</view>
					<view class="" @click="lookAll(0)">查看全部></view>
				</view>
				<view class="orderBoxBottom">
					<view style="display: flex;flex-direction: column;align-items: center;" @click="lookAll(2)">
						<image src="../../../static/gyssort1.png" mode="" style="width:70rpx;height:70rpx;margin-top: 10rpx;"></image>
						<view style="margin-top:19rpx;">待发货</view>
					</view>
					<view style="display: flex;flex-direction: column;align-items: center;" @click="lookAll(3)">
						<image src="../../../static/gyssort2.png" mode="" style="width:70rpx;height:70rpx;margin-top: 10rpx;"></image>
						<view style="margin-top:19rpx;">待收货</view>
					</view>
					<view style="display: flex;flex-direction: column;align-items: center;" @click="lookAll(4)">
						<image src="../../../static/gyssort3.png" mode="" style="width:70rpx;height:70rpx;margin-top: 10rpx;"></image>
						<view style="margin-top:19rpx;">已完成</view>
					</view>
					<view style="display: flex;flex-direction: column;align-items: center;" @click="lookAll(5)">
						<image src="../../../static/gyssort4.png" mode="" style="width:70rpx;height:70rpx;margin-top: 10rpx;"></image>
						<view style="margin-top:19rpx;">售后</view>
					</view>
				</view>
			</view>
			<view class="information">
				<view class="shang">店铺数据</view>
				<view class="xia">
					<view class="right">
						<view class="left">商品</view>
						<view class="oen">
							<view class="num">{{SupplierCenter.all_goods||0}}</view>
							<view>商品总数</view>
						</view>
						<view class="oen">
							<view class="num">{{SupplierCenter.on_goods||0}}</view>
							<view>已上架</view>
						</view>
						<view class="oen">
							<view class="num">{{SupplierCenter.check_goods||0}}</view>
							<view>待审核</view>
						</view>
						<view class="oen">
							<view class="num">{{SupplierCenter.off_goods||0}}</view>
							<view>已下架</view>
						</view>
					</view>
				</view>
				<view class="xia" style="margin-top: 70rpx;">
					<view class="right">
						<view class="left">订单</view>
						<view class="oen">
							<view class="num">{{SupplierCenter.all_order||0}}</view>
							<view style="font-size: 22rpx;font-family: Source Han Sans CN;font-weight: 400;color: #666666;">全部订单</view>
						</view>
						<view class="oen">
							<view class="num">{{SupplierCenter.cancel_order||0}}</view>
							<view style="font-size: 22rpx;font-family: Source Han Sans CN;font-weight: 400;color: #666666;">取消订单</view>
						</view>
						<view class="oen">
							<view class="num">{{SupplierCenter.fa_order||0}}</view>
							<view style="font-size: 22rpx;font-family: Source Han Sans CN;font-weight: 400;color: #666666;">待发货</view>
						</view>
						<view class="oen">
							<view class="num">{{SupplierCenter.over_order||0}}</view>
							<view style="font-size: 22rpx;font-family: Source Han Sans CN;font-weight: 400;color: #666666;">已完成</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 功能管理 -->
			<view class="orderBox">
				<view class="orderBoxTitle">
					<view class="">功能管理</view>
				</view>
				<view class="orderBoxBottom">
					<view style="display: flex;flex-direction: column;align-items: center;flex: 1;margin-top: 20rpx;" @click="addGoods">
						<image src="../../../static/gyssort5.png" mode="" style="width:44rpx;height:44rpx;"></image>
						<view style="margin-top:19rpx;">添加商品</view>
					</view> 
					<view style="display: flex;flex-direction: column;align-items: center;flex: 1;margin-top: 20rpx;" @click="manageGoods">
						<image src="../../../static/gyssort6.png" mode="" style="width:44rpx;height:44rpx;"></image>
						<view style="margin-top:19rpx;">商品管理</view>
					</view>
					<view style="display: flex;flex-direction: column;align-items: center;flex: 1;" >
					
					</view>
					<view style="display: flex;flex-direction: column;align-items: center;flex: 1;" >
					
					</view>
				</view>
			</view>
			
			<view class="footer">
				<view class="left">提示：</view>
				<view class="right">
					<view>更多功能请复制下方网址，在电脑端登录操作，账号和密码已发送至您的手机短信，请注意查看!</view>
					<view style="word-break:break-all">网址: {{wangzhi1}}
						<image src="../../../static/gysCopyPic.png" class="img1" @click="fzs(wangzhi1)"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 手机号弹窗提示 禁用==>在接口中调用方法-->
		<view class="beijing" v-if="incomes">
			<view class="tanchuang">
				<view class="title">提示</view>
				<view class="character">
					<view>尚未绑定手机号，请先绑定</view>
				</view>
				<view class="know">
					<view class="one" style="border-right: 2px solid #F5F5F5;color: #999999;" @click="getcancel()">取消</view>
					<view class="one" @click="openincome()">去绑定</view>
				</view>
			</view>
		</view>
		<!-- 添加商品弹窗 -->
		<view class="beijing" v-if="isMaskShow" @click.stop="isMaskShow=false">
			<view class="content">
				<view style="background: #FFFFFF;border-radius: 10rpx;">
					<view class="" style="padding:20rpx 0;text-align: center;color: #999999;font-weight: 400;font-family: PingFang SC;font-size: 26rpx;">请选择添加商品的方式：</view>
				    <view class="" @click="Add" style="padding:20rpx 0;text-align: center;color: #333333;font-weight: 400;font-family: PingFang SC;font-size: 26rpx;border-top:1px solid #f5f5f5;border-bottom:1px solid #f5f5f5;">自主添加</view>
				    <view class="" @click="Add1" style="padding:20rpx 0;text-align: center;color: #333333;font-weight: 400;font-family: PingFang SC;font-size: 26rpx;">共享产品库添加</view>
				</view>
				<view class="cancel" @click="cancel" style="border-radius: 10rpx;background: #FFFFFF;padding: 20rpx 0;text-align: center;margin: 20rpx 0;">
					 取消
				</view>
			</view>
		</view>
<!-- 		<u-mask :show="isMaskShow" @click="isMaskShow = false">
				<view class="mask-box" >
					<view class="mask-box-top">
						<view  style="color: #999999;">
							请选择添加商品的方式：
						</view>
						<view  @click.stop="Add">
							自主添加
						</view>
						<view  @click.stop="Add1">
							共享产品库添加
						</view>
					</view>
					<view class="mask-box-btm">
						取消
					</view>
				</view>
			</u-mask> -->
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				cdnUrl: '',
				baseUrl: '',
				displys: true,
				wangzhi: 'http://h5.a-jiaug.com/ugoadmin/login.php',
				wangzhi1: 'http://h5.a-jiaug.com/ugoadmin/login.php',
				phone: '', //存储userinfo所有数据
				incomes: false, //手机弹窗
				rank: -1,
				applyInfo: {
					apply_status: 1
				}, //返现接口存放的数据集合
				// 审核进度变量
				options: [{
					title: '信息提交成功,等待审核',
					desc: '2019-04-19 17:27'
				}, ], //格式源
				options1: [{
						title: '信息提交成功,等待审核',
						desc: '2019-04-19 17:27'
					},
					{
						title: '信息审核失败',
						desc: '2019-04-19 17:27'
					},
				],
				active: '0', //当前步骤
				state: '0', //切换审核进度是否成功
				SupplierCenter: {
					today_money:'0',
					month_money:'0',
					all_money:'0',
					cash:'0',
					virtual_cash:'0'
				},
				business: true, //营业中
				status: '',
				isMaskShow:false,
				pageIndex:""
			}
		},
		methods: {
			// 返回上一页
			black() {
				if (this.pageIndex==1) {
					uni.switchTab({
						url: '../../index/index'
					})
				}else{
					uni.switchTab({
						url: '../my'
					})
				}
			},
			cancel(){
				this.isMaskShow = false;
			},			
			// 个人资料
			urser() {
				let self = this 
				if (uni.getStorageSync('token')) {
					self.request({
						url: 'ugo/api/mall.php?c=getUserInfo',
						data: {
							token: uni.getStorageSync('token')
						}
					}).then(res => {
						if (res.data.success) {
							self.phone = res.data.data.phone
						}
					}, rej => {
						console.log(rej);
					})
				}
			},
			// 审核
			
			getSupplierStatus() {
				let self = this
				if (uni.getStorageSync('token')) {
					self.request({
						url: 'ugo/api/app.php?c=supplier/getSupplierStatus',
						data: {
							token: uni.getStorageSync('token')
						}
					}).then(res => {
						if (res.data.success) {
					if (res.data.data.supplier_type == 0) {
						self.displys = true
						self.rank = 1
						uni.setNavigationBarTitle({
							title: '商户入驻'
						})
					} else {
						self.displys = true
						self.rank = 2
						uni.setNavigationBarTitle({
							title: '商户审核'
						})
						self.applyInfo = res.data.data
						self.applyInfo.apply_status = res.data.data.supplier_status
						if (self.applyInfo.apply_status == 1) {
							self.options[0].desc = self.holo.formatTime(self.applyInfo.submit_time * 1000)
						}
						if (self.applyInfo.apply_status == 3) {
							self.options1[0].desc = self.holo.formatTime(self.applyInfo.submit_time * 1000)
							self.options1[1].desc = self.holo.formatTime(self.applyInfo.audit_time * 1000)
						}
						if (self.applyInfo.apply_status == 2) {
							self.rank = 3
							uni.setNavigationBarTitle({
								title: '商户中心'
							})
							self.getSupplierCenter()
						}
					}
					
						} else {
							self.displys = true
							self.rank = 1
							uni.setNavigationBarTitle({
								title: '供应商入驻'
							})
						}
					}, rej => {
						console.log(rej);
					})
				}
			},
			// 获取商家管理中心
			getSupplierCenter() {
				let self = this
				if (uni.getStorageSync('token')) {
					self.request({
						url: 'ugo/api/app.php?c=supplier/getSupplierCenter',
						
						data: {
							token: uni.getStorageSync('token'),
							type:"1"
						}
					}).then(res => {
						if (res.data.success) {
							self.SupplierCenter = res.data.data
							self.status = res.data.data.is_open
							if(self.status==0){
								this.business=false
							}else{
								this.business=true
							}
						}
					}, rej => {
						console.log(rej);
					})
				}
			},
			// 复制
			fz(id) {
				let self = this
				uni.setClipboardData({
					data: id,
					success: function(data) {
						uni.getClipboardData({
							success: function(data) {
								self.holo.toast({
									icon: 'none',
									title: '复制成功~'
								})
							},
							fail: function(err) {},
							complete: function(res) {}
						})
					},
					fail: function(err) {},
					complete: function(res) {}
				})
			},
			// 入驻按钮
			getenter() {
				if (this.phone != '') {
					uni.setStorageSync('latitude','')
					uni.setStorageSync('longitude','')
					uni.navigateTo({
						url: './supplierEnter'
					});
				} else {
					self.displys = true
					self.rank = 1
					// this.incomes=true
					uni.showModal({
						title: '提示',
						content: '尚未绑定手机号，是否去绑定？',
						cancelColor: '#999999',
						confirmText: '去绑定',
						confirmColor: '#FC4950',
						success: function success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: './../boundPhoe'
								})
							} else {
								uni.navigateBack({
									delta: 1
								})
							}
						}
					});
				}
			},
			// 重新提交文字==>变回到门店申请页面
			resubmit() {
				uni.navigateTo({
					url: './supplierEnter'
				})
			},
			fzs(id) {
				let self = this
				uni.setClipboardData({
					data: id,
					success: function(data) {
						uni.getClipboardData({
							success: function(data) {
								self.holo.toast({
									icon: 'none',
									title: '复制成功~'
								})
							},
							fail: function(err) {},
							complete: function(res) {}
						})
					},
					fail: function(err) {},
					complete: function(res) {}
				})
			},
			// 营业状态切换
			getbusiness(is_open) {
				this.business = !this.business
				console.log(this.business)
				this.status = !this.business ? 0 : 1 //0打烊 1营业
				this.changeStatus()
			},
			//查看全部
			lookAll(id){
				uni.navigateTo({
					// url:'./shangjiaOrder/shangjiaOrder?id='+id
					url:'./supplierOrder?id='+id
				})
			},
			// 是否营业
			changeStatus() {
				let self = this
				if (uni.getStorageSync('token')) {
					self.request({
						url: 'ugo/api/app.php?c=supplier/changeStatus',
						data: {
							token: uni.getStorageSync('token'),
							type: self.status, //0打烊 1营业
						}
					}).then(res => {
						self.holo.toast({
							title: res.data.msg,
							icon: 'none',
							duration:300
						});
						
						self.getSupplierCenter()
					}, rej => {
						console.log(rej);
					})
				}
			},
			// 可提现余额
			getwithdraw() {},
			// 待结算余额 
			getaccount() {},
			// 新增商品
			addGoods(){
				this.isMaskShow=true
			},
			//自主添加
			Add(){
				this.isMaskShow=false
				console.log(111);
				uni.navigateTo({
					url:'./addproduct'
				})
			},
			//共享产品库添加
			Add1(){
				this.isMaskShow=false
				uni.navigateTo({
					url:'./shareAdd'
				})
			},
			
			//管理商品
			manageGoods(){
				uni.navigateTo({
					url:'./goodsManage'
				})
			},
			
			
			//可提现余额
			tomyCash(){
				uni.navigateTo({
					url:'../addproduct/myCash?type=2'
				})
			},
			//待结算金额
			tomyCash1(){
				uni.navigateTo({
					url:'./toBeSettled'
				})
			}
		},
		onShow() {
			this.cdnUrl = this.$cdnUrl
			this.baseUrl = this.$baseUrl
			this.urser()
			this.getSupplierStatus()
		},
		onLoad(options) {
			this.pageIndex=options.pageIndex
			// if (options.jump) {
			// 	uni.setNavigationBarTitle({
			// 		title: '审核进度'
			// 	})
			// } else {
			// 	uni.setNavigationBarTitle({
			// 		title: '商户入驻'
			// 	})
			// }
		},
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	page image {
		width: 100%;
		height: 100%;
	}
.beijing {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .5);
	}

	.beijing .tanchuang {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 500rpx;
		height: 320rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 30rpx;
		padding-bottom: 0;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.beijing .tanchuang .title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		text-align: center;
		margin-bottom: 40rpx;
	}

	.beijing .tanchuang .character view {
		text-align: center;
	}

	.beijing .tanchuang .know {
		position: absolute;
		bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #F93A2D;
		border-top: 2px solid #F5F5F5;
		width: 440rpx;
		padding-top: 30rpx;
	}

	.beijing .tanchuang .know .one {
		width: 200rpx;
		height: 50rpx;
		text-align: center;
	}
	.content{
		width: 690rpx;
		position: absolute;
		bottom: 0;
		left:50%;
		transform: translateX(-50%);
		border-radius: 10rpx;
	}
	.flexd {
		position: fixed;
		left: 0;
		top: 0;
		width: 749rpx;
		height: 88rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.16);
		line-height: 88rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		font-family: PingFang SC;
		z-index: 111111;
	}

	.flexd .left {
		width: 17rpx;
		height: 32rpx;
		position: absolute;
		top: 6rpx;
		left: 30rpx;
	}

	.flexd .center {
		font-size: 32rpx;
		font-weight: 700;
		color: #333333;
	}

//这里不知道这个88 top 是啥意思 先注掉了 如果发现要放开 就全部放开
	.bgcImg {
		// margin-top: 88rpx;
	}

	.audit {
		// margin-top: 88rpx;
	}

	.adminsistration {
		// margin-top: 88rpx;
	}

	/* 审核进度 */
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

	/* 申请页面布局 */
	.bgcImg {
		background-image: url(../../../static/businessInBgc.png);
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
		padding-bottom: 150rpx;
	}

	.bgcImg image {
		width: 100%;
		height: 100%;
	}

	.bgc2 {
		width: 749rpx;
		height: 491rpx;
	}

	.bgc4 {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: -10rpx;
	}

	.bgc4 .yuan {
		display: inline-block;
		width: 7rpx;
		height: 7rpx;
		border-radius: 50%;
		background-color: #FFFFFF;
		margin: 10rpx;
	}

	.bgc3 {
		width: 750rpx;
		height: 630rpx;
		background-image: url(../../../static/businessInBgc3.png);
		
		background-size: 100% 100%;
		padding: 50rpx 100rpx;
		box-sizing: border-box; 
	}

	.bgc3 .img1 {
		width: 28rpx;
		height: 28rpx;
		vertical-align: middle;
		margin-left: 15rpx;
	}

	.bgc3 .one {
		display: flex;
		font-family: PingFang SC;
		margin-top: 30rpx;
	}

	.bgc3 .one .left {
		width: 69rpx;
		height: 69rpx;
		background: #FD6C65;
		border-radius: 50%;
		text-align: center;
		line-height: 69rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #FFFFFF;
	}

	.bgc3 .one .right {
		margin-left: 30rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #333333;
		flex: 1;
	}

	.bgc3 .img2 {
		width: 22rpx;
		height: 47rpx;
		margin: 20rpx 20rpx 30rpx;
	}

	.bgc5 {
		width: 750rpx;
		background-image: url(../../../static/businessInBgc7.png);
		background-size: 100% 100%;
		padding: 50rpx 100rpx;
		box-sizing: border-box;
	}

	.bgc5 .text {
		padding: 30rpx 0;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	.bgc5 .text view {
		margin-bottom: 5rpx;
	}

	.btn {
		background-color:#F9D4B9;
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		width: 750rpx;
		height: 120rpx;
	}
	.orderBox{
		background-color: #fff;
		padding:  30rpx;
		margin-top:20rpx;
		.orderBoxTitle{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom:1px solid #F5F5F5;
			padding: 10rpx 0;
			view:nth-child(1){
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
			}
			view:nth-child(2){
				font-size: 24rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #999999;
			}
		}
		.orderBoxBottom{
			display: flex;
			justify-content: space-between;
			padding: 10rpx 0;
		}
	}
	/* 手机号弹窗 */
	.beijing {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .5);
	}

	.beijing .tanchuang {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 500rpx;
		height: 320rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 30rpx;
		padding-bottom: 0;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.beijing .tanchuang .title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		text-align: center;
		margin-bottom: 40rpx;
	}

	.beijing .tanchuang .character view {
		text-align: center;
	}

	.beijing .tanchuang .know {
		position: absolute;
		bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #F93A2D;
		border-top: 2px solid #F5F5F5;
		width: 440rpx;
		padding-top: 30rpx;
	}

	.beijing .tanchuang .know .one {
		width: 200rpx;
		height: 50rpx;
		text-align: center;
	}

	/* 管理中心 */
	.adminsistration {
		background-color: #F5F5F5;
		height: 100%;
		width: 100%;
	}

	.adminsistration .shopadmin {
		width: 100%;
		height: 180rpx;
		background: #FFFFFF;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.shopadmin .img1 image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 6rpx;
	}

	.shopadmin .lables {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		margin-left: -100rpx;
	}

	.shopadmin .lables .text {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 20rpx;
	}

	.shopadmin .pressbutt image {
		width: 130rpx;
		height: 50rpx;
	}

	.shopadmin .pressbutt .one {
		position: relative;
	}

	.shopadmin .pressbutt .one text {
		position: absolute;
		top: 10rpx;
		left: 16rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.shopadmin .pressbutt .two {
		position: relative;
	}

	.shopadmin .pressbutt .two text {
		position: absolute;
		top: 10rpx;
		right: 16rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.adminsistration .money {
		width: 690rpx;
		height: 205rpx;
		background: #FD635E;
		border-radius: 15rpx;
		margin: 30rpx;
		display: flex;
		justify-content: space-between;
		padding: 50rpx;
		box-sizing: border-box;
	}

	.money .left {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
	}

	.money .left .one {
		font-size: 48rpx;
		font-weight: 800;
	}
	// 黄色的金额
	.yellowPrice {
		padding: 30rpx;
		background-color: #F5F5F5;
	
		.priceLiset {
			background-image: linear-gradient(45deg, #FF862B, #FF964F);
			padding: 20rpx;
			display: flex;
			border-radius: 15rpx;
			.border{
				width: 2px;
				margin: 0 15rpx 0 0;
				opacity: 0.2;
				background-color: white;
			}
			.priceItem {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.title {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
	
				.price {
					font-size: 48rpx;
					font-family: PingFang SC;
					font-weight: 800;
					color: #FFFFFF;
					
				}
	
				.icon {
					width: 50rpx;
					opacity: 0.5;
					font-size: 50rpx;
					color: white;
				}
			}
		}
	}

	.statistics {
		width: 100%;
		height: 205rpx;
		background: #FFFFFF;
		padding: 30rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
	}

	.statistics .shang {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #222222;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #F5F5F5;
		box-sizing: border-box;
	}

	.statistics .xia {
		display: flex;
		justify-content: space-between;
		padding: 0 10rpx;
	}

	.statistics .xia .oen {
		text-align: center;
		font-size: 26rpx;
		font-family: HiraginoSansGB;
		font-weight: normal;
		color: #666666;
	}

	.statistics .xia .oen .num {
		font-size: 36rpx;
		font-weight: bold;
		color: #222222;
	}

	.information {
		width: 100%;
		height: 360rpx;
		background: #FFFFFF;
		padding: 30rpx;
		margin-top: 20rpx;
	}

	.information .shang {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #222222;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #F5F5F5;
		box-sizing: border-box;
	}

	.information .xia .right {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 40rpx;
		flex: 1;
		margin-right: 30rpx;
	}

	.information .xia .left {
		border-right: 2px solid #F5F5F5;
		padding-right: 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.information .xia .right .oen {
		text-align: center;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		/* width: 150rpx; */
		width: 20%;
	}

	.information .xia .right .oen .num {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.footer {
		display: flex;
		margin: 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.footer .right {
		flex: 1;
	}

	.footer .right .img1 {
		width: 28rpx;
		height: 28rpx;
	}
	.mask-box{
		height: 410rpx;
		width: 690rpx;
		margin-left: 30rpx;
		position: fixed;
		bottom:0;
		font-size: 26rpx;
		text-align: center;
		
		
	}
	.mask-box-top{
		height: 270rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		view{
			box-sizing: border-box;
			line-height: 90rpx;
			border-bottom: 1rpx solid #F5F5F5;
		}
		view:last-child{
			border-bottom: 0rpx solid #F5F5F5;
			line-height: 90rpx;
		}
	}
	.mask-box-btm{
		margin-top: 20rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
	}
</style>
