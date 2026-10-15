// menu Icon
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("nav");

menuButton.addEventListener("click", function(){
    navMenu.classList.toggle
    ("show");

});

// Define cart
let cart = [];

const cartOverlay = document.getElementById("cartOverlay");
const cartItem = document.getElementById("cartItem");
const checkoutButton = document.getElementById("checkoutButton");
const closeCart = document.getElementById("closeCart");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");


cartButton.addEventListener("click", function(){
    cartOverlay.classList.add("show");

});

closeCart.addEventListener("click", function(){
    cartOverlay.classList.remove("show");

});




// Add to Cart Button
const addButtons = document.querySelectorAll(".add-to-cart")

addButtons.forEach(function(button){
    button.addEventListener("click", function(){
        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        const existingproduct = Cart.find(function(items){
            return item.name === productName;
        });

        if (existingproduct){
            existingproduct.quantity++;
            
        }else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCart();

        cartOverlay.classList.add("show");
        
    });
});
