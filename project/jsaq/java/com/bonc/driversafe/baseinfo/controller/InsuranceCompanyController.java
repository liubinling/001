package com.bonc.driversafe.baseinfo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.driversafe.baseinfo.domain.InsuranceCompany;
import com.bonc.driversafe.baseinfo.service.InsuranceCompanyService;
import com.bonc.driversafe.baseinfo.service.impl.InsuranceCompanyServiceImpl;

@RestController
@RequestMapping("/api/v1.0/insuranceCompany")
public class InsuranceCompanyController implements CRUDController <InsuranceCompany>{

	@Autowired
	private InsuranceCompanyService insuranceCompanyService;

	public ResultMessage search() {
		return null;
	}


	/**
	 * @see com.bonc.common.CRUDController#post(java.lang.Object)
	 * 新增
	 */
	@Override
	@RequestMapping(method = RequestMethod.POST)
	public ResultMessage post(InsuranceCompany insuranceCompany) {
		System.out.println("insuranceCompany:"+ insuranceCompany);
		ResultMessage result = new ResultMessage();
		insuranceCompanyService.create(insuranceCompany);
		System.out.println("result.msg" + result.getMsg());
		result.setSuccess(true);
		result.setMsg("保险公司信息录入成功！");
		return result;
	}

	/**
	 * @see com.bonc.common.CRUDController#delete(long)
	 */
	@Override
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public ResultMessage delete(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		insuranceCompanyService.delete(id);
		result.setSuccess(true);
		result.setMsg("保险公司信息删除成功！");
		return result;
	}


	/**
	 * @see com.bonc.common.CRUDController#getOne(long)
	 */
	@Override
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResultMessage getOne(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		insuranceCompanyService.read(id);
		result.setSuccess(true);
		result.setMsg("保险公司信息查询成功！");
		return result;
	}


	/**
	 * @see com.bonc.common.CRUDController#getAll()
	 */
	@Override
	@RequestMapping(value="/all",method = RequestMethod.GET)
	public ResultMessage getAll() {
		ResultMessage result = new ResultMessage();
		insuranceCompanyService.findAll();
		result.setSuccess(true);
		result.setMsg("保险公司信息查询成功！");
		return result;
	}


	@Override
	@RequestMapping(method = RequestMethod.PUT)
	public ResultMessage put(InsuranceCompany obj) {
		ResultMessage result = new ResultMessage();
		insuranceCompanyService.update(obj);
		result.setSuccess(true);
		result.setMsg("保险公司信息查询成功！");
		return result;
	}


	@Override
	@RequestMapping(method = RequestMethod.DELETE)
	public ResultMessage batchDelete(Long[] ids) {
		ResultMessage result = new ResultMessage();
		insuranceCompanyService.deleteByIds(ids);
		result.setSuccess(true);
		result.setMsg("保险公司信息查询成功！");
		return result;
	}


	@Override
	@RequestMapping(method = RequestMethod.GET)
	public ResultMessage getPage(InsuranceCompany insuranceCompany, PageContent pageContent) {
		ResultMessage result = new ResultMessage();
		Map<String, Object> map = null;
		map = insuranceCompanyService.findByCondition(insuranceCompany, pageContent);
		result.setSuccess(true);
		result.setMsg("保险公司信息查询成功！");
		result.setResult(map);
		return result;
	}
	
	@RequestMapping(value="/getTree",method = RequestMethod.GET)
	public ResultMessage getTree() {
		ResultMessage result = new ResultMessage();
		List<Map> list = insuranceCompanyService.getTree();
		
		result.setSuccess(true);
		result.setMsg("保险公司信息查询成功！");
		result.setResult(list);
		return result;
	}
	
	@RequestMapping(value="/getTree/{tid}",method = RequestMethod.GET)
	public ResultMessage getTreeById(@PathVariable Long tid) {
		ResultMessage result = new ResultMessage();
		List<Map> list  = insuranceCompanyService.getTree(tid);
		result.setSuccess(true);
		result.setMsg("保险公司信息查询成功！");
		result.setResult(list);
		return result;
	}
	
	/**
	 * 导入Excel文件数据接口
	 * @param file
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/import",method = RequestMethod.POST)
	public  ResultMessage importExcel(MultipartFile file) throws Exception {
		ResultMessage result = new ResultMessage();
		insuranceCompanyService.importExcel(file);
		result.setSuccess(true);
		result.setMsg("地域信息导入成功！");
		return result;
	}

	/**
	 * 导出系统中的所有地域信息为.xlsx文件
	 * @return
	 */
	@RequestMapping(value="/export",method = RequestMethod.GET)
	public ResultMessage exportExcel () {
		ResultMessage result = new ResultMessage();
		insuranceCompanyService.exportExcel();
		result.setSuccess(true);
		result.setMsg("地域信息导出成功！");
		return result;
	}

}
