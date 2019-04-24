package com.example.doallarcrypto.repository.providersMapRepo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.doallarcrypto.model.providerMaps.BidLevelEntity;


@CrossOrigin(origins = "*",
methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE ,RequestMethod.PUT},
maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "bidlevel", path = "/bidlevel")

public interface BidLevelRepo extends CrudRepository<BidLevelEntity, Long>  
{
	
	@Query(
			  value = "select * from BIDLEVEL bid WHERE bid.created_at <= :startTime and bid.created_at >= :endTime ;", 
			  nativeQuery = true)
	List<BidLevelEntity> getAllBasedOnParams(@Param("startTime") Date startTime ,@Param("endTime") Date endTime);
	
}
