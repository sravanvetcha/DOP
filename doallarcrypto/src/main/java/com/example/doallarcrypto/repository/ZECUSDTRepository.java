package com.example.doallarcrypto.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import com.example.doallarcrypto.model.ZECUSDT;

@CrossOrigin(origins = "*",
methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE ,RequestMethod.PUT},
maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "zecusdt", path = "/zecusdt")

public interface ZECUSDTRepository extends CrudRepository<ZECUSDT, Long> 
{
	public List<ZECUSDT> findAll();

}
