package com.bonc.driversafe.baseinfo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bonc.common.domain.ResultMessage;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.AreaType;
import com.bonc.driversafe.baseinfo.domain.BusinussType;
import com.bonc.driversafe.baseinfo.domain.ColorType;
import com.bonc.driversafe.baseinfo.domain.DeviceStatus;
import com.bonc.driversafe.baseinfo.domain.DeviceType;
import com.bonc.driversafe.baseinfo.domain.DrivingType;
import com.bonc.driversafe.baseinfo.domain.IndustryType;
import com.bonc.driversafe.baseinfo.domain.RunningStatus;
import com.bonc.driversafe.baseinfo.domain.TransCompanyType;
import com.bonc.driversafe.baseinfo.domain.VehicleType;
import com.bonc.driversafe.baseinfo.service.TableService;

@RestController
@RequestMapping("/api/v1.0/")
public class TableController {
	
	@Autowired
	private TableService tableService;
	
	@RequestMapping(value = "/areaType", method = RequestMethod.GET)
	public ResultMessage getAreaType() {
		ResultMessage result = new ResultMessage();
		List<AreaType> areaTypeList = tableService.getAreaType();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(areaTypeList);
		return result;
	}
	
	@RequestMapping(value = "/businessType", method = RequestMethod.GET)
	public ResultMessage getBusinessType() {
		ResultMessage result = new ResultMessage();
		List<BusinussType> businessTypeList = tableService.getBusinessType();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(businessTypeList);
		return result;
	}
	
	@RequestMapping(value = "/colorType", method = RequestMethod.GET)
	public ResultMessage getColorType() {
		ResultMessage result = new ResultMessage();
		List<ColorType> colorTypeList = tableService.getColorType();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(colorTypeList);
		return result;
	}
	
	@RequestMapping(value = "/deviceStatus", method = RequestMethod.GET)
	public ResultMessage getDeviceStatus() {
		ResultMessage result = new ResultMessage();
		List<DeviceStatus> deviceStatusList = tableService.getDeviceStatus();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(deviceStatusList);
		return result;
	}

	@RequestMapping(value = "/deviceType", method = RequestMethod.GET)
	public ResultMessage getDeviceType() {
		ResultMessage result = new ResultMessage();
		List<DeviceType> deviceTypeList = tableService.getDeviceType();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(deviceTypeList);
		return result;
	}
	
	@RequestMapping(value = "/drivingType", method = RequestMethod.GET)
	public ResultMessage getDrivingType() {
		ResultMessage result = new ResultMessage();
		List<DrivingType> drivingTypeList = tableService.getDrivingType();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(drivingTypeList);
		return result;
	}
	
	@RequestMapping(value = "/industryType", method = RequestMethod.GET)
	public ResultMessage getIndustryType() {
		ResultMessage result = new ResultMessage();
		List<IndustryType> industryTypeList = tableService.getIndustryType();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(industryTypeList);
		return result;
	}
	
	@RequestMapping(value = "/runningStatus", method = RequestMethod.GET)
	public ResultMessage getRunningStatus() {
		ResultMessage result = new ResultMessage();
		List<RunningStatus> runningStatusList = tableService.getRunningStatus();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(runningStatusList);
		return result;
	}
	
	@RequestMapping(value = "/transCompanyType", method = RequestMethod.GET)
	public ResultMessage getTransCompanyType() {
		ResultMessage result = new ResultMessage();
		List<TransCompanyType> transCompanyTypeList = tableService.getTransCompanyType();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(transCompanyTypeList);
		return result;
	}
	
	@RequestMapping(value = "/vehicleType", method = RequestMethod.GET)
	public ResultMessage getVehicleType() {
		ResultMessage result = new ResultMessage();
		List<VehicleType> vehicleTypeList = tableService.getVehicleType();
		result.setSuccess(true);
		result.setMsg("操作成功");
		result.setResult(vehicleTypeList);
		return result;
	}
}
