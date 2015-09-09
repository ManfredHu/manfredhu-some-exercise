 package com.cms.action.base;

import com.cms.service.CodeManage;
import com.cms.service.UserManage;
import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	protected CodeManage cm;
	protected UserManage um;
	
	protected String tips;				//提示
	protected String redirectUrl;		//跳转URL
	
	public void setCodeManage(CodeManage cm) {
		
		this.cm = cm;
	}
	
	public void setUserManage(UserManage um) {
		
		this.um =um;
	}
	
	public String getTips() {
		return tips;
	}
	public void setTips(String tips) {
		this.tips = tips;
	}
	public String getRedirectUrl() {
		return redirectUrl;
	}
	public void setRedirectUrl(String redirectUrl) {
		this.redirectUrl = redirectUrl;
	}
	
	

}
