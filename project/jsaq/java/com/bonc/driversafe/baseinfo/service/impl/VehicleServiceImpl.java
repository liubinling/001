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
import com.bonc.driversafe.baseinfo.dao.ColorDao;
import com.bonc.driversafe.baseinfo.dao.DeviceDao;
import com.bonc.driversafe.baseinfo.dao.DeviceStatusDao;
import com.bonc.driversafe.baseinfo.dao.IndustryTypeDao;
import com.bonc.driversafe.baseinfo.dao.InsuranceCompanyDao;
import com.bonc.driversafe.baseinfo.dao.MotorcadeDao;
import com.bonc.driversafe.baseinfo.dao.RunningStatusDao;
import com.bonc.driversafe.baseinfo.dao.TerminalCompanyDao;
import com.bonc.driversafe.baseinfo.dao.VehicleDao;
import com.bonc.driversafe.baseinfo.dao.VehicleTypeDao;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.ColorType;
import com.bonc.driversafe.baseinfo.domain.Device;
import com.bonc.driversafe.baseinfo.domain.DeviceStatus;
import com.bonc.driversafe.baseinfo.domain.Driver;
import com.bonc.driversafe.baseinfo.domain.IndustryType;
import com.bonc.driversafe.baseinfo.domain.InsuranceCompany;
import com.bonc.driversafe.baseinfo.domain.Motorcade;
import com.bonc.driversafe.baseinfo.domain.RunningStatus;
import com.bonc.driversafe.baseinfo.domain.TerminalCompany;
import com.bonc.driversafe.baseinfo.domain.Vehicle;
import com.bonc.driversafe.baseinfo.domain.VehicleType;
import com.bonc.driversafe.baseinfo.service.VehicleService;
import com.bonc.driversafe.baseinfo.utils.UpdateUtil;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleDao vehicleDao;

	/**
	 * 新增
	 */
	@Override
	public void create(Vehicle obj) {

		vehicleDao.save(obj);
	}
	/**
	 * 主键查询
	 */
	@Override
	public Vehicle read(long id) {

		return vehicleDao.findOne(id);
	}

	/**
	 * 更新
	 */
	@Override
	public void update(Vehicle obj) {
		Vehicle vehicle = vehicleDao.findOne(obj.getId());
		Object object = UpdateUtil.reflect(obj, vehicle);
		Vehicle vehicle4update = (Vehicle)object;
		vehicleDao.saveAndFlush(vehicle4update);
	}
	
	/**
	 * 主键删除
	 */
	@Override
	public void delete(long id) {
		vehicleDao.delete(id);
	}

	/**
	 * 查询所有
	 */
	@Override
	public List<Vehicle> findAll() {
		return vehicleDao.findAll();
	}

	/**
	 * 关键字搜索
	 */
	@Override
	public Map findByCondition(final Vehicle obj, PageContent page) {
		Map<String, Object> map = new HashMap<>();
		Specification<Vehicle> querySpecifi = new Specification<Vehicle>() {
			@Override
			public Predicate toPredicate(Root<Vehicle> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (obj != null) {
					if (obj.getPlateNo() != null && !"".equals(obj.getPlateNo())) {
						// 根据车牌号查询车辆
						predicates.add(cb.like(root.get("plateNo").as(String.class), "%" + obj.getPlateNo() + "%"));
					}
					if (obj.getMotorcade() != null) {
						// 根据车组查询车辆
						if (obj.getMotorcade().getId() != null && !"".equals(obj.getMotorcade().getId().toString())) {
							predicates.add(cb.equal(root.get("motorcade"), obj.getMotorcade()));
						}
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
		Page<Vehicle> list = vehicleDao.findAll(querySpecifi, pageable);
		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		return map;
	}
	@Override
	public void exportExcel(ServletOutputStream outputStream) {
		try {
			// 查询出所有车辆对象
			List<Vehicle> list = vehicleDao.findAll();
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
				XSSFCell cell9 = row.createCell(9);
				if (i == 0) {// 第一行设置为表头名称
					cell.setCellValue("车牌号");
					cell1.setCellValue("颜色");
					cell2.setCellValue("终端卡号");
					cell3.setCellValue("主驾驶");
					cell4.setCellValue("运营状态");
					cell5.setCellValue("所属车组");
					cell6.setCellValue("车辆类型");
					cell7.setCellValue("行业类型");
					cell8.setCellValue("车籍地");
					cell9.setCellValue("服务到期日期");
					continue;
				}
				cell.setCellValue(list.get(i - 1).getPlateNo());// 地域编号
				if (list.get(i - 1).getColor()!=null) {
					cell1.setCellValue(list.get(i - 1).getColor().getName());
				}
				cell2.setCellValue(list.get(i - 1).getDeviceNo());
				if (list.get(i - 1).getDriver()!=null) {
					cell3.setCellValue(list.get(i - 1).getDriver().getName());
				}
				if (list.get(i - 1).getRunningStatus()!=null) {
					cell4.setCellValue(list.get(i - 1).getRunningStatus().getName());
				}
				if (list.get(i - 1).getMotorcade()!=null) {
					cell5.setCellValue(list.get(i - 1).getMotorcade().getMotorcadeName());
				}
				if (list.get(i - 1).getVehicleType()!=null) {
					cell6.setCellValue(list.get(i - 1).getVehicleType().getName());
				}
				if (list.get(i - 1).getIndustryType()!=null) {
					cell7.setCellValue(list.get(i - 1).getIndustryType().getName());
				}
				if (list.get(i - 1).getCarArea()!=null) {
					cell8.setCellValue(list.get(i - 1).getCarArea().getAreaName());
				}
				if (list.get(i - 1).getEndTime() != null) {
					cell9.setCellValue(list.get(i - 1).getEndTime().toString());
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
