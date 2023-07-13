const navIcon = document.querySelector('.fa-bars')
const navMenu = document.querySelector('.mid-parent')
const navClose = document.querySelector('.mid-parent .mid .fa-times')
const main = document.querySelector('.goods .image .main-pic')
const mainSubImgs = document.querySelectorAll('.goods .image .sub-images img')
const minusBtn = document.querySelector('.minus')
const plusBtn = document.querySelector('.plus')
const cart = document.querySelector('nav .cart')
const cartOverHeadText = document.querySelector('nav .cart-text')
const cartIcon = document.querySelector('nav .top-right i')
const cartCloseBtn = document.querySelector('nav  .cart i.fa-times')
const inputValue = document.querySelector('.counter input')
const lightBox = document.querySelector('.lightbox')
const lightBoxMainPic = document.querySelector('.lightbox .image .main-pic')
const lightBoxSubImages = document.querySelectorAll('.lightbox .image .sub-images img')
const lightBoxCloseBtn = document.querySelector('.lightbox .fa-times')
const lightBoxleftNav = document.querySelector('.lightbox .fa-chevron-left')
const lightBoxRightNav = document.querySelector('.lightbox .fa-chevron-right')
const AddToCartBtn = document.querySelector('.description .c-btn')
const cartTable = document.querySelector('.cart .cart-table')
const cartTableText = document.querySelector('.cart .cart-table .c-text')
const cartTableCheckout = document.querySelector('.cart .cart-table .checkoutBtn')
const itemAmount = document.querySelector('.description .amount')
const shoeName = document.querySelector('.description .shoe-des').textContent
const shoeprice = document.querySelector('.description .price').innerHTML.substring(2, 5)
const body = document.querySelector('body')

console.log(body);
let counter = 0 
let picCounter = 0 

navIcon.onclick = () => {
    navMenu.classList.toggle('active')
}

navClose.onclick = () => {
    navMenu.classList.remove('active')
}

window.addEventListener('scroll', () => {
    navMenu.classList.remove('active')
    navIcon.classList.remove('fa-times')
    cart.classList.remove('active')

})

mainSubImgs.forEach(img => {
    img.addEventListener('click', function(){
        main.src = this.src
        mainSubImgs.forEach((img) => {
            img.classList.remove('active')
        })
        this.classList.add('active')
    })
})

plusBtn.addEventListener('click', function(){
    counter++
    inputValue.value = counter
})

minusBtn.addEventListener('click', function(){
    counter--
    if (counter < 0){
        counter = 0
    }
    inputValue.value = counter
})


main.addEventListener('click', function(){
    lightBox.style.display = 'flex'
    lightBoxMainPic.src = main.src
    cart.classList.remove('active')
    body.classList.add('noscroll')
})

lightBoxCloseBtn.addEventListener('click', function(){
    lightBox.style.display = 'none'
    body.classList.remove('noscroll')

})

lightBoxSubImages.forEach(img => {
    img.addEventListener('click', function(){
        lightBoxMainPic.src = this.src
    })
})


lightBoxRightNav.addEventListener('click', function(){
    picCounter++
    if (picCounter > 3){
        picCounter = 0
    }
    lightBoxMainPic.src = lightBoxSubImages[picCounter].src
})

lightBoxleftNav.addEventListener('click', function(){
    picCounter--
    if (picCounter < 0){
        picCounter = 3
    }
    lightBoxMainPic.src = lightBoxSubImages[picCounter].src
})


// ---cart functionality--
cartIcon.addEventListener('click', function(){
    cart.classList.toggle('active')
    navMenu.classList.remove('active')

})



// add to cart functionality
isCartEmpty = true
let itemCounter = 0

AddToCartBtn.addEventListener('click', function(){
   if(+itemAmount.value === 0){
    return
   }
    isCartEmpty = false
   if (isCartEmpty == false){
    cartTableText.style.display = 'none'
    const div = document.createElement('div')
    div.className = 'pic-info'
    div.innerHTML = `
    <img src="images/image-product-1-thumbnail.jpg" alt="">
    <div class="description ">
      <p class="shoe-des">Fall Limited Edition Sneakers</p>
      <span class="price">${'$'+shoeprice}</span>
      <span>X</span>
      <span class="amount">${+itemAmount.value}</span>
      <span class="total">${'$' + +itemAmount.value * +shoeprice}</span>
    </div>
    <i class="fas fa-trash"></i>
    `
    const deleteBtn = div.querySelector('.fa-trash')
    deleteBtn.addEventListener('click', function(){
        div.remove()
        itemCounter--
        cartOverHeadText.setAttribute('data-count', itemCounter)
        if (itemCounter === 0){
            cartTableText.style.display = 'initial'
            cartTableCheckout.classList.add('notactive')
            cart.classList.remove('fit')
            cartOverHeadText.classList.remove('zero')
        }
    })
    cartTable.appendChild(div)
    cart.classList.add('fit')
    cartTableCheckout.classList.remove('notactive')
    cartTableCheckout.addEventListener('click', function(){
        alert('Details of the item has been sent to your email.\nThank you for shopping with us!')
    })
    itemCounter++
   }
   let add = Number(cartOverHeadText.getAttribute('data-count'));
   cartOverHeadText.setAttribute('data-count', add + 1)
   cartOverHeadText.classList.add('zero')
})




