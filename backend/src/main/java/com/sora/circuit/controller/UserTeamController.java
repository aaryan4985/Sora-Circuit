package com.sora.circuit.controller;

import com.sora.circuit.model.UserTeam;
import com.sora.circuit.service.UserTeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserTeamController {
    private final UserTeamService teamService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserTeam> getTeamByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(teamService.getTeamByUserId(userId));
    }

    @PostMapping("/{teamId}/draft/{driverId}")
    public ResponseEntity<UserTeam> draftDriver(@PathVariable Long teamId, @PathVariable Long driverId) {
        return ResponseEntity.ok(teamService.draftDriver(teamId, driverId));
    }

    @DeleteMapping("/{teamId}/remove/{driverId}")
    public ResponseEntity<UserTeam> removeDriver(@PathVariable Long teamId, @PathVariable Long driverId) {
        return ResponseEntity.ok(teamService.removeDriver(teamId, driverId));
    }
}
