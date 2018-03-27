package com.bonc.driversafe.baseinfo.service;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;

import org.springframework.web.multipart.MultipartFile;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.Area;

public interface AreaService extends CRUDService<Area>{
		
	void delBatchByIds(Long[] ids);
	
	void importExcel (MultipartFile file) throws Exception ;
	
	void exportExcel (ServletOutputStream outputStream,Area area);
	
	List<Map<String,Object>> getTree ();
	
	List<Map<String,Object>> getTree (long tid);
	
	void getModel(ServletOutputStream outputStream);
	
	List<Area> findByCondition(final Area area);
	
	List<Map<String,Object>> getFatherTree (long tid);
	
}
