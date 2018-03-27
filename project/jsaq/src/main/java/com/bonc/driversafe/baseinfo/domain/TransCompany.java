package com.bonc.driversafe.baseinfo.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * 运输公司实体类
 * @author Administrator
 *
 */
@Entity
public class TransCompany implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(nullable=false)
	private String transCompanyName;//运输公司名称
	@ManyToOne
	private TransCompanyType transType;//运输公司类型
	@ManyToOne
	@JsonBackReference
	private TransCompany superDepartment;//上级部门
	@ManyToOne
	private TerminalCompany terminalCompany;//所属业户
	@Column
	private String businessLicense;//经营许可证字
	@Column
	private String businessLicenseNo;//经营许可证号
	@ManyToOne
	private BusinussType businessType;//经营类型
	@ManyToOne
	private Area area;
	@Column
	private String contact;//联系人
	@Column
	private String tel;//联系人电话
	@Column
	private String note;//备注
	@ManyToOne
	private InsuranceCompany insuranceCompany;//保险公司
	
	public String getTransCompanyName() {
		return transCompanyName;
	}
	public void setTransCompanyName(String transCompanyName) {
		this.transCompanyName = transCompanyName;
	}
	public TransCompanyType getTransType() {
		return transType;
	}
	public void setTransType(TransCompanyType transType) {
		this.transType = transType;
	}
	public TransCompany getSuperDepartment() {
		return superDepartment;
	}
	public void setSuperDepartment(TransCompany superDepartment) {
		this.superDepartment = superDepartment;
	}
	
	
	public TerminalCompany getTerminalCompany() {
		return terminalCompany;
	}
	public void setTerminalCompany(TerminalCompany terminalCompany) {
		this.terminalCompany = terminalCompany;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getBusinessLicense() {
		return businessLicense;
	}
	public void setBusinessLicense(String businessLicense) {
		this.businessLicense = businessLicense;
	}
	public String getBusinessLicenseNo() {
		return businessLicenseNo;
	}
	public void setBusinessLicenseNo(String businessLicenseNo) {
		this.businessLicenseNo = businessLicenseNo;
	}
	public BusinussType getBusinessType() {
		return businessType;
	}
	public void setBusinessType(BusinussType businessType) {
		this.businessType = businessType;
	}
	public Area getArea() {
		return area;
	}
	public void setArea(Area area) {
		this.area = area;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public InsuranceCompany getInsuranceCompany() {
		return insuranceCompany;
	}
	public void setInsuranceCompany(InsuranceCompany insuranceCompany) {
		this.insuranceCompany = insuranceCompany;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((area == null) ? 0 : area.hashCode());
		result = prime * result + ((businessLicense == null) ? 0 : businessLicense.hashCode());
		result = prime * result + ((businessLicenseNo == null) ? 0 : businessLicenseNo.hashCode());
		result = prime * result + ((businessType == null) ? 0 : businessType.hashCode());
		result = prime * result + ((contact == null) ? 0 : contact.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((insuranceCompany == null) ? 0 : insuranceCompany.hashCode());
		result = prime * result + ((note == null) ? 0 : note.hashCode());
		result = prime * result + ((superDepartment == null) ? 0 : superDepartment.hashCode());
		result = prime * result + ((tel == null) ? 0 : tel.hashCode());
		result = prime * result + ((terminalCompany == null) ? 0 : terminalCompany.hashCode());
		result = prime * result + ((transCompanyName == null) ? 0 : transCompanyName.hashCode());
		result = prime * result + ((transType == null) ? 0 : transType.hashCode());
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
		TransCompany other = (TransCompany) obj;
		if (area == null) {
			if (other.area != null)
				return false;
		} else if (!area.equals(other.area))
			return false;
		if (businessLicense == null) {
			if (other.businessLicense != null)
				return false;
		} else if (!businessLicense.equals(other.businessLicense))
			return false;
		if (businessLicenseNo == null) {
			if (other.businessLicenseNo != null)
				return false;
		} else if (!businessLicenseNo.equals(other.businessLicenseNo))
			return false;
		if (businessType == null) {
			if (other.businessType != null)
				return false;
		} else if (!businessType.equals(other.businessType))
			return false;
		if (contact == null) {
			if (other.contact != null)
				return false;
		} else if (!contact.equals(other.contact))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (insuranceCompany == null) {
			if (other.insuranceCompany != null)
				return false;
		} else if (!insuranceCompany.equals(other.insuranceCompany))
			return false;
		if (note == null) {
			if (other.note != null)
				return false;
		} else if (!note.equals(other.note))
			return false;
		if (superDepartment == null) {
			if (other.superDepartment != null)
				return false;
		} else if (!superDepartment.equals(other.superDepartment))
			return false;
		if (tel == null) {
			if (other.tel != null)
				return false;
		} else if (!tel.equals(other.tel))
			return false;
		if (terminalCompany == null) {
			if (other.terminalCompany != null)
				return false;
		} else if (!terminalCompany.equals(other.terminalCompany))
			return false;
		if (transCompanyName == null) {
			if (other.transCompanyName != null)
				return false;
		} else if (!transCompanyName.equals(other.transCompanyName))
			return false;
		if (transType == null) {
			if (other.transType != null)
				return false;
		} else if (!transType.equals(other.transType))
			return false;
		return true;
	}
	
}   
