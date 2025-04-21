let number = 1;
let n1 = 0;
let n1_producing = 1;
let n1_cost = 1;
let n2_cost = 500;
let n2_producing = 1;
let n3_cost = 1500;
let n3_decrease = 1;
let n1_producing_upgrade1 = 1;
let n1_producing_upgrade1_cost = 5000;
let n1_cost_decrease = 1;
let n1_cost_decrease_cost = 5000;

// 숫자 포맷: 크거나 작으면 지수 표기, 아니면 고정 소수점
function formatNumberScientific(num) {
  return num >= 1e5 || num < 1e-2 ? num.toExponential(2) : num.toFixed(2);
}

// 텍스트 업데이트 헬퍼
function updateText(id, value) {
  document.getElementById(id).innerText = formatNumberScientific(value);
}

// UI 전체 업데이트
function updateUI() {
  updateText('number', number);
  updateText('n1_cost', n1_cost);
  updateText('n2_cost', n2_cost);
  updateText('n3_cost', n3_cost);
  document.getElementById('n1').innerText = n1;
  updateText('n1_producing', n1_producing);
  updateText('n2_producing', n2_producing);
  updateText('n3_decrease', n3_decrease);
  updateText('n1_producing_upgrade1', n1_producing_upgrade1);
  updateText('n1_producing_upgrade1_cost', n1_producing_upgrade1_cost);
  updateText('n1_cost_decrease', n1_cost_decrease);
  updateText('n1_cost_decrease_cost', n1_cost_decrease_cost);
}

// 기본 업그레이드: n1 구매
function IncreaseN1() {
  if (number >= n1_cost) {
    number -= n1_cost;
    n1++;
    n1_cost *= 1.2;
  }
  updateUI();
}

// n2: 생산량 배수 증가
function UpgradeN2() {
  if (number >= n2_cost) {
    number -= n2_cost;
    n2_producing *= 1.15;
    n1_producing *= 1.15;
    n2_cost *= 1.35;
  }
  updateUI();
}

// n3: n2의 가격 감소
function DecreaseN2Cost() {
  if (number >= n3_cost) {
    number -= n3_cost;
    n2_cost *= 0.85;
    n3_cost *= 1.35;
    n3_decrease *= 1.15;
  }
  updateUI();
}

// 생산량 업그레이드
function UpgradeProducing() {
  if (number >= n1_producing_upgrade1_cost) {
    number -= n1_producing_upgrade1_cost;
    n1_producing *= 1.15;
    n1_producing_upgrade1 *= 1.15;
    n1_producing_upgrade1_cost *= 1.25;
  }
  updateUI();
}

// n1 가격 감소 업그레이드
function DecreaseN1Cost() {
  if (number >= n1_cost_decrease_cost) {
    number -= n1_cost_decrease_cost;
    n1_cost *= 0.5;
    n1_cost_decrease *= 2;
    n1_cost_decrease_cost *= 1.15;
  }
  updateUI();
}

// 자동 자원 증가
setInterval(() => {
  number += (n1 * n1_producing) * 10;
  updateUI();
}, 100);

// 탭 전환
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// 저장
function saveGame() {
  showConfirmModal("정말 저장하시겠습니까?", () => {
    const saveData = {
      number, n1, n1_producing, n1_cost,
      n2_cost, n2_producing, n3_cost, n3_decrease,
      n1_producing_upgrade1, n1_producing_upgrade1_cost,
      n1_cost_decrease, n1_cost_decrease_cost
    };
    localStorage.setItem('myGameSave', JSON.stringify(saveData));
    alert("게임이 저장되었습니다!");
  });
}

// 불러오기
function loadGame() {
  showConfirmModal("저장된 게임을 불러오시겠습니까?", () => {
    const saved = JSON.parse(localStorage.getItem('myGameSave'));
    if (saved) {
      ({
        number, n1, n1_producing, n1_cost,
        n2_cost, n2_producing, n3_cost, n3_decrease,
        n1_producing_upgrade1, n1_producing_upgrade1_cost,
        n1_cost_decrease, n1_cost_decrease_cost
      } = saved);
      updateUI();
      alert("게임을 불러왔습니다!");
    } else {
      alert("저장된 게임이 없습니다.");
    }
  });
}

// 확인 모달
function showConfirmModal(message, onConfirm) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-box">
      <p>${message}</p>
      <div class="modal-buttons">
        <button id="confirmYes">예</button>
        <button id="confirmNo">아니오</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("confirmYes").onclick = () => {
    onConfirm();
    modal.remove();
  };
  document.getElementById("confirmNo").onclick = () => {
    modal.remove();
  };
}

// 초기화
updateUI();
