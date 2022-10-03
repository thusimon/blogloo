package com.utticus.blogloo.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AuthJwtTests {
    @Test
    public void testSetter() {
        AuthJwt authJwt = new AuthJwt();
        authJwt.setJwt("some.jwt");
        assertEquals(authJwt.getJwt(), "some.jwt");
    }
}
