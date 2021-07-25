<template>
	<view>
		<view class="container">
			<view class="slide-box" v-for="(item, index) in listData" :key="index">
				<view
					class="slide-list"
					@touchstart="touchStart($event, index)"
					@touchend="touchEnd($event, index)"
					@touchmove="touchMove($event, index)"
					@tap="recover(index)"
					:style="{ transform: 'translate3d(' + item.slide_x + 'px, 0, 0)' }"
				>
					<!-- 样式 -->
					<view class="now-message-info" hover-class="uni-item--hover" :style="{ width: windowWidth + 'px' }" @click="clickItemMethod(item)">
						<image class="icon-image" :src="cdnUrl+item.collect_data_icon" v-if="item.supplier_status==1" ></image>
						<view class="img" v-if="item.supplier_status==2">
							<image class="icon-image" :src="cdnUrl+item.collect_data_icon"></image>
							<image class="layer" src="../../static/xiajia.png"></image>
						</view>
						<view class="list-right">
							<view class="list-title" v-if="item.supplier_name">{{ item.supplier_name }}</view> <!-- ({{item.supplier_name}}) -->
							<!-- 星星 -->
							<view class="layouts">
								<view>
									<view class="star" v-if="item.comment_ratio">
										<block v-for="(items,j) in item.src" :key="j">
											<image :src="items.icon" class="star"></image>
										</block>
									</view>
									<view class="star" v-else>暂无评分</view>
								</view>
								<!-- 配送时间和距离 -->
								<view class="meills">29分钟 | {{item.distance>=1000?(item.distance/1000).toFixed(1)+'km':item.distance}}</view>
							</view>
							<view class="buju">
								<!-- 配送费 -->
								<view class="moneys">起送￥{{item.low_price/100}} | {{item.base_price!='0'?'配送费:￥'+item.base_price/100+'元':'免配送费'}}</view>
								<!-- 是否配送 -->
								<view class="txtfw" v-if="item.is_ps==1">不在配送范围内</view>
							</view>
							<!-- 优惠券 -->
							<view class="blouck">
									<view :class="itemt.user_hav==1?'yhq1':'yhq2'" v-for="(itemt,k) in item.coupons" :key='k'>
										<text>{{itemt.deduct_cash/100}}元</text><text style="margin-left:10rpx">{{itemt.user_hav==1?'已领取':'领取'}}</text>
									</view>
							</view>
						</view>
					</view>
					<view class="group-btn">
						<view class="btn-div" v-for="(value, key) in button" :key="key" @click="clickMethod(item, value, index)" :style="{background: value.background}">{{value.title}}</view>
					</view>
					<view style="clear:both"></view>
				</view>
				<view class="list-item-border" v-if="border"></view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * m-slide-list 滑动操作列表
 * @description 滑动操作列表组件
 * @tutorial https://ext.dcloud.net.cn/plugin?id=209
 * @property {Array} list 数据源，格式为：[{title: 'xxx', image:'xxx', surname: 'xxx',detail:'xxx', rightDetail: 'xxx', slide_x: 0},{title: 'xxx', image:'xxx', surname: 'xxx',detail:'xxx', rightDetail: 'xxx', slide_x: 0}]
 * @property {Array} button 按钮数据源，格式为：[{title: 'xxx', background:'xxx'},{title: 'xxx', background:'xxx'}]
 * @property {Boolean} border 边框
 */
export default {
	name: 'mark-slide-list',
	props: {
		list: {//数据list
			type: Array,
			default() {
				return [];
				stars:[
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false},
					{icon:'../../static/star.png',icon1:'../../static/star1.png',flag:false}
				];//评价星星
			}
		},
		button: {//按钮数据list
			type: Array,
			default() {
				return [];
			}
		},
		border: {//边框
			type: Boolean,
			default: false
		}
	},
	computed: {
		windowWidth() {
			return uni.getSystemInfoSync().windowWidth;
		}
	},
	data() {
		return {
			listData: [],
			start_slide_x: 0,
			btnWidth: 0,
			startX: 0,
			LastX: 0,
			startTime: 0,
			itemIndex: 0,
			cdnUrl:''
		};
	},
	mounted() {
		this.listData = this.clone(this.list)
		this.cdnUrl=this.$cdnUrl
	},
	watch:{
		list:{
			handler:function(val,oldval){
				this.listData = this.clone(this.list)
			},
			deep:true
		}
	},
	methods: {
		clone(data) {
		    const type = typeof data
		    let obj;
		    if (type === 'array'){
		      obj = [];
		    } else if (type === 'object') {
		      obj = {};
		    } else {
		  // 不再具有下一层次
		      return data;
		    }
		    if (type === 'array'){
		      for (let i = 0, len = data.length; i < len; i++) {
		        obj.push(this.clone(data[i]));
		      }
		    } else if (type === 'object') {
		      // 对原型上的方法也拷贝了....
		      for (const key in data) {
		        obj[key] = this.clone(data[key]);
		      }
		    }
		    return obj;
		  },
		
		// 滑动开始
		touchStart(e, index) {
			if(this.itemIndex == index){
				this.itemIndex = index
			}
			//记录手指放上去的时间
			this.startTime = e.timeStamp;
			//记录滑块的初始位置
			this.start_slide_x = this.listData[index].slide_x;
			// 按钮宽度
			//#ifdef MP-WEIXIN
			uni.createSelectorQuery().in(this).selectAll('.group-btn').boundingClientRect(res => {
				if (res != null) {
					this.btnWidth = res[index].width * -1;
				}
			}).exec();
			//#endif
			//#ifdef H5 || APP-PLUS
			uni.createSelectorQuery()
				.selectAll('.group-btn')
				.boundingClientRect()
				.exec(res => {
					if (res[0] != null) {
						this.btnWidth = res[0][index].width * -1;
					}
				});
			//#endif
			// 记录上一次开始时手指所处位置
			this.startX = e.touches[0].pageX;
			// 记录上一次手指位置
			this.lastX = this.startX;
			//初始化非当前滑动消息列的位置			
			for (var i in this.listData) {
				if(index != i){
					this.listData[i].slide_x = 0;
				}
			}
		},
		// 滑动中
		touchMove(e, index) {
			const endX = e.touches[0].pageX;
			const distance = endX - this.lastX;
			// 预测滑块所处位置
			const duang = this.listData[index].slide_x + distance;
			// 如果在可行区域内
			if (duang <= 0 && duang >= this.btnWidth) {
				this.listData[index].slide_x = duang;
			}
			// 此处手指所处位置将成为下次手指移动时的上一次位置
			this.lastX = endX;
		},
		// 滑动结束
		touchEnd(e, index) {
			let distance = 10;
			const endTime = e.timeStamp;
			const x_end_distance = this.startX - this.lastX;
			if (Math.abs(endTime - this.startTime) > 200) {
				distance = this.btnWidth / -2;
			}
			// 判断手指最终位置与手指开始位置的位置差距
			if (x_end_distance > distance) {
				this.listData[index].slide_x = this.btnWidth;
			} else if (x_end_distance < distance * -1) {
				this.listData[index].slide_x = 0;
			} else {
				this.listData[index].slide_x = this.start_slide_x;
			}
		},
		// 点击回复原状
		recover(index) {
			this.listData[index].slide_x = 0;
		},
		/** 
		 * 点击按钮触发事件
		 * @param {Object} item 列表数据 
		 * @param {Object} buttonItem 按钮数据
		 * @param {Object} index 列表数据key
		 */
		clickMethod(item, buttonItem, index) {
			this.$emit("change", item, buttonItem, index)
		},
		/**
		 * 点击按钮触发事件
		 * @param {Object} item 列表数据 
		 */
		clickItemMethod(item){
			if(item.supplier_status=='2'){
				return this.holo.toast({
					title:'店铺已下架',
					'icon':'none'
				});
			}
			this.$emit("click", item)
		}
	}
};
</script>

<style lang="scss" scoped>
	
.container {
	// padding: 20rpx 0;
	.slide-box {
		width: 100%;
		overflow: hidden;
		.list-item-border{
			width: 100%;
			border-bottom: 1px solid #f2f2f2;
		}
		.slide-list {
			transition: all 100ms;
			transition-timing-function: ease-out;
			min-width: 200%;
			height: 240rpx;
			.uni-item--hover {
				background-color: #f1f1f1!important;
			}
			.now-message-info {
				position: relative;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				/* justify-content: space-between; */
				font-size: 24rpx;
				clear: both;
				height: 240rpx;
				padding: 0 30rpx;
				// margin-bottom: 20rpx;
				background: #ffffff;
				float: left;
				.icon-image{
					border-radius: 10rpx;
					width: 160rpx;
					height: 160rpx;
					float: left;
				}
				.img{
					position: relative;
					.icon-image{
						border-radius: 10rpx;
						width: 160rpx;
						height: 160rpx;
						float: left;
					}
					.layer{
						position: absolute;
						left: 50%;
						top: 50%;
						transform:translate(-50%,-50%);
						width: 150rpx;
						height: 50rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
				}
				.list-right {
					// float: right;
					margin-left: 25rpx;
					.list-title {
						width: 400rpx;
						font-size: 30rpx;
						line-height: 1.5;
						overflow: hidden;
						margin-bottom: 10rpx;
						color: #333;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					.list-detail {
						width: 350rpx;
						font-size: 14px;
						color: #FF3F3F;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					.layouts{
						font-weight: 400;
						color: #999999;
						margin-top: 20rpx;
						display: flex;
						justify-content: space-between;
						.star{
							display: flex;
							.yueshou{
								margin-left: 10rpx;
							}
							image {
								width: 22rpx;
								height: 22rpx;
								margin: 0 0 0 10rpx;
							}
						}
						.meills{
							margin-left: 100rpx;
						}
					}
					.buju {
						display: flex;
						// justify-content: space-between;
						.moneys {
							margin-top: 15rpx;
							font-weight: 400;
							color: #999999;
						}
						.txtfw{
							margin-left: 41rpx;
							margin-top: 15rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFC600;
						}
					}
					.blouck {
						display: flex;
						color: #FFFFFF;
						margin-top: 20rpx;
						margin-bottom: 10rpx;
						height: 38rpx;
						.yhq1 {
							background-image: url(../../static/quan1.png);
							background-size: 100% 100%;
							width: 154rpx;
							margin-right: 10rpx;
							text-align: center;
							line-height: 38rpx;
							color: #ff3b32;
							.txt {
								margin-left: 10rpx;
							}
						}
						.yhq2 {
							background-image: url(../../static/quan.png);
							background-size: 100% 100%;
							width: 154rpx;
							margin-right: 10rpx;
							text-align: center;
							line-height: 38rpx;
							.txt {
								margin-left: 10rpx;
							}
						}
					}
				}
				.list-right-1 {
					float: right;
					position: absolute;
					right: 30rpx;
					color: #a9a9a9;
				}
			}
			
			.group-btn {
				float: left;
				display: flex;
				flex-direction: row;
				height: 240rpx;
				min-width: 100rpx;
				align-items: center;
				.btn-div {
					height: 240rpx;
					color: #fff;
					text-align: center;
					padding: 0 50rpx;
					font-size: 34rpx;
					line-height: 240rpx;
				}
				.top {
					background-color: #c4c7cd;
				}
				.removeM {
					background-color: #ff3b32;
				}
			}
		}
	}
}
</style>
