package com.gardenview.dto;

import com.gardenview.model.Booking;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class BookingResponseDTO {
    private Long id;
    private String userName;
    private String roomType;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer nights;
    private Double subtotal;
    private Double gstAmount;
    private Double totalAmount;
    private Booking.Status status;
    private String paymentStatus;
    private LocalDateTime createdAt;
}
