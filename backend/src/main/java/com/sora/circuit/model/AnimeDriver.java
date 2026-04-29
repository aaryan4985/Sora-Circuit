package com.sora.circuit.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "anime_drivers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimeDriver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String animeSeries;

    private String imageUrl;

    @Column(nullable = false)
    private int cost;

    // Stats (0-100)
    private int speed;
    private int cornering;
    private int overtaking;
    private int reliability;

    @Column(nullable = false)
    private String specialAbility;
}
