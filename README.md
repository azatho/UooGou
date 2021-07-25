#uoogou

**网络相关的使用**
**CDN域名的使用**
  ```
    this.$cdnUrl
  ```

 **域名的使用**
 ```
    this.$baseUrl
 ```

**代码示例:**
```
	 this.request({
		  url:'api.php?c=getIndex',  //注意前边不能加域名
		  type:"POST", //默认GET
		  loading:true,//开启加载动画，请求成功会自动关闭，默认开启
		 data:{
			  id:1
		  }
	 }).then(res=>{
		  //接口请求成功的回调
	 }).catch(error){
		  //接口错误
	 }
```

**工具类的方法：**
| 方法名  |          说明              |

| formatTime | 时间格式化（带时分秒）   |

| formatdate | 日期格式化（没有时分秒）  |


| getDay | 获取某一天的时间 day:0 代表今天 1 代表明天） |


| filterSpace | 检测过滤空格 |


| showModal | 模态框 |


| toast | 消息提示 |


| loading | 加载loading |


| hideLoding | 关闭loading |

###所有的工具类里边的方法都是通过 this.holo.方法名();

 **例如：时间戳转换：**
 ```
     this.holo.formatTime(16888930112)  
 ```

**模态框**
```
	 this.holo.showModal({
		  title:'标题',
		  content:'确认删除吗？',
		  success(res){ //成功的回调
			 if(res.confirm){
				//用户点击了确认 
			 }else if(res.cancel){
				 //用户点击了取消
			 }
		  }
	 })
```

**消息提示**
```
      this.holo.toast({
		  title:'已完成'
	  })
```

**加载loading**
```
 this.holo.loading();
```

**关闭loading**
```
  this.holo.hideLoding();
```

**方法都封装在pages/until/app.js,如果需要增加方法的话，直接在ToolClass里边添加就行。**

**微信授权的获取code**

```
this.getCode({
        scope:redirec_url或者scope,
        suceess(code){
                //code
        }
});

redirec_url:重定向地址；
 
scope: snsapi_base微信静默授权，只能获取openid;  snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
注意：必须在onload里边调用
```

1