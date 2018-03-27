package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.ExecuteStatus;

public interface ExecuteStatusDao extends JpaRepository<ExecuteStatus, Long>,JpaSpecificationExecutor<ExecuteStatus>{

}
