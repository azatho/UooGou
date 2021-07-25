<template>
	<view style="background:#F5F5F5;padding: 10rpx 0rpx;font-size: 26rpx;color: #999999;font-family: PingFang SC;font-weight: 400;">
		<view style="padding: 10rpx 30rpx;">基本信息</view>
		<view class="goodsTop">
			<view class="goodsName">
				<view>商品名称</view>
				<input v-model="formData.goods_name" type="text" value="" placeholder="请输入商品名称" />
			</view>
			<classfiy @getValue="getVal" :ids1="formData.goods_sort" :ids2="formData.goods_sort2"></classfiy>
			<freight :freight_id="formData.freight_id" @getfreight_id="getfreight_id"/>
			<view class="goodsName">
				<view>商品重量（kg）</view>
				<input v-model="formData.good_weight" type="text" value="" placeholder="请输入" />
			</view>
		</view>
		<!-- 商品主图 -->
		<view class="" style="margin-top:20rpx;background: #fff;display: flex;justify-content: space-between;align-items: center;padding: 10rpx 30rpx;">
			<view class="">
				<h2 style="color: #222222;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;">商品主图</h2>
				<p style="margin-top:10rpx;font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">1.建议比例1:1</p>
				<p style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">2.为保证质量，单张大小不小于500KB</p>
			</view>
			<view class="" style="width: 120rpx;height: 120rpx;position: relative;">
				<image @click="upimg" :src="!formData.goods_icon ? uploadImg : $cdnUrl + formData.goods_icon" style="width: 120rpx;height: 120rpx;" mode="aspectFill"></image>
				<image
					@click="delGoods_icon"
					v-if="formData.goods_icon"
					src="../../../static/caca.png"
					mode=""
					style="width:36rpx;height:36rpx;position: absolute;right: -14rpx;top:-14rpx;"
				></image>
			</view>
		</view>
		<!-- 上传视频  -->
		<view class="" style="margin-top:20rpx;background: #fff;display: flex;justify-content: space-between;align-items: center;padding: 10rpx 30rpx;">
			<view class="">
				<h2 style="color: #222222;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;">上传视频（选填）</h2>
				<p style="margin-top:10rpx;font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">1.建议比例16:9</p>
				<p style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">2.为保证质量，建议大小为20MB</p>
			</view>
			<view class="" style="width: 120rpx;height: 120rpx;position: relative;">
				<image v-if="!formData.goods_video" @click="upvideo" :src="uploadVideo" style="width: 120rpx;height: 120rpx;" mode="aspectFill"></image>
				<video v-if="formData.goods_video" :src="$cdnUrl + formData.goods_video" style="width: 120rpx;height: 120rpx;" controls></video>
				<image
					@click="delGoods_video"
					v-if="formData.goods_video"
					src="../../../static/caca.png"
					mode=""
					style="width:36rpx;height:36rpx;position: absolute;right: -14rpx;top:-14rpx;"
				></image>
			</view>
		</view>
		<!-- 视频封面 -->
		<view class="" style="background: #fff;display: flex;justify-content: space-between;align-items: center;padding: 10rpx 30rpx;">
			<view class="">
				<h2 style="color: #222222;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;">上传视频封面（选填）</h2>
				<p style="margin-top:10rpx;font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">1.建议比例1:1</p>
				<p style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">2.为保证质量，单张大小不小于500KB</p>
			</view>
			<view class="" style="width: 120rpx;height: 120rpx;position: relative;">
				<image
					@click="upVideoImg"
					:src="!formData.goods_video_cover ? uploadImg : $cdnUrl + formData.goods_video_cover"
					style="width: 120rpx;height: 120rpx;"
					mode="aspectFill"
				></image>
				<image
					@click="delGoods_VideoImg"
					v-if="formData.goods_video_cover"
					src="../../../static/caca.png"
					mode=""
					style="width:36rpx;height:36rpx;position: absolute;right: -14rpx;top:-14rpx;"
				></image>
			</view>
		</view>
		<!-- 商品相册 -->
		<view class="" style="background: #fff;padding: 15rpx 30rpx;margin-top: 10rpx;">
			<h2 style="color: #222222;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;">商品相册（最多上传5张）</h2>
			<p style="margin-top:10rpx;font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">1.建议比例1:1,建议尺寸大小：800*800px</p>
			<p style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">2.为保证质量，单张大小不小于500KB</p>
			<view class="" style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
				<view class="" v-for="(item, index) in goods_img" style="margin-right:15rpx;width: 120rpx;height: 120rpx;position: relative;">
					<image :src="$cdnUrl + item" style="width: 120rpx;height: 120rpx;" mode="aspectFill"></image>
					<image
						@click="delGoodsList(index)"
						src="../../../static/caca.png"
						v-if="item"
						mode=""
						style="width:36rpx;height:36rpx;position: absolute;right: -14rpx;top:-14rpx;"
					></image>
				</view>
				<view class="" v-if="goods_img.length < 5"><image @click="upGoodsImgList" :src="uploadImg" style="width: 120rpx;height: 120rpx;" mode="aspectFill"></image></view>
			</view>
		</view>
		<!-- 金额设置 -->
		<view style="padding: 5rpx 30rpx;">规格及库存</view>
		<view class="goodsTop">
			<view class="goodsName" style="display: flex;align-items: center;">
				<view>市场价（元）</view>
				<input v-model="formData.goods_price" type="text" value="" placeholder="请输入" />
			</view>
			<!-- <checkbox-group @change="radioChange"> -->
				<view class="goodsName" style="display: flex;align-items: center;">
					<view>
						<!-- <checkbox value="0" color="red" :checked="formData.goods_type == '0' || formData.goods_type == '2' ? true : false" /> -->
						<text>售价（元）</text>
					</view>
					<input v-model="formData.goods_cost" type="text" value="" placeholder="请输入" />
				</view>
		<!-- 		<view class="goodsName" style="display: flex;align-items: center;">
					<view style="display: flex;align-items: center;">
						<checkbox value="1" color="red" :checked="formData.goods_type == '1' || formData.goods_type == '2' ? true : false" />
						<text>现金+积分</text>
					</view> -->
	<!-- 				<view class="" style="flex: 1;display: flex;">
						<text style="text-align: right;width: 200rpx;">现金</text>
						<input style="text-align:left;margin-left: 30rpx;" v-model="formData.goods_score_cost" type="text" value="" placeholder="请输入" />
						<text>积分</text>
						<input type="text" v-model="formData.goods_integral" style="text-align: left;margin-left: 30rpx;" value="" placeholder="请输入" />
					</view> -->
				<!-- </view> -->
			<!-- </checkbox-group> -->
			<view class="goodsName" style="display: flex;align-items: center;">
				<view>可订货库存</view>
				<input v-model="formData.sku_inventory" type="text" value="" placeholder="请输入" />
			</view>
			<view class="goodsName" style="display: flex;align-items: center;">
				<view>仓库实际库存</view>
				<input v-model="formData.sku_repertory" type="text" value="" placeholder="请输入" />
			</view>
			<!-- 属性图片 -->
			<view class="" style="margin-top:20rpx;background: #fff;display: flex;justify-content: space-between;align-items: center;padding-bottom: 20rpx;">
				<view class="">
					<h2 style="color: #222222;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;">属性图片</h2>
					<p style="margin-top:10rpx;font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">1.建议比例1:1</p>
					<p style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">2.为保证质量，单张大小不小于500KB</p>
				</view>
				<view class="" style="width: 120rpx;height: 120rpx;position: relative;">
					<image
						@click="upAttributeimg"
						:src="!formData.sku_pic ? uploadImg : $cdnUrl + formData.sku_pic"
						style="width: 120rpx;height: 120rpx;"
						mode="aspectFill"
					></image>
					<image
						@click="delAttributeimg"
						v-if="formData.sku_pic"
						src="../../../static/caca.png"
						mode=""
						style="width:36rpx;height:36rpx;position: absolute;right: -14rpx;top:-14rpx;"
					></image>
				</view>
			</view>
		</view>
		<view style="padding: 5rpx 30rpx;">图文介绍</view>
		<view class="" style="background: #fff;padding: 15rpx 30rpx;margin-top: 10rpx;">
			<h2 style="color: #222222;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;">图文介绍（最多上传5张）</h2>
			<p style="margin-top:10rpx;font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">1.建议比例1:1,建议尺寸大小：800*800px</p>
			<p style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">2.为保证质量，单张大小不小于500KB</p>
			<view class="" style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
				<view class="" v-for="(item, index) in goods_desc" style="margin-right:15rpx;width: 120rpx;height: 120rpx;position: relative;">
					<image :src="$cdnUrl + item" style="width: 120rpx;height: 120rpx;" mode="aspectFill"></image>
					<image
						@click="delGoodsDescList(index)"
						src="../../../static/caca.png"
						v-if="item"
						mode=""
						style="width:36rpx;height:36rpx;position: absolute;right: -14rpx;top:-14rpx;"
					></image>
				</view>
				<view class="" v-if="goods_desc.length < 5">
					<image @click="upGoods_descList" :src="uploadImg" style="width: 120rpx;height: 120rpx;" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view style="padding: 5rpx 30rpx;">参数管理</view>
		<view @click="selectParams" style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 30rpx;background-color: #fff;">
			<view>
				<p style="color: #333333;font-weight: 400;font-family: PingFang SC;font-size: 26rpx;font-family: PingFang SC;">商品参数(选填)</p>
				<p>商品包装、尺寸、储存方式、保质期等</p>
			</view>
			<image src="../../../static/leftarrow.png" mode="" style="width: 17rpx;height: 32rpx;"></image>
		</view>
		<view
			@click="addGoodsSub"
			style="width: 690rpx;height: 90rpx;
color: #FFFFFF;
font-weight: 500;
font-family: PingFang SC;
font-size: 30rpx;text-align: center;border-radius: 45rpx;background: #FF862B;line-height: 90rpx;margin: 60rpx auto;"
		>
			提交
		</view>
	</view>
</template>

<script>
import classfiy from './classfiy.vue';
import freight from './freight.vue'
export default {
	components: {
		classfiy,
		freight
	},
	data() {
		return {
			uploadImg: '../../../static/uploadImg.png',
			uploadVideo: '../../../static/uploadVideo.png',
			goods_img: [],
			goods_desc: [],
			formData: {
				goods_index: '',
				sku_index: '',
				good_weight:'',
				freight_id:'',	
				goods_name: '',
				goods_sort: '', //一级分类
				goods_sort2: '', //二级分类
				goods_icon: '',
				goods_video: '',
				goods_video_cover: '',
				goods_img: '',
				goods_price: '', //商品市场价 元
				goods_cost: '', //商品售价元
				use_supplier_score: '0', //是否支持销售积分 0 支持 1不支持
				goods_type: '0', //0 只支持现金 1 支持现金加积分
				goods_score_cost: '', //积分售价
				goods_integral: '', //积分
				sku_repertory: '', //实际库存
				sku_inventory: '', //可订货库存
				goods_desc: '',
				sku_pic: '', //属性图片
				goods_params: [] //商品参数
			}
		};
	},
	onShow() {
		// if(uni.getStorageSync('prouct')){
		// 	this.formData = JSON.parse(uni.getStorageSync('prouct'));
		// 	this.goods_img = this.formData.goods_img && this.formData.goods_img.split(',') || [];
		// 	this.goods_desc = this.formData.goods_desc && this.formData.goods_desc.split(',') || [];
		// 	uni.removeStorageSync('prouct');
		// }
	},
	onLoad(e) {
		if (e.goods_index) {
			this.formData.goods_index = e.goods_index;
			this.formData.sku_index = e.sku_index;
			this.getSupplierGoodsInfo();
		}
	},
	onUnload() {
		// this.formData.goods_img = this.goods_img.join(',');
		// this.formData.goods_desc = this.goods_desc.join(',');
		// uni.setStorageSync('prouct',JSON.stringify(this.formData));
	},
	methods: {
		//编辑反显商品
		getSupplierGoodsInfo() {
			this.request({
				url: 'ugo/api/app.php?c=supplier/getSupplierGoodsInfo',
				data: {
					goods_index: this.formData.goods_index,
					sku_index: this.formData.sku_index
				}
			}).then(res => {
				if (res.data.success) {
					this.formData = res.data.data;
					this.formData.goods_cost==0?this.formData.goods_cost='':this.formData.goods_cost
					this.formData.goods_score_cost==0?this.formData.goods_score_cost='':this.formData.goods_score_cost
					this.formData.sku_inventory==0?this.formData.sku_inventory='':this.formData.sku_inventory
					this.formData.sku_repertory==0?this.formData.sku_repertory='':this.formData.sku_repertory
					this.formData.good_weight==0.00?this.formData.good_weight='':this.formData.good_weight
					this.formData.goods_integral==0?this.formData.goods_integral='':this.formData.goods_integral
					this.formData.goods_price==0?this.formData.goods_price='':this.formData.goods_price
					this.goods_img = (this.formData.goods_img && this.formData.goods_img.split(',')) || [];
					this.goods_desc = (this.formData.goods_desc && this.formData.goods_desc.split(',')) || [];
				}
			});
		},
		getfreight_id(freight_id){
			console.log(111)
			this.formData.freight_id = freight_id;
		},
		//上传商品主图
		upimg() {
			var self = this;
			uni.chooseImage({
				success: chooseImageRes => {
					uni.showLoading({
						title: '正在上传',
						mask: true
					});
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: self.$baseUrl + '/ugo/api/mall.php?c=uploadCheckImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							uni.hideLoading();
							self.formData.goods_icon = JSON.parse(uploadFileRes.data).data;
						}
					});
				}
			});
		},
		//获取分类
		getVal(val) {
			this.formData.goods_sort = val.id1;
			this.formData.goods_sort2 = val.id2;
		},
		//删除商品主图
		delGoods_icon() {
			this.formData.goods_icon = '';
		},
		radioChange(e) {
			let value = e.detail.value;
			if(!value.length){
				this.formData.goods_type = ''
			}else if(value.length==2){
				this.formData.goods_type = 2
			}else if(value.length==1 && value[0] ==0){
				this.formData.goods_type =  0;
			}else if(value.length==1 && value[0] ==1){
				this.formData.goods_type = 1
			};
		},
		//上传视频
		upvideo() {
			let self = this;
			uni.chooseVideo({
				success: chooseVideo => {
					uni.showLoading({
						title: '正在上传',
						mask: true
					});
					const tempFilePaths = chooseVideo.tempFilePath;
					uni.uploadFile({
						url: self.$baseUrl + '/ugo/api/mall.php?c=uploadCheckImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths,
						name: 'file',
						success: uploadFileRes => {
							uni.hideLoading();
							self.formData.goods_video = JSON.parse(uploadFileRes.data).data;
						},
						fail(err) {
							console.log(err);
						}
					});
				}
			});
		},
		//删除视频
		delGoods_video() {
			this.formData.goods_video = '';
		},
		//视频封面
		upVideoImg() {
			var self = this;
			uni.chooseImage({
				success: chooseImageRes => {
					uni.showLoading({
						title: '正在上传',
						mask: true
					});
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: self.$baseUrl + '/ugo/api/mall.php?c=uploadCheckImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							uni.hideLoading();
							self.formData.goods_video_cover = JSON.parse(uploadFileRes.data).data;
						}
					});
				}
			});
		},
		//删除视频封面
		delGoods_VideoImg() {
			this.formData.goods_video_cover = '';
		},
		//上传商品相册
		upGoodsImgList() {
			var self = this;
			uni.chooseImage({
				success: chooseImageRes => {
					uni.showLoading({
						title: '正在上传',
						mask: true
					});
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: self.$baseUrl + '/ugo/api/mall.php?c=uploadCheckImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							uni.hideLoading();
							self.goods_img.push(JSON.parse(uploadFileRes.data).data);
						}
					});
				}
			});
		},
		//删除商品相册列表
		delGoodsList(index) {
			this.goods_img.splice(index, 1);
		},
		//上传属性图片
		upAttributeimg() {
			var self = this;
			uni.chooseImage({
				success: chooseImageRes => {
					uni.showLoading({
						title: '正在上传',
						mask: true
					});
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: self.$baseUrl + '/ugo/api/mall.php?c=uploadCheckImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							uni.hideLoading();
							self.formData.sku_pic = JSON.parse(uploadFileRes.data).data;
						}
					});
				}
			});
		},
		//删除属性图片
		delAttributeimg() {
			this.formData.sku_pic = '';
		},
		//图文介绍列表
		upGoods_descList() {
			var self = this;
			uni.chooseImage({
				success: chooseImageRes => {
					uni.showLoading({
						title: '正在上传',
						mask: true
					});
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: self.$baseUrl + '/ugo/api/mall.php?c=uploadCheckImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							uni.hideLoading();
							self.goods_desc.push(JSON.parse(uploadFileRes.data).data);
						}
					});
				}
			});
		},
		//删除属性图片
		delGoodsDescList(index) {
			this.goods_desc.splice(index, 1);
		},
		//选择商品参数
		selectParams() {
			if (typeof this.formData.goods_params === 'string') {
				uni.navigateTo({
					url: './goodsParams?goods_params=' + this.formData.goods_params
				});
			} else {
				uni.navigateTo({
					url: './goodsParams?goods_params=' + JSON.stringify(this.formData.goods_params)
				});
			}
		},
		addGoodsSub() {
			this.formData.goods_img = this.goods_img.join(',');
			this.formData.goods_desc = this.goods_desc.join(',');
			if (this.formData.goods_name == '') {
				return this.holo.toast({ title: '请输入商品名称' });
			} else if (this.formData.goods_sort == '') {
				return this.holo.toast({ title: '请选择商品分类' });
			}else if(this.formData.freight_id==''){
				return this.holo.toast({ title: '请选择运费模板'});
			}else if(this.formData.good_weight==''){
				return this.holo.toast({ title: '请输入商品重量'});
			} else if (this.formData.goods_icon == '') {
				return this.holo.toast({ title: '请上传商品图片' });
			} else if (this.formData.goods_img == '') {
				return this.holo.toast({ title: '请上传商品相册' });
			} else if (this.formData.goods_price == '') {
				return this.holo.toast({ title: '请输入市场价' });
			} else if (this.formData.goods_type == '0' && this.formData.goods_cost == '') {
				return this.holo.toast({ title: '请输入商品售价' });
			} else if (this.formData.goods_type == '1' && (this.formData.goods_score_cost == '' || this.formData.goods_integral == '')) {
				return this.holo.toast({ title: '现金和积分都不能为空' });
			} else if (this.formData.sku_inventory == '') {
				return this.holo.toast({ title: '请输入可订货库存' });
			} else if (this.formData.sku_repertory == '') {
				return this.holo.toast({ title: '请输入实际库存' });
			} else if (this.formData.sku_pic == '') {
				return this.holo.toast({ title: '请上传属性图片' });
			} else if (this.formData.goods_desc == '') {
				return this.holo.toast({ title: '请上传图文' });
			} else if (this.formData.goods_params == '') {
				return this.holo.toast({ title: '请填写商品规格' });
			}
			this.request({
				url: 'ugo/api/app.php?c=account/addEditGoods',
				type: 'POST',
				data: this.formData
			}).then(res => {
				if (res.data.success) {
					uni.redirectTo({
						url: 'editSuccess'
					});
				} else {
					this.holo.toast({ title: res.data.msg });
				}
			});
		}
	}
};
</script>

<style lang="scss">
.goodsTop {
	background-color: #fff;
	padding: 0 30rpx;
	.goodsName {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		view {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		input {
			text-align: right;
			flex: 1;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}
}
</style>
