package com.gardenview.service;

import org.springframework.stereotype.Service;

@Service
public class GstService {

    public double calculateGst(double roomPrice, double subtotal) {
        if (roomPrice <= 1000) {
            return 0;
        } else if (roomPrice <= 7500) {
            return subtotal * 0.12;
        } else {
            return subtotal * 0.18;
        }
    }
}
