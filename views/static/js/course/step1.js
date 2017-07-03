define(["jquery", "util", "template", "ckeditor", "form"], function($, util, template, CKEDITOR){
	var csid = util.getQuery("id");

	//向后台发送请求，获取当前要编辑的这个课程信息

	$.ajax({
		url: "/api/course/basic",
		data: {cs_id: csid},
		success: function(data){
			if(data.code == 200){
				var html = template("step1-tpl", data.result);
				$(".steps").html(html);
				CKEDITOR.replace("brief");
			}
		}
	});


	$(".steps").on("submit", "form", function(){

		$(this).ajaxSubmit({
			url: "/api/course/update/basic",
			type: "post",
			success: function(data){
				if(data.code == 200){
					location.href = "/course/step2?id=" + data.result.cs_id;
				}
			}
		})

		return false;
	})

})