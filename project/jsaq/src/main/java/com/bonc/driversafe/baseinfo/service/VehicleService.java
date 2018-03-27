package com.bonc.driversafe.baseinfo.service;

import java.util.List;

import javax.servlet.ServletOutputStream;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.Vehicle;

public interface VehicleService extends CRUDService<Vehicle>{
	public void exportExcel(ServletOutputStream outputStream,Vehicle veh);

	List<Vehicle> findByCondition(Vehicle obj);
	
	void delBatchByIds(Long[] ids);

	List<Vehicle> getVehicleByArea(Vehicle obj);
}
