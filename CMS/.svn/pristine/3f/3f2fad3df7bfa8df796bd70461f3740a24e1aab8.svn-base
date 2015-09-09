<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理员修改用户信息</title>
<style type="text/css">
#content{
	margin:0px auto;
	width:900px;
}
.button{
	text-align: center;
	border-style: solid;
    border-width: 1px;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 14px;
    line-height: normal;
    padding: 9px 14px;
    cursor: pointer;
    background-color: #3d5098;
    background-image: -moz-linear-gradient(center top , #3d5998, #3d4298);
    background-repeat: repeat-x;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    color: #ffffff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    float:left;
    text-decoration:none;
}
div.user,div.password{
	height:30px;
	line-height:30px;
	padding:10px 0;
} 
div.user{
	margin-top:20px;
}
div.password{
	margin-bottom:20px;
}

label.label {
    display: block;
    float: left;
    width: 100px;
}
.text{
	background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 2px;
    color: #555555;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 4px;
    width: 210px;}
</style>
</head>
<%@include file="/Content/template/Template.jsp"  %>
<body>
	<div id="content">
		<form action="updateUserInfo.action" method="post" id="updateUserInfo">
			<input type="hidden" value=${user.userID }  name="user.userID"/> 
			<input type="hidden" value=${user.userName }  name="user.userName"/>
			<input type="hidden" value=${user.password }  name="user.password"/> 
			<input type="hidden" value=${user.isManager }  name="user.isManager"/>
			<div class="user"> <label class="label">用户名</label><input class="text" type="text" value="${user.name }" name="user.name" />
			</div>
			<div class="password"><label class="label">用户邮箱</label><input class="text" type="text" value="${user.email }" name="user.email" />
			</div>
			<input class="button" type="submit" value="修改">
		</form>
		</div>
</body>
</html>