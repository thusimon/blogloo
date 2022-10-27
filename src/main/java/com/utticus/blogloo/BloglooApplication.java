package com.utticus.blogloo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BloglooApplication {
	public static void main(String[] args) {
		SpringApplication.run(BloglooApplication.class, args);
	}

}
