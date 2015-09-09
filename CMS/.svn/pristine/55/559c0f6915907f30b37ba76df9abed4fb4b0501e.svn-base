package com.cms.action.user;

import java.util.Map;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;
import com.cms.others.MD5;
import com.opensymphony.xwork2.ActionContext;

public class UpdatePawAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private String oldpassword;
	private String newpassword2;
	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	public String getOldpassword() {
		return oldpassword;
	}

	public void setOldpassword(String oldpassword) {
		this.oldpassword = oldpassword;
	}

	public String getNewpassword2() {
		return newpassword2;
	}

	public void setNewpassword2(String newpassword2) {
		this.newpassword2 = newpassword2;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String execute() {

		User selectUser = null; // 用来接收查询的用户信息

		// 加密密码
		oldpassword = MD5.GetMD5Code(oldpassword);
		user.setPassword(MD5.GetMD5Code(user.getPassword()));
		newpassword2 = MD5.GetMD5Code(newpassword2);

		if (user.getPassword().equals(newpassword2)) { // 判断两次的密码是否一致
			if (um.getByID(user.getUserID()) != null) {
				selectUser = um.getByID(user.getUserID()); // 获取当前用户密码
				if (selectUser.getPassword().equals(oldpassword)) { // 如果当前用户密码和用户所填写的密码相同，则修改密码

					um.updateUser(user, 1);

					ActionContext ctx = ActionContext.getContext();
					Map session = ctx.getSession();
					session.clear();

					setTips("修改密码成功");
					setRedirectUrl("/CMS/user/Login");
					return "success";
				} else {
					setTips("原密码错误");
					setRedirectUrl("/CMS/user/UpdatePassword");
					return "error";
				}
			}
		} else {
			setTips("两次输入的密码不一致");
			setRedirectUrl("/CMS/user/UpdatePassword");
			return "error";
		}

		setTips("修改失败");
		setRedirectUrl("/CMS/user/UpdatePassword");
		return "error";

	}

}
