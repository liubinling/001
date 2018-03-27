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

import com.bonc.common.PageContent;
import com.bonc.driversafe.baseinfo.dao.DeviceDao;
import com.bonc.driversafe.baseinfo.domain.Device;
import com.bonc.driversafe.baseinfo.service.DeviceService;

@Service
public class DeviceServiceImpl implements DeviceService {

	@Autowired
	private DeviceDao deviceDao;
	/**
	 * 新增
	 */
	@Override
	public void create(Device obj) {
		checkNull(obj);
		// 根据设备唯一ID来区分设备
		List<Device> list = findByCondition(obj);
		if (list != null && list.size() > 0) {
			// 说明设备信息已经存在
			throw new RuntimeException(String.format("设备唯一ID号为%s的设备信息已经存在!", obj.getDeviceId()));
		}
		deviceDao.save(obj);
	}

	/**
	 * 主键查询
	 */
	@Override
	public Device read(long id) {
		return deviceDao.getOne(id);
	}

	/**
	 * 更新
	 */
	@Override
	public void update(Device obj) {
		checkNull(obj);
		deviceDao.saveAndFlush(obj);
	}

	/**
	 * 主键删除
	 */
	@Override
	public void delete(long id) {
		deviceDao.delete(id);
	}

	/**
	 * 查询所有
	 */
	@Override
	public List<Device> findAll() {

		return deviceDao.findAll();
	}

	/**
	 * 关键字搜索
	 */
	@Override
	public Map<String, Object> findByCondition(final Device obj, PageContent page) {

		Map<String, Object> map = new HashMap<>();
		Specification<Device> querySpecifi = new Specification<Device>() {
			@Override
			public Predicate toPredicate(Root<Device> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (obj.getDeviceId() != null && !StringUtils.isBlank(obj.getDeviceId())) {// 根据姓名
					predicates.add(cb.like(root.get("deviceId").as(String.class), "%" + obj.getDeviceId() + "%"));
				}
				if (obj.getDeviceType() != null) {
					if (obj.getDeviceType().getId() != null
							&& !StringUtils.isBlank(obj.getDeviceType().getId().toString())) {// 根据车牌号
						predicates.add(cb.equal(root.get("deviceType"), obj.getDeviceType()));
					}
				}
				if (obj.getDeviceStatus() != null) {// 所在车队
					if (obj.getDeviceStatus().getId() != null
							&& !StringUtils.isBlank(obj.getDeviceStatus().getId().toString())) {
						predicates.add(cb.equal(root.get("deviceStatus"), obj.getDeviceStatus()));
					}
				}

				if (obj.getCameraStatus() != null) {//
					if (obj.getCameraStatus().getId() != null
							&& !StringUtils.isBlank(obj.getCameraStatus().getId().toString())) {
						predicates.add(cb.equal(root.get("cameraStatus"), obj.getCameraStatus()));
					}
				}
				if (obj.getExecuteStatus() != null) {
					if (obj.getExecuteStatus().getId() != null
							&& !StringUtils.isBlank(obj.getExecuteStatus().getId().toString())) {// 身份证号
						predicates.add(cb.equal(root.get("executeStatus"), obj.getExecuteStatus()));
					}
				}
				if (obj.getIsCalibrate() != null) {
					if (obj.getIsCalibrate().getId() != null
							&& !StringUtils.isBlank(obj.getIsCalibrate().getId().toString())) {// 身份证号
						predicates.add(cb.equal(root.get("isCalibrate"), obj.getIsCalibrate()));
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
		Page<Device> list = deviceDao.findAll(querySpecifi, pageable);
		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		return map;
	}

	/**
	 * 为导出符合条件的驾驶员服务的方法
	 */
	@Override
	public List<Device> findByCondition(final Device obj) {
		Specification<Device> querySpecifi = new Specification<Device>() {
			@Override
			public Predicate toPredicate(Root<Device> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (obj.getDeviceId() != null && !"".equals(obj.getDeviceId())) {// 根据姓名
					predicates.add(cb.like(root.get("deviceId").as(String.class), "%" + obj.getDeviceId() + "%"));
				}
				if (obj.getDeviceType() != null) {
					if (obj.getDeviceType().getId() != null && !"".equals(obj.getDeviceType().getId().toString())) {// 根据车牌号
						predicates.add(cb.equal(root.get("deviceType"), obj.getDeviceType()));
					}
				}
				if (obj.getDeviceStatus() != null) {// 所在车队
					if (obj.getDeviceStatus().getId() != null && !"".equals(obj.getDeviceStatus().getId().toString())) {
						predicates.add(cb.equal(root.get("deviceStatus"), obj.getDeviceStatus()));
					}
				}
				if (obj.getCameraStatus() != null && !"".equals(obj.getCameraStatus().getId().toString())) {// 身份证号
					predicates.add(cb.equal(root.get("cameraStatus"), obj.getCameraStatus()));
				}
				if (obj.getExecuteStatus() != null && !"".equals(obj.getExecuteStatus())) {// 身份证号
					predicates.add(cb.equal(root.get("executeStatus"), obj.getExecuteStatus()));
				}
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		return deviceDao.findAll(querySpecifi);
	}

	@Override
	public void exportExcel(ServletOutputStream outputStream, Device device) {
		List<Device> list;
		try {
			// 查询出所有地域信息对象
			if (device.getDeviceId() != null && !StringUtils.isBlank(device.getDeviceId())
					|| device.getDeviceStatus() != null || device.getDeviceType() != null
					|| device.getExecuteStatus() != null || device.getCameraStatus() != null) {
				// 查询满足当前条件的地域信息
				list = findByCondition(device);
			} else {
				// 查询出所有地域信息对象
				list = deviceDao.findAll();
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
				XSSFCell cell4 = row.createCell(4);
				XSSFCell cell5 = row.createCell(5);
				XSSFCell cell6 = row.createCell(6);
				XSSFCell cell7 = row.createCell(7);
				XSSFCell cell8 = row.createCell(8);
				XSSFCell cell9 = row.createCell(9);
				XSSFCell cell10 = row.createCell(10);
				XSSFCell cell11 = row.createCell(11);
				XSSFCell cell12 = row.createCell(12);
				if (i == 0) {// 第一行设置为表头名称
					cell.setCellValue("终端号");
					cell1.setCellValue("终端类型");
					cell2.setCellValue("版本号");
					cell3.setCellValue("版本名称");
					cell4.setCellValue("绑定车辆");
					cell5.setCellValue("设备当前状态");
					cell6.setCellValue("摄像头状态");
					cell7.setCellValue("有无SD卡");
					cell8.setCellValue("总空间");
					cell9.setCellValue("剩余空间");
					cell10.setCellValue("最近下发时间");
					cell11.setCellValue("最近执行时间");
					cell12.setCellValue("当前执行状态");
					continue;
				}
				cell.setCellValue(list.get(i - 1).getDeviceId());//
				if (list.get(i - 1).getDeviceType() != null) {//
					cell1.setCellValue(list.get(i - 1).getDeviceType().getName());//
				}
				cell2.setCellValue(list.get(i - 1).getHardwareVersionNumber());//
				cell3.setCellValue(list.get(i - 1).getVersionName());//
				if (list.get(i - 1).getVehicle() != null) {//
					cell4.setCellValue(list.get(i - 1).getVehicle().getPlateNo());//
				}
				if (list.get(i - 1).getDeviceStatus() != null) {//
					cell5.setCellValue(list.get(i - 1).getDeviceStatus().getName());//
				}
				if (list.get(i - 1).getCameraStatus() != null) {//
					cell6.setCellValue(list.get(i - 1).getCameraStatus().getName());//
				}
				cell7.setCellValue(list.get(i - 1).getSd());
				cell8.setCellValue(list.get(i - 1).getTotalSpace());
				cell9.setCellValue(list.get(i - 1).getFreeSpace());
				cell10.setCellValue(list.get(i - 1).getLatestIssueTime().toString());
				cell11.setCellValue(list.get(i - 1).getLatestExecutionTime().toString());
				cell12.setCellValue(list.get(i - 1).getExecuteStatus().getName());
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

	@Override
	public void delBatchByIds(Long[] ids) {
		List<Long> idList = Arrays.asList(ids);
		List<Device> list = deviceDao.findAll(idList);
		deviceDao.deleteInBatch(list);
	}

	/**
	 * 非空验证
	 * 
	 * @param device
	 */
	private void checkNull(Device device) {
		if (device.getDeviceId() == null || StringUtils.isBlank(device.getDeviceId())) {
			throw new RuntimeException("唯一终端ID号不能为空！");
		}
		if (device.getDeviceType() == null) {
			throw new RuntimeException("终端类型不能为空！");
		}
		if (device.getDeviceStatus() == null) {
			throw new RuntimeException("设备当前状态不能为空！");
		}
		if (device.getSoftwareVersionNumber() == null || StringUtils.isBlank(device.getSoftwareVersionNumber())) {
			throw new RuntimeException("软件版本号不能为空！");
		}
		if (device.getHardwareVersionNumber() == null || StringUtils.isBlank(device.getHardwareVersionNumber())) {
			throw new RuntimeException("硬件版本号不能为空！");
		}
	}

}
