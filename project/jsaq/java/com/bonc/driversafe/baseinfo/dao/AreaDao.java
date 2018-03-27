package com.bonc.driversafe.baseinfo.dao;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.Area;

public interface AreaDao extends JpaRepository<Area, Long>,JpaSpecificationExecutor<Area>{

}
