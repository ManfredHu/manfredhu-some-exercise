<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户登录</title>
<link href="/CMS/Content/CSS/normalize.css" rel="stylesheet"
	type="text/css" />
<link href="/CMS/Content/CSS/login.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<h1>
		&lt;Code&Share&gt;<br />代码托管系统
	</h1>
	<form class="login" id="loginForm" action="login.action" method="post">
		<h2>用户登录</h2>
		<div class="user">
			<label class="label" for="userName">用户名</label> <input class="text"
				type="text" id="userName" name="user.userName" />
		</div>
		<div class="password">
			<label class="label" for="password">密 码</label> <input class="text"
				type="password" id="password" name="user.password" />
		</div>
		<div class="autoLogin">
			<input id="autoLogin" type="checkbox" name="autoLogin" /> <label
				for="autoLogin">下次自动登陆</label>
		</div>
		<div class="b">
			<input class="button" type="submit" value="登陆" /> <a class="button1"
				href="../user/Register">注册</a>
		</div>
	</form>
	<%
		if (session.getAttribute("user") != null) {
			response.sendRedirect("/CMS/myCode/MyCode");
		} else {
			Cookie[] cookies = request.getCookies();
			com.cms.domain.User user = new com.cms.domain.User();

			if (request.getCookies() != null) {

				for (int t = 0; t < cookies.length && cookies != null; t++) {
					Cookie cookie = cookies[t];
					if (cookie.getName().equals("userID")) {
						user.setUserID(Integer.parseInt(cookie.getValue()));
					}
					if (cookie.getName().equals("userName")) {
						user.setUserName(cookie.getValue());
					}
					if (cookie.getName().equals("name")) {
						user.setName(cookie.getValue());
					}
					if (cookie.getName().equals("email")) {
						user.setEmail(cookie.getValue());
					}
					if (cookie.getName().equals("password")) {
						user.setPassword(cookie.getValue());
					}
					if (cookie.getName().equals("isManager")) {
						user.setIsManager(Boolean.valueOf(cookie.getValue()));
					}
				}
				if (user.getUserID() != null)
					session.setAttribute("user", user);
			}
		}
	%>
</body>
</html>