package com.bonc.monitor.service.impl;

import com.bonc.common.PageContent;
import com.bonc.common.SSHUtil;
import com.bonc.monitor.service.TomcatService;
import com.bonc.monitor.dao.TomcatDAO;
import com.bonc.monitor.domain.Host;
import com.bonc.monitor.domain.Tomcat;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.transaction.Transactional;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.AuthCache;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.BasicAuthCache;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.tomcat.jni.Time;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * tomcat服务接口实现
 */
@Service
@Transactional
public class TomcatServiceImpl implements TomcatService {

    @Autowired
    private TomcatDAO tomcatDAO;

    /**
     * @see com.bonc.monitor.service.TomcatService#findByHost(long)
     */
    @Override
    public List findByHost(long id) {

        return getTomcatDAO().findByHost_Id(id);
    }

    /**
     * @see com.bonc.monitor.service.TomcatService#mem(long)
     */
    public Map mem(long id) {
        
        Map map =  new HashMap();

        try {
            String  status = getTomcatServerStatus(id); //获取所有状态信息
            //解析状态信息，得到内存信息并包装成map
     
            org.dom4j.Document document = DocumentHelper.parseText(status);// 转换成dom
            
             List<Node> list= document.selectNodes("status/jvm/memory");
             String free=null,total=null,max=null;
              for(Node node:list){
                  
                    free =  node.valueOf("@free");
                    total = node.valueOf("@total");
                    max = node.valueOf("@max");
              }       
                 
              map.put("min",0);
              map.put("max",Long.valueOf(max));
              map.put("used",Long.valueOf(total)-Long.valueOf(free));
              
        } catch (DocumentException ex) {
            Logger.getLogger(TomcatServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return map;
    }

    /**
     * @see com.bonc.monitor.service.TomcatService#thread(long)
     */
    @Override
    public List threadpool(long id) {
       List result = new ArrayList();
       

        try {
            String  status = getTomcatServerStatus(id); //获取所有状态信息
            //解析状态信息，得到内存信息并包装成map
       
            org.dom4j.Document document = DocumentHelper.parseText(status);// 转换成dom
            
             List<Node> list= document.selectNodes("status/connector");
             String name=null,max=null,used=null;
              for(Node node:list){
                  
                    name =  node.valueOf("@name"); //内存池名称
                    Node  threadpool =  node.selectSingleNode("threadInfo");
                    used = threadpool.valueOf("@currentThreadCount"); //已用值
                    max = threadpool.valueOf("@maxThreads"); //最大值
                    
                      Map map =  new HashMap();
                        map.put("name",name);
                     
                    map.put("min",0);
                   map.put("max",Long.valueOf(max));
                   map.put("used",Long.valueOf(used));
                    
                    result.add(map);
              }       
                 
              
              
        } catch (DocumentException ex) {
            Logger.getLogger(TomcatServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        return result;
    }

    /**
     * @see com.bonc.monitor.service.TomcatService#mempool(long)
     */
    @Override
    public List mempool(long id) {
        
         List result = new ArrayList();
       

        try {
            String  status = getTomcatServerStatus(id); //获取所有状态信息
            //解析状态信息，得到内存信息并包装成map
           
            org.dom4j.Document document = DocumentHelper.parseText(status);// 转换成dom
            
             List<Node> list= document.selectNodes("status/jvm/memorypool");
             String name=null,type=null,usageUsed=null,usageMax=null;
              for(Node node:list){
                  
                    name =  node.valueOf("@name"); //内存池名称
                    type = node.valueOf("@type"); //类型，是堆 还是代码cache
                    usageUsed = node.valueOf("@usageUsed"); //已用值
                    usageMax = node.valueOf("@usageMax"); //最大值
                    
                      Map map =  new HashMap();
                        map.put("name",name);
                        map.put("type",type);
                    map.put("min",0);
                   map.put("max",Long.valueOf(usageMax));
                   map.put("used",Long.valueOf(usageUsed));
                    
                    result.add(map);
              }       
                 
              
              
        } catch (DocumentException ex) {
            Logger.getLogger(TomcatServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        return result;
    }

    @Override
    public void create(Tomcat obj) {

        getTomcatDAO().saveAndFlush(obj);

    }

    @Override
    public Tomcat read(long id) {

        return getTomcatDAO().findOne(id);

    }

    @Override
    public void update(Tomcat obj) {

        getTomcatDAO().saveAndFlush(obj);

    }

    @Override
    public void delete(long id) {

        getTomcatDAO().delete(id);
    }

    @Override
    public List<Tomcat> findAll() {

        return getTomcatDAO().findAll();
    }

    @Override
    public boolean start(long id) {
        
        Tomcat tomcat = tomcatDAO.getOne(id);
        Host host =  tomcat.getHost();
        String cmd =""+tomcat.getPath()+"/bin/startup.sh & ";
        boolean b = SSHUtil.sshexec(host.getIp(),host.getPort(),host.getUser(),host.getPassword(),cmd); //重启
 
        return b;
       // throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean stop(long id) {
Tomcat tomcat = tomcatDAO.getOne(id);
        Host host =  tomcat.getHost();
        String cmd =""+tomcat.getPath()+"/bin/shutdown.sh & ";
        boolean b = SSHUtil.sshexec(host.getIp(),host.getPort(),host.getUser(),host.getPassword(),cmd); //重启
 
        return b;        
   }

    @Override
    public boolean restart(long id) {
        
         if(stop(id)){
           Time.sleep(1000*30);
            return  start(id);
         }else{
             return false;
         }
        }

    @Override
    public Map findByCondition(Tomcat obj, PageContent page) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * @return the tomcatDAO
     */
    public TomcatDAO getTomcatDAO() {
        return tomcatDAO;
    }

    /**
     * @param tomcatDAO the tomcatDAO to set
     */
    public void setTomcatDAO(TomcatDAO tomcatDAO) {
        this.tomcatDAO = tomcatDAO;
    }

    /**
     * 连接tomcat 用httpClient进行连接
     *
     * @param id tomcat 编号
     */
    private CloseableHttpClient connectionTomcat(long id) {

        Tomcat tomcat = tomcatDAO.getOne(id);
        //Host host =   tomcat.getHost();

        CloseableHttpClient httpClient = HttpClients.createDefault();

        return httpClient;

    }

    /**
     * 关闭连接
     *
     * @param client
     */
    private void closeConnection(CloseableHttpClient client) {
        try {
            client.close();
        } catch (IOException ex) {
            Logger.getLogger(TomcatServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * 查询服务器状态信息
     * TODO:这里可以将http连接工具作为一个独立的工具类抽出来
     */
    private String getTomcatServerStatus(long id) {

        CloseableHttpClient httpClient = connectionTomcat(id); //创建连接

        Tomcat tomcat = tomcatDAO.findOne(id);
        Host host = tomcat.getHost();
        HttpHost targetHost = new HttpHost(host.getIp(), tomcat.getPort(), "http");
        //基础凭证提供器,明文传输数据  
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
                new AuthScope(targetHost.getHostName(), targetHost.getPort()),
                new UsernamePasswordCredentials("manager", "manager"));
// 创建认证缓存  
        AuthCache authCache = new BasicAuthCache();
// 创建基础认证机制 添加到缓存  
        BasicScheme basicAuth = new BasicScheme();
        authCache.put(targetHost, basicAuth);

// 将认证缓存添加到执行环境中  即预填充  
        HttpClientContext context = HttpClientContext.create();
        context.setCredentialsProvider(credsProvider);
        context.setAuthCache(authCache);

        String url = "http://" + host.getIp() + ":" + tomcat.getPort() + "/manager/status/all/?XML=true";

        HttpGet httpGet = new HttpGet(url);
        StringBuilder sb = new StringBuilder();
        try {
            //执行远程查询获取返回值。

            CloseableHttpResponse execute = httpClient.execute(targetHost, httpGet, context);

            HttpEntity entity = execute.getEntity();
            InputStream is = entity.getContent();
           BufferedReader reader = new BufferedReader(new InputStreamReader(is));      
            String line;
            
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            closeConnection(httpClient); //用完关闭
        } catch (IOException ex) {
            Logger.getLogger(TomcatServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("\n"+sb.toString()+"\n");
        return sb.toString();

    }

    @Override
    public List slowthread(long id) {
         List result = new ArrayList();
       

        try {
            String  status = getTomcatServerStatus(id); //获取所有状态信息
            //解析状态信息，得到内存信息并包装成map
       
            org.dom4j.Document document = DocumentHelper.parseText(status);// 转换成dom
            
             List<Node> list= document.selectNodes("status/connector/workers/worker[@stage='S']");
             String uri=null,response=null;
              for(Node node:list){
                  
                                        
                    response = node.valueOf("@requestProcessingTime"); //已用值
                    uri = node.valueOf("@currentUri"); //最大值
                    
                      Map map =  new HashMap();
                      map.put("processTime",Long.valueOf(response));
                     
                      map.put("requesturl",uri);
                  
                    
                    result.add(map);
              }       
                 
              
              
        } catch (DocumentException ex) {
            Logger.getLogger(TomcatServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        return result;
    
    }

    @Override
    public boolean health(long id) {
        String s =  getTomcatServerStatus(id);
        return s!=null;
    }

}
