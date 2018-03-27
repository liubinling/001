/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bonc.common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.sshd.client.SshClient;
import org.apache.sshd.client.channel.ChannelExec;
import org.apache.sshd.client.channel.ClientChannelEvent;
import org.apache.sshd.client.future.AuthFuture;
import org.apache.sshd.client.future.ConnectFuture;
import org.apache.sshd.client.session.ClientSession;

import com.bonc.monitor.service.impl.HostServiceImpl;

/**
 *  此类通过连接ssh对主机进行命令行操作
 * @author song
 */
public class SSHUtil {
    
   /**
    *  
    * @param ip
    * @param port
    * @param user
    * @param pass
    * @param cmd
    * @return 
    */
    public static   boolean sshexec(String ip,int port, String user,String pass,String cmd){
        
               try {
            
            SshClient client = SshClient.setUpDefaultClient();
            client.start();
            ConnectFuture connect = client.connect(user, ip, port);
            ClientSession session = null;
            if (connect.await()) {
                session = connect.getSession();
            }

            session.addPasswordIdentity(pass);
            AuthFuture auth = session.auth();
            //session.addPublicKeyIdentity(SecurityUtils.loadKeyPairIdentity("keyname", new FileInputStream("priKey.pem"), null)); 
            if (auth.await() && auth.isSuccess()) {
              

                ChannelExec ec = session.createExecChannel(cmd);
                    ec.setOut(System.out);
                    ec.open();

                   Collection<ClientChannelEvent> mask = new ArrayList();
                    mask.add(ClientChannelEvent.CLOSED);
                    ec.waitFor(mask, 0);
                
            } else {

                System.out.println("auth failed");
                return false;
            }

            client.stop();
        } catch (IOException ex) {
            Logger.getLogger(HostServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
        
         return true;
    }
    
}
