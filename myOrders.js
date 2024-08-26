const myProducts = JSON.parse(localStorage.getItem('myProducts'));
console.log(myProducts);

// Initialize EmailJS with your user ID
emailjs.init('8LPYTuE-5wjqgy0v5'); // Replace with your EmailJS user ID

// Function to update the total price display
function updateTotalPrice() {
    const totalElement = document.getElementById('total');
    
    // Calculate total price
    const totalPrice = myProducts.reduce((sum, product) => sum + product.price, 0);
    
    // Update the total price display
    totalElement.textContent = totalPrice.toFixed(2); // Format to 2 decimal places
}

// Function to render products in the 'myOrders' container
function renderMyOrders() {
    const myOrdersContainer = document.getElementById('myOrders');

    myOrdersContainer.innerHTML = '';

    myProducts.forEach((product, index) => {
        myOrdersContainer.innerHTML += `
            <article class="products__card">
                <img src="img/${product.img}" alt="${product.name}" class="products__img">
                <h3 class="products__title">${product.name}</h3>
                <span class="products__price">${product.price}€</span>
                <button class="delete-button" onclick="removeProductFromMyOrders(${index})">
                    ➖
                </button>
                <button class="buy-button" onclick="openForm(${index})">Acheter</button>
            </article>`;
    });

    updateTotalPrice();
}

// Function to remove a product from 'myOrders'
function removeProductFromMyOrders(productIndex) {
    myProducts.splice(productIndex, 1);
    localStorage.setItem('myProducts', JSON.stringify(myProducts));
    renderMyOrders(); // Re-render the orders after removal
}

// Function to open the order form
function openForm(productIndex) {
    const form = document.getElementById('orderForm');
    form.style.display = 'block';
    
    const formElement = document.getElementById('orderFormElement');
    formElement.onsubmit = function(event) {
        event.preventDefault();
        submitOrder(productIndex);
    };
}

// Function to close the order form
function closeForm() {
    const form = document.getElementById('orderForm');
    form.style.display = 'none';
}

// Function to submit the order
function submitOrder(productIndex) {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;


    
    const productDetails = myProducts.map(p => `Product Name: ${p.name}, Price: ${p.price}€`).join('\n');

    // Send the email via EmailJS
    emailjs.send('service_17bg78i', 'template_m0ior7s', {
        name: name,
        address: address,
        phone: phone,
        products: productDetails
    })
    .then(response => {
        console.log('Success:', response);
        alert('Order submitted successfully!');
        closeForm();
        document.getElementById('orderFormElement').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your order.');
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderMyOrders();

    // Handling the "acheter" button click
    const okButton = document.querySelector('.ok_button');
    okButton.addEventListener('click', () => {
        if (document.getElementById('myOrders').children.length > 0) {
            openForm(); // Open form when clicking "acheter" if there are items
        } else {
            alert('No items in your order.');
        }
    });
});
