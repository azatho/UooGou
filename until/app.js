
const appid = 'wx330402ca48f3af03'; //公众号appid

//本地环境
// uni.setStorageSync('lng','113.66072');
// uni.setStorageSync('lat','34.79977'); 
// 这个token 从微信公众号网页环境里拿

// uni.setStorageSync('token','5898443257126110703'); //供应商的token
// uni.setStorageSync('token','4810097748342913148'); 
// uni.setStorageSync('token','4810069025655403169'); 

// const baseUrl = 'http://test.jianyunkeji.net/';   
// const cdnUrl = 'https://cdn.jianyunkeji.net/';

//测试服环境
// const baseUrl = window.location.origin + '/';  
// const cdnUrl = 'https://cdn.jianyunkeji.net/';

//正式服环境
const baseUrl = window.location.origin + '/';
const cdnUrl = 'https://cdn.jianyunkeji.cn/';

 
const request = function(options) {
		if (!options.data) { 
			options.data = {};
		}
		if (!options.data.token) {
			options.data.token = uni.getStorageSync('token')
		};
		if (options.loading || options.loading === undefined) {
			// holo.loading();
		}
		return new Promise((res, rej) => {
				uni.request({
						url: baseUrl + options.url,
						data: options.data,
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
							"Access-Control-Allow-Origin": "*"
						},
						method: options.type || 'GET',
						dataType: 'json',
						success: function(data) {
							// if (data.data.cmd == 'popup_to_login') {
								// uni.showModal({
								// 	content:'未登录，请先登录',
								// 	success:function(res) {
								// 		if (res.confirm) {
								// 			uni.switchTab({
								// 				url:'/pages/my/my'
								// 			})
								// 		} else if (res.cancel) {
								// 		   uni.switchTab({
								// 			url:'/pages/index/index'
								// 		   })
								// 		}
								// 	}
								// })
								// uni.clearStorageSync('token');
								// holo.hideLoding();
							// } else
							if(data.data.cmd=='popup_to_login' || data.data.cmd=='popup_to_affirm'){
								uni.clearStorageSync('token');
								uni.switchTab({
									url:'/pages/my/my'
								})
							}else {
								res(data);
							}
						},
						fail: function(data) {
							rej(data)
						} 
						})
				})
		}

		// uni.setStorageSync('token','5888977165041131296'); 
		 // uni.setStorageSync('token','5888977165041130709'); 
		

		// h5调用微信授权==>获取code
		let getCode = (scope,url) => {
			let redirect_uri = ''
			if(url){
				redirect_uri = url;
			}else{
				redirect_uri = window.location.href;
			}
			window.location.href =
				`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${scope}&state=123&connect_redirect=1#wechat_redirect`;
		};
		//方法:用来提取code
		let getUrlCode = (name) => {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
		};
		/*工具类*/
		class ToolClass {
			constructor() {

			};
			formatSeconds(date,link) {
				link?link:link='-'
				date = new Date(date * 1000);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				var d = date.getDate();
				var h = date.getHours();
				var m1 = date.getMinutes();
				var s = date.getSeconds();
				h = h < 10 ? ("0" + h) : h;
				m1 = m1 < 10 ? ("0" + m1) : m1;
				s = s < 10 ? ("0" + s) : s;
				m = m < 10 ? ("0" + m) : m;
				d = d < 10 ? ("0" + d) : d;
				return y + link + m + link + d + ' '+ h + ":" + m1 + ':' + s
			}
			//日期+时间
			formatTime(date) {
				date = new Date(date);
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()
				const hour = date.getHours()
				const minute = date.getMinutes()
				const second = date.getSeconds()

				return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(
					':')
			};
			//日期格式化
			formatdate(date) {
				date = new Date(date);
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()
				return [year, month, day].map(this.formatNumber).join('-');
			};
			formatNumber(n) {
				n = n.toString()
				return n[1] ? n : '0' + n
			};
			//获取某一天的时间 day:0 代表今天 1 代表明天
			getDay(day) {
				var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码
				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				return tYear + "-" + tMonth + "-" + tDate;
			};
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			};
			//检测过滤空格
			filterSpace = str => {
				return str.replace(/ /g, '')
			}

			formatNumber(n) {
				n = n.toString()
				return n[1] ? n : '0' + n
			}

			/*模态框*/
			showModal(obj) {
				uni.showModal({
					title: obj.title,
					content: obj.content,
					showCancel: obj.showCancel || true,
					cancelText: obj.cancelText || '取消',
					success: (res) => {
						obj.success(res);
					},
					fail: () => {
						obj.fail();
					}
				})
			}
			/*消息提示*/
			toast(obj) {
				uni.showToast({
					title: obj.title,
					icon: obj.icon || 'none',
					image: obj.image || '',
					mask: obj.mask || true,
					duration: obj.duration || 1500,
					position: obj.position || 'center',
					success: function() {
						console.log('ok')
					},
					fail: function() {
						console.log('error')
					}
				})
			};
			// 加载loading
			loading() {
				uni.showLoading({
					title: '加载中'
				});
			};
			// 关闭loading
			hideLoding() {
				uni.hideLoading();
			};
			//倒计时函数
			countdown(residue){
				let hour = Math.floor(residue/(60*60))//获取剩余小时
				let minutes = Math.floor(residue/60%60)//获取剩余分钟
				let seconds =Math.floor(residue%60) //获取秒
				hour = hour<10?'0'+hour:hour;
				 minutes = minutes<10?'0'+minutes:minutes;
				 seconds = seconds<10?'0'+seconds:seconds;
				return `${hour}:${minutes}:${seconds}`;
			};
		};
		const holo = new ToolClass();
		export {
			holo,
			request,
			baseUrl,
			cdnUrl,
			getCode,
			getUrlCode
		};
