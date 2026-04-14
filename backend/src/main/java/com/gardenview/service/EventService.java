package com.gardenview.service;

import com.gardenview.model.Event;
import com.gardenview.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final EmailService emailService;

    public Event createEventInquiry(Event event) {
        event.setStatus(Event.Status.PENDING);
        Event savedEvent = eventRepository.save(event);
        emailService.sendEventInquiryNotification(savedEvent);
        return savedEvent;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event updateEventStatus(Long id, Event.Status status) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event inquiry not found"));
        event.setStatus(status);
        return eventRepository.save(event);
    }
}
