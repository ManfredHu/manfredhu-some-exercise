package com.cms.others;

import java.util.Map;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class LoginInterceptor extends AbstractInterceptor {

	private static final long serialVersionUID = 1L;
	
	private String name;
	
	private void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}


	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		
		//获取session
		Map<String,Object>  session = invocation.getInvocationContext().getSession();
		
		//获取user的session
		User user = (User)session.get("user");
		
		//拦截没有登陆的用户请求
		if(user == null ) {
			BaseAction baseAction =  (BaseAction)invocation.getAction();
			baseAction.setTips("对不起，您还没有登陆！");
			baseAction.setRedirectUrl("/CMS/user/Login");
			return "error";
		}
		return invocation.invoke();
	}

}
