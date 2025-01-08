//Universal Functions

function checkEmail(location){

    //get user input
    let input = document.getElementById(`subscribeInput-${location}`);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(input.value.length > 0 && emailRegex.test(input.value)){
        //call append function
        appendAlert("Thanks for subscribing! Check your email to confirm.", "success", location);
        //clear user input
        input.value = "";
    }else{
        appendAlert("Please enter a valid email", "warning", location);
        //clear user input
        input.value = "";
    }
}


function appendAlert(alertMessage, alertType, location){

    let alertHolder = document.getElementById(`subscribeAlertHolder-${location}`);
    let alertDiv = document.createElement("div");

    //clear any previous alerts
    alertHolder.innerHTML = "";

    //fill empty div with alert message with argument inputs
    alertDiv.innerHTML = [ 
    `<div class="alert alert-${alertType} d-flex align-items-center alert-dismissible" role="alert">`,
    `   <div>${alertMessage}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('');

    //fill alertHolder
    alertHolder.append(alertDiv);
}

/*****************************/

//Product Page Functions

function updateQuantity(num){
    let currQuant = document.getElementById("quantity").innerHTML = num;
}

function makeActive(button){
    let activeButtons = document.getElementsByClassName("btn-blue-active");
    let currButton = document.getElementById(button);

    //If button is already active, exit
    if (currButton.className == "btn btn-blue-active w-100") {
        return;
    }

    //If button isn't active, deactivate all other buttons first
    const staticLength = activeButtons.length;
    for(var i = 0; i < staticLength; i++){
        activeButtons[i].className = "btn btn-blue w-100";
    }

    //activate clicked button
    currButton.className = "btn btn-blue-active w-100";
}

function addToCart(){
    let numNewItems = parseInt(document.getElementById("quantity").textContent);
    let shoppingIcon = document.getElementsByClassName("bi-bag")[0];
    let existingBadge = document.getElementsByClassName("badge rounded-pill bg-coral")[0];

    //Local Storage Functionality to store items in cart

    let itemsInCart;

    //If items in cart exists, store that value ... else set it to 0
    if(localStorage.getItem("itemsInCart")){
        itemsInCart = parseInt(localStorage.getItem("itemsInCart"));
    }else{
        itemsInCart = 0;
    }

    //Increment number of items in cart with items being added to cart
    itemsInCart = itemsInCart + numNewItems;
    localStorage.setItem("itemsInCart", itemsInCart);

    //If cart is empty, make a new badge ... else increment curr badge value
    if(!existingBadge){
        let badgeSpan = document.createElement("span");
        badgeSpan.id = "badgeContainer";

        badgeSpan.innerHTML = `
        <span class="position-absolute translate-middle badge rounded-pill bg-coral" 
            style="top: 0; left: 8px;">
            ${itemsInCart}
            <span class="visually-hidden">items in cart</span>
        </span>
        `;

        shoppingIcon.parentElement.appendChild(badgeSpan);
    }else{
        let numCurrItems = parseInt(existingBadge.textContent);
        existingBadge.textContent = numCurrItems + numNewItems;
         
    }

}


function clearCart(){
    let badge = document.getElementById("badgeContainer");

    //if badge exists, remove it
    if(badge){
        badge.remove();
    }
    //clear localStorage
    localStorage.removeItem("itemsInCart");
}


//Local Storage 
function loadCart() {
    let itemsInCart = localStorage.getItem("itemsInCart");

    //If there is at least one item in the cart, append badge span
    if(parseInt(itemsInCart) > 0) {
        let shoppingIcon = document.getElementsByClassName("bi-bag")[0];

        let badgeSpan = document.createElement("span");
        badgeSpan.id = "badgeContainer";

        badgeSpan.innerHTML = `
            <span class="position-absolute translate-middle badge rounded-pill bg-coral"
                style="top: 0; left: 8px;">
                ${itemsInCart}
                <span class="visually-hidden">items in cart</span>
            </span>`;

        shoppingIcon.parentElement.appendChild(badgeSpan);
    }
}

//When page loads, load cart counter
document.addEventListener('DOMContentLoaded', loadCart);
