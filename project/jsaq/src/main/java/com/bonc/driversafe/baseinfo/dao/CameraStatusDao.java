package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.CameraStatus;

public interface CameraStatusDao  extends JpaRepository<CameraStatus, Long>,JpaSpecificationExecutor<CameraStatus>{

}
