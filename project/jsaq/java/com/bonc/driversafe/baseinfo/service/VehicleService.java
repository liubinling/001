package com.bonc.driversafe.baseinfo.service;

import javax.servlet.ServletOutputStream;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.Vehicle;

public interface VehicleService extends CRUDService<Vehicle>{
	public void exportExcel(ServletOutputStream outputStream);
}
