/* =================================
   DATA PRODUK
================================= */

const products = [

    {
        id: 1,
        name: "Smartphone X1",
        category: "Elektronik",
        price: 2499000,
        icon: "📱"
    },

    {
        id: 2,
        name: "Laptop Pro",
        category: "Elektronik",
        price: 7499000,
        icon: "💻"
    },

    {
        id: 3,
        name: "Headphone Wireless",
        category: "Elektronik",
        price: 299000,
        icon: "🎧"
    },

    {
        id: 4,
        name: "Smart Watch",
        category: "Elektronik",
        price: 599000,
        icon: "⌚"
    },

    {
        id: 5,
        name: "T-Shirt Premium",
        category: "Fashion",
        price: 129000,
        icon: "👕"
    },

    {
        id: 6,
        name: "Hoodie Basic",
        category: "Fashion",
        price: 199000,
        icon: "🧥"
    },

    {
        id: 7,
        name: "Sneakers Classic",
        category: "Fashion",
        price: 399000,
        icon: "👟"
    },

    {
        id: 8,
        name: "Tas Casual",
        category: "Fashion",
        price: 249000,
        icon: "🎒"
    },

    {
        id: 9,
        name: "Kopi Premium",
        category: "Makanan",
        price: 75000,
        icon: "☕"
    },

    {
        id: 10,
        name: "Cokelat Premium",
        category: "Makanan",
        price: 45000,
        icon: "🍫"
    },

    {
        id: 11,
        name: "Keyboard Mechanical",
        category: "Aksesoris",
        price: 499000,
        icon: "⌨️"
    },

    {
        id: 12,
        name: "Mouse Gaming",
        category: "Aksesoris",
        price: 199000,
        icon: "🖱️"
    }

];


/* =================================
   CART
================================= */

let cart = JSON.parse(
    localStorage.getItem("rezashop_cart")
) || [];


/* =================================
   FORMAT RUPIAH
================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* =================================
   TAMPILKAN PRODUK
================================= */

function displayProducts(productList = products) {

    const container =
        document.getElementById(
            "productContainer"
        );

    container.innerHTML = "";


    document.getElementById(
        "productTotal"
    ).textContent =
        productList.length + " produk";


    if (productList.length === 0) {

        container.innerHTML = `
            <div class="empty">
                Produk tidak ditemukan.
            </div>
        `;

        return;
    }


    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="product-price">
                    ${formatRupiah(product.price)}
                </div>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})">

                    + Keranjang

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =================================
   TAMBAH PRODUK
================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            icon: product.icon,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(
        product.name +
        " berhasil ditambahkan ke keranjang!"
    );

}


/* =================================
   SIMPAN CART
================================= */

function saveCart() {

    localStorage.setItem(
        "rezashop_cart",
        JSON.stringify(cart)
    );

}


/* =================================
   JUMLAH CART
================================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById(
        "cartCount"
    ).textContent = count;

}


/* =================================
   BUKA CART
================================= */

function openCart() {

    renderCart();

    document.getElementById(
        "cartModal"
    ).style.display = "block";

}


/* =================================
   TUTUP CART
================================= */

function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";

}


/* =================================
   TAMPILKAN CART
================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty">
                🛒<br><br>
                Keranjang masih kosong.
            </div>
        `;

        document.getElementById(
            "cartTotal"
        ).textContent = "Rp0";

        return;
    }


    cart.forEach(item => {

        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-item-icon">
                ${item.icon}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ${formatRupiah(item.price)}
                </div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            -1
                        )">

                        −

                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            1
                        )">

                        +

                    </button>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(
                            ${item.id}
                        )">

                        Hapus

                    </button>

                </div>

            </div>

        `;


        container.appendChild(element);

    });


    updateCartTotal();

}


/* =================================
   UBAH JUMLAH
================================= */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            item => item.id === productId
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* =================================
   HAPUS PRODUK
================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    updateCartCount();

    renderCart();

}


/* =================================
   TOTAL
================================= */

function getCartTotal() {

    return cart.reduce(

        (total, item) =>
            total +
            (item.price * item.quantity),

        0

    );

}


function updateCartTotal() {

    document.getElementById(
        "cartTotal"
    ).textContent =
        formatRupiah(
            getCartTotal()
        );

}


/* =================================
   SEARCH
================================= */

function searchProduct() {

    const keyword =
        document.getElementById(
            "searchInput"
        ).value
        .toLowerCase()
        .trim();


    const result =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(keyword)

            ||

            product.category
                .toLowerCase()
                .includes(keyword)

        );


    displayProducts(result);

}


document.getElementById(
    "searchInput"
).addEventListener(
    "keyup",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            searchProduct();

        }

    }
);


/* =================================
   KATEGORI
================================= */

function showCategory(category) {

    if (category === "Semua") {

        displayProducts(products);

        return;

    }


    const result =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(result);

}


/* =================================
   SCROLL PRODUK
================================= */

function scrollToProducts() {

    document
        .querySelector(
            ".products-section"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =================================
   CHECKOUT
================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Keranjang masih kosong."
        );

        return;

    }


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        formatRupiah(
            getCartTotal()
        );


    closeCart();


    document.getElementById(
        "checkoutModal"
    ).style.display = "block";

}


/* =================================
   TUTUP CHECKOUT
================================= */

function closeCheckout() {

    document.getElementById(
        "checkoutModal"
    ).style.display = "none";

}


/* =================================
   PROSES ORDER
================================= */

function processOrder() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        ).value.trim();


    const payment =
        document.getElementById(
            "paymentMethod"
        ).value;


    if (!name) {

        alert(
            "Silakan masukkan nama."
        );

        return;

    }


    if (!address) {

        alert(
            "Silakan masukkan alamat."
        );

        return;

    }


    const total =
        getCartTotal();


    alert(

        "Pesanan berhasil dibuat!\n\n" +

        "Nama: " + name + "\n" +

        "Metode: " + payment + "\n" +

        "Total: " +
        formatRupiah(total)

    );


    cart = [];


    saveCart();

    updateCartCount();

    closeCheckout();


    document.getElementById(
        "customerName"
    ).value = "";


    document.getElementById(
        "customerAddress"
    ).value = "";

}


/* =================================
   TUTUP MODAL SAAT KLIK LUAR
================================= */

window.addEventListener(
    "click",
    function(event) {

        const cartModal =
            document.getElementById(
                "cartModal"
            );


        const checkoutModal =
            document.getElementById(
                "checkoutModal"
            );


        if (event.target === cartModal) {

            closeCart();

        }


        if (
            event.target === checkoutModal
        ) {

            closeCheckout();

        }

    }
);


/* =================================
   START APPLICATION
================================= */

displayProducts();

updateCartCount();