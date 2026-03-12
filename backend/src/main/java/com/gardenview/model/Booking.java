package com.gardenview.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(nullable = false)
    private java.time.LocalDate checkIn;

    @Column(nullable = false)
    private java.time.LocalDate checkOut;

    private Integer guests;
    private Integer nights;

    private Double subtotal;
    private Double gstAmount;
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String paymentStatus;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum Status {
        PENDING, CONFIRMED, CANCELLED
    }
}
