package com.example.doallarcrypto.model;

import java.math.BigDecimal;
import java.time.Instant;

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

@Entity
@Table(name="zecbtc")
@AllArgsConstructor
@Getter
@Setter
@Data
public class ZECBTC {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(updatable=false, unique=true, nullable=false)
	private Long id;
  	private BigDecimal priceLevel;
  	private Double volume;
  	private String exchange;
  	private Instant updateTime=Instant.now();
  	private String type;
	public ZECBTC() {
		super();
	}
}
