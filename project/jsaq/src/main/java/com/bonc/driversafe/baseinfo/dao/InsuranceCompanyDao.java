package com.bonc.driversafe.baseinfo.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bonc.driversafe.baseinfo.domain.InsuranceCompany;


public interface InsuranceCompanyDao extends JpaSpecificationExecutor<InsuranceCompany>, JpaRepository<InsuranceCompany,Long> {

	List<InsuranceCompany> findByParent_Id(Long id);
	
	List<InsuranceCompany> findByName(String name);

	/*@Query(value = "select a from InsuranceCompany a where a.parentId = 0")
	List<InsuranceCompany> getTree();
//
	@Query(value = "select a from InsuranceCompany a where a.parentId = :id")
	List<InsuranceCompany> getTree(@Param("id") String id);
*/
}
