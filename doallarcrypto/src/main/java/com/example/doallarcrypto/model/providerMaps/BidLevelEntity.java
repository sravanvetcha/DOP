package com.example.doallarcrypto.model.providerMaps;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="bidlevel")
@AllArgsConstructor
@Getter
@Setter
@Data
public class BidLevelEntity  implements  Serializable{
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(updatable=false, unique=true, nullable=false)
	private Long id;
	private BigDecimal price;
	private BigDecimal qty;
	private String cryptocurrencyName;
	
	@Column(name = "created_at")
	  public Date createdAt;
	 
	public BidLevelEntity() {
		super();
	}
	
}
