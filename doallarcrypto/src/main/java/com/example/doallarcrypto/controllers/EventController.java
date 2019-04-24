package com.example.doallarcrypto.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.doallarcrypto.model.BTCUSDTEnum;
import com.example.doallarcrypto.model.providerMaps.AskLevelEntity;
import com.example.doallarcrypto.model.providerMaps.BidLevelEntity;
import com.example.doallarcrypto.model.providerMaps.EventModel;
import com.example.doallarcrypto.model.providerMaps.FormInput;
import com.example.doallarcrypto.model.providerMaps.HistoricalData;
import com.example.doallarcrypto.repository.providersMapRepo.AskLevelRepo;
import com.example.doallarcrypto.repository.providersMapRepo.BidLevelRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventController 
{
	public static ObjectMapper mapper = new ObjectMapper();

	@Autowired
	private AskLevelRepo askRepo;
	@Autowired
	private BidLevelRepo bidRepo;
	
	@PostMapping("/event")
	public ResponseEntity<EventModel> create(@Valid @RequestBody EventModel event) throws JsonProcessingException {
		
		log.info("event Consumed : {}",mapper.writerWithDefaultPrettyPrinter().writeValueAsString(event));
		Date d=new Date();
		Arrays.asList(BTCUSDTEnum.values()).forEach(e->{
			if(e.name().equals("BINANCE"))
			{
				AskLevelEntity askPrice= new AskLevelEntity();
				askPrice.setCryptocurrencyName(e.name());
				askPrice.setPrice(event.getProviderBBOMap().getBINANCE().getAskLevel().getPrice());
				askPrice.setQty(event.getProviderBBOMap().getBINANCE().getAskLevel().getQty());
				askPrice.setCreatedAt(d);
				askRepo.save(askPrice);
				BidLevelEntity bidPrice= new BidLevelEntity();
				bidPrice.setCryptocurrencyName(e.name());
				bidPrice.setPrice(event.getProviderBBOMap().getBINANCE().getBidLevel().getPrice());
				bidPrice.setQty(event.getProviderBBOMap().getBINANCE().getBidLevel().getQty());
				bidPrice.setCreatedAt(d);
				bidRepo.save(bidPrice);
				
			}
			else if (e.name().equals("BITREX"))
			{
				AskLevelEntity askPrice= new AskLevelEntity();
				askPrice.setCryptocurrencyName(e.name());
				askPrice.setPrice(event.getProviderBBOMap().getBITREX().getAskLevel().getPrice());
				askPrice.setQty(event.getProviderBBOMap().getBITREX().getAskLevel().getQty());
				askPrice.setCreatedAt(d);
				askRepo.save(askPrice);
				BidLevelEntity bidPrice= new BidLevelEntity();
				bidPrice.setCryptocurrencyName(e.name());
				bidPrice.setPrice(event.getProviderBBOMap().getBITREX().getBidLevel().getPrice());
				bidPrice.setQty(event.getProviderBBOMap().getBITREX().getBidLevel().getQty());
				bidPrice.setCreatedAt(d);
				bidRepo.save(bidPrice);
			}
			else if (e.name().equals("E55"))
			{
				AskLevelEntity askPrice= new AskLevelEntity();
				askPrice.setCryptocurrencyName(e.name());
				askPrice.setPrice(event.getProviderBBOMap().getE55().getAskLevel().getPrice());
				askPrice.setQty(event.getProviderBBOMap().getE55().getAskLevel().getQty());
				askPrice.setCreatedAt(d);
				askRepo.save(askPrice);
				BidLevelEntity bidPrice= new BidLevelEntity();
				bidPrice.setCryptocurrencyName(e.name());
				bidPrice.setPrice(event.getProviderBBOMap().getE55().getBidLevel().getPrice());
				bidPrice.setQty(event.getProviderBBOMap().getE55().getBidLevel().getQty());
				bidPrice.setCreatedAt(d);
				bidRepo.save(bidPrice);
				
			}
			else if (e.name().equals("HUOBI"))
			{
				
				AskLevelEntity askPrice= new AskLevelEntity();
				askPrice.setCryptocurrencyName(e.name());
				askPrice.setPrice(event.getProviderBBOMap().getHUOBI().getAskLevel().getPrice());
				askPrice.setQty(event.getProviderBBOMap().getHUOBI().getAskLevel().getQty());
				askPrice.setCreatedAt(d);
				askRepo.save(askPrice);
				BidLevelEntity bidPrice= new BidLevelEntity();
				bidPrice.setCryptocurrencyName(e.name());
				bidPrice.setPrice(event.getProviderBBOMap().getHUOBI().getBidLevel().getPrice());
				bidPrice.setQty(event.getProviderBBOMap().getHUOBI().getBidLevel().getQty());
				bidPrice.setCreatedAt(d);
				bidRepo.save(bidPrice);
				
			}
		});
		
		
		return new ResponseEntity<EventModel>(event,HttpStatus.CREATED);
	}
	
	@GetMapping("/askLevel/getTimeRange")
	public ResponseEntity<Set<AskLevelEntity>> getTime() {
		log.info("/askLevel/getTimeRange");
		Set<AskLevelEntity> all=new HashSet<AskLevelEntity>((List<AskLevelEntity>)askRepo.findAll());
		return 
		new ResponseEntity<Set<AskLevelEntity>>(all,HttpStatus.OK);
	}
	
	@PostMapping("/formInput")
	public ResponseEntity<HistoricalData> formInput(@Valid @RequestBody FormInput input) throws JsonProcessingException 
	{
		
		List<AskLevelEntity>allAskLevel=(List<AskLevelEntity>)askRepo.getAllBasedOnParams(input.getStartTime(), input.getEndTime());
		List<BidLevelEntity>allBidLevel=(List<BidLevelEntity>)bidRepo.getAllBasedOnParams(input.getStartTime(), input.getEndTime());
		HistoricalData data= new HistoricalData();
		Set<Date>dates=new HashSet<Date>();
		if(!allAskLevel.isEmpty() && !allBidLevel.isEmpty())
		{
			allAskLevel.forEach(e->{
				if(e.getCryptocurrencyName().equalsIgnoreCase("HUOBI"))
				{
					data.getHuobi_ask().add(e.getPrice().toString());
				}
				else if(e.getCryptocurrencyName().equalsIgnoreCase("E55"))
				{
					data.getE55_ask().add(e.getPrice().toString());
				}
				else if(e.getCryptocurrencyName().equalsIgnoreCase("BITREX"))
				{
					data.getBitrex_ask().add(e.getPrice().toString());
				}
				else if(e.getCryptocurrencyName().equalsIgnoreCase("BINANCE"))
				{
					data.getBinance_ask().add(e.getPrice().toString());
				}
				
				dates.add(e.getCreatedAt());
				
			});
			data.setDates(new ArrayList<Date>(dates));
			allBidLevel.forEach(e->{
				if(e.getCryptocurrencyName().equalsIgnoreCase("HUOBI"))
				{
					data.getHuobi_bid().add(e.getPrice().toString());
				}
				else if(e.getCryptocurrencyName().equalsIgnoreCase("E55"))
				{
					data.getE55_bid().add(e.getPrice().toString());
				}
				else if(e.getCryptocurrencyName().equalsIgnoreCase("BITREX"))
				{
					data.getBitrex_bid().add(e.getPrice().toString());
				}
				else if(e.getCryptocurrencyName().equalsIgnoreCase("BINANCE"))
				{
					data.getBinance_bid().add(e.getPrice().toString());
				}
				

			});
		}
		
		
		return new ResponseEntity<HistoricalData>(data,HttpStatus.OK);
		
	}

}
