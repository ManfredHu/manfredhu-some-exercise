<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改密码</title>
<link href="/CMS/Content/CSS/upadtePassword.css" rel="stylesheet" type="text/css" />
</head>
<%@include file="/Content/template/Template.jsp"%>
<body>
	<div id="content">
		<form id="updatePaw" action="updatePaw.action" method="post">
			<input type="hidden" value=${sessionScope.user.userID }
				name="user.userID" /> <input type="hidden"
				value=${sessionScope.user.userName } name="user.userName" /> <input
				type="hidden" value=${sessionScope.user.isManager }
				name="user.isManager" /> <input type="hidden"
				value=${sessionScope.user.name } name="user.name" /> <input
				type="hidden" value=${sessionScope.user.email } name="user.email" />
			<div class="user">
				<label class="label" for="userName">请输入原密码</label> <input
					class="text" type="password" name="oldpassword" />
			</div>
			<div class="user">
				<label class="label" for="userName">请输入新密码</label> <input
					class="text" type="password" name="user.password" />
			</div>
			<div class="user">
				<label class="label" for="userName">再输入一次密码</label> <input
					class="text" type="password" name="newpassword2" />
			</div>
			<input class="button" type="submit" value="提交修改" />
		</form>
	</div>
</body>
</html>