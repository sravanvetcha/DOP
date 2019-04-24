package com.example.doallarcrypto.model.providerMaps;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Data
public class HistoricalData 
{
	private List<String> binance_ask= new ArrayList<String>();
	private List<String> bitrex_ask= new ArrayList<String>();
	private List<String> e55_ask= new ArrayList<String>();
	private List<String> huobi_ask= new ArrayList<String>();
	
	private List<String> binance_bid= new ArrayList<String>();
	private List<String> bitrex_bid= new ArrayList<String>();
	private List<String> e55_bid= new ArrayList<String>();
	private List<String> huobi_bid= new ArrayList<String>();
	private List<Date> dates= new ArrayList<Date>();
	public HistoricalData() {
		super();
	}
	
}
