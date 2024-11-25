$(document).ready(function () {
    let cart = {};

    // Update Cart Display
    function updateCart() {
        const $cartItems = $('#cart-items');
        $cartItems.empty();
        let totalCost = 0;

        for (let productName in cart) {
            const item = cart[productName];
            const itemTotal = item.price * item.quantity;
            totalCost += itemTotal;

            $cartItems.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <button class="decrease" data-name="${item.name}">-</button>
                        ${item.quantity}
                        <button class="increase" data-name="${item.name}">+</button>
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="remove" data-name="${item.name}">Remove</button>
                    </td>
                </tr>
            `);
        }

        $('#total-cost').text(totalCost.toFixed(2));
    }

    // Add to Cart
    $('.add-to-cart').click(function () {
        const $product = $(this).closest('.product');
        const name = $product.data('name');
        const price = parseFloat($product.data('price'));

        if (!cart[name]) {
            cart[name] = { name: name, price: price, quantity: 1 };
        } else {
            cart[name].quantity++;
        }

        updateCart();
    });

    // Increase Quantity
    $('#cart-items').on('click', '.increase', function () {
        const name = $(this).data('name');
        cart[name].quantity++;
        updateCart();
    });

    // Decrease Quantity
    $('#cart-items').on('click', '.decrease', function () {
        const name = $(this).data('name');
        if (cart[name].quantity > 1) {
            cart[name].quantity--;
        } else {
            delete cart[name];
        }
        updateCart();
    });

    // Remove from Cart
    $('#cart-items').on('click', '.remove', function () {
        const name = $(this).data('name');
        delete cart[name];
        updateCart();
    });

    // Clear Cart
    $('#clear-cart').click(function () {
        cart = {};
        updateCart();
    });
});
