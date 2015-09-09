<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户注册</title>
<link href="/CMS/Content/CSS/normalize.css" rel="stylesheet"
	type="text/css" />
<link href="/CMS/Content/CSS/login.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<h1>
		&lt;Code&Share&gt;<br />代码托管系统
	</h1>
	<form style="top: 15%" class="login" id="registerForm"
		action="register.action" method="post">
		<h2>用户注册</h2>
		<div class="user">
			<label class="label2">用户名</label> <input class="text"
				name="user.userName" type="text" />
		</div>
		<div class="normal">
			<label class="label2">昵称</label> <input class="text" name="user.name"
				type="text" />
		</div>
		<div class="normal">
			<label class="label2">密码</label> <input class="text"
				name="user.password" type="password" />
		</div>
		<div class="normal">
			<label class="label2">确认密码</label> <input class="text"
				name="comfirmPassword" type="password" />
		</div>
		<div class="password">
			<label class="label2">邮箱</label> <input class="text"
				name="user.email" type="text" />
		</div>
		<input class="button" type="submit" value="确认注册" />
		</div>
	</form>

</body>
</html>