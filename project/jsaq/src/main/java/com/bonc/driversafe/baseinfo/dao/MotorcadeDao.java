package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.Motorcade;

public interface MotorcadeDao extends JpaRepository<Motorcade, Long>,JpaSpecificationExecutor<Motorcade> {

}
