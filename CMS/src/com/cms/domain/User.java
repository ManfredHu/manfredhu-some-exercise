package com.cms.domain;

public class User {

	private Integer userID;				//用户ID
	private String userName;			//用户名
	private String name;					//用户昵称
	private String password;			//用户密码
	private boolean isManager;		//是否为管理员
	private String email;					//用户邮箱
	
	public Integer getUserID() {
		return userID;
	}
	public void setUserID(Integer userID) {
		this.userID = userID;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean getIsManager() {
		return isManager;
	}
	public void setIsManager(boolean isManager) {
		this.isManager = isManager;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
}
