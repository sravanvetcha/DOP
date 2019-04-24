package com.example.doallarcrypto.repository.providersMapRepo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.doallarcrypto.model.providerMaps.AskLevelEntity;


@CrossOrigin(origins = "*",
methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE ,RequestMethod.PUT},
maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "asklevel", path = "/asklevel")

public interface AskLevelRepo extends CrudRepository<AskLevelEntity, Long>  
{
	
	@Query(
			  value = "select * from ASKLEVEL order by created_at asc limit 1;", 
			  nativeQuery = true)
	AskLevelEntity findFirstRow();
	@Query(
			  value = "select * from ASKLEVEL order by created_at desc limit 1;", 
			  nativeQuery = true)
	AskLevelEntity findLastRow();
	
	@Query(
			  value = "select * from ASKLEVEL ask WHERE ask.created_at <= :startTime and ask.created_at >= :endTime ;", 
			  nativeQuery = true)
	List<AskLevelEntity> getAllBasedOnParams(@Param("startTime") Date startTime ,@Param("endTime") Date endTime);
}
