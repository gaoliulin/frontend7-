define(["jquery", "template", "util", "bootstrap", "form"], function($, template, util){
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

	$(".steps").on("click", "#addlessonbtn", function(){
		var html = template("lesson-tpl", {
			ct_cs_id: csid,
			title: "添加课时",
			buttonText: "添 加",
			type: "add"
		});
		$(".modal-content").html(html);
		$("#chapterModal").modal("show");
	})

	$(".modal-content").on("click", "#saveBtn", function(){
		var type = $(this).data("type");

		var isfree = 0;
		if($("#isfree").prop("checked")){
			isfree = 1;
		}

		var url = "/api/course/chapter/add"
		if(type == "edit"){
			url = "/api/course/chapter/modify"
		}

		$("form").ajaxSubmit({
				url: url,
				type: "post",
				data: {
					ct_is_free: isfree
				},
				success: function(data){
					if(data.code == 200){
						$("#chapterModal").modal("hide");
						//局部刷新课时列表信息
						//向后台发送请求，重新渲染课时列表内容
						$.ajax({
							url: "/api/course/lesson",
							data: {cs_id: csid},
							success: function(data){
								if(data.code == 200){
									var html = template("lessons-list-tpl", data.result);
									$(".lessons").html(html);
									$("dd:contains(课时：)").text("课时：" + data.result.lessons.length);
								}
							}
						})
					}
				}
		})
		

		
	});

	$(".steps").on("click", ".edit-btn", function(){
		//1. 获取当前正在编辑的课时的详细信息
		var ctid = $(this).data("id");
		//发送请求
		$.ajax({
			url: "/api/course/chapter/edit",
			data: {ct_id: ctid},
			success: function(data){
				if(data.code == 200){
					//渲染模态框的模板
					data.result.title = "编辑课时";
					data.result.buttonText = "保 存";
					data.result.type = "edit";
					var html = template("lesson-tpl", data.result);
					$(".modal-content").html(html);
					$("#chapterModal").modal("show");
				}
			}
		})
	})
})