package com.bonc.common.controller;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bonc.common.domain.ResultMessage;
import com.bonc.common.domain.SysConfig;
import com.bonc.common.service.SysConfigService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 系统配置参数的维护REST接口实现类
 *
 * @author song
 */
@RestController
@RequestMapping(value = "/api/v1.0/sysconfig")
public class SysConfigController implements CRUDController<SysConfig> {

    @Autowired
    private SysConfigService sysConfigServiceImpl;

    /**
     * @see com.bonc.common.CRUDController#post(java.lang.Object)
     */
    @RequestMapping(method = RequestMethod.POST)
    @Override
    public ResultMessage post(SysConfig sysConfig) {

        ResultMessage result = new ResultMessage();

        //参数检查:TODO
        sysConfigServiceImpl.create(sysConfig);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(null);

        return result;
    }

    /**
     * @see com.bonc.common.CRUDController#put(java.lang.Object)
     */
    @RequestMapping(method = RequestMethod.PUT)
    @Override

    public ResultMessage put(SysConfig obj) {

        ResultMessage result = new ResultMessage();
        sysConfigServiceImpl.update(obj);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(null);

        return result;
    }

    /**
     * @see com.bonc.common.CRUDController#delete(long)
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Override
    public ResultMessage delete(@PathVariable long id) {
        ResultMessage result = new ResultMessage();

        //TODO:参数检查:
        sysConfigServiceImpl.delete(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(null);

        return result;
    }

    /**
     * 批量删除
     *
     * @param ids
     * @return
     */
    @RequestMapping(method = RequestMethod.DELETE)

    @Override
    public ResultMessage batchDelete(Long[] ids) {
        ResultMessage result = new ResultMessage();

        //TODO:参数检查:
        for (Long id : ids) {
            sysConfigServiceImpl.delete(id);

        }

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(null);

        return result;
    }

    /**
     * @see com.bonc.common.CRUDController#getOne(long)
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public ResultMessage getOne(@PathVariable long id) {
        ResultMessage result = new ResultMessage();

        //TODO:参数检查
        SysConfig sysConfig = null;

        sysConfig = (SysConfig) sysConfigServiceImpl.read(id);
        if (sysConfig == null) {
            result.setSuccess(false);
            result.setMsg("没有此记录");

        } else {

            result.setSuccess(true);
            result.setMsg("操作成功");
            result.setResult(sysConfig);
        }
        return result;
    }

    /**
     * @see com.bonc.common.CRUDController#getAll()
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @Override
    public ResultMessage getAll() {
        ResultMessage result = new ResultMessage();

        //参数检查:TODO
        SysConfig sysConfig = null;
        List<SysConfig> list = null;

        list = sysConfigServiceImpl.findAll();

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(list);

        return result;
    }

    /**
     * @return the sysConfigServiceImpl
     */
    public SysConfigService getSysConfigService() {
        return sysConfigServiceImpl;
    }

    /**
     * @param sysConfigServiceImpl the sysConfigServiceImpl to set
     */
    public void setSysConfigService(SysConfigService sysConfigServiceImpl) {
        this.sysConfigServiceImpl = sysConfigServiceImpl;
    }

    @RequestMapping(method = RequestMethod.GET)
    @Override
    public ResultMessage getPage(SysConfig sysConfig, PageContent pageContent) {

        ResultMessage result = new ResultMessage();

        Map map = sysConfigServiceImpl.findByCondition(sysConfig, pageContent);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(map);

        return result;

    }

}
