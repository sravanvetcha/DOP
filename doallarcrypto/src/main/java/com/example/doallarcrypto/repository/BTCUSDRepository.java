package com.example.doallarcrypto.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.doallarcrypto.model.BTCUSD;

@CrossOrigin(origins = "*",
methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE ,RequestMethod.PUT},
maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "btcusd", path = "/btcusd")

public interface BTCUSDRepository extends CrudRepository<BTCUSD, Long>  
{

	public List<BTCUSD> findAll();
}
