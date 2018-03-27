package com.bonc.driversafe.baseinfo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TerminalCompany {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column
	private String terminalCompanyName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTerminalCompanyName() {
		return terminalCompanyName;
	}

	public void setTerminalCompanyName(String terminalCompanyName) {
		this.terminalCompanyName = terminalCompanyName;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((terminalCompanyName == null) ? 0 : terminalCompanyName.hashCode());
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
		TerminalCompany other = (TerminalCompany) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (terminalCompanyName == null) {
			if (other.terminalCompanyName != null)
				return false;
		} else if (!terminalCompanyName.equals(other.terminalCompanyName))
			return false;
		return true;
	}
	
	
}
