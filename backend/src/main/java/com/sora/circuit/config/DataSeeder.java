package com.sora.circuit.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.sora.circuit.model.AnimeDriver;
import com.sora.circuit.model.Race;
import com.sora.circuit.repository.AnimeDriverRepository;
import com.sora.circuit.repository.RaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CommandLineRunner seedData(AnimeDriverRepository driverRepository, RaceRepository raceRepository, RestTemplate restTemplate) {
        return args -> {
            Random random = new Random();

            if (driverRepository.count() == 0) {
                log.info("Fetching Top Anime Characters from Jikan API...");
                List<AnimeDriver> drivers = new ArrayList<>();
                try {
                    JsonNode response = restTemplate.getForObject("https://api.jikan.moe/v4/top/characters?limit=15", JsonNode.class);
                    if (response != null && response.has("data")) {
                        for (JsonNode character : response.get("data")) {
                            String name = character.get("name").asText();
                            String imageUrl = character.path("images").path("jpg").path("image_url").asText();
                            
                            // Generate random stats
                            int speed = 70 + random.nextInt(31);
                            int cornering = 70 + random.nextInt(31);
                            int overtaking = 70 + random.nextInt(31);
                            int reliability = 70 + random.nextInt(31);
                            int cost = 10 + random.nextInt(16); // 10-25
                            
                            drivers.add(AnimeDriver.builder()
                                    .name(name)
                                    .animeSeries("Top Anime Universe") // Jikan top characters doesn't include series directly
                                    .imageUrl(imageUrl)
                                    .cost(cost)
                                    .speed(speed)
                                    .cornering(cornering)
                                    .overtaking(overtaking)
                                    .reliability(reliability)
                                    .specialAbility("Ultimate Zone")
                                    .build());
                        }
                    }
                } catch (Exception e) {
                    log.error("Failed to fetch from Jikan API, using fallback data. Error: " + e.getMessage());
                }

                if (drivers.isEmpty()) {
                    // Fallback
                    drivers.add(AnimeDriver.builder().name("Naruto Uzumaki").animeSeries("Naruto").cost(15).speed(90).cornering(80).overtaking(95).reliability(75).specialAbility("Nine-Tails Chakra Boost").build());
                    drivers.add(AnimeDriver.builder().name("Levi Ackerman").animeSeries("Attack on Titan").cost(20).speed(95).cornering(98).overtaking(90).reliability(85).specialAbility("ODMG Grapple").build());
                }
                
                driverRepository.saveAll(drivers);
                log.info("Saved {} Anime Drivers.", drivers.size());
            }

            if (raceRepository.count() == 0) {
                log.info("Fetching Current F1 Calendar from Ergast API...");
                List<Race> races = new ArrayList<>();
                try {
                    JsonNode response = restTemplate.getForObject("http://ergast.com/api/f1/current.json", JsonNode.class);
                    if (response != null && response.path("MRData").path("RaceTable").has("Races")) {
                        for (JsonNode raceNode : response.path("MRData").path("RaceTable").path("Races")) {
                            String name = raceNode.get("raceName").asText();
                            String circuit = raceNode.path("Circuit").get("circuitName").asText();
                            String dateStr = raceNode.get("date").asText();
                            
                            LocalDateTime scheduledTime = LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay();
                            
                            races.add(Race.builder()
                                    .name(name)
                                    .circuit(circuit)
                                    .scheduledTime(scheduledTime)
                                    .isCompleted(false)
                                    .build());
                        }
                    }
                } catch (Exception e) {
                    log.error("Failed to fetch from Ergast API, using fallback data. Error: " + e.getMessage());
                }

                if (races.isEmpty()) {
                    races.addAll(List.of(
                            Race.builder().name("Neo Tokyo Grand Prix").circuit("Akira Speedway").scheduledTime(LocalDateTime.now().plusDays(1)).isCompleted(false).build(),
                            Race.builder().name("Wall Maria Sprint").circuit("Shiganshina District").scheduledTime(LocalDateTime.now().plusDays(7)).isCompleted(false).build()
                    ));
                }
                
                raceRepository.saveAll(races);
                log.info("Saved {} Races.", races.size());
            }
        };
    }
}
