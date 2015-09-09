package com.cms.action.user;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.cms.action.base.BaseAction;

public class QuitAction extends BaseAction implements ServletRequestAware,ServletResponseAware{

	private HttpServletRequest request;
	private HttpServletResponse response;
	

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		
		this.response = arg0;
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		
		this.request = arg0;
		
	}
	
	public String execute(){
		
		HttpSession user = request.getSession();
		user.invalidate();
		user.setMaxInactiveInterval(0);
		request.getSession().removeAttribute("user");
		Cookie[] cookies = request.getCookies();
		
		for(Cookie cookie : cookies){
			cookie.setMaxAge(0);
			response.addCookie(cookie);
		}
		
		setTips("退出成功");
		setRedirectUrl("/CMS/user/Login");
		return "success";
	}

}
