CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    features TEXT,
    phone VARCHAR(15),
    hours VARCHAR(255)
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    date DATE,
    time TIME,
    guests INT
);

CREATE TABLE careers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    location VARCHAR(255),
    department VARCHAR(255),
    description TEXT
);

CREATE TABLE gift_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2),
    buyer_name VARCHAR(255),
    buyer_email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Active'
);

CREATE TABLE memberships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    points INT DEFAULT 0
);
