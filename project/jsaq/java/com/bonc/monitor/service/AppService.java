package com.bonc.monitor.service;

import com.bonc.common.CRUDService;
import java.util.List;
import java.util.Map;

/**
 * 应用服务接口
 */
public interface AppService extends CRUDService, CommonActionService {

	/**
	 * 根据tomat的id查询出应用集合
	 */
	public abstract List findByTomcat(long id);

	/**
	 * 得到当前会话数
	 */
	public abstract int getSessionNum(long id);

	/**
	 * 得到当前运行状态
	 */
	public abstract String getStatus(long id);

	public abstract Map getStatusAnalysis(long id);

	public abstract List getSessionAnalysis(long id);

}
