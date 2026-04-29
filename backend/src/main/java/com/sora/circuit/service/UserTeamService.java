package com.sora.circuit.service;

import com.sora.circuit.model.AnimeDriver;
import com.sora.circuit.model.UserTeam;
import com.sora.circuit.repository.AnimeDriverRepository;
import com.sora.circuit.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserTeamService {
    private final UserTeamRepository teamRepository;
    private final AnimeDriverRepository driverRepository;

    public UserTeam getTeamByUserId(Long userId) {
        return teamRepository.findByUserId(userId);
    }

    @Transactional
    public UserTeam draftDriver(Long teamId, Long driverId) {
        UserTeam team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        AnimeDriver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        if (team.getDrivers().size() >= 5) {
            throw new RuntimeException("Team is full (max 5 drivers)");
        }

        if (team.getDrivers().contains(driver)) {
            throw new RuntimeException("Driver already in team");
        }

        if (team.getBudgetRemaining() < driver.getCost()) {
            throw new RuntimeException("Not enough budget");
        }

        team.getDrivers().add(driver);
        team.setBudgetRemaining(team.getBudgetRemaining() - driver.getCost());
        
        return teamRepository.save(team);
    }

    @Transactional
    public UserTeam removeDriver(Long teamId, Long driverId) {
        UserTeam team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        AnimeDriver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        if (team.getDrivers().remove(driver)) {
            team.setBudgetRemaining(team.getBudgetRemaining() + driver.getCost());
        }

        return teamRepository.save(team);
    }
}
