package com.utticus.blogloo.controller;

import com.utticus.blogloo.model.AuthCredentials;
import com.utticus.blogloo.model.AuthJwt;
import com.utticus.blogloo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/token")
    @ResponseBody
    public AuthJwt auth(@RequestBody AuthCredentials authCredentials) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authCredentials.getUsername(),
                            authCredentials.getPassword())
            );
        } catch(BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authCredentials.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        return new AuthJwt(jwt);
    }

    @PostMapping("/validate")
    @ResponseBody
    public boolean validate(@RequestBody AuthJwt authJwt) {
        String jwt = authJwt.getJwt();
        if (jwt == null || jwt.isBlank()) {
            return false;
        }
        return jwtUtil.isTokenExpired(jwt);
    }
}
