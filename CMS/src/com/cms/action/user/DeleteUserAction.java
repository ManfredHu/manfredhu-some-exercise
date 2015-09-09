package com.cms.action.user;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.cms.action.base.BaseAction;

public class DeleteUserAction extends BaseAction implements ServletRequestAware {

	private int userID;
	
	private HttpServletRequest request;

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}
	
	@Override
	public void setServletRequest(HttpServletRequest request) {
		
		this.request = request;
	}

	public String execute() {

		// 获取UserID
		int[] userIDs = new int[1];
		userIDs[0] = getUserID();
		
		//获取项目路径，传递给业务对象
		String projectPath = request.getSession().getServletContext().getRealPath("/");
		cm.setProjectPath(projectPath);
		
		//删除用户目录
		if(!cm.deleteFile(cm.getUserPathID(userIDs[0]))) {
			setTips("删除用户失败");
			setRedirectUrl("/CMS/user/UserManage");
			return "error";
		}

		// 删除用户
		if (!um.userDelete(userIDs)) {
			setTips("删除用户失败");
			setRedirectUrl("/CMS/user/UserManage");
			return "error";
		}
		setTips("删除用户成功");
		setRedirectUrl("/CMS/user/UserManage");
		return "success";
		
	}

}
