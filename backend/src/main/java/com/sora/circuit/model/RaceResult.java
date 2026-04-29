package com.sora.circuit.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "race_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RaceResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "race_id", nullable = false)
    private Race race;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private AnimeDriver driver;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private UserTeam team; // Optional, if we want to track which team owned this driver at the time

    @Column(nullable = false)
    private int position;

    @Column(nullable = false)
    private int pointsEarned;

    private String remark; // e.g., "Used special ability on lap 10!"
}
