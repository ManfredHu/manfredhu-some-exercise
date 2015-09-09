<%@page import="com.cms.domain.CodeFile"%>
<%@page import="com.cms.domain.User"%>
<%@page import="com.cms.service.impl.UserManageImpl"%>
<%@page import="com.cms.service.UserManage"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>共享列表</title>
<link href="/CMS/Content/CSS/shareList.css" rel="stylesheet" type="text/css" />
</head>
<%@include file="/Content/template/Template.jsp"  %>
<body>
	<div id="content">
		<ul style="list-style-type: none;" >
			<c:forEach var="item" items="${requestScope.shareList }" > 
				<li>	
					<h3 class="head" >
						<a href="/CMS/code/codeList.action?dirFileID=
							${item.fileID }&isSharePage=true" >${item.name }</a>
					</h3>
					<p class="content" >${item.description }</p>
					<p class="name"><span class="username">${item.user.name }</span>发布于  
						<fmt:formatDate value="${item.uploadTime}" pattern="yyyy-MM-dd" />
					</p>
				</li>
			</c:forEach>
		</ul>
		
		<div id="leftListBottom" >
			<p class="noe">当前页面:<span id="pageNow">${requestScope.currentPage }</span></p>
			<a href="/CMS/code/shareList.action?currentPage=1" > 首页</a>
			<c:if test="${currentPage ne 1 } "  >
				<a href="/CMS/code/shareList.action?currentPage=${requestScope.prePage }"  >
					 上一页
				</a>
			</c:if>
			<c:forEach varStatus="status" begin="${requestScope.startPage }" end="${requestScope.endPage }"  >
				<a href="/CMS/code/shareList.action?currentPage=${status.index }" >${status.index}</a>
			</c:forEach>
			
			<c:if test="${currentPage ne pageNum } "  >
				<a href="/CMS/code/shareList.action?currentPage=${requestScope.nextPage }"  >
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