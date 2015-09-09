package com.cms.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.cms.dao.CodeFileDao;
import com.cms.domain.CodeFile;

public class CodeFileDaoImpl extends HibernateDaoSupport implements CodeFileDao {

	@Override
	public CodeFile get(Integer codeFileId) {
		
		return getHibernateTemplate().get(CodeFile.class, codeFileId);
	}

	@Override
	public Integer save(CodeFile codeFile) {
		return (Integer)getHibernateTemplate().save(codeFile);
	}

	@Override
	public void update(CodeFile codeFile) {
		getHibernateTemplate().update(codeFile);
	}

	@Override
	public void delete(CodeFile codeFile) {
		getHibernateTemplate().delete(codeFile);
	}

	@Override
	public void delete(Integer codeFileId) {
		getHibernateTemplate().delete(get(codeFileId));
	}

	@Override
	public Integer getProjectID(Integer rootID, Integer childID) {
		
		Integer currentFileID = childID;
		Integer fatherFileID = childID;
		String hql = "select f.fatherFileID from CodeFile as f where f.fileID = ?";
		
		//循环向上遍历，获取项目ID
		while(fatherFileID != rootID) {
			
			currentFileID = fatherFileID;
			fatherFileID = (Integer)getHibernateTemplate().find(hql,currentFileID).get(0);
		}
		return currentFileID;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<CodeFile> findList(final Integer userID,final Integer fatherPathID,
			boolean isCheckeShare,boolean isManager, final int offset, final int pagesize) {
		
		//设置HQL语句，根据是否检查共享状态设置
		final String hql = String.format("select c from CodeFile as c "
				+ "where c.fatherFileID = :pFatherFileID %s  %s"
				, isManager ? "" : String.format("and c.userID = %d", userID)
				,isCheckeShare? "and c.isShare = true" : "");
		
		//执行HQL语句，并执行分页查询
		@SuppressWarnings("rawtypes")
		List<CodeFile> fileList = (List<CodeFile>)getHibernateTemplate()
				.executeFind(new HibernateCallback() {
					public Object doInHibernate(Session session)
							 throws HibernateException, SQLException
							 {
									List result = session.createQuery(hql)
											.setString("pFatherFileID", fatherPathID.toString())
											.setFirstResult(offset)
											.setMaxResults(pagesize)
											.list();
									return result;
							 }
				});
		
		return fileList;
	}

	@Override
	public int getRecordNum(Integer userID, Integer fatherPathID,
			boolean isCheckeShare,boolean isManager) {
		String hql = String.format("select count(*) from CodeFile as c "
				+ "where c.fatherFileID = ? %s  %s"
				,isManager ? "" : String.format("and c.userID = %d", userID)
				,isCheckeShare? "and c.isShare = true" : "");
		
		Number num = (Number)getHibernateTemplate()
				.find(hql,fatherPathID).get(0);
		return num.intValue();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<CodeFile> findProjectList(final int offset,final int pagesize) {
		
		//非相关子查询获取项目列表
		final String hql = "select c from CodeFile as c where "
				+ "c.isShare = true and c.fatherFileID in (select r.fileID from CodeFile as r where r.fatherFileID = 0 ) ";
		
		@SuppressWarnings("rawtypes")
		List<CodeFile> fileList = (List<CodeFile>)getHibernateTemplate()
				.executeFind(new HibernateCallback() {
					public Object doInHibernate(Session session)
							 throws HibernateException, SQLException
							 {
									List result = session.createQuery(hql)
											.setFirstResult(offset)
											.setMaxResults(pagesize)
											.list();
									return result;
							 }
				});
		
		return fileList;
	}

	@Override
	public int getProjectRecordNum() {
		
		String hql = "select count(*) from CodeFile as c where "
				+ "c.isShare = true and  c.fatherFileID in (select r.fileID from CodeFile as r where r.fatherFileID = 0 ) ";
		
		Number num = (Number)getHibernateTemplate().find(hql).get(0);
		
		return num.intValue();
		
	}

	@Override
	public Integer getUserPathID(Integer userID) {
		
		String hql = "select c.fileID from CodeFile as c where c.fatherFileID = 0 and c.userID = ? ";
		
		@SuppressWarnings("unchecked")
		List<Integer> fileIDs = (List<Integer>)getHibernateTemplate().find(hql,userID);
		
		if(fileIDs.size() == 0) {
			return null;
		}else {
			return (Integer)fileIDs.get(0);
		}
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<CodeFile> findChildFileList(Integer codeFileID) {
		
		return (List<CodeFile>)getHibernateTemplate()
				.find("select c from CodeFile as c where c.fatherFileID = ? ", codeFileID);
	}
	
	

}
