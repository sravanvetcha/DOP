package com.example.doallarcrypto.model.providerMaps;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Data
public class FormInput {
	private Date startTime;
	private Date endTime;
	public FormInput() {
		super();
	}
	

}
