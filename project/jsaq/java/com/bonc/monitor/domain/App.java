package com.bonc.monitor.domain;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * 应用
 */
@Entity
public class App  implements Serializable{
    
     private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	/**
	 * 应用名称
	 */
    @Column
	private String name;

	/**
	 * 访问路径
	 */
    @Column
	private String path;

	/**
	 * 版本
	 */
    @Column
	private String version;

	/**
	 * 描述
	 */
    @Column
	private String descr;
@ManyToOne
	private Tomcat tomcat;

}
