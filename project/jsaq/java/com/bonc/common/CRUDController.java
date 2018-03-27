package com.bonc.common;

import com.bonc.common.domain.ResultMessage;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public interface CRUDController<T> {

    /**
     * 新增
     */
    public abstract ResultMessage post(T obj);

    /**
     * 更新
     */
    public abstract ResultMessage put(T obj);

    /**
     * 删除
     */
    public abstract ResultMessage delete(long id);

    /**
     * 查询出一个
     */
    public abstract ResultMessage getOne(long id);

    /**
     * 查询出所有的
     */
    public abstract ResultMessage getAll();

    /**
     * 批量删除
     *
     * @param ids
     * @return
     */
    @RequestMapping(method = RequestMethod.DELETE)
    ResultMessage batchDelete(Long[] ids);

    /**
     * 分页查询
     *
     * @param sysConfig
     * @param pageContent
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    ResultMessage getPage(T obj, PageContent pageContent);

}
