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
import com.bonc.driversafe.baseinfo.domain.TransCompany;
import com.bonc.driversafe.baseinfo.service.TransCompanyService;

@RestController
@RequestMapping("/api/v1.0/transFirm")
public class TransCompanyController implements CRUDController<TransCompany> {

	@Autowired
	private TransCompanyService transCompanyService;

	/**
	 * 新增
	 */
	@Override
	@RequestMapping(method = RequestMethod.POST)
	public ResultMessage post(TransCompany tc) {
		ResultMessage result = new ResultMessage();
		transCompanyService.create(tc);
		result.setSuccess(true);
		result.setMsg("运输公司信息新增成功！");
		return result;
	}

	/**
	 * 修改运输公司信息
	 * 
	 */
	@Override
	@RequestMapping(method = RequestMethod.PUT)
	public ResultMessage put(TransCompany tc) {
		ResultMessage result = new ResultMessage();
		transCompanyService.update(tc);
		result.setSuccess(true);
		result.setMsg("运输公司信息修改成功！");
		return result;
	}

	/**
	 * 主键删除
	 */
	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResultMessage delete(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		transCompanyService.delete(id);
		result.setSuccess(true);
		result.setMsg("运输公司信息删除成功！");
		return result;
	}

	/**
	 * 主键查询
	 */
	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResultMessage getOne(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		TransCompany transCompany = null;
		transCompany = transCompanyService.read(id);
		result.setSuccess(true);
		result.setMsg("运输公司信息查询成功！");
		result.setResult(transCompany);
		return result;
	}

	/**
	 * 查询所有
	 */
	@Override
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public ResultMessage getAll() {
		ResultMessage result = new ResultMessage();
		List<TransCompany> list = null;
		list = transCompanyService.findAll();
		result.setSuccess(true);
		result.setMsg("运输公司信息查询成功！");
		result.setResult(list);
		return result;
	}

	/**
	 * 批量删除
	 */
	@Override
	@RequestMapping(method = RequestMethod.DELETE)
	public ResultMessage batchDelete(Long[] ids) {
		ResultMessage result = new ResultMessage();
		transCompanyService.batchDel(ids);
		result.setSuccess(true);
		result.setMsg("运输公司信息删除成功！");
		return result;
	}

	/**
	 * 分页查询，支持模糊查询
	 */
	@SuppressWarnings("unchecked")
	@Override
	@RequestMapping(method = RequestMethod.GET)
	public ResultMessage getPage(TransCompany obj, PageContent pageContent) {
		ResultMessage result = new ResultMessage();
		Map<String, Object> map = null;
		map = transCompanyService.findByCondition(obj, pageContent);
		result.setSuccess(true);
		result.setMsg("运输公司信息查询成功！");
		result.setResult(map);
		return result;
	}

	/**
	 * 查询根节点
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getTree", method = RequestMethod.GET)
	public List<Map<String, Object>> getTree() {
		return transCompanyService.getTree();
	}

	/**
	 * 查询根节点下的子节点
	 * 
	 * @param tid
	 * @return
	 */
	@RequestMapping(value = "/getTree/{tid}", method = RequestMethod.GET)
	public List<Map<String, Object>> getTree(@PathVariable("tid") long tid) {
		return transCompanyService.getTree(tid);
	}
	
	/**
	 * 导出系统中的所有运输公司信息为.xlsx文件
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public ResultMessage exportExcel(HttpServletResponse res) throws Exception {
		ResultMessage result = new ResultMessage();
		ServletOutputStream outputStream = res.getOutputStream();
		res.setContentType("application/x-msdownload");
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HH-mm");
		String downFileName = "运输公司信息全部数据" + sdf.format(new Date()) + ".xlsx";
		String inlineType = "attachment"; // 是否内联附件
		res.setHeader("Content-Disposition",
				inlineType + ";filename=\"" + new String(downFileName.getBytes(), "ISO8859-1") + "\"");
		transCompanyService.export(outputStream);
		result.setSuccess(true);
		result.setMsg("地域信息导出成功！");
		return result;
	}
}
