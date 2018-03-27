package com.bonc.driversafe.baseinfo.service.impl;

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
import com.bonc.driversafe.baseinfo.dao.DriverDao;
import com.bonc.driversafe.baseinfo.dao.VehicleDao;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.Driver;
import com.bonc.driversafe.baseinfo.domain.Vehicle;
import com.bonc.driversafe.baseinfo.service.DriverService;
import com.bonc.driversafe.baseinfo.utils.UpdateUtil;

@Service
public class DriverServiceImpl implements DriverService {

	@Autowired
	private DriverDao driverDao;

	/**
	 * 新增
	 */
	@Override
	public void create(Driver obj) {
		// 去重
		List<Vehicle> list = obj.getList();
		Set<Vehicle> set = new HashSet<Vehicle>();
		set.addAll(list);
		list.clear();
		list.addAll(set);
		obj.setList(list);
		driverDao.save(obj);
	}

	/**
	 * 主键查询
	 */
	@Override
	public Driver read(long id) {
		return driverDao.getOne(id);
	}

	/**
	 * 更新
	 */
	@Override
	public void update(Driver obj) {
		Driver one = driverDao.findOne(obj.getId());
		Object reflect = UpdateUtil.reflect(obj, one);
		Driver area4update = (Driver) reflect;
		driverDao.saveAndFlush(area4update);
	}

	/**
	 * 主键删除
	 */
	@Override
	public void delete(long id) {
		driverDao.delete(id);
	}

	/**
	 * 查询所有
	 */
	@Override
	public List<Driver> findAll() {

		return driverDao.findAll();
	}

	/**
	 * 关键字搜索
	 */
	@Override
	public Map findByCondition(final Driver obj, PageContent page) {

		Map<String, Object> map = new HashMap<>();
		Specification<Driver> querySpecifi = new Specification<Driver>() {
			@Override
			public Predicate toPredicate(Root<Driver> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (obj.getName() != null && !"".equals(obj.getName())) {
					predicates.add(cb.like(root.get("name").as(String.class), "%" + obj.getName() + "%"));
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
		Page<Driver> list = driverDao.findAll(querySpecifi, pageable);
		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		return map;
	}

	@Override
	public void exportExcel(ServletOutputStream outputStream) {
		try {
			// 查询出所有地域信息对象
			List<Driver> list = driverDao.findAll();
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
				XSSFCell cell4 = row.createCell(4);
				XSSFCell cell5 = row.createCell(5);
				XSSFCell cell6 = row.createCell(6);
				XSSFCell cell7 = row.createCell(7);
				XSSFCell cell8 = row.createCell(8);
				if (i == 0) {// 第一行设置为表头名称
					cell.setCellValue("司机姓名");
					cell1.setCellValue("性别");
					cell2.setCellValue("押运员");
					cell3.setCellValue("身份证号");
					cell4.setCellValue("移动电话");
					cell5.setCellValue("从业资格证");
					cell6.setCellValue("发证机构");
					cell7.setCellValue("驾驶车辆");
					cell8.setCellValue("所属车组");
					continue;
				}
				cell.setCellValue(list.get(i - 1).getName());// 地域编号
				cell1.setCellValue(list.get(i - 1).getGender());
				cell2.setCellValue(list.get(i - 1).getSupercargoName());
				cell3.setCellValue(list.get(i - 1).getIdCardNo());
				cell4.setCellValue(list.get(i - 1).getTel());
				cell5.setCellValue(list.get(i - 1).getQualificationCertificateName());
				cell6.setCellValue(list.get(i - 1).getCertifyingAuthority());
				if (list.get(i - 1).getVehicle() != null) {
					cell7.setCellValue(list.get(i - 1).getVehicle().getPlateNo());
				}
				if (list.get(i - 1).getMotorcade() != null) {
					cell8.setCellValue(list.get(i - 1).getMotorcade().getMotorcadeName());
				} else {
					cell8.setCellValue("自营");
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
