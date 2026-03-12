package com.gardenview.config;

import com.gardenview.model.MenuItem;
import com.gardenview.repository.MenuItemRepository;
import com.gardenview.model.Room;
import com.gardenview.repository.RoomRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(RoomRepository repository, MenuItemRepository menuRepository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(Room.builder()
                        .roomType("Deluxe Garden View Room")
                        .description("Elegant AC rooms with nature view")
                        .basePrice(2499.0)
                        .weekendPrice(2499.0)
                        .totalRooms(10)
                        .build());

                repository.save(Room.builder()
                        .roomType("Executive Suite")
                        .description("Premium suite with luxury amenities")
                        .basePrice(3199.0)
                        .weekendPrice(3199.0)
                        .totalRooms(5)
                        .build());
            }

            if (menuRepository.count() == 0) {
                // 1. TANDOOR
                menuRepository.save(new MenuItem(null, "Butter Roti", "Freshly baked", 25.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Plain Roti", "Traditional whole wheat", 20.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Missi Roti", "Gram flour and spices", 35.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Butter Naan", "Leavened bread with butter", 75.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Garlic Naan", "Leavened bread with garlic", 90.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Laccha Paratha", "Layered whole wheat bread", 75.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Tawa Roti", "Flat griddle bread", 25.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Tawa Butter Roti", "Buttered griddle bread", 30.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Plain Paratha Tawa", "Plain layered flatbread", 50.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Stuff Parantha", "Stuffed wheat bread", 100.0, "TANDOOR", true, null, null));
                menuRepository.save(new MenuItem(null, "Stuff Naan", "Stuffed leavened bread", 100.0, "TANDOOR", true, null, null));

                // SWEET ICECREAMS
                menuRepository.save(new MenuItem(null, "Vanilla", "Classic vanilla flavor", 90.0, "SWEET ICECREAMS", true, null, null));
                menuRepository.save(new MenuItem(null, "Chocolate", "Rich chocolate flavor", 120.0, "SWEET ICECREAMS", true, null, null));
                menuRepository.save(new MenuItem(null, "Butter Scotch", "Crunchy butter scotch", 120.0, "SWEET ICECREAMS", true, null, null));
                menuRepository.save(new MenuItem(null, "Gulab Jamun", "Syrup-soaked warm balls", 85.0, "SWEET ICECREAMS", true, null, null));

                // 2. MUTTON
                menuRepository.save(new MenuItem(null, "Mutton Masala (4 Pcs)", "Spiced mutton gravy", 450.0, "MUTTON", true, null, null));
                menuRepository.save(new MenuItem(null, "Mutton Curry", "Traditional mutton stew", 450.0, "MUTTON", true, null, null));
                menuRepository.save(new MenuItem(null, "Mutton Handi", "Slow-cooked in a handi", 550.0, "MUTTON", true, null, null));
                menuRepository.save(new MenuItem(null, "Mutton Rogan Josh (4 Pcs)", "Authentic Kashmiri style", 600.0, "MUTTON", true, null, null));

                // EGGS
                menuRepository.save(new MenuItem(null, "Egg Fried Rice", "Wok-tossed with eggs", 225.0, "EGGS", true, null, null));
                menuRepository.save(new MenuItem(null, "Egg Curry", "Spiced egg gravy", 220.0, "EGGS", true, null, null));
                menuRepository.save(new MenuItem(null, "Egg Masala", "Thick egg masala", 229.0, "EGGS", true, null, null));
                menuRepository.save(new MenuItem(null, "Egg Chilli", "Spicy Indo-Chinese eggs", 210.0, "EGGS", true, null, null));
                menuRepository.save(new MenuItem(null, "Egg Bhurji", "Scrambled spiced eggs", 150.0, "EGGS", true, null, null));
                menuRepository.save(new MenuItem(null, "Masala Omlette", "Indian herb omelette", 150.0, "EGGS", true, null, null));
                menuRepository.save(new MenuItem(null, "Bread Omlette", "Quick comfort food", 160.0, "EGGS", true, null, null));
                menuRepository.save(new MenuItem(null, "Boiled Egg", "Simple protein", 90.0, "EGGS", true, null, null));
                menuRepository.save(new MenuItem(null, "Egg Pakoda", "Egg fritters", 180.0, "EGGS", true, null, null));

                // 3. SIZZLER
                menuRepository.save(new MenuItem(null, "Chinese Chicken Sizzler", "Sizzling Indo-Chinese chicken", 600.0, "SIZZLER", true, null, null));
                menuRepository.save(new MenuItem(null, "Tandoori Chicken Sizzler", "Sizzling tandoori favorite", 639.0, "SIZZLER", true, null, null));
                menuRepository.save(new MenuItem(null, "Chinese Veg Sizzler", "Veg sizzler platter", 415.0, "SIZZLER", true, null, null));
                menuRepository.save(new MenuItem(null, "Tandoori Veg Sizzler", "Grilled veg sizzler", 419.0, "SIZZLER", true, null, null));

                // CHICKEN (HALF | FULL)
                menuRepository.save(new MenuItem(null, "Chicken Curry (Half)", "Classic chicken gravy", 350.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Curry (Full)", "Classic chicken gravy", 560.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Masala (Half)", "Rich spiced chicken", 350.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Masala (Full)", "Rich spiced chicken", 600.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Butter Chicken (Half)", "Creamy tomato delight", 380.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Butter Chicken (Full)", "Creamy tomato delight", 750.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Handi Chicken (Half)", "Traditional pot cooking", 380.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Handi Chicken (Full)", "Traditional pot cooking", 750.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Kadai Chicken (Half)", "Bell peppers and spices", 350.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Kadai Chicken (Full)", "Bell peppers and spices", 610.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Tikka Masala (Half)", "Grilled chicken gravy", 390.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Tikka Masala (Full)", "Grilled chicken gravy", 639.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Do Pyaza", "Plenty of onions", 620.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken shag wala (Half)", "With fresh spinach", 350.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken shag wala (Full)", "With fresh spinach", 550.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Bundeli (Half)", "Regional Chhatarpur style", 350.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Bundeli (Full)", "Regional Chhatarpur style", 550.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Black Paper (Half)", "Peppery and bold", 380.0, "CHICKEN", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Black Paper (Full)", "Peppery and bold", 750.0, "CHICKEN", true, null, null));

                // 4. NON-VEG SOUPS
                menuRepository.save(new MenuItem(null, "Chicken Hot Sour Soup", "Zesty and spicy", 150.0, "NON-VEG SOUPS", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Manchow Soup", "Garlic and ginger notes", 150.0, "NON-VEG SOUPS", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Sweet Corn", "Smooth and creamy", 150.0, "NON-VEG SOUPS", true, null, null));
                menuRepository.save(new MenuItem(null, "Cream of Chicken Soup", "Rich chicken cream", 180.0, "NON-VEG SOUPS", true, null, null));

                // TANDOORI/GRILLED (HALF | FULL)
                menuRepository.save(new MenuItem(null, "Tanduri Chicken (Half)", "Clay-oven grilled", 355.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Tanduri Chicken (Full)", "Clay-oven grilled", 555.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Tikka", "Spiced boneless pieces", 535.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Malai Tikka", "Creamy mild kebab", 560.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Hariyali Tikka", "Green mint marinade", 540.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken 65 (Half)", "Spicy deep fried", 320.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken 65 (Full)", "Spicy deep fried", 560.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Lemon Chicken (Half)", "Tangy and citrusy", 340.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Lemon Chicken (Full)", "Tangy and citrusy", 590.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Manchurian", "Indo-Chinese style", 350.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chilli Chicken", "Spicy stir-fry", 340.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Garlic Chicken", "Bold garlic flavor", 340.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Kati Roll", "Served in a wrap", 250.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Chouwmein", "Noodles with chicken", 300.0, "TANDOORI/GRILLED", true, null, null));
                menuRepository.save(new MenuItem(null, "Chicken Fried Rice", "Meal in itself", 300.0, "TANDOORI/GRILLED", true, null, null));

                // 5. VEG MAIN COURSE
                menuRepository.save(new MenuItem(null, "Bhindi Kurkuri", "Crispy fried okra", 250.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Dum Aalu Punjabi", "Potatoes in rich gravy", 240.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Bhindi Masala", "Spiced dry okra", 220.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Kadai Veg", "Mixed veg in wok", 220.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Kofta", "Vegetable dumplings", 220.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Mix Veg", "Assorted seasonal veg", 210.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Chana Masala", "Spiced chickpeas", 210.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Aloo Gobhi", "Potatoes and cauliflower", 195.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Aloo Jeera", "Potatoes with cumin", 190.0, "VEG MAIN COURSE", true, null, null));
                menuRepository.save(new MenuItem(null, "Aloo Matar", "Potatoes and peas", 190.0, "VEG MAIN COURSE", true, null, null));

                // DAALS
                menuRepository.save(new MenuItem(null, "Yellow Dal", "Light yellow lentils", 175.0, "DAALS", true, null, null));
                menuRepository.save(new MenuItem(null, "Dal Fry", "Lentils with tempering", 185.0, "DAALS", true, null, null));
                menuRepository.save(new MenuItem(null, "Dal Tadka", "Spiced garlic tempering", 195.0, "DAALS", true, null, null));
                menuRepository.save(new MenuItem(null, "Dal Makhani", "Creamy black lentils", 245.0, "DAALS", true, null, null));

                // 6. STARTERS VEG
                menuRepository.save(new MenuItem(null, "Paneer Tikka", "Spiced grilled paneer", 295.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Achari Tikka", "Pickle flavored", 295.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Hariyali Paneer Tikka", "Green marinade", 315.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Malai Tikka", "Milk and cream marinade", 275.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Burji", "Scrambled paneer", 170.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Fresh Mushroom Tikka", "Double mushroom delight", 315.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Mushroom Chilli", "Spicy Indo-Chinese", 275.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Hara Bhara Kabab", "Spinach and pea patty", 180.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Dahi Kabab", "Hung curd patties", 200.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Cutlet", "Crispy veg patties", 180.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Pakoda", "Fritters", 160.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Pakoda", "Paneer fritters", 190.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Peanut Masala", "Crunchy and spicy", 155.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Chana Roast", "Roasted chickpeas", 155.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Crispy Corn", "Spicy corn fry", 200.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Honey Chilli Potato", "Sweet and spicy fries", 210.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "French Fries", "Classic potato fries", 180.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Chilli Chana", "Spicy fried gram", 200.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Manchurian", "Indo-Chinese veg balls", 235.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer kati Roll", "Paneer wrap", 200.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Kati Roll", "Veg wrap", 150.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Chilli Paneer", "Paneer stir-fry", 275.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Chouwmein", "Stir fried noodles", 170.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Hakka Noodles", "Garlic flavored noodles", 170.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Singapuri Noodles", "Curry flavor noodles", 219.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Chilli Garlic Noodles", "Bold aromatic noodles", 180.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Fried Rice", "Vegetable tossed rice", 210.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Spring Roll", "Crispy veg rolls", 210.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer 65", "Spicy paneer deep fry", 265.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Crispy", "Batter fried assorted veg", 285.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Kothey", "Indo-Tibetan delight", 210.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Crispy Baby Corn (Half)", "Mini corn fry", 219.0, "STARTERS VEG", true, null, null));
                menuRepository.save(new MenuItem(null, "Crispy Baby Corn (Full)", "Mini corn fry", 250.0, "STARTERS VEG", true, null, null));

                // 7. CURD RAITA
                menuRepository.save(new MenuItem(null, "Plain Curd", "Fresh yogurt", 80.0, "CURD RAITA", true, null, null));
                menuRepository.save(new MenuItem(null, "Bundi Raita", "Gram puffs in curd", 119.0, "CURD RAITA", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Raita", "Mixed veg in curd", 119.0, "CURD RAITA", true, null, null));
                menuRepository.save(new MenuItem(null, "Fruit Raita", "Sweet fruits in curd", 160.0, "CURD RAITA", true, null, null));

                // PAPAD SALAD
                menuRepository.save(new MenuItem(null, "Dry Papad", "Roasted lentil cracker", 35.0, "PAPAD SALAD", true, null, null));
                menuRepository.save(new MenuItem(null, "Fry Papad", "Fried lentil cracker", 40.0, "PAPAD SALAD", true, null, null));
                menuRepository.save(new MenuItem(null, "Masala Papad", "Cracker with spiced onion", 55.0, "PAPAD SALAD", true, null, null));
                menuRepository.save(new MenuItem(null, "Cucumber Salad", "Fresh slices", 115.0, "PAPAD SALAD", true, null, null));
                menuRepository.save(new MenuItem(null, "Kachumber Salad", "Diced veg mix", 115.0, "PAPAD SALAD", true, null, null));
                menuRepository.save(new MenuItem(null, "Green Salad", "Healthy assorted slices", 95.0, "PAPAD SALAD", true, null, null));
                menuRepository.save(new MenuItem(null, "Onion Salad", "Sliced onions", 85.0, "PAPAD SALAD", true, null, null));

                // RICE
                menuRepository.save(new MenuItem(null, "Jeera Rice (Half)", "Cumin flavored", 100.0, "RICE", true, null, null));
                menuRepository.save(new MenuItem(null, "Stream Rice", "Plain boiled rice", 145.0, "RICE", true, null, null));
                menuRepository.save(new MenuItem(null, "Jeera Rice (Full)", "Cumin flavored", 170.0, "RICE", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Pulao", "Vegetable mixed rice", 210.0, "RICE", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Biryani", "Aromatic slow-cooked", 245.0, "RICE", true, null, null));
                menuRepository.save(new MenuItem(null, "Hyderabadi Biryani", "Spicy and fragrant", 265.0, "RICE", true, null, null));

                // 8. MAIN COURSE PANEER
                menuRepository.save(new MenuItem(null, "Kaju Masala", "Rich cashewnut gravy", 360.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Chefs Special Paneer", "Secret house specialty", 350.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Kaju Curry", "Creamy cashewnut dish", 350.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Tikka Masala", "Grilled paneer gravy", 295.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Angara", "Spicy and smoky", 295.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Lababdar", "Rich and luscious", 295.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Punjabi Paneer", "Bold North Indian style", 295.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Shahi Paneer", "Royally creamy", 295.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Butter Masala", "Classic tomato cream", 280.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Kadai Paneer", "Peppers and wok cooked", 280.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Kaleji", "Tender and flavorful", 280.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Do Pyaza", "Plenty of onions", 280.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Handi Paneer", "Pot cooked", 280.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Matar Paneer", "Peas and cheese", 240.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Palak Paneer", "Spinach and cheese", 240.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Malai Kofta", "Soft creamy dumplings", 280.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Mushroom Masala", "Spiced mushroom gravy", 305.0, "MAIN COURSE PANEER", true, null, null));
                menuRepository.save(new MenuItem(null, "Mushroom Matar", "Mushrooms and peas", 265.0, "MAIN COURSE PANEER", true, null, null));

                // 9. BREAKFAST
                menuRepository.save(new MenuItem(null, "Bread Butter", "Standard breakfast", 95.0, "BREAKFAST", true, null, null));
                menuRepository.save(new MenuItem(null, "Butter Toast", "Crispy breakfast", 100.0, "BREAKFAST", true, null, null));
                menuRepository.save(new MenuItem(null, "Poha", "Flat rice specialty", 100.0, "BREAKFAST", true, null, null));
                menuRepository.save(new MenuItem(null, "Aloo Paratha with Curd", "Stuffed potato bread", 110.0, "BREAKFAST", true, null, null));
                menuRepository.save(new MenuItem(null, "Gobhi Paratha", "Stuffed cauliflower bread", 110.0, "BREAKFAST", true, null, null));
                menuRepository.save(new MenuItem(null, "Paneer Paratha with Curd", "Stuffed paneer bread", 140.0, "BREAKFAST", true, null, null));
                menuRepository.save(new MenuItem(null, "Puri Bhaji", "Bread with spiced potato", 160.0, "BREAKFAST", true, null, null));
                menuRepository.save(new MenuItem(null, "Chhole Bhature", "Spiced chickpeas and fried bread", 170.0, "BREAKFAST", true, null, null));

                // SOUPS (VEG)
                menuRepository.save(new MenuItem(null, "Cream of Tomato", "Classic tomato soup", 150.0, "SOUPS (VEG)", true, null, null));
                menuRepository.save(new MenuItem(null, "Cream of Vegetables", "Assorted veg cream", 150.0, "SOUPS (VEG)", true, null, null));
                menuRepository.save(new MenuItem(null, "Lemon Coriander", "Zesty and refreshing", 150.0, "SOUPS (VEG)", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Hot and Sour", "Spicy and tangy", 150.0, "SOUPS (VEG)", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Manchow", "Garlic and ginger mix", 150.0, "SOUPS (VEG)", true, null, null));
                menuRepository.save(new MenuItem(null, "Veg Sweet Corn", "Mild and creamy", 150.0, "SOUPS (VEG)", true, null, null));

                // 10. MOCKTAILS
                menuRepository.save(new MenuItem(null, "Guava Mary", "Zesty guava drink", 299.0, "MOCKTAILS", true, null, null));
                menuRepository.save(new MenuItem(null, "Berry Blossom", "Sweet berry mix", 299.0, "MOCKTAILS", true, null, null));
                menuRepository.save(new MenuItem(null, "Blue Lagoon", "Cooling blue drink", 299.0, "MOCKTAILS", true, null, null));
                menuRepository.save(new MenuItem(null, "Virgin Mojito", "Classic mint and lime", 299.0, "MOCKTAILS", true, null, null));
                menuRepository.save(new MenuItem(null, "Pina Colada", "Pineapple and coconut", 299.0, "MOCKTAILS", true, null, null));
                menuRepository.save(new MenuItem(null, "Fruit Punch", "Multi-fruit splash", 299.0, "MOCKTAILS", true, null, null));
                menuRepository.save(new MenuItem(null, "Orange Squash", "Zesty orange drink", 299.0, "MOCKTAILS", true, null, null));
                menuRepository.save(new MenuItem(null, "Pink Panther", "Sweet pink delight", 299.0, "MOCKTAILS", true, null, null));

                // 11. SHAKES
                menuRepository.save(new MenuItem(null, "Banana Protein Shake", "Energy booster", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Chocolate Lover", "Deep chocolate flavor", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Nutella Shake", "Hazelnut chocolate", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Strawberry Shake", "Fresh strawberry mix", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Rose Cardamom", "Aromatic floral", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Oreo Shake", "Cookies and cream", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Pineapple Shake", "Tangy and sweet", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Bubblegum Shake", "Fun sweetness", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Popcorn Shake", "Caramelized popcorn", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Salt Thandai Shake", "Traditional savory-sweet", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Mango Shake", "Seasonal king flavor", 250.0, "SHAKES", true, null, null));
                menuRepository.save(new MenuItem(null, "Cherry Frappe", "Chilled cherry mix", 250.0, "SHAKES", true, null, null));

                // 12. BEVERAGES
                menuRepository.save(new MenuItem(null, "Mineral Water", "Bottled", 30.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Premium Water", "Elite bottled", 49.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Tea Ready Made", "Hot spiced tea", 25.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Lemon Soda", "Fizzy lime", 80.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Hot Coffee", "Classic black/milk", 40.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Hot Flavor Coffee", "Aromatic flavored", 130.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Lassi", "Yogurt drink", 60.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Butter Milk", "Refreshing salty", 40.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Soda", "Plane fizzy", 55.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Coke Can", "Chilled can", 70.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Thumbs Up/Sprite/Coca-Cola", "Bottled soft drinks", 70.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Bournvita Milk", "Chocolatey hot", 60.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Hot Chocolate Milk", "Warm cocoa drink", 75.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Red Bull", "Energy drink", 185.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Fresh Lime Water", "Cool lime juice", 70.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Peach Ice Tea", "Chilled peach tea", 110.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Strawberry Ice Tea", "Chilled strawberry tea", 110.0, "BEVERAGES", true, null, null));
                menuRepository.save(new MenuItem(null, "Juices", "Fresh seasonal juices", 120.0, "BEVERAGES", true, null, null));
            }

        };
    }


}
