// Mock Data for the Menu
const menuData = [
    { id: 1, name: "Chicken Sandwich", price: 5.50, category: "Hot Food" },
    { id: 2, name: "Garden Salad", price: 4.50, category: "All" },
    { id: 3, name: "Apple Juice", price: 2.00, category: "Drinks" },
    { id: 4, name: "Pasta Bake", price: 6.00, category: "Hot Food" }
];

let cart = [];

// 1. Navigation Logic
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    if(screenId === 'checkout-screen') renderCheckout();
}

// 2. Render Menu Items
function renderMenu() {
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = menuData.map(item => `
        <div class="food-card">
            <div class="food-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button class="add-btn" onclick="addToCart(${item.id})">+ Add</button>
        </div>
    `).join('');
}

// 3. Cart Logic
function addToCart(id) {
    const item = menuData.find(i => i.id === id);
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total-preview').innerText = total.toFixed(2);
    document.getElementById('checkout-total').innerText = total.toFixed(2);
}

function renderCheckout() {
    const list = document.getElementById('checkout-items-list');
    if (cart.length === 0) {
        list.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }
    list.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');
}

// 4. "Payment" Logic
function processPayment() {
    if (cart.length === 0) {
        alert("Please add items to your cart first!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderHTML = `
        <div class="history-card" style="border-left-color: #28a745;">
            <div style="display:flex; justify-content:space-between;">
                <strong>Today - Pickup: ${document.getElementById('pickup-time').value}</strong>
                <span style="color:orange;">Pending Approval</span>
            </div>
            <p>${cart.map(i => i.name).join(', ')}</p>
            <p><strong>Total: $${total.toFixed(2)}</strong></p>
            <button onclick="this.parentElement.remove()" style="color:red; background:none; border:none; cursor:pointer;">Cancel Order</button>
        </div>
    `;

    document.getElementById('upcoming-orders').innerHTML = orderHTML;
    alert("Order sent! Waiting for parent approval and payment.");
    
    // Clear Cart and go to Orders screen
    cart = [];
    updateCartUI();
    navigateTo('orders-screen');
}

// Initialize
renderMenu();
