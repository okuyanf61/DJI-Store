let products = []
let basket = []

class Product {
    constructor(id, name, price, description, category, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
    }
}

function numberWithCommas(x) {
    // Print numbers with dots as thousands separators
    // https://stackoverflow.com/a/2901298
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function addDefaultProducts() {
    products.push(new Product(1, "DJI FPV Combo", 5389, "DJI FPV turns your aerial imagination into reality. With this immersive, intuitive, and ready-to-fly FPV system, get ready to go into the beyond.", "images/fpv.png"));
    products.push(new Product(2, "Inspire 2", 62000, "Image quality, power and intelligence to meet the needs of professional filmmakers and enterprises around the globe.", "images/inspire2.png"));
    products.push(new Product(3, "DJI Mavic 3", 38402, "Mavic 3 comes with a 4/3 CMOS Hasselblad camera and is equipped with obstacle sensing and Advanced RTH.", "images/mavic3.png"));
    products.push(new Product(4, "DJI Mavic Air", 5999, "Mavic Air takes power and portability to the next level, offering advanced features in a compact form factor.", "images/mavicair.png"));
    products.push(new Product(5, "DJI Mini 2", 7999, "Small but mighty, DJI Mini 2 features 4K videos, 4x Zoom, and stunning panoramas, allowing you to explore a whole new perspective.", "images/mini2.png"));
    products.push(new Product(6, "DJI Mini SE", 5389, "The ultra-compact DJI Mini SE is the perfect companion for adventure. With a 30-min flight time and easy-to-use app, it's ideal for beginners.", "images/minise.png"));
    products.push(new Product(7, "Phantom 4 Pro V2.0", 67000, "1-inch 20MP Exmor R CMOS sensor, longer flight time and smarter features.", "images/phantom4pro.png"));
    products.push(new Product(8, "SPARK", 7495, "Meet Spark, a mini drone that features all of DJI's signature technologies, allowing you to seize the moment whenever you feel inspired. With intelligent flight control options, a mechanical gimbal, and a camera with incredible image quality, Spark empowers you to push your creative boundaries.", "images/spark.png"));
}

function addItemToLeftColumn(item) {
    let productDiv = document.getElementById("leftcolumn");
    let product = item;
    productDiv.innerHTML += `
        <div class="item">
            <img class="product-image" src="${product.image}" alt="${product.name}" onclick="showProduct(${product.id})">
            <h3 style="text-align: center">${product.name}</h3>
            <p style="text-align: center">${numberWithCommas(product.price)} ₺</p>
            <button class="button" onclick="addToBasket(${product.id})">Add to Cart</button>
        </div>
        `;
}

function fillPage() {

    for (let i = 0; i < products.length; i++) {
        addItemToLeftColumn(products[i]);
    }
}

function addProduct() {
    let product_name = document.getElementById("product_name").value;
    let product_price = document.getElementById("product_price").value;
    let product_description = document.getElementById("product_description").value;
    let product_image = document.getElementById("product_image").value;

    if (product_name === "" || product_price === "" || product_description === "" || product_image === "") {
        alert("Please fill all the fields!");
    } else {
        let new_product = new Product(products.length + 1, product_name, parseInt(product_price), product_description, product_image);
        products.push(new_product);
        addItemToLeftColumn(new_product);
        document.getElementById("product_name").value = "";
        document.getElementById("product_price").value = "";
        document.getElementById("product_description").value = "";
        document.getElementById("product_image").value = "";
    }

}

function addToBasket(product_id) {
    basket.push(products[product_id - 1]);
    hideProduct();
}

function showProduct(product_id) {
    let product = products[product_id - 1];
    document.getElementById("shop").style.display = "none";
    document.getElementById("product").style.display = "block";
    document.getElementById("product").innerHTML = `
    <div class="card">
        <h1 style="text-align: center">${product.name}</h1>
        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        <div style="display: flex; align-items: center">
        <div style="flex-basis: 50%">
        <img class="product-image" src="${product.image}" alt="${product.name}"  onclick="hideProduct()"">
        </div>
        <div style="flex-basis: 50%">
        <p style="text-align: justify">${product.description}</p>
        <h3 style="text-align: left">${numberWithCommas(product.price)} ₺</h3>
        </div>
        </div>
        <button class="button" onclick="addToBasket(${product_id})">Add to Cart</button>
    </div>`;
}

function hideProduct() {
    document.getElementById("shop").style.display = "block";
    document.getElementById("product").style.display = "none";
}

function toggleBasket() {
    if (document.getElementById("basket").style.display === "none") {
        document.getElementById("shop").style.display = "none";
        document.getElementById("product").style.display = "none";
        document.getElementById("checkout").style.display = "none";
        document.getElementById("basket").style.display = "block";

        let basketDiv = document.getElementById("basket_items");
        if (basket.length > 0) {

            basketDiv.innerHTML = `
                <table>
                    <tbody id="basket_item_table_body">
                    <tr>
                        <th>Product</th>
                        <th style="text-align: right">Price</th>
                    </tr>
                    </tbody>
                </table>`;

            let table = document.getElementById("basket_item_table_body");

            for (let i = 0; i < basket.length; i++) {
                let product = basket[i];
                table.innerHTML += `
                <tr>
                    <td>${product.name}</td>
                    <td style="text-align: right">${numberWithCommas(product.price)} ₺</td>
                </tr>
                `;
            }

            basketDiv.innerHTML += `
                <hr style="height:2px;border-width:0;color:gray;background-color:gray">
                <div>
                <h3 style="text-align: right">Total Price: ${numberWithCommas(totalPrice())} ₺</h3>
                </div>
                <div style="display: flex">
                <button class="button white-button" onclick="toggleBasket()">Continue Shopping</button>
                <div style="padding: 0 10px"></div>
                <button class="button" onclick="checkout()">Checkout</button>
                </div>
            `;

        } else {
            basketDiv.innerHTML = `
            <div class="item">
                <h2 style="text-align: center; color: red">Your Shopping Cart is Empty</h2>
            </div>
            <button class="button white-button" id="checkout" onclick="toggleBasket()">Continue Shopping</button>
            `;
        }

    } else {
        document.getElementById("basket").style.display = "none";
        document.getElementById("shop").style.display = "block";
    }
}

function totalPrice() {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
        total += basket[i].price;
    }
    return total;
}

function checkout() {
    document.getElementById("basket").style.display = "none";
    document.getElementById("checkout").style.display = "block";
    document.getElementById("completeButton").style.pointerEvents = "none";

}

function showCreditCard() {
    document.getElementById("creditCard").style.display = "block";
    removeClass(document.getElementById("completeButton"), "red-button");
    document.getElementById("completeButton").style.pointerEvents = "";
    document.getElementById("cname").required = true;
    document.getElementById("ccnumber").required = true;
    document.getElementById("expmonth").required = true;
    document.getElementById("expyear").required = true;
    document.getElementById("cvv").required = true;
}

function hideCreditCard() {
    document.getElementById("creditCard").style.display = "none";
    removeClass(document.getElementById("completeButton"), "red-button");
    document.getElementById("completeButton").style.pointerEvents = "";
    document.getElementById("cname").required = false;
    document.getElementById("ccnumber").required = false;
    document.getElementById("expmonth").required = false;
    document.getElementById("expyear").required = false;
    document.getElementById("cvv").required = false;

}

function showHome() {
    document.getElementById("shop").style.display = "block";
    document.getElementById("product").style.display = "none";
    document.getElementById("checkout").style.display = "none";
    document.getElementById("basket").style.display = "none";}

function removeClass(element, className) {
    element.classList.remove(className);
}
