<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户个人信息修改</title>
<link href="/CMS/Content/CSS/userinfo.css" rel="stylesheet" type="text/css" />
</head>
<%@include file="/Content/template/Template.jsp"  %>
<body>
	<div id="content">
		<form action="updateInfo.action" method="post" id="updateUserInfo">
			<input type="hidden" value=${sessionScope.user.userID }  name="user.userID"/> 
			<input type="hidden" value=${sessionScope.user.userName }  name="user.userName"/>
			<input type="hidden" value=${sessionScope.user.password }  name="user.password"/> 
			<input type="hidden" value=${sessionScope.user.isManager }  name="user.isManager"/>
			<div class="user"> 
				<label class="label" for="userName">用户名</label>
				<input class="text" type="text"  id="userName" value=${sessionScope.user.name } name="user.name" />
			</div>
			<div class="password">
				<label class="label" for="password">用户邮箱</label>
				<input class="text" id="password" type="text" value=${sessionScope.user.email } name="user.email" />
			</div>
			<input class="button" type="submit" value="提交修改" />
		</form>
	</div>
</body>
</html>