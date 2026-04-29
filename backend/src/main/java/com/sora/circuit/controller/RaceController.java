package com.sora.circuit.controller;

import com.sora.circuit.model.Race;
import com.sora.circuit.model.RaceResult;
import com.sora.circuit.service.RaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/races")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RaceController {
    private final RaceService raceService;

    @GetMapping
    public ResponseEntity<List<Race>> getAllRaces() {
        return ResponseEntity.ok(raceService.getAllRaces());
    }

    @GetMapping("/{id}/results")
    public ResponseEntity<List<RaceResult>> getRaceResults(@PathVariable Long id) {
        return ResponseEntity.ok(raceService.getRaceResults(id));
    }

    @PostMapping("/{id}/simulate")
    public ResponseEntity<List<RaceResult>> simulateRace(@PathVariable Long id) {
        return ResponseEntity.ok(raceService.simulateRace(id));
    }
}
