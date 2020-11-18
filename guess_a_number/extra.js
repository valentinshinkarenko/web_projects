var firstNumEl = document.getElementById ('firstNumber'); // поле для ввода числа от которого играем
var lastNumEl = document.getElementById ('lastNumber'); // поле для ввода числа до которого играем


var BtnPlayerGuess = document.querySelector('.BtnPlayerGuess') //кнопка, когда игрок угадывает
var BtnComputerGuess = document.querySelector('.BtnComputerGuess'); //кнопка, когда компьютер угадывает

var btnNo = document.getElementById("btnNo");
var btnYes = document.getElementById("btnYes");
var btnEqual = document.getElementById("btnEqual");

var outputComp = document.getElementById("outputComp");
var pickNum = document.getElementById("pickNum");

var guesses = document.querySelector('.guesses'); //ссылка для хранения результатов
var lastResult = document.querySelector('.lastResult'); // ссылка для хранения результатов
var lowOrHi = document.querySelector('.lowOrHi'); // ссылка для хранения результатов

var BtnTry = document.querySelector('.BtnTry'); //кнопка
var poleInput = document.querySelector('.poleInput'); // поле ввода
var count = 0; //используется для отслеживания того, сколько догадок у игрока было
var maxCount;


var maxLim, minLim;
var randomNum;
var numToAsk = 0;
var intervalOutput = document.getElementById("intervalOutput");




poleInput.disabled = true;
BtnTry.disabled = true;

function enteringNum() {

  if (+firstNumEl.value < 0 || +lastNumEl.value < 0) {
      return intervalOutput.innerText = "enter a number more than 0";
  }

  else if (firstNumEl.value === "" || lastNumEl.value === "") {
      return intervalOutput.innerText = "would you like to enter a number";
  }

  else if (Number.isInteger(+firstNumEl.value) !== true || (Number.isInteger(+lastNumEl.value) !== true)) {
      return intervalOutput.innerText = "we need an integer";
  }

  else if (+lastNumEl.value <= +firstNumEl.value) {
      return intervalOutput.innerText = "this is a joke? the number on the right must be greater than the number on the left";
  }

  else {
      poleInput.disabled = false;
      BtnTry.disabled = false;
      intervalOutput.innerText = ""
      minLim = +firstNumEl.value;
      maxLim = +lastNumEl.value;
  }
}

firstNumEl.addEventListener('input', enteringNum);
lastNumEl.addEventListener('input', enteringNum);

function HumanGuessFunc () {
  firstNumEl.disabled = true;
  lastNumEl.disabled = true;
  HumanGuess.style.visibility = 'visible';
  BtnComputerGuess.disabled = "true";
  poleInput.disabled = false;
  BtnTry.disabled = false;
  BtnPlayerGuess.classList.add("disableMod");
  randomNum = getRandom(minLim, maxLim);
  maxCount = Math.ceil(Math.log2(maxLim - minLim + 1));
}

function CompGuessFunc() {
  firstNumEl.disabled = true;
  lastNumEl.disabled = true;
  CompGuess.style.visibility = 'visible';
  BtnPlayerGuess.disabled = "true";
  BtnComputerGuess.classList.add("disableModTwo");
} 

  function checkGuess() {
    var countGuess = +poleInput.value;
    count++;
    poleInput.value = '';
     
    if (count < maxCount) {
        if (countGuess < randomNum) {
            guesses.textContent += countGuess + " ";
            lastResult.textContent = "this number is less than i thought";
            poleInput.value = '';
            lowOrHi.innerText = "You've got " + (maxCount - count) + " trials left";
        }
        else if (countGuess > randomNum) {
            guesses.textContent += countGuess + " ";
            lastResult.textContent = "this number is more than i thought";
            poleInput.value = '';
            lowOrHi.innerText = "You've got " + (maxCount - count) + " trials left";
        }
        else if (countGuess === randomNum) {
            guesses.textContent += countGuess + " ";
            lastResult.textContent = "congratulation, you won and you stay alive";
            poleInput.value = '';
            lowOrHi.innerText = "";
            setGameOver();
        }
    }
    else if (count >= maxCount) {
        guesses.textContent = countGuess + " ";
        lastResult.textContent = "you died";
        poleInput.value = '';
        lowOrHi.innerText = "";
        setGameOver();
    }
}

function onClickComp() {   
  numToAsk = calcNumToAsk(minLim, maxLim);
  outputComp.textContent = numToAsk + " this is more than your number?";
  btnNo.style.visibility = 'visible';
  btnYes.style.visibility = 'visible';
  btnEqual.style.visibility = 'visible';
  pickNum.disabled = true;
}

function btnNoFunc() {
  minLim = numToAsk;
  numToAsk = calcNumToAsk(minLim, maxLim);
  outputComp.textContent = numToAsk + " this is more than your number?";
}

function btnYesFunc() {
maxLim = numToAsk;
numToAsk = calcNumToAsk(minLim, maxLim);
outputComp.textContent = numToAsk + " this is more than your number?";
}

btnEqual.addEventListener('click', btnEqualFunc);
function btnEqualFunc() {
    btnNo.disabled = true;
    btnYes.disabled = true;
    btnEqual.disabled = true;
    outputComp.textContent = "I guessed right and now you die!";
    setGameOver();
}

function setGameOver() { //функция после конца игры
  poleInput.disabled = true; // отключили ввод текста, после конца игры
  BtnTry.disabled = true; // отключили кнопку
  Reload.style.visibility = 'visible';
}

function getRandom(from, to) {
  
}
function calcNumToAsk(min, max) {
  return Math.ceil(((max - min + 1) / 2) + min - 1);
}

BtnTry.addEventListener('click', checkGuess); //добавляем прослушивателя к кнопке
poleInput.addEventListener('keyup',function(event){
if (event.keyCode === 13) { // keyCode 13 - "Enter" срабатывание кнопки на энтер
BtnTry.click();
 }
}); 

btnNo.addEventListener('click', btnNoFunc);
btnYes.addEventListener('click', btnYesFunc);
pickNum.addEventListener('click', onClickComp);
BtnPlayerGuess.addEventListener('click', HumanGuessFunc); //добавляем прослушивателя к кнопке выбора мода когда человек угадывает
BtnComputerGuess.addEventListener('click', CompGuessFunc); //добавляем прослушивателя к кнопке выбора мода когда компьютер угадывает


/*
var play = document.getElementById('play');
var game = document.getElementById('game')

function onClickComp() {   
game.style.visibility = 'visible';
}

*/