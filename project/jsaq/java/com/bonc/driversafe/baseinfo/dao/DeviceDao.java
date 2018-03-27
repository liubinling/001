package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.Device;

public interface DeviceDao  extends JpaRepository<Device, Long>,JpaSpecificationExecutor<Device>{

}
