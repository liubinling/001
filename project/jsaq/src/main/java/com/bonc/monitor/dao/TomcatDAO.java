package com.bonc.monitor.dao;

import com.bonc.monitor.domain.Tomcat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * tomcat数据访问对象
 */
public interface TomcatDAO extends JpaRepository<Tomcat,Long>, JpaSpecificationExecutor<Tomcat> {

    public List findByHost_Id(long id);

}
