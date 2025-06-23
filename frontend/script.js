const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navibar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}



// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to all cart buttons
document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const product = this.closest('.pro');
            const productInfo = {
                id: Date.now(), // Unique ID for the product
                image: product.querySelector('img').src,
                name: product.querySelector('h5').textContent,
                price: product.querySelector('h4').textContent.replace('₹', '').trim(),
                quantity: 1
            };
            addToCart(productInfo);
        });
    });
});

// Add to cart function
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Display cart items
function displayCart() {
    const cartTable = document.querySelector('#cart tbody');
    if (!cartTable) return;

    cartTable.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><a href="#" onclick="removeFromCart('${item.id}')"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>₹ ${item.price}</td>
            <td><input type="number" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)"></td>
            <td>₹ ${subtotal}</td>
        `;
        cartTable.appendChild(tr);
    });

    // Update cart totals
    updateCartTotals(total);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id == productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        if (item.quantity < 1) item.quantity = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Update cart totals
function updateCartTotals(total) {
    const subtotalElement = document.querySelector('#Subtotal table tr:first-child td:last-child');
    const totalElement = document.querySelector('#Subtotal table tr:last-child td:last-child');
    
    if (subtotalElement && totalElement) {
        subtotalElement.innerHTML = `₹ ${total}`;
        totalElement.innerHTML = `<strong>₹ ${total}</strong>`;
    }
}

// Load cart on page load
if (document.querySelector('#cart')) {
    displayCart();
}
