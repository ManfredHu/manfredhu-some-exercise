package com.cms.service;

import java.io.File;
import java.io.InputStream;
import java.util.List;

import javax.servlet.jsp.JspWriter;

import com.cms.domain.CodeFile;
import com.cms.domain.User;

public interface CodeManage {

	//页大小
	public static final int PAGE_SIZE = 10;
	
	
	/**
	 * 获取项目物理路径
	 * @return	项目物理路径
	 */
	String getProjectPath();
	
	/**
	 * 设置项目物理路径
	 */
	void setProjectPath(String projectPath);
	
	/**
	 * 代码或项目打包上传
	 * @param uploadFile 上传的文件
	 * @param fileName 文件名
	 * @param codeFile 文件实例
	 * @return	返回上传是否成功
	 * @throws Exception 
	 */
	boolean uploadCodeFile(File uploadFile, String fileName, CodeFile codeFile) throws Exception;
	
	/**
	 * 打包下载项目ZIP文件
	 * @param codeFileID	项目子目录ID
	 * @param	项目根目录实例
	 * @return	返回ZIP文件输出流
	 */
	InputStream downloadZipProject(Integer codeFileID,CodeFile projectFile) throws Exception ;
	
	/**
	 * 删除项目文件
	 * @param codeFileID 文件ID
	 * @return	返回是否删除成功
	 */
	boolean deleteFile(Integer codeFileID);
	
	/**
	 * 更新文件信息
	 * @param codeFile	文件实例
	 * @return	返回是否更新成功
	 */
	boolean updateFileInfo(CodeFile codeFile);
	
	/**
	 * 根据ID获取文件实例
	 * @param codeFileID	文件ID
	 * @return	文件实例
	 */
	CodeFile getFileByID(Integer codeFileID);
	
	/**
	 * 获取用户根目录文件ID（用作“返回上一级”的根判断）
	 * @param userID	用户ID
	 * @return	返回用户根目录文件ID
	 */
	Integer getUserPathID(Integer userID);
	
	/**
	 * 获取文件列表
	 * @param user	用户实例
	 * @param fatherPathID	父目录ID
	 * @param isCheckeShare	是否进行共享状态的检查
	 * @param page	页码
	 * @return	指定用户和目录的指定页的文件列表
	 */
	List<CodeFile> getFileList(User user,Integer fatherPathID
			,boolean isCheckeShare,int page);
	
	/**
	 * 获取指定文件列表的页总数
	 * @param user	用户实例
	 * @param fatherPathID	文件父目录ID
	 * @param isCheckeShare	是否进行共享状态的检查
	 * @return	页总数
	 */
	int getPageNum(User user,Integer fatherPathID,boolean isCheckeShare);
	
	/**
	 * 获取共享项目
	 * @param page	页码
	 * @return	指定页被共享的项目集合
	 */
	List<CodeFile> getSharedProject(int page);
	
	/**
	 * 获取共享项目页总数
	 * @return	页总数
	 */
	int getSharedPageNum();
	
	/**
	 * 根据文件实例，判断文件是文件还是目录
	 * @param codeFile	文件实例
	 * @return	是否为文件
	 */
	boolean isFile(CodeFile codeFile);
	
	/**
	 * 根据文件实例，获取文件内容并格式化输出（用以代码查看）
	 * @param viewFile	文件实例
	 * @param out jsp输出对象
	 */
	void getFileContent(CodeFile viewFile,JspWriter out) throws Exception ;
	
	/**
	 * 获取文件（子目录）的项目跟目录ID
	 * @param codeFileID	文件ID
	 * @return	项目根目录ID
	 */
	Integer getProjectRootPathID(Integer codeFileID);
}
