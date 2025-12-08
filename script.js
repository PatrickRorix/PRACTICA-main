// Main JavaScript file for Starbucks Clone

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    
    // Product cards hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });
    
    // Order buttons functionality
    const orderButtons = document.querySelectorAll('.btn-light, .btn-dark');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if(this.textContent.includes('Order') || this.textContent.includes('Buy')) {
                e.preventDefault();
                alert('Redirecting to order page...');
                // Uncomment for actual redirection:
                // window.location.href = 'checkout.html';
            }
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            navbar.style.backgroundColor = '#fff';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Current time greeting
    showTimeGreeting();
    
    // Initialize tooltips
    initializeTooltips();
});

// Time-based greeting
function showTimeGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good morning! ☕";
    } else if (hour < 18) {
        greeting = "Good afternoon! 🌤️";
    } else {
        greeting = "Good evening! 🌙";
    }
    
    console.log(greeting + " Welcome to Starbucks Clone!");
}

// Tooltips initialization
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 10) + 'px';
            tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
            tooltip.style.backgroundColor = '#000';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '10000';
            tooltip.style.whiteSpace = 'nowrap';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
            }
        });
    });
}

// Cart functionality
let cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    updateCartCount();
    alert(`${item} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.navbar-nav-left');
    navMenu.classList.toggle('show');
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Theme toggle (light/dark mode)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Load theme on page load
loadTheme();

// Add CSS for dark mode
const darkModeCSS = `
    .dark-mode {
        background-color: #1a1a1a;
        color: #ffffff;
    }
    
    .dark-mode .navbar {
        background-color: #2d2d2d;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .dark-mode .product-card {
        background-color: #2d2d2d;
        color: #ffffff;
    }
    
    .dark-mode input,
    .dark-mode select,
    .dark-mode textarea {
        background-color: #3d3d3d;
        color: #ffffff;
        border-color: #555;
    }
`;

// Add dark mode CSS to document
const style = document.createElement('style');
style.textContent = darkModeCSS;
document.head.appendChild(style);
// Adaugă aceste funcții în fișierul script.js existent

// Gift card functionality
function handleGiftCardPurchase(cardType, amount) {
    if (amount === 'custom') {
        openCustomAmountModal(cardType);
    } else {
        addGiftCardToCart(cardType, parseFloat(amount));
    }
}

function openCustomAmountModal(cardType) {
    // Implementation would depend on your modal structure
    console.log(`Opening custom amount modal for ${cardType}`);
    // Show modal and let user input custom amount
}

function addGiftCardToCart(cardType, amount) {
    const giftCard = {
        id: `gift-${Date.now()}`,
        type: cardType,
        name: `${cardType} Gift Card`,
        amount: amount,
        date: new Date().toISOString(),
        quantity: 1
    };
    
    let cart = JSON.parse(localStorage.getItem('starbucksCart')) || [];
    cart.push({
        ...giftCard,
        price: amount,
        image: 'gift-card.jpg',
        isGiftCard: true
    });
    
    localStorage.setItem('starbucksCart', JSON.stringify(cart));
    showNotification('Gift card added to cart!');
    
    // Update cart display if on menu page
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#00754a' : '#ff4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animation
const notificationCSS = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Add to document head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationCSS;
document.head.appendChild(styleSheet);

// Login/Join Now redirection handling
function redirectToSignIn(action = 'signin') {
    // Save the intended action (signin or join)
    localStorage.setItem('authAction', action);
    
    // Redirect to signin page
    window.location.href = 'signin.html';
}

// Check for auth action on signin page load
if (window.location.pathname.includes('signin.html')) {
    const authAction = localStorage.getItem('authAction');
    if (authAction) {
        // Pre-fill form or show appropriate message
        console.log(`User wants to: ${authAction}`);
        localStorage.removeItem('authAction');
    }
}

// Cart synchronization between pages
function syncCart() {
    // Ensure cart is consistent across pages
    const cart = JSON.parse(localStorage.getItem('starbucksCart')) || [];
    const giftCart = JSON.parse(localStorage.getItem('starbucksGiftCart')) || [];
    
    // Merge gift cards into main cart
    if (giftCart.length > 0) {
        giftCart.forEach(giftCard => {
            const exists = cart.some(item => 
                item.isGiftCard && 
                item.type === giftCard.type && 
                item.amount === giftCard.amount
            );
            
            if (!exists) {
                cart.push({
                    id: giftCard.id,
                    name: `Gift Card: ${giftCard.name}`,
                    price: giftCard.amount,
                    amount: giftCard.amount,
                    isGiftCard: true,
                    quantity: 1
                });
            }
        });
        
        localStorage.setItem('starbucksCart', JSON.stringify(cart));
        localStorage.removeItem('starbucksGiftCart');
    }
}

// Run cart sync on page load
document.addEventListener('DOMContentLoaded', syncCart);