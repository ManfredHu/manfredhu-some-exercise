package com.cms.service.impl;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.cms.dao.CodeFileDao;
import com.cms.dao.UserDao;
import com.cms.domain.CodeFile;
import com.cms.domain.User;
import com.cms.service.UserManage;

public class UserManageImpl implements UserManage {
	
	private UserDao userDao;
	private CodeFileDao codeFileDao;
	
	private String projectPath; 

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public CodeFileDao getCodeFileDao() {
		return codeFileDao;
	}

	public void setCodeFileDao(CodeFileDao codeFileDao) {
		this.codeFileDao = codeFileDao;
	}
	
	@Override
	public String getProjectPath() {
		return this.projectPath;
	}
	
	@Override
	public void setProjectPath(String projectPath) {
		
		this.projectPath = projectPath;
	}

	@Override
	public boolean loginValidate(User user) {
			
		User realUser = userDao.findByUserName(user.getUserName());
		
		if(realUser == null) return false;
		
		if(realUser.getPassword().equals(user.getPassword())) {
			
			user.setUserID(realUser.getUserID());
			user.setName(realUser.getName());
			user.setIsManager(realUser.getIsManager());
			user.setEmail(realUser.getEmail());
			return true;
		}
		return false;
	}

	@Override
	public boolean userRegister(User user, boolean isManager) {
		
		//插入新用户记录
		user.setIsManager(isManager); 
		if(userDao.save(user) <= 0) {
			return false;
		}
		
		//不给管理员建立目录
		if(isManager) return true;
		
		//新建用户代码目录
		String relativePath =  "Code\\" + user.getUserName();
		File userPath = new File(getProjectPath() + relativePath);
		if(!userPath.exists()) 
			if(!userPath.mkdirs()) return false;
		
		//插入用户代码目录记录
		CodeFile userPathFile = new CodeFile();
		userPathFile.setUserID(user.getUserID()); 
		userPathFile.setFatherFileID(0);
		userPathFile.setName(user.getUserName());
		userPathFile.setPath(relativePath);
		userPathFile.setIsShare(true);
		userPathFile.setUploadTime(new Date());
		userPathFile.setDescription("");
		if(codeFileDao.save(userPathFile) <= 0) {
			return false;
		}
		
		return true;
	}

	@Override
	public boolean userDelete(int[] userIDs) {
		
		//删除用户
		userDao.delete(userIDs[0]);
		
		return true;
	}

	@Override
	public boolean updateUser(User user, Integer passwordMode) {
		
		userDao.update(user);
		return true;

	}

	@Override
	public User getByID(Integer userID) {
		return userDao.get(userID);
	}

	@Override
	public List<User> getUserByPage(int page) {
		
		return userDao.findByPage(page, PAGE_SIZE);
	}

	@Override
	public int getPageNum() {
		
		int pagenum=0;
		
		if(userDao.findAll().size()%PAGE_SIZE!=0)
			pagenum=userDao.findAll().size()/PAGE_SIZE+1;
		else pagenum=userDao.findAll().size();
		
		return pagenum;
	}

	@Override
	public User getByName(String userName) {
		
		User realUser = userDao.getFormName(userName);
		return realUser;
	}

	

}
