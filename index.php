<?php
    session_start();
if (!$_SESSION['login']) {
    header("Location: login.php");
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
    <a href="#" onclick="showHome()">Home</a>
    <a href="#">About Us</a>
    <a href="#">Contact</a>
    <a id="navbar-login" href="login.php">Login</a>
    <a id="navbar-register" href="register.php">Register</a>
    <a id="navbar-profile" href="profile.php">Profile</a>
    <a id="navbar-logout" href="logout.php" style="display: none">Logout</a>
    <button class="basket" style="float:right" onclick="toggleBasket()">&#128722;</button>
    <select name="category" id="category" onchange="fillByCategory()" style="float:right" >
        <option value="Category">Category</option>
        <option value="FPV Experience">FPV Experience</option>
        <option value="Aerial Cinematic">Aerial Cinematic</option>
        <option value="Aerial Photography">Aerial Photography</option>
    </select>
</div>

<div class="row" id="shop">
    <div class="leftcolumn" id="leftcolumn">

    </div>
    <div class="rightcolumn" style="display: none" id="add-product">
        <div class="card">
            <h3>Add Product</h3>
            <form>
                <p>Name</p>
                <input type="text" id="product_name" name="product_name" placeholder="Tello" required>
                <p>Price</p>
                <input type="number" id="product_price" name="product_price" placeholder="750" required>
                <p>Description</p>
                <textarea id="product_description"
                          name="product_description"
                          placeholder="Tello: an impressive little drone for kids and adults that’s a blast to fly and helps users learn about drones with coding education."
                          required></textarea>
                <p>Category</p>
                <input type="text" id="product_category" name="product_category" placeholder="Aerial Photography" required>
                <p>Image URL</p>
                <input type="url" id="product_image" name="product_image"
                       placeholder="https://bit.ly/3iUm1zl" required>
                <button class="button black-button" id="submit" onclick="addProduct()">Submit</button>
                <script>
                    document.getElementById("submit").addEventListener("click", function (event) {
                        event.preventDefault()
                    });
                </script>
            </form>
        </div>
    </div>
</div>

<div class="row" id="product" style="display: none">

</div>

<div class="row" id="basket" style="display: none">
    <div class="card">
        <h1 style="text-align: center">Shopping Cart</h1>
        <div id="basket_items">

        </div>
    </div>
</div>

<div class="row" id="checkout" style="display: none">
    <form action="index.html">
        <div class="card" style="display: flex; justify-content: center; padding-bottom: 20px">
            <div style="flex-basis: 35%; min-width: 571px">
                <h3>Billing Address</h3>
                <p>Full Name</p>
                <input type="text" id="fullName" name="firstname" placeholder="Mehmet F. Okuyan" required>
                <p>E-Mail</p>
                <input type="text" id="email" name="email" placeholder="mfo@mehmetfatih.com" required>
                <p>Address</p>
                <input type="text" id="address" name="address" placeholder="Emirbeyazıt Mah. Güven Sok." required>

                <div style="display: flex;">
                    <div style="flex-basis: 50%">
                        <p>District</p>
                        <input type="text" id="district" name="district" placeholder="Menteşe" required>
                    </div>
                    <div style="padding: 0 10px"></div>
                    <div style="flex-basis: 50%">
                        <p>City</p>
                        <input type="text" id="city" name="city" placeholder="Muğla" required>
                    </div>
                </div>
            </div>
            <div style="padding: 0 10px"></div>
            <div style="flex-basis: 35%; min-width: 571px">
                <h3>Payment</h3>
                <p>Payment Method</p>
                <div style="display: flex">
                    <button class="button selected-button" id="wire" onclick="hideCreditCard()">Wire Transfer</button>
                    <div style="padding: 0 10px"></div>
                    <button class="button selected-button" id="credit" onclick="showCreditCard()">Credit Card</button>
                </div>
                <div id="creditCard" style="display: none">
                    <p>Name on Card</p>
                    <input type="text" id="cname" name="cardname" placeholder="Mehmet Fatih Okuyan" required>
                    <p>Credit card number</p>
                    <input type="text" id="ccnumber" name="cardnumber" placeholder="1111-2222-3333-4444" required>

                    <div style="display: flex">
                        <div>
                            <p>Exp Month</p>
                            <input type="text" id="expmonth" name="expmonth" placeholder="01" required>
                        </div>
                        <div style="padding: 0 10px"></div>
                        <div>
                            <p>Exp Year</p>
                            <input type="text" id="expyear" name="expyear" placeholder="2024" required>
                        </div>
                        <div style="padding: 0 10px"></div>
                        <div>
                            <p>CVV</p>
                            <input type="text" id="cvv" name="cvv" placeholder="661" required>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <button class="button red-button" id="completeButton" type="submit">Complete Transaction</button>
    </form>
    <script>
        document.getElementById("wire").addEventListener("click", function (event) {
            event.preventDefault()
        });
        document.getElementById("credit").addEventListener("click", function (event) {
            event.preventDefault()
        });
    </script>

</div>

<div class="footer">
    <p>
        <span>Copyright © 2022</span> Mehmet Fatih Okuyan | Made with <span class="love">❤</span> in Mugla
    </p>
</div>

</body>
<script src="main.js"></script>
<script>
    <?php
    include "credentials.php";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM products";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $products = $stmt->fetchAll();

        echo "let db_products = " . json_encode($products) . ";" ;

    }
    catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    ?>

    function addItemToLeftColumn(item) {
        let productDiv = document.getElementById("leftcolumn");
        let product = item;
        productDiv.innerHTML += `
        <div class="item">
            <img class="product-image" src="${product.product_picture}" alt="${product.product_name}" onclick="showProduct(${product.product_id})">
            <h3 style="text-align: center">${product.product_name}</h3>
            <p style="text-align: center">${numberWithCommas(product.product_price)} ₺</p>
            <button class="button" onclick="addToBasket(${product.product_id})">Add to Cart</button>
        </div>
        `;
    }

    function fillPage() {

        for (let i = 0; i < db_products.length; i++) {
            addItemToLeftColumn(db_products[i]);
        }
    }

    fillPage()

    // Delete login and register from navbar and add logout
    document.getElementById("navbar-login").style.display = "none";
    document.getElementById("navbar-register").style.display = "none";
    document.getElementById("navbar-profile").style.display = "block";
    document.getElementById("navbar-logout").style.display = "block";


    // Check if the user is admin from the session
    let isAdmin = parseInt(<?php echo json_encode($_SESSION["user_is_admin"]); ?>);
    if (isAdmin) {
        document.getElementById("add-product").style.display = "block";
    }

    function fillByCategory() {
        let productDiv = document.getElementById("leftcolumn");
        productDiv.innerHTML = "";
        switch (document.getElementById("category").value) {
            case "Category":
                fillPage();
                break;

            case "FPV Experience":
                for (let i = 0; i < db_products.length; i++) {
                    if (db_products[i].product_category === "FPV Experience") {
                        addItemToLeftColumn(db_products[i]);
                    }
                }
                break;

            case "Aerial Cinematic":
                for (let i = 0; i < db_products.length; i++) {
                    if (db_products[i].product_category === "Aerial Cinematic") {
                        addItemToLeftColumn(db_products[i]);
                    }
                }
                break;

            case "Aerial Photography":
                for (let i = 0; i < db_products.length; i++) {
                    if (db_products[i].product_category === "Aerial Photography") {
                        addItemToLeftColumn(db_products[i]);
                    }
                }
                break;
        }
    }

</script>
</html>


