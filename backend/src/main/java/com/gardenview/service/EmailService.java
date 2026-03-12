package com.gardenview.service;

import com.gardenview.model.Booking;
import com.gardenview.model.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendBookingConfirmation(Booking booking) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(booking.getUser().getEmail());
        message.setSubject("Booking Confirmation - Garden View Resort");
        message.setText("Dear " + booking.getUser().getName() + ",\n\n" +
                "Your booking for " + booking.getRoom().getRoomType() + " is confirmed.\n" +
                "Check-in: " + booking.getCheckIn() + "\n" +
                "Check-out: " + booking.getCheckOut() + "\n" +
                "Total Amount: ₹" + booking.getTotalAmount() + "\n\n" +
                "Thank you for choosing Garden View Resort!");
        mailSender.send(message);
    }

    public void sendEventInquiryNotification(Event event) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("gardenviewresort2026@gmail.com"); // Admin email
        message.setSubject("New Event Inquiry - " + event.getEventType());
        message.setText("New inquiry received:\n" +
                "Name: " + event.getName() + "\n" +
                "Phone: " + event.getPhone() + "\n" +
                "Event Type: " + event.getEventType() + "\n" +
                "Date: " + event.getEventDate() + "\n" +
                "Guests: " + event.getGuestsCount() + "\n" +
                "Message: " + event.getMessage());
        mailSender.send(message);
    }
}
