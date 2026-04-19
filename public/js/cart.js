// Función para actualizar el numerito (badge) del ícono del carrito en el header
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let badge = document.querySelector('.cart-badge');
    if (badge) {
        let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        badge.innerText = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Función que se ejecuta al clickear "AGREGAR AL CARRITO"
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificamos si el producto ya está en el carrito
    let productIndex = cart.findIndex(item => item.id === id);
    
    if (productIndex !== -1) {
        // Si ya está, sumamos uno a la cantidad
        cart[productIndex].quantity += 1;
    } else {
        // Si es nuevo, lo agregamos al array
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    // Guardamos el array actualizado en el LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizamos el badge del header
    updateCartBadge();
    
    // Un aviso simple para el usuario
    alert('¡' + name + ' agregado al carrito!');
}

// Cuando carga la página, actualizamos el badge por si ya había cosas guardadas
document.addEventListener('DOMContentLoaded', updateCartBadge);