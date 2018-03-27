package com.bonc.common.service.impl;

import com.bonc.common.PageContent;
import com.bonc.common.service.SysConfigService;


import com.bonc.common.dao.SysConfigDAO;
import com.bonc.common.domain.ResultMessage;
import com.bonc.common.domain.SysConfig;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SysConfigServiceImpl implements SysConfigService {

    @Autowired
    private SysConfigDAO sysConfigDAO;

    @Override
    public List<SysConfig> findAll() {
        return sysConfigDAO.findAll();
    }

    @Override
    public void create(SysConfig obj) {
        sysConfigDAO.saveAndFlush(obj);
        
        
    }

    @Override
    public SysConfig read(long id) {
        return sysConfigDAO.findOne(id);
    }

    @Override
    public void update(SysConfig obj) {
           
        sysConfigDAO.saveAndFlush(obj);
    }

    @Override
    public void delete(long id) {
        sysConfigDAO.delete(id);
    }

    /**
     * @return the sysConfigDAO
     */
    public SysConfigDAO getSysConfigDAO() {
        return sysConfigDAO;
    }

    /**
     * @param sysConfigDAO the sysConfigDAO to set
     */
    public void setSysConfigDAO(SysConfigDAO sysConfigDAO) {
        this.sysConfigDAO = sysConfigDAO;
    }

    @Override
    public Map findByCondition(final SysConfig obj, PageContent page) {
        ResultMessage result = null;

        Specification querySpecifi = new Specification<SysConfig>() {
            @Override
            public Predicate toPredicate(Root<SysConfig> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {

                List<Predicate> predicates = new ArrayList();
                SysConfig sysConfig = (SysConfig) obj;
                if (sysConfig.getPdescr() != null && !"".equals(sysConfig.getPdescr())) {

                    predicates.add(cb.like(root.get("pdescr").as(String.class), "%" + sysConfig.getPdescr() + "%"));
                }

                if (sysConfig.getPkey() != null && !sysConfig.getPkey().equals("")) {

                    predicates.add(cb.like(root.get("pkey").as(String.class), "%" + sysConfig.getPkey() + "%"));
                }

                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }

        };

        Sort sort = null;

        String order = page.getOrder();
        String page1 = page.getPage();
        String sort1 = page.getSort();
        String rows1 = page.getRows();

        //对空值作处理
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

        Page<SysConfig> list = this.getSysConfigDAO().findAll(querySpecifi, pageable);

        Map map = new HashMap();
        map.put("total", list.getTotalElements());//数据总数  
        map.put("rows", list.getContent());//分页应该显示的数据  
/*
        result = new ResultMessage();
        result.setSuccess(true);
        result.setMsg("操作成功！");
        result.setResult(map);
*/
        return map;

    }


}
