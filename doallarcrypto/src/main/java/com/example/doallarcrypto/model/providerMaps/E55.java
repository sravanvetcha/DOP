package com.example.doallarcrypto.model.providerMaps;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Data
public class E55 {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(updatable=false, unique=true, nullable=false)
	private Long id;
	private BidLevel bidLevel;
	private AskLevel askLevel;
	public E55() {
		super();
	}
	
}
