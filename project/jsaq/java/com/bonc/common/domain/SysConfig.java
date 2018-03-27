package com.bonc.common.domain;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.hibernate.annotations.DynamicUpdate;

/**
 * 系统配置信息
 */
@Entity
@DynamicUpdate(true)
public class SysConfig implements Serializable{

    private static long serialVersionUID = 1L;

    /**
     * @return the serialVersionUID
     */
    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    /**
     * @param aSerialVersionUID the serialVersionUID to set
     */
    public static void setSerialVersionUID(long aSerialVersionUID) {
        serialVersionUID = aSerialVersionUID;
    }

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
     * 参数名
     */
    @Column
    private String pkey;

    /**
     * 参数值
     */
    @Column
    private String pvalue;

    /**
     * 说明
     */
    @Column
    private String pdescr;

    /**
     * @return the key
     */
    public String getPkey() {
        return pkey;
    }

    /**
     * @param key the key to set
     */
    public void setPkey(String pkey) {
        this.pkey = pkey;
    }

    /**
     * @return the value
     */
    public String getPvalue() {
        return pvalue;
    }

    /**
     * @param value the value to set
     */
    public void setPvalue(String pvalue) {
        this.pvalue = pvalue;
    }

    /**
     * @return the descr
     */
    public String getPdescr() {
        return pdescr;
    }

    /**
     * @param descr the descr to set
     */
    public void setPdescr(String pdescr) {
        this.pdescr = pdescr;
    }
    
   public SysConfig(){
       
   }
}
