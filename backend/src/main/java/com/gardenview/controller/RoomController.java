package com.gardenview.controller;

import com.gardenview.model.Room;
import com.gardenview.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomRepository roomRepository;

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomRepository.save(room));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomType(roomDetails.getRoomType());
        room.setDescription(roomDetails.getDescription());
        room.setBasePrice(roomDetails.getBasePrice());
        room.setWeekendPrice(roomDetails.getWeekendPrice());
        room.setTotalRooms(roomDetails.getTotalRooms());

        return ResponseEntity.ok(roomRepository.save(room));
    }
}
