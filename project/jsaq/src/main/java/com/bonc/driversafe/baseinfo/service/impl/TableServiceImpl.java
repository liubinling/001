
package com.bonc.driversafe.baseinfo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.driversafe.baseinfo.dao.AreaTypeDao;
import com.bonc.driversafe.baseinfo.dao.BusinussTypeDao;
import com.bonc.driversafe.baseinfo.dao.CameraStatusDao;
import com.bonc.driversafe.baseinfo.dao.ColorDao;
import com.bonc.driversafe.baseinfo.dao.DeviceStatusDao;
import com.bonc.driversafe.baseinfo.dao.DeviceTypeDao;
import com.bonc.driversafe.baseinfo.dao.DrivingTypeDao;
import com.bonc.driversafe.baseinfo.dao.ExecuteStatusDao;
import com.bonc.driversafe.baseinfo.dao.IndustryTypeDao;
import com.bonc.driversafe.baseinfo.dao.IsCalibrateDao;
import com.bonc.driversafe.baseinfo.dao.RunningStatusDao;
import com.bonc.driversafe.baseinfo.dao.TerminalCompanyDao;
import com.bonc.driversafe.baseinfo.dao.TransCompanyTypeDao;
import com.bonc.driversafe.baseinfo.dao.VehicleTypeDao;
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

@Service
@Transactional
public class TableServiceImpl implements TableService {
	
	@Autowired
	private AreaTypeDao areaTypeDao;
	@Autowired
	private BusinussTypeDao businessTypeDao;
	@Autowired
	private ColorDao colorDao;
	@Autowired
	private DeviceStatusDao deviceStatusDao;
	@Autowired
	private DeviceTypeDao deviceTypeDao;
	@Autowired
	private DrivingTypeDao drivingTypeDao;
	@Autowired
	private IndustryTypeDao industryTypeDao;
	@Autowired
	private RunningStatusDao runningStatusDao;
	@Autowired
	private TransCompanyTypeDao transCompanyTypeDao;
	@Autowired
	private VehicleTypeDao vehicleTypeDao;
	@Autowired
	private TerminalCompanyDao terminalCompanyDao;
	@Autowired
	private CameraStatusDao cameraStatusDao;
	@Autowired
	private  ExecuteStatusDao executeStatusDao;
	@Autowired
	private IsCalibrateDao isCalibrateDao;
	
	@Override
	public List<AreaType> getAreaType() {
		List<AreaType> areaTypeList = areaTypeDao.findAll();
		return areaTypeList;
	}
	@Override
	public List<ExecuteStatus> getExecuteStatus() {
		List<ExecuteStatus> areaTypeList = executeStatusDao.findAll();
		return areaTypeList;
	}
	@Override
	public List<IsCalibrate> getIsCalibrate() {
		List<IsCalibrate> areaTypeList = isCalibrateDao.findAll();
		return areaTypeList;
	}
	@Override
	public List<BusinussType> getBusinessType() {
		List<BusinussType> businessTypeList = businessTypeDao.findAll();
		return businessTypeList;
	}
	@Override
	public List<ColorType> getColorType() {
		List<ColorType> colorTypeList = colorDao.findAll();
		return colorTypeList;
	}
	@Override
	public List<DeviceStatus> getDeviceStatus() {
		List<DeviceStatus> deviceStatusList = deviceStatusDao.findAll();
		return deviceStatusList;
	}
	@Override
	public List<DeviceType> getDeviceType() {
		List<DeviceType> deviceTypeList = deviceTypeDao.findAll();
		return deviceTypeList;
	}
	@Override
	public List<DrivingType> getDrivingType() {
		List<DrivingType> drivingTypeList = drivingTypeDao.findAll();
		return drivingTypeList;
	}
	@Override
	public List<IndustryType> getIndustryType() {
		List<IndustryType> industryTypeList = industryTypeDao.findAll();
		return industryTypeList;
	}
	@Override
	public List<RunningStatus> getRunningStatus() {
		List<RunningStatus> runningStatusList = runningStatusDao.findAll();
		return runningStatusList;
	}
	@Override
	public List<TransCompanyType> getTransCompanyType() {
		List<TransCompanyType> transCompanyTypeList = transCompanyTypeDao.findAll();
		return transCompanyTypeList;
	}
	@Override
	public List<VehicleType> getVehicleType() {
		List<VehicleType> vehicleTypeList = vehicleTypeDao.findAll();
		return vehicleTypeList;
	}
	@Override
	public List<TerminalCompany> getTerminalCompany() {
		return terminalCompanyDao.findAll();
	}
	@Override
	public List<CameraStatus> getCameraStatus() {
		return cameraStatusDao.findAll();
	}

}
