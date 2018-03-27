package com.bonc.driversafe.baseinfo.service;

import java.util.List;

import javax.servlet.ServletOutputStream;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.Device;

public interface DeviceService extends CRUDService<Device>{
		
	void delBatchByIds(Long[] ids);
	
	void exportExcel (ServletOutputStream outputStream,Device area);
	
	public List<Device> findByCondition(final Device area);
}
