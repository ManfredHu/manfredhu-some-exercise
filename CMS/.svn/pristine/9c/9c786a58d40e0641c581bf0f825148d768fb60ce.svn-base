package com.cms.others;

import java.util.Map;

import com.cms.domain.User;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class UserInterceptor extends AbstractInterceptor{

	@Override
	public String intercept(ActionInvocation arg0) throws Exception {
		
		
		//获取所有的session
		Map<String,Object> sessionValues = arg0.getInvocationContext().getSession();
		
		//获取session中的user
		User user = new User();
		user = (User)sessionValues.get("user");
		
		//当user不存在或者用户不是管理员时，退回到登陆页面
		if(user==null || !user.getIsManager()){
			return "error";
		}

		//如果是管理员，程序就继续执行
		return arg0.invoke();
	}

}
