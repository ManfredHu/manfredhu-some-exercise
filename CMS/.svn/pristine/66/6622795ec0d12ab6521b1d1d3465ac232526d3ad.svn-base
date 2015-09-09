<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>代码或项目上传</title>
<style type="text/css">
div#content{
	width:900px;
	margin:0px auto;
}
tbody tr td:first-of-type{
	width:130px;
	line-height:40px;
	height:40px;
}
textarea {
	background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 2px;
    color: #515151;
    display: inline-block;
    font-size: 16px;
    padding: 4px;
    width: 400px;
    height:250px;
}
input[type="submit"]{
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
    margin:40px 0 0 480px;
}
input[type="file"]{
	box-shadow:none;
}
</style>
</head>
<%@include file="/Content/template/Template.jsp"  %>
<body>
	<div id="content">
		<s:form action="codeUpload" enctype="multipart/form-data" method="post" namespace="/code" >
			<s:radio name="code.isShare" list="#{'true':'是','false':'否'}"
			  label="是否共享" value="true" />
			<s:textarea name="code.description" label="描述"  />
			<s:file name="upload" label="选择文件"  />
			<s:submit value="上传" />
		</s:form>
	</div>
</body>
</html>