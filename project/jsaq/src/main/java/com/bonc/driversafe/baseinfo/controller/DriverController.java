
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
import com.bonc.driversafe.baseinfo.domain.Driver;
import com.bonc.driversafe.baseinfo.service.DriverService;

@RestController
@RequestMapping("/api/v1.0/driver")
public class DriverController implements CRUDController<Driver> {

	@Autowired
	private DriverService driverService;

	@Override
	@RequestMapping(method = RequestMethod.POST)
	public ResultMessage post(Driver obj) {
		ResultMessage result = new ResultMessage();
		driverService.create(obj);
		result.setMsg("驾驶员信息查询成功");
		result.setSuccess(true);
		return result;
	}

	/**
	 * 修改
	 */
	@Override
	@RequestMapping(method = RequestMethod.PUT)
	public ResultMessage put(Driver obj) {
		ResultMessage result = new ResultMessage();
		driverService.update(obj);
		result.setMsg("驾驶员信息修改成功");
		result.setSuccess(true);
		return result;
	}

	/**
	 * 删除
	 */
	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResultMessage delete(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		driverService.delete(id);
		result.setMsg("驾驶员信息删除成功");
		result.setSuccess(true);
		return result;
	}

	/**
	 * 根据主键查询
	 */
	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResultMessage getOne(@PathVariable long id) {
		Driver driver = driverService.read(id);
		ResultMessage result = new ResultMessage();
		result.setMsg("驾驶员信息查询成功");
		result.setSuccess(true);
		result.setResult(driver);
		return result;
	}

	/**
	 * 查询所有
	 */
	@Override
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public ResultMessage getAll() {
		ResultMessage result = new ResultMessage();
		List<Driver> list = driverService.findAll();
		result.setMsg("驾驶员信息查询成功");
		result.setSuccess(true);
		result.setResult(list);
		return result;
	}

	@Override
	@RequestMapping(method = RequestMethod.DELETE)
	public ResultMessage batchDelete(Long[] ids) {
		ResultMessage result = new ResultMessage();
		driverService.delBatchByIds(ids);
		result.setSuccess(true);
		result.setMsg("驾驶员信息删除成功！");
		return result;
	}

	/**
	 * 模糊分页查询
	 */
	@Override
	@RequestMapping(method = RequestMethod.GET)
	public ResultMessage getPage(Driver driver, PageContent pageContent) {
		ResultMessage result = new ResultMessage();
		Map map = driverService.findByCondition(driver, pageContent);
		result.setMsg("驾驶员信息查询成功");
		result.setSuccess(true);
		result.setResult(map);
		return result;
	}

	/**
	 * 导出系统中的所有驾驶员信息为.xlsx文件
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public ResultMessage exportExcel(HttpServletResponse res, Driver driver) throws Exception {
		ResultMessage result = new ResultMessage();
		ServletOutputStream outputStream = res.getOutputStream();// 获取响应流
		res.setContentType("application/x-msdownload");
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HH-mm");
		String downFileName = "驾驶员信息全部数据" + sdf.format(new Date()) + ".xlsx";
		String inlineType = "attachment"; // 是否内联附件
		res.setHeader("Content-Disposition",
				inlineType + ";filename=\"" + new String(downFileName.getBytes(), "ISO8859-1") + "\"");
		driverService.exportExcel(outputStream,driver);
		result.setSuccess(true);
		result.setMsg("地域信息导出成功！");
		return result;
	}

}
