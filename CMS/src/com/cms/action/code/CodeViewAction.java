package com.cms.action.code;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.cms.action.base.BaseAction;
import com.cms.domain.CodeFile;

public class CodeViewAction extends BaseAction implements ServletRequestAware {

	private static final long serialVersionUID = 1L;
	
	private Integer fileID = null;
	private CodeFile codeFile;
	
	private HttpServletRequest request;
	
//	private String[] allowTypes = { "java","txt","xml","html"}; 
	private static List<String> allowTypes = new ArrayList<String>();
	static {
		allowTypes.add("jsp");
		allowTypes.add("java");
		allowTypes.add("txt");
		allowTypes.add("xml");
		allowTypes.add("html");
		allowTypes.add("css");
		allowTypes.add("aspx");
		allowTypes.add("cs");
		allowTypes.add("c");
	}
	
	@Override
	public void setServletRequest(HttpServletRequest response) {
		this.request = response;
	}
	
	public Integer getFileID() {
		return fileID;
	}
	public void setFileID(Integer fileID) {
		this.fileID = fileID;
	}
	public CodeFile getCodeFile() {
		return codeFile;
	}
	public void setCodeFile(CodeFile codeFile) {
		this.codeFile = codeFile;
	}

	public String execute() throws Exception {
		
		if(getFileID() == null) {
			
			setTips("错误的操作");
			setRedirectUrl("CMS/code/codeList.action"); 
			return "error";
		}
		
		//获取项目路径，传递给业务对象
		String projectPath = request.getSession().getServletContext().getRealPath("/");
		cm.setProjectPath(projectPath);

		//处理传值的中文乱码问题
		getCodeFile().setName(
				new String(
						getCodeFile().getName().getBytes("ISO-8859-1"),"UTF-8"));
		getCodeFile().setPath(
				new String(
						getCodeFile().getPath().getBytes("ISO-8859-1"),"UTF-8"));
		
		//是否为文件的验证
		if(!cm.isFile(getCodeFile())) {
			
			setTips("所选文件无法查看，请重新选择");
			setRedirectUrl("CMS/code/codeList.action"); 
			return "error";
		}
		
		//是否为可读文件的验证
		String fileType = getCodeFile().getName().substring
				(getCodeFile().getName().lastIndexOf(".") + 1).toLowerCase();
		
		if(!allowTypes.contains(fileType)) {
			
			setTips("所选文件无法查看，请重新选择");
			setRedirectUrl("CMS/code/codeList.action"); 
			return "error";
		}
		
		return "success";
	}
	

}
