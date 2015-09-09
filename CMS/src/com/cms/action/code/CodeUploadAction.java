package com.cms.action.code;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.cms.action.base.BaseAction;
import com.cms.domain.CodeFile;
import com.cms.domain.User;
import com.opensymphony.xwork2.ActionContext;

public class CodeUploadAction extends BaseAction implements ServletRequestAware {

	private static final long serialVersionUID = 1L;
	
	private CodeFile code;
	private File upload;
	private String uploadContentType;
	private String uploadFileName;
	
	
	private HttpServletRequest request;
	
	public CodeFile getCode() {
		return code;
	}
	public void setCode(CodeFile code) {
		this.code = code;
	}
	public File getUpload() {
		return upload;
	}
	public void setUpload(File upload) {
		this.upload = upload;
	}
	public String getUploadContentType() {
		return uploadContentType;
	}
	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}
	public String getUploadFileName() {
		return uploadFileName;
	}
	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}
	
	@Override
	public void setServletRequest(HttpServletRequest request) {
		
		this.request = request;
	}
	
	public String execute() throws Exception {
		
		if(getUpload() == null) {
			
			setTips("您还没有选择文件！");
			setRedirectUrl("/CMS/myCode/CodeUpload");
			return "error";
		}
		
		
		//获取用户ID并设置文件用户ID属性
		ActionContext ctx = ActionContext.getContext();
		User userSession = (User)ctx.getSession().get("user");
		code.setUserID(userSession.getUserID());
		
		//获取项目路径，传递给业务对象
		String projectPath = request.getSession().getServletContext().getRealPath("/");
		cm.setProjectPath(projectPath);
		
		//调用业务逻辑，进行实际上传业务
		
		
		if(cm.uploadCodeFile(getUpload(), getUploadFileName(), getCode())) {
			return "success";
		}
		setTips("上传失败");
		setRedirectUrl("/CMS/myCode/CodeUpload");
		return "error";
	}

}
