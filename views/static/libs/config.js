require.config({
     baseUrl: "/views",
     paths: {
     	"jquery": "assets/jquery/jquery.min",
     	"form": "assets/jquery-form/jquery.form",
     	"cookie": "assets/jquery-cookie/jquery.cookie",
     	"template": "assets/artTemplate/template",
     	"bootstrap": "assets/bootstrap/js/bootstrap.min",
     	"util": "static/js/util",
          "datepicker": "assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
          "datepicker-zh": "assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
          "validate": "assets/validate/jquery-validate.min"
     },
     shim: {
     	"bootstrap": {
     		deps: ["jquery"]
     	},
          "datepicker-zh": {
               deps: ["datepicker"]
          },
          "validate": {
               deps: ["jquery"]
          }
     }
});