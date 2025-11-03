// Vegetable inventory with prices (per kg) and image URLs
const vegetables = [
    { name: "Tomato", price: 50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJa6G2sFzRt2c_4DljZUMKfK8sMOFV-E8F_A&s" },
    { name: "Potato", price: 30, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200" },
    { name: "Onion", price: 40, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8q08WhpczEznhtGN8yMjO4H4QJtfm351g9w&s" },
    { name: "Cabbage", price: 35, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSovwzSv6Dsb6s7h5LucdCxCfBvt-0kQbwm2g&s" },
    { name: "Carrot", price: 45, image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=200" },
    { name: "Cucumber", price: 25, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9kwNr0m2eK0A8wsR1WVm58LSTGKF4cFHFEg&s" },
    { name: "Bell Pepper", price: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-hZz0Wfezku9jKiwx08O8jw6SP0XaZcIliA&s" },
    { name: "Spinach", price: 40, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0TLQ-TatGslPnS8LwNMnQzkymUZI3Q-_-gw&s" },
    { name: "Broccoli", price: 250, image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200" },
    { name: "Green Beans", price: 35, image: "https://thefamilydinnerproject.org/wp-content/uploads/2013/09/Green-bean-lime-633x326.jpg" }
];

// Cart state
let cart = {};

// DOM Elements
const vegetableItemsContainer = document.getElementById('vegetable-items');
const cartItemsContainer = document.querySelector('.cart-items');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize the vegetable list
function initializeVegetableList() {
    vegetableItemsContainer.innerHTML = '';
    vegetables.forEach(veg => {
        const item = createVegetableItem(veg);
        vegetableItemsContainer.appendChild(item);
    });
}

// Create a vegetable item element
function createVegetableItem(veg) {
    const div = document.createElement('div');
    div.className = 'vegetable-item';
    
    div.innerHTML = `
        <img src="${veg.image}" alt="${veg.name}" class="vegetable-image">
        <div class="vegetable-details">
            <div class="vegetable-name">${veg.name}</div>
            <div class="price">₹${veg.price}/kg</div>
            <input type="number" class="quantity-input" min="0" value="0" placeholder="Qty (kg)">
        </div>
    `;
    
    // Add event listener for quantity change
    const quantityInput = div.querySelector('.quantity-input');
    quantityInput.addEventListener('change', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        updateCart(veg.name, quantity);
    });
    
    return div;
}

// Update cart state and UI
function updateCart(vegetable, quantity) {
    if (quantity > 0) {
        cart[vegetable] = quantity;
    } else {
        delete cart[vegetable];
    }
    updateCartDisplay();
}
// Update cart display and calculate totals
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    
    for (const [vegetableName, quantity] of Object.entries(cart)) {
        // Find the vegetable in our array
        const vegetable = vegetables.find(v => v.name === vegetableName);
        if (!vegetable) continue;
        
        const itemTotal = vegetable.price * quantity;
        subtotal += itemTotal;
        
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <div>${vegetableName}</div>
            <div>${quantity} kg</div>
            <div>₹${itemTotal.toFixed(2)}</div>
        `;
        cartItemsContainer.appendChild(item);
    }
   
    // Calculate tax, delivery, and total
    const tax = subtotal * 0.18; // 18% tax
    const delivery = 49; // delivery charge
    const total = subtotal + tax + delivery;
    
    // Update display
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('delivery-charge').textContent = `₹${delivery.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
    
    // Enable/disable checkout button
    checkoutBtn.disabled = Object.keys(cart).length === 0;
}

// Handle checkout
checkoutBtn.addEventListener('click', () => {
    if (Object.keys(cart).length === 0) return;
    
    const total = parseFloat(totalElement.textContent.replace('₹', ''));
    alert(`Thank you for your purchase!\nTotal amount: ₹${total.toFixed(2)}`);
    // In a real application, this would trigger a payment process
    clearCart();
});

// Clear cart
function clearCart() {
    cart = {};
    vegetableItemsContainer.querySelectorAll('.quantity-input').forEach(input => {
        input.value = '0';
    });
    updateCartDisplay();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeVegetableList();
    updateCartDisplay();
});
