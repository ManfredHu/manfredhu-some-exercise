package com.cms.action.code;

import java.util.List;

import com.cms.action.base.BaseAction;
import com.cms.domain.CodeFile;

public class ShareListAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	private static final int groupSize = 5;
	
	private List<CodeFile> shareList;
	
	private int currentPage = 1;					//当前页	默认为1
	private int pageNum = 1;						//总页数
	private int prePage = 1;						//上一页
	private int nextPage = 1;						//下一页
	
	private int currentGroup = 1;				//当前组
	private int groupNum = 1;					//总组数
	private int startPage = 1;						//页码组的开始页
	private int endPage = 1;						//页码组的结束页
	
	public List<CodeFile> getShareList() {
		return shareList;
	}
	public void setShareList(List<CodeFile> shareList) {
		this.shareList = shareList;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPrePage() {
		return prePage;
	}
	public void setPrePage(int prePage) {
		this.prePage = prePage;
	}
	public int getNextPage() {
		return nextPage;
	}
	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
	public int getCurrentGroup() {
		return currentGroup;
	}
	public void setCurrentGroup(int currentGroup) {
		this.currentGroup = currentGroup;
	}
	public int getGroupNum() {
		return groupNum;
	}
	public void setGroupNum(int groupNum) {
		this.groupNum = groupNum;
	}
	public int getStartPage() {
		return startPage;
	}
	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}
	public int getEndPage() {
		return endPage;
	}
	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}
	
	public String execute() {
		
		//设置页属性
		setPageNum(cm.getSharedPageNum());
		setPrePage(getCurrentPage() == 1 ? 1 : getCurrentPage() - 1);
		setNextPage(getCurrentPage() == getPageNum() ? 
				 getPageNum() : getCurrentPage() + 1); 
		
		
		//设置组属性
		setCurrentGroup(getCurrentPage() / groupSize + 1); 
		setGroupNum(getPageNum() / groupSize + 1); 
		setStartPage((getCurrentGroup() - 1) * groupSize);
		if(getStartPage() <= 0 ) setStartPage(1);
		setEndPage(getCurrentGroup() * groupSize + 1);
		if(getEndPage() > getPageNum()) setEndPage(getPageNum());
		
		//获取共享列表
		setShareList(cm.getSharedProject(getCurrentPage()));
		if(getShareList() == null) {
			
			setTips("加载错误，请重试");
			setRedirectUrl(String.format("/CMS/code/shareList.action?currentPage=%s",getCurrentPage()));
			return "error";
		}
		
		//设置共享列表的用户属性
		for(int i = 0; i < getShareList().size(); i++) {
			
			CodeFile codeFile = getShareList().get(i);
			codeFile.setUser(um.getByID(codeFile.getUserID())); 
		}
		
		return "success";
	}

}
