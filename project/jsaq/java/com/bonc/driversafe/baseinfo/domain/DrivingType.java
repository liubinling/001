package com.bonc.driversafe.baseinfo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 准驾车型
 */
@Entity
public class DrivingType {

	/**
	 * 准驾车型id
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;

	/**
	 * 准驾车型名称
	 */
	@Column
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	

}
