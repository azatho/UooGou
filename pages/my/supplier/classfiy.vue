<template>
	<view>
		<view class="goodsName" @click="select" style="display: flex;justify-content: space-between;border-top:1px solid #f5f5f5;padding: 20rpx 0;">
			<view style=" font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">商品分类</view>
			<view class="right" style="display: flex;align-items: center;">
				<text style="margin: 0 20rpx;">{{name}}</text>
				<image src="../../../static/leftarrow.png" mode="" style="width:17rpx;height:32rpx;"></image>
			</view>
		</view>
		<view class="msk" v-if="visible">
			<view class="showModel">
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item, index) in goods_sort" :key="index">{{ item.name }}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in goods_sort2" :key="index">{{ item.name  }}</view>
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
			goods_sort2:[],
			name:'请选择',
			sortId1:'',
			sortId2:'',
			sortName1:'',
			sortName2:'',
			value: [0, 0],
			indicatorStyle:'height:50px'
		};
	},
	props:['ids1','ids2'],
	created(){
		this.getClassifyList();
	},
	methods: {
		select() {
			if(!this.goods_sort.length){
				return this.holo.toast({title:'请登录后台添加产品分类后再选择'})
			}
			this.visible = true;
		},
		// 获取商品分类
		getClassifyList(){
			this.request({
				url:'ugo/api/app.php?c=supplier/getClassifyList'
			}).then(res=>{
				if(res.data.success){
					this.goods_sort = res.data.data;
					this.goods_sort2 = res.data.data[0].good_class2
					this.sortId1 = res.data.data[0].id;
					this.sortName1 = res.data.data[0].name;
					if(res.data.data[0].good_class2[0]){
						this.sortId2 = res.data.data[0].good_class2[0].id;
						this.sortName2 = res.data.data[0].good_class2[0].name;	
					};
					if(this.ids1){
						this.goods_sort.forEach((item,index)=>{
							if(item.id===this.ids1){
								this.value[0] = index;
							    this.goods_sort2 = res.data.data[index].good_class2
								this.sortName1 = this.goods_sort[index].name;
							}
						})
						this.goods_sort2.forEach((item,index)=>{
							if(item.id===this.ids2){
								this.value[1] = index;
								this.sortName2 = this.goods_sort2[index].name;
							}
						})
						if(this.ids2==''){
							this.sortName2 = '';
						}
						this.name = this.sortName1 + '/' + this.sortName2;
					}
				}
			})
		},
		bindChange(e) {
			let val1 = e.detail.value[0];
			let val2 = e.detail.value[1];
			if (val1 != this.value[0]) {
				this.goods_sort2 = this.goods_sort[val1].good_class2;
				this.sortId1 = this.goods_sort[val1].id;
				this.sortName1 = this.goods_sort[val1].name;
				if(this.goods_sort[val1].good_class2.length){
					this.sortId2 = this.goods_sort[val1].good_class2[0].id;
					this.sortName2 = this.goods_sort[val1].good_class2[0].name;
				}else{
					this.sortId2 = '';
					this.sortName2 = '';
				}
			} else if (val2 != this.value[1] && this.goods_sort[val1].good_class2.length) {
				this.sortId2 = this.goods_sort[val1].good_class2[val2].id;
				this.sortName2 = this.goods_sort[val1].good_class2[val2].name;
			}
			this.value = e.detail.value;
		},
		sure(){
			this.name = this.sortName1 + '/' + this.sortName2;
			this.visible = false;
			this.$emit('getValue',{
				id1:this.sortId1,
				id2:this.sortId2,
				name1:this.sortName1,
				name2:this.sortName2
			})
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
		color: red;
	}
}
</style>
