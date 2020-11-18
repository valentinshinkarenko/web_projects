
var btnMode1 = document.getElementById('mode1');
var btnMode2 = document.getElementById('mode2');
//var counter=0;

// переключатель мода
var changer;


//поле для ввода числа, до которого мы играем
var inputMax = document.getElementById('inputMax');
var max;

//поле для ввода числа, с максимальным числом шага
var inputAddMax = document.getElementById('inputAddMax');
var addMax;

//кнопка для старта игры
var btnStart = document.querySelector('#btnStart');

//переменная определяющая кто ходит
var currPlayer;

var whoseTurn = document.getElementById ('whoIsTurn');
//числа игрока и компа в процессе игры
var gameUserInput = document.getElementById ('humanInput');

var numToAdd;
//текущая сумма
var sum = 0;
//вывод суммы
var currentSum = document.getElementById ('currSum');

//завершение хода
var finishBtn = document.getElementById ('btnFinishedTurn');
//кнопка для хода компьтера
var computerTurnBtn = document.getElementById ('btnComputerTurn');

//поле для хранения ходов человека
var humanLog = document.querySelector('.humanNumber');
//поле для хранения ходов компьютера
var machineLog = document.querySelector('.machineNumber');

//сообщения компьютера об ошибках и процессе
var whoFirst = document.querySelector('.whoFirst');

//поле ошибок 
var poleMistake = document.querySelector('.poleMistake'); 

//переменная для человека
var humanVal;

// всплывающее окно вывода очередности хода
var inputTurnEl = document.querySelector('.inputTurn');

//переменная для наших игроков
var players = ['human','machine'];

//поле вывода победителя
var itog = document.querySelector('.itog');

btnStart.disabled = true; //в стартовом положении кнопка заблокирована


function easyMode(){
 changer = true;
 btnMode1.disabled = true;
 btnMode2.disabled = true ;
 btnMode1.classList.add("disableMod");
}


function hardMode() {
 changer = false;
 console.log(changer);
 btnStart.disabled = false;
 max = 100;
 inputMax.value = 100;
 inputAddMax.value = 9; 
 btnMode1.disabled = true;
 btnMode2.disabled = true;
 inputMax.disabled = true;
 inputAddMax.disabled = true;
 btnMode2.classList.add("disableMod");
}



function onFirstInput() { // функция проверяющая правильность введенных чисел(до какой суммы играем и размер шага)
    
    addMax = +inputAddMax.value;
    max = +inputMax.value;
    
    if (addMax !== '' && max !== '') {
        
        if (addMax % 1 !== 0 || max % 1 !== 0 || addMax < 2 || max < 20 || max <= addMax) {
            
            whoFirst.innerHTML = 'Wrong input';
            
        } 
        
        else { // если все условия соблюдены, кнопка разблокируется и мы можем начинать игру
            
            btnStart.disabled = false;
            whoFirst.innerHTML = '';
            
        }
    }
}


inputAddMax.addEventListener('input', onFirstInput);
inputMax.addEventListener('input', onFirstInput);


function myRandom(fromN, toN) { // функция генерирующая случайные ходы компьютера в заданном по условию промежутке для шага

    return Math.floor(Math.random()*(toN - fromN + 1))+fromN;

}

function startGame() { 

    var whoIsFirst = myRandom(0,1); // рандомный выбор кто ходит первый компьютер или человек

    currPlayer = players[whoIsFirst];
    
    whoFirst.innerHTML = currPlayer + " the first";

    
    if (currPlayer === 'human') {
        humanTurn();
    }

    else machineTurn(); 
    
}

function humanTurn() {
    // функия для хода человека, выводящая на экран, что сечас ход человека
    finishBtn.disabled = false;
    computerTurnBtn.disabled = true;
    inputTurnEl.innerHTML = 'Your turn';
    
}

function machineTurn() {
    if (changer === false) {
    finishBtn.disabled = true; 
    computerTurnBtn.disabled = false;
    // компьютер объявляет, что его ход
    inputTurnEl.innerHTML = 'My turn';
        //counter += 1; 
        numToAdd=10-sum%10;
        if (numToAdd === 10) {
            numToAdd = 1
        }
        sum+=numToAdd; 
    }

    else {
    finishBtn.disabled = true; 
    computerTurnBtn.disabled = false;
    // компьютер объявляет, что его ход
    inputTurnEl.innerHTML = 'My turn';
    // компьютер генерирует свой шаг от 1 до максимально возможного по условию
    numToAdd = myRandom(1,+inputAddMax.value);
    // I've chosen the number <myNum>
    sum+=numToAdd;  
    }
}

function continueGame() {
    
    humanVal = +humanInput.value;
    if (currPlayer === 'human') {
        /* вывели введенное человеческое число */ 
       if ( humanVal > inputAddMax.value) {// если введенное число человека польше чем шаг
            poleMistake.innerHTML = 'do not enter more ' + inputAddMax.value;
            return;
        } else if (humanVal % 1 !== 0) {// не целое число
            poleMistake.innerHTML = 'enter an integer';
            return;
        } else if (humanVal < 1) {// меньше одного
            poleMistake.innerHTML = 'minimum number 1';
            return;
        }
        else {
            poleMistake.innerHTML = '';
        }

        humanLog.innerText  += " " + gameUserInput.value;
        sum += humanVal; 

         
    } 
    else {
         /* numToAdd already exists */
         machineLog.innerText += " " + numToAdd;

        
    }
    
    gameUserInput.value = ''; //очистка поля ввода
    currentSum.innerText = "Current SUM = " + sum; // Sum changed, show sum

    if (sum >= max) {
    itog.innerText = currPlayer + ' Win!!!'; 
    setGameOver();
    } 
    else {
    if (currPlayer === 'human') {
        currPlayer = 'machine';
        machineTurn();
    } else {
        currPlayer = 'human';
        humanTurn();
        }
    }
    }

function setGameOver() { //функция после конца игры
    finishBtn.disabled = true; 
    computerTurnBtn.disabled = true; 
    inputMax.disabled = true;
    inputAddMax.disabled = true;
    resetbtn2 = document.createElement('resetbtn2'); // создание новой кнопки
    resetbtn2.textContent = 'Start new game';
    resetbtn2.classList.add("newGame");
    document.body.appendChild(resetbtn2); // вставляет элемент в конец
    resetbtn2.addEventListener('click', resetGame); //прослушиватель к резету
}

 function resetGame() { //функция сбрасывает код
    inputMax.disabled = false;
    inputAddMax.disabled = false;
    sum = 0;  
    inputMax.value= "";
    inputAddMax.value = "";
    currentSum.innerText= "";
    humanLog.innerText= "";
    machineLog.innerText= "";
    inputTurnEl.innerText= "";
    itog.innerText= "";
    whoFirst.innerText= "";
    resetbtn2.parentNode.removeChild(resetbtn2); //удаление кнопки сброса
    btnStart.disabled = false;
    btnMode1.disabled = false;
    btnMode2.disabled = false;
    btnMode1.classList.remove("disableMod");
    btnMode2.classList.remove("disableMod");
}  

btnMode1.addEventListener('click',easyMode);
btnMode2.addEventListener('click',hardMode);
btnStart.addEventListener('click',startGame);
finishBtn.addEventListener('click',continueGame);
computerTurnBtn.addEventListener('click',continueGame);












