import Vue from 'vue';
import App from './App';
import '@/aliIcon/iconfont.css'
import './js_sdk/ican-H5Api/ican-H5Api.js'
import uView from "uview-ui";
Vue.use(uView);
// import {request,cdnUrl,baseUrl,formatTime,formatdate,fmoney} from './until/app.js'
var {request,holo,baseUrl,cdnUrl,getCode,getUrlCode} = require('./until/app.js');
Vue.config.productionTip = false;
Vue.prototype.request = request;
Vue.prototype.holo = holo;
Vue.prototype.$cdnUrl = cdnUrl; 
Vue.prototype.$baseUrl = baseUrl; 
Vue.prototype.getCode = getCode; 
Vue.prototype.getUrlCode = getUrlCode; 
// document.title=""
App.mpType = 'app'
const app = new Vue({
    ...App
})

// 分转换成元的函数(固定保留两位小数)
const returnFloat= (value) => {
	let value1 = Math.round(parseFloat(value) * 100) / 10000;
	let xsd = value1.toString().split(".");
	if (xsd.length == 1) {
		value1 = value1.toString() + ".00";
		return value1;
	}
	if (xsd.length > 1) {
		if (xsd[1].length < 2) {
			value1 = value1.toString() + "0";
		}
		if (xsd[1].length>2){
			value1=xsd[0]+'.'+xsd[1].slice(0,2)
		}
		return value1;
	}
}
Vue.prototype.$returnFloat = returnFloat;

app.$mount()
