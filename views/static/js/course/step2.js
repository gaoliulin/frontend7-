define(["jquery", "util", "template", "uploadify", "jcrop"], function($, util, template){
	var csid = util.getQuery("id");
	var x = 0;
	var y = 0;
	var w = 0;
	var h = 0;

	//图片裁切插件的api
	var jcrop_api;

	$.ajax({
		url: "/api/course/picture",
		data: {cs_id: csid},
		success: function(data){
			var html = template("step2-tpl", data.result);
			$(".steps").html(html);

			//初始化图片上传插件
			$("#uploadBtn").uploadify({
				swf: "/views/assets/uploadify/uploadify.swf",
				uploader: "/api/uploader/cover",
				buttonText: "选择图片",
				buttonClass: "btn btn-sm btn-success",
				width: 70,
				itemTemplate: "<p></p>",
				fileObjName: "cs_cover_original",
				formData: {
					cs_id: csid
				},
				onUploadSuccess: function(file, data, response){
					data = JSON.parse(data);
					$(".preview>img").attr("src", data.result.path);
					$("#cropBtn").prop("disabled", false);
					if(jcrop_api){
						//如果用户已经点击了裁切图片按钮，再次上传图片之后，需要将之前创建出来的jcrop插件功能销毁
						jcrop_api.destroy();
						//重新将按钮置为 裁切图片的功能
						$("#cropBtn").text("裁切图片");
					}
				},
			});
			//修复插件样式的小问题
			$("#uploadBtn-button").css("line-height", "1.5")
		}
	})

	$(".steps").on("click", "#cropBtn", function(){
		//让图片开始裁切，初始化jcrop插件
		var text = $(this).text();
		if(text == "裁切图片"){
			$(".thumb>img").remove();
			$(".preview>img").Jcrop({
				boxWidth: 400,
				aspectRatio: 2,
				setSelect: [0, 0, 400, 200]
			}, function(){
				jcrop_api = this;
	  			thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, thumbnail: ".thumb"});
			});

			$(".preview").on("cropmove", function(a, b, c){
				x = c.x;
				y = c.y;
				w = c.w;
				h = c.h;
			})
			$(this).text("保存图片");
		}else{
			// $(this).text("裁切图片");
			$(this).prop("disabled", true);
			$that = $(this);
			//向服务器发送请求保存当前裁切好的区域
			$.ajax({
				url: "/api/course/update/picture",
				type: "post",
				data: {
					cs_id: csid,
					x: x,
					y: y,
					w: w,
					h: h
				},
				success: function(data){
					if(data.code == 200){
						// $that.prop("disabled", false);
						location.href = "/course/step3?id=" + data.result.cs_id;
					}
				}
			})
		}
	})
})