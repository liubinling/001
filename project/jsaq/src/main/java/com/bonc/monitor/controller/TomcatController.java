package com.bonc.monitor.controller;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.monitor.domain.Tomcat;
import com.bonc.monitor.service.TomcatService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * tomcat控制器类
 */
@RestController
@RequestMapping("/api/v1.0/tomcat")
public class TomcatController implements CRUDController<Tomcat> {

    @Autowired
    private TomcatService tomcatService;

    /**
     * 根据host查询出所有的tomcat
     *
     */
    /**
     * @see com.bonc.common.CRUDController#getAll()
     */
    @RequestMapping(method = RequestMethod.GET)

    public ResultMessage getTomcatByHos(long hostId) {
        ResultMessage result = new ResultMessage();

        //参数检查:TODO
        List<Tomcat> list = null;

        list = (List<Tomcat>) getTomcatService().findByHost(hostId);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(list);

        return result;
    }

    @RequestMapping(value = "/{id}/status/mem", method = RequestMethod.GET)
    public ResultMessage mem(@PathVariable long id) {
        ResultMessage result = new ResultMessage();

        //参数检查:TODO

        Map map = getTomcatService().mem(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(map);

        return result;
    }

    @RequestMapping(value = "/{id}/status/mempool", method = RequestMethod.GET)
    public ResultMessage mempool(@PathVariable long id) {

        ResultMessage result = new ResultMessage();

        //参数检查:TODO
      
        List  list = getTomcatService().mempool(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(list);

        return result;

    }
@RequestMapping(value = "/{id}/status/threadpool", method = RequestMethod.GET)
    public ResultMessage threadpool(@PathVariable long id) {
          ResultMessage result = new ResultMessage();

        //参数检查:TODO
      
        List  list = getTomcatService().threadpool(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(list);

        return result;
    }
    
   
    @RequestMapping(value = "/{id}/status/slowthread", method = RequestMethod.GET)
    public ResultMessage  slowthread(@PathVariable long id) {
          ResultMessage result = new ResultMessage();

        //参数检查:TODO
      
        List  list = getTomcatService().slowthread(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(list);

        return result;
    }

    /**
     * @see com.bonc.common.CRUDController#post(java.lang.Object)
     */
    @RequestMapping(method = RequestMethod.POST)
    @Override
    public ResultMessage post(Tomcat obj) {
        ResultMessage result = new ResultMessage();

        //参数检查:TODO
        getTomcatService().create(obj);

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
    public ResultMessage put(Tomcat tomcat) {
        ResultMessage result = new ResultMessage();
        getTomcatService().update(tomcat);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(null);

        return result;
    }

    /**
     * @see com.bonc.common.CRUDController#delete(long)
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResultMessage delete(@PathVariable long id) {
        ResultMessage result = new ResultMessage();

        //TODO:参数检查:
        getTomcatService().delete(id);

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
        Tomcat tomcat = null;

        tomcat = (Tomcat) getTomcatService().read(id);
        if (tomcat == null) {
            result.setSuccess(false);
            result.setMsg("没有此记录");

        } else {

            result.setSuccess(true);
            result.setMsg("操作成功");
            result.setResult(tomcat);
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
        Tomcat tomcat = null;
        List<Tomcat> list = null;

        list = (List<Tomcat>) getTomcatService().findAll();

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(list);

        return result;
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE)
    public ResultMessage batchDelete(Long[] ids) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public ResultMessage getPage(Tomcat obj, PageContent pageContent) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    
    @RequestMapping(value="/{id}/restart",method = RequestMethod.GET)
 /**
  *  重启tomcat
  */
    public ResultMessage restart(@PathVariable long id) {

        ResultMessage result = new ResultMessage();

        Boolean b = getTomcatService().restart(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(b);

        return result;

    }
    
    @RequestMapping(value="/{id}/start",method = RequestMethod.GET)
 /**
  *  启动tomcat
  */
    public ResultMessage start(@PathVariable long id) {

        ResultMessage result = new ResultMessage();

        Boolean b = getTomcatService().start(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(b);

        return result;

    }
    
    @RequestMapping(value="/{id}/stop",method = RequestMethod.GET)
 /**
  *  停止tomcat
  */
    public ResultMessage stop(@PathVariable long id) {

        ResultMessage result = new ResultMessage();

        Boolean b = getTomcatService().stop(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(b);

        return result;

    }
    
    @RequestMapping(value="/{id}/health",method = RequestMethod.GET)
 /**
  *  health
  */
    public ResultMessage health(@PathVariable long id) {

        ResultMessage result = new ResultMessage();

        Boolean b = getTomcatService().health(id);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(b);

        return result;

    }

    /**
     * @return the tomcatService
     */
    public TomcatService getTomcatService() {
        return this.tomcatService;
    }

    /**
     * @param tomcatService the tomcatService to set
     */
    public void setTomcatService(TomcatService tomcatService) {
        this.tomcatService = tomcatService;
    }
    
    
    

}
