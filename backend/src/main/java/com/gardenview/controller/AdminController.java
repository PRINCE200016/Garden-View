package com.gardenview.controller;

import com.gardenview.dto.BookingResponseDTO;
import com.gardenview.model.Booking;
import com.gardenview.service.BookingService;
import com.gardenview.service.EventService;
import com.gardenview.model.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final BookingService bookingService;
    private final EventService eventService;

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PutMapping("/bookings/{id}/confirm")
    public ResponseEntity<BookingResponseDTO> confirmBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.updateStatus(id, Booking.Status.CONFIRMED));
    }

    @PutMapping("/bookings/{id}/cancel")
    public ResponseEntity<BookingResponseDTO> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.updateStatus(id, Booking.Status.CANCELLED));
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/revenue/monthly")
    public ResponseEntity<Map<String, Double>> getMonthlyRevenue() {
        List<BookingResponseDTO> bookings = bookingService.getAllBookings().stream()
                .filter(b -> b.getStatus() == Booking.Status.CONFIRMED)
                .collect(Collectors.toList());

        double totalRevenue = bookings.stream().mapToDouble(BookingResponseDTO::getTotalAmount).sum();
        return ResponseEntity.ok(Map.of("totalRevenue", totalRevenue));
    }
}
