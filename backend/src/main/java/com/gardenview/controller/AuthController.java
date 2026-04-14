package com.gardenview.controller;

import com.gardenview.dto.AuthResponse;
import com.gardenview.dto.LoginRequest;
import com.gardenview.model.User;
import com.gardenview.repository.UserRepository;
import com.gardenview.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email:gardenviewresort2026@gmail.com}")
    private String adminEmail;

    @Value("${admin.password:gardenviewadmin26}")
    private String adminPassword;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(AuthResponse.builder()
                .token(token)
                .name(user.getName())
                .role(user.getRole().name())
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.ok(userRepository.findByEmail(user.getEmail()).get());
        }
        user.setRole(User.Role.CUSTOMER);
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    // Primary admin setup endpoint
    @PostMapping("/setup-admin")
    public ResponseEntity<String> setupAdmin() {
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = User.builder()
                    .name("Garden View Admin")
                    .email(adminEmail)
                    .phone("07460005296")
                    .password(passwordEncoder.encode(adminPassword))
                    .role(com.gardenview.model.User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            return ResponseEntity.ok("Primary admin created successfully!");
        }
        return ResponseEntity.badRequest().body("Admin already exists");
    }
}
