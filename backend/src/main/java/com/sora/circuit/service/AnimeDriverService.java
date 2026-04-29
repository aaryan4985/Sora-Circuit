package com.sora.circuit.service;

import com.sora.circuit.model.AnimeDriver;
import com.sora.circuit.repository.AnimeDriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimeDriverService {
    private final AnimeDriverRepository driverRepository;

    public List<AnimeDriver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public List<AnimeDriver> searchDriversBySeries(String series) {
        return driverRepository.findByAnimeSeriesContainingIgnoreCase(series);
    }

    public AnimeDriver getDriverById(Long id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));
    }
}
