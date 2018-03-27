package com.bonc.driversafe.baseinfo.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.driversafe.baseinfo.domain.Vehicle;
import com.bonc.driversafe.baseinfo.service.VehicleService;

@RestController
@RequestMapping("/api/v1.0/vehicle")
public class VehicleController implements CRUDController<Vehicle> {

	@Autowired
	private VehicleService vehicleService;
	
	/**
	 * 新增
	 */
	@Override
	@RequestMapping(method = RequestMethod.POST)
	public ResultMessage post(Vehicle obj) {
		ResultMessage result = new ResultMessage();
		vehicleService.create(obj);
		result.setMsg("车辆信息路录入成功");
		result.setSuccess(true);
		return result;
	}

	/**
	 * 修改
	 */
	@Override
	@RequestMapping(method = RequestMethod.PUT)
	public ResultMessage put(Vehicle obj) {
		ResultMessage result = new ResultMessage();
		vehicleService.update(obj);
		result.setMsg("车辆信息修改成功");
		result.setSuccess(true);
		return result;
	}

	/**
	 * 主键删除
	 */
	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResultMessage delete(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		vehicleService.delete(id);
		result.setMsg("车辆信息路删除成功");
		result.setSuccess(true);
		return result;
	}

	/**
	 * 主键查询
	 */
	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResultMessage getOne(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		Vehicle vehicle = vehicleService.read(id);
		result.setMsg("车辆信息查询成功");
		result.setSuccess(true);
		result.setResult(vehicle);
		return result;
	}

	/**
	 * 查询所有
	 */
	@Override
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public ResultMessage getAll() {
		ResultMessage result = new ResultMessage();
		List<Vehicle> list = vehicleService.findAll();
		result.setMsg("车辆信息查询成功");
		result.setSuccess(true);
		result.setResult(list);
		return result;
	}

	@Override
	public ResultMessage batchDelete(Long[] ids) {
		
		return null;
	}

	/**
	 * 条件查询
	 */
	@Override
	@RequestMapping(method = RequestMethod.GET)
	public ResultMessage getPage(Vehicle obj, PageContent pageContent) {
		ResultMessage result = new ResultMessage();
		Map map = vehicleService.findByCondition(obj, pageContent);
		result.setMsg("车辆信息查询成功");
		result.setSuccess(true);
		result.setResult(map);
		return result;
	}
	/**
	 * 导出系统中的所有车辆信息为.xlsx文件
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public ResultMessage exportExcel(HttpServletResponse res) throws Exception {
		ResultMessage result = new ResultMessage();
		ServletOutputStream outputStream = res.getOutputStream();//获取响应流
		res.setContentType("application/x-msdownload");
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HH-mm");
		String downFileName = "车辆信息全部数据" + sdf.format(new Date()) + ".xlsx";
		String inlineType = "attachment"; // 是否内联附件
		res.setHeader("Content-Disposition",
				inlineType + ";filename=\"" + new String(downFileName.getBytes(), "ISO8859-1") + "\"");
		vehicleService.exportExcel(outputStream);
		result.setSuccess(true);
		result.setMsg("地域信息导出成功！");
		return result;
	}

}
