<%@page import="com.cms.domain.CodeFile"%>
<%@page import="com.cms.service.impl.CodeManageImpl"%>
<%@page import="com.cms.service.CodeManage"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>代码查看</title>
<link href="/CMS/Content/CSS/myCode.css" rel="stylesheet"
	type="text/css" />
</head>
<%@include file="/Content/template/Template.jsp"%>
<body>
	<div id="content" class="center">
		<h3>文件名：${requestScope.codeFile.name }</h3>
		<div>
			<table class="code">
				<thead>
					<tr>
						<th class="lineNumber">行号</th>
						<th class="codeContent">内容</th>
					</tr>
				</thead>
				<tbody>
					<%
						//使用后台代码直接输出文件内容
						CodeFile viewCodeFile = (CodeFile) request.getAttribute("codeFile");
						if (viewCodeFile != null) {
	
							CodeManage codeManage = new CodeManageImpl();
							//设置项目根路径
							codeManage.setProjectPath(session.getServletContext()
									.getRealPath("/"));
							codeManage.getFileContent(viewCodeFile, out);
						}
					%>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>