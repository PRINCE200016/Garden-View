package com.gardenview.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Double price;

    private String category; // Starters, Main Course, Drinks, etc.

    @Builder.Default
    private Boolean available = true;

    private String imageUrl;

    private LocalDateTime createdAtAt;

    @PrePersist
    protected void onCreate() {
        createdAtAt = LocalDateTime.now();
    }
}
