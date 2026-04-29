package com.sora.circuit.config;

import com.sora.circuit.model.AnimeDriver;
import com.sora.circuit.model.Race;
import com.sora.circuit.repository.AnimeDriverRepository;
import com.sora.circuit.repository.RaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    @Bean
    public CommandLineRunner seedData(AnimeDriverRepository driverRepository, RaceRepository raceRepository) {
        return args -> {
            if (driverRepository.count() == 0) {
                List<AnimeDriver> drivers = List.of(
                        AnimeDriver.builder().name("Naruto Uzumaki").animeSeries("Naruto").cost(15).speed(90).cornering(80).overtaking(95).reliability(75).specialAbility("Nine-Tails Chakra Boost").build(),
                        AnimeDriver.builder().name("Levi Ackerman").animeSeries("Attack on Titan").cost(20).speed(95).cornering(98).overtaking(90).reliability(85).specialAbility("ODMG Grapple").build(),
                        AnimeDriver.builder().name("Satoru Gojo").animeSeries("Jujutsu Kaisen").cost(25).speed(100).cornering(100).overtaking(100).reliability(95).specialAbility("Limitless Teleport").build(),
                        AnimeDriver.builder().name("Monkey D. Luffy").animeSeries("One Piece").cost(18).speed(85).cornering(90).overtaking(95).reliability(99).specialAbility("Gear 4th Bounce").build(),
                        AnimeDriver.builder().name("Killua Zoldyck").animeSeries("Hunter x Hunter").cost(16).speed(96).cornering(95).overtaking(88).reliability(80).specialAbility("Godspeed").build(),
                        AnimeDriver.builder().name("Goku").animeSeries("Dragon Ball").cost(25).speed(100).cornering(85).overtaking(95).reliability(90).specialAbility("Instant Transmission").build(),
                        AnimeDriver.builder().name("Edward Elric").animeSeries("Fullmetal Alchemist").cost(14).speed(80).cornering(90).overtaking(85).reliability(92).specialAbility("Alchemy Shortcut").build(),
                        AnimeDriver.builder().name("Izuku Midoriya").animeSeries("My Hero Academia").cost(12).speed(88).cornering(82).overtaking(85).reliability(70).specialAbility("One For All 100%").build(),
                        AnimeDriver.builder().name("Spike Spiegel").animeSeries("Cowboy Bebop").cost(10).speed(85).cornering(92).overtaking(80).reliability(85).specialAbility("Swordfish II Summon").build(),
                        AnimeDriver.builder().name("Saitama").animeSeries("One Punch Man").cost(24).speed(100).cornering(70).overtaking(90).reliability(100).specialAbility("Serious Sprint").build()
                );
                driverRepository.saveAll(drivers);
            }

            if (raceRepository.count() == 0) {
                List<Race> races = List.of(
                        Race.builder().name("Neo Tokyo Grand Prix").circuit("Akira Speedway").scheduledTime(LocalDateTime.now().plusDays(1)).isCompleted(false).build(),
                        Race.builder().name("Wall Maria Sprint").circuit("Shiganshina District").scheduledTime(LocalDateTime.now().plusDays(7)).isCompleted(false).build(),
                        Race.builder().name("Hidden Leaf Rally").circuit("Konoha Mountain Track").scheduledTime(LocalDateTime.now().plusDays(14)).isCompleted(false).build()
                );
                raceRepository.saveAll(races);
            }
        };
    }
}
