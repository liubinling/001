package com.bonc.driversafe.baseinfo.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 车辆信息
 */
@Entity
public class Vehicle {

	/**
	 * 车辆信息自增id
	 */
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	/**
	 * 车牌号码
	 */
	@Column
	private String plateNo;

	/**
	 * 终端卡号
	 */
	@Column
	private String deviceNo;

	/**
	 * 所属车队
	 */
	@ManyToOne
	private Motorcade motorcade;
	@OneToOne
	private Driver driver;
	/**
	 * 行业类型
	 */
	@ManyToOne
	private IndustryType industryType;

	/**
	 * 颜色
	 */
	@ManyToOne
	private ColorType color;

	/**
	 * 车籍地
	 */
	@ManyToOne
	private Area carArea;

	/**
	 * 终端
	 */
	@OneToOne
	private Device device;

	/**
	 * 发动机号
	 */
	@Column
	private String engineNo;

	/**
	 * 设备状态
	 */
	@ManyToOne
	private DeviceStatus deviceStatus;

	/**
	 * 安装时间
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date installTime;

	/**
	 * 入网时间
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date netInTime;

	/**
	 * 车辆类型
	 */
	@ManyToOne
	private VehicleType vehicleType;

	/**
	 * 所属业户
	 */
	@ManyToOne
	private TerminalCompany terminalCompany;

	/**
	 * 运行状态
	 */
	@ManyToOne
	private RunningStatus runningStatus;

	/**
	 * 服务开始时间
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date startTime;

	/**
	 * 服务结束时间
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date endTime;

	/**
	 * 品牌
	 */
	@Column
	private String brand;

	/**
	 * 型号
	 */
	@Column
	private String model;

	/**
	 * 使用性质
	 */
	@Column
	private String useCharacter  ;

	/**
	 * 车辆识别代号
	 */
	@Column
	private String vin;

	/**
	 * 发证日期
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date issueDate;
	
	/**
	 * 失效日期
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date validDate;

	/**
	 * 准牵引总质量
	 */
	@Column
	private Double tractionMass;

	/**
	 * 核定载人数
	 */
	@Column
	private Integer approvedPassengersCapacity;

	/**
	 * 总质量
	 */
	@Column
	private Double grossMass;

	/**
	 * 整备质量
	 */
	@Column
	private Double unladenMass;

	/**
	 * 核定载质量
	 */
	@Column
	private Double approvedLoad;

	/**
	 * 保险公司
	 */
	@ManyToOne
	private InsuranceCompany insuranceCompany;

	/**
	 * 加强险保单号
	 */
	@Column
	private String saliNo;

	/**
	 * 商业险保单号
	 */
	@Column
	private String commerceInsuranceNo;

	/**
	 * 投保日期
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date insuranceStartTime;

	/**
	 * 失效日期
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date insuranceEndTime;

	public TerminalCompany getTerminalCompany() {
		return terminalCompany;
	}

	public void setTerminalCompany(TerminalCompany terminalCompany) {
		this.terminalCompany = terminalCompany;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public String getDeviceNo() {
		return deviceNo;
	}

	public void setDeviceNo(String deviceNo) {
		this.deviceNo = deviceNo;
	}

	public Motorcade getMotorcade() {
		return motorcade;
	}

	public void setMotorcade(Motorcade motorcade) {
		this.motorcade = motorcade;
	}

	public IndustryType getIndustryType() {
		return industryType;
	}

	public void setIndustryType(IndustryType industryType) {
		this.industryType = industryType;
	}

	public ColorType getColor() {
		return color;
	}

	public void setColor(ColorType color) {
		this.color = color;
	}

	public Area getCarArea() {
		return carArea;
	}

	public void setCarArea(Area carArea) {
		this.carArea = carArea;
	}

	public Device getDevice() {
		return device;
	}

	public void setDevice(Device device) {
		this.device = device;
	}

	public String getEngineNo() {
		return engineNo;
	}

	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}

	public DeviceStatus getDeviceStatus() {
		return deviceStatus;
	}

	public void setDeviceStatus(DeviceStatus deviceStatus) {
		this.deviceStatus = deviceStatus;
	}

	public Date getInstallTime() {
		return installTime;
	}

	public void setInstallTime(Date installTime) {
		this.installTime = installTime;
	}

	public Date getNetInTime() {
		return netInTime;
	}

	public void setNetInTime(Date netInTime) {
		this.netInTime = netInTime;
	}

	public VehicleType getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(VehicleType vehicleType) {
		this.vehicleType = vehicleType;
	}

	public RunningStatus getRunningStatus() {
		return runningStatus;
	}

	public void setRunningStatus(RunningStatus runningStatus) {
		this.runningStatus = runningStatus;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getUseCharacter() {
		return useCharacter;
	}

	public void setUseCharacter(String useCharacter) {
		this.useCharacter = useCharacter;
	}

	public String getVin() {
		return vin;
	}

	public void setVin(String vin) {
		this.vin = vin;
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}

	public Date getValidDate() {
		return validDate;
	}

	public void setValidDate(Date validDate) {
		this.validDate = validDate;
	}

	public Double getTractionMass() {
		return tractionMass;
	}

	public void setTractionMass(Double tractionMass) {
		this.tractionMass = tractionMass;
	}

	public Integer getApprovedPassengersCapacity() {
		return approvedPassengersCapacity;
	}

	public void setApprovedPassengersCapacity(Integer approvedPassengersCapacity) {
		this.approvedPassengersCapacity = approvedPassengersCapacity;
	}

	public Double getGrossMass() {
		return grossMass;
	}

	public void setGrossMass(Double grossMass) {
		this.grossMass = grossMass;
	}

	public Double getUnladenMass() {
		return unladenMass;
	}

	public void setUnladenMass(Double unladenMass) {
		this.unladenMass = unladenMass;
	}

	public Double getApprovedLoad() {
		return approvedLoad;
	}

	public void setApprovedLoad(Double approvedLoad) {
		this.approvedLoad = approvedLoad;
	}

	public InsuranceCompany getInsuranceCompany() {
		return insuranceCompany;
	}

	public void setInsuranceCompany(InsuranceCompany insuranceCompany) {
		this.insuranceCompany = insuranceCompany;
	}

	public String getSaliNo() {
		return saliNo;
	}

	public void setSaliNo(String saliNo) {
		this.saliNo = saliNo;
	}

	public String getCommerceInsuranceNo() {
		return commerceInsuranceNo;
	}

	public void setCommerceInsuranceNo(String commerceInsuranceNo) {
		this.commerceInsuranceNo = commerceInsuranceNo;
	}

	public Date getInsuranceStartTime() {
		return insuranceStartTime;
	}

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
	}

	public void setInsuranceStartTime(Date insuranceStartTime) {
		this.insuranceStartTime = insuranceStartTime;
	}

	public Date getInsuranceEndTime() {
		return insuranceEndTime;
	}

	public void setInsuranceEndTime(Date insuranceEndTime) {
		this.insuranceEndTime = insuranceEndTime;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((approvedLoad == null) ? 0 : approvedLoad.hashCode());
		result = prime * result + ((approvedPassengersCapacity == null) ? 0 : approvedPassengersCapacity.hashCode());
		result = prime * result + ((brand == null) ? 0 : brand.hashCode());
		result = prime * result + ((carArea == null) ? 0 : carArea.hashCode());
		result = prime * result + ((color == null) ? 0 : color.hashCode());
		result = prime * result + ((commerceInsuranceNo == null) ? 0 : commerceInsuranceNo.hashCode());
		result = prime * result + ((device == null) ? 0 : device.hashCode());
		result = prime * result + ((deviceNo == null) ? 0 : deviceNo.hashCode());
		result = prime * result + ((deviceStatus == null) ? 0 : deviceStatus.hashCode());
		result = prime * result + ((driver == null) ? 0 : driver.hashCode());
		result = prime * result + ((endTime == null) ? 0 : endTime.hashCode());
		result = prime * result + ((engineNo == null) ? 0 : engineNo.hashCode());
		result = prime * result + ((grossMass == null) ? 0 : grossMass.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((industryType == null) ? 0 : industryType.hashCode());
		result = prime * result + ((installTime == null) ? 0 : installTime.hashCode());
		result = prime * result + ((insuranceCompany == null) ? 0 : insuranceCompany.hashCode());
		result = prime * result + ((insuranceEndTime == null) ? 0 : insuranceEndTime.hashCode());
		result = prime * result + ((insuranceStartTime == null) ? 0 : insuranceStartTime.hashCode());
		result = prime * result + ((issueDate == null) ? 0 : issueDate.hashCode());
		result = prime * result + ((model == null) ? 0 : model.hashCode());
		result = prime * result + ((motorcade == null) ? 0 : motorcade.hashCode());
		result = prime * result + ((netInTime == null) ? 0 : netInTime.hashCode());
		result = prime * result + ((plateNo == null) ? 0 : plateNo.hashCode());
		result = prime * result + ((runningStatus == null) ? 0 : runningStatus.hashCode());
		result = prime * result + ((saliNo == null) ? 0 : saliNo.hashCode());
		result = prime * result + ((startTime == null) ? 0 : startTime.hashCode());
		result = prime * result + ((terminalCompany == null) ? 0 : terminalCompany.hashCode());
		result = prime * result + ((tractionMass == null) ? 0 : tractionMass.hashCode());
		result = prime * result + ((unladenMass == null) ? 0 : unladenMass.hashCode());
		result = prime * result + ((useCharacter == null) ? 0 : useCharacter.hashCode());
		result = prime * result + ((validDate == null) ? 0 : validDate.hashCode());
		result = prime * result + ((vehicleType == null) ? 0 : vehicleType.hashCode());
		result = prime * result + ((vin == null) ? 0 : vin.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Vehicle other = (Vehicle) obj;
		if (approvedLoad == null) {
			if (other.approvedLoad != null)
				return false;
		} else if (!approvedLoad.equals(other.approvedLoad))
			return false;
		if (approvedPassengersCapacity == null) {
			if (other.approvedPassengersCapacity != null)
				return false;
		} else if (!approvedPassengersCapacity.equals(other.approvedPassengersCapacity))
			return false;
		if (brand == null) {
			if (other.brand != null)
				return false;
		} else if (!brand.equals(other.brand))
			return false;
		if (carArea == null) {
			if (other.carArea != null)
				return false;
		} else if (!carArea.equals(other.carArea))
			return false;
		if (color == null) {
			if (other.color != null)
				return false;
		} else if (!color.equals(other.color))
			return false;
		if (commerceInsuranceNo == null) {
			if (other.commerceInsuranceNo != null)
				return false;
		} else if (!commerceInsuranceNo.equals(other.commerceInsuranceNo))
			return false;
		if (device == null) {
			if (other.device != null)
				return false;
		} else if (!device.equals(other.device))
			return false;
		if (deviceNo == null) {
			if (other.deviceNo != null)
				return false;
		} else if (!deviceNo.equals(other.deviceNo))
			return false;
		if (deviceStatus == null) {
			if (other.deviceStatus != null)
				return false;
		} else if (!deviceStatus.equals(other.deviceStatus))
			return false;
		if (driver == null) {
			if (other.driver != null)
				return false;
		} else if (!driver.equals(other.driver))
			return false;
		if (endTime == null) {
			if (other.endTime != null)
				return false;
		} else if (!endTime.equals(other.endTime))
			return false;
		if (engineNo == null) {
			if (other.engineNo != null)
				return false;
		} else if (!engineNo.equals(other.engineNo))
			return false;
		if (grossMass == null) {
			if (other.grossMass != null)
				return false;
		} else if (!grossMass.equals(other.grossMass))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (industryType == null) {
			if (other.industryType != null)
				return false;
		} else if (!industryType.equals(other.industryType))
			return false;
		if (installTime == null) {
			if (other.installTime != null)
				return false;
		} else if (!installTime.equals(other.installTime))
			return false;
		if (insuranceCompany == null) {
			if (other.insuranceCompany != null)
				return false;
		} else if (!insuranceCompany.equals(other.insuranceCompany))
			return false;
		if (insuranceEndTime == null) {
			if (other.insuranceEndTime != null)
				return false;
		} else if (!insuranceEndTime.equals(other.insuranceEndTime))
			return false;
		if (insuranceStartTime == null) {
			if (other.insuranceStartTime != null)
				return false;
		} else if (!insuranceStartTime.equals(other.insuranceStartTime))
			return false;
		if (issueDate == null) {
			if (other.issueDate != null)
				return false;
		} else if (!issueDate.equals(other.issueDate))
			return false;
		if (model == null) {
			if (other.model != null)
				return false;
		} else if (!model.equals(other.model))
			return false;
		if (motorcade == null) {
			if (other.motorcade != null)
				return false;
		} else if (!motorcade.equals(other.motorcade))
			return false;
		if (netInTime == null) {
			if (other.netInTime != null)
				return false;
		} else if (!netInTime.equals(other.netInTime))
			return false;
		if (plateNo == null) {
			if (other.plateNo != null)
				return false;
		} else if (!plateNo.equals(other.plateNo))
			return false;
		if (runningStatus == null) {
			if (other.runningStatus != null)
				return false;
		} else if (!runningStatus.equals(other.runningStatus))
			return false;
		if (saliNo == null) {
			if (other.saliNo != null)
				return false;
		} else if (!saliNo.equals(other.saliNo))
			return false;
		if (startTime == null) {
			if (other.startTime != null)
				return false;
		} else if (!startTime.equals(other.startTime))
			return false;
		if (terminalCompany == null) {
			if (other.terminalCompany != null)
				return false;
		} else if (!terminalCompany.equals(other.terminalCompany))
			return false;
		if (tractionMass == null) {
			if (other.tractionMass != null)
				return false;
		} else if (!tractionMass.equals(other.tractionMass))
			return false;
		if (unladenMass == null) {
			if (other.unladenMass != null)
				return false;
		} else if (!unladenMass.equals(other.unladenMass))
			return false;
		if (useCharacter == null) {
			if (other.useCharacter != null)
				return false;
		} else if (!useCharacter.equals(other.useCharacter))
			return false;
		if (validDate == null) {
			if (other.validDate != null)
				return false;
		} else if (!validDate.equals(other.validDate))
			return false;
		if (vehicleType == null) {
			if (other.vehicleType != null)
				return false;
		} else if (!vehicleType.equals(other.vehicleType))
			return false;
		if (vin == null) {
			if (other.vin != null)
				return false;
		} else if (!vin.equals(other.vin))
			return false;
		return true;
	}

	
	
}
