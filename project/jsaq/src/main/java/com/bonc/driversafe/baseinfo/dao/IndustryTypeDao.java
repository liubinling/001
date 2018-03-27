package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.IndustryType;

public interface IndustryTypeDao extends JpaRepository<IndustryType, Long>,JpaSpecificationExecutor<IndustryType>{

}
