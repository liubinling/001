package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.RunningStatus;

public interface RunningStatusDao extends JpaRepository<RunningStatus, Long>,JpaSpecificationExecutor<RunningStatus>{

}
