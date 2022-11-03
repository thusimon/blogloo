package com.utticus.blogloo.jpa;

import com.utticus.blogloo.entity.IpCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface IPCountRepo extends JpaRepository<IpCount, Integer> {
    @Query(value = "SELECT * FROM ip_count where ip=?1", nativeQuery = true)
    Optional<IpCount> findByIP(String ip);

    @Query(value = "SELECT * FROM ip_count where visit_time between ?1 and ?2", nativeQuery = true)
    Optional<IpCount> findByDateRange(Date start, Date end);
}
