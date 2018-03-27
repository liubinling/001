package com.bonc.driversafe.baseinfo.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

/**
 * 运输公司类型实体类
 * @author Administrator
 *
 */
@Entity
public class TransCompanyType implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(nullable=false)
	private String transCompanyTypeName;//运输公司类型名称
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTransCompanyTypeName() {
		return transCompanyTypeName;
	}
	public void setTransCompanyTypeName(String transCompanyTypeName) {
		this.transCompanyTypeName = transCompanyTypeName;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((transCompanyTypeName == null) ? 0 : transCompanyTypeName.hashCode());
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
		TransCompanyType other = (TransCompanyType) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (transCompanyTypeName == null) {
			if (other.transCompanyTypeName != null)
				return false;
		} else if (!transCompanyTypeName.equals(other.transCompanyTypeName))
			return false;
		return true;
	}
	
}   
