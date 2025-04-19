let number = 1
let n1 = 0;
let n1_producing = 1
let n1_cost = 1;
let n2_cost = 500;
let n2_producing = 1;
let n3_cost = 1500;
let n3_decrease = 1;
document.getElementById('number').innerText = number;
document.getElementById('n1_cost').innerText = n1_cost;
document.getElementById('n2_cost').innerText = n2_cost;
document.getElementById('n1').innerText = n1;
document.getElementById('n1_producing').innerText = n1_producing;
document.getElementById('n2_producing').innerText = n2_producing;
document.getElementById('n3_cost').innerText = n3_cost;
document.getElementById('n3_decrease').innerText = n3_decrease;

function IncreaseN1() {
  if (number >= n1_cost){
    number -= n1_cost;
    n1++;
    n1_cost *= 1.25;
  }

  document.getElementById('n1').innerText = n1;
  if (n1_cost >= 100) {
    document.getElementById('n1_cost').innerText = Math.floor(n1_cost);
  } else {
    document.getElementById('n1_cost').innerText = n1_cost.toFixed(2);
  };
}


function FunctionN2(){
  if (number >= n2_cost){
    number -= n2_cost;
    n2_producing *= 1.15;
    n1_producing *= 1.15;
    n2_cost *= 1.25;
  }

  document.getElementById('n1_producing').innerText = n1_producing.toFixed(2);

  if (n2_producing >= 100) {
    document.getElementById('n2_producing').innerText = Math.floor(n2_producing)
    document.getElementById('n2_cost').innerText = Math.floor(n2_cost)
  } else {
    document.getElementById('n2_producing').innerText = n2_producing.toFixed(2);
    document.getElementById('n2_cost').innerText = n2_cost.toFixed(2);
  }
}


function DecreaseN2() {
  if (number >= n3_cost) {
    number -= n3_cost;
    n2_cost *= 0.85;
    n3_cost *= 1.25;
    n3_decrease *= 1.15;
  }

  document.getElementById('n3_cost').innerText = n3_cost.toFixed(0);
  document.getElementById('n3_decrease').innerText = n3_decrease.toFixed(0);
}


setInterval(function() {
  number += n1 * n1_producing / 10;

  if (number >= 100) {
    document.getElementById('number').innerText = Math.floor(number);
  } else {
    document.getElementById('number').innerText = number.toFixed(2);
  }
}, 100);
