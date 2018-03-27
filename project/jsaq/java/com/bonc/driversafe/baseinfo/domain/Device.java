package com.bonc.driversafe.baseinfo.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
	private Integer updateInterval;

	/**
	 * 备注
	 */
	@Column
	private String note;

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

	public Integer getUpdateInterval() {
		return updateInterval;
	}

	public void setUpdateInterval(Integer updateInterval) {
		this.updateInterval = updateInterval;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
	
	

}
