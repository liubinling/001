package com.bonc.driversafe.baseinfo.service;

import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import com.bonc.common.CRUDService;
import com.bonc.driversafe.baseinfo.domain.Area;

public interface AreaService extends CRUDService<Area>{
		
	void delBatchByIds(String[] ids);
	
	void importExcel (MultipartFile file) throws Exception ;
	
	FileOutputStream exportExcel (ServletOutputStream outputStream);
	
	List<Map<String,Object>> getTree ();
	
	List<Map<String,Object>> getTree (long tid);
	
	FileOutputStream getModel(ServletOutputStream outputStream);
}
