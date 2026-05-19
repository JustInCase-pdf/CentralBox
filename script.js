// Mock Data (representing your Database)
const menuItems = [
    { id: 1, name: "Chicken Salad Wrap", price: 6.50 },
    { id: 2, name: "Beef Pie", price: 4.50 },
    { id: 3, name: "Vegetarian Sushi Roll", price: 3.50 },
    { id: 4, name: "Apple Juice", price: 2.00 }
];

let cart = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});

// Switch between views (Menu, Orders)
function switchView(viewId, navElement = null) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    // Show target view
    document.getElementById(viewId).classList.add('active');

    // Update bottom nav active states
    if (navElement) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        navElement.classList.add('active');
    }
}

// Transition to checkout specifically
function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    renderCheckout();
    switchView('view-checkout');
}

// Render Menu Items
function renderMenu() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';

    menuItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'item-card';
        itemEl.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button class="add-btn" onclick="addToCart(${item.id})">+ Add</button>
        `;
        menuContainer.appendChild(itemEl);
    });
}

// Add to Cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    cart.push(item);
    updateTotals();
}

// Update Totals on Menu and Checkout
function updateTotals() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total-menu').innerText = total.toFixed(2);
    document.getElementById('cart-total-checkout').innerText = total.toFixed(2);
}

// Render Checkout Screen
function renderCheckout() {
    const checkoutContainer = document.getElementById('checkout-items');
    checkoutContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'item-card';
        itemEl.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>x1</p>
            </div>
            <p>$${item.price.toFixed(2)}</p>
        `;
        checkoutContainer.appendChild(itemEl);
    });
    updateTotals();
}

// Process Payment and Move to Orders
function payNow() {
    const pickupTime = document.getElementById('pickup-time').value;
    
    if (pickupTime === "Select Pickup Time") {
        alert("Please select a pickup time.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Create an order object
    const orderHTML = `
        <div class="item-card" style="flex-direction: column; align-items: flex-start; gap: 10px;">
            <div style="width: 100%; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                <strong>Today - Pickup: ${pickupTime}</strong>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div style="width: 100%;">
                ${cart.map(item => `<div style="display:flex; justify-content:space-between; color:#777; margin-bottom:5px;"><span>${item.name} x1</span><span>$${item.price.toFixed(2)}</span></div>`).join('')}
            </div>
            <div style="width: 100%; display: flex; justify-content: flex-end;">
                <button class="add-btn" style="background:#ffcccb; color: darkred;" onclick="this.parentElement.parentElement.remove()">Cancel Order</button>
            </div>
        </div>
    `;

    // Inject into orders view
    const upcomingOrders = document.getElementById('upcoming-orders');
    if (upcomingOrders.querySelector('.empty-state')) {
        upcomingOrders.innerHTML = ''; // Clear empty state
    }
    upcomingOrders.innerHTML += orderHTML;

    // Reset Cart
    cart = [];
    updateTotals();
    
    // Route to Orders Screen
    alert("Payment Successful!");
    switchView('view-orders', document.querySelectorAll('.nav-btn')[1]);
}
