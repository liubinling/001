package com.bonc.monitor.dao;

import com.bonc.monitor.domain.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * 主机数据库访问对象
 */
public interface HostDAO extends JpaRepository<Host,Long>, JpaSpecificationExecutor<Host> {

}
