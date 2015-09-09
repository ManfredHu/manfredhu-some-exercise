package com.cms.action.user;

import java.util.List;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;
import com.opensymphony.xwork2.ActionContext;

public class UpdateUserInfoAction extends BaseAction {

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
					setRedirectUrl("/CMS/user/ManageUser");
					return "error";
				}
			}
		
		}
		
		//权限验证
		if(user.getUserID()==0){
			setTips("非法操作");
			setRedirectUrl("/CMS/user/Login");
			return "error";
		}
		
		//权限验证
		if(user.getName()==null || user.getEmail()==null){
			setTips("信息不能为空");
			setRedirectUrl("/CMS/user/UserManage");
			return "error";
		}
		
		// 管理员更新用户信息
		if (um.updateUser(user, 0)) {
			ActionContext ctx = ActionContext.getContext();
			setTips("修改成功");
			setRedirectUrl("/CMS/user/UserManage");
			return "success";
		}

		setTips("修改失败");
		setRedirectUrl("/CMS/user/ManageUser");
		return "error";
	}

}
