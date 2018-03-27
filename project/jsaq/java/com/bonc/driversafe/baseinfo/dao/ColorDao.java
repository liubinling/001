package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.ColorType;

public interface ColorDao extends JpaRepository<ColorType, Long>,JpaSpecificationExecutor<ColorType>{

}
