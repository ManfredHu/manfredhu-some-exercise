<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>代码或项目上传</title>
<link href="/CMS/Content/CSS/codeUpload.css" rel="stylesheet"
	type="text/css" />
</head>
<%@include file="/Content/template/Template.jsp"%>
<body>
	<div id="content">
		<s:form action="codeUpload" enctype="multipart/form-data"
			method="post" namespace="/code">
			<s:radio name="code.isShare" list="#{'true':'是','false':'否'}"
				label="是否共享" value="true" />
			<s:textarea name="code.description" label="描述" />
			<s:file name="upload" label="选择文件" />
			<s:submit value="上传" />
		</s:form>
	</div>
</body>
</html>