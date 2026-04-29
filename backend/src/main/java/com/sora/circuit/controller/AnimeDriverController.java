package com.sora.circuit.controller;

import com.sora.circuit.model.AnimeDriver;
import com.sora.circuit.service.AnimeDriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Update in prod
public class AnimeDriverController {
    private final AnimeDriverService driverService;

    @GetMapping
    public ResponseEntity<List<AnimeDriver>> getAllDrivers(
            @RequestParam(required = false) String series) {
        if (series != null && !series.isEmpty()) {
            return ResponseEntity.ok(driverService.searchDriversBySeries(series));
        }
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimeDriver> getDriverById(@PathVariable Long id) {
        return ResponseEntity.ok(driverService.getDriverById(id));
    }
}
