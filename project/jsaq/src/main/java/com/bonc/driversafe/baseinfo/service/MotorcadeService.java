package com.bonc.driversafe.baseinfo.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.bonc.common.CRUDService;
import com.bonc.common.PageContent;
import com.bonc.driversafe.baseinfo.domain.Motorcade;

public interface MotorcadeService extends CRUDService<Motorcade> {

	void exportExcel(HttpServletResponse response, Motorcade motorcade);
	
    List<Map<String,Object>> getTree();
	
	List<Map<String,Object>> getTree(long tid);
}
