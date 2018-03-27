package com.bonc;

import javax.servlet.MultipartConfigElement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@SpringBootApplication
@Configuration
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper().disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    }
    
	 @Bean  
	 public WebMvcConfigurer corsConfigurer() {  
	     return new WebMvcConfigurerAdapter() {  
	         @Override  
	         public void addCorsMappings(CorsRegistry registry) {  
	             registry.addMapping("/api/*").allowedOrigins("*");  
	         }  
	     };
	 }
	 
	 	/**  
	     * 文件上传配置  
	     * @return  
	     */  
	    @Bean  
	    public MultipartConfigElement multipartConfigElement() {  
	        MultipartConfigFactory factory = new MultipartConfigFactory();  
	        //文件最大  
	        factory.setMaxFileSize("10240KB"); 
	        /// 设置总上传数据总大小  
	        factory.setMaxRequestSize("102400KB");  
	        return factory.createMultipartConfig();  
	    }  
	 
	 @Configuration
	 public class CorsConf {

	     @Bean
	     public CorsFilter corsFilter() {
	         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	         CorsConfiguration corsConfiguration = new CorsConfiguration();
	         corsConfiguration.addAllowedOrigin("*");
	         corsConfiguration.addAllowedHeader("*");
	         corsConfiguration.addAllowedMethod("*");
	         source.registerCorsConfiguration("/**", corsConfiguration);
	         return new CorsFilter(source);
	     }

	 }
	 
}
