<!-- 待结算金额 -->
<template>
	<view>
		<view v-if='list.data.length>0'>
			<view class="hang" v-for="(item,i) in list.data" :key='i'>
				<view class="left">
					<view class="txt1">
						<text>{{item.type_name}}</text>
						<text class="right"><text v-if="(item.amount/100)>0">+</text> {{item.amount/100}}</text>
					</view>
			
					<view class="listBox">
						<view class="txt2">{{holo.formatSeconds(item.time)}}</view>
			
					</view>
				</view>
			</view>
		</view>
		<view v-else style="text-align: center;margin-top: 200rpx;">
			<image src="../../../static/noshop(1).png" mode="" style="width: 480rpx;height: 360rpx;"></image>
			<view class="font-26" style="color: #999999;">暂无数据</view>
		</view>
		<view class="">
			<loadmore :content-text="contentText" :status="status" @clickLoadMore="reachBtm" v-if="isshow"></loadmore>
		</view>
	</view>
</template>

<script>
	import loadmore from "../../../components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			loadmore
		},
		data() {
			return {
				isshow: false,
				page: 1,
				count: 10,
				//佣金列表
				currentPage: 1,
				list: {
					data:[]
				},
				flag: true,
				// token: "5885917885788030564",
				// device: "166514e60ecfbed4f8671e0eb7f4c3c0",
				token: "",
				device: "",
				lists: [{
						"type": "19",
						"amount": "900",
						"time": "1595919521",
						"type_name": "团队成员升级为推荐官"
					},
					{
						"type": "19",
						"amount": "30",
						"time": "1595919521",
						"type_name": "团队成员升级为VIP会员"
					}
				], //数据集合
				status: 'more',
				statusTypes: [{
					value: 'more',
					text: '加载前',
					checked: true
				}, {
					value: 'loading',
					text: '加载中',
					checked: false
				}, {
					value: 'noMore',
					text: '没有更多',
					checked: false
				}],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				}
			}
		},
		//调用原生方法 改title
		onShow() {
			this.page=1;
			this.list={data:[]}
			this.getSupplierCenter()
			// var u = navigator.userAgent,
			// 	app = navigator.appVersion;
			// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
			// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

			// if (isAndroid) {
			// 	//判断完环境以后 其实交互就是下面这一行代码
			// 	window.android.setTitleText("余额记录")

			// }

		},
		
		//等接口
		onLoad(options) {
			// let self=this
			// if (uni.getStorageSync('token')) {
			// 	self.request({
			// 		url: 'ugo/api/app.php?c=supplier/changeStatus',
			// 		data: {
			// 			token: uni.getStorageSync('token'),
			// 			type: self.status, //0打烊 1营业
			// 		}
			// 	}).then(res => {
			// 		self.holo.toast({
			// 			title: res.data.msg,
			// 			icon: 'none',
			// 			duration:300
			// 		});
					
			// 		self.getSupplierCenter()
			// 	}, rej => {
			// 		console.log(rej);
			// 	})
			// }
			

			
		},
		//触底加载
		//这里没有用currentpage lastpage的写法 如果下面这种方法不行 就让后台加字段 给当前页 给总页数
		onReachBottom() {
			//如果当前页小于最大页 触底加载 并在请求中 page =nowpage+1
			// this.reachBtm()
			if (this.page<this.list.page){
				this.page++;
				this.getSupplierCenter
			}
		},

		methods: {
			// 获取待结算数据
			getSupplierCenter(){
				let self =this
				self.request({
					url:"ugo/api/app.php?c=supplier/getCashChangeListV2",
					data:{
						page:self.page,
						type:1,
					}
				}).then(res => {
				        if (res.data.success) {
							self.list.data.length>0?self.list.data=[...slef.list.data,...res.data.data]:self.list=res.data
				        } else {
				                uni.showToast({
				                title: res.data.message,
				                icon: 'none'
				                })
				        }
				})
			},
		},

	}
</script>

<style>
	.hang {
		width: 100%;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		border-bottom: 1rpx solid #f5f5f5;
		align-items: center;
	}

	.listBox {
		width: 100%;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.hang .left {
		width: 100%;
		color: #333333;
	}

	.hang .left .txt1 {
		margin-top: 5rpx;
		margin-bottom: 24rpx;
		color: #333333;
		display: flex;
		justify-content: space-between;
	}

	.hang .left .txt2 {
		margin-top: 5rpx;
		font-size: 22rpx;
		color: #999999;
	}

	.hang .right {
		font-weight: bold;
		color: #FC4950;
	}
</style>
