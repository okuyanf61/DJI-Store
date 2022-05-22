<?php
session_start();
if (!$_SESSION['login']) {
    header("Location: login.php");
}
include "credentials.php";
$update = false;
$delete = false;
$register = false;

try {
    $connect = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if ($_POST['update']) {
        $product_id = $_POST['product_id'];
        $product_name = $_POST['product_name'];
        $product_price = $_POST['product_price'];
        $product_description = $_POST['product_description'];
        $product_category = $_POST['product_category'];
        $product_image = $_POST['product_image'];
        $sql = "UPDATE products SET product_name = '$product_name', product_price = '$product_price', product_description = '$product_description', product_category = '$product_category', product_image = '$product_image' WHERE products.product_id = '$product_id';";
        $result = $connect->query($sql);
        $update = true;
    }
    if ($_POST['delete']) {
        $product_id = $_POST['product_id'];
        $sql = "DELETE FROM products WHERE products.product_id = '$product_id';";
        $result = $connect->query($sql);
        $delete = true;
    }
    if ($_POST['submit']) {
        $product_name = $_POST['product_name'];
        $product_price = $_POST['product_price'];
        $product_description = $_POST['product_description'];
        $product_category = $_POST['product_category'];
        $product_image = $_POST['product_image'];
        $sql = "INSERT INTO products (product_id, product_name, product_price, product_description, product_category, product_image) VALUES (NULL, '$product_name', '$product_price', '$product_description', '$product_category', '$product_image');";
        $result = $connect->query($sql);
        $register = true;
    }
} catch (PDOException $ex) {
    print "Connection Failed" . $ex->getMessage();
}
$connect = null;
if ($update || $delete || $register) {
    header("Location: index.php");
}
?>