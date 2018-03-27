package com.bonc.monitor.controller;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.monitor.service.HostService;
import com.bonc.monitor.domain.Host;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * 主机控制器类
 */
@RestController
@RequestMapping("/api/v1.0/host")
public class HostController implements CRUDController<Host> {
                       @Autowired
	private HostService hostService;
                       
                       /**
                        * 得到主机内存使用情况
                        * @param id
                        * @return 
                        */
@RequestMapping(value="/{id}/status/mem",method = RequestMethod.GET)
	public ResultMessage mem(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
                                     Map map = hostService.mem(id);

                                    result.setSuccess(true);
                                    result.setMsg("操作成功");
                                    result.setResult(map);

                                    return result;
	}
        /**
         * 得到主机磁盘使用情况
         * @param id
         * @return 
         */
  @RequestMapping(value="/{id}/status/disk",method = RequestMethod.GET)
	public ResultMessage disk(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
                                     Map map = hostService.disk(id);

                                    result.setSuccess(true);
                                    result.setMsg("操作成功");
                                    result.setResult(map);

                                    return result;
	}
        /**
         * 得到网络使用情况
         * @param id
         * @return 
         */
@RequestMapping(value="/{id}/status/net",method = RequestMethod.GET)
	public ResultMessage net(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
                                    Map map = hostService.net(id); 
     
                                    result.setSuccess(true);
                                    result.setMsg("操作成功");
                                    result.setResult(map);

                                    return result;
	}
/**
 * 得到进程占资源大的前10名
 * @param id
 * @param ord  按 cpu占用与mem占用排序。
 * @return 
 */
        @RequestMapping(value="/{id}/status/process",method = RequestMethod.GET)
	public ResultMessage process(@PathVariable long id, String ord) {
		ResultMessage result = new ResultMessage();
                                    List list = hostService.process(id,"cpu"); //TODO:暂时只实现了按cpu排序，以后要实现cpu与mem两种
     
                                    result.setSuccess(true);
                                    result.setMsg("操作成功");
                                    result.setResult(list);

                                    return result;
	}

	/**
	 * 取得ｃｐｕ使用信息
	 */
        @RequestMapping(value="/{id}/status/cpu",method = RequestMethod.GET)
	public ResultMessage cpu(@PathVariable long id) {
            
                                    ResultMessage result = new ResultMessage();
                                     Map map = hostService.cpu(id);

                                    result.setSuccess(true);
                                    result.setMsg("操作成功");
                                    result.setResult(map);

                                    return result;
		
	}


	 /**
     * @see com.bonc.common.CRUDController#post(java.lang.Object)
     */
    @RequestMapping(method = RequestMethod.POST)
    @Override
    public ResultMessage post(Host host) {

        ResultMessage result = new ResultMessage();

        //参数检查:TODO
        getHostService().create(host);

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

    public ResultMessage put(Host obj) {

        ResultMessage result = new ResultMessage();
        getHostService().update(obj);

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
        getHostService().delete(id);

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
            getHostService().delete(id);

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
        Host host = null;

        host = (Host) getHostService().read(id);
        if (host == null) {
            result.setSuccess(false);
            result.setMsg("没有此记录");

        } else {

            result.setSuccess(true);
            result.setMsg("操作成功");
            result.setResult(host);
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
        Host host = null;
        List<Host> list = null;

        list = getHostService().findAll();

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(list);

        return result;
    }
    
     

    /**
     * @return the hostService
     */
    public HostService getHostService() {
        return this.hostService;
    }

 
    
    @RequestMapping(method = RequestMethod.GET)
    @Override
    public ResultMessage getPage(Host host, PageContent pageContent) {

        ResultMessage result = new ResultMessage();

        Map map = getHostService().findByCondition(host, pageContent);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(map);

        return result;

    }

    /**
     * @param hostService the hostService to set
     */
    public void setHostService(HostService hostService) {
        this.hostService = hostService;
    }

  
	

}
