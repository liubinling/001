package com.bonc.common.dao;

import com.bonc.common.domain.SysConfig;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SysConfigDAO extends JpaSpecificationExecutor<SysConfig>, JpaRepository<SysConfig,Long> {

}
