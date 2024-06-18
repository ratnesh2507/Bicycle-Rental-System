const id = window.location.hash.slice(1);
const heroImage = document.querySelector('.product_img');
const productDescription = document.querySelector('.product_description');
const bookBtn = document.querySelector('.book-now');

fetch(`http://localhost:3000/api/bikes/${id}`)
  .then(res => res.json())
  .then(data => init(data))
  .catch(err => console.log(err));



function init(data) {
  const productImage = `<img src=${data.image} alt="Bike">`
  heroImage.innerHTML = productImage;
  productDescription.innerHTML = createDiscription(data);
}

function createDiscription(data) {
  return `
    <div class="description">
      <div class="description-title">Product Description</div>
      <div class="product-details">
        <span class="product-attribute">Product Name: </span>
        <span class="product-property">${data.name}</span>
      </div>
      <div class="product-details">
        <span class="product-attribute">Is Product Available: </span>
        <span class="product-property">${data.available}</span>
      </div>
      <div class="product-details">
        <span class="product-attribute">Product Model: </span>
        <span class="product-property">${data.model}</span>
      </div>
      <div class="product-details">
        <span class="product-attribute">Product Quantity: </span>
        <span class="product-property">${data.quantity}</span>
      </div>
      <div class="product-details">
        <span class="product-attribute">Product Price: </span>
        <span class="product-property">${data.rent_per_km}/km</span>
      </div>
    </div>
  `
<<<<<<< HEAD
}
=======
}
>>>>>>> c45b928ae90179834a0f464c78b7874edd1639c6
