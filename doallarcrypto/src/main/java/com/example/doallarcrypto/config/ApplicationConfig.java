package com.example.doallarcrypto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.doallarcrypto.model.providerMaps.AskLevelEntity;
import com.example.doallarcrypto.model.providerMaps.BidLevelEntity;
@Configuration
public class ApplicationConfig implements WebMvcConfigurer  {

	/*Spring Data Rest hides the ID by default, in order to have it in the JSON you have to manually configure that for your entity. 
	Depending on your spring version you can either provide your own configuration (old):*/
	@Component
	public class ExposeEntityIdRestMvcConfiguration extends RepositoryRestConfigurerAdapter {

	  @Override
	  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
	    config.exposeIdsFor(BidLevelEntity.class);
	    config.exposeIdsFor(AskLevelEntity.class);
	  }
	}
	/*
	 * @Bean MappingJackson2HttpMessageConverter jacksonDateTimeConverter() {
	 * ObjectMapper objectMapper = new ObjectMapper();
	 * 
	 * objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
	 * objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
	 * objectMapper.registerModule(new JSR310Module());
	 * 
	 * MappingJackson2HttpMessageConverter converter = new
	 * MappingJackson2HttpMessageConverter();
	 * converter.setObjectMapper(objectMapper); return converter; }
	 */
    
	/*
	 * @Bean public FilterRegistrationBean corsFilter() {
	 * UrlBasedCorsConfigurationSource source = new
	 * UrlBasedCorsConfigurationSource(); CorsConfiguration config = new
	 * CorsConfiguration(); config.setAllowCredentials(true);
	 * config.addAllowedOrigin("*"); config.addAllowedHeader("*");
	 * config.addAllowedMethod("*"); source.registerCorsConfiguration("/**",
	 * config); FilterRegistrationBean bean = new FilterRegistrationBean(new
	 * CorsFilter(source)); bean.setOrder(0); return bean; }
	 */

}
