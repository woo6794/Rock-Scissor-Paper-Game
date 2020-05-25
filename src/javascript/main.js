var computer = document.querySelector(".computer");
var computerWrap = computer.querySelectorAll(".computer-wrap");
var _index = 0;
var btns = document.querySelectorAll(".btn");
var result = document.querySelector(".result-input");
var btnStart = document.querySelector(".btnStart");
var isStart;
var _interval;
var stoped;

function addEvents() {
  btnStart.addEventListener("click", start);
  btns.forEach(function (btn, i) {
    btn.addEventListener("click", select);
  });
}

var start = function () {
  if (!isStart) {
    isStart = true;
    setResult("");
    computerInterval();
  }
};

var computerInterval = function () {
  if (!_interval) {
    _interval = setInterval(function () {
      toggleOn();
    }, 100);
  }
};

var toggleOn = function () {
  computerWrap[_index].classList.remove("on");
  var nextEl;
  if (_index >= (computerWrap.length-1)) {
    nextEl = computerWrap[0];
    nextEl.classList.add("on");
    _index = 0;
  } else {
    nextEl = computerWrap[_index + 1];
    nextEl.classList.add("on");
    _index++;
  }
  stoped = nextEl.getAttribute("data-value");
  
};

var select = function () {
  if (!isStart) {
    return;
  }
  var value = this.getAttribute("data-value");
  isStart = false;
  clearInterval(_interval);
  _interval = null;
  // 가비지 컬렉션
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
  result.value = value;
};

addEvents();
