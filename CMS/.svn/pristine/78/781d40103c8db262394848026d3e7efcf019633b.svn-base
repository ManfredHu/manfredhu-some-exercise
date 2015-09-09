package com.cms.service;

import java.util.List;

import com.cms.domain.User;

public interface UserManage {
	
	//不更新密码
	public static final int PASSWORD_NO = 0;
	
	//更新密码
	public static final int PASSWORD_UPDATE = 1;
	
	//重置密码
	public static final int PASSWORD_RESET = 2;
	
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
	 * 用户的登陆验证
	 * @param user	用户实例
	 * @return	是否通过验证
	 */
	boolean loginValidate(User user);
	
	/**
	 * 用户注册
	 * @param user	用户实例
	 * @param isManager 是否为管理员
	 * @return	是否成功注册
	 */
	boolean userRegister(User user,boolean isManager);
	
	/**
	 * 删除选定的用户群
	 * @param userIDs	用户ID集合
	 * @return	是否成功删除
	 */
	boolean userDelete(int[] userIDs); 
	
	/**
	 * 更新用户资料
	 * @param user	用户实例
	 * @param passwordMode 密码模式
	 * @return	是否更新成功
	 */
	boolean updateUser(User user,Integer passwordMode);
	
	/**
	 * 获取单个用户信息
	 * @param userID	用户ID
	 * @return	返回用户实例
	 */
	User  getByID(Integer userID);
	
	/**
	 * 获取单个用户信息
	 * @param userName	用户名
	 * @return	返回用户实例
	 */
	User  getByName(String userName);
	
	/**
	 * 获取指定页码所有用户信息
	 * @param page	页码信息
	 * @return	返回所有用户信息
	 */
	List<User> getUserByPage(int page);
	
	/**
	 * 获取用户数据分页页数
	 * @return	返回分页页总数
	 */
	int getPageNum();
	
}
