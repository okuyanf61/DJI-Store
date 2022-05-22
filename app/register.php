<?php
error_reporting(0);
session_start();
include "credentials.php";
$register = false;
try {
    $connect = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if ($_POST['register']) {
        $user_name = $_POST['user_name'];
        $user_surname = $_POST['user_surname'];
        $user_email = $_POST['user_email'];
        $user_password = md5($_POST['user_password']);
        $user_gender = $_POST['user_gender'];
        $user_website = $_POST['user_website'];
        $sql = "INSERT INTO users (user_id, user_name, user_surname, user_email, user_password, user_gender, user_website, user_is_admin) VALUES (NULL, '$user_name', '$user_surname', '$user_email', '$user_password', '$user_gender', '$user_website', '0');";
        $result = $connect->query($sql);
        $register = true;
    }
} catch (PDOException $ex) {
    print "Connection Failed" . $ex->getMessage();
}
$connect = null;
if ($register) {
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
    <a href="login.php">Login</a>
</div>

<div class="row" id="shop">
    <div class="card">
        <h3>Register</h3>
        <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF'])?>">
            <p>Name</p>
            <input type="text" id="user_name" name="user_name" placeholder="Ahmet" required>
            <p>Surname</p>
            <input type="text" id="user_surname" name="user_surname" placeholder="Boyacı" required>
            <p>E-mail</p>
            <input type="email" id="user_email" name="user_email" placeholder="ahmet@boyaci.com" required>
            <p>Password</p>
            <input type="password" id="user_password" name="user_password" placeholder="**********" required>
            <p>Gender</p>
            <input type="text" id="user_gender" name="user_gender" placeholder="Male">
            <p>Website</p>
            <input type="url" id="user_website" name="user_website" placeholder="https://boyaci.com">
            <button class="button black-button" id="submit" type="submit" name="register" value="register">Register</button>
            </script>
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