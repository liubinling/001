package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.Vehicle;

public interface VehicleDao extends JpaRepository<Vehicle, Long>,JpaSpecificationExecutor<Vehicle>{

}
