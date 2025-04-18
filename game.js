
let number = 1
let n1 = 0;
let n1_producing = 1
let n1_cost = 1;
document.getElementById('number').innerText = number;
document.getElementById('n1_producing').innerText = n1_producing;
document.getElementById('n1_cost').innerText = n1_cost;
document.getElementById('n1').innerText = n1;

function IncreaseN1() {
  if (number >= n1_cost){
    number -= n1_cost;
    n1++;
    n1_cost = number * 1.15;
  }

  document.getElementById('n1').innerText = n1;
  if (n1_cost >= 100) {
    document.getElementById('n1_cost').innerText = Math.floor(n1_cost)
  } else {
    document.getElementById('n1_cost').innerText = n1_cost.toFixed(2);
  };
}

setInterval(function() {
  number += n1 * n1_producing / 10;

  if (number >= 100) {
    document.getElementById('number').innerText = Math.floor(number);
  } else {
    document.getElementById('number').innerText = number.toFixed(2);
  }
}, 100);