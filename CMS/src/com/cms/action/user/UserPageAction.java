package com.cms.action.user;

import java.util.List;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;
import com.opensymphony.xwork2.ActionContext;

public class UserPageAction extends BaseAction{
	
	private int pageNum;
	private List<User> userList;
	private int pageList;

	public int getPageList() {
		return pageList;
	}

	public void setPageList(int pageList) {
		this.pageList = pageList;
	}

	public List<User> getUserList() {
		return userList;
	}

	public void setUserList(List<User> userList) {
		this.userList = userList;
	}

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	
	public String execute(){
		
		// 获取页码总数
		pageList = um.getPageNum();
		
		// 获取所选择页的用户数据
		ActionContext ct = ActionContext.getContext();
		ct.put("userList", um.getUserByPage(pageNum-1));
		return "success";
	}

}
