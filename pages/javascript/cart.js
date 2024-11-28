$(document).ready(function () {
    let cart = {};

    // Update Cart Display
    function updateCart() {
        let $cartItems = $('#cartitems');
        $cartItems.empty();
        let totalCost = 0;

        // Loop through each item in the cart
        for (let productName in cart) {
            let item = cart[productName];
            let itemTotal = item.price * item.quantity;
            totalCost += itemTotal;

            // Append item details to the cart display
            $cartItems.append(`
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}" class="cartimage">
                        ${item.name}
                    </td>
                    <td>£${item.price.toFixed(2)}</td>
                    <td>
                        <button class="decrease" data-name="${item.name}">-</button>
                        ${item.quantity}
                        <button class="increase" data-name="${item.name}">+</button>
                    </td>
                    <td>£${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="remove" data-name="${item.name}">Remove</button>
                    </td>
                </tr>
            `);
        }

        // Update the total cost display
        $('#totalcost').text(totalCost.toFixed(2));
    }

    // Add to Cart
    $('.addtocart').click(function () {
        let $product = $(this).closest('.product');
        let name = $product.data('name');
        let price = parseFloat($product.data('price'));
        let image = $product.data('image');

        // If the item is not in the cart, add it with quantity 1
        if (!cart[name]) {
            cart[name] = { name: name, price: price, quantity: 1, image: image };
        } else {
            // If the item is already in the cart, increase its quantity
            cart[name].quantity++;
        }

        // Update the cart display
        updateCart();
    });

    // Increase Quantity
    $('#cartitems').on('click', '.increase', function () {
        let name = $(this).data('name');
        cart[name].quantity++;
        updateCart();
    });

    // Decrease Quantity
    $('#cartitems').on('click', '.decrease', function () {
        let name = $(this).data('name');
        if (cart[name].quantity > 1) {
            cart[name].quantity--;
        } else {
            delete cart[name];
        }
        updateCart();
    });

    // Remove from Cart
    $('#cartitems').on('click', '.remove', function () {
        let name = $(this).data('name');
        delete cart[name];
        updateCart();
    });

    // Clear Cart
    $('#clearcart').click(function () {
        cart = {};
        updateCart();
    });
});
