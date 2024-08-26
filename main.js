if (!localStorage.getItem('myProducts')) {
  localStorage.setItem('myProducts', JSON.stringify([]));
}
 document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products');

  function renderProducts() {
      const myProducts = JSON.parse(localStorage.getItem('myProducts'));

      productsContainer.innerHTML = '';

      orders.forEach((order, index) => {
          productsContainer.innerHTML += `
              <article class="products__card">
                  <img src="img/${order.img}" alt="${order.name}" class="products__img">
                  <h3 class="products__title">${order.name}</h3>
                  <span class="products__price">${order.price}€</span>
                  <button class="products__button" onclick="addProductToMyProducts(${index})">
                      <i class='bx bx-shopping-bag'></i> 
                  </button>
              </article>`;
      });
  }

  renderProducts();
});

function addProductToMyProducts(productIndex) {
  const product = orders[productIndex];
  if (!product) return;

  const myProducts = JSON.parse(localStorage.getItem('myProducts'));
  myProducts.push(product);
  localStorage.setItem('myProducts', JSON.stringify(myProducts));

}
