package com.cms.dao;

import java.util.List;

import com.cms.domain.User;

public interface UserDao {

	/**
	 * 根据用户获取用户实例
	 * @param userId		用户ID
	 * @return	用户实例
	 */
	User get(Integer userId);
	
	/**
	 * 根据用户名获取用户实例
	 * @param userName		用户名
	 * @return	用户实例
	 */
	User getFormName(String userName);
	
	/**
	 * 保存持久化的实例
	 * @param user	User持久化对象
	 * @return	持久化对象标识属性（ID）
	 */
	Integer save(User user);
	
	/**
	 * 更新持久化实例
	 * @param user	User持久化实例
	 */
	void update(User user);
	
	/**
	 * 删除持久化实例
	 * @param user	User持久化实例
	 */
	void delete(User user);
	
	/**
	 * 根据持久化实例
	 * @param userId 用户持久化对象Id
	 */
	void delete(Integer userId);
	
	/**
	 * 获取所有用户实例
	 * @return	用户实例集合
	 */
	List<User> findAll();
	
	/**
	 * 根据用户名获取用户实例
	 * @param userName	用户名
	 * @return	相应用户实例
	 */
	User findByUserName(String userName);
	
	/**
	 * 根据页码分页查询用信息
	 * @param offset	起始索引
	 * @param pagesize	页大小
	 * @return	指定页用户信息集合
	 */
	List<User> findByPage(final int offset,final int pagesize);
	
	/**
	 * 获取用户记录总数
	 * @return	返回用户记录总数
	 */
	int getRecordNum();
	
}
