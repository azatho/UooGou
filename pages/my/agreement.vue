<!-- 注册协议页面  -->
<template>
	<view>
		<rich-text :nodes="strings"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				strings:'',
				region:'',
			}
		},
		methods: {
			init(){
				let self = this
				self.request({
					url:'ugo/api/app.php?c=news/protocolInfo',
					data:{
						region:self.region
					}
				}).then(res=>{
					if(res.data.success){
						self.strings=res.data.data.htmlString
					}
				})	
			},
		},
		onLoad(options) {
			if(options.type=='1'){
				this.region='15'
			}
			if (options.type=='0'){
				this.region='20'
			}
			if (options.type=='2'){
				this.region='21'
			}
			this.init()
		}
	}
</script>

<style>
page{
	margin: 0 30rpx;
}
</style>
