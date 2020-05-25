var computer = document.querySelector(".computer");
var computerWrap = computer.querySelectorAll(".computer-wrap");
var currentIndex = 0;
var startBtn = document.querySelector(".btnStart");
var btns = document.querySelectorAll(".btn");
var resultEl = document.querySelector(".result-input");
var _interval;
var stoped;
var isStarted = false;
function addEvents() {
  startBtn.addEventListener("click", start);
  btns.forEach(function (btn, i) {
    btn.addEventListener("click", select);
  });
}

var computerInterval = function () {
  if (!_interval) {
    _interval = setInterval(function () {
      toggleOn();
    }, 100);
  }
};

var start = function () {
  if (!isStarted) {
    isStarted = true;
    setResult("");
    computerInterval();
  }
};

var select = function () {
  if (!isStarted) {
    return;
  }
  var value = this.getAttribute("data-value");
  isStarted = false;
  clearInterval(_interval);
  _interval = null;
  if (stoped === value) {
    setResult("무승부");
  }
  if (
    (stoped === "scissor" && value === "rock") ||
    (stoped === "rock" && value === "paper") ||
    (stoped === "paper" && value === "scissor")
  ) {
    setResult("승리");
  }
  if (
    (stoped === "scissor" && value === "paper") ||
    (stoped === "rock" && value === "scissor") ||
    (stoped === "paper" && value === "rock")
  ) {
    setResult("패배");
  }
};

var setResult = function (value) {
  resultEl.value = value;
};

var toggleOn = function () {
  computerWrap[currentIndex].classList.remove("on");
  var nextEl;
  if (currentIndex >= 2) {
    nextEl = computerWrap[0];
    nextEl.classList.add("on");
    currentIndex = 0;
  } else {
    nextEl = computerWrap[currentIndex + 1];
    nextEl.classList.add("on");
    currentIndex++;
  }
  stoped = nextEl.getAttribute("data-value");
};

addEvents();
