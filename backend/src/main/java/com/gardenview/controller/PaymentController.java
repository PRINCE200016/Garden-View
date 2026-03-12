package com.gardenview.controller;

import com.gardenview.model.Booking;
import com.gardenview.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final BookingRepository bookingRepository;

    @PostMapping("/process")
    public ResponseEntity<?> processPayment(@RequestBody Map<String, Object> paymentData) {
        Long bookingId = Long.valueOf(paymentData.get("bookingId").toString());
        String status = paymentData.get("status").toString();

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if ("SUCCESS".equalsIgnoreCase(status)) {
            booking.setStatus(Booking.Status.CONFIRMED);
            bookingRepository.save(booking);
            return ResponseEntity.ok(Map.of("message", "Payment successful and booking confirmed"));
        } else {
            booking.setStatus(Booking.Status.CANCELLED);
            bookingRepository.save(booking);
            return ResponseEntity.badRequest().body(Map.of("message", "Payment failed. Booking cancelled."));
        }
    }
}
