/*HTML - поле для числа, кнопка,
       место для ответа

JS - a.Присвоить елементы поля для числа,
     кнопки и места для ответа переменным.

     b.Присоединить Listener к кнопке.

     с.Создать callback function, кот.
       вызывает 4 функции:
          - извлечение числа
          - валидация числа
          - проверка, является ли
            число простым
          - display of the answer */

          /* 
К ПРОЕКТУ IS IT A PRIME NUMBER
- Input validation (12.1, -25 - WRONG INPUT, ERROR INPUT ...)
- Empty input - ENTER a NUMBER!!!!!!! (check for the empty string "")
- if (num === 1) - not working right, because the input (num) is of string data type
  if (parseFloat(num) === 1) - works OK (why not parseInt()? num = 1.1)
  if (num <= 1) - it works because of implicit casting - the better practice
                  is to convert num to number explicitly: num = parseFloat(num)
- Test cases: 29 - PRIME
              28 - NOT PRIME
              0 - NOT PRIME
              1 - NOT PRIME
              2 - PRIME
              1073807359 - PRIME
*/

  //это встроеная функиця для обращения к элементам html
var polevvodaEl = document.getElementById("polevvoda");

var zmiakBtn = document.getElementById("btn");

var output = document.getElementById("output");

function onClick() {

  if (polevvodaEl.value === "") { //проверка ввели ли мы что то 
   return output.innerText = "are you kidding me???";
  } 
    
  if (polevvodaEl.value == 2) {  //проверка на двойку
    return output.innerText = polevvodaEl.value +  " very prime number";
   } 
    
   if (polevvodaEl.value % 1 != 0 || polevvodaEl.value < 0) {  // проверка на целое число || и на отрицательные
    return output.innerText = polevvodaEl.value + " i think, that you confused"; 
  } 

  else if (+polevvodaEl.value < 2 || polevvoda.value % 2 === 0) { // проверка меньше ли число, чем 2 и делится ли число на два
    return output.innerText = polevvodaEl.value + " do you think everything is so simple?";  
  }
 
  for (let i = 2; i <= Math.sqrt(+polevvodaEl.value); i++) { // проверка по квадратному корню
    if (+polevvodaEl.value % i == 0) {
      return output.innerText = polevvodaEl.value + " do you think everything is so simple?";
    }
  }
    return output.innerText = polevvodaEl.value + " the number is as simple as the JS";
}

zmiakBtn.addEventListener('click', onClick);

polevvoda.addEventListener('keyup',function(event){
  if (event.keyCode === 13) { // keyCode 13 - "Enter" срабатывание кнопки на энтер
    zmiakBtn.click(); 
  } 
});



