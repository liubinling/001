package com.bonc.monitor.controller;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;
import com.bonc.monitor.service.impl.AppServiceImpl;
import com.bonc.common.domain.ResultMessage;

/**
 * 应用信息控制器类
 */
public class AppController implements CRUDController {

	private AppServiceImpl appServiceImpl;

	/**
	 * 根据tomcat查询出所有应用
	 */
	public ResultMessage getByTomcat(long id) {
		return null;
	}

	public ResultMessage getSessionNum(long id) {
		return null;
	}

	public ResultMessage getStatus(long id) {
		return null;
	}

	public ResultMessage getSessionAnalysis(long id) {
		return null;
	}

	public ResultMessage getStatusAnalysis(long id) {
		return null;
	}


	/**
	 * @see com.bonc.common.CRUDController#post(java.lang.Object)
	 */
	public ResultMessage post(Object obj) {
		return null;
	}


	/**
	 * @see com.bonc.common.CRUDController#put(java.lang.Object)
	 */
	public ResultMessage put(Object obj) {
		return null;
	}


	/**
	 * @see com.bonc.common.CRUDController#delete(long)
	 */
	public ResultMessage delete(long id) {
		return null;
	}


	/**
	 * @see com.bonc.common.CRUDController#getOne(long)
	 */
	public ResultMessage getOne(long id) {
		return null;
	}


	/**
	 * @see com.bonc.common.CRUDController#getAll()
	 */
	public ResultMessage getAll() {
		return null;
	}

    @Override
    public ResultMessage batchDelete(Long[] ids) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ResultMessage getPage(Object obj, PageContent pageContent) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
