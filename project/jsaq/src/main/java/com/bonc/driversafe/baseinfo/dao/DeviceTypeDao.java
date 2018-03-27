package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.DeviceType;

public interface DeviceTypeDao extends JpaRepository<DeviceType, Long>,JpaSpecificationExecutor<DeviceType>{

}
