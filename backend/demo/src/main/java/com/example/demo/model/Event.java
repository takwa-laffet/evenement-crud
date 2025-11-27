package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
@Data // Lombok: generates getters, setters, toString, etc.
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime date;

    private String lieu;
    private Double prix;
    private Long organisateurId;
    private String imageUrl;
    private Integer nbPlaces;
    private Integer nbrLikes;

    @ElementCollection
    @CollectionTable(name = "event_domaines", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "domaine")
    private List<String> domaines;
}