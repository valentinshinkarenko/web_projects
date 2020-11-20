//переменная для поля ввода чисел
let userInputEl = document.getElementById ('userInput');

//создаем пустой массив для нашего рандомного числа
var numberArr = [];

//пустой массив для числа игрока
var userArr = [];

//кнопка для создания игры
var play = document.getElementById('play');

//невидимый блок с полем для ввода, кнопкой и логом
var block = document.getElementById('game');

// кнопка для новой игры
var BtnNewGame = document.getElementById('newGame');

// кнопка для проверки введенных чисел
let checkBtn = document.getElementById ('check');

//поле для вывода прошлых попыток
var showResult = document.getElementById ('output');

//поле для вывода результата игры
var winOrLoseEl = document.getElementById ('winOrLose');

//стартовое колличество попыток
var numOfTrials = 0;

//функция, которая делает видимым игровой блок, после нажатия на кнопку let's play
function onClickComp() {   
  block.style.visibility = 'visible';
  play.disabled = true;
  play.style.visibility = "hidden";
}

//до начала игры  кнопка чек заблокирована 
checkBtn.disabled = true; 

//функция для создания массива со случайными неповторяющимися числами
function randomNum() {
  while (numberArr.length<4) {
    let newNum = Math.floor(Math.random()*10);
    if (numberArr.indexOf(newNum) < 0) {
      numberArr.push(newNum);
    }
  }
  return numberArr;
};

console.log(randomNum());

//функция, преобразующая строку ввода(инпут), куда игрок вводит числа, в массив
function check () {
  let userStr = userInputEl.value;
  userArr = userStr.split ("");
  for (var i = 0; i < userArr.length; i++) {
    userArr[i] = Number (userArr[i])
  }

  if (userStr.search(/[^0-9]/) === -1 && userArr[0] !== userArr[1] && userArr[0] !== userArr[2] && userArr[0] !== userArr[3] && userArr[1] !== userArr[2] && userArr[1] !== userArr[3] && userArr[2] !== userArr[3] && userStr.length === 4)
  checkBtn.disabled = false; 

  else checkBtn.disabled = true;
}

//игровая функция
function game () {
  numOfTrials += 1;
  var bulls = 0, cows = 0; 

  //считаем быков и коров
  userArr.forEach(function(el, index) {
    if (userArr[index] == numberArr[index]) {
        bulls += 1;
    }    
    else if (numberArr.indexOf (userArr[index]) > -1) {
      cows += 1;
    } 
  });

  showResult.innerHTML += "It's your " + numOfTrials + " trial. Your row is " + userInputEl.value + ". You've got " + bulls + " bulls and " + cows + " cows <br>"

  //если игрок выйграл
  if (bulls === 4) { 
    winOrLoseEl.innerText = "Congratulations! You are the winner! The row was " + numberArr.join ('');
    BtnNewGame.style.visibility = 'visible';
  } 

  //если игрок проиграл
  else if (numOfTrials >= 7) { 
    winOrLoseEl.innerText = "You've used all your attempts and lost. The row was " + numberArr.join ('');
    checkBtn.disabled = true;
    userInputEl.disabled = true;
    BtnNewGame.style.visibility = 'visible'; 
  }

  userInputEl.value = ''; 
  check (); 
}
    
function resetGame () {
        BtnNewGame.style.visibility = "hidden";
        checkBtn.disabled = false;
        userInputEl.disabled = false;
        showResult.innerText = "";
        winOrLoseEl.innerText = "";
        numberArr = [];
        randomNum();
        numOfTrials = 0;
}


userInputEl.addEventListener('keyup', enter)
function enter (event) {
  if (event.keyCode === 13 ) 
  checkBtn.click()
}

play.addEventListener ('click', onClickComp);
userInputEl.addEventListener ('input', check)
checkBtn.addEventListener ('click', game)
BtnNewGame.addEventListener ('click', resetGame)