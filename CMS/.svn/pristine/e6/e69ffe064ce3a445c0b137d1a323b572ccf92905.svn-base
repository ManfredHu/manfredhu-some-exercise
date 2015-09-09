<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理用户</title>
<link href="/CMS/Content/CSS/userManage.css" rel="stylesheet" type="text/css" />
</head>
<%@ include file="/Content/template/Template.jsp"%>
<body>
	<div id="content">
		<table class="files">
		<caption>所有用户</caption>
		<thead>
			<tr>
				<th> 用户名 </th>
				<th style="width:400px;"> 邮箱  </th>
				<th> 操作  </th>
			</tr>
		</thead>
		<tbody>
		<s:iterator id="UserManage" value="userList" >
			<tr>
				<td class="name">${UserManage.name }</td>
				<td>${UserManage.email }</td>
				<td><a class="fmodify" href="updateUser?userID=${UserManage.userID }" >修改</a>
				<a class="fdelete" href="deleteUser?userID=${UserManage.userID }" >删除</a>
				<a href="reSetPwd?userID=${UserManage.userID }" >重置密码</a></td>
			</tr>
		</s:iterator>
		</tbody>
</table>
	<div>

			<c:forEach var="num" begin="1" end="${pageList}" step="1">
				<a class="aLi" href="page?pageNum=${num }">${num}</a>
			</c:forEach>
<%--共 ${pageList}页 --%>
		</div>
		
	</div>
</body>
</html>