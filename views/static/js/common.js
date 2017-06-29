define(["jquery", "template", "cookie"], function($, template){
	$(function(){
		//判断当前页是不是在登录页面，如果是就不做如下的操作
		if("/dashboard/login" != location.pathname){
			//从cookie中获取登录成功后存储的用户信息
	        var userInfo = JSON.parse($.cookie("userinfo"))
	        var html = template("profile-tpl", userInfo);

	        //将模板渲染到页面中刚才挖坑的地方
	        $("#userinfo").html(html);
		}  
    })
})