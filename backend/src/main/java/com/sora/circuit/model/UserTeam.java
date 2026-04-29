package com.sora.circuit.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_teams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String teamName;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany
    @JoinTable(
        name = "team_drivers",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "driver_id")
    )
    private Set<AnimeDriver> drivers = new HashSet<>();

    private int budgetRemaining;
    private int totalPoints;
}
