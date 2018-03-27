package com.bonc.driversafe.baseinfo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
import com.bonc.driversafe.baseinfo.service.TableService;
/**
 * 码表查询controller
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/v1.0/")
public class TableController {
	
	@Autowired
	private TableService tableService;
	
	@RequestMapping(value = "/areaType", method = RequestMethod.GET)
	public List<AreaType> getAreaType() {
		return tableService.getAreaType();
	}
	@RequestMapping(value = "/executeStatus", method = RequestMethod.GET)
	public List<ExecuteStatus> getExecuteStatus() {
		return tableService.getExecuteStatus();
	}
	@RequestMapping(value = "/isCalibrate", method = RequestMethod.GET)
	public List<IsCalibrate> getIsCalibrate() {
		return tableService.getIsCalibrate();
	}
	
	@RequestMapping(value = "/businessType", method = RequestMethod.GET)
	public List<BusinussType> getBusinessType() {
		return tableService.getBusinessType();
	}
	
	@RequestMapping(value = "/colorType", method = RequestMethod.GET)
	public List<ColorType> getColorType() {
		return tableService.getColorType();
	}
	
	@RequestMapping(value = "/deviceStatus", method = RequestMethod.GET)
	public List<DeviceStatus> getDeviceStatus() {
		return tableService.getDeviceStatus();
	}

	@RequestMapping(value = "/deviceType", method = RequestMethod.GET)
	public List<DeviceType> getDeviceType() {
		return tableService.getDeviceType();
	}
	
	@RequestMapping(value = "/drivingType", method = RequestMethod.GET)
	public List<DrivingType> getDrivingType() {
		return tableService.getDrivingType();
	}
	
	@RequestMapping(value = "/industryType", method = RequestMethod.GET)
	public List<IndustryType> getIndustryType() {
		return tableService.getIndustryType();
	}
	
	@RequestMapping(value = "/runningStatus", method = RequestMethod.GET)
	public List<RunningStatus> getRunningStatus() {
		return  tableService.getRunningStatus();
	}
	
	@RequestMapping(value = "/transCompanyType", method = RequestMethod.GET)
	public List<TransCompanyType> getTransCompanyType() {
		return tableService.getTransCompanyType();
	}
	
	@RequestMapping(value = "/vehicleType", method = RequestMethod.GET)
	public List<VehicleType> getVehicleType() {
		return tableService.getVehicleType();
	}
	@RequestMapping(value = "/terminalCompany", method = RequestMethod.GET)
	public List<TerminalCompany> getTerminalCompany() {
		return tableService.getTerminalCompany();
	}
	
	@RequestMapping(value = "/cameraStatus", method = RequestMethod.GET)
	public List<CameraStatus> getCameraStatus() {
		return tableService.getCameraStatus();
	}
}
