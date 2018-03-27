package com.bonc.monitor.service.impl;

import com.bonc.common.HTTPUtil;
import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.monitor.service.AppService;
import com.bonc.monitor.dao.AppDAO;
import com.bonc.monitor.domain.App;
import com.bonc.monitor.domain.Host;
import com.bonc.monitor.domain.Tomcat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 应用服务接口实现类
 */
@Service
@Transactional
public class AppServiceImpl implements AppService {

    @Autowired
    private AppDAO appDAO;

    /**
     * @see com.bonc.monitor.service.AppService#findByTomcat(long)
     */
    @Override
    public List findByTomcat(long id) {

        return appDAO.findByTomcat_Id(id);
    }
/**
 * 列出某tomcat下面所有的应用信息
 * @param tomcat
 * @return 
 */
    private  Map  listApps(Tomcat tomcat){
        Map map = new HashMap();
        
        Host host = tomcat.getHost();
        String url = "http://" + host.getIp() + ":" + tomcat.getPort() + "/manager/text/list";
        
        ResultMessage result  =  HTTPUtil.httpexec(host.getIp(), tomcat.getPort(), tomcat.getUser(), tomcat.getPassword(), url);
        
        if(result.isSuccess()){  //如果返回正常，解析文本生成map
            
            String  text =  (String) result.getResult();
            String[]  lines =  text.split("\n");
            for(int i=1;i<lines.length;i++){
                
                String[]  cols = lines[i].split(":");
                Map map1 = new HashMap();
                map1.put("path",cols[0]);
                map1.put("status", cols[1]);
                map1.put("session", cols[2]);
                map.put(cols[0], map1);
                
                
            }
        }
        
        return map;
    }
    
    

    /**
     * @see com.bonc.monitor.service.AppService#getStatus(long)
     */
    @Override
    public Map getStatus(long id) {
       App app =  appDAO.findOne(id);
        Tomcat tomcat =  app.getTomcat();
        Map  map  = listApps(tomcat); //返回所有应用
        
        Map map2 = (Map) map.get(app.getPath());
        
        return   map2;
    }

    /**
     * @see com.bonc.monitor.service.AppService#getStatusAnalysis(long)
     */
    public Map getStatusAnalysis(long id) {
        return null;
    }

    /**
     * @see com.bonc.monitor.service.AppService#getSessionAnalysis(long)
     */
    public List getSessionAnalysis(long id) {
        return null;
    }

    @Override
    public boolean start(long id) {
        App app = appDAO.findOne(id);
        Tomcat tomcat =  app.getTomcat();
        Host host = tomcat.getHost();
        String url = "http://" + host.getIp() + ":" + tomcat.getPort() + "/manager/text/start?path="+app.getPath();
        
        ResultMessage result  =  HTTPUtil.httpexec(host.getIp(), tomcat.getPort(), tomcat.getUser(), tomcat.getPassword(), url);
        return result.isSuccess();
     }

    @Override
    public boolean stop(long id) {
        App app = appDAO.findOne(id);
        Tomcat tomcat =  app.getTomcat();
        Host host = tomcat.getHost();
        String url = "http://" + host.getIp() + ":" + tomcat.getPort() + "/manager/text/stop?path="+app.getPath();
        
        ResultMessage result  =  HTTPUtil.httpexec(host.getIp(), tomcat.getPort(), tomcat.getUser(), tomcat.getPassword(), url);
        return result.isSuccess(); 
    
    }

    @Override
    public boolean restart(long id) {
         App app = appDAO.findOne(id);
        Tomcat tomcat =  app.getTomcat();
        Host host = tomcat.getHost();
        String url = "http://" + host.getIp() + ":" + tomcat.getPort() + "/manager/text/reload?path="+app.getPath();
        
        ResultMessage result  =  HTTPUtil.httpexec(host.getIp(), tomcat.getPort(), tomcat.getUser(), tomcat.getPassword(), url);
        return result.isSuccess();
    
    }

    /**
     * @return the appDAO
     */
    public AppDAO getAppDAO() {
        return appDAO;
    }

    /**
     * @param appDAO the appDAO to set
     */
    public void setAppDAO(AppDAO appDAO) {
        this.appDAO = appDAO;
    }

    @Override
    public boolean health(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void create(App obj) {
        appDAO.saveAndFlush(obj);
          }

    @Override
    public App read(long id) {
        return appDAO.findOne(id);
        }

    @Override
    public void update(App obj) {
        appDAO.saveAndFlush(obj);
       }

    @Override
    public void delete(long id) {
         appDAO.delete(id);
   }

    @Override
    public List<App> findAll() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Map findByCondition(App obj, PageContent page) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
