package com.sora.circuit.repository;

import com.sora.circuit.model.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {
    UserTeam findByUserId(Long userId);
}
