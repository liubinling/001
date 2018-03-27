package com.bonc.driversafe.baseinfo.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.ServletOutputStream;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.bonc.common.PageContent;
import com.bonc.driversafe.baseinfo.dao.AreaDao;
import com.bonc.driversafe.baseinfo.dao.BusinussTypeDao;
import com.bonc.driversafe.baseinfo.dao.InsuranceCompanyDao;
import com.bonc.driversafe.baseinfo.dao.TransCompanyDao;
import com.bonc.driversafe.baseinfo.dao.TransCompanyTypeDao;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.BusinussType;
import com.bonc.driversafe.baseinfo.domain.Driver;
import com.bonc.driversafe.baseinfo.domain.InsuranceCompany;
import com.bonc.driversafe.baseinfo.domain.TransCompany;
import com.bonc.driversafe.baseinfo.domain.TransCompanyType;
import com.bonc.driversafe.baseinfo.service.TransCompanyService;
import com.bonc.driversafe.baseinfo.utils.UpdateUtil;

@Service
public class TransCompanyServiceImpl implements TransCompanyService {

	@Autowired
	private TransCompanyDao transCompanyDao;

	@Override
	public void create(TransCompany tc) {
		transCompanyDao.save(tc);
	}

	@Override
	public TransCompany read(long id) {
		return transCompanyDao.findOne(id);
	}

	@Override
	public void update(TransCompany obj) {
		TransCompany one = transCompanyDao.findOne(obj.getId());
		Object reflect = UpdateUtil.reflect(obj, one);
		TransCompany area4update = (TransCompany) reflect;
		transCompanyDao.saveAndFlush(area4update);
	}

	@Override
	public void delete(long id) {
		transCompanyDao.delete(id);
	}

	@Override
	public List<TransCompany> findAll() {
		return transCompanyDao.findAll();
	}

	@Override
	public Map<String, Object> findByCondition(final TransCompany tc, PageContent page) {
		Map<String, Object> map = new HashMap<>();
		Specification<TransCompany> querySpecifi = new Specification<TransCompany>() {
			@Override
			public Predicate toPredicate(Root<TransCompany> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				// SysConfig sysConfig = (SysConfig) obj;
				if (tc.getTransCompanyName() != null && !"".equals(tc.getTransCompanyName())) {
					predicates.add(cb.like(root.get("transCompanyName").as(String.class),
							"%" + tc.getTransCompanyName() + "%"));
				}
				if (tc.getArea() != null) {
					if (tc.getArea().getId() != null && !"".equals(tc.getArea().getId().toString())) {
						predicates.add(cb.equal(root.get("area"), tc.getArea()));
					}
				}
				if (tc.getBusinessType() != null) {
					if (tc.getBusinessType().getId() != null && !"".equals(tc.getBusinessType().getId().toString())) {
						predicates.add(cb.equal(root.get("businessType"), tc.getBusinessType()));
					}
				}
				if (tc.getTransType() != null) {
					if (tc.getTransType().getId() != null && !"".equals(tc.getTransType().getId().toString())) {
						predicates.add(cb.equal(root.get("transType"), tc.getTransType()));
					}
				}
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

		Page<TransCompany> list = transCompanyDao.findAll(querySpecifi, pageable);

		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		/*
		 * result = new ResultMessage(); result.setSuccess(true);
		 * result.setMsg("操作成功！"); result.setResult(map);
		 */
		return map;
	}

	@Override
	public void batchDel(Long[] ids) {
		for (Long id : ids) {
			transCompanyDao.delete(id);
		}
	}

	@Override
	public List<Map<String, Object>> getTree() {
		List<TransCompany> TransCompanys = transCompanyDao.findAll();
		List<Map<String, Object>> list = new ArrayList<>();
		boolean isLeaf = false;
		for (TransCompany transCompany : TransCompanys) {
			if (transCompany != null) {
				Map<String, Object> out = new HashMap<>();
				Map<String, Object> in = new HashMap<>();
				out.put("name", transCompany.getTransCompanyName());
				in.put("tid", transCompany.getId());
				out.put("data", in);
				out.put("isLeaf", isLeaf);
				list.add(out);
			}
		}
		return list;
	}

	@Override
	public List<Map<String, Object>> getTree(long tid) {
		List<TransCompany> TransCompanys = transCompanyDao.findAll();
		List<Map<String, Object>> list = new ArrayList<>();
		boolean isLeaf = false;
		for (TransCompany transCompany : TransCompanys) {
			if (transCompany.getSuperDepartment() != null && transCompany.getSuperDepartment().getId() == tid) {
				Map<String, Object> out = new HashMap<>();
				Map<String, Object> in = new HashMap<>();
				out.put("name", transCompany.getTransCompanyName());
				in.put("tid", transCompany.getId());
				out.put("data", in);
				out.put("isLeaf", isLeaf);
				list.add(out);
			}
		}
		return list;
	}

	@Override
	public void export(ServletOutputStream outputStream) {
		try {
			// 查询出所有地域信息对象
			List<TransCompany> list = transCompanyDao.findAll();
			// 创建文档对象
			XSSFWorkbook work = new XSSFWorkbook();
			XSSFSheet sheet = work.createSheet();
			// 循环遍历、封装表格字段
			for (int i = 0; i <= list.size(); i++) {
				XSSFRow row = sheet.createRow(i);// 创建行
				XSSFCell cell = row.createCell(0);// 创建单元格
				XSSFCell cell1 = row.createCell(1);
				XSSFCell cell2 = row.createCell(2);
				XSSFCell cell3 = row.createCell(3);
				if (i == 0) {// 第一行设置为表头名称
					cell.setCellValue("公司名称");
					cell1.setCellValue("上级部门");
					cell2.setCellValue("公司类型");
					cell3.setCellValue("所属地域");
					continue;
				}
				cell.setCellValue(list.get(i - 1).getTransCompanyName());
				if (list.get(i - 1).getSuperDepartment() != null) {
					cell1.setCellValue(list.get(i - 1).getSuperDepartment().getTransCompanyName());
				}
				if (list.get(i - 1).getTransType() != null) {
					cell2.setCellValue(list.get(i - 1).getTransType().getTransCompanyTypeName());
				}
				if (list.get(i - 1).getArea() != null) {
					cell3.setCellValue(list.get(i - 1).getArea().getAreaName());
				}
			}
			// 文件流，将文件写到对应的目录
			// stream = new FileOutputStream(System.currentTimeMillis() + ".xlsx");
			work.write(outputStream);
			outputStream.flush();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
