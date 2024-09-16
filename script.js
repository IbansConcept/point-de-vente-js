document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const cartTableBody = document.querySelector('#cartTable tbody');
    const grandTotalElement = document.getElementById('grandTotal');
    const checkoutButton = document.getElementById('checkout');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        cartTableBody.innerHTML = '';
        let grandTotal = 0;

        cart.forEach((product, index) => {
            const tr = document.createElement('tr');
            const total = product.price * product.quantity;
            grandTotal += total;

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price.toFixed(2)} €</td>
                <td>${product.quantity}</td>
                <td>${total.toFixed(2)} €</td>
                <td class="actions">
                    <button class="update" onclick="updateProduct(${index})">Modifier</button>
                    <button onclick="deleteProduct(${index})">Supprimer</button>
                </td>
            `;

            cartTableBody.appendChild(tr);
        });

        grandTotalElement.textContent = grandTotal.toFixed(2);
    }

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('product_name').value;
        const price = parseFloat(document.getElementById('product_price').value);
        const quantity = parseInt(document.getElementById('product_quantity').value);

        cart.push({ name, price, quantity });
        saveCart();
        renderCart();

        productForm.reset();
    });

    window.deleteProduct = function (index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    window.updateProduct = function (index) {
        const product = cart[index];
        document.getElementById('product_name').value = product.name;
        document.getElementById('product_price').value = product.price;
        document.getElementById('product_quantity').value = product.quantity;

        cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    checkoutButton.addEventListener('click', function () {
        if (confirm('Es-tu sûr de vouloir valider la vente ?')) {
            cart = [];
            saveCart();
            renderCart();
            alert('Vente validée avec succès !');
        }
    });

    renderCart();
});
