package com.bonc.driversafe.baseinfo.service;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.TransCompany;

public interface TransCompanyService extends CRUDService<TransCompany> {
	void batchDel(Long[] ids);

	List<Map<String, Object>> getTree();

	List<Map<String, Object>> getTree(long tid);
	
	void export (ServletOutputStream outputStream,TransCompany tc);

	List<TransCompany> findByCondition(TransCompany tc);
}
