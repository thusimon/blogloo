package com.utticus.blogloo.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.UUID;

@Component
public class IDGenerator implements IdentifierGenerator {
    private final Base64.Encoder encoder = Base64.getUrlEncoder();

    @Override
    public Serializable generate(SharedSessionContractImplementor sharedSessionContractImplementor, Object o) throws HibernateException {
        return generate();
    }

    public String generate() {
        // Create random UUID
        UUID uuid = UUID.randomUUID();

        // Create byte[] for base64 from uuid
        byte[] src = ByteBuffer.wrap(new byte[16])
                .putLong(uuid.getMostSignificantBits())
                .putLong(uuid.getLeastSignificantBits())
                .array();

        // Encode to Base64 and remove trailing ==
        return encoder.encodeToString(src).substring(0, 22);
    }
}
