package com.bonc.monitor.controller;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;
import com.bonc.monitor.service.impl.AppServiceImpl;
import com.bonc.common.domain.ResultMessage;
import com.bonc.monitor.domain.App;
import com.bonc.monitor.service.AppService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * 应用信息控制器类
 */
@RestController
@RequestMapping("/api/v1.0/app")
public class AppController implements CRUDController<App> {

    @Autowired
    private AppService appService;

    /**
     * 根据tomcat查询出所有应用
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResultMessage getByTomcat(long tomcatId) {
        ResultMessage result = new ResultMessage();
        List<App> list = appService.findByTomcat(tomcatId);
        result.setMsg("操作成功");
        result.setResult(list);
        result.setSuccess(true);
        return result;
    }


@RequestMapping(value="/{id}/status",method = RequestMethod.GET)
    public ResultMessage getStatus(@PathVariable long id) {
       Map  status = appService.getStatus(id);
                
        ResultMessage result = new ResultMessage();
        result.setMsg("操作成功");
        result.setResult(status);
        result.setSuccess(true);
        return result;
    }

    public ResultMessage getSessionAnalysis(long id) {
        return null;
    }

    public ResultMessage getStatusAnalysis(long id) {
        return null;
    }

    /**
     * @see com.bonc.common.CRUDController#delete(long)
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Override
    public ResultMessage delete(@PathVariable long id) {
       
         appService.delete(id);
                
        ResultMessage result = new ResultMessage();
        result.setMsg("操作成功");
        result.setResult(null);
        result.setSuccess(true);
        return result;
    }

    /**
     * @see com.bonc.common.CRUDController#getOne(long)
     */
      @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResultMessage getOne(@PathVariable long id) {
         App app = appService.read(id);
                
        ResultMessage result = new ResultMessage();
        result.setMsg("操作成功");
        result.setResult(app);
        result.setSuccess(true);
        return result;
    }

    /**
     * @see com.bonc.common.CRUDController#getAll()
     */
    @Override
    public ResultMessage getAll() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
       }

    @Override
    public ResultMessage batchDelete(Long[] ids) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
      @RequestMapping(method = RequestMethod.POST)
    public ResultMessage post(App obj) {
        
           appService.create(obj);
                
        ResultMessage result = new ResultMessage();
        result.setMsg("操作成功");
        result.setResult(null);
        result.setSuccess(true);
        return result;
    
    }

    @Override
    @RequestMapping( method = RequestMethod.PUT)
    public ResultMessage put(App obj) {
        appService.update(obj);
                
        ResultMessage result = new ResultMessage();
        result.setMsg("操作成功");
        result.setResult(null);
        result.setSuccess(true);
        return result;
    
    }

    @Override
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public ResultMessage getPage(App obj, PageContent pageContent) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * @return the appService
     */
    public AppService getAppService() {
        return appService;
    }

    /**
     * @param appService the appService to set
     */
    public void setAppService(AppService appService) {
        this.appService = appService;
    }

}
