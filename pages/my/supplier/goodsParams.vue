<template>
	<view>
		<h2 class="title">添加商品参数</h2>
		<view class="content">
			<view class="" style="display: flex;">
				<view class="paramsTitle">参数名称</view>
				<view class="paramsTitle">对应值</view>
			</view>
			<view class="iptContent" v-for="(item,index) in goods_params" :key="index">
				<view class="" style="width: 50%;">
					<input type="text" data-attr="name" @input="getInputVal($event,index)" value="" placeholder="必填" style="font-size: 22rpx;"/>
				</view>
				<view style="display: flex;align-items: center;width: 50%;">
                     <input type="text" data-attr='val' @input="getInputVal($event,index)" value="" placeholder="必填"  style="font-size: 22rpx;"/>
					 <image src="../../../static/delParams.png" @click="delInput(index)" mode="" style="width: 36rpx;height: 36rpx;margin:30rpx 0 0 20rpx;"></image>
				</view>
			</view>   
			<image @click="addParams" src="../../../static/s1add.png" mode="" style="width: 216rpx;height:60rpx;display: block;margin-top: 30rpx;"></image>
		</view>  
		<view @click="confime" class="submit">确定</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goods_params:[],
			i:0
		};
	},
	methods: {   
		getInputVal(e,index){
			var attr = e.currentTarget.dataset.attr;
			this.goods_params[index][attr] = e.detail.value;
		},
		addParams(){
			this.goods_params.push({
				id:'',
				name:'',
				val:''
			})
		},
		delInput(index){
			this.goods_params.splice(index,1);
		},
		confime(){
			this.goods_params.forEach((item,index)=>{
				if(!item.name || !item.val){
				   uni.showToast({
						title:'内容不能为空',
						icon:'none'
					})
					return
				}
				item.id = index+1;
			})
			let pages = getCurrentPages();
			let page = pages[pages.length - 2];
			page.$vm.formData.goods_params = this.goods_params;
			uni.navigateBack({
				data:1
			})
		}
	}
};
</script>

<style scoped lang="scss">
.title {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	padding: 10rpx 30rpx;
}
.content {
	background: #FFF3E9;
	padding: 20rpx 30rpx;
	.paramsTitle{
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		width: 50%;
	}
	.iptContent{
		display: flex;
		align-items: center;
	}
	input{
		width: 240rpx;
		height: 60rpx;
		background-color: #fff;
		padding: 10rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
	}
}
.submit{
	width: 690rpx;
	height: 90rpx;
	text-align: center;
	line-height: 90rpx;
	margin: 50rpx auto;
	background: #FF862B;
	border-radius: 45px;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
}
</style>
