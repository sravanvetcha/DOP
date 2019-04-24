package com.example.doallarcrypto.model.providerMaps;

import com.example.doallarcrypto.model.providerMaps.ProviderBBOMap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@AllArgsConstructor
@Getter
@Setter
@Data
public class EventModel 
{
	private ProviderBBOMap providerBBOMap;

	public EventModel() {
		super();
	}
	
}
