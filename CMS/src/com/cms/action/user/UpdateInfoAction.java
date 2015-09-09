package com.cms.action.user;

import java.util.List;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;
import com.opensymphony.xwork2.ActionContext;

public class UpdateInfoAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String execute() {
		
		//用户名重复验证
		
		// 获取页码总数
		int pageList = um.getPageNum();
				
		for(int t=0;t<pageList;t++){
			List<User> userList = um.getUserByPage(t);
					
			for( User users:userList){
				if(users.getUserName().equals(user.getUserName()) && !users.getUserID().equals(user.getUserID())){
					setTips("该用户名已存在，注册失败");
					setRedirectUrl("/CMS/user/UserInfo");
					return "error";
				}
			}
		}

		// 更新用户信息
		if (um.updateUser(user, 0)) {
			ActionContext ctx = ActionContext.getContext();
			ctx.getSession().put("user", user);
			setTips("修改成功");
			setRedirectUrl("/CMS/code/codeList.action");
			return "success";
		}

		setTips("修改失败");
		setRedirectUrl("/CMS/user/UserInfo");
		return "error";
	}

}
