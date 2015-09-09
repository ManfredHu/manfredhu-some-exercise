<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>   
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>我的代码</title>
<link href="/CMS/Content/CSS/myCode.css" rel="stylesheet" type="text/css" />
</head>
<%@ include file="/Content/template/Template.jsp"%>
<body>
	<div id="content" class="center">
		<div id="description">
			<span class="prjDes">项目描述：</span>
			<p>${requestScope.parentFile.description}
			<c:if test="${requestScope.parentFile.description==''}">
				暂无
			</c:if>
			</p>
		</div>
		<div id="leftListHead">
			<c:if test="${requestScope.isShowParentLink }">
				<a class="toLast" href="/CMS/code/codeList.action?dirFileID=
					${requestScope.parentFile.fatherFileID }">返回上一级</a>
			</c:if>
			<span>当前路径：${requestScope.parentFile.path}</span>
		</div>
		<div id="rightListHead" >
			<a id="sendCode" class="button" href="/CMS/myCode/CodeUpload" >上传项目或代码</a>
		</div>
		
		<table id="listTable" class="files">
			<thead>
				<tr>
					<th>名称</th>
					<th>描述</th>
					<th>共享状态</th>
					<th>上传时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="item" items="${requestScope.fileList }">
					<tr>
						<td class="name"> 
							<a href="/CMS/code/codeList.action?dirFileID=
							${item.fileID}" >${item.name}</a>
						</td>
						<td class="description">${item.description}</td>
						<c:choose>
							<c:when test="${item.isShare }">
								<td class="yes">已共享</td>
							</c:when>
							<c:otherwise>
								<td class="no">未共享</td>
							</c:otherwise>
						</c:choose>
						<td class="date">
							<fmt:formatDate value="${item.uploadTime}" pattern="yyyy-MM-dd" />
						</td>
						<td class="operation">
							<c:if test="${requestScope.dirFileID ne 0}">
								<a class="fdownload" href="/CMS/code/codeDownload.action?fileID=${item.fileID}" >下载</a>
							</c:if>
							<a class="fdelete" href="/CMS/code/codeDelete.action?fileID=${item.fileID}"
							 onclick="return confirm('确认删除吗？')" >删除</a>
							<a class="fmodify" href="/CMS/code/codeModify.action?fileID=${item.fileID}" >修改</a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
		<div id="leftListBottom" >
			<p>当前页面:<span id="pageNow">${requestScope.currentPage}</span></p>
			<a href="/CMS/code/codeList.action?dirFileID=${requestScope.dirFileID }&currentPage=1" >首页</a>
			<c:if test="${requestScope.currentPage ne 1 }"  >
				<a href="/CMS/code/codeList.action?dirFileID=
				${requestScope.dirFileID }&currentPage=${requestScope.prePage}"  >
					 上一页
				</a>
			</c:if>
			<c:forEach varStatus="status" begin="${requestScope.startPage}" end="${requestScope.endPage}"  >
				<a href="/CMS/code/codeList.action?dirFileID=${requestScope.dirFileID}&currentPage=${status.index}" >${status.index}</a>
			</c:forEach>
			<c:if test="${requestScope.currentPage ne requestScope.pageNum }"  >
				<a href="/CMS/code/codeList.action?dirFileID=${requestScope.dirFileID }&currentPage=${requestScope.nextPage }"  >
					 下一页
				</a>
			</c:if>
		</div>
	</div>
	<script type="text/javascript">
		var now = document.getElementById("pageNow");
		var leftListBottom = document.getElementById("leftListBottom");
		var aList = leftListBottom.getElementsByTagName("a");
		for(var a=0;a<aList.length;a++){
			if(now.innerHTML==aList[a].innerHTML){
				aList[a].style.border = "1px solid transparent";
				aList[a].style.color = "#515151";
			}
		}
	</script>
</body>
</html>