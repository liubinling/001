package com.bonc.driversafe.baseinfo.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * 地域信息实体类
 * @author Administrator
 *
 */
@Entity
public class Area implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column
	private String areaName;//地域名称
	@Column
	private String number;//地域编号
	@ManyToOne
	private AreaType type;//地域类型
	@ManyToOne
	private Area fatherArea;//父级地域
	
	
	public Area getFatherArea() {
		return fatherArea;
	}
	public void setFatherArea(Area fatherArea) {
		this.fatherArea = fatherArea;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}

	public AreaType getType() {
		return type;
	}
	public void setType(AreaType type) {
		this.type = type;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "Area [id=" + id + ", areaName=" + areaName + ", number=" + number + ", type=" + type + ", fatherArea="
				+ fatherArea + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((areaName == null) ? 0 : areaName.hashCode());
		result = prime * result + ((fatherArea == null) ? 0 : fatherArea.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((number == null) ? 0 : number.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
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
		Area other = (Area) obj;
		if (areaName == null) {
			if (other.areaName != null)
				return false;
		} else if (!areaName.equals(other.areaName))
			return false;
		if (fatherArea == null) {
			if (other.fatherArea != null)
				return false;
		} else if (!fatherArea.equals(other.fatherArea))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (number == null) {
			if (other.number != null)
				return false;
		} else if (!number.equals(other.number))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		return true;
	}
	
}
