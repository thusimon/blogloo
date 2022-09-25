package com.utticus.blogloo.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {
    @Value("${blogloo.security.jwt.secret:default}")
    String secret;

    /**
     * minimum SHA_256 secretKey string length.
     */
    private static final int SHA_256_SECRET_CHAR_SIZE = 256 / 8;

    /**
     * Token validity time(ms).
     */
    private final long tokenValidityInMilliseconds = 1000 * 60 * 60 * 24L;
    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        //use default secretKey for SHA-256
        if (secret == null) {
            this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        } else {
            //use custom secretKey
            int size = secret.length();
            int left = SHA_256_SECRET_CHAR_SIZE - size;
            if (left > 0) {
                //character for padding
                StringBuilder stringBuilder = new StringBuilder(secret);
                for (int i = 0; i < left; i++) {
                    stringBuilder.append(i % 10);
                }
                this.secretKey = Keys.hmacShaKeyFor(stringBuilder.toString().getBytes());
            } else {
                this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
            }
        }
    }
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails);
    }

    private String createToken(Map<String, Object> claims, UserDetails userDetails) {
        long curTime = System.currentTimeMillis();
        String subject = userDetails.getUsername();
        List authorities = userDetails.getAuthorities()
                .stream().map(authority -> authority.toString()).toList();
        claims.put("rol", String.join(" ", authorities));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(curTime))
                .setExpiration(new Date(curTime + this.tokenValidityInMilliseconds))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public boolean validateTokenWithRole(String token, UserDetails userDetails, String role) {
        Claims claims = extractAllClaims(token);
        final String username = claims.getSubject();
        final String roles = claims.get("rol", String.class);
        final Date exp = claims.getExpiration();
        return username != null && roles != null
                && username.equals(userDetails.getUsername())
                && roles.contains(role)
                && exp.after(new Date());
    }
}
