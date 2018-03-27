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
import org.springframework.web.multipart.MultipartFile;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.service.AreaService;

/***
 * 地域信息操作控制類
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/v1.0/area")
public class AreaController implements CRUDController<Area> {

	@Autowired
	private AreaService areaService;

	/**
	 * 新增地域信息
	 */
	@Override
	@RequestMapping(method = RequestMethod.POST)
	public ResultMessage post(Area area) {
		System.out.println(area.toString());
		ResultMessage result = new ResultMessage();
		areaService.create(area);
		result.setSuccess(true);
		result.setMsg("地域信息新增成功！");
		return result;
	}

	/**
	 * 修改地域信息
	 */
	@Override
	@RequestMapping(method = RequestMethod.PUT)
	public ResultMessage put(Area area) {
		ResultMessage result = new ResultMessage();
		areaService.update(area);
		result.setSuccess(true);
		result.setMsg("地域信息修改成功！");
		return result;
	}

	/**
	 * 根據主鍵刪除地域信息
	 */
	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResultMessage delete(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		areaService.delete(id);
		result.setSuccess(true);
		result.setMsg("地域信息删除成功！");
		return result;
	}

	/**
	 * 根據主鍵查詢地域信息
	 */
	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResultMessage getOne(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		Area area = areaService.read(id);
		result.setSuccess(true);
		result.setMsg("地域信息查询成功！");
		result.setResult(area);
		return result;
	}

	/**
	 * 查詢所有的地域信息
	 */
	@Override
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public ResultMessage getAll() {
		ResultMessage result = new ResultMessage();
		List<Area> areaList = areaService.findAll();
		result.setSuccess(true);
		result.setMsg("地域信息查询成功！");
		result.setResult(areaList);
		return result;
	}

	/**
	 * 批量删除
	 * 
	 * @param ids
	 * @return ResultMessage
	 */
	@RequestMapping(method = RequestMethod.DELETE)
	public ResultMessage batchDelete(String[] ids) {
		ResultMessage result = new ResultMessage();
		areaService.delBatchByIds(ids);
		result.setSuccess(true);
		result.setMsg("地域信息删除成功！");
		return result;
	}

	/**
	 * 根据地域名称模糊查询
	 * 
	 * @param area
	 * @param page
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET)
	@Override
	public ResultMessage getPage(Area area, PageContent pageContent) {
		ResultMessage result = new ResultMessage();
		Map<String, Object> map = null;
		map = areaService.findByCondition(area, pageContent);
		result.setSuccess(true);
		result.setMsg("地域信息查询成功！");
		result.setResult(map);
		return result;
	}

	/**
	 * 导入Excel文件数据接口
	 * 
	 * @param file
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/import", method = RequestMethod.POST)
	public ResultMessage importExcel(MultipartFile file) throws Exception {
		ResultMessage result = new ResultMessage();
		areaService.importExcel(file);
		result.setSuccess(true);
		result.setMsg("地域信息导入成功！");
		return result;
	}

	/**
	 * 导出系统中的所有地域信息为.xlsx文件
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
		String downFileName = "地域信息全部数据" + sdf.format(new Date()) + ".xlsx";
		String inlineType = "attachment"; // 是否内联附件
		res.setHeader("Content-Disposition",
				inlineType + ";filename=\"" + new String(downFileName.getBytes(), "ISO8859-1") + "\"");
		areaService.exportExcel(outputStream);
		result.setSuccess(true);
		result.setMsg("地域信息导出成功！");
		return result;
	}
	/**
	 * 导出系统中的所有地域信息为.xlsx文件
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/model", method = RequestMethod.GET)
	public ResultMessage getModel(HttpServletResponse res) throws Exception {
		ResultMessage result = new ResultMessage();
		ServletOutputStream outputStream = res.getOutputStream();
		res.setContentType("application/x-msdownload");
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HH-mm");
		String downFileName = "地域信息模板" + sdf.format(new Date()) + ".xlsx";
		String inlineType = "attachment"; // 是否内联附件
		res.setHeader("Content-Disposition",
				inlineType + ";filename=\"" + new String(downFileName.getBytes(), "ISO8859-1") + "\"");
		areaService.getModel(outputStream);
		result.setSuccess(true);
		result.setMsg("地域信息导出成功！");
		return result;
	}

	/**
	 * 查询根节点
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getTree", method = RequestMethod.GET)
	public List<Map<String, Object>> getTree() {
		return areaService.getTree();
	}

	/**
	 * 查询根节点下的子节点
	 * 
	 * @param tid
	 * @return
	 */
	@RequestMapping(value = "/getTree/{tid}", method = RequestMethod.GET)
	public List<Map<String, Object>> getTree(@PathVariable("tid") long tid) {
		return areaService.getTree(tid);
	}

	/**
	 * NO USE
	 */
	@RequestMapping(value = "/aaaaaa", method = RequestMethod.GET)
	@Override
	public ResultMessage batchDelete(Long[] ids) {
		return null;
	}

}
