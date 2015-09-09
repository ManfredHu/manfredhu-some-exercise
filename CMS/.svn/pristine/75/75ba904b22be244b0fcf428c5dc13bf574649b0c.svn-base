<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>${requestScope.parentFile.name }</title>
<link href="/CMS/Content/CSS/codeList.css" rel="stylesheet" type="text/css" />
</head>
<%@include file="/Content/template/Template.jsp"  %>
<body>
	<div id="content">
		<div id="description">
			<div class="projectName">
				<span class="prjTitle">项目名称：</span>
				<h2 >${requestScope.rootProjectFile.name }</h2>
			</div>
			<div class="detail">
				<span class="desc">项目描述：</span>
				<p>${requestScope.parentFile.description}
				<c:if test="${requestScope.parentFile.description==''}">
					暂无
				</c:if>
				</p>
			</div>
		</div>
		
		<div id="leftListHead">
			<c:if test="${requestScope.isShowParentLink }">
				<a class="toLast" href="/CMS/code/codeList.action?dirFileID=
					${requestScope.parentFile.fatherFileID }&isSharePage=true">返回上一级</a>
			</c:if>
			<span>当前路径：${requestScope.parentFile.path }</span>
		</div>
		<div id="rightListHead" >
			<a class="button" href="CMS/code/codeDownload.action
			?fileID=${requestScope.dirFileID}" >打包下载项目</a>
		</div>
		
		<table id="listTable" class="files">
			<thead>
				<tr>
					<th>名称</th>
					<th>描述</th>
					<th>上传时间</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="item" items="${requestScope.fileList }">
					<tr>
						<td> 
							<a href="/CMS/code/codeList.action?dirFileID=
							${item.fileID}&isSharePage=true" >${item.name}</a>
						</td>
						<td>${item.description}</td>
						<td>
							<fmt:formatDate value="${item.uploadTime}" pattern="yyyy-MM-dd" />
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
		<div id="leftListBottom" >
			<p>当前页面:<span id="pageNow">${requestScope.currentPage}</span></p>
			<a href="/CMS/code/codeList.action?dirFileID=
				${requestScope.dirFileID }&currentPage=1&isSharePage=true" > 首页</a>
			<c:if test="${currentPage ne 1 }"  >
				<a href="/CMS/code/codeList.action?dirFileID=
				${requestScope.dirFileID }&currentPage=${requestScope.prePage }
				&isSharePage=true"  >
					 上一页
				</a>
			</c:if>
			<c:forEach varStatus="status" begin="${requestScope.startPage}" end="${requestScope.endPage }"  >
				<a href="/CMS/code/codeList.action?dirFileID=${requestScope.dirFileID}&currentPage=${status.index}
				&isSharePage=true" >${status.index}</a>
			</c:forEach>
			
			<c:if test="${currentPage ne pageNum }"  >
				<a href="/CMS/code/codeList.action?dirFileID=
				${requestScope.dirFileID }&currentPage=${requestScope.nextPage }
				&isSharePage=true"  >
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