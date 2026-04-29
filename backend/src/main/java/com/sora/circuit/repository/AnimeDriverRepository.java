package com.sora.circuit.repository;

import com.sora.circuit.model.AnimeDriver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimeDriverRepository extends JpaRepository<AnimeDriver, Long> {
    List<AnimeDriver> findByAnimeSeriesContainingIgnoreCase(String series);
}
