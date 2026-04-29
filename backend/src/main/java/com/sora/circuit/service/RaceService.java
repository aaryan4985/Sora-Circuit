package com.sora.circuit.service;

import com.sora.circuit.model.AnimeDriver;
import com.sora.circuit.model.Race;
import com.sora.circuit.model.RaceResult;
import com.sora.circuit.repository.AnimeDriverRepository;
import com.sora.circuit.repository.RaceRepository;
import com.sora.circuit.repository.RaceResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RaceService {
    private final RaceRepository raceRepository;
    private final RaceResultRepository raceResultRepository;
    private final AnimeDriverRepository driverRepository;
    private final Random random = new Random();

    public List<Race> getAllRaces() {
        return raceRepository.findAll();
    }

    public List<RaceResult> getRaceResults(Long raceId) {
        return raceResultRepository.findByRaceIdOrderByPositionAsc(raceId);
    }

    @Transactional
    public List<RaceResult> simulateRace(Long raceId) {
        Race race = raceRepository.findById(raceId)
                .orElseThrow(() -> new RuntimeException("Race not found"));

        if (race.isCompleted()) {
            throw new RuntimeException("Race already simulated");
        }

        List<AnimeDriver> drivers = driverRepository.findAll();
        if (drivers.isEmpty()) {
            throw new RuntimeException("No drivers available for race");
        }

        // Simple simulation logic: base score = stats + randomness
        List<DriverPerformance> performances = new ArrayList<>();
        for (AnimeDriver driver : drivers) {
            int score = driver.getSpeed() * 2 + driver.getCornering() + driver.getOvertaking() + driver.getReliability();
            
            // Random factor
            int randomFactor = random.nextInt(50);
            
            // Special ability chance
            boolean usedAbility = random.nextInt(100) > 80;
            if (usedAbility) {
                score += 50; // Boost
            }

            score += randomFactor;
            
            performances.add(new DriverPerformance(driver, score, usedAbility));
        }

        // Sort by score descending
        performances.sort((p1, p2) -> Integer.compare(p2.score, p1.score));

        List<RaceResult> results = new ArrayList<>();
        int[] pointsSystem = {25, 18, 15, 12, 10, 8, 6, 4, 2, 1}; // F1 points system

        for (int i = 0; i < performances.size(); i++) {
            DriverPerformance perf = performances.get(i);
            int points = i < pointsSystem.length ? pointsSystem[i] : 0;
            
            String remark = "Solid race.";
            if (perf.usedAbility) {
                remark = "Triggered Special Ability: " + perf.driver.getSpecialAbility() + "!";
            } else if (i == 0) {
                remark = "Dominant victory!";
            }

            RaceResult result = RaceResult.builder()
                    .race(race)
                    .driver(perf.driver)
                    .position(i + 1)
                    .pointsEarned(points)
                    .remark(remark)
                    .build();
            
            results.add(raceResultRepository.save(result));
        }

        race.setCompleted(true);
        raceRepository.save(race);

        return results;
    }

    private static class DriverPerformance {
        AnimeDriver driver;
        int score;
        boolean usedAbility;

        DriverPerformance(AnimeDriver driver, int score, boolean usedAbility) {
            this.driver = driver;
            this.score = score;
            this.usedAbility = usedAbility;
        }
    }
}
