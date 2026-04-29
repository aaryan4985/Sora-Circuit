package com.sora.circuit.repository;

import com.sora.circuit.model.RaceResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RaceResultRepository extends JpaRepository<RaceResult, Long> {
    List<RaceResult> findByRaceIdOrderByPositionAsc(Long raceId);
}
