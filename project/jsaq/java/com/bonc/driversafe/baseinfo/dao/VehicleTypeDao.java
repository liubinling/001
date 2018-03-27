package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.VehicleType;

public interface VehicleTypeDao extends JpaRepository<VehicleType, Long>,JpaSpecificationExecutor<VehicleType>{

}
