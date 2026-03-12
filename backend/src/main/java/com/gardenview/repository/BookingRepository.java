package com.gardenview.repository;

import com.gardenview.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;

public interface BookingRepository extends JpaRepository<Booking, Long> {
        @Query("SELECT COUNT(b) FROM Booking b WHERE b.room.id = :roomId " +
                        "AND b.status != 'CANCELLED' " +
                        "AND (b.checkIn < :checkOut AND b.checkOut > :checkIn)")
        long countOverlappingBookings(@Param("roomId") Long roomId,
                        @Param("checkIn") LocalDate checkIn,
                        @Param("checkOut") LocalDate checkOut);
}
