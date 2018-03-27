package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.TransCompany;

public interface TransCompanyDao extends JpaRepository<TransCompany, Long>,JpaSpecificationExecutor<TransCompany>{

}
