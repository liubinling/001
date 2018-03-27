package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.AreaType;

public interface AreaTypeDao extends JpaRepository<AreaType, Long>,JpaSpecificationExecutor<AreaType>{

}
