document.addEventListener("DOMContentLoaded", () => {
    const cartBubble = document.getElementById("cart-bubble");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");
    const cartItemsList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    let cart = [];

    // Función para agregar productos al carrito
    function addToCart(event) {
        const button = event.currentTarget;
        const productId = button.getAttribute("data-id");

        const newItem = {
            id: productId,
            name: `Producto ${productId}`,
            price: (Math.random() * 50).toFixed(2),
        };

        cart.push(newItem);
        updateCartDisplay();
    }

    // Asignar evento a todos los botones de agregar al carrito
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });

    // Función para actualizar el carrito
    function updateCartDisplay() {
        cartItemsList.innerHTML = "";
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price}`;
            cartItemsList.appendChild(li);
        });

        cartCount.textContent = cart.length;
    }

    // Abrir modal del carrito
    cartBubble.addEventListener("click", () => {
        cartModal.style.display = "flex";
        updateCartDisplay();
    });

    // Cerrar modal del carrito
    closeCart.addEventListener("click", () => {
        cartModal.style.display = "none";
    });
});
