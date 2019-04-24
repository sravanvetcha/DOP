package com.example.doallarcrypto.model.providerMaps;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Data
public class ProviderBBOMap 
{
	private Binance BINANCE;
	private E55 E55;
	private Bitrex BITREX;
	private Huobi HUOBI;
}
