package com.bonc.driversafe.baseinfo.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.http.ResponseEntity;
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
import com.bonc.driversafe.baseinfo.utils.UpdateUtil;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class AreaServiceImpl implements AreaService {

	@Autowired
	private AreaDao areaDao;
	@Autowired
	private AreaTypeDao areaTypeDao;

	@Override
	public void create(Area area) {

		areaDao.save(area);
	}

	@Override
	public Area read(long id) {
		Area area = areaDao.findOne(id);
		return area;
	}

	@Override
	public void delete(long id) {
		areaDao.delete(id);
	}

	@Override
	public List<Area> findAll() {
		List<Area> areaList = areaDao.findAll();
		return areaList;
	}

	@Override
	public Map<String, Object> findByCondition(final Area area, PageContent page) {
		Map<String, Object> map = new HashMap<>();
		Specification<Area> querySpecifi = new Specification<Area>() {
			@Override
			public Predicate toPredicate(Root<Area> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (area != null) {
					if (area.getAreaName() != null && !"".equals(area.getAreaName())) {
						predicates.add(cb.like(root.get("areaName").as(String.class), "%" + area.getAreaName() + "%"));
					}
					if (area.getFatherArea() != null) {
						if (area.getFatherArea().getId() != null
								&& !"".equals(area.getFatherArea().getId().toString())) {
							predicates.add(cb.equal(root.get("fatherArea"), area.getFatherArea()));
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

		Page<Area> list = areaDao.findAll(querySpecifi, pageable);

		map.put("total", list.getTotalElements());// 数据总数
		map.put("rows", list.getContent());// 分页应该显示的数据
		/*
		 * result = new ResultMessage(); result.setSuccess(true);
		 * result.setMsg("操作成功！"); result.setResult(map);
		 */
		return map;
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delBatchByIds(String[] ids) {
		for (String id : ids) {
			areaDao.delete(Long.parseLong(id));
		}
	}

	/**
	 * 导入Excel文件中的数据
	 * 
	 * @throws IOException
	 */
	@Override
	public void importExcel(MultipartFile file) throws Exception {
		Workbook work;
		Sheet sheet = null;
		List<Area> areas = new ArrayList<Area>();
		List<AreaType> list = areaTypeDao.findAll();
		// List<Area> father = null;
		List<Area> shi = new ArrayList<Area>();
		List<Area> qu = new ArrayList<Area>();
		List<Area> xiang = new ArrayList<Area>();

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
				Area area = new Area();
				// 判断区域类型，若为最高级别（省、直辖市）直接入库
				String areaType = row.getCell(3).toString();
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
	 * 帮助子地域找爸爸，并返回子地域
	 * 
	 * @param father
	 * @param son
	 * @return
	 */
	public List<Area> fatherFindSon(List<Area> father, List<Area> son) {
		// 保存所有的高级地域,并返回带主键的地域对象
		System.out.println("father:" + father);
		System.out.println("son" + son);
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
	@SuppressWarnings("unchecked")
	@Override
	public FileOutputStream exportExcel(ServletOutputStream outputStream) {
		// FileOutputStream stream = null;
		try {
			// 查询出所有地域信息对象
			List<Area> list = areaDao.findAll();
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
			cell41.setCellValue("1.地域编号需要遵循父子规则，例如北京市的编号为11，下属地域为11*，以此类推\n"
								+"2.区域类型级别分为四个级别，从1-4分别代表从省/直辖市/自治区到乡/镇。\n"
								+"3.Excel文件中的纯数字编号要编辑成纯文本格式，否则会导入失败。\n");
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
		boolean isLeaf = false;
		ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for (Area area : areas) {// 遍历所有地域，根据tid查询所有子节点
			if (area.getFatherArea() != null && area.getFatherArea().getId() == tid) {
				Map<String, Object> out = new HashMap<>();
				Map<String, Object> in = new HashMap<>();

				out.put("name", area.getAreaName());
				in.put("tid", area.getId());
				if (area.getType().getId() != 4) {
					out.put("isLeaf", isLeaf);
				} else {
					isLeaf = true;
					out.put("isLeaf", isLeaf);
				}
				out.put("data", in);
				list.add(out);
			}
		}
		return list;
	}

	@Override
	public void update(Area obj) {
		Area area = areaDao.findOne(obj.getId());
		Object reflect = UpdateUtil.reflect(obj, area);
		Area area4update = (Area) reflect;
		areaDao.saveAndFlush(area4update);
	}
}
