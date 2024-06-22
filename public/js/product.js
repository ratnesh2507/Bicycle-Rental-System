const id = window.location.hash.slice(1);
const heroImage = document.querySelector('.product_img');
const productDescription = document.querySelector('.product_description');
const bookBtn = document.querySelector('.book-now');
const modal = document.getElementById('modal');
const close = document.getElementById('close');
const name = document.getElementById('name');
const phno = document.getElementById('phno');
const pickUp = document.getElementById('pickUp');
const dropOff = document.getElementById('dropOff');
const submitBtn = document.querySelector('.submit-btn');
const confirmation = document.getElementById("confirmation");

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
        <span class="product-property">$${data.rent_per_km}/km</span>
      </div>
    </div>
  `
}
//Show Modal
bookBtn.addEventListener('click',()=> modal.classList.add('show-modal'));

//Hide Modal
close.addEventListener('click',()=> modal.classList.remove('show-modal'));

//Hide Modal on outside click
window.addEventListener('click', 
  e => e.target == modal ? modal.classList.remove('show-modal') : false
);

const msg = "Thank you for booking with Us!!!";
submitBtn.addEventListener('click',()=>{
  if(checkFields()){
    if(confirmation.classList.contains('error')){
      confirmation.classList.remove('error');
    }
    confirmation.classList.add('success');
    confirmation.innerHTML = msg;

    setTimeout(function(){
      confirmation.innerHTML = '';
    }, 3000);
    clearField(name);
    clearField(phno);
    clearField(pickUp);
    clearField(dropOff);
  }
  else{
    confirmation.classList.add('error');
    confirmation.innerHTML = "Please enter full details";
  }
});

//function to check if empty fields
function checkFields(){
  if(name.value.trim() == '' || phno.value.trim() == '' || pickUp.value.trim() == '' || dropOff.value.trim() == ''){
    return false;
  }
  return true;
}

//function to clear form data after submitting
function clearField(element){
  element.value = '';
}