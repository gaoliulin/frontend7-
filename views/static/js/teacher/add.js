define(["jquery", "template", "util", "form"], function($, template, util){
	//1. 区分究竟是添加操作还是编辑操作！

	//由于进行讲师编辑的时候，需要从列表中传进来当前要编辑的讲师的id
	//所以会在连接当中拼接一个参数 id=讲师id
	//但是添加功能，是没有这个id的，所以可以根据url当中究竟是否传递了讲师id来区分
	//到底是添加功能还是编辑功能


	var query = util.getQueryObj();

	//如果能够获取到id参数，则为编辑
	if(query.id){

		//如果是编辑，那么首先要去后台获取当前要编辑的讲师的信息
		//将其渲染到模板当中
		$.ajax({
			url: "/api/teacher/edit",
			type: "get",
			data: {
				tc_id: query.id
			},
			success: function(data){
				//获取到讲师信息之后，要将获取到的内容渲染到页面上

				//当页面为编辑的时候，将标题设置为讲师编辑
				data.result.title = "讲师编辑";
				//当页面为编辑的时候，将按钮的文字设置为保存
				data.result.btnText = "保 存";
				//当页面为编辑的时候，将保存按钮的类型设置为edit
				data.result.type = "edit";

				var html = template("teacher-tpl", data.result);
				$(".teacher").html(html);
			}
		})

		
	//如果获取不到id参数，则为添加
	}else{
		var html = template("teacher-tpl", {
			title: "讲师添加",
			btnText: "添加",
			type: "add"
		});
		$(".teacher").html(html);
	}

	//给保存按钮注册点击事件
	$(".teacher").on("click", "#btnSave", function(){
		var type = $(this).data("type");
		var url = "";

		//通过获取按钮当前的类型，是编辑或者添加来区分最终提交数据的接口地址
		if(type == "edit"){
			url = "/api/teacher/update";
		}else{
			url = "/api/teacher/add";
		}

		//使用jquery.form插件将表单进行异步提交
		$("#teacherform").ajaxSubmit({
			url: url,
			type: "post",
			success: function(data){
				if(data.code == 200){
					location.href = "/teacher/list"
				}
			}
		});

		return false;
	})
})