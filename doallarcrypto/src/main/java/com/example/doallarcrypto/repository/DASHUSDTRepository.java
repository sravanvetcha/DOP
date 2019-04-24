package com.example.doallarcrypto.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import com.example.doallarcrypto.model.DASHUSDT;

@CrossOrigin(origins = "*",
methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE ,RequestMethod.PUT},
maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "dashusdt", path = "/dashusdt")

public interface DASHUSDTRepository extends CrudRepository<DASHUSDT, Long> {
	public List<DASHUSDT> findAll();

}
