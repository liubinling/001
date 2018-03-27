package com.bonc.driversafe.baseinfo.service.impl;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.common.domain.SysConfig;
import com.bonc.driversafe.baseinfo.dao.MotorcadeDao;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.Motorcade;
import com.bonc.driversafe.baseinfo.service.MotorcadeService;

@Service
@Transactional
public class MotorcadeServiceImpl implements MotorcadeService {
	
	@Autowired
	private MotorcadeDao motorcadeDao;
	
	@Override
	public void create(Motorcade motorcade) {
		motorcadeDao.save(motorcade);
	}
	
	@Override
	public void update(Motorcade motorcade) {
		motorcadeDao.saveAndFlush(motorcade);
	}

	@Override
	public Motorcade read(long id) {
		Motorcade motorcade = motorcadeDao.findOne(id);
		return motorcade;
	}
	
	@Override
	public void delete(long id) {
		motorcadeDao.delete(id);
	}
	
	@Override
	public List<Motorcade> findAll() {
		List<Motorcade> motorcadeList = motorcadeDao.findAll();
		return motorcadeList;
	}
	
	@Override
	public Map<String, Object> findByCondition(final Motorcade motorcade, PageContent page) {
		ResultMessage result = null;

        Specification querySpecifi = new Specification<Motorcade>() {
            @Override
            public Predicate toPredicate(Root<Motorcade> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
            	List<Predicate> predicates = new ArrayList();
                if (motorcade.getMotorcadeName() != null && !"".equals(motorcade.getMotorcadeName())) {
            	    predicates.add(cb.like(root.get("motorcadeName").as(String.class), "%" + motorcade.getMotorcadeName() + "%"));
                }
                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };

        Sort sort = null;

        String order = page.getOrder();
        String page1 = page.getPage();
        String sort1 = page.getSort();
        String rows1 = page.getRows();

        //对空值作处理
        if (rows1 == null || rows1.equals("")) {
            rows1 = "10";
        }
        if (order == null || order.equals("")) {
            order = "asc";
        }
        if (page1 == null || page1.equals("")) {
            page1 = "1";
        }

        if (sort1 == null || sort1.equals("")) {
            sort1 = "id";
        }
        if (order.equals("asc")) {
            sort = new Sort(Sort.Direction.ASC, sort1);
        } else if (order.equals("desc")) {
            sort = new Sort(Sort.Direction.DESC, sort1);
        }
        int pageNum = Integer.parseInt(page1) - 1;
        int rows = Integer.parseInt(rows1);
        Pageable pageable = new PageRequest(pageNum, rows, sort);

        Page<Motorcade> list = motorcadeDao.findAll(querySpecifi, pageable);

        Map map = new HashMap();
        map.put("total", list.getTotalElements());//数据总数  
        map.put("rows", list.getContent());//分页应该显示的数据  
/*
        result = new ResultMessage();
        result.setSuccess(true);
        result.setMsg("操作成功！");
        result.setResult(map);
*/
        return map;
	}
	
	@Override
	public void exportExcel(HttpServletResponse response) {
		try {
			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet sheet = wb.createSheet("车队信息");
			HSSFRow row = sheet.createRow(0);
			HSSFCell cell = row.createCell(0);
			cell.setCellValue("车队信息一览表");
			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 11));
			HSSFRow row1 = sheet.createRow(1);
			row1.createCell(0).setCellValue("运输公司ID");
			row1.createCell(1).setCellValue("运输公司名称");
			row1.createCell(2).setCellValue("上级部门ID");
			row1.createCell(3).setCellValue("所属业户");
			row1.createCell(4).setCellValue("经营许可证字");
			row1.createCell(5).setCellValue("经营许可证号");
			row1.createCell(6).setCellValue("经营范围");
			row1.createCell(7).setCellValue("所属地区");
			row1.createCell(8).setCellValue("联系人");
			row1.createCell(9).setCellValue("联系人电话");
			row1.createCell(10).setCellValue("备注");
			row1.createCell(11).setCellValue("保险公司Id");
			
			List<Motorcade> motorcade = motorcadeDao.findAll();
			for (int i = 0; i < motorcade.size(); i++) {
				HSSFRow row2 = sheet.createRow(i + 2);
				row2.createCell(0).setCellValue(motorcade.get(i).getId());
				row2.createCell(1).setCellValue(motorcade.get(i).getMotorcadeName());
				if (motorcade.get(i).getTransCompany() != null) {
					row2.createCell(2).setCellValue(motorcade.get(i).getTransCompany().getTransCompanyName());
				}
				if (motorcade.get(i).getTerminalCompany() != null) {
					String string = "";
					for (int j = 0; j < motorcade.get(i).getTerminalCompany().size(); j++) {
						string = string + motorcade.get(i).getTerminalCompany().get(j).getTerminalCompanyName() + ", "; 
					}
					if (string != "") 
						string = string.substring(0, string.length() - 2);
					row2.createCell(3).setCellValue(string);
				}
				row2.createCell(4).setCellValue(motorcade.get(i).getBusinessLicense());
				row2.createCell(5).setCellValue(motorcade.get(i).getBusinessLicenseNo());
				if (motorcade.get(i).getBusinessType() != null) {
					row2.createCell(6).setCellValue(motorcade.get(i).getBusinessType().getName());
				}
				if (motorcade.get(i).getArea() != null) {
					row2.createCell(7).setCellValue(motorcade.get(i).getArea().getAreaName());
				}
				row2.createCell(8).setCellValue(motorcade.get(i).getContact());
				row2.createCell(9).setCellValue(motorcade.get(i).getTel());
				row2.createCell(10).setCellValue(motorcade.get(i).getNote());
				if (motorcade.get(i).getInsuranceCompany() != null) {
					row2.createCell(11).setCellValue(motorcade.get(i).getInsuranceCompany().getId());
				}
			}
			OutputStream output = response.getOutputStream();
		    response.reset();
		    response.setHeader("Content-disposition", "attachment; filename=details.xls");
		    response.setContentType("application/msexcel");        
		    wb.write(output);
		    output.close();
			/*FileOutputStream stream = null;
			stream = new FileOutputStream("D:\\" + System.currentTimeMillis() + ".xlsx");
			wb.write(stream);
			stream.flush();
			stream.close();*/
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public List<Map<String, Object>> getTree() {
		List<Motorcade> motorcades = motorcadeDao.findAll();
		boolean isLeaf = false;
		ArrayList<Map<String, Object>> list = new ArrayList<>();
		for (Motorcade motorcade : motorcades) {
			if (motorcade.getTransCompany() == null) {
				//根节点
				Map<String, Object> out = new HashMap<>();
				Map<String, Object> in = new HashMap<>();
				out.put("name", motorcade.getMotorcadeName());
				in.put("tid", motorcade.getId());
				out.put("data", in);
				out.put("isLeaf", isLeaf);
				list.add(out);
			}
		}
		return list;
		
	}
	
	@Override
	public List<Map<String, Object>> getTree(long tid) {
		List<Motorcade> motorcades = motorcadeDao.findAll();
		boolean isLeaf = true;
		ArrayList<Map<String, Object>> list = new ArrayList<>();
		for (Motorcade motorcade : motorcades) {
			if (motorcade.getTransCompany() != null && motorcade.getTransCompany().getId() == tid) {
				Map<String, Object> out = new HashMap<>();
				Map<String, Object> in = new HashMap<>();
				out.put("name", motorcade.getMotorcadeName());
				in.put("tid", motorcade.getId());
				out.put("data", in);
				out.put("isLeaf", isLeaf);
				list.add(out);
			}
		}
		return list;
		
	}

	/* @Override
	public void exportExcel(HttpServletResponse response) {
		// TODO Auto-generated method stub
		
	} */
}

