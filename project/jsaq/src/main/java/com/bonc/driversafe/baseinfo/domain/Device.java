package com.bonc.driversafe.baseinfo.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * 终端
 */
@Entity
public class Device {

	/**
	 * 自增id
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;

	/**
	 * 设备唯一id
	 */
	@Column
	private String deviceId;

	/**
	 * 终端类型
	 */
	@ManyToOne
	private DeviceType deviceType;

	/**
	 * 终端当前状态
	 */
	@ManyToOne
	private DeviceStatus deviceStatus;

	/**
	 * 安装时间
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date installDate;

	/**
	 * 软件版本号
	 */
	@Column
	private String softwareVersionNumber;

	/**
	 * 硬件版本号
	 */
	@Column
	private String hardwareVersionNumber;

	/**
	 * 出厂号
	 */
	@Column
	private String factoryNumber;

	/**
	 * 安装工
	 */
	@Column
	private String installer;

	/**
	 * 位置上传间隔
	 */
	@Column
	private Double updateInterval;

	/**
	 * 备注
	 */
	@Column
	private String note;
	
	/**
	 * 版本名称
	 */
	@Column
	private String versionName;

	/**
	 * 绑定车辆
	 */
	@JsonIgnoreProperties(value = { "device" ,"vehicle"})
	@OneToOne(fetch = FetchType.LAZY)
	private Vehicle vehicle;

	/**
	 * 摄像机状态
	 */
	@ManyToOne(cascade=CascadeType.ALL)
	private CameraStatus cameraStatus;

	/**
	 * 是否有SD(0:没有；1：有）
	 */
	@Column
	private String sd;

	/**
	 * 总空间
	 */
	@Column
	private Double totalSpace;

	/**
	 * 剩余空间
	 */
	@Column
	private Double freeSpace;

	/**
	 * 最近执行时间
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date latestExecutionTime;

	/**
	 * 最近下发时间
	 */
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date latestIssueTime;

	/**
	 * 执行状态（0：未执行；1：已执行）
	 */
	@ManyToOne
	private ExecuteStatus executeStatus;

	/**
	 * 是否校准：0：未校准；1：已校准
	 */
	@ManyToOne
	private IsCalibrate isCalibrate;

	/**
	 * 下发人
	 */
	@Column
	private String handOut;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public DeviceType getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(DeviceType deviceType) {
		this.deviceType = deviceType;
	}

	public DeviceStatus getDeviceStatus() {
		return deviceStatus;
	}

	public void setDeviceStatus(DeviceStatus deviceStatus) {
		this.deviceStatus = deviceStatus;
	}

	public Date getInstallDate() {
		return installDate;
	}

	public void setInstallDate(Date installDate) {
		this.installDate = installDate;
	}

	public String getSoftwareVersionNumber() {
		return softwareVersionNumber;
	}

	public void setSoftwareVersionNumber(String softwareVersionNumber) {
		this.softwareVersionNumber = softwareVersionNumber;
	}

	public String getHardwareVersionNumber() {
		return hardwareVersionNumber;
	}

	public void setHardwareVersionNumber(String hardwareVersionNumber) {
		this.hardwareVersionNumber = hardwareVersionNumber;
	}

	public String getFactoryNumber() {
		return factoryNumber;
	}

	public void setFactoryNumber(String factoryNumber) {
		this.factoryNumber = factoryNumber;
	}

	public String getInstaller() {
		return installer;
	}

	public void setInstaller(String installer) {
		this.installer = installer;
	}

	public Double getUpdateInterval() {
		return updateInterval;
	}

	public void setUpdateInterval(Double updateInterval) {
		this.updateInterval = updateInterval;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getVersionName() {
		return versionName;
	}

	public void setVersionName(String versionName) {
		this.versionName = versionName;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public CameraStatus getCameraStatus() {
		return cameraStatus;
	}

	public void setCameraStatus(CameraStatus cameraStatus) {
		this.cameraStatus = cameraStatus;
	}


	public double getTotalSpace() {
		return totalSpace;
	}

	public void setTotalSpace(double totalSpace) {
		this.totalSpace = totalSpace;
	}


	public Date getLatestExecutionTime() {
		return latestExecutionTime;
	}

	public void setLatestExecutionTime(Date latestExecutionTime) {
		this.latestExecutionTime = latestExecutionTime;
	}

	public Date getLatestIssueTime() {
		return latestIssueTime;
	}

	public void setLatestIssueTime(Date latestIssueTime) {
		this.latestIssueTime = latestIssueTime;
	}


	public String getHandOut() {
		return handOut;
	}

	public void setHandOut(String handOut) {
		this.handOut = handOut;
	}

	public String getSd() {
		return sd;
	}

	public void setSd(String sd) {
		this.sd = sd;
	}

	public Double getFreeSpace() {
		return freeSpace;
	}

	public void setFreeSpace(Double freeSpace) {
		this.freeSpace = freeSpace;
	}
	public ExecuteStatus getExecuteStatus() {
		return executeStatus;
	}

	public void setExecuteStatus(ExecuteStatus executeStatus) {
		this.executeStatus = executeStatus;
	}

	public IsCalibrate getIsCalibrate() {
		return isCalibrate;
	}

	public void setIsCalibrate(IsCalibrate isCalibrate) {
		this.isCalibrate = isCalibrate;
	}

	public void setTotalSpace(Double totalSpace) {
		this.totalSpace = totalSpace;
	}
	
	

}
