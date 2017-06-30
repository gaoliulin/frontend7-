define(["jquery", "template","nprogress", "bootstrap"], function($, template, NProgress){
	$.ajax({
		url: "/api/teacher",
		type: "get",
		success: function(data){
			if(data.code == 200){
				//使用模板渲染
				var html = template("teacher_list_tpl", data);

				$("#teacherlist").html(html);
			}
		},
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


	//给注销和启用按钮注册点击事件
	$("#teacherlist").on("click", ".btn-onoff", function(){
		//获取当前用户当前的状态
		var status = $(this).data("status");

		var id = $(this).parent().data("id");

		var $that = $(this);

		//向后台发送请求
		$.ajax({
			url:'/api/teacher/handle',
			type: "post",
			data: {
				tc_id: id,
				tc_status: status
			},
			success: function(data){
				if(data.code == 200){

					//每次请求下来之后，将服务器返回的用户的状态，更新到我们注销启用按钮上
					$that.data("status", data.result.tc_status);
					
					//如果后台正常返回数据，那么证明当前用户的状态已经被修改
					//那么页面上的操作按钮，也应该进行对应的变化
					if(data.result.tc_status == 1){
						$that.removeClass("btn-warning");
						$that.addClass("btn-success");
						$that.text("启 用");
					}else{
						$that.removeClass("btn-success");
						$that.addClass("btn-warning");
						$that.text("注 销");
					}
				}
			}
		})
	})
});