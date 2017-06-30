define(["jquery", "template", "bootstrap"], function($, template){
	$.ajax({
		url: "/api/teacher",
		type: "get",
		success: function(data){
			if(data.code == 200){
				//使用模板渲染
				var html = template("teacher_list_tpl", data);

				$("#teacherlist").html(html);
			}
		}
	});


	//注册事件委托，实现点击查看按钮的事件
	$("#teacherlist").on("click", ".btn-check", function(){

		var tcid = $(this).parent().data("id");
		//给后台发送请求，获取当前讲师的最新数据
		$.ajax({
			url: "/api/teacher/view",
			type: "get",
			data: {tc_id: tcid},
			success: function(data){
				if(data.code == 200){
					//1. 将数据渲染到模态框中
					var html = template("teacher_modal_tpl", data.result);
					$("#teacherModal").html(html);
					//2. 展示模态框
					$("#teacherModal").modal("show");
				}
			}
		})
	})
});