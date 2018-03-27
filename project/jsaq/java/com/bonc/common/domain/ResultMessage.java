package com.bonc.common.domain;

import java.io.Serializable;

/**
 * 返回消息对象
 */
public class ResultMessage   implements Serializable {

	/**
	 * 成功失败标志
	 */
	private boolean success;

	/**
	 * 提示信息
	 */
	private String msg;

	/**
	 * 返回业务结果对象
	 */
	private Object result;

    /**
     * @return the success
     */
    public boolean isSuccess() {
        return success;
    }

    /**
     * @param success the success to set
     */
    public void setSuccess(boolean success) {
        this.success = success;
    }

    /**
     * @return the msg
     */
    public String getMsg() {
        return msg;
    }

    /**
     * @param msg the msg to set
     */
    public void setMsg(String msg) {
        this.msg = msg;
    }

    /**
     * @return the result
     */
    public Object getResult() {
        return result;
    }

    /**
     * @param result the result to set
     */
    public void setResult(Object result) {
        this.result = result;
    }

}
