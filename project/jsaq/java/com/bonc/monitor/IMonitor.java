/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bonc.monitor;

import java.rmi.Remote;  
import java.rmi.RemoteException;  
import java.util.List;
import java.util.Map;

/**
 * 主机监控远程接口
 * @author song
 */
public interface IMonitor extends Remote {
    /**
     * 查内存
     * @return
     * @throws RemoteException 
     */
     public  Map<String,Double> mem() throws RemoteException;
     /**
      * 查cpu
      * @return
      * @throws RemoteException 
      */
     public Map<String,Double> cpu() throws RemoteException;
     /**
      * 查磁盘
      * @return
      * @throws RemoteException 
      */
     public Map<String,Double> disk() throws RemoteException;
     /**
      * 查进程top10
      * @return
      * @throws RemoteException 
      */
     public List<Map> process() throws RemoteException;
     /**
      * 查网络流量
      * @return
      * @throws RemoteException 
      */
     public Map<String,Double> net() throws RemoteException;
    
}
