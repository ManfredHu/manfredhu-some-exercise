package com.cms.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.cms.dao.UserDao;
import com.cms.domain.User;

public class UserDaoImpl extends HibernateDaoSupport implements UserDao {

	@Override
	public User get(Integer userId) {
		return getHibernateTemplate().get(User.class, userId);
	}

	@Override
	public Integer save(User user) {
		return (Integer)getHibernateTemplate().save(user);
	}

	@Override
	public void update(User user) {
		getHibernateTemplate().update(user);
	}

	@Override
	public void delete(User user) {
		getHibernateTemplate().delete(user);
	}

	@Override
	public void delete(Integer userId) {
		getHibernateTemplate().delete(get(userId));
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> findAll() {
		return (List<User>)getHibernateTemplate().find("from User ");
	}

	@Override
	public User findByUserName(String userName) {
		@SuppressWarnings("unchecked")
		List<User> users =	(List<User>)getHibernateTemplate()
				.find("from User as u where u.userName=? ",userName);
		if(users.size() == 0) {
			return null;
		}
		return users.get(0);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> findByPage(final int offset,final int pagesize) {
		
		final String hql = "from User";
		@SuppressWarnings("rawtypes")
		List<User> userList = (List<User>)getHibernateTemplate()
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
		return userList;
	}

	@Override
	public int getRecordNum() {
		
		 Number num = (Number)getHibernateTemplate()
				 .find("select count(*) from User").get(0);
		 
		 return num.intValue();
	}

	@Override
	public User getFormName(String userName) {
		
		return (User) getHibernateTemplate().findByNamedQuery(userName);		//根据用户名获取用户信息
	}

}
