
let level = 0;
let timer;
let time = 30;

/* рандом в диапазоне*/
const rand = (left, right) => {
    return left + Math.floor(Math.random() * (right - left));
}

/* заполнение поля квадратами */
const renderLevel = () => {
    
    const levelText = document.getElementById('level');
    levelText.innerHTML = level;
    level += 1;
    const fieldSquare = document.getElementsByClassName('squares')[0];
    fieldSquare.innerHTML = ''; /* очищает поле для нового уровня */

    const side = level + 1;
    fieldSquare.style.gridTemplateColumns = `repeat(${side}, auto)`; /* задается количество столбцов */
    fieldSquare.style.gridTemplateRows = `repeat(${side}, auto)`; /* задается количество рядов */
    const blocksCount = side * side; /* зависимость элементов от уровня */
    const r = rand(0,255);
    const g = rand(0,255);
    const b = rand(0,255);
    
    const randSquare = rand(0, blocksCount); /* выбирается любой квадрат */

    for (let i = 0; i < blocksCount; i++) {
        const block = document.createElement('div'); /* создаются элементы при помощи dom-дерева */
        block.className = 'square';
        if (i == randSquare) {
            block.style.backgroundColor = `rgb(${superColor(r)}, ${superColor(g)}, ${superColor(b)})`
            block.addEventListener('click', renderLevel) /* при клике новый уровень */
        }
        else {
            block.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            block.addEventListener('click', gameOver); /* при клике проигрыш */
        }
        fieldSquare.appendChild(block)
    }
}

/* старт игры*/
window.addEventListener('load', () => {
    const timeText = document.getElementById('time');
    timeText.innerHTML = time;
    
    const start = document.getElementById('start');
    start.addEventListener('click', () => { 
        renderLevel();
        goTimer();
        document.getElementById("start").disabled = true;
    });
})

/* отличающийся цвет */
const superColor = (r) => {
    const superpuperColor = r * 0.05 * (level + 10); // 

    if (superpuperColor < r * 0.95){
        return superpuperColor;
    }
    else
        return  r * 0.95;
}

/* рекурсивная функция таймера */
const goTimer = () => {
    const delay = 1000; // 1 секунда задержки
    timer = setTimeout(function tick(){
        time--;
        const timeText = document.getElementById('time');
        timeText.innerHTML = time;
        if (time > 0)
            timer = setTimeout(tick, delay);
        else
            gameOver();
    }, delay);
}

/* конец игры */
const gameOver = () => {
    alert('Вы дошли до ' + level + ' уровня');

    clearInterval(timer);
    level = 0;
    time = 30;
    const fieldSquare = document.getElementsByClassName('squares')[0];
    fieldSquare.innerHTML = '';
    fieldSquare.style.gridTemplateColumns = `repeat(2, auto)`;
    fieldSquare.style.gridTemplateRows = `repeat(2, auto)`;
    const timeText = document.getElementById("time");
    timeText.innerHTML = '30';
    const levelText = document.getElementById("level");
    levelText.innerHTML = '';

    document.getElementById("start").disabled = false;
}