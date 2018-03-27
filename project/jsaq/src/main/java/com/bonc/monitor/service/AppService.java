package com.bonc.monitor.service;

import com.bonc.common.CRUDService;
import com.bonc.monitor.domain.App;
import java.util.List;
import java.util.Map;

/**
 * 应用服务接口
 */
public interface AppService extends CRUDService<App>, CommonActionService {

	/**
	 * 根据tomat的id查询出应用集合
	 */
	public abstract List findByTomcat(long id);

	

	/**
	 * 得到当前运行状态
	 */
	public abstract Map getStatus(long id);

                     /**
                      *  历史状态分析
                      * @param id
                      * @return 
                      */
	public abstract Map getStatusAnalysis(long id);
                   /**
                    * 历史会话分析
                    * @param id
                    * @return 
                    */
	public abstract List getSessionAnalysis(long id);

}
