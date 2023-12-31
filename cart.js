document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.getElementById('cart-btn');
    
    // Add an event listener to the cart button
    cartBtn.addEventListener('click', function () {
        // Open the cart page or toggle visibility
        window.location.href = 'cart.html'; // Redirect to the cart page
        // Alternatively, you can toggle the visibility of a cart overlay/modal
        // or load the cart content dynamically without redirecting to a new page.
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtns = document.querySelectorAll('.addToCartBtn');
    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotal');

    let cart = [];

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const productName = btn.dataset.name;
            const productPrice = parseFloat(btn.dataset.price);

            // Check if the product is already in the cart
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            // Update the cart display
            updateCart();
        });
    });

    function updateCart() {
        // Clear existing cart content
        cartBody.innerHTML = '';

        // Populate the cart table
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button class="removeBtn" data-product="${item.name}">&#10006;</button></td>
                <td>${item.name}</td>
                <td>
                    <button class="quantityBtn" data-action="decrease" data-product="${item.name}">-</button>
                    ${item.quantity}
                    <button class="quantityBtn" data-action="increase" data-product="${item.name}">+</button>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartBody.appendChild(row);
        });

        // Update the total amount and quantity
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartTotal.textContent = `Total: $${totalAmount.toFixed(2)} | Total Quantity: ${totalQuantity}`;

        // Add event listeners to the quantity and remove buttons
        addEventListenersToButtons();
    }

    function addEventListenersToButtons() {
        const quantityBtns = document.querySelectorAll('.quantityBtn');
        const removeBtns = document.querySelectorAll('.removeBtn');

        quantityBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const action = btn.dataset.action;
                const productName = btn.dataset.product;
                const item = cart.find(item => item.name === productName);

                if (action === 'increase') {
                    item.quantity++;
                } else if (action === 'decrease' && item.quantity > 1) {
                    item.quantity--;
                }

                updateCart();
            });
        });

        removeBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const productName = btn.dataset.product;
                cart = cart.filter(item => item.name !== productName);
                updateCart();
            });
        });
    }
});