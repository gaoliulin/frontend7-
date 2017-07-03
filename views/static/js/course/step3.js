define(["jquery", "template", "util"], function($, template, util){
	var csid = util.getQuery("id");
	$.ajax({
		url: "/api/course/lesson",
		type: "get",
		data: {
			cs_id: csid
		},
		success: function(data){
			if(data.code == 200){
				var html = template("step3-tpl", data.result);
				$(".steps").html(html);
			}
		}
	})
})