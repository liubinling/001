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
import com.bonc.driversafe.baseinfo.dao.DriverDao;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.Driver;
import com.bonc.driversafe.baseinfo.service.DriverService;
import com.bonc.driversafe.baseinfo.utils.IdCardUtil;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

	@Autowired
	private DriverDao driverDao;

	/**
	 * 新增
	 */
	@Override
	public void create(Driver obj) {
		checkNull(obj);
		// 根据身份证号区分驾驶人
		@SuppressWarnings("unchecked")
		Map<String, Object> map = findByCondition(obj, null);
		@SuppressWarnings("unchecked")
		List<Area> list = (List<Area>) map.get("rows");
		if (list != null && list.size() > 0) {
			// 说明驾驶人信息已经存在
			throw new RuntimeException(String.format("姓名为%s的驾驶员信息已经存在!", obj.getName()));
		}
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
		checkNull(obj);// 非空校验
		driverDao.saveAndFlush(obj);
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
				if (obj.getName() != null && !"".equals(obj.getName())) {// 根据姓名
					predicates.add(cb.like(root.get("name").as(String.class), "%" + obj.getName() + "%"));
				}
				if (obj.getVehicle() != null) {
					if (obj.getVehicle().getPlateNo() != null && !"".equals(obj.getName())) {// 根据车牌号
						predicates.add(cb.like(root.get("name").as(String.class), "%" + obj.getName() + "%"));
					}
				}
				if (obj.getMotorcade() != null) {// 所在车队
					if (obj.getMotorcade().getId() != null && !"".equals(obj.getMotorcade().getId().toString())) {
						predicates.add(cb.equal(root.get("motorcade"), obj.getMotorcade()));
					}
				}
				if (obj.getIdCardNo() != null && !"".equals(obj.getIdCardNo())) {// 身份证号
					predicates.add(cb.like(root.get("idCardNo").as(String.class), "%" + obj.getIdCardNo() + "%"));
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
		Page<Driver> list = driverDao.findAll(querySpecifi, pageable);
		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		return map;
	}

	/**
	 * 为导出符合条件的驾驶员服务的方法
	 */
	@Override
	public List<Driver> findByCondition(final Driver obj) {
		Specification<Driver> querySpecifi = new Specification<Driver>() {
			@Override
			public Predicate toPredicate(Root<Driver> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (obj.getName() != null && !"".equals(obj.getName())) {// 根据姓名
					predicates.add(cb.like(root.get("name").as(String.class), "%" + obj.getName() + "%"));
				}
				if (obj.getVehicle() != null) {
					if (obj.getVehicle().getPlateNo() != null && !"".equals(obj.getName())) {// 根据车牌号
						predicates.add(cb.like(root.get("name").as(String.class), "%" + obj.getName() + "%"));
					}
				}
				if (obj.getMotorcade() != null) {// 所在车队
					if (obj.getMotorcade().getId() != null && !"".equals(obj.getMotorcade().getId().toString())) {
						predicates.add(cb.equal(root.get("motorcade"), obj.getMotorcade()));
					}
				}
				if (obj.getIdCardNo() != null && !"".equals(obj.getIdCardNo())) {// 身份证号
					predicates.add(cb.like(root.get("idCardNo").as(String.class), "%" + obj.getIdCardNo() + "%"));
				}
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		return driverDao.findAll(querySpecifi);
	}

	@Override
	public void exportExcel(ServletOutputStream outputStream, Driver driver) {
		List<Driver> list;
		try {
			// 查询出所有地域信息对象
			if ((driver.getName() != null && !StringUtils.isBlank(driver.getName()))
					|| (driver.getIdCardNo() != null && StringUtils.isBlank(driver.getIdCardNo()))
					|| driver.getVehicle() != null) {
				// 查询满足当前条件的地域信息
				list = findByCondition(driver);

			} else {
				// 查询出所有地域信息对象
				list = driverDao.findAll();
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
				cell.setCellValue(list.get(i - 1).getName());// 驾驶员姓名
				cell1.setCellValue(list.get(i - 1).getGender());// 性别
				cell2.setCellValue(list.get(i - 1).getSupercargoName());// 押运员
				cell3.setCellValue(list.get(i - 1).getIdCardNo());// 身份证号
				cell4.setCellValue(list.get(i - 1).getTel());// 电话
				cell5.setCellValue(list.get(i - 1).getQualificationCertificateName());// 从业资格证
				cell6.setCellValue(list.get(i - 1).getCertifyingAuthority());// 发证机构
				if (list.get(i - 1).getVehicle() != null) {// 驾驶车辆
					cell7.setCellValue(list.get(i - 1).getVehicle().getPlateNo());
				}
				if (list.get(i - 1).getMotorcade() != null && (list.get(i - 1).getMotorcade().getMotorcadeName()!=null|| !StringUtils.isBlank(list.get(i - 1).getMotorcade().getMotorcadeName()))) {// 所属车队
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

	/**
	 * 非空验证
	 * 
	 * @param obj
	 */
	private void checkNull(Driver obj) {
		// 一连串的非空验证
		if (obj.getName() == null || StringUtils.isBlank(obj.getName())) {
			throw new RuntimeException("驾驶员名字不能为空！");
		}
		if (obj.getIdCardNo() == null || StringUtils.isBlank(obj.getIdCardNo())) {
			throw new RuntimeException("身份证号不能为空！");
		}
		if (obj.getGender() == null || StringUtils.isBlank(obj.getGender())) {
			throw new RuntimeException("性别不能为空！");
		}
		if (obj.getVehicle() == null) {
			throw new RuntimeException("主驾驶车辆不能为空！");
		}
		if (obj.getExpirationTime() == null || StringUtils.isBlank(obj.getExpirationTime().toString())) {
			throw new RuntimeException("过期时间不能为空！");
		}
		if (obj.getTel() == null || StringUtils.isBlank(obj.getTel())) {
			throw new RuntimeException("联系方式不能为空！");
		}
		if (obj.getBirth() == null || StringUtils.isBlank(obj.getBirth().toString())) {
			throw new RuntimeException("出生日期不能为空！");
		}
		if (obj.getDrivingType() == null) {
			throw new RuntimeException("准驾类型不能为空！");
		}
		if (obj.getFirstDate() == null || StringUtils.isBlank(obj.getFirstDate().toString())) {
			throw new RuntimeException("初次领证日期不能为空！");
		}
		if (obj.getValidDate() == null || StringUtils.isBlank(obj.getValidDate().toString())) {
			throw new RuntimeException("有效日期不能为空！");
		}
		if (obj.getDriversLicenseNumber() == null || StringUtils.isBlank(obj.getDriversLicenseNumber())) {
			throw new RuntimeException("驾驶证号不能为空！");
		}
		if (obj.getFileNo() == null || StringUtils.isBlank(obj.getFileNo())) {
			throw new RuntimeException("档案编号不能为空！");
		}
		if (obj.getQualificationCertificateName() == null
				|| StringUtils.isBlank(obj.getQualificationCertificateName())) {
			throw new RuntimeException("从业资格证不能为空！");
		}
		if (obj.getQualificationCertificateType() == null
				|| StringUtils.isBlank(obj.getQualificationCertificateType())) {
			throw new RuntimeException("从业资格证类别不能为空！");
		}
		if (obj.getQualificationCertificateNo() == null || StringUtils.isBlank(obj.getQualificationCertificateNo())) {
			throw new RuntimeException("证件编号不能为空！");
		}
		if (obj.getCertifyingAuthority() == null || StringUtils.isBlank(obj.getCertifyingAuthority())) {
			throw new RuntimeException("发证机构不能为空！");
		}
		if (obj.getCertifyingTime() == null || StringUtils.isBlank(obj.getCertifyingTime().toString())) {
			throw new RuntimeException("发证不能为空！");
		}
		// 校验身份证合法性
		if (!IdCardUtil.checkIdCard(obj.getIdCardNo())) {
			throw new RuntimeException("身份证号不合法1！");
		}
		if (!IdCardUtil.checkGender(obj.getIdCardNo(), obj.getGender())) {
			throw new RuntimeException("身份证号不合法2！");
		}
		// 校验手机号
		if (!IdCardUtil.CheckTel(obj.getTel())) {
			throw new RuntimeException("手机号不合法！");
		}
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delBatchByIds(Long[] ids) {
		List<Long> idList = Arrays.asList(ids);
		List<Driver> list = driverDao.findAll(idList);
		driverDao.deleteInBatch(list);
	}
}
