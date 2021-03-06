package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.TerminalCompany;

public interface TerminalCompanyDao extends JpaRepository<TerminalCompany, Long>,JpaSpecificationExecutor<TerminalCompany> {

}
