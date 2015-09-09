package com.cms.action.code;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.cms.action.base.BaseAction;
import com.cms.domain.CodeFile;

public class CodeModifyAction extends BaseAction implements ServletRequestAware {

	
	private static final long serialVersionUID = 1L;
	
	private HttpServletRequest request;
	
	private Integer fileID = null;				//要修改的文件ID
	private CodeFile codeFile;				//文件实例
	private boolean isUpdate = false;	//是否将更新（是查看还是修改）

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
	public CodeFile getCodeFile() {
		return codeFile;
	}
	public void setCodeFile(CodeFile codeFile) {
		this.codeFile = codeFile;
	}
	public boolean getIsUpdate() {
		return isUpdate;
	}
	public void setIsUpdate(boolean isUpdate) {
		this.isUpdate = isUpdate;
	}

	public String execute() {
		
		//根据用户操作（分修改前的信息查询和修改更新到数据库两个逻辑）
		//-----------------------------------------------------------------------
		
		//修改前， 读出数据
		if(!isUpdate) {
			
			//判断是否有ID
			if(getFileID() == null) {
				
				setTips("错误的操作");
				setRedirectUrl("/CMS/code/codeList.action");
				return "error";
			}
			
			//获取文件实例
			setCodeFile(cm.getFileByID(getFileID()));
			
			//返回"查看"视图
			return "view";
			
		}else {
			
			//判断是否有ID
			if(getCodeFile() == null || getCodeFile().getFileID() == null) {
				
				setTips("错误的操作");
				setRedirectUrl("/CMS/code/codeList.action");
				return "error";
			}
			
			//文件名的非空和长度验证
			if(getCodeFile().getName().equals("") || getCodeFile().getName().length() > 50) {
				
				setTips("所输入的文件名不正确，文件名长度必须在1到50之间");
				setRedirectUrl("/CMS/code/codeModify.action?fileID=" + getFileID());
				return "error";
			}
			
			//获取项目路径，传递给业务对象
			String projectPath = request.getSession().getServletContext().getRealPath("/");
			cm.setProjectPath(projectPath);
			
			//更新文件实例
			if(cm.updateFileInfo(getCodeFile())) {
				return "success";
			}else {
				
				setTips("修改失败！");
				setRedirectUrl("/CMS/code/codeList.action");
				return "error";
			}
			
		}
		
	}

}
