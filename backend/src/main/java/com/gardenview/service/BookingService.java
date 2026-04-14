package com.gardenview.service;

import com.gardenview.dto.BookingRequestDTO;
import com.gardenview.dto.BookingResponseDTO;
import com.gardenview.model.Booking;
import com.gardenview.model.Room;
import com.gardenview.model.User;
import com.gardenview.repository.BookingRepository;
import com.gardenview.repository.RoomRepository;
import com.gardenview.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final GstService gstService;
    private final EmailService emailService;

    @Transactional
    public BookingResponseDTO createBooking(BookingRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!isRoomAvailable(room.getId(), dto.getCheckIn(), dto.getCheckOut())) {
            throw new RuntimeException("No rooms available for selected dates");
        }

        long nightsCount = ChronoUnit.DAYS.between(dto.getCheckIn(), dto.getCheckOut());
        if (nightsCount <= 0)
            throw new RuntimeException("Check-out must be after check-in");

        double rate = calculateRate(room, dto.getCheckIn());
        double subtotal = rate * nightsCount;
        double gst = gstService.calculateGst(rate, subtotal);

        Booking booking = Booking.builder()
                .user(user)
                .room(room)
                .checkIn(dto.getCheckIn())
                .checkOut(dto.getCheckOut())
                .guests(dto.getGuests())
                .nights((int) nightsCount)
                .subtotal(subtotal)
                .gstAmount(gst)
                .totalAmount(subtotal + gst)
                .status(Booking.Status.PENDING)
                .paymentStatus("UNPAID")
                .build();

        Booking saved = bookingRepository.save(booking);
        emailService.sendBookingConfirmation(saved);

        return mapToResponseDTO(saved);
    }

    public boolean isRoomAvailable(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow();
        long occupied = bookingRepository.countOverlappingBookings(roomId, checkIn, checkOut);
        return occupied < room.getTotalRooms();
    }

    private double calculateRate(Room room, LocalDate checkIn) {
        int dayOfWeek = checkIn.getDayOfWeek().getValue();
        if ((dayOfWeek == 5 || dayOfWeek == 6) && room.getWeekendPrice() != null) {
            return room.getWeekendPrice();
        }
        return room.getBasePrice();
    }

    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public BookingResponseDTO updateStatus(Long id, Booking.Status status) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(status);
        return mapToResponseDTO(bookingRepository.save(booking));
    }

    private BookingResponseDTO mapToResponseDTO(Booking booking) {
        return BookingResponseDTO.builder()
                .id(booking.getId())
                .userName(booking.getUser().getName())
                .userEmail(booking.getUser().getEmail())
                .userPhone(booking.getUser().getPhone())
                .roomType(booking.getRoom().getRoomType())
                .checkIn(booking.getCheckIn())
                .checkOut(booking.getCheckOut())
                .nights(booking.getNights())
                .subtotal(booking.getSubtotal())
                .gstAmount(booking.getGstAmount())
                .totalAmount(booking.getTotalAmount())
                .status(booking.getStatus())
                .paymentStatus(booking.getPaymentStatus())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
