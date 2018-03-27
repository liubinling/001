package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.BusinussType;

public interface BusinussTypeDao extends JpaRepository<BusinussType, Long>,JpaSpecificationExecutor<BusinussType>{

}
