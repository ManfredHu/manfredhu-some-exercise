package com.cms.action.user;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;

public class UpdateUserAction extends BaseAction {

	private User user;
	private int userID;


	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String execute() {

		user = um.getByID(getUserID());
		return "success";
	}
}
