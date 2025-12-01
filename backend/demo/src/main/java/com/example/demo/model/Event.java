package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
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

    // Change date type from LocalDateTime to String
    private String date;

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
