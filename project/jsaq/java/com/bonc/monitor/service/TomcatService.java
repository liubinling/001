package com.bonc.monitor.service;

import com.bonc.common.CRUDService;
import com.bonc.monitor.domain.Tomcat;
import java.util.List;
import java.util.Map;

/**
 * tomcat服务接口
 */
public interface TomcatService extends CRUDService<Tomcat>, CommonActionService {

	/**
	 * 根据主机id查询出tomcat对象集合
	 */
	public abstract List findByHost(long id);

                     /**
                      * 查询总的内存使用情况
                      * @param id
                      * @return 
                      */        
	public abstract Map mem(long id);
                     /**
                      * 线程池使用情况
                      * @param id
                      * @return 
                      */
	public abstract List threadpool(long id);
        
                     /**
                      * 当前请求按处理速度从慢到快前10名
                      * @param id
                      * @return 
                      */
                       public abstract List slowthread(long id);
                      /**
                       *  内存池分布与使用情况
                       * @param id
                       * @return 
                       */
	public abstract List mempool(long id);

}
