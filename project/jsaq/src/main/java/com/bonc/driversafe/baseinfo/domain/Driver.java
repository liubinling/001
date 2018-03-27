package com.bonc.driversafe.baseinfo.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * 驾驶员信息
 */
@Entity
public class Driver {

	/**
	 * 驾驶员自增id
	 */
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	/**
	 * 驾驶员名称
	 */
	@Column
	private String name;
	
	/**
	 * 身份证号
	 */
	@Column
	private String idCardNo;
	/**
	 * 性别
	 */
	@Column
	private String gender;

	/**
	 * 头像地址
	 */
	@Column
	private String headUrl;

	

	/**
	 * 绑定车辆
	 */
	@OneToOne
	@JsonIgnoreProperties(value = { "driver" })
	private Vehicle vehicle;
	
	@ManyToMany
	@JsonIgnoreProperties(value = { "driver" })
	private List<Vehicle> list = new ArrayList<Vehicle>();
	/**
	 * 联系电话
	 */
	@Column
	private String tel;

	/**
	 * 驾龄
	 */
	@Column
	private Double drivingYear;

	/**
	 * 押运员姓名
	 */
	@Column
	private String supercargoName;

	/**
	 * 出生日期
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE) 
	private Date birth;

	/**
	 * 出险次数
	 */
	@Column
	private Integer claimFrequence ;

	/**
	 * 认证状态（1：已认证，0：未认证）
	 */
	@Column
	private String licenseStatus;

	/**
	 * 准驾车型
	 */
	@ManyToOne
	private DrivingType drivingType;

	/**
	 * 初次领证日期
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE) 
	private Date firstDate;

	/**
	 * 有效日期
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE) 
	private Date validDate;

	/**
	 * 驾驶证号
	 */
	@Column
	private String driversLicenseNumber;

	/**
	 * 档案编号
	 */
	@Column
	private String fileNo;

	/**
	 * 从业资格证
	 */
	@Column
	private String qualificationCertificateName;

	/**
	 * 从业资格证类别
	 */
	@Column
	private String qualificationCertificateType;

	/**
	 * 证件编号
	 */
	@Column
	private String qualificationCertificateNo;

	/**
	 * 发证机构
	 */
	@Column
	private String certifyingAuthority;

	/**
	 * 发证日期
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE) 
	private Date certifyingTime;

	/**
	 * 过期时间
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE) 
	private Date expirationTime;

	/**
	 * 监督机构
	 */
	@Column
	private String regulator;

	/**
	 * 监督电话
	 */
	@Column
	private String regulatorTel;
	@ManyToOne
	private Motorcade motorcade;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Motorcade getMotorcade() {
		return motorcade;
	}

	public void setMotorcade(Motorcade motorcade) {
		this.motorcade = motorcade;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdCardNo() {
		return idCardNo;
	}

	public void setIdCardNo(String idCardNo) {
		this.idCardNo = idCardNo;
	}

	

	public List<Vehicle> getList() {
		return list;
	}

	public void setList(List<Vehicle> list) {
		this.list = list;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	
	
	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}


	public void setDrivingYear(Double drivingYear) {
		this.drivingYear = drivingYear;
	}
	

	public String getHeadUrl() {
		return headUrl;
	}

	public void setHeadUrl(String headUrl) {
		this.headUrl = headUrl;
	}


	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Double getDrivingYear() {
		return drivingYear;
	}

	public void setDrivingYear(double drivingYear) {
		this.drivingYear = drivingYear;
	}

	public String getSupercargoName() {
		return supercargoName;
	}

	public void setSupercargoName(String supercargoName) {
		this.supercargoName = supercargoName;
	}

	

	public Date getBirth() {
		return birth;
	}

	public void setBirth(Date birth) {
		this.birth = birth;
	}

	public Integer getClaimFrequence() {
		return claimFrequence;
	}

	public void setClaimFrequence(Integer claimFrequence) {
		this.claimFrequence = claimFrequence;
	}

	public String getLicenseStatus() {
		return licenseStatus;
	}

	public void setLicenseStatus(String licenseStatus) {
		this.licenseStatus = licenseStatus;
	}

	public DrivingType getDrivingType() {
		return drivingType;
	}

	public void setDrivingType(DrivingType drivingType) {
		this.drivingType = drivingType;
	}

	public Date getFirstDate() {
		return firstDate;
	}

	public void setFirstDate(Date firstDate) {
		this.firstDate = firstDate;
	}

	public Date getValidDate() {
		return validDate;
	}

	public void setValidDate(Date validDate) {
		this.validDate = validDate;
	}

	public String getDriversLicenseNumber() {
		return driversLicenseNumber;
	}

	public void setDriversLicenseNumber(String driversLicenseNumber) {
		this.driversLicenseNumber = driversLicenseNumber;
	}

	public String getFileNo() {
		return fileNo;
	}

	public void setFileNo(String fileNo) {
		this.fileNo = fileNo;
	}

	public String getQualificationCertificateName() {
		return qualificationCertificateName;
	}

	public void setQualificationCertificateName(String qualificationCertificateName) {
		this.qualificationCertificateName = qualificationCertificateName;
	}

	public String getQualificationCertificateType() {
		return qualificationCertificateType;
	}

	public void setQualificationCertificateType(String qualificationCertificateType) {
		this.qualificationCertificateType = qualificationCertificateType;
	}

	public String getQualificationCertificateNo() {
		return qualificationCertificateNo;
	}

	public void setQualificationCertificateNo(String qualificationCertificateNo) {
		this.qualificationCertificateNo = qualificationCertificateNo;
	}

	public String getCertifyingAuthority() {
		return certifyingAuthority;
	}

	public void setCertifyingAuthority(String certifyingAuthority) {
		this.certifyingAuthority = certifyingAuthority;
	}

	public Date getCertifyingTime() {
		return certifyingTime;
	}

	public void setCertifyingTime(Date certifyingTime) {
		this.certifyingTime = certifyingTime;
	}

	public Date getExpirationTime() {
		return expirationTime;
	}

	public void setExpirationTime(Date expirationTime) {
		this.expirationTime = expirationTime;
	}

	public String getRegulator() {
		return regulator;
	}

	public void setRegulator(String regulator) {
		this.regulator = regulator;
	}

	public String getRegulatorTel() {
		return regulatorTel;
	}

	public void setRegulatorTel(String regulatorTel) {
		this.regulatorTel = regulatorTel;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((birth == null) ? 0 : birth.hashCode());
		result = prime * result + ((certifyingAuthority == null) ? 0 : certifyingAuthority.hashCode());
		result = prime * result + ((certifyingTime == null) ? 0 : certifyingTime.hashCode());
		result = prime * result + ((claimFrequence == null) ? 0 : claimFrequence.hashCode());
		result = prime * result + ((driversLicenseNumber == null) ? 0 : driversLicenseNumber.hashCode());
		result = prime * result + ((drivingType == null) ? 0 : drivingType.hashCode());
		result = prime * result + ((drivingYear == null) ? 0 : drivingYear.hashCode());
		result = prime * result + ((expirationTime == null) ? 0 : expirationTime.hashCode());
		result = prime * result + ((fileNo == null) ? 0 : fileNo.hashCode());
		result = prime * result + ((firstDate == null) ? 0 : firstDate.hashCode());
		result = prime * result + ((gender == null) ? 0 : gender.hashCode());
		result = prime * result + ((headUrl == null) ? 0 : headUrl.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((idCardNo == null) ? 0 : idCardNo.hashCode());
		result = prime * result + ((licenseStatus == null) ? 0 : licenseStatus.hashCode());
//		result = prime * result + ((list == null) ? 0 : list.hashCode());
		result = prime * result + ((motorcade == null) ? 0 : motorcade.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result
				+ ((qualificationCertificateName == null) ? 0 : qualificationCertificateName.hashCode());
		result = prime * result + ((qualificationCertificateNo == null) ? 0 : qualificationCertificateNo.hashCode());
		result = prime * result
				+ ((qualificationCertificateType == null) ? 0 : qualificationCertificateType.hashCode());
		result = prime * result + ((regulator == null) ? 0 : regulator.hashCode());
		result = prime * result + ((regulatorTel == null) ? 0 : regulatorTel.hashCode());
		result = prime * result + ((supercargoName == null) ? 0 : supercargoName.hashCode());
		result = prime * result + ((tel == null) ? 0 : tel.hashCode());
		result = prime * result + ((validDate == null) ? 0 : validDate.hashCode());
		result = prime * result + ((vehicle == null) ? 0 : vehicle.hashCode());
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
		Driver other = (Driver) obj;
		if (birth == null) {
			if (other.birth != null)
				return false;
		} else if (!birth.equals(other.birth))
			return false;
		if (certifyingAuthority == null) {
			if (other.certifyingAuthority != null)
				return false;
		} else if (!certifyingAuthority.equals(other.certifyingAuthority))
			return false;
		if (certifyingTime == null) {
			if (other.certifyingTime != null)
				return false;
		} else if (!certifyingTime.equals(other.certifyingTime))
			return false;
		if (claimFrequence == null) {
			if (other.claimFrequence != null)
				return false;
		} else if (!claimFrequence.equals(other.claimFrequence))
			return false;
		if (driversLicenseNumber == null) {
			if (other.driversLicenseNumber != null)
				return false;
		} else if (!driversLicenseNumber.equals(other.driversLicenseNumber))
			return false;
		if (drivingType == null) {
			if (other.drivingType != null)
				return false;
		} else if (!drivingType.equals(other.drivingType))
			return false;
		if (drivingYear == null) {
			if (other.drivingYear != null)
				return false;
		} else if (!drivingYear.equals(other.drivingYear))
			return false;
		if (expirationTime == null) {
			if (other.expirationTime != null)
				return false;
		} else if (!expirationTime.equals(other.expirationTime))
			return false;
		if (fileNo == null) {
			if (other.fileNo != null)
				return false;
		} else if (!fileNo.equals(other.fileNo))
			return false;
		if (firstDate == null) {
			if (other.firstDate != null)
				return false;
		} else if (!firstDate.equals(other.firstDate))
			return false;
		if (gender == null) {
			if (other.gender != null)
				return false;
		} else if (!gender.equals(other.gender))
			return false;
		if (headUrl == null) {
			if (other.headUrl != null)
				return false;
		} else if (!headUrl.equals(other.headUrl))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (idCardNo == null) {
			if (other.idCardNo != null)
				return false;
		} else if (!idCardNo.equals(other.idCardNo))
			return false;
		if (licenseStatus == null) {
			if (other.licenseStatus != null)
				return false;
		} else if (!licenseStatus.equals(other.licenseStatus))
			return false;
		if (list == null) {
			if (other.list != null)
				return false;
		} else if (!list.equals(other.list))
			return false;
		if (motorcade == null) {
			if (other.motorcade != null)
				return false;
		} else if (!motorcade.equals(other.motorcade))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (qualificationCertificateName == null) {
			if (other.qualificationCertificateName != null)
				return false;
		} else if (!qualificationCertificateName.equals(other.qualificationCertificateName))
			return false;
		if (qualificationCertificateNo == null) {
			if (other.qualificationCertificateNo != null)
				return false;
		} else if (!qualificationCertificateNo.equals(other.qualificationCertificateNo))
			return false;
		if (qualificationCertificateType == null) {
			if (other.qualificationCertificateType != null)
				return false;
		} else if (!qualificationCertificateType.equals(other.qualificationCertificateType))
			return false;
		if (regulator == null) {
			if (other.regulator != null)
				return false;
		} else if (!regulator.equals(other.regulator))
			return false;
		if (regulatorTel == null) {
			if (other.regulatorTel != null)
				return false;
		} else if (!regulatorTel.equals(other.regulatorTel))
			return false;
		if (supercargoName == null) {
			if (other.supercargoName != null)
				return false;
		} else if (!supercargoName.equals(other.supercargoName))
			return false;
		if (tel == null) {
			if (other.tel != null)
				return false;
		} else if (!tel.equals(other.tel))
			return false;
		if (validDate == null) {
			if (other.validDate != null)
				return false;
		} else if (!validDate.equals(other.validDate))
			return false;
		if (vehicle == null) {
			if (other.vehicle != null)
				return false;
		} else if (!vehicle.equals(other.vehicle))
			return false;
		return true;
	}
	
	

}
