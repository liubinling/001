package com.bonc.driversafe.baseinfo.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Motorcade implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column
	private String motorcadeName;
	@ManyToOne
	private TransCompany transCompany;
	@ManyToOne
	private TerminalCompany TerminalCompany;
	@Column
	private String businessLicense;
	@Column
	private String businessLicenseNo;
	@ManyToOne
	private BusinussType businessType;
	@ManyToOne
	private Area area;
	@Column
	private String contact;
	@Column
	private String tel;
	@Column
	private String note;
	@ManyToOne
	private InsuranceCompany insuranceCompany;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMotorcadeName() {
		return motorcadeName;
	}

	public void setMotorcadeName(String motorcadeName) {
		this.motorcadeName = motorcadeName;
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


	public TransCompany getTransCompany() {
		return transCompany;
	}

	public void setTransCompany(TransCompany transCompany) {
		this.transCompany = transCompany;
	}

	public TerminalCompany getTerminalCompany() {
		return TerminalCompany;
	}

	public void setTerminalCompany(TerminalCompany terminalCompany) {
		TerminalCompany = terminalCompany;
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

	public InsuranceCompany getInsuranceCompany() {
		return insuranceCompany;
	}

	public void setInsuranceCompany(InsuranceCompany insuranceCompany) {
		this.insuranceCompany = insuranceCompany;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((TerminalCompany == null) ? 0 : TerminalCompany.hashCode());
		result = prime * result + ((area == null) ? 0 : area.hashCode());
		result = prime * result + ((businessLicense == null) ? 0 : businessLicense.hashCode());
		result = prime * result + ((businessLicenseNo == null) ? 0 : businessLicenseNo.hashCode());
		result = prime * result + ((businessType == null) ? 0 : businessType.hashCode());
		result = prime * result + ((contact == null) ? 0 : contact.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((insuranceCompany == null) ? 0 : insuranceCompany.hashCode());
		result = prime * result + ((motorcadeName == null) ? 0 : motorcadeName.hashCode());
		result = prime * result + ((note == null) ? 0 : note.hashCode());
		result = prime * result + ((tel == null) ? 0 : tel.hashCode());
		result = prime * result + ((transCompany == null) ? 0 : transCompany.hashCode());
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
		Motorcade other = (Motorcade) obj;
		if (TerminalCompany == null) {
			if (other.TerminalCompany != null)
				return false;
		} else if (!TerminalCompany.equals(other.TerminalCompany))
			return false;
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
		if (motorcadeName == null) {
			if (other.motorcadeName != null)
				return false;
		} else if (!motorcadeName.equals(other.motorcadeName))
			return false;
		if (note == null) {
			if (other.note != null)
				return false;
		} else if (!note.equals(other.note))
			return false;
		if (tel == null) {
			if (other.tel != null)
				return false;
		} else if (!tel.equals(other.tel))
			return false;
		if (transCompany == null) {
			if (other.transCompany != null)
				return false;
		} else if (!transCompany.equals(other.transCompany))
			return false;
		return true;
	}

}
