<?php
session_start();
header('Content-Type: application/json');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $email_or_username = trim($_POST['email']);
    $password = $_POST['password'];

    // Validate input
    if (empty($email_or_username) || empty($password)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please fill in all fields!'
        ]);
        exit;
    }

    // Check if user exists (by email or username)
    $stmt = $conn->prepare("SELECT id, username, email, password FROM users WHERE email = ? OR username = ?");
    $stmt->bind_param("ss", $email_or_username, $email_or_username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email/username or password!'
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    // Verify password (plain text comparison)
    if ($password === $user['password']) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];

        echo json_encode([
            'success' => true,
            'message' => 'Login successful! Redirecting...',
            'username' => $user['username'],
            'email' => $user['email']
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email/username or password!'
        ]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method!'
    ]);
}
?>