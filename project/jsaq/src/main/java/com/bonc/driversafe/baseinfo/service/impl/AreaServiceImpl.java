package com.bonc.driversafe.baseinfo.service.impl;

import java.io.IOException;
import java.io.InputStream;
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
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bonc.common.PageContent;
import com.bonc.driversafe.baseinfo.dao.AreaDao;
import com.bonc.driversafe.baseinfo.dao.AreaTypeDao;
import com.bonc.driversafe.baseinfo.domain.Area;
import com.bonc.driversafe.baseinfo.domain.AreaType;
import com.bonc.driversafe.baseinfo.service.AreaService;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class AreaServiceImpl implements AreaService {

	@Autowired
	private AreaDao areaDao;
	@Autowired
	private AreaTypeDao areaTypeDao;

	/**
	 * 新增地域信息
	 */
	@Override
	public void create(Area area) {
		if (area != null) {
			checkNull(area);
			List<Area> list = findByCondition(area);
			if (list != null && list.size() > 0) {
				// 说明地域信息已经存在
				throw new RuntimeException("地域信息已经存在！");
			}
			areaDao.save(area);
		}
	}

	/**
	 * 主键查询地域信息
	 */
	@Override
	public Area read(long id) {
		Area area = areaDao.findOne(id);
		return area;
	}

	/**
	 * 主键删除地域信息
	 */
	@Override
	public void delete(long id) {
		areaDao.delete(id);
	}

	/**
	 * 查询所有地域，不分页
	 */
	@Override
	public List<Area> findAll() {
		List<Area> areaList = areaDao.findAll();
		return areaList;
	}

	/**
	 * 根据条件查询地域信息
	 */
	@Override
	public Map<String, Object> findByCondition(final Area area, PageContent page) {
		Map<String, Object> map = new HashMap<>();
		Specification<Area> querySpecifi = new Specification<Area>() {
			@Override
			public Predicate toPredicate(Root<Area> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (area != null) {
					if (area.getAreaName() != null && !StringUtils.isBlank(area.getAreaName())) {
						predicates.add(cb.like(root.get("areaName").as(String.class), "%" + area.getAreaName() + "%"));
					}
					if (area.getNumber() != null && !StringUtils.isBlank(area.getNumber())) {
						predicates.add(cb.equal(root.get("number").as(String.class), area.getNumber()));
					}
					if (area.getFatherArea() != null) {
						if (area.getFatherArea().getId() != null
								&& !StringUtils.isBlank(area.getFatherArea().getId().toString())) {
							predicates.add(cb.equal(root.get("fatherArea"), area.getFatherArea()));
						}
					}
					if (area.getType() != null) {
						if (area.getType().getId() != null && !StringUtils.isBlank(area.getType().getId().toString())) {
							predicates.add(cb.equal(root.get("type"), area.getType()));
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
		// 赋予默认值
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
		Page<Area> list = areaDao.findAll(querySpecifi, pageable);
		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		return map;
	}

	/**
	 * 为导出符合查询条件的地域信息服务的方法
	 */
	@Override
	public List<Area> findByCondition(final Area area) {
		Specification<Area> querySpecifi = new Specification<Area>() {
			@Override
			public Predicate toPredicate(Root<Area> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (area != null) {
					if (area.getAreaName() != null && !"".equals(area.getAreaName())) {
						predicates.add(cb.like(root.get("areaName").as(String.class), "%" + area.getAreaName() + "%"));
					}
					if (area.getNumber() != null && !"".equals(area.getNumber())) {
						predicates.add(cb.equal(root.get("number").as(String.class), area.getNumber()));
					}
					if (area.getFatherArea() != null) {
						if (area.getFatherArea().getId() != null
								&& !"".equals(area.getFatherArea().getId().toString())) {
							predicates.add(cb.equal(root.get("fatherArea"), area.getFatherArea()));
						}
					}
					if (area.getType() != null) {
						if (area.getType().getId() != null && !"".equals(area.getType().getId().toString())) {
							predicates.add(cb.equal(root.get("type"), area.getType()));
						}
					}
				}
				return cb.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		return areaDao.findAll(querySpecifi);
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delBatchByIds(Long[] ids) {
		List<Long> idList = Arrays.asList(ids);
		List<Area> list = areaDao.findAll(idList);
		areaDao.deleteInBatch(list);
	}

	/**
	 * 导入Excel文件中的数据
	 * 
	 * @throws IOException
	 */
	@Override
	public void importExcel(MultipartFile file) throws Exception {
		Workbook work;// 创建操作对象
		Sheet sheet = null;// 创建表格对象
		List<Area> areas = new ArrayList<Area>();// 集合容器，用来存储入库后返回来的地域对象（带有主键）
		List<AreaType> list = areaTypeDao.findAll();// 查询出所有的地域类型
		// List<Area> father = null;
		List<Area> shi = new ArrayList<Area>();// 存放市级地域的集合容器
		List<Area> qu = new ArrayList<Area>();// 存放区、县级别的集合容器
		List<Area> xiang = new ArrayList<Area>();// 存放乡/镇级别的集合容器
		if (file != null) {
			InputStream inputStream = file.getInputStream();// 获取要导入的文件流
			// 根据后缀名创建不同的解析对象
			if (file.getOriginalFilename().endsWith(".xlsx")) {
				work = new XSSFWorkbook(inputStream);
				sheet = work.getSheetAt(0);
			} else if (file.getOriginalFilename().endsWith(".xls")) {
				work = new HSSFWorkbook(inputStream);
				sheet = work.getSheetAt(0);
			} else {
				throw new RuntimeException("只能导入Excel文件");
			}
			// 遍历获取表格的每一行
			for (Row row : sheet) {
				if (row.getRowNum() == 0) {
					// 对表头进行验证，格式不对抛异常
					if (!row.getCell(0).toString().equals("地域编号") && !row.getCell(1).toString().equals("父级地域编号")
							&& !row.getCell(2).toString().equals("地域名称") && !row.getCell(3).toString().equals("地域类型")) {
						throw new RuntimeException("导入文件中的数据格式错误，具体格式请点击模版下载。");
					}
					// 第一为行为表头，不取
					continue;
				}
				if (row.getCell(0) == null) {
					// 到这表示表里已经没有数据了，直接结束循环。
					return;
				}
				Area area = new Area();// 封装每行的地域信息
				// 判断区域类型，若为最高级别（省、直辖市）直接入库
				String areaType = row.getCell(3).toString();// 根据地域类型对地域信息分开存储
				if ("1".equals(areaType)) {
					// 最高级父级地域
					for (AreaType type : list) {
						if ("1".equals(type.getId().toString())) {
							area.setType(type);
						}
					}
					String areaName = row.getCell(2).toString();
					area.setAreaName(areaName);
					// String number = row.getCell(1).toString();
					area.setNumber(row.getCell(0).toString());
					// 放到省（直辖市）级的集合里
					areas.add(area);

					// father = areaDao.save(areas);
					// areas.clear();
				} else if ("2".equals(areaType)) {
					for (AreaType type : list) {
						if ("2".equals(type.getId().toString())) {
							area.setType(type);
						}
					}
					area.setAreaName(row.getCell(2).toString());
					area.setNumber(row.getCell(0).toString());
					// 放到市级的集合里
					shi.add(area);
				} else if ("3".equals(areaType)) {
					for (AreaType type : list) {
						if ("3".equals(type.getId().toString())) {
							area.setType(type);
						}
					}
					area.setAreaName(row.getCell(2).toString());
					area.setNumber(row.getCell(0).toString());
					qu.add(area);
				} else {
					for (AreaType type : list) {
						if ("4".equals(type.getId().toString())) {
							area.setType(type);
						}
					}
					area.setAreaName(row.getCell(2).toString());
					area.setNumber(row.getCell(0).toString());
					xiang.add(area);
				}
			}
			// 帮市找爸爸，找到后返回市的集合
			shi = fatherFindSon(areas, shi);
			// 帮区找爸爸，找到后返回区的集合
			qu = fatherFindSon(shi, qu);
			// 帮乡找爸爸，找到后返回乡的集合
			xiang = fatherFindSon(qu, xiang);
			areaDao.save(xiang);
			inputStream.close();
		}
	}

	/**
	 * 帮助子地域找爸爸，并返回子地域成为新的爸爸
	 * 
	 * @param father
	 * @param son
	 * @return
	 */
	public List<Area> fatherFindSon(List<Area> father, List<Area> son) {
		// 保存所有的高级地域,并返回带主键的地域对象
		// System.out.println("father:" + father);
		// System.out.println("son" + son);
		father = areaDao.save(father);
		// father.clear();
		List<Area> newFather = new ArrayList<>();// 存储找到爸爸的儿子
		for (Area area2 : father) {
			for (Area area3 : son) {
				if (area3.getNumber().startsWith(area2.getNumber())) {
					// 上下级关系成立
					area3.setFatherArea(area2);
					newFather.add(area3);
				}
			}
		}
		// 保存找到爸爸的儿子并成为新的爸爸
		return newFather;
	}

	/**
	 * 导出Excel文件
	 * 
	 * @return
	 */
	@Override
	public void exportExcel(ServletOutputStream outputStream, Area area) {
		// FileOutputStream stream = null;
		List<Area> list;
		try {
			if ((area.getAreaName() != null && !StringUtils.isBlank(area.getAreaName())) || area.getType() != null
					|| area.getFatherArea() != null) {
				// 查询满足当前条件的地域信息
				list = findByCondition(area);
			} else {
				// 查询出所有地域信息对象
				list = areaDao.findAll();
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
					cell.setCellValue("地域编号");
					cell1.setCellValue("父级地域编号");
					cell2.setCellValue("地域名称");
					cell3.setCellValue("地域类型");
					continue;
				}
				cell.setCellValue(list.get(i - 1).getNumber());// 地域编号
				if (list.get(i - 1).getFatherArea() != null) {// 父级地域编号
					cell1.setCellValue(list.get(i - 1).getFatherArea().getNumber());
				}
				cell2.setCellValue(list.get(i - 1).getAreaName());
				cell3.setCellValue(list.get(i - 1).getType().getId().toString());
			}
			// 将表格写入到响应流中
			work.write(outputStream);
			outputStream.flush();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 模板下载
	 * 
	 * @param outputStream
	 * @return
	 */
	public void getModel(ServletOutputStream outputStream) {
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
			cell.setCellValue("地域编号");
			cell1.setCellValue("父级地域编号");
			cell2.setCellValue("地域名称");
			cell3.setCellValue("地域类型");

			cell20.setCellValue("11");// 地域编号
			// 父级地域编号
			cell21.setCellValue("");
			cell22.setCellValue("北京");
			cell23.setCellValue("1");

			cell30.setCellValue("1101");// 地域编号
			// 父级地域编号
			cell31.setCellValue("11");
			cell32.setCellValue("朝阳区");
			cell33.setCellValue("2");
			cell40.setCellValue("注：");
			cell41.setCellValue("1.地域编号需要遵循父子规则，例如北京市的编号为11，下属地域为11*，以此类推\n" + "2.区域类型级别分为四个级别，从1-4代表从省/直辖市/自治区-乡/镇。\n"
					+ "3.Excel文件中的纯数字编号要编辑成纯文本格式，否则会导入失败。\n" + "4.若以此文件为导入文件，请删除注。");
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
	public List<Map<String, Object>> getTree() {
		List<Area> areas = areaDao.findAll();
		boolean isLeaf = false;
		ArrayList<Map<String, Object>> list = new ArrayList<>();
		for (Area area : areas) {
			if (area.getFatherArea() == null) {// 根节点
				Map<String, Object> out = new HashMap<>();
				Map<String, Object> in = new HashMap<>();
				out.put("name", area.getAreaName());
				in.put("tid", area.getId());
				out.put("data", in);
				out.put("isLeaf", isLeaf);
				list.add(out);
			}
		}
		return list;
	}

	@Override
	public List<Map<String, Object>> getTree(long tid) {
		List<Area> areas = areaDao.findAll();
		// 是否有子节点 false：有，true：无
		boolean isLeaf = false;
		ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for (Area area : areas) {// 遍历所有地域，根据tid查询所有子节点
			if (area.getFatherArea() != null && area.getFatherArea().getId() == tid) {
				Map<String, Object> out = new HashMap<>();
				Map<String, Object> in = new HashMap<>();
				out.put("name", area.getAreaName());
				in.put("tid", area.getId());
				if (area.getType().getId() == 4) {
					isLeaf = true;
				}
				out.put("isLeaf", isLeaf);
				out.put("data", in);
				list.add(out);
			}
		}
		return list;
	}

	/**
	 * 新增地域信息，展示可选的父级地域
	 */
	@Override
	public List<Map<String, Object>> getFatherTree(long tid) {
		List<Area> areas = areaDao.findAll();
		// 是否有子节点 false：有，true：无
		boolean isLeaf = false;
		ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for (Area area : areas) {// 遍历所有地域，根据tid查询所有子节点
			if (area.getFatherArea() != null && area.getFatherArea().getId() == tid) {
				Map<String, Object> out = new HashMap<>();
				Map<String, Object> in = new HashMap<>();
				if ("乡/镇".equals(area.getType().getName())) {
					// isLeaf = true;
					continue;
				}
				if ("区/县".equals(area.getType().getName())) {
					isLeaf = true;
				}
				out.put("name", area.getAreaName());
				in.put("tid", area.getId());
				out.put("isLeaf", isLeaf);
				out.put("data", in);
				list.add(out);
			}
		}
		return list;
	}

	@Override
	public void update(Area obj) {
		// Area area = areaDao.findOne(obj.getId());
		// Object reflect = UpdateUtil.reflect(obj, area);
		// Area area4update = (Area) reflect;
		checkNull(obj);
		areaDao.saveAndFlush(obj);
	}

	private void checkNull(Area area) {
		if (area.getAreaName() == null || StringUtils.isBlank(area.getAreaName())) {
			throw new RuntimeException("地域名称不能为空！");
		}
		if (area.getNumber() == null || StringUtils.isBlank(area.getNumber())) {
			throw new RuntimeException("地域编号不能为空！");
		}
		if (area.getType() == null) {
			throw new RuntimeException("地域类型不能为空！");
		}
	}

	// @Override
	// public List<Area> findAllFatherArea() {
	// List<Area> list = areaDao.findAll();
	// List<Area> father = new ArrayList<Area>();
	// for (Area area : list) {
	// if (area.getFatherArea() != null) {
	// father.add(area.getFatherArea());
	// }
	// }
	// return father;
	// }
}
