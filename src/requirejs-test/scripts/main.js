//require.js配置
requirejs.config({
	baseUrl: "scripts/src",
	paths: {
		"add": "add",
		"console": "console",
		// "jquery": "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"
	}
});

define(['add','console'],function(add,console) {
	var a = 1,
		b = 2;
	var c = add(a,b);
	console(c);

});