package com.cms.action.user;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.Session;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.web.context.ServletConfigAware;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;
import com.cms.others.MD5;
import com.opensymphony.xwork2.ActionContext;

public class LoginAction extends BaseAction implements ServletRequestAware,ServletResponseAware{

	private static final long serialVersionUID = 1L;

	private User user;
	private String autoLogin;
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

	public String getAutoLogin() {
		return autoLogin;
	}

	public void setAutoLogin(String autoLogin) {
		this.autoLogin = autoLogin;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	public String execute() throws UnsupportedEncodingException {

		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		
		//非空验证
		if(user.getUserName().trim().length()==0 || user.getPassword().trim().length()==0){
			setTips("登陆失败,用户名或密码不能为空");
			setRedirectUrl("/CMS/user/Login");
			return "error";
		}
		
		//长度验证
		if(user.getUserName().trim().length()>16 || user.getPassword().trim().length()>16){
			setTips("登陆失败,用户名或密码最多不超过16位");
			setRedirectUrl("/CMS/user/Login");
			return "error";
		}
		
		// 加密密码
		user.setPassword(MD5.GetMD5Code(user.getPassword()));
		String nameStr = null;
		
		ActionContext ctx = ActionContext.getContext();
		
		if (um.loginValidate(user)) {
			ctx.getSession().put("user", user);
			
			//判断是否为自动登陆
			if(getAutoLogin()!=null)
				if(getAutoLogin().equals("on")){
					Cookie userID = null;
					Cookie userName = null;
					Cookie name = null;
					Cookie email = null;
					Cookie password = null;
					Cookie isManager = null;
					
					userID = new Cookie("userID",user.getUserID().toString());
					userName = new Cookie("userName",user.getUserName().toString());
					
					//防止乱码
					nameStr=URLEncoder.encode(user.getName().toString(),"UTF-8");
					name = new Cookie("name",nameStr);
					
					email = new Cookie("email",user.getEmail().toString());
					password = new Cookie("password",user.getPassword().toString());
					isManager = new Cookie("isManager",String.valueOf(user.getIsManager()));
					
					userID.setMaxAge(60 * 60 * 24);
					userName.setMaxAge(60 * 60 * 24);
					name.setMaxAge(60 * 60 * 24);
					email.setMaxAge(60 * 60 * 24);
					password.setMaxAge(60 * 60 * 24);
					isManager.setMaxAge(60 * 60 * 24);
					
					getResponse().addCookie(userID);
					getResponse().addCookie(userName);
					getResponse().addCookie(name);
					getResponse().addCookie(email);
					getResponse().addCookie(password);
					getResponse().addCookie(isManager);
				}
				return "success";
		}

		setTips("登陆失败");
		setRedirectUrl("/CMS/user/Login");
		return "error";
	}

	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		
		this.response = arg0;
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		
		this.request = arg0;
		
	}
}
