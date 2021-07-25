<!-- 代理管理中心页面 -->
<template>
	<view>
		<view class="bgc">
			<!-- <view class="tabs" > -->
				<view class="tabs">
					<block v-for="(item,i) in timelist" :key="item.id">
						<view  :class="[item.id==selectedIndex?'bg':'']" class="lb"  @click="getNum(item.id,i)">{{item.title}}</view>
					</block>
				</view>
			<!-- </view> -->
			<view class="two">
				<view class="first">
					<view class="txt1">{{information.goods_num?information.goods_num:0}}</view>
					<view>产品数</view>
				</view>
				<view class="first">
					<view class="txt1">{{information.order_num?information.order_num:0}}</view>
					<view>订单数</view>
				</view>
				<view class="first">
					<view class="txt1">{{$returnFloat(information.total_money)}}</view>
					<view>交易额(元)</view>
				</view>
				<view class="first">
					<view class="txt1">{{information.user_num?information.user_num:0}}</view>
					<view>下单会员数</view>
				</view>
			</view>
			<!-- 可提现金额 -->
			<view class="money">
				<view style="display: flex;justify-content: space-between;">
					<view class="txt2">可提现金额(元）</view>
					<view class="detail" @click="balance()">余额明细>></view>
				</view>
				<view class="tixian">
					<view>{{$returnFloat(information.cash)}}</view>
					<view class="btn" @click="withdeposit(information.cash)">提现</view>
				</view>
			</view>
		</view>
		
		<!-- 收入 -->
		<view class="income">
			<view class="labe">
				<view class="line"></view>收入
				<image src="../../static/help.png" @click="openincome()"></image>
			</view>
			<view class="profit">
				<view class="deduct" @click="balance()">
					<view>{{$returnFloat(information.profit_money)}}</view>
					<view style="margin-top: 10rpx;">提成</view>
				</view>
				<view class="line"></view>
				<view class="deduct" @click="balance()">
					<view>{{$returnFloat(information.server_money)}}</view>
					<view style="margin-top: 10rpx;">月奖励</view>
				</view>
				<view class="line"></view>
				<view class="deduct">
					<view>{{$returnFloat(information.year_server_money)}}</view>
					<view style="margin-top: 10rpx;">股东分红</view>
				</view>
			</view>
		</view>
		
		<!-- 团队数据 -->
		<view class="peopel">
			<view class="labe">
				<view class="line"></view>团队数据
			</view>
			<view class="profit">
				<view>
					<view class="box" :class="perrank==3 || perrank==2?'colors':''">
						<view v-if="perrank==3 || perrank==2">0</view>
						<view v-else>{{lists.rank_3?lists.rank_3:0}}</view>
						<view style="margin-top: 10rpx;">运营合伙人</view>
					</view>
					<view class="box" style="border-bottom: 0;">
						<view>{{information.supplier_num?information.supplier_num:0}}</view>
						<view style="margin-top: 10rpx;">门店</view>
					</view>
				</view>
				<view>
					<view class="box1"  :class="perrank==2?'colors':''">
						<view v-if="perrank==2">0</view>
						<view v-else>{{lists.rank_2?lists.rank_2:0}}</view>
						<view style="margin-top: 10rpx;">服务中心</view>
					</view>
					<view class="box1" style="border-bottom: 0;padding-top: 60rpx;color: #999999;">
						<view style="margin-top: 10rpx;">敬请期待更多信息</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 城市合伙人搜索列表 -->
		<view class="" v-if="perrank==4">
			<view class="searchlist" v-if="showSearch">
				<view class="search">
					<input type="number" placeholder="请输入手机号搜索下级成员" value="" v-model="keywords"/>
					<image src="../../static/search(1).png" class="img"></image>
					<view class="txt" @click="gosearch()">搜索</view>
				</view>
				<view class="list" v-for="(item,i) in dataList" :key="i">
					<view class="left">
						<image :src="cdnUrl+item.photo" class="img1"></image>
						<view class="img2">{{item.rank_name}}</view>
					</view>
					<view class="right">
						<view>用户昵称: {{item.apply_user_name}}</view>
						<view style="margin-top: 10rpx;">手机号码: {{item.apply_user_phone}}</view>
					</view>
				</view>
			</view>
		</view>
		
	
		<view class="" v-else>
			<view class="searchlist" v-if="showSearch">
				<view class="search" >
					<input type="number" placeholder="请输入手机号搜索下级门店" value="" v-model="keywords"/>
					<image src="../../static/search(1).png" class="img"></image>
					<view class="txt" @click="gosearch()">搜索</view>
				</view>
				<block v-if="dataList.length!=0">
					<view class="shoplist" v-for="(item,i) in dataList" :key="i">
						<view class="shopimg">
							<image :src="cdnUrl+item.supplier_icon"></image>
						</view>
						<view class="right">
							<view class="one" style="font-size: 28rpx;">{{item.supplier_name}}</view>
							<view class="two">
								<view>
									<view class="star" v-if="item.comment_ratio">
										<block v-for="(items,j) in item.src" :key="j">
											<image :src="items.icon" class="star"></image>
										</block>
										<text class="yueshou" style="margin-top: -5rpx;">月售{{item.supplier_goods_num}}</text>
									</view>
									<view class="star" v-else>暂无评分</view>
								</view>
								<!-- <view class="fanwei">30分钟 I 500m</view> -->
							</view>
							<view class="three">起送￥{{item.low_price/100}} | 基础配送费：{{item.base_price!='0'?'￥'+item.base_price/100+'元':'免配送费'}}</view>
							<view class="four">
								<view class="yhq2" v-for="(itemt,k) in item.coupon_list" :key='k'><text>{{itemt.deduct_cash/100}}元</text><text class="txt">领取</text></view>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="" style="text-align: center;padding:40rpx 0 50rpx; 0">
						<image src="../../static/zwsc.png" style="width: 409rpx;height: 292rpx;margin: 40rpx 0;"></image>
						<view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">暂无数据</view>
					</view>
				</block>
			</view>
		</view>
		
		<!-- 收入弹窗提示 -->
		<view class="beijing" v-if="incomes">
			<view class="tanchuang">
				<view class="title">收入说明</view>
				<view class="character">
					<view>提成：门店入驻年费分成金额</view>
					<view>月奖励：门店交易服务费分成金额</view>
					<view>股东分红：按年发放一次 ，线下提现</view>
				</view>
				<view class="know" @click="knows()">我知道了</view>
			</view>
		</view>
	
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timelist:[
					{id:'5',title:'全部'},
					{id:'1',title:'今天'},
					{id:'2',title:'昨天'},
					{id:'3',title:'近7天'},
					{id:'4',title:'近30天'},
					// {id:'5',title:'近3月'},
				],
				suoyin:5,
				selectedIndex:'5',//点击状态id
				perrank:'',//个人状态等级
				// perrank:4,//个人状态等级
				information:{
					profit_money:'0',
					server_money:'0',
					year_server_money:'0',
					cash:'0',
					total_money:'0'
					
				},//存放日期段的数据
				lists:[],//下半部分数据集合==>data.data
				dataList:[],//下半部分数据==>data.data.list
				keywords:'',//搜索手机号
				page:1,
				pageCount:1,
				cdnUrl: '', //存放网络图片地址
				incomes:false,
				showSearch:false
			}
		},
		methods: {
			// 获取不同时间段的数据
			init(){
				let self=this
				if (uni.getStorageSync('token') != '') {
					this.request({
						url: 'ugo/api/app.php?c=rank_apply_v2/getTeamTop',
						data: {
							token: uni.getStorageSync('token'),
							first_type:self.suoyin
						}
					}).then(res => {
						if(res.data.success){
							self.information=res.data.data
						}else{
							
						}
					},rej=>{
						console.log(rej);
					});
				}
			},
			// 获取列表数据信息
			init1(){
				let self=this
				if (uni.getStorageSync('token') != '') {
					this.request({
						url: 'ugo/api/app.php?c=rank_apply/getTeamFoot',
						data: {
							token: uni.getStorageSync('token'),
							page:self.page,
							phone:self.keywords
						}
					}).then(res => {
						if(res.data.success){
							if(self.keywords && res.data.data.length=='0'){
		                        self.holo.toast({
									title:'暂无数据',
									icon:'none'
								})
						       return 
							}
							if(self.showSearch==false && res.data.data.list.length!='0'){
								self.showSearch=true
							}
							self.dataList=[]
							self.lists=res.data.data
							self.dataList=res.data.data.list
							if(self.perrank==4){
								for(var i=0;i<self.dataList.length;i++){
									self.dataList[i].apply_user_phone=self.dataList[i].apply_user_phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
								}
							}
							for(var i = 0; i < res.data.data.list.length;i++){
								if(res.data.data.list[i].comment_ratio==0){
									var src=[
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.list[i].comment_ratio==1){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.list[i].comment_ratio==2){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.list[i].comment_ratio==3){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star1.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.list[i].comment_ratio==4){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star1.png'},
									]
								}else if(res.data.data.list[i].comment_ratio==5){
									var src=[
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
										{icon:'../../static/star.png'},
									]
								}
								res.data.data.list[i].src=src;
							}
						}
					},rej=>{
						console.log(rej);
					});
				}
			},
			// 日期切换
			getNum(e,i){
			      this.selectedIndex=e
				  this.suoyin = e;
				  this.init()
			},	// 提现
			withdeposit(e){
				uni.navigateTo({
					url:'./withdeposit?cash='+e
				})
			},
			// 余额明细
			balance(){
				uni.navigateTo({
					url:'./balancelist'
				})
			},
			// 搜索按钮
			gosearch(){
				this.page=1
				this.pageCount=1
				this.init1()//下半部分接口
			},
			// 收入弹窗
			openincome(){
				this.incomes=true
			},
			knows(){
				this.incomes=false
			},
		},
		onLoad(options) {
			this.cdnUrl = this.$cdnUrl;
			this.perrank=options.apply_rank;
			// this.perrank=3;
			// console.log(options.apply_rank);
			if(options.apply_rank=='4'){
				uni.setNavigationBarTitle({
					title:'城市合伙人'
				})
			}else if(options.apply_rank=='3'){
				uni.setNavigationBarTitle({
					title:'运营合伙人'
				})
			}else if(options.apply_rank=='2'){
				uni.setNavigationBarTitle({
					title:'服务中心'
				})
			}
		},
		onShow() {
			this.init()
			this.init1()
		}
	}
</script>

<style>
.colors {
	color: #999999;
}
.bgc {
	width: 750rpx;
	height: 367rpx;
	padding: 40rpx 30rpx 0;
	box-sizing: border-box;
	background: linear-gradient(45deg, #F6281B, #FF5F53);
	position: relative;
}
.tabs{
  width: 690rpx;
  height: 60rpx;
  margin-top: 48rpx;
  display: flex;
  border-radius: 30rpx;
  color: #FFFFFF;
/*  border-left: 1rpx solid #FFFFFF;
  border-right: 1rpx solid #FFFFFF; */
  align-items: center;
  margin:0 auto;
  /* box-sizing: border-box; */
}
.tabs .lb:nth-child(1){
  /* border: none; */
  border-radius: 30rpx 0 0 30rpx;
}
.tabs .lb:nth-child(5){
  border-radius: 0 30rpx 30rpx 0;
  border-right: 1rpx solid #FFFFFF;
}
.tabs .lb{
  height: 60rpx;
  line-height: 60rpx;
  color: #FFFFFF;
  font-size: 26rpx;
  flex: 1;
  text-align: center;
  border: 1rpx solid #FFFFFF;
  border-right:none;
}
.tabs .bg {
	height: 100%;
	line-height: 60rpx;
	font-size: 26rpx;
	flex: 1;
	text-align: center;
	background-color: #FFFFFF;
	color: #FE5655;
	border-left:none;
	border-bottom: 1rpx solid #FFFFFF;
	border-top: 1rpx solid #FFFFFF;
}
.bgc .two {
	display: flex;
	text-align: center;
	flex-wrap: wrap;
}
.bgc .two .first {
	width: 25%;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #FFFFFF;
	margin-top: 30rpx;
}
.two .first .txt1 {
	font-size: 44rpx;
	font-weight: 400;
}
.bgc .money {
	position: absolute;
	left: 30rpx;
	top: 300rpx;
	width: 690rpx;
	height: 210rpx;
	background: #FFFFFF;
	border-radius: 10rpx;
	box-shadow:1px 0px 1px 2px rgba(3, 3, 3, 0.06);
	padding: 32rpx 40rpx;
	box-sizing: border-box;
	font-family: Source Han Sans CN;
}
.money .txt2 {
	font-size: 26rpx;
	font-weight: 300;
	color: #333333;
	margin-bottom: 45rpx;
}
.money .tixian {
	display: flex;
	/* justify-content: space-between; */
	font-size: 44rpx;
	font-weight: 500;
	color: #333333;
}
.money .tixian .btn {
	width: 135rpx;
	height: 50rpx;
	background: #FFFFFF;
	border: 1rpx solid #FF0000;
	border-radius: 25rpx;
	line-height: 50rpx;
	text-align: center;
	font-size: 26rpx;
	font-weight: 300;
	color: #F6281B;
	margin-left: 30rpx;
}
.bgc .money .detail {
	font-size: 24rpx;
	font-weight: 300;
	color: #F6281B;
}
/* 收入 */
.income {
	margin: 190rpx 30rpx 30rpx;
}
.income .labe {
	display: flex;
	align-items: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
}
.income .labe .line {
	width: 8rpx;
	height: 30rpx;
	background: #F93A2D;
	margin-right: 10rpx;
}
.income .labe image {
	width: 30rpx;
	height: 30rpx;
	margin-left: 10rpx;
}
.income .profit {
	width: 690rpx;
	height: 154rpx;
	background: #FFFFFF;
	border: 1px solid #EEEEEE;
	box-shadow: 0px 4px 21px 0px rgba(3, 3, 3, 0.06);
	border-radius: 10rpx;
	margin-top: 30rpx;
	display: flex;
	justify-content: space-around;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	padding-top: 40rpx;
	box-sizing: border-box;
}
.income .profit .deduct {
	text-align: center;
}
.income .profit .line {
	width: 4rpx;
	height: 90rpx;
	background: #F5F5F5;
}

/* 城市合伙人下级数据 */
.peopel {
	margin: 30rpx;
}
.peopel .labe {
	display: flex;
	align-items: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
}
.peopel .labe .line {
	width: 8rpx;
	height: 30rpx;
	background: #F93A2D;
	margin-right: 10rpx;
}
.peopel .profit {
	width: 690rpx;
	height: 400rpx;
	background: #FFFFFF;
	border: 1px solid #EEEEEE;
	box-shadow: 0px 4px 21px 0px rgba(3, 3, 3, 0.06);
	border-radius: 10rpx;
	margin-top: 30rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
}
.peopel .profit .box {
	width: 300rpx;
	height: 150rpx;
	text-align: center;
	border-right: 4rpx solid #f5f5f5;
	border-bottom: 4rpx solid #f5f5f5;
	padding-top: 40rpx;
	box-sizing: border-box;
}
.peopel .profit .box1 {
	width: 300rpx;
	height: 150rpx;
	border-bottom: 4rpx solid #f5f5f5;
	text-align: center;
	padding-top: 40rpx;
	box-sizing: border-box;
}

/* 城市合伙人搜索列表 */
.searchlist {
	width: 690rpx;
	background: #FFFFFF;
	border-radius: 10rpx;
	box-shadow:1px 0px 1px 2px rgba(3, 3, 3, 0.06);
	margin: 0 30rpx;
	margin-bottom: 100rpx;
}
.searchlist image {
	width: 100%;
	height: 100%;
}
.searchlist .search {
	display: flex;
	position: relative;
	font-size: 30rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #F6281B;
	padding: 30rpx 30rpx 10rpx;
	box-sizing: border-box;
	border-bottom: 1rpx solid #F5F5F5;
	line-height: 70rpx;
}
.search .img {
	position: absolute;
	left: 50rpx;
	bottom: 30rpx;
	width: 29rpx;
	height: 29rpx;
}
.search input {
	width: 520rpx;
	height: 70rpx;
	background: #F5F5F5;
	border-radius: 35rpx;
	line-height: 70rpx;
	padding-left: 70rpx;
	box-sizing: border-box;
	margin-right: 35rpx;
	color: #666666;
	font-size: 26rpx;
}
.list {
	width: 690rpx;
	padding: 50rpx 30rpx;
	display: flex;
	border-bottom: 1rpx solid #F5F5F5;
	box-sizing: border-box;
}
.list .left {
	position: relative;
	margin-right: 40rpx;
}
.list .left .img1 {
	width: 90rpx;
	height: 90rpx;
	margin-left: 10rpx;
}
.list .left .img2 {
	width: 138rpx;
	height: 35rpx;
	background: #FFFFFF;
	border: 1px solid #8F7D6D;
	border-radius: 18rpx;
	font-size: 22rpx;
	font-family: PingFang SC;
	text-align: center;
	line-height: 35rpx;
	font-weight: 500;
	color: #8F7D6D;
	position: absolute;
	left: -20rpx;
	bottom: -20rpx;
}
.list .right {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	margin-top: 10rpx;
}
/* 运营合伙人和服务中心门店列表 */
.shoplist {
	width: 690rpx;
	padding: 50rpx 30rpx;
	display: flex;
	border-bottom: 1rpx solid #F5F5F5;
	box-sizing: border-box;
	font-family: PingFang SC;
	color: #999999;
	font-size: 22rpx;
	font-weight: 400;
}
.shoplist .shopimg {
	width: 150rpx;
	height: 150rpx;
	border-radius: 10rpx;
	margin-right: 30rpx;
}
.shoplist .right {
	flex: 1;
}
.shoplist .one {
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}
.shoplist .two {
	display: flex;
	justify-content: space-between;
	margin: 20rpx 0 15rpx;
}
.shoplist .four {
	display: flex;
	font-size: 10rpx;
	color: #FFFFFF;
	margin-top: 18rpx;
}
.shoplist .four .yhq1 {
	width: 150rpx;
	height: 36rpx;
	background-image: url(../../static/quan1.png);
	background-size: cover;
	margin-right: 10rpx;
	padding: 5rpx;
	box-sizing: border-box;
}
.shoplist .four .yhq2 {
	width: 150rpx;
	height: 36rpx;
	background-image: url(../../static/quan.png);
	background-size: cover;	
	padding: 5rpx;
	box-sizing: border-box;
	margin-right: 10rpx;
}
.shoplist .four .txt{
	margin-left: 10rpx;
}
/* 星星 */
.star{
	display: flex;
	font-weight: 400;
	color: #999999;
}
.star .yueshou{
margin-left: 10rpx;
}
.star image {
	width: 22rpx;
	height: 22rpx;
	margin: 0 0 0 10rpx;
}
/* 收入弹窗 */
.beijing {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background-color: rgba(0,0,0,.5);
	/* z-index: 111; */
}
.beijing .tanchuang {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	width: 500rpx;
	height: 413rpx;
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
	margin-bottom: 10rpx;
}
.beijing .tanchuang .know {
	position: absolute;
	bottom: 20rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #F93A2D;
	border-top: 2px solid #F5F5F5;
	width: 440rpx;
	padding-top: 30rpx;
	text-align: center;
}
</style>
