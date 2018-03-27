package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.DeviceStatus;

public interface DeviceStatusDao extends JpaRepository<DeviceStatus, Long>,JpaSpecificationExecutor<DeviceStatus> {

}
