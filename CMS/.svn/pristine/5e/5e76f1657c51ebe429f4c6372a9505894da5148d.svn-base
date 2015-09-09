package com.cms.action.user;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;

public class ReSetPwdAction extends BaseAction{
	
	private int userID;
	
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	
	public String execute(){
		
		//获取用户信息
		User user = um.getByID(getUserID());
		
		//重置密码，新密码8888
		user.setPassword(com.cms.others.MD5.GetMD5Code("8888"));
		
		//判断是否重置成功
		if(um.updateUser(user, 0)){
			setTips("重置成功");
			setRedirectUrl("/CMS/user/UserManage");
			return "success";
		}
		
		setTips("重置失败");
		setRedirectUrl("/CMS/user/UserManage");
		return "error";
	}
}
