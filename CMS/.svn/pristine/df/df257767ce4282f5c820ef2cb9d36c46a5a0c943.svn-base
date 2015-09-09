<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>模板页面</title>
<link href="/CMS/Content/CSS/normalize.css" rel="stylesheet" type="text/css" />
<link href="/CMS/Content/CSS/template.css" rel="stylesheet" type="text/css"   />
<script type="text/javascript" src="/CMS/Content/JS/html5.js" ></script>
<script type="text/javascript" src="/CMS/Content/JS/jquery.min.js"></script>
<!- -[if (gte IE 6)&(lte IE 8)]>
      <script type="text/javascript" src="/CMS/Content/JS/selectivizr.js"></script>
      
<![endif]- ->
<!- -[if lt IE 9]>
	<style>
	h1{
    	visibility:hidden;
	}
	</style>
<![endif]- ->
</head>
<body>
	<header>
		<div class="center">
			<h1>&lt;Code&Share&gt;<br/>代码托管系统</h1>
			<nav>
				<a href="/CMS/code/codeList.action" >我的代码</a>
				<a href="/CMS/code/shareList.action" >代码共享</a>
			</nav>
			<div class="aList">
				<h2>欢迎您，${sessionScope.user.name } </h2>
				<a class="modify" href="/CMS/user/UserInfo" >修改个人信息</a>
				<a class="password" href="/CMS/user/UpdatePassword" >修改密码</a>
			<s:if test='#session.user.isManager'>
				<a href="/CMS/user/UserManage" >管理员管理</a>
			</s:if>
			<a class="exit" href="/CMS/user/quit">退出</a>
			</div>
		</div>
	</header>
</body>
</html>