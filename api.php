<?php
// Database connection
$host = "localhost";
$db_name = "sirc";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    echo "Connection error: " . $exception->getMessage();
    exit();
}

// Utility function to send JSON response
function sendResponse($status, $data) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

// Handle requests
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

if (strpos($requestUri, '/locations') !== false) {
    handleLocations($requestMethod);
} elseif (strpos($requestUri, '/reservations') !== false) {
    handleReservations($requestMethod);
} elseif (strpos($requestUri, '/careers') !== false) {
    handleCareers($requestMethod);
} elseif (strpos($requestUri, '/giftcards') !== false) {
    handleGiftCards($requestMethod);
} elseif (strpos($requestUri, '/memberships') !== false) {
    handleMemberships($requestMethod);
} else {
    sendResponse(404, ["message" => "Endpoint not found"]);
}

// Locations CRUD
function handleLocations($method) {
    global $conn;
    if ($method === 'GET') {
        $stmt = $conn->query("SELECT * FROM locations");
        sendResponse(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO locations (name, address, latitude, longitude, features, phone, hours) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['name'], $data['address'], $data['latitude'], $data['longitude'], $data['features'], $data['phone'], $data['hours']]);
        sendResponse(201, ["message" => "Location added successfully"]);
    }
}

// Reservations CRUD
function handleReservations($method) {
    global $conn;
    if ($method === 'GET') {
        $stmt = $conn->query("SELECT * FROM reservations");
        sendResponse(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO reservations (name, email, date, time, guests) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['name'], $data['email'], $data['date'], $data['time'], $data['guests']]);
        sendResponse(201, ["message" => "Reservation added successfully"]);
    }
}

// Careers CRUD
function handleCareers($method) {
    global $conn;
    if ($method === 'GET') {
        $stmt = $conn->query("SELECT * FROM careers");
        sendResponse(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}

// Gift Cards CRUD
function handleGiftCards($method) {
    global $conn;
    if ($method === 'GET') {
        $stmt = $conn->query("SELECT * FROM gift_cards");
        sendResponse(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO gift_cards (amount, buyer_name, buyer_email, status) VALUES (?, ?, ?, 'Active')");
        $stmt->execute([$data['amount'], $data['buyer_name'], $data['buyer_email']]);
        sendResponse(201, ["message" => "Gift Card purchased successfully"]);
    }
}

// Memberships CRUD
function handleMemberships($method) {
    global $conn;
    if ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO memberships (first_name, last_name, email, password, points) VALUES (?, ?, ?, ?, 0)");
        $stmt->execute([$data['first_name'], $data['last_name'], $data['email'], $hashedPassword]);
        sendResponse(201, ["message" => "Membership created successfully"]);
    }
}
?>
