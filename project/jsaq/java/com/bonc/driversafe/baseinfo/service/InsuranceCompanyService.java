package com.bonc.driversafe.baseinfo.service;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.InsuranceCompany;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface InsuranceCompanyService extends CRUDService<InsuranceCompany> {

	public abstract List search();
	
	public void deleteByIds(Long[] ids);

	public List<Map> getTree();

	public List<Map> getTree(Long id);

	public abstract void importExcel(MultipartFile file) throws Exception;

	public abstract void exportExcel();

}
