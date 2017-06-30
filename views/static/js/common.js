define(["jquery", "template","nprogress", "cookie"], function($, template, NProgress){
	
	NProgress.start();
	NProgress.done();

	$(document).ajaxStart(function(){
		NProgress.start();
	})

	$(document).ajaxStop(function(){
		NProgress.done();
	})

	$(function(){
		//判断当前页是不是在登录页面，如果是就不做如下的操作
		if("/dashboard/login" != location.pathname){
			//完善登录功能，当用户处于未登录状态的时候，需要让用户直接跳转到登录页面
			if(!$.cookie("PHPSESSID")){
				location.href = "/dashboard/login";
			}else{
				//从cookie中获取登录成功后存储的用户信息
		        var userInfo = JSON.parse($.cookie("userinfo"))
		        var html = template("profile-tpl", userInfo);

		        //将模板渲染到页面中刚才挖坑的地方
		        $("#userinfo").html(html);
			}
		}  



		//退出登录的功能
		$("#logout").click(function(){
			$.ajax({
				url: "/api/logout",
				type: "post",
				success: function(data){
					if(data.code == 200){
						location.href = "/dashboard/login";
					}
				}
			})
		});


		//如果给一个元素注册多个点击事件，那么这些点击事件在被触发的时候
		//会按照注册的顺序进行触发！


		//给导航栏所有的li加上点击事件，在点击的时候，让当前背景色变暗
		$(".navs>ul>li").click(function(){
			$(this).children("a").addClass("active");
			$(this).siblings().children("a").removeClass("active");
		});


		//导航栏二级菜单显示功能
		$(".navs>ul>li>ul").parent().click(function(){
			//显示出来二级菜单
			var $ul = $(this).children("ul");
			$ul.slideToggle();

			//找二级菜单下的a标签如果有选中的就把当前li的active给取消掉
			if($ul.find("a.active").length > 0){
				$(this).children("a").removeClass("active");
			}
		});

		

		//让当前页面对应的导航栏菜单变暗
		$(".navs a").each(function(i, v){
			if($(v).attr("href") == location.pathname){
				$(v).addClass("active");
				$(v).parent().parent().slideDown();
			}
		});
    })
})