document.addEventListener("DOMContentLoaded", () => {
    const cartBubble = document.getElementById("cart-bubble");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");
    const cartItemsList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total"); // Elemento para mostrar el total

    let cart = [];

    // Función para agregar productos al carrito
    function addToCart(event) {
        const button = event.currentTarget;
        const productElement = button.closest(".product"); // Buscar el contenedor del producto
        const productId = button.getAttribute("data-id");
        const productName = productElement.querySelector("h2").textContent; // Nombre del producto
        const productPrice = productElement.querySelector(".price").textContent.replace("$", "").trim(); // Precio del producto

        const newItem = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
        };

        cart.push(newItem);
        updateCartDisplay();
    }

    // Asignar evento a todos los botones de agregar al carrito
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });

    // Función para eliminar un producto del carrito
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
    }

    // Función para actualizar el carrito
    function updateCartDisplay() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            // Crear botón de eliminar
            const removeButton = document.createElement("button");
            removeButton.textContent = "remove";
            removeButton.classList.add("remove-item");
            removeButton.addEventListener("click", () => removeFromCart(item.id));

            // Agregar el botón de eliminar al item
            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
            total += item.price;
        });

        // Actualizar el número de artículos en el carrito
        cartCount.textContent = cart.length;

        // Mostrar el total en el carrito
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
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
