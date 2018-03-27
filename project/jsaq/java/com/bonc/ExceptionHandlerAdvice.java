/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bonc;

import com.bonc.common.domain.ResultMessage;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 统一处理异常返回
 * @author song
 */
@ControllerAdvice
@ResponseBody
public class ExceptionHandlerAdvice {

    @ExceptionHandler(Exception.class)
    public ResultMessage handleException(Exception e) {
        e.printStackTrace();
        ResultMessage result = new ResultMessage();
        result.setSuccess(false);
        result.setMsg("内部异常："+e.getLocalizedMessage());
        
        return result;
    }

}
