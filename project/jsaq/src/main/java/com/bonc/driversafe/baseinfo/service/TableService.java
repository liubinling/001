package com.bonc.driversafe.baseinfo.service;

import java.util.List;

import com.bonc.driversafe.baseinfo.domain.AreaType;
import com.bonc.driversafe.baseinfo.domain.BusinussType;
import com.bonc.driversafe.baseinfo.domain.CameraStatus;
import com.bonc.driversafe.baseinfo.domain.ColorType;
import com.bonc.driversafe.baseinfo.domain.DeviceStatus;
import com.bonc.driversafe.baseinfo.domain.DeviceType;
import com.bonc.driversafe.baseinfo.domain.DrivingType;
import com.bonc.driversafe.baseinfo.domain.ExecuteStatus;
import com.bonc.driversafe.baseinfo.domain.IndustryType;
import com.bonc.driversafe.baseinfo.domain.IsCalibrate;
import com.bonc.driversafe.baseinfo.domain.RunningStatus;
import com.bonc.driversafe.baseinfo.domain.TerminalCompany;
import com.bonc.driversafe.baseinfo.domain.TransCompanyType;
import com.bonc.driversafe.baseinfo.domain.VehicleType;

public interface TableService {

	List<AreaType> getAreaType();
	
	List<BusinussType> getBusinessType();
	
	List<ColorType> getColorType();

	List<DeviceStatus> getDeviceStatus();
	
	List<DeviceType> getDeviceType();
	
	List<DrivingType> getDrivingType();
	
	List<IndustryType> getIndustryType();
	
	List<RunningStatus> getRunningStatus();
	
	List<TransCompanyType> getTransCompanyType();
	
	List<VehicleType> getVehicleType();
	List<TerminalCompany> getTerminalCompany();

	List<CameraStatus> getCameraStatus();

	List<ExecuteStatus> getExecuteStatus();

	List<IsCalibrate> getIsCalibrate();
}
