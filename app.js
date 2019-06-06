// Nav bar fade
$(function () {
  $(document).scroll(function () {
      var $nav = $(".fixed-top");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});

$(function () {
  $('[data-toggle="popover"]').popover()
})

// show cart
document.getElementById("cart-info").addEventListener("click",function(){
  const cart = document.getElementById("cart");
  cart.classList.toggle("hide-cart");
})

// toggle checkout
document.getElementById("checkoutBtn").addEventListener("click",function(){
  const checkout = document.getElementById("checkout");
  checkout.classList.toggle("show-checkout");
})
document.getElementById("closeCheckout").addEventListener("click",function(){
  const checkout = document.getElementById("checkout");
  checkout.classList.toggle("show-checkout");
})
// remove cart items
$(document).on('click', '#cart-item-remove', function(){
  $(this).parent().remove();
  showTotal();
})
// toggle payment options
$(function() {
  $("[name=payment]").click(function(){
          $('.payHide').hide();
          $("#cardblk-"+$(this).val()).show();
  });
});
// apply selector
   
$('.paymentOption').on('click', function(e) {
  $('.paymentType').toggleClass("selectColor");
  e.preventDefault();
});

// store filer
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("store-item");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    filterRemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) filterAddClass(x[i], "show");
  }
}

// Show filtered elements
function filterAddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function filterRemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1); 
    }
  }
  element.className = arr1.join(" ");
}


// toggle resort content
$(function() {
    $("[name=resContentToggle]").click(function(){
            $('.toHide').hide();
            $("#blk-"+$(this).val()).show();
    });
 });

//  calender
$( function() {
  var dateFormat = "mm/dd/yy",
    from = $( "#from" )
      .datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 2
      })
  .on( "change", function() {
    to.datepicker( "option", "minDate", getDate( this ) );
      }),
  to = $( "#to" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 2
  })
  .on( "change", function() {
    from.datepicker( "option", "maxDate", getDate( this ) );
  });
  function getDate( element ) {
    var date;
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }
    return date;
    }
} );

// calculate adults
  var adults = 1;
  var kids = 0;
  var rooms = 1;
  var minRoom = 1;

  var adultSpan = document.getElementById("adult");
  var adultSpanDD = document.getElementById("adultDD");
  var adultIncrement = document.getElementById("adultIncrement");
  var adultDecrement = document.getElementById("adultDecrement");
// increase
  adultIncrement.addEventListener('click', function () {
    adults++;
    adultSpan.textContent = adults;
    adultSpanDD.textContent = adults;
    incMinRoom ()
  });
// decrease
  adultDecrement.addEventListener('click', function () {
    adults--;
    if(adults < 1){
      adults = 1
    }
    adultSpan.textContent = adults;
    adultSpanDD.textContent = adults;
  });
// calculate kids
 
  var kidSpan = document.getElementById("kids");
  var kidSpanDD = document.getElementById("kidsDD");
  var kidIncrement = document.getElementById("kidIncrement");
  var kidDecrement = document.getElementById("kidDecrement");
// increase
  kidIncrement.addEventListener('click', function () {
    kids++;
    kidSpan.textContent = kids;
    kidSpanDD.textContent = kids;
    incMinRoom ()
  });
// decrease
  kidDecrement.addEventListener('click', function () {
    kids--;
    if(kids < 0){
      kids = 0
    }
    kidSpan.textContent = kids;
    kidSpanDD.textContent = kids;
  });

// calculate rooms

var roomSpan = document.getElementById("rooms");
var roomSpanDD = document.getElementById("roomsDD");
var roomIncrement = document.getElementById("roomIncrement");
var roomDecrement = document.getElementById("roomDecrement");
// increase
roomIncrement.addEventListener('click', function () {
  rooms++;
  roomSpan.textContent = rooms;
  roomSpanDD.textContent = rooms;
});
// decrease
roomDecrement.addEventListener('click', function () {
  rooms--;
  deMinRoom ()
  if(rooms < minRoom){
    rooms = minRoom
    }
  roomSpan.textContent = rooms;
  roomSpanDD.textContent = rooms;
});


function incMinRoom (){
  if (adults + kids >= 9){
    minRoom = 3;
    roomSpan.textContent = minRoom;
    roomSpanDD.textContent = minRoom;
  }
  else if(adults + kids >= 5){
    minRoom = 2;
    roomSpan.textContent = minRoom;
    roomSpanDD.textContent = minRoom;
  }
};

function deMinRoom (){
  if(adults + kids <= 4){
    minRoom = 1;
  }
  else if (adults + kids <= 8){
    minRoom = 2;
  }
  else if (adults + kids <= 12){
    minRoom = 3;
  }
  else(minRoom = 4)

};

  // add resort to cart
const resortSub = document.getElementById("resortSub");
resortSub.addEventListener("click", function(){

  // calculate days of stay
  function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
  }
  
  function datediff(from, to) {
    return Math.round((to-from)/(1000*60*60*24));
  }

  var days = datediff(parseDate(from.value), parseDate(to.value));

  var resortBtn = document.getElementById("resortBtn");
  var opt = resortBtn.options[resortBtn.selectedIndex];

  let nightPrice = 0;

  // set night price
  if(opt.value == "deerValley"){
    nightPrice = 100
    }
  else if(opt.value == "whistler"){
    nightPrice = 85
    }
  else {
    nightPrice = 60
    }
// calculate resort total
  let finalNightPrice = days * nightPrice

  const resort = {};
  resort.night = nightPrice;
  resort.days = days;
  resort.rooms = rooms;
  resort.name = opt.value;
  resort.total = finalNightPrice * rooms

  if (days = !"" && opt.value !="") {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item", "d-flex", "justify-content-between", "text-capitalize", "my-3");
    cartItem.innerHTML = `
          <div class="item-text">
            <p id="cart-item-title" class="font-weight-bold mb-0">${resort.name}<span class="font-weight-light"> ${resort.days}</span> <span class="font-weight-light">nights.</span></p>
            <span>$</span>
            <span id="cart-item-price" class="cart-item-price">${resort.total}</span>
          </div>
          <button type="button" id="cart-item-remove" class="cart-item-remove">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    //select cart
    const cart = document.getElementById("cart");
    const total = document.querySelector(".cart-total-container");
    cart.insertBefore(cartItem,total)
    showTotal()
    }
  else {
    console.log("input data")
    };
});



  // add items to cart
const cartBtn = document.querySelectorAll(".store-item-icon");
cartBtn.forEach(function(btn){
  btn.addEventListener("click", function(event) {
    if(event.target.parentElement.classList.contains("store-item-icon")){
      const item = {};
      let img = event.target.parentElement.previousElementSibling.src
      let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
      let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
      let finalPrice = price.slice(2)
      
      item.img = img
      item.name = name
      item.price = finalPrice

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item", "d-flex", "justify-content-between", "text-capitalize", "my-3");
      cartItem.innerHTML = `
        <img src="${item.img}" class="img-fluid rounded-circle set-height-width" id="item-img" alt="">
        <div class="item-text">
          <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
          <span>$</span>
          <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
        </div>
        <button type="button" id='cart-item-remove' class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </button>
      </div>
`;
//select cart
      const cart = document.getElementById("cart");
      const total = document.querySelector(".cart-total-container");
      cart.insertBefore(cartItem,total)
      showTotal()
      }
    });
  });

  // display total money and items
function showTotal(){
  const total = []
  const items = document.querySelectorAll(".cart-item-price");
  items.forEach(function(item){
    total.push(parseFloat(item.textContent));
  });
  const totalMoney = total.reduce(function(total, item){
    total +=item;
    return total;
  },0)
  const finalMoney = totalMoney.toFixed(2);
  document.getElementById("cart-total").textContent = finalMoney
  document.getElementById("checkout-price").textContent = finalMoney
  document.querySelector(".item-total").textContent = finalMoney
  document.getElementById("item-count").textContent = total.length
}


