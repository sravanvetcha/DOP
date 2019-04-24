package com.example.doallarcrypto.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import com.example.doallarcrypto.model.ETHBTC;

@CrossOrigin(origins = "*",
methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE ,RequestMethod.PUT},
maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "ethbtc", path = "/ethbtc")

public interface ETHBTCRepository extends CrudRepository<ETHBTC, Long> {

	public List<ETHBTC> findAll();
}
