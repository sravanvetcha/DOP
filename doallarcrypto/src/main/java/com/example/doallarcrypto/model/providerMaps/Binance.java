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
public class Binance {

	private BidLevel bidLevel;
	private AskLevel askLevel;
	public Binance() {
		super();
	}
	
}
