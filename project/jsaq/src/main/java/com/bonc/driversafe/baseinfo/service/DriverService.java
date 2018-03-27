package com.bonc.driversafe.baseinfo.service;

import java.util.List;

import javax.servlet.ServletOutputStream;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.Driver;

public interface DriverService extends CRUDService<Driver> {
	
	
	void exportExcel(ServletOutputStream outputStream, Driver driver);

	List<Driver> findByCondition(Driver obj);
	
	void delBatchByIds(Long[] ids);
}
