let cart = [];
let total = 0;

function toggleCart() {
  document.getElementById('cartOverlay').classList.toggle('active');
}

function addItem(name, price) {
  const id = Date.now() + Math.random();
  cart.push({id, name, price});
  total += price;
  updateCartUI();
  
  const btn = document.querySelector('.cart-trigger');
  btn.style.transform = 'scale(1.1)';
  setTimeout(() => btn.style.transform = '', 200);
}


function removeItem(id) {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    total -= cart[itemIndex].price;
    cart.splice(itemIndex, 1);
    updateCartUI();
  }
}

function updateCartUI() {
  const list = document.getElementById('cartItems');
  const count = document.getElementById('cart-count');
  const totalDisplay = document.getElementById('cartTotal');
  
  count.innerText = cart.length;
  totalDisplay.innerText = `$${Math.max(0, total).toFixed(2)}`; // Math.max prevents -0.00 edge cases
  
  if(cart.length === 0) {
    list.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 40px;">Your cart is empty.</p>';
  } else {
    list.innerHTML = cart.map((item) => `
      <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; background: rgba(255,255,255,0.03); padding: 10px; border-radius: 8px;">
        <div>
          <div style="font-weight: 600; font-size: 0.9rem;">${item.name}</div>
          <div style="color: var(--logo-main-color); font-weight: bold;">$${item.price.toFixed(2)}</div>
        </div>
        <button onclick="removeItem(${item.id})" style="background: none; border: none; color: #ff4444; cursor: pointer; font-size: 1.2rem; padding: 5px 10px;">✕</button>
      </div>
    `).join('');
  }
}

function checkout() {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert(`Thank you for your order of $${total.toFixed(2)}! Proceeding to secure payment...`);
  cart = [];
  total = 0;
  updateCartUI();
  toggleCart();
}