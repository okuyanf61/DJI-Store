let basket = JSON.parse(sessionStorage.getItem("basket")) || [];

function numberWithCommas(x) {
    // Print numbers with dots as thousands separators
    // https://stackoverflow.com/a/2901298
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function addToBasket(product_id) {
    // Check if product is already in basket
    let product = db_products.filter(i => i.product_id == product_id)[0];
    let product_in_basket = basket.filter(i => i.product_id == product_id);
    if (product_in_basket.length > 0) {
        increaseCount(product_id);
    } else {
        product.count = 1;
        basket.push(product);
        sessionStorage.setItem("basket", JSON.stringify(basket));
    }
    let basket_icon = document.getElementById("basket-icon");
    basket_icon.style.backgroundColor = "green";
    setTimeout(() => {
        basket_icon.style.backgroundColor = "#333";
    }, 500);
    hideProduct();
}

function deleteFromBasket(product_id) {
    let product_index = basket.findIndex(i => i.product_id == product_id);
    basket.splice(product_index, 1);
    sessionStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
}

function increaseCount(product_id) {
    let product = basket.filter(i => i.product_id == product_id)[0];
    product.count++;
    let index_of_product = basket.findIndex(product => product.product_id == product_id);
    console.log(index_of_product);
    basket.splice(index_of_product, 1, product);
    sessionStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
}

function decreaseCount(product_id) {
    let product = basket.filter(i => i.product_id == product_id)[0];
    if (product.count > 1) {
        product.count--;
        let index_of_product = basket.findIndex(product => product.product_id == product_id);
        basket.splice(index_of_product, 1, product);
    } else {
        deleteFromBasket(product_id);
    }
    sessionStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
}

function showProduct(product_id) {
    let product = db_products[product_id - 1];
    document.getElementById("shop").style.display = "none";
    document.getElementById("product").style.display = "block";
    document.getElementById("product").innerHTML = `
    <div class="card">
        <div style="display: flex; align-items: center">
        <div style="flex-basis: 50%">
        <img class="product-image" src="${product.product_image}" alt="${product.product_name}"  onclick="hideProduct()"">
        </div>
        <div style="flex-basis: 50%">
        <p style="text-align: justify">${product.product_description}</p>
        <h5 style="text-align: left">${product.product_category}</h5>
        <h3 style="text-align: left">${numberWithCommas(product.product_price)} ₺</h3>
        </div>
        </div>
        <button class="button" id="add-to-basket" onclick="addToBasket(${product_id})">Add to Cart</button>
    </div>`;
}

function showProductAdmin(product_id) {
    let product = db_products.filter(i => i.product_id == product_id)[0];
    document.getElementById("shop").style.display = "none";
    document.getElementById("product").style.display = "block";
    document.getElementById("product").innerHTML = `
    <div class="card">
    <form method="post" action="product.php">
        <div style="display: flex; align-items: center">
        <div style="flex-basis: 50%">
        <img class="product-image" src="${product.product_image}" alt="${product.product_name}"  onclick="hideProduct()"">
        </div>
        <div style="padding: 0 10px"></div>
        <div style="flex-basis: 50%">
            
                <p>Name</p>
                <input type="text" id="edit_product_name" name="product_name" placeholder="${product.product_name}" required value="${product.product_name}">
                <p>Price</p>
                <input type="number" id="edit_product_price" name="product_price" placeholder="${product.product_price}" required value="${product.product_price}">
                <p>Description</p>
                <textarea id="edit_product_description"
                          name="product_description"
                          placeholder="${product.product_description}"
                          required>${product.product_description}</textarea>
                <p>Category</p>
                <input type="text" id="edit_product_category" name="product_category" placeholder="${product.product_category}" required value="${product.product_category}">
                <p>Image URL</p>
                <input type="text" id="edit_product_image" name="product_image"
                       placeholder="${product.product_image}" required value="${product.product_image}">
                <input type="text" id="product_id" name="product_id" style="display: none" value="${product.product_id}">
            
        </div>
        </div>
        <div style="display: flex">
            <button class="button red-button" id="delete" type="submit" name="delete" value="delete">Delete</button>
            <div style="padding: 0 10px"></div>
            <button class="button"  id="update" type="submit" name="update" value="update">Update</button>
        </div>
        </form>
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
                        <th style="text-align: right">Count</th>
                        <th style="text-align: right">Price</th>
                        <th style="text-align: right">Delete</th>
                    </tr>
                    </tbody>
                </table>`;

            let table = document.getElementById("basket_item_table_body");

            for (let i = 0; i < basket.length; i++) {
                let product = basket[i];
                table.innerHTML += `
                <tr>
                    <td>${product.product_name}</td>
                    <td style="text-align: right"><button onclick="decreaseCount(${product.product_id})" style="border: none">&#45;</button>${product.count}<button onclick="increaseCount(${product.product_id})" style="border: none">&#43;</button></td>
                    <td style="text-align: right">${numberWithCommas(product.product_price * product.count)} ₺</td>
                    <td style="text-align: right"><button onclick="deleteFromBasket(${product.product_id})" style="background: none; border: none">&#10060;</button></td>
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

function updateBasket() {
    let basketDiv = document.getElementById("basket_items");
    basketDiv.innerHTML = "";
    if (basket.length > 0) {

        basketDiv.innerHTML = `
                <table>
                    <tbody id="basket_item_table_body">
                    <tr>
                        <th>Product</th>
                        <th style="text-align: right">Count</th>
                        <th style="text-align: right">Price</th>
                        <th style="text-align: right">Delete</th>
                    </tr>
                    </tbody>
                </table>`;

        let table = document.getElementById("basket_item_table_body");

        for (let i = 0; i < basket.length; i++) {
            let product = basket[i];
            table.innerHTML += `
                <tr>
                    <td>${product.product_name}</td>
                    <td style="text-align: right"><button onclick="decreaseCount(${product.product_id})" style="border: none">&#45;</button>${product.count}<button onclick="increaseCount(${product.product_id})" style="border: none">&#43;</button></td>
                    <td style="text-align: right">${numberWithCommas(product.product_price * product.count)} ₺</td>
                    <td style="text-align: right"><button onclick="deleteFromBasket(${product.product_id})" style="background: none; border: none">&#10060;</button></td>
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

}

function totalPrice() {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
        total += parseInt(basket[i].product_price * basket[i].count);
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
    document.getElementById("basket").style.display = "none";
}

function removeClass(element, className) {
    element.classList.remove(className);
}
