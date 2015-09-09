package com.cms.action.code;

import java.io.InputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.cms.action.base.BaseAction;
import com.cms.domain.CodeFile;

public class ProjectDownloadAction extends BaseAction implements ServletRequestAware,ServletResponseAware {

	private static final long serialVersionUID = 1L;
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private Integer fileID = null;
	private CodeFile projectFile = new CodeFile();
	
	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}
	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}
	public Integer getFileID() {
		return fileID;
	}
	public void setFileID(Integer fileID) {
		this.fileID = fileID;
	}
	public CodeFile getProjectFile() {
		return projectFile;
	}
	public void setProjectFile(CodeFile projectFile) {
		this.projectFile = projectFile;
	}
	//获取项目的ZIP文件输出流
	public InputStream getProjectZipFile() throws Exception {
		return cm.downloadZipProject(getFileID(),getProjectFile());
	}
	
	public String execute() throws Exception {
		
		//fileID非空验证
		if(getFileID() == null) {
			
			setTips("错误的操作");
			setRedirectUrl("CMS/code/codeList.action"); 
			return "error";
		}
		
		//获取项目路径，传递给业务对象
		String projectPath = request.getSession().getServletContext().getRealPath("/");
		cm.setProjectPath(projectPath);
		
		
		
		byte [] buf = new byte[1024 * 10];
		ServletOutputStream sos =  response.getOutputStream();
		InputStream fileInputStream = getProjectZipFile();
		
		response.setContentType("application/zip;charset=ISO8859-1");
		response.setHeader("Content-disposition", "attachment;filename=" + getProjectFile().getName() + ".zip");
		System.out.println(getProjectFile().getName());
		
		int len;
		while((len = fileInputStream.read(buf, 0, buf.length)) >= 0) {
			sos.write(buf, 0, len);
		}
		fileInputStream.close();
		sos.flush();
		sos.close();
		
		
		//返回空值，Struts2跳转而带来的服务器二次响应的异常
		return null;
		
	}

	
}
