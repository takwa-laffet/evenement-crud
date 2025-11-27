package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        event.setTitre(eventDetails.getTitre());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());
        event.setLieu(eventDetails.getLieu());
        event.setPrix(eventDetails.getPrix());
        event.setOrganisateurId(eventDetails.getOrganisateurId());
        event.setImageUrl(eventDetails.getImageUrl());
        event.setNbPlaces(eventDetails.getNbPlaces());
        event.setNbrLikes(eventDetails.getNbrLikes());
        event.setDomaines(eventDetails.getDomaines());

        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}