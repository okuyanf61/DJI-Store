<?php
error_reporting(0);
session_start();
include "credentials.php";
try {
    $connect = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if ($_POST['login']) {
        $user = $_POST['user_mail'];
        $pass = md5($_POST['user_password']);
        $sql = "SELECT * FROM users WHERE user_email='$user' and user_password='$pass'";
        $result = $connect->query($sql);
        $row = $result->fetch();
        if ($row['user_name'] != "") {
            $_SESSION['login'] = true;
            $_SESSION['user'] = $_POST['user_mail'];
            $_SESSION['user_is_admin'] = $row['user_is_admin'];
        } else {
            echo "Hatalı Giriş";
        }
    }
} catch (PDOException $ex) {
    print "Connection Failed" . $ex->getMessage();
}
$connect = null;
if ($_SESSION['login']) {
    header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>MFO Shop</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="main.css">
</head>
<body>

<div class="header">
    <h1>MFO Shop</h1>
    <p>MFO's online shopping site</p>
</div>

<div class="topnav">
    <a href="index.php"">Home</a>
    <a href="#">About Us</a>
    <a href="#">Contact</a>
</div>

<div class="row" id="shop">
    <div class="card">
        <h3>Login</h3>
        <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>"
        <p>E-Mail</p>
        <input type="text" id="user_mail" name="user_mail" placeholder="test@example.com" required>
        <p>Password</p>
        <input type="password" id="user_password" name="user_password" placeholder="********" required>
        <button class="button black-button" id="submit" type="submit" name="login" value="login">Login</button>
        </form>
    </div>
</div>


<div class="footer">
    <p>
        <span>Copyright © 2022</span> Mehmet Fatih Okuyan | Made with <span class="love">❤</span> in Mugla
    </p>
</div>
</body>
</html>