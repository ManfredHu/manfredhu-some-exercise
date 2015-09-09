<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理员修改用户信息</title>
<link href="/CMS/Content/CSS/manageUser.css" rel="stylesheet" type="text/css" />
</head>
<%@include file="/Content/template/Template.jsp"%>
<body>
	<div id="content">
		<form action="updateUserInfo.action" method="post" id="updateUserInfo">
			<input type="hidden" value=${user.userID } name="user.userID" /> <input
				type="hidden" value=${user.userName } name="user.userName" /> <input
				type="hidden" value=${user.password } name="user.password" /> <input
				type="hidden" value=${user.isManager } name="user.isManager" />
			<div class="user">
				<label class="label">用户名</label><input class="text" type="text"
					value="${user.name }" name="user.name" />
			</div>
			<div class="password">
				<label class="label">用户邮箱</label><input class="text" type="text"
					value="${user.email }" name="user.email" />
			</div>
			<input class="button" type="submit" value="修改">
		</form>
	</div>
</body>
</html>