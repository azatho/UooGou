<template>
	<view>
		<view class="goodsName" @click="select" style="display: flex;justify-content: space-between;border-top:1px solid #f5f5f5;padding: 20rpx 0;">
			<view style=" font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">物流公司</view>
			<view class="right" style="display: flex;align-items: center;">
				<text style="margin: 0 20rpx;">{{name}}</text>
				<image src="../../../static/leftarrow.png" mode="" style="width:17rpx;height:32rpx;"></image>
			</view>
		</view>
		<view  class="msk" v-if="visible">
			<view class="showModel">
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item, index) in goods_sort" :key="index">{{ item.express_name }}</view>
					</picker-view-column>
				</picker-view>
				<view class="btns">
					<view class="cancel" @click="cancel">取消</view>
					<view :class="falg?'sure':''" @click="sure">确定</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			falg:true,
			goods_sort:[],
			name:'请选择',
			express_name:'',
			value: [0],
			indicatorStyle:'height:50px'
		};
	},
	created(){
		this.getClassifyList();
	},
	methods: {
		select() {
			this.visible = true;
		},
		// 获取商品分类
		getClassifyList(){
			this.request({
				url:'ugo/api/app.php?c=supplier/expressListV1'
			}).then(res=>{
				if(res.data.success){
					this.goods_sort = res.data.data;
				    if(this.goods_sort.length){
						this.express_name =  this.goods_sort[0].express_name;
					}
				}
			})
		},
		bindChange(e) {
			let val1 = e.detail.value[0];
			this.express_name =  this.goods_sort[val1].express_name;
			this.value = e.detail.value;
		},
		sure(){
			this.name = this.express_name ;
			this.visible = false;
			this.$emit('getfreight_id',this.express_name)
		},
		cancel(){
			this.visible = false;
		}
	}
	
};
</script>

<style lang="scss" scoped>
	.msk{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top:0;
		z-index: 1000;
		background: rgba(0,0,0,.5);
	}
.showModel {
	width: 100%;
	height: 700rpx;
	position: fixed;
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
		color: red;
	}
}
</style>
