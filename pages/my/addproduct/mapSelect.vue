<template>
	<view style="width: 100%;height: 100%;">
		<iframe id="mapPage" width="100%" height="100%" frameborder=0 
		src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&mapdraggable=1&coordtype=1&key=HCIBZ-E2KRQ-EYC5D-GXC6H-7DYL5-ARFZ5&referer=爱家优购">
		</iframe>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				locData:'',
			};
		},
		created() {
			window.addEventListener('message', function(event) {
				console.log(event)
				// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
				var loc = event.data;
				if (loc && loc.module == 'locationPicker') { //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
					
				}
			}, false);
		},
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}
</style>
