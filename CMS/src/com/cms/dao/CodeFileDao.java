package com.cms.dao;

import java.util.List;

import com.cms.domain.CodeFile;

public interface CodeFileDao {

	/**
	 * 根据文件ID获取文件实例
	 * @param codeFileId	文件ID
	 * @return	文件实例
	 */
	CodeFile get(Integer codeFileId);
	
	/**
	 * 保存文件实例
	 * @param codeFile	文件实例
	 * @return	文件实例标志（ID）
	 */
	Integer save(CodeFile codeFile);
	
	/**
	 * 更新文件实例
	 * @param codeFile	文件实例
	 */
	void update(CodeFile codeFile);
	
	/**
	 * 删除文件实例
	 * @param codeFile 文件实例
	 */
	void delete(CodeFile codeFile);
	
	/**
	 * 根据ID删除文件实例
	 * @param codeFileId	文件ID
	 */
	void delete(Integer codeFileId);
	
	/**
	 * 根据根目录ID以及子项ID获取项目文件ID
	 * @param rootID		用户根目录ID
	 * @param childID	子项ID
	 * @return	项目ID
	 */
	Integer getProjectID(Integer rootID,Integer childID);
	
	/**
	 * 根据用户ID、父目录ID、是否检查共享状态获取文件列表
	 * @param userID 用户ID
	 * @param fatherPathID	父目录ID
	 * @param isCheckeShare	是否检查共享状态
	 * @param isManager 是否为管理员
	 * @param offset 开始索引
	 * @param pagesize 页大小
	 * @return	返回文件列表
	 */
	List<CodeFile> findList(Integer userID, Integer fatherPathID
			, boolean isCheckeShare,boolean isManager, int offset, int pagesize);
	
	/**
	 * 获取记录总数
	 * @param userID	用户ID
	 * @param fatherPathID	父目录ID
	 * @param isCheckeShare	是否检查共享状态
	 * @param isManager 是否为管理员
	 * @return	相应筛选条件记录总数
	 */
	int getRecordNum(Integer userID, Integer fatherPathID, boolean isCheckeShare,boolean isManager);
	
	/**
	 * 获取共享项目文件列表
	 * @param offset	开始索引
	 * @param pagesize 页大小
	 * @return 项目文件列表
	 */
	List<CodeFile> findProjectList(int offset, int pagesize);
	
	/**
	 * 获取共享项目记录总数
	 * @return 共享项目记录总数
	 */
	int getProjectRecordNum();
	
	/**
	 * 获取用户根目录文件ID
	 * @param userID	用户ID
	 * @return	返回用户根目录文件ID
	 */
	Integer getUserPathID(Integer userID);
	
	/**
	 * 获取目录所有一级目录
	 * @param codeFileID	文件ID	
	 * @return	返回一级子目录文件实例集合
	 */
	List<CodeFile> findChildFileList(Integer codeFileID);
	
}
