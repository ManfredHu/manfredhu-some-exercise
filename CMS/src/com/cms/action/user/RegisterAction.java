package com.cms.action.user;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.cms.action.base.BaseAction;
import com.cms.domain.User;
import com.cms.others.MD5;
import com.opensymphony.xwork2.ActionContext;

public class RegisterAction extends BaseAction implements
		ServletRequestAware {

	private static final long serialVersionUID = 1L;

	private User user;
	private HttpServletRequest request;
	private String comfirmPassword;

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public String getComfirmPassword() {
		return comfirmPassword;
	}

	public void setComfirmPassword(String comfirmPassword) {
		this.comfirmPassword = comfirmPassword;
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

	@Override
	public void setServletRequest(HttpServletRequest request) {

		this.request = request;
	}

	public String execute() {

		//验证前后两次密码是否正确
		if(!user.getPassword().equals(comfirmPassword)){
			setTips("前后两次密码不一致，注册失败");
			setRedirectUrl("/CMS/user/Register");
			return "error";
		}
		
		//验证用户名或登陆名过长
		if(user.getUserName().length()>16 || user.getName().length()>16){
			setTips("用户名或登陆名过长，注册失败");
			setRedirectUrl("/CMS/user/Register");
			return "error";
		}
		
		//验证非空
		if(user.getEmail().trim().length()==0 || user.getName().trim().length()==0 ||
				user.getPassword().trim().length() ==0 || user.getUserName().trim().length()==0){
			setTips("信息不能为空，注册失败");
			setRedirectUrl("/CMS/user/Register");
			return "error";
		}
		
		//用户名重复验证
		
		// 获取页码总数
		int pageList = um.getPageNum();
		
		for(int t=0;t<pageList;t++){
			List<User> userList = um.getUserByPage(t);
			
			for( User users:userList){
				if(users.getUserName().equals(user.getUserName())){
					setTips("该用户名已存在，注册失败");
					setRedirectUrl("/CMS/user/Register");
					return "error";
				}
			}
		}
		
		
		// 加密密码
		user.setPassword(MD5.GetMD5Code(user.getPassword()));

		// 获取项目路径，传递给业务对象
		String projectPath = request.getSession().getServletContext()
				.getRealPath("/");
		um.setProjectPath(projectPath);

		// 调用业务对象，执行注册新用户逻辑
		if (um.userRegister(user, false)) {
			setTips("注册成功");
			setRedirectUrl("/CMS/user/Login");
			return "success";
		}
		setTips("注册失败，请检查信息是否正确");
		setRedirectUrl("/CMS/user/Register");
		return "error";
	}

}
