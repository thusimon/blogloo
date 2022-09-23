package com.utticus.blogloo.model;

public class AuthJwt {
    private String jwt;

    public AuthJwt() {}

    public AuthJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
