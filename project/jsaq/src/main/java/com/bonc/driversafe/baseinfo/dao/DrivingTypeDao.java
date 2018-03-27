package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.DrivingType;

public interface DrivingTypeDao extends JpaRepository<DrivingType, Long>,JpaSpecificationExecutor<DrivingType>{

}
