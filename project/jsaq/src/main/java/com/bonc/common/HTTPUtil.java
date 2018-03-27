/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bonc.common;

import com.bonc.common.domain.ResultMessage;
import com.bonc.monitor.domain.Host;
import com.bonc.monitor.domain.Tomcat;
import com.bonc.monitor.service.impl.TomcatServiceImpl;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;
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

/**
 * 执行http请求的工具类
 *
 * @author song
 */
public class HTTPUtil {

    /**
     * 执行一个url访问
     *
     * @param ip ip地址
     * @param port 端口号
     * @param user 认证用户名
     * @param pass 认证密码
     * @param url 请求的地址
     * @return ResultMessage
     */
    public static ResultMessage httpexec(String ip, int port, String user, String pass, String url) {

        ResultMessage result = new ResultMessage();

        CloseableHttpClient httpClient = HttpClients.createDefault();

        HttpHost targetHost = new HttpHost(ip, port, "http");
        //基础凭证提供器,明文传输数据  
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
                new AuthScope(targetHost.getHostName(), targetHost.getPort()),
                new UsernamePasswordCredentials(user, pass));
// 创建认证缓存  
        AuthCache authCache = new BasicAuthCache();
// 创建基础认证机制 添加到缓存  
        BasicScheme basicAuth = new BasicScheme();
        authCache.put(targetHost, basicAuth);

// 将认证缓存添加到执行环境中  即预填充  
        HttpClientContext context = HttpClientContext.create();
        context.setCredentialsProvider(credsProvider);
        context.setAuthCache(authCache);

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

            result.setSuccess(true);
            result.setMsg("操作成功");
            result.setResult(sb.toString());

        } catch (IOException ex) {
            result.setSuccess(false);
            result.setMsg("操作失败");
            result.setResult(ex.getMessage());
            Logger.getLogger(TomcatServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        } finally {

            try {
                httpClient.close();//用完关闭
            } catch (IOException ex) {
                Logger.getLogger(HTTPUtil.class.getName()).log(Level.SEVERE, null, ex);
            }

        }
        System.out.println("\n" + sb.toString() + "\n");

        return result;

    }

}
