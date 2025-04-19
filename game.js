let number = 1;
let n1 = 0;
let n1_producing = 1;
let n1_cost = 1;
let n2_cost = 500;
let n2_producing = 1;
let n3_cost = 1500;
let n3_decrease = 1;

function updateUI() {
  document.getElementById('number').innerText = number >= 100 ? Math.floor(number) : number.toFixed(2);
  document.getElementById('n1_cost').innerText = n1_cost >= 100 ? Math.floor(n1_cost) : n1_cost.toFixed(2);
  document.getElementById('n2_cost').innerText = n2_cost >= 100 ? Math.floor(n2_cost) : n2_cost.toFixed(2);
  document.getElementById('n3_cost').innerText = n3_cost.toFixed(0);
  document.getElementById('n1').innerText = n1;
  document.getElementById('n1_producing').innerText = n1_producing.toFixed(2);
  document.getElementById('n2_producing').innerText = n2_producing >= 100 ? Math.floor(n2_producing) : n2_producing.toFixed(2);
  document.getElementById('n3_decrease').innerText = n3_decrease.toFixed(0);
}

function IncreaseN1() {
  if (number >= n1_cost) {
    number -= n1_cost;
    n1++;
    n1_cost *= 1.25;
  }
  updateUI();
}

function FunctionN2() {
  if (number >= n2_cost) {
    number -= n2_cost;
    n2_producing *= 1.15;
    n1_producing *= 1.15;
    n2_cost *= 1.25;
  }
  updateUI();
}

function DecreaseN2() {
  if (number >= n3_cost) {
    number -= n3_cost;
    n2_cost *= 0.85;
    n3_cost *= 1.25;
    n3_decrease *= 1.15;
  }
  updateUI();
}

setInterval(() => {
  number += (n1 * n1_producing) / 10;
  updateUI();
}, 100);

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

function saveGame() {
  const saveData = {
    number, n1, n1_producing, n1_cost, n2_cost, n2_producing, n3_cost, n3_decrease
  };
  localStorage.setItem('myGameSave', JSON.stringify(saveData));
  alert("게임이 저장되었습니다!");
}

function loadGame() {
  const saved = JSON.parse(localStorage.getItem('myGameSave'));
  if (saved) {
    number = saved.number;
    n1 = saved.n1;
    n1_producing = saved.n1_producing;
    n1_cost = saved.n1_cost;
    n2_cost = saved.n2_cost;
    n2_producing = saved.n2_producing;
    n3_cost = saved.n3_cost;
    n3_decrease = saved.n3_decrease;
    updateUI();
    alert("게임을 불러왔습니다!");
  } else {
    alert("저장된 게임이 없습니다.");
  }
}

updateUI();