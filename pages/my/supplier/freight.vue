<template>
	<view>
		<view class="goodsName" @click="select" style="display: flex;justify-content: space-between;border-top:1px solid #f5f5f5;padding: 20rpx 0;">
			<view style=" font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">运费模板</view>
			<view class="right" style="display: flex;align-items: center;">
				<text style="margin: 0 20rpx;">{{name}}</text>
				<image src="../../../static/leftarrow.png" mode="" style="width:17rpx;height:32rpx;"></image>
			</view>
		</view>
		<view class="msk"  v-if="visible">
			<view class="showModel">
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item, index) in goods_sort" :key="index">{{ item.template_name }}</view>
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
			freight_index:'',
			template_name:'',
			value: [],
			indicatorStyle:'height:50px'
		};
	},
	props:['freight_id'],
	created(){
		this.getClassifyList();
	},
	methods: {
		select() {
			if(!this.goods_sort.length){
				return this.holo.toast({title:'请登录后台添加运费模板后再选择'})
			}
			this.visible = true;
		},
		// 获取商品分类
		getClassifyList(){
			this.request({
				url:'ugo/api/app.php?c=order/getFreightList'
			}).then(res=>{
				if(res.data.success){
					this.goods_sort = res.data.data;
				    if(this.goods_sort.length>0){
						if(this.freight_id){
						  this.goods_sort.forEach((item,index)=>{
							if(this.freight_id === item.freight_index){
								// this.val[0] = index;
								this.name=this.goods_sort[index].template_name
								this.template_name = this.goods_sort[index].template_name
								this.freight_index = this.goods_sort[index].freight_index;
							}
						  })	
						}
						this.template_name =  this.goods_sort[0].template_name;
						this.freight_index = this.goods_sort[0].freight_index;
					}else{
						
					}
				}
			})
		},
		bindChange(e) {
			console.log(e)
			let val1 = e.detail.value[0];
			this.template_name =  this.goods_sort[val1].template_name;
			this.freight_index = this.goods_sort[val1].freight_index;
			this.value = e.detail.value;
		},
		sure(){
			this.name = this.template_name ;
			this.visible = false;
			this.$emit('getfreight_id',this.freight_index)
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
