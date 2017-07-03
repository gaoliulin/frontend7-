define(["jquery", "util", "template", "form"], function($, util, template){
	var csid = util.getQuery("id");

	//向后台发送请求，获取当前要编辑的这个课程信息

	$.ajax({
		url: "/api/course/basic",
		data: {cs_id: csid},
		success: function(data){
			if(data.code == 200){
				var html = template("step1-tpl", data.result);
				$(".steps").html(html);
			}
		}
	});

})