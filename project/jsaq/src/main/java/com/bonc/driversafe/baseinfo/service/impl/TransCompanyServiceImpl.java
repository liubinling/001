package com.bonc.driversafe.baseinfo.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang3.StringUtils;
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

import com.bonc.common.PageContent;
import com.bonc.driversafe.baseinfo.dao.TransCompanyDao;
import com.bonc.driversafe.baseinfo.domain.TransCompany;
import com.bonc.driversafe.baseinfo.service.TransCompanyService;
import com.bonc.driversafe.baseinfo.utils.IdCardUtil;

@Service
@Transactional
public class TransCompanyServiceImpl implements TransCompanyService {

	@Autowired
	private TransCompanyDao transCompanyDao;

	@Override
	public void create(TransCompany tc) {
		checkNull(tc);
		Map<String, Object> map = findByCondition(tc, null);
		@SuppressWarnings("unchecked")
		List<TransCompany> list = (List<TransCompany>) map.get("rows");
		if (list != null && list.size() > 0) {
			// 说明地域信息已经存在
			throw new RuntimeException("运输公司已经存在");
		}
		transCompanyDao.save(tc);
	}

	@Override
	public TransCompany read(long id) {
		return transCompanyDao.findOne(id);
	}

	@Override
	public void update(TransCompany obj) {
		checkNull(obj);
		transCompanyDao.saveAndFlush(obj);
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
				if (tc.getTransCompanyName() != null && !StringUtils.isBlank(tc.getTransCompanyName())) {// 运输公司名称
					predicates.add(cb.like(root.get("transCompanyName").as(String.class),
							"%" + tc.getTransCompanyName() + "%"));
				}
				if (tc.getArea() != null) {
					if (tc.getArea().getId() != null && !StringUtils.isBlank(tc.getArea().getId().toString())) {// 地域
						predicates.add(cb.equal(root.get("area"), tc.getArea()));
					}
				}
				if (tc.getBusinessType() != null) {// 运营范围
					if (tc.getBusinessType().getId() != null
							&& !StringUtils.isBlank(tc.getBusinessType().getId().toString())) {
						predicates.add(cb.equal(root.get("businessType"), tc.getBusinessType()));
					}
				}
				if (tc.getTransType() != null) {// 运输公司类型
					if (tc.getTransType().getId() != null
							&& !StringUtils.isBlank(tc.getTransType().getId().toString())) {
						predicates.add(cb.equal(root.get("transType"), tc.getTransType()));
					}
				}
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		Sort sort = null;
		String order = null;
		String page1 = null;
		String sort1 = null;
		String rows1 = null;
		if (page != null) {
			order = page.getOrder();
			page1 = page.getPage();
			sort1 = page.getSort();
			rows1 = page.getRows();
		}
		// 对空值作处理
		if (rows1 == null || StringUtils.isBlank(rows1)) {
			rows1 = "10";
		}
		if (order == null || StringUtils.isBlank(order)) {
			order = "asc";
		}
		if (page1 == null || StringUtils.isBlank(page1)) {
			page1 = "1";
		}
		if (sort1 == null || StringUtils.isBlank(sort1)) {
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
		return map;
	}

	/**
	 * 为导出服务的模糊查询方法
	 */
	@Override
	public List<TransCompany> findByCondition(final TransCompany tc) {
		Specification<TransCompany> querySpecifi = new Specification<TransCompany>() {
			@Override
			public Predicate toPredicate(Root<TransCompany> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				// SysConfig sysConfig = (SysConfig) obj;
				if (tc.getTransCompanyName() != null && !StringUtils.isBlank(tc.getTransCompanyName())) {// 运输公司名称
					predicates.add(cb.like(root.get("transCompanyName").as(String.class),
							"%" + tc.getTransCompanyName() + "%"));
				}
				if (tc.getArea() != null) {
					if (tc.getArea().getId() != null && !StringUtils.isBlank(tc.getArea().getId().toString())) {// 地域
						predicates.add(cb.equal(root.get("area"), tc.getArea()));
					}
				}
				if (tc.getBusinessType() != null) {// 运营范围
					if (tc.getBusinessType().getId() != null
							&& !StringUtils.isBlank(tc.getBusinessType().getId().toString())) {
						predicates.add(cb.equal(root.get("businessType"), tc.getBusinessType()));
					}
				}
				if (tc.getTransType() != null) {// 运输公司类型
					if (tc.getTransType().getId() != null
							&& !StringUtils.isBlank(tc.getTransType().getId().toString())) {
						predicates.add(cb.equal(root.get("transType"), tc.getTransType()));
					}
				}
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		List<TransCompany> list = transCompanyDao.findAll(querySpecifi);
		return list;
	}

	/**
	 * 批量删除
	 */
	@Override
	public void batchDel(Long[] ids) {
		List<Long> idList = Arrays.asList(ids);
		List<TransCompany> list = transCompanyDao.findAll(idList);
		transCompanyDao.deleteInBatch(list);
	}

	/**
	 * 树形结构
	 */
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

	/**
	 * 获取parentid为tid的子树
	 */
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

	/**
	 * 导出
	 */
	@Override
	public void export(ServletOutputStream outputStream, TransCompany tc) {
		List<TransCompany> list;
		try {
			if (tc.getArea() != null || tc.getBusinessType() != null
					|| (tc.getTransCompanyName() != null && !StringUtils.isBlank(tc.getTransCompanyName()))
					|| tc.getTransType() != null) {
				list = findByCondition(tc);
			} else {
				// 查询出所有地域信息对象
				list = transCompanyDao.findAll();
			}
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
					cell2.setCellValue(list.get(i - 1).getTransType().getName());
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

	/**
	 * 非空验证
	 * 
	 * @param tc
	 */
	private void checkNull(TransCompany tc) {
		if (tc.getTransCompanyName() == null || StringUtils.isBlank(tc.getTransCompanyName())) {
			throw new RuntimeException("运输公司名称不能为空！");
		}
		if (tc.getTransType() == null) {
			throw new RuntimeException("运输公司类型不能为空！");
		}
		if (!IdCardUtil.CheckTel(tc.getTel())) {
			throw new RuntimeException("手机号不合法！");
		}
	}
}
