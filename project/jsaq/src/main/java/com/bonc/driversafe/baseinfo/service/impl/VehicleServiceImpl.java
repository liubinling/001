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
import javax.transaction.Transactional;

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

import com.bonc.common.PageContent;
import com.bonc.driversafe.baseinfo.dao.VehicleDao;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.Vehicle;
import com.bonc.driversafe.baseinfo.service.VehicleService;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleDao vehicleDao;

	/**
	 * 新增
	 */
	@Override
	public void create(Vehicle vehicle) {
		checkNull(vehicle);
		@SuppressWarnings("unchecked")
		Map<String, Object> map = findByCondition(vehicle, null);
		@SuppressWarnings("unchecked")
		List<Area> list = (List<Area>) map.get("rows");
		if (list != null && list.size() > 0) {
			// 说明地域信息已经存在
			throw new RuntimeException(String.format("车牌号为%s的车辆信息已经存在!", vehicle.getPlateNo()));
		}
		vehicleDao.save(vehicle);
	}

	/**
	 * 主键查询
	 */
	@Override
	public Vehicle read(long id) {
		Vehicle one = vehicleDao.findOne(id);
		return one;
	}

	/**
	 * 更新
	 */
	@Override
	public void update(Vehicle vehicle) {
		checkNull(vehicle);// 非空验证
		vehicleDao.saveAndFlush(vehicle);
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
	@SuppressWarnings("rawtypes")
	@Override
	public Map findByCondition(final Vehicle obj, PageContent page) {
		Map<String, Object> map = new HashMap<>();
		Specification<Vehicle> querySpecifi = new Specification<Vehicle>() {
			@Override
			public Predicate toPredicate(Root<Vehicle> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (obj != null) {
					if (obj.getPlateNo() != null && !StringUtils.isBlank(obj.getPlateNo())) {
						// 根据车牌号查询车辆
						predicates.add(cb.like(root.get("plateNo").as(String.class), "%" + obj.getPlateNo() + "%"));
					}
					if (obj.getMotorcade() != null) {
						// 根据车组查询车辆
						if (obj.getMotorcade().getId() != null
								&& !StringUtils.isBlank(obj.getMotorcade().getId().toString())) {
							predicates.add(cb.equal(root.get("motorcade"), obj.getMotorcade()));
						}
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
		Page<Vehicle> list = vehicleDao.findAll(querySpecifi, pageable);
		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		return map;
	}

	/**
	 * 查询某个地域下的所有车辆
	 */
	@Override
	public List<Vehicle> getVehicleByArea(final Vehicle obj) {
		Specification<Vehicle> querySpecifi = new Specification<Vehicle>() {
			@Override
			public Predicate toPredicate(Root<Vehicle> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (obj != null) {
					if (obj.getCarArea() != null) {
						// 根据地域查询车辆
						if (obj.getCarArea().getId() != null
								&& !StringUtils.isBlank(obj.getCarArea().getId().toString())) {
							predicates.add(cb.equal(root.get("carArea"), obj.getCarArea()));
						}
					}
				}
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		List<Vehicle> list = vehicleDao.findAll(querySpecifi);
		return list;
	}

	/**
	 * 服务方法 为了导出方法服务
	 */
	@Override
	public List<Vehicle> findByCondition(final Vehicle obj) {
		Specification<Vehicle> querySpecifi = new Specification<Vehicle>() {
			@Override
			public Predicate toPredicate(Root<Vehicle> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (obj != null) {
					if (obj.getPlateNo() != null && !StringUtils.isBlank(obj.getPlateNo())) {
						// 根据车牌号查询车辆
						predicates.add(cb.like(root.get("plateNo").as(String.class), "%" + obj.getPlateNo() + "%"));
					}
					if (obj.getMotorcade() != null) {
						// 根据车组查询车辆
						if (obj.getMotorcade().getId() != null
								&& !StringUtils.isBlank(obj.getMotorcade().getId().toString())) {
							predicates.add(cb.equal(root.get("motorcade"), obj.getMotorcade()));
						}
					}
				}
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		return vehicleDao.findAll(querySpecifi);
	}

	@Override
	public void exportExcel(ServletOutputStream outputStream, Vehicle veh) {
		List<Vehicle> list;
		System.out.println(veh.getPlateNo());
		try {
			if ((veh.getPlateNo() != null && !StringUtils.isBlank(veh.getPlateNo())) || veh.getDriver() != null
					|| veh.getMotorcade() != null
					|| (veh.getDeviceNo() != null && !StringUtils.isBlank(veh.getDeviceNo()))
					|| veh.getRunningStatus() != null) {
				// 查询满足当前条件的车辆信息
				list = findByCondition(veh);
				System.out.println(veh.getPlateNo());
			} else {
				// 查询出所有车辆对象
				list = vehicleDao.findAll();
			}
			System.out.println(list);
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
				cell.setCellValue(list.get(i - 1).getPlateNo());// 车牌号
				if (list.get(i - 1).getColor() != null) {// 颜色
					cell1.setCellValue(list.get(i - 1).getColor().getName());
				}
				cell2.setCellValue(list.get(i - 1).getDeviceNo());// 终端卡号
				if (list.get(i - 1).getDriver() != null) {// 驾驶员
					cell3.setCellValue(list.get(i - 1).getDriver().getName());
				}
				if (list.get(i - 1).getRunningStatus() != null) {// 运行状态
					cell4.setCellValue(list.get(i - 1).getRunningStatus().getName());
				}
				if (list.get(i - 1).getMotorcade() != null) {// 所属车队
					cell5.setCellValue(list.get(i - 1).getMotorcade().getMotorcadeName());
				}
				if (list.get(i - 1).getVehicleType() != null) {// 车辆类型
					cell6.setCellValue(list.get(i - 1).getVehicleType().getName());
				}
				if (list.get(i - 1).getIndustryType() != null) {// 所属行业类型
					cell7.setCellValue(list.get(i - 1).getIndustryType().getName());
				}
				if (list.get(i - 1).getCarArea() != null) {// 所属地域
					cell8.setCellValue(list.get(i - 1).getCarArea().getAreaName());
				}
				if (list.get(i - 1).getEndTime() != null) {// 服务结束时间
					cell9.setCellValue(list.get(i - 1).getEndTime().toString());
				}
			}
			work.write(outputStream);// 将输出流写入到表格对象中
			outputStream.flush();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delBatchByIds(Long[] ids) {
		List<Long> idList = Arrays.asList(ids);
		List<Vehicle> list = vehicleDao.findAll(idList);
		vehicleDao.deleteInBatch(list);
	}

	/**
	 * 非空验证
	 * 
	 * @param vehicle
	 */
	private void checkNull(Vehicle vehicle) {
		if (vehicle.getPlateNo() == null || StringUtils.isBlank(vehicle.getPlateNo())) {
			throw new RuntimeException("车牌号不能为空！");
		}
		if (vehicle.getDeviceNo() == null || StringUtils.isBlank(vehicle.getDeviceNo())) {
			throw new RuntimeException("终端卡号不能为空！");
		}
		if (vehicle.getDevice() != null) {
			if (vehicle.getDevice().getDeviceType() == null) {
				throw new RuntimeException("终端类型不能为空！");
			}
			if (vehicle.getDevice().getDeviceId() == null) {
				throw new RuntimeException("终端唯一ID号不能为空！");
			}
		}
		if (vehicle.getMotorcade() == null) {
			throw new RuntimeException("所属车队不能为空！");
		}
		if (vehicle.getColor() == null) {
			throw new RuntimeException("车辆颜色不能为空！");
		}
		if (vehicle.getEngineNo() == null || StringUtils.isBlank(vehicle.getEngineNo())) {
			throw new RuntimeException("发动机号不能为空！");
		}

		if (vehicle.getDeviceStatus() == null) {
			throw new RuntimeException("设备当前状态不能为空！");
		}
		if (vehicle.getInstallTime() == null || StringUtils.isBlank(vehicle.getInstallTime().toString())) {
			throw new RuntimeException("安装时间不能为空！");
		}
		if (vehicle.getRunningStatus() == null) {
			throw new RuntimeException("运行状态不能为空！");
		}
		if (vehicle.getUseCharacter() == null || StringUtils.isBlank(vehicle.getUseCharacter())) {
			throw new RuntimeException("使用性质不能为空！");
		}
		if (vehicle.getModel() == null || StringUtils.isBlank(vehicle.getModel())) {
			throw new RuntimeException("型号不能为空！");
		}
		if (vehicle.getVin() == null || StringUtils.isBlank(vehicle.getVin())) {
			throw new RuntimeException("车辆识别代码不能为空！");
		}
		if (vehicle.getIssueDate() == null || StringUtils.isBlank(vehicle.getIssueDate().toString())) {
			throw new RuntimeException("发证日期不能为空！");
		}
		if (vehicle.getValidDate() == null || StringUtils.isBlank(vehicle.getValidDate().toString())) {
			throw new RuntimeException("有效日期不能为空！");
		}
	}

}
