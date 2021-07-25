<template>
	<view class="">
		<view class="top" :style="{height: detailData.height+ 'rpx'}">
			<view class="change" v-if="changeBtn.length==2" :style="{bottom:detailData.bottom}">
				<block v-for="(item,i) in changeBtn" :key="i">
					<view :class="i==currentChange?'selected':''" @click="getChange(item.index)">{{ item.name }}</view>
				</block>
			</view>
			<view class="change" v-else :style="{bottom:detailData.bottom}">
				<view class="selected" >{{ changeBtn[0].name }}</view>
			</view>
			<view v-if="showVideo" class="video">
				<video :src="cdnUrl+detailData.videoSrc" :poster="cdnUrl+detailData.video_cover" object-fit="fill" :controls="controls"></video>
			</view>
			<swiper v-if="showImg" class="banner_img" :autoplay="autoplay" :interval="interval" :duration="duration" circular="true">
				<block v-for="item in detailData.images" :key="index">
					<swiper-item >
						<view class="swiper-item"><image :src="cdnUrl+item" :style="{height: detailData.height+ 'rpx'}"></image></view>
					</swiper-item>
				</block>
			</swiper>
			<view v-if="showImg" class="total">共{{ detailData.images.length }}张</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['detailData','height'],
	data() {
		return {
			cdnUrl:'',
			controls:false,
			autoplay: true,
			interval: 2000,
			duration: 500,
			currentChange:'0',
			showVideo:true,
			showImg:false,
			changeBtn:[
				{index:'0',name:'视频'},
				{index:'1',name:'图片'}
			],
		};
	},
	created() {
		this.cdnUrl=this.$cdnUrl
		//判断是否显示视频
		console.log(this.detailData.videoSrc);
		if(this.detailData.videoSrc==''){
			this.showImg=true,
			this.showVideo=false
			this.changeBtn=[{index:'0',name:'图片'}]
			console.log(888);
		}
	},
	methods: {
		//切换视频图片
		getChange(e){
		    var index=e
		    if(index==1){
		      this.currentChange=index,
		      this.showImg=true,
		      this.showVideo=false
		    }else{
		      this.currentChange=index,
		      this.showImg=false,
		      this.showVideo=true
		    }
		 },
	}
};
</script>

<style lang="scss">
.top {
	  width: 100%;
	  position: relative;
	  .change {
	    position: absolute;
	    left: 50%;
	    transform: translateX(-50%);
	    display: flex;
	    z-index: 1111;
	    view {
	      width: 90rpx;
	      height: 40rpx;
	      line-height: 40rpx;
	      text-align: center;
	      background: rgba(153, 153, 153, .3);
	      border-radius: 30rpx;
	      font-size: 20rpx;
	      font-family: PingFang SC;
	      font-weight: 300;
	      color: rgba(255, 255, 255, 1);
	      margin: 0 10rpx;
	    }
	    .selected {
	      background: rgba(153, 153, 153, 1);
	    }
	  }
	  .video {
	    width: 100%;
	    height: 100%;
	    position: relative;
	    video {
	      width: 100%;
	      height: 100%;
	    }
	  }
	  .banner_img{
		  width: 100%;
		  height: 100%;
			image {
			  width: 100%;
			  height: 100%;
			}
	  }
	  .total {
	    position: absolute;
	    bottom: 80rpx;
	    right: 30rpx;
	    padding: 0 10rpx;
	    height: 30rpx;
	    line-height: 30rpx;
	    text-align: center;
	    color: #fff;
	    background: rgba(0, 0, 0, .3);
	    border-radius: 15rpx;
	    font-size: 20rpx;
	  }
	}
</style>