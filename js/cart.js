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
            li.classList.add("cart-item"); // Añadir clase a cada li para el estilo

            // Añadir el nombre y precio al li
            const namePriceText = document.createElement("span");
            namePriceText.classList.add("name-price");
            namePriceText.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            // Crear el botón de eliminar
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-item");
            removeButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            `; // SVG del icono de la papelera

            removeButton.addEventListener("click", () => removeFromCart(item.id));

            // Agregar el nombre, precio y el botón de eliminar al li
            li.appendChild(namePriceText);
            li.appendChild(removeButton);

            // Agregar el li al carrito
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
