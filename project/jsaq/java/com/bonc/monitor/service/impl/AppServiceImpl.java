package com.bonc.monitor.service.impl;

import com.bonc.common.PageContent;
import com.bonc.monitor.service.AppService;
import com.bonc.monitor.dao.AppDAO;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 应用服务接口实现类
 */
@Service
@Transactional
public class AppServiceImpl implements AppService {
@Autowired
	private AppDAO appDAO;


	/**
	 * @see com.bonc.monitor.service.AppService#findByTomcat(long)
	 */
	public List findByTomcat(long id) {
		return null;
	}


	/**
	 * @see com.bonc.monitor.service.AppService#getSessionNum(long)
	 */
	public int getSessionNum(long id) {
		return 0;
	}


	/**
	 * @see com.bonc.monitor.service.AppService#getStatus(long)
	 */
	public String getStatus(long id) {
		return null;
	}


	/**
	 * @see com.bonc.monitor.service.AppService#getStatusAnalysis(long)
	 */
	public Map getStatusAnalysis(long id) {
		return null;
	}


	/**
	 * @see com.bonc.monitor.service.AppService#getSessionAnalysis(long)
	 */
	public List getSessionAnalysis(long id) {
		return null;
	}


    @Override
    public void create(Object obj) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Object read(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void update(Object obj) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void delete(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List findAll() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean start(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean stop(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean restart(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map findByCondition(Object obj, PageContent page) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * @return the appDAO
     */
    public AppDAO getAppDAO() {
        return appDAO;
    }

    /**
     * @param appDAO the appDAO to set
     */
    public void setAppDAO(AppDAO appDAO) {
        this.appDAO = appDAO;
    }


}
