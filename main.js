$(function() {
  getCosts();
  getCouponInfo();
});

var shippingCosts = []; userZipcode; orderCost; shipmentCost; discount;

//get shipment costs from API on rails server
function getCosts(){
$.ajax({
    url: "http://localhost:3000/api/order_costs",
    dataType: 'json',
    method: "GET"
  }).done(function(data){
    for (i = 0;i<data.length;i++){
      shippingCosts.push(new objectCost(data[i]));
    }
  }).fail(function(err){
    console.log(err);
  })
}

//Create shipment cost objects from API
function objectCost(data) {
  this.cost = data["cost"],
  this.destination = data["destination"]
}

function getShipmentCost(zipcode, objectCosts) {
  for (i=0;i<objectCosts.length;i++) {
    if (objectCosts[i].destination === parseInt(zipcode)) {
      return shipmentCost = objectCosts[i].cost
    } else {
      shipmentCost = "Invalid input";
    }
  }
}

function getCouponInfo() {
  $('#coupon-form').on ("submit", function(event) {
    event.preventDefault();
  $(".coupon-body").empty();
    userZipcode = $("#zipcode-field").val();
    orderCost = $("#costs-field").val();
    getShipmentCost(userZipcode,shippingCosts);
    if (shipmentCost != "Invalid input") {
    calculateDiscount(orderCost,shipmentCost);
      computeCoupon(discount);
    } else {
      noDiscount();
    }
  })
}

function calculateDiscount(orderCost,shipmentCost){
  return discount = (parseFloat(orderCost) - shipmentCost) * 0.10;
}

function computeCoupon(discountCode){

  $(".coupon-body").append("<p>Coupon code: ASD-"+ (discountCode*100) + "</p><p>Zipcode: " + userZipcode + "</p><p>Total Order Cost: " + orderCost + "</p><p>Discount Amount: "+ discount + "</p><p>Discounted Cost: " + (orderCost-discount) +"</p><p>" );
}

function noDiscount() {
  $(".coupon-body").empty().html("<p>No discounts available in your area.</p>")
}


//api

// [{"id":1,"destination":12151,"cost":25.25,"created_at":"2015-11-16T01:12:37.640Z","updated_at":"2015-11-16T01:12:37.640Z"},{"id":2,"destination":56211,"cost":12.25,"created_at":"2015-11-16T01:12:37.643Z","updated_at":"2015-11-16T01:12:37.643Z"},{"id":3,"destination":23569,"cost":32.25,"created_at":"2015-11-16T01:12:37.644Z","updated_at":"2015-11-16T01:12:37.644Z"}]