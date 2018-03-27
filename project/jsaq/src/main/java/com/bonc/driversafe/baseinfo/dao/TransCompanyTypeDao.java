package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.TransCompanyType;

public interface TransCompanyTypeDao extends JpaRepository<TransCompanyType, Long>,JpaSpecificationExecutor<TransCompanyType>{

}
