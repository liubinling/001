package com.bonc.driversafe.baseinfo.service.impl;

import com.bonc.driversafe.baseinfo.service.InsuranceCompanyService;
import com.bonc.common.PageContent;
import com.bonc.driversafe.baseinfo.dao.InsuranceCompanyDao;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.InsuranceCompany;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class InsuranceCompanyServiceImpl implements InsuranceCompanyService {

	@Autowired
	private InsuranceCompanyDao insuranceCompanyDao;

	public List search() {
		return null;
	}

	@Override
	public void create(InsuranceCompany insuranceCompany) {
		System.out.println("impl" + insuranceCompany);
		insuranceCompanyDao.save(insuranceCompany);
	}

	@Override
	public InsuranceCompany read(long id) {
		InsuranceCompany inc = insuranceCompanyDao.findOne(id);
		return inc;
	}

	@Override
	public void update(InsuranceCompany insuranceCompany) {
		insuranceCompanyDao.saveAndFlush(insuranceCompany);
	}

	@Override
	public void delete(long id) {
		insuranceCompanyDao.delete(id);
	}

	@Override
	public List findAll() {
		List<InsuranceCompany> inc = insuranceCompanyDao.findAll();
		return inc;
	}

	@Override
	public Map findByCondition(final InsuranceCompany insuranceCompany, PageContent page) {
		
		Map<String, Object> map = new HashMap<>();
		Specification<InsuranceCompany> querySpecifi = new Specification<InsuranceCompany>() {
			@Override
			public Predicate toPredicate(Root<InsuranceCompany> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				// SysConfig sysConfig = (SysConfig) obj;
				if (insuranceCompany.getName() != null && !"".equals(insuranceCompany.getName())) {
					predicates.add(cb.like(root.get("name").as(String.class), "%" + insuranceCompany.getName() + "%"));
				}
				/*if (insuranceCompany.getParentId() != null && !"".equals(insuranceCompany.getName())) {
					predicates.add(cb.like(root.get("parentId").as(String.class), insuranceCompany.getParentId()));
				}*/
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		Sort sort = null;
		String order = page.getOrder();
		String page1 = page.getPage();
		String sort1 = page.getSort();
		String rows1 = page.getRows();

		// 对空值作处理
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

		Page<InsuranceCompany> list = insuranceCompanyDao.findAll(querySpecifi, pageable);

		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		/*
		 * result = new ResultMessage(); result.setSuccess(true);
		 * result.setMsg("操作成功！"); result.setResult(map);
		 */
		return map;
	}

	@Override
	public void deleteByIds(Long[] ids) {
		for(Long id : ids) {
			insuranceCompanyDao.delete(id);
		}
		
	}

	@Override
	public List<Map> getTree() {
		List<InsuranceCompany> insuranceCompanys = insuranceCompanyDao.findAll();
		List<Map> list = new ArrayList<>();
		for (InsuranceCompany insuranceCompany : insuranceCompanys) {
			if(null == insuranceCompany.getParent()) {
				Map<String, Object> map1 = new HashMap<>();
				Map<String, Object> map2 = new HashMap<>();
				map1.put("name", insuranceCompany.getName());
				map2.put("tid", insuranceCompany.getId());
				map1.put("data", map2);
				list.add(map1);
			}
		}
		return list;
	}

	@Override
	public List<Map> getTree(Long id) {
		//List<InsuranceCompany> insuranceCompanys = insuranceCompanyDao.getTree(id.toString());
		List<InsuranceCompany> insuranceCompanys = insuranceCompanyDao.findByParent_Id(id);
		Date time1 = new Date();
		//List<InsuranceCompany> insuranceCompanys = insuranceCompanyDao.findAll();
		//System.out.println(insuranceCompanys.get(0).toString());
		List<Map> list = new ArrayList<>();
		for (InsuranceCompany insuranceCompany : insuranceCompanys) {
			InsuranceCompany parent = insuranceCompany.getParent();
			//if( null != parent && id == insuranceCompany.getParent().getId()) {
				Map<String, Object> map1 = new HashMap<>();
				map1.put("name", insuranceCompany.getName());
				map1.put("tid", insuranceCompany.getId());
				list.add(map1);	
			//}
		}
		Date time2 = new Date();
		System.out.println(time2.getTime() - time1.getTime());
		return list;
	}

	@Override
	public void importExcel(MultipartFile file) throws Exception {
		Workbook work;
		Sheet sheet = null;
		InputStream inputStream = file.getInputStream();// 获取文件流
		if (file != null) {
			// 文件不为空后根据后缀名创建不同的解析对象
			if (file.getOriginalFilename().endsWith(".xlsx")) {
				work = new XSSFWorkbook(inputStream);
				sheet = work.getSheetAt(0);
			} else if (file.getOriginalFilename().endsWith(".xls")) {
				work = new HSSFWorkbook(inputStream);
				sheet = work.getSheetAt(0);
			} else {
				throw new RuntimeException();
			}
			// 遍历获取每一行
			for (Row row : sheet) {
				if (row.getRowNum() == 0) {
					// 第一行不取
					continue;
				}
				if (row.getCell(0) == null) {
					// 到这表示表里已经没有数据了
					return;
				}
				InsuranceCompany insuranceCompany = new InsuranceCompany();
				insuranceCompany.setLocation(row.getCell(0).toString());
				insuranceCompany.setName(row.getCell(1).toString());
				insuranceCompany.setParent(insuranceCompanyDao.findOne(Long.parseLong(row.getCell(2).toString())));
				insuranceCompany.setTel(row.getCell(3).toString());
				insuranceCompanyDao.saveAndFlush(insuranceCompany);
			}
		}
		
	}

	@Override
	public void exportExcel() {
		// TODO Auto-generated method stub
		
	}

}
