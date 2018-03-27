package com.bonc.monitor.service;

import com.bonc.common.CRUDService;
import com.bonc.monitor.domain.Host;
import java.util.Map;
import java.util.List;

/**
 * 主机服务接口
 */
public interface HostService extends CRUDService<Host>, CommonActionService {

	/**
	 * 返回内存数据
	 * 
	 */
	public abstract Map mem(long id);

	/**
	 * 返回磁盘空间数据
	 * 
	 */
	public abstract Map disk(long id);

	/**
	 * 得到网络数据
	 * 
	 */
	public abstract Map net(long id);

	/**
	 * 得到进程数据
	 */
	public abstract List process(long id, String ord);

	public abstract Map cpu(long id);

}
