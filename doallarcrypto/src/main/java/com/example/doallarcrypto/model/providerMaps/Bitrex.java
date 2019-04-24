package com.example.doallarcrypto.model.providerMaps;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Data
public class Bitrex {

	private BidLevel bidLevel;
	private AskLevel askLevel;
	public Bitrex() {
		super();
	}
	
}
