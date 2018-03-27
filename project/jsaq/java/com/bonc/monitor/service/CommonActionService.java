package com.bonc.monitor.service;

/**
 * 公共的操作类接口
 */
public interface CommonActionService {

	/**
	 * 启动节点
	 */
	public abstract boolean start(long id);

	/**
	 * 停止节点
	 */
	public abstract boolean stop(long id);

	/**
	 * 重启节点
	 */
	public abstract boolean restart(long id);

}
