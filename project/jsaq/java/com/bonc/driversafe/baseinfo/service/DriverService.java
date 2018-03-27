package com.bonc.driversafe.baseinfo.service;

import javax.servlet.ServletOutputStream;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.Driver;

public interface DriverService extends CRUDService<Driver> {
	public void exportExcel(ServletOutputStream outputStream);
}
