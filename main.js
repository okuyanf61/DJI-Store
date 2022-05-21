let basket = []

function numberWithCommas(x) {
    // Print numbers with dots as thousands separators
    // https://stackoverflow.com/a/2901298
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    let product = db_products[product_id - 1];
    document.getElementById("shop").style.display = "none";
    document.getElementById("product").style.display = "block";
    document.getElementById("product").innerHTML = `
    <div class="card">
        <h1 style="text-align: center">${product.product_name}</h1>
        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        <div style="display: flex; align-items: center">
        <div style="flex-basis: 50%">
        <img class="product-image" src="${product.product_picture}" alt="${product.product_name}"  onclick="hideProduct()"">
        </div>
        <div style="flex-basis: 50%">
        <p style="text-align: justify">${product.product_description}</p>
        <h5 style="text-align: left">${product.product_category}</h5>
        <h3 style="text-align: left">${numberWithCommas(product.product_price)} ₺</h3>
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
