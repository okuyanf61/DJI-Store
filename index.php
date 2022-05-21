<?php
    session_start();
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
    <button class="basket" style="float:right" onclick="toggleBasket()">&#128722;</button>
</div>

<div class="row" id="shop">
    <div class="leftcolumn" id="leftcolumn">

    </div>
    <div class="rightcolumn" style="display: none">
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
</html>


