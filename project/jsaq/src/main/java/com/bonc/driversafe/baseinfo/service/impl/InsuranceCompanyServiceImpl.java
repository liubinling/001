package com.bonc.driversafe.baseinfo.service.impl;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bonc.common.PageContent;
import com.bonc.driversafe.baseinfo.dao.InsuranceCompanyDao;
import com.bonc.driversafe.baseinfo.domain.InsuranceCompany;
import com.bonc.driversafe.baseinfo.service.InsuranceCompanyService;

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
		checkNull(insuranceCompany);
		insuranceCompanyDao.save(insuranceCompany);
	}

	@Override
	public InsuranceCompany read(long id) {
		InsuranceCompany inc = insuranceCompanyDao.findOne(id);
		return inc;
	}

	@Override
	public void update(InsuranceCompany insuranceCompany) {
		checkNull(insuranceCompany);
		insuranceCompanyDao.saveAndFlush(insuranceCompany);
	}

	@Override
	public void delete(long id) {
		insuranceCompanyDao.delete(id);
	}

	@Override
	public List<InsuranceCompany> findAll() {
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
				if (insuranceCompany.getParent() != null) {
					if (insuranceCompany.getParent().getId() != null
							&& !"".equals(insuranceCompany.getParent().getId().toString())) {
						predicates.add(cb.equal(root.get("parent"), insuranceCompany.getParent()));
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
		for (Long id : ids) {
			insuranceCompanyDao.delete(id);
		}

	}

	@Override
	public List<Map> getTree() {
		List<InsuranceCompany> insuranceCompanys = insuranceCompanyDao.findAll();
		List<Map> list = new ArrayList<>();
		Set set = getParent();
		for (InsuranceCompany insuranceCompany : insuranceCompanys) {
			Boolean isLeaf = false;
			if (null == insuranceCompany.getParent()) {
				if (!set.contains(insuranceCompany.getId())) {
					isLeaf = true;
				}
				Map<String, Object> map1 = new HashMap<>();
				Map<String, Object> map2 = new HashMap<>();
				map1.put("name", insuranceCompany.getName());
				map2.put("tid", insuranceCompany.getId());
				map1.put("data", map2);
				map1.put("isLeaf", isLeaf);
				list.add(map1);
			}
		}
		return list;
	}

	@Override
	public List<Map> getTree(Long id) {
		List<InsuranceCompany> insuranceCompanys = insuranceCompanyDao.findByParent_Id(id);
		List<Map> list = new ArrayList<>();
		Set set = getParent();
		for (InsuranceCompany insuranceCompany : insuranceCompanys) {
			Boolean isLeaf = false;
			if (!set.contains(insuranceCompany.getId())) {
				isLeaf = true;
			}
			InsuranceCompany parent = insuranceCompany.getParent();
			Map<String, Object> map1 = new HashMap<>();
			Map<String, Object> map2 = new HashMap<>();
			map1.put("name", insuranceCompany.getName());
			map2.put("tid", insuranceCompany.getId());
			map1.put("data", map2);
			map1.put("isLeaf", isLeaf);
			list.add(map1);
		}
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
				System.out.println("第一行" + row.getCell(0).toString());
				if (row.getRowNum() == 0) {
					// 第一行不取
					continue;
				}
				if (row.getCell(0) == null) {
					// 到这表示表里已经没有数据了
					return;
				}
				InsuranceCompany insuranceCompany = new InsuranceCompany();
				if (null != row.getCell(2))
					insuranceCompany.setLocation(row.getCell(2).toString());
				if (null != row.getCell(0))
					insuranceCompany.setName(row.getCell(0).toString());
				if (null != row.getCell(1))
					insuranceCompany.setParent(insuranceCompanyDao.findByName(row.getCell(1).toString()).get(0));
				if (null != row.getCell(3))
					insuranceCompany.setTel(row.getCell(3).toString());
				System.out.println(insuranceCompany);
				insuranceCompanyDao.save(insuranceCompany);
			}
		}

	}

	@Override
	public FileOutputStream exportExcel(ServletOutputStream outputStream, final InsuranceCompany insuranceCompany) {
		Specification<InsuranceCompany> querySpecifi = new Specification<InsuranceCompany>() {
			@Override
			public Predicate toPredicate(Root<InsuranceCompany> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				// SysConfig sysConfig = (SysConfig) obj;
				if (insuranceCompany.getName() != null && !"".equals(insuranceCompany.getName())) {
					predicates.add(cb.like(root.get("name").as(String.class), "%" + insuranceCompany.getName() + "%"));
				}
				if (insuranceCompany.getParent() != null) {
					if (insuranceCompany.getParent().getId() != null
							&& !"".equals(insuranceCompany.getParent().getId().toString())) {
						predicates.add(cb.equal(root.get("parent"), insuranceCompany.getParent()));
					}
				}
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		try {
			// 查询出所有保险公司信息对象
			List<InsuranceCompany> list = insuranceCompanyDao.findAll(querySpecifi);
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
					cell.setCellValue("保险公司名称");
					cell1.setCellValue("所属上级");
					cell2.setCellValue("地址");
					cell3.setCellValue("电话");
					continue;
				}
				cell.setCellValue(list.get(i - 1).getName());// 保险公司名称
				if (list.get(i - 1).getParent() != null) {// 所属上级
					cell1.setCellValue(list.get(i - 1).getParent().getName());
				}
				cell2.setCellValue(list.get(i - 1).getLocation());
				cell3.setCellValue(list.get(i - 1).getTel());
			}
			// 文件流，将文件写到对应的目录
			// stream = new FileOutputStream(System.currentTimeMillis() + ".xlsx");
			work.write(outputStream);
			outputStream.flush();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	/**
	 * 模板下载
	 * 
	 * @param outputStream
	 * @return
	 */
	public FileOutputStream getModel(ServletOutputStream outputStream) {
		// FileOutputStream stream = null;
		try {
			// 创建文档对象
			XSSFWorkbook work = new XSSFWorkbook();
			XSSFSheet sheet = work.createSheet();
			XSSFRow row1 = sheet.createRow(0);// 创建第一行
			XSSFCell cell = row1.createCell(0);// 创建单元格
			XSSFCell cell1 = row1.createCell(1);
			XSSFCell cell2 = row1.createCell(2);
			XSSFCell cell3 = row1.createCell(3);
			XSSFRow row2 = sheet.createRow(1);// 创建第2行
			XSSFCell cell20 = row2.createCell(0);// 创建单元格
			XSSFCell cell21 = row2.createCell(1);
			XSSFCell cell22 = row2.createCell(2);
			XSSFCell cell23 = row2.createCell(3);
			XSSFRow row3 = sheet.createRow(2);// 创建第3行
			XSSFCell cell30 = row3.createCell(0);// 创建单元格
			XSSFCell cell31 = row3.createCell(1);
			XSSFCell cell32 = row3.createCell(2);
			XSSFCell cell33 = row3.createCell(3);
			XSSFRow row4 = sheet.createRow(3);// 创建第4行
			XSSFCell cell40 = row4.createCell(0);// 创建单元格
			XSSFCell cell41 = row4.createCell(1);
			// 第一行设置为表头名称
			cell.setCellValue("保险公司名称");
			cell1.setCellValue("上级部门名称");
			cell2.setCellValue("地址");
			cell3.setCellValue("电话");

			cell20.setCellValue("中国人民财产保险股份有限公司江苏省分公司");// 地域编号
			// 父级地域编号
			cell21.setCellValue("中国人民财产保险股份有限公司南京市分公司");
			cell22.setCellValue("江苏省南京市玄武区龙蟠中路69号");
			cell23.setCellValue("025-68185012");

			cell30.setCellValue("中国人民财产保险股份有限公司南京市城东支公司");// 地域编号
			// 父级地域编号
			cell31.setCellValue("中国人民财产保险股份有限公司南京市分公司");
			cell32.setCellValue("江苏省南京市龙蟠中路69号二楼");
			cell33.setCellValue("025-68185303");
			cell40.setCellValue("注：");
			cell41.setCellValue("1.保险公司名称请务必准确填写\n" + "2.Excel文件中的纯数字编号要编辑成纯文本格式，否则会导入失败。\n");
			// 文件流，将文件写到对应的目录
			// stream = new FileOutputStream(System.currentTimeMillis() + ".xlsx");
			work.write(outputStream);
			outputStream.flush();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public Set getParent() {
		Set set = new HashSet<>();
		List<InsuranceCompany> insuranceCompanys = insuranceCompanyDao.findAll();
		for (InsuranceCompany insuranceCompany : insuranceCompanys) {
			if (null != insuranceCompany.getParent()) {
				set.add(insuranceCompany.getParent().getId());
			}
		}
		return set;
	}

	private void checkNull(InsuranceCompany ins) {
		if (ins.getName() == null || StringUtils.isBlank(ins.getName())) {
			throw new RuntimeException("保险公司名称不能为空！");
		}
	}
}
