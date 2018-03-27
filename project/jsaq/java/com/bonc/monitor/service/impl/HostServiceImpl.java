package com.bonc.monitor.service.impl;

import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.monitor.IMonitor;
import com.bonc.monitor.domain.Host;
import com.bonc.monitor.service.HostService;
import com.bonc.monitor.dao.HostDAO;
import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

/**
 * 主机服务接口实现类
 */
@Service
@Transactional
public class HostServiceImpl implements HostService {
@Autowired
	private HostDAO hostDAO;


	/**
	 * @see com.bonc.monitor.service.HostService#mem(long)
	 */
@Override
	public Map mem(long id) {
		Map map = null;
                       Host  host = hostDAO.findOne(id);
                       
                    try {
                        IMonitor agent= (IMonitor)Naming.lookup("rmi://"+host.getIp()+":12312/monitor");
                        
                        map =  agent.mem();

                    } catch (NotBoundException | MalformedURLException | RemoteException ex) {
                        Logger.getLogger(HostServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    
                    return map;
	}


	/**
	 * @see com.bonc.monitor.service.HostService#disk(long)
	 */
	public Map disk(long id) {
		Map map = null;
                       Host  host = hostDAO.findOne(id);
                       
                    try {
                        IMonitor agent= (IMonitor)Naming.lookup("rmi://"+host.getIp()+":12312/monitor");
                        
                        map =  agent.disk();

                    } catch (NotBoundException | MalformedURLException | RemoteException ex) {
                        Logger.getLogger(HostServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    
                    return map;
	}


	/**
	 * @see com.bonc.monitor.service.HostService#net(long)
	 */
@Override
	public Map net(long id) {
		Map map = null;
                       Host  host = hostDAO.findOne(id);
                       
                    try {
                        IMonitor agent= (IMonitor)Naming.lookup("rmi://"+host.getIp()+":12312/monitor");
                        
                        map =  agent.net();

                    } catch (NotBoundException | MalformedURLException | RemoteException ex) {
                        Logger.getLogger(HostServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    
                    return map;
	}


	/**
	 * @see com.bonc.monitor.service.HostService#process(long, java.lang.String)
	 */
@Override
	public List process(long id, String ord) {
		List list = null;
                       Host  host = hostDAO.findOne(id);
                       
                    try {
                        IMonitor agent= (IMonitor)Naming.lookup("rmi://"+host.getIp()+":12312/monitor");
                        
                        list =  agent.process();

                    } catch (NotBoundException | MalformedURLException | RemoteException ex) {
                        Logger.getLogger(HostServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    
                    return list;
	}


	/**
	 * @see com.bonc.monitor.service.HostService#cpu(long)
	 */
@Override
	public Map cpu(long id) {
                      Map map = null;
                       Host  host = hostDAO.findOne(id);
                       
                    try {
                        IMonitor agent= (IMonitor)Naming.lookup("rmi://"+host.getIp()+":12312/monitor");
                        
                        map =  agent.cpu();

                    } catch (NotBoundException | MalformedURLException | RemoteException ex) {
                        Logger.getLogger(HostServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    
                    return map;
        }


    @Override
    public Host read(long id) {
        return getHostDAO().findOne(id);
    }

    @Override
    public void update(Host obj) {
           
        getHostDAO().saveAndFlush(obj);
    }

    @Override
    public void delete(long id) {
        getHostDAO().delete(id);
    }

    /**
     * @return the hostDAO
     */
    public HostDAO getHostDAO() {
        return hostDAO;
    }

    /**
     * @param hostDAO the hostDAO to set
     */
    public void setHostDAO(HostDAO hostDAO) {
        this.hostDAO = hostDAO;
    }

    @Override
    public Map findByCondition(final Host obj, PageContent page) {
        ResultMessage result = null;

        Specification querySpecifi = new Specification<Host>() {
            @Override
            public Predicate toPredicate(Root<Host> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {

                List<Predicate> predicates = new ArrayList();
                Host host = (Host) obj;
                if (host.getName()!= null && !"".equals(host.getName())) {

                    predicates.add(cb.like(root.get("name").as(String.class), "%" + host.getName() + "%"));
                }

                if (host.getIp() != null && !host.getIp().equals("")) {

                    predicates.add(cb.like(root.get("ip").as(String.class), "%" + host.getIp() + "%"));
                }

                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }

        };

        Sort sort = null;

        String order = page.getOrder();
        String page1 = page.getPage();
        String sort1 = page.getSort();
        String rows1 = page.getRows();

        //对空值作处理
        if (rows1 == null || rows1.equals("")) {
            rows1 = "10";
        }
        if (order == null || order.equals("")) {
            order = "asc";
        }
        if (page1 == null || page1.equals("")) {
            page1 = "1";
        }

        if (sort1 == null || sort1.equals("")) {
            sort1 = "id";
        }
        if (order.equals("asc")) {
            sort = new Sort(Sort.Direction.ASC, sort1);
        } else if (order.equals("desc")) {
            sort = new Sort(Sort.Direction.DESC, sort1);
        }
        int pageNum = Integer.parseInt(page1) - 1;
        int rows = Integer.parseInt(rows1);
        Pageable pageable = new PageRequest(pageNum, rows, sort);

        Page<Host> list = this.getHostDAO().findAll(querySpecifi, pageable);

        Map map = new HashMap();
        map.put("total", list.getTotalElements());//数据总数  
        map.put("rows", list.getContent());//分页应该显示的数据  
/*
        result = new ResultMessage();
        result.setSuccess(true);
        result.setMsg("操作成功！");
        result.setResult(map);
*/
        return map;

    }
    
    

    @Override
    public void create(Host obj) {
            getHostDAO().saveAndFlush(obj);
    }

    @Override
    public List<Host> findAll() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean start(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean stop(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean restart(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
