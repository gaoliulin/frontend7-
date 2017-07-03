define(["jquery", "template"], function($, template){
	//1. 请求列表数据，渲染到页面中
	$.ajax({
		url: "/api/course",
		success: function(data){
			if(data.code == 200){
				var html = template("courses-tpl", data);
				$(".courses").html(html);
			}
		}
	});
})