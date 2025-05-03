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
    let upgrade3_cost = 7500;
    let upgrade3_total_increase = 1;

    function formatNumberScientific(num) {
      return num >= 1e5 || num < 1e-2 ? num.toExponential(2) : num.toFixed(2);
    }

    function updateText(id, value) {
      document.getElementById(id).innerText = formatNumberScientific(value);
    }

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
      updateText('upgrade3_cost', upgrade3_cost);
      updateText('upgrade3_total_increase', upgrade3_total_increase);
    }

    function IncreaseN1() {
      if (number >= n1_cost) {
        number -= n1_cost;
        n1++;
        n1_cost *= 1.3;
      }
      updateUI();
    }

    function UpgradeN2() {
      if (number >= n2_cost) {
        number -= n2_cost;
        n2_producing *= 1.10;
        n1_producing *= 1.10;
        n2_cost *= 1.2;
      }
      updateUI();
    }

    function DecreaseN2Cost() {
      if (number >= n3_cost) {
        number -= n3_cost;
        n2_cost *= 0.90;
        n3_cost *= 1.2;
        n3_decrease *= 1.10;
      }
      updateUI();
    }

    function UpgradeProducing() {
      if (number >= n1_producing_upgrade1_cost) {
        number -= n1_producing_upgrade1_cost;
        n1_producing *= 1.10;
        n1_producing_upgrade1 *= 1.10;
        n1_producing_upgrade1_cost *= 1.2;
      }
      updateUI();
    }

    function DecreaseN1Cost() {
      if (number >= n1_cost_decrease_cost) {
        number -= n1_cost_decrease_cost;
        n1_cost *= 0.8;
        n1_cost_decrease *= 1.5;
        n1_cost_decrease_cost *= 1.2;
      }
      updateUI();
    }

    function IncreaseN1N2() {
      if (number >= 7500) {
        number -= upgrade3_cost;
        upgrade3_cost *= 1.1;
        upgrade3_total_increase *= 1.1;
        n2_producing *= 1.1;
        n3_decrease *= 1.1;
      }
      updateUI();
    }

    setInterval(() => {
      number += (n1 * n1_producing) / 10;  // 생산량 줄여 속도 조절
      updateUI();
    }, 100);

    function showTab(tabId) {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    }

    function saveGame() {
      showConfirmModal("정말 저장하시겠습니까?", () => {
        const saveData = {
          number, n1, n1_producing, n1_cost,
          n2_cost, n2_producing, n3_cost, n3_decrease,
          n1_producing_upgrade1, n1_producing_upgrade1_cost,
          n1_cost_decrease, n1_cost_decrease_cost, upgrade3_cost, upgrade3_total_increase
        };
        localStorage.setItem('myGameSave', JSON.stringify(saveData));
        alert("게임이 저장되었습니다!");
      });
    }

    function loadGame() {
      showConfirmModal("저장된 게임을 불러오시겠습니까?", () => {
        const saved = JSON.parse(localStorage.getItem('myGameSave'));
        if (saved) {
          ({
            number, n1, n1_producing, n1_cost,
            n2_cost, n2_producing, n3_cost, n3_decrease,
            n1_producing_upgrade1, n1_producing_upgrade1_cost,
            n1_cost_decrease, n1_cost_decrease_cost, upgrade3_cost, upgrade3_total_increase
          } = saved);
          updateUI();
          alert("게임을 불러왔습니다!");
        } else {
          alert("저장된 게임이 없습니다.");
        }
      });
    }

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

    updateUI();