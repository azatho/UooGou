<!-- 相关协议 列表副本-->
<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad(option){
			this.src=this.$cdnUrl+option.src
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
