package com.example.doallarcrypto.model.providerMaps;

import java.math.BigDecimal;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.doallarcrypto.model.BTCETH;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Data
public class BidLevel {

	private BigDecimal price;
	private BigDecimal qty;
	public BidLevel() {
		super();
	}
	
	
}
