package com.bonc.monitor.dao;

import com.bonc.monitor.domain.App;
import com.bonc.monitor.domain.Tomcat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * 应用数据访问对象
 */
public interface AppDAO extends JpaRepository<App,Long>, JpaSpecificationExecutor<App> {

}
