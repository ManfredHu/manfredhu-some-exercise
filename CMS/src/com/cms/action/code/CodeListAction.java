package com.cms.action.code;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.cms.action.base.BaseAction;
import com.cms.domain.CodeFile;
import com.cms.domain.User;
import com.opensymphony.xwork2.ActionContext;

public class CodeListAction extends BaseAction implements ServletRequestAware {

	private static final long serialVersionUID = 1L;
	
	private static final int groupSize = 5;
	
	private Integer dirFileID = null;					//当前请求的目录ID
	private CodeFile parentFile;							//目录根文件
	private List<CodeFile> fileList;						//目录文件列表
	private boolean isShowParentLink = false;	//是否可以“返回上一级”
	
	private boolean isSharePage = false;			//是否是请求共享详细页面
	private CodeFile rootProjectFile;					//代码共享页面的项目根文件
	
	private int currentPage = 1;							//当前页	默认为1
	private int pageNum = 1;								//总页数
	private int prePage = 1;								//上一页
	private int nextPage = 1;								//下一页
	
	private int currentGroup = 1;				//当前组
	private int groupNum = 1;					//总组数
	private int startPage = 1;						//页码组的开始页
	private int endPage = 1;						//页码组的结束页
	
	private HttpServletRequest request;
	
	public Integer getDirFileID() {
		return dirFileID;
	}
	public void setDirFileID(Integer dirFileID) {
		this.dirFileID = dirFileID;
	}
	public CodeFile getParentFile() {
		return parentFile;
	}
	public void setParentFile(CodeFile parentFile) {
		this.parentFile = parentFile;
	}
	public List<CodeFile> getFileList() {
		return fileList;
	}
	public void setFileList(List<CodeFile> fileList) {
		this.fileList = fileList;
	}
	public boolean getIsShowParentLink() {
		return isShowParentLink;
	}
	public void setIsShowParentLink(boolean isShowParentLink) {
		this.isShowParentLink = isShowParentLink;
	}
	public boolean getIsSharePage() {
		return isSharePage;
	}
	public void setIsSharePage(boolean isSharePage) {
		this.isSharePage = isSharePage;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPrePage() {
		return prePage;
	}
	public void setPrePage(int prePage) {
		this.prePage = prePage;
	}
	public int getNextPage() {
		return nextPage;
	}
	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
	public int getCurrentGroup() {
		return currentGroup;
	}
	public void setCurrentGroup(int currentGroup) {
		this.currentGroup = currentGroup;
	}
	public int getGroupNum() {
		return groupNum;
	}
	public void setGroupNum(int groupNum) {
		this.groupNum = groupNum;
	}
	public int getStartPage() {
		return startPage;
	}
	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}
	public int getEndPage() {
		return endPage;
	}
	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}
	public CodeFile getRootProjectFile() {
		return rootProjectFile;
	}
	public void setRootProjectFile(CodeFile rootProjectFile) {
		this.rootProjectFile = rootProjectFile;
	}
	@Override
	public void setServletRequest(HttpServletRequest response) {
		this.request = response;
	}
	
	
	public String execute() {
		
		String reString = "input";
		Integer rootPathID;
		User user;
		boolean isCheckedShare = false;
		
		//判断请求时"我的代码"页面还是"代码共享详细页面"
		
		//获取用户session
		ActionContext ctx = ActionContext.getContext();
		user = (User)ctx.getSession().get("user");
		
		if(!getIsSharePage()) {
			
			
			//获取用户根目录文件ID
			if(user.getIsManager()) {
				rootPathID = 0;
			}else {
				
				Integer temp = user.getUserID();
				if(temp == null) {
					setTips("加载错误，请重试");
					setRedirectUrl("/CMS/code/codeList.action"); 
					return "error";
				}
				rootPathID = cm.getUserPathID(temp);
			}
			
			
			//若当前请求的目录ID为空，则设置为用户根目录ID
			if(getDirFileID() == null) {
				setDirFileID(rootPathID);
			}
			
			//设置文件实例属性
			setParentFile(cm.getFileByID(getDirFileID()));
			if(getParentFile() == null && getDirFileID() != 0 ) {
				setTips("加载错误，请重试");
				setRedirectUrl("/CMS/code/codeList.action"); 
				return "error";
			}
			
			//防止其他用户(非管理员)访问的越权处理
			if(!user.getIsManager()) {
				User temp = um.getByID(getParentFile().getUserID());
				if(temp.getUserID() != user.getUserID()) {
					
					setTips("错误的操作，请重试");
					setRedirectUrl("/CMS/code/codeList.action"); 
					return "error";
				}
			}
			//设置返回的页面
			reString = "myCode";
			
		}else {
			
			if(getDirFileID() == null) {
				return "input";
			}
			
			//设置文件实例属性
			setParentFile(cm.getFileByID(getDirFileID()));
			if(getParentFile() == null ) {
				setTips("加载错误，请重试");
				setRedirectUrl("/CMS/code/codeList.action"); 
				return "error";
			}
			
			//设置用户属性
			if(!user.getIsManager()) {
				user = um.getByID(getParentFile().getUserID());
			}
			
			//设置根目录ID属性
			rootPathID = cm.getProjectRootPathID(getDirFileID());
			
			//设置项目根目录文件实例
			setRootProjectFile(cm.getFileByID(rootPathID));
			
			//设置查询结果检查共享状态
			isCheckedShare = true;
			
			//设置返回页面
			reString = "codeShare";
			
		}
		
		
		//初始化各项公共属性
		//------------------------
		
		//获取项目路径，传递给业务对象
		String projectPath = request.getSession().getServletContext().getRealPath("/");
		cm.setProjectPath(projectPath);
		
		//判断是否为文件，是则跳转到查看Action
		if(getDirFileID() != 0 && getParentFile().getName().lastIndexOf(".") != -1 && cm.isFile(getParentFile())) {
				return "view";
		}
		
		//根据当前目录ID是否等于用户根目录ID，判断是否可以执行“返回上一级”操作
		if(!getDirFileID().equals(rootPathID)) {
			setIsShowParentLink(true);
		}
		
		//设置页属性
		setPageNum(cm.getPageNum(user, getDirFileID(), isCheckedShare));
		setPrePage(getCurrentPage() == 1 ? 1 : getCurrentPage() - 1);
		setNextPage(getCurrentPage() == getPageNum() ? 
				 getPageNum() : getCurrentPage() + 1); 
		
		//设置组属性
		setCurrentGroup(getCurrentPage() / groupSize + 1); 
		setGroupNum(getPageNum() % groupSize == 0
				? getPageNum() / groupSize : getPageNum() / groupSize + 1); 
		setStartPage((getCurrentGroup() - 1) * groupSize);
		if(getStartPage() <= 0 ) setStartPage(1);
		setEndPage(getCurrentGroup() * groupSize + 1);
		if(getEndPage() > getPageNum()) setEndPage(getPageNum());
		
		//获取文件列表
		//-------------------
		setFileList(cm.getFileList(user, getDirFileID(), isCheckedShare, getCurrentPage()));
		if(getFileList() == null) {
			
			setTips("加载错误，请重试");
			setRedirectUrl(String.format("/CMS/code/codeList.action%s"
					, getIsShowParentLink() ? String.format("?dirFileID=%d", getParentFile().getFatherFileID()) : "" )); 
			return "error";
		}
		
		//返回指定的返回页面
		return reString;
		
	}

}
