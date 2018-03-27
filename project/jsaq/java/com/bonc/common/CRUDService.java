package com.bonc.common;

import com.bonc.common.domain.ResultMessage;
import java.util.List;
import java.util.Map;

/**
 * 实体对象crud通用的基础接口
 * 
 */
public interface CRUDService <T>{

	/**
	 * 创建/新增实体
	 */
	public abstract void create(T obj);

	/**
	 * 根据id获取一个实体对象
	 */
	public abstract T read(long id);

	/**
	 * 用新的实体对象更新库里的实体数据，要保证id不变。
	 */
	public abstract void update(T obj);

	/**
	 * 根据id删除对应的实体对象
	 */
	public abstract void delete(long id);

	/**
	 * 查出所有的对象列表
	 */
	public abstract List<T> findAll();
        
                    /**
                     * 通用的分页，条件查询
                     * @param obj
                     * @param page
                     * @return 
                     */
                     public Map  findByCondition(final T obj,PageContent page);

}
