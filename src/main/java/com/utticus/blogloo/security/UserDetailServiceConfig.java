package com.utticus.blogloo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class UserDetailServiceConfig {
    @Bean
    public InMemoryUserDetailsManager userDetailsService(BCryptPasswordEncoder bCryptPasswordEncoder) {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        // String password = bCryptPasswordEncoder.encode("pwd_plain_text");
        UserDetails user = User
                .builder()
                .username("utticus")
                .password("$2a$10$y7C5sD728jqouXlhVhzW4eceGwHZ5HG.CC1dWeTS3SguDWgEFngCe")
                .authorities("USER", "ADMIN")
                .build();
        manager.createUser(user);
        return manager;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
