<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>代码信息修改</title>
<link href="/CMS/Content/CSS/codeModify.css" rel="stylesheet" type="text/css"   />
</head>
<%@include file="/Content/template/Template.jsp"  %>
<body>
	<div id="content">
		<form action="/CMS/code/codeModify.action" method="post"  >
			<table>
				<tr>
					<td><span>文件名称：</span></td>
					<td>
						<input type="text" name="codeFile.name" 
						 value="${requestScope.codeFile.name }"  >
					</td>
				</tr>
				<tr>
					<td><span>是否共享：</span></td>
					<td>
						<input type="radio" name="codeFile.isShare" value="true"
			 				${requestScope.codeFile.isShare ? "checked='checked'" : '' }  />
			 			<span>是  </span>
			 			<input type="radio" name="codeFile.isShare" value="false"
						 ${requestScope.codeFile.isShare ? '' : "checked='checked'" }  />
						<span>否  </span>
					</td>
				</tr>
				<tr>
					<td><span>描述：</span></td>
					<td>
						<textarea  name="codeFile.description"  >${requestScope.codeFile.description }</textarea>
					</td>
				</tr>
			</table>
			<input type="hidden" name="isUpdate" value="true"  />
			<input type="hidden" name="codeFile.fileID" value="${requestScope.fileID }"  />		
			<input class="button" type="submit" value="保存修改"   />  
		</form>
	</div>
</body>
</html>