package com.cms.action.code;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.cms.action.base.BaseAction;

public class CodeDeleteAction extends BaseAction implements ServletRequestAware {

	private static final long serialVersionUID = 1L;
	
	private HttpServletRequest request;
	
	private Integer fileID = null;				//要删除的文件ID
	

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}
	public Integer getFileID() {
		return fileID;
	}
	public void setFileID(Integer fileID) {
		this.fileID = fileID;
	}
	
	
	public String execute() {
		
		//非空ID验证
		if(getFileID() == null) {
			setTips("错误的操作");
			setRedirectUrl("/CMS/code/codeList.action");
			return "error";
		}
		
		//获取项目路径，传递给业务对象
		String projectPath = request.getSession().getServletContext().getRealPath("/");
		cm.setProjectPath(projectPath);
		
		if(!cm.deleteFile(getFileID())) {
			setTips("删除失败");
			setRedirectUrl("/CMS/code/codeList.action");
			return "error";
		}
		
		return "success";
	}
	
	
	
	

}
