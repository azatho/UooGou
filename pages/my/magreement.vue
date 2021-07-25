<!-- 管理注册协议页面 -->
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
			}
		},
		methods: {
			init(){
				let self = this
				self.request({
					url:'ugo/api/mall.php?c=registerProtocol',
				}).then(res=>{
					if(res.data.success){
						self.strings=res.data.data.htmlString
					}
				})	
			},
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style>
page{
	margin: 0 30rpx;
}
</style>
