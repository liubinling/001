package com.bonc.driversafe.baseinfo.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bonc.common.CRUDController;
import com.bonc.common.PageContent;
import com.bonc.common.domain.ResultMessage;
import com.bonc.driversafe.baseinfo.domain.Motorcade;
import com.bonc.driversafe.baseinfo.service.MotorcadeService;

@RestController
@RequestMapping(value="/api/v1.0/motorcade")
public class MotorcadeController implements CRUDController<Motorcade> {
	@Autowired
	private MotorcadeService motorcadeService;

	@RequestMapping(method = RequestMethod.POST)
	@Override
	public ResultMessage post(Motorcade motorcade) {
		ResultMessage result = new ResultMessage();
		motorcadeService.create(motorcade);

		result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(null);

        return result;
	}
	@RequestMapping(method = RequestMethod.PUT)
	@Override
	public ResultMessage put(Motorcade motorcade) {
		ResultMessage result = new ResultMessage();
		motorcadeService.update(motorcade);
		
		result.setSuccess(true);
		result.setMsg("车队信息修改成功！");
		return result;
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	@Override
	public ResultMessage delete(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		motorcadeService.delete(id);
		
		result.setSuccess(true);
		result.setMsg("车队信息删除成功！");
		return result;
	}
	
	@Override
	@RequestMapping(value="/all", method = RequestMethod.GET)
	public ResultMessage getAll() {
		ResultMessage result = new ResultMessage();
		List<Motorcade> motorcadeList = null;
		motorcadeList = motorcadeService.findAll();
		
		result.setSuccess(true);
		result.setMsg("车队信息查询成功！");
		result.setResult(motorcadeList);
		return result;
	}
	
	@Override
	@RequestMapping(value="/{id}", method = RequestMethod.GET)
	public ResultMessage getOne(@PathVariable long id) {
		ResultMessage result = new ResultMessage();
		Motorcade motorcade = null;
		motorcade = motorcadeService.read(id);
		
		result.setSuccess(true);
		result.setMsg("车队信息查询成功！");
		result.setResult(motorcade);
		return result;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@Override
	public ResultMessage getPage(Motorcade motorcade, PageContent pageContent) {
		ResultMessage result = new ResultMessage();

        @SuppressWarnings("rawtypes")
		Map map = motorcadeService.findByCondition(motorcade, pageContent);

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(map);

        return result;
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	@Override
	public ResultMessage batchDelete(Long[] ids) {
        ResultMessage result = new ResultMessage();
        for (Long id : ids) {
        	motorcadeService.delete(id);
        }

        result.setSuccess(true);
        result.setMsg("操作成功");
        result.setResult(null);

        return result;
    } 
	
	@RequestMapping(value="/export",method = RequestMethod.GET)
	public ResultMessage exportExcel(HttpServletResponse response, Motorcade motorcade) {
		ResultMessage result = new ResultMessage();
		motorcadeService.exportExcel(response, motorcade);
		result.setSuccess(true);
		result.setMsg("车队信息导出成功！");
		return result;
	}
	
	@RequestMapping(value="/getTree",method = RequestMethod.GET)
	public List<Map<String, Object>> getTree() {
		List<Map<String, Object>> tree = null;
		tree = motorcadeService.getTree();
		return tree;
	}
	
	/**
	 * 查询根节点下的子节点
	 * @param tid
	 * @return
	 */
	@RequestMapping(value="/getTree/{tid}",method = RequestMethod.GET)
	public List<Map<String, Object>> getTree (@PathVariable("tid") long tid) {
		List<Map<String, Object>> tree = null;
		tree = motorcadeService.getTree(tid);
		return tree;
	}
}