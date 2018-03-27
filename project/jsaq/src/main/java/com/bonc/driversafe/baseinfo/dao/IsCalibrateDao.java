package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.IsCalibrate;

public interface IsCalibrateDao extends JpaRepository<IsCalibrate, Long>,JpaSpecificationExecutor<IsCalibrate>{

}
