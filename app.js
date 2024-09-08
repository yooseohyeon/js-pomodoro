const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const pomodoroBtnGroup = document.querySelector('.pomodoro-button-group');
const pomodoroBtn = document.querySelector('.pomodoro-button:first-of-type');
const progressCircle = document.querySelector('.pomodoro-progress-bar'); 
const pomodoroCycleGroup = document.getElementsByClassName("pomodoro-cycle");

let timerInterval = null;

let pomodoroEndBtn = null;
let breakBtn = null;
let longBreakBtn = null;

let focusTime = 25; 
let shortBreakTime = 5;
let longBreakTime = 15;
let longBreakInterval = 4;

let autoBreakStart = JSON.parse(localStorage.getItem('autoBreakStart')); 
let autoNextPomodoroStart = JSON.parse(localStorage.getItem('autoNextPomodoroStart')); 

let completedCycles = 0;


function updateTimerDisplay(minutes, seconds) {
  min.innerText = minutes;
  sec.innerText = seconds < 10 ? '0' + seconds : seconds;
}

// progress bar
function initializeProgressBar() {
  const radius = progressCircle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;
  
  progressCircle.dataset.circumference = circumference;
}

function updateProgressBar(currentTime) {
  const circumference = parseFloat(progressCircle.dataset.circumference);
  const progress = (totalDuration - currentTime) / totalDuration;
  const offset = circumference * (1 - progress);

  progressCircle.style.strokeDashoffset = offset;
  progressCircle.style.opacity = 100;
}


// 집중 타이머
function focusTimer() {
  let minutes = parseInt(min.innerText, 10);
  let seconds = parseInt(sec.innerText, 10);
  updateTimerDisplay(minutes, seconds);
  
  if (minutes === 0 && seconds === 0) {
    clearInterval(timerInterval);
    transitionToShortBreak();
    completedCycles++;
    pomodoroCycleGroup[completedCycles - 1].style.backgroundColor = '#242424';
    return;
  }

  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  updateTimerDisplay(minutes, seconds);

  const currentTime = minutes * 60 + seconds;
  updateProgressBar(currentTime);
}

// 타이머 종료 버튼 생성
function createEndButton() {
  const endBtn = document.createElement("button");
  endBtn.className = 'pomodoro-button';
  endBtn.innerText = '종료';
  endBtn.style.backgroundColor = '#747474';
  pomodoroBtnGroup.appendChild(endBtn);
  return endBtn;
}

// 타이머 동작 관련 함수
function handleStart() {
  timerInterval = setInterval(focusTimer, 1000);
  updateTimerDisplay(focusTime - 1, 59);

  pomodoroBtn.innerText = '일시 중지';
  pomodoroBtn.style.backgroundColor = '#747474';

  progressCircle.style.display = 'flex';
  progressCircle.style.stroke = '#E74C3C';
  totalDuration = focusTime * 60; 
  initializeProgressBar();
}

function handlePause() {
  clearInterval(timerInterval);

  pomodoroBtn.innerText = '다시 시작';
  pomodoroBtn.style.backgroundColor = '#E74C3C';

  if (!pomodoroEndBtn) {
    pomodoroEndBtn = createEndButton();
    pomodoroEndBtn.addEventListener('click', handleEnd);
  }
  pomodoroEndBtn.style.display = 'inline-block';
}

function handleResume() {
  timerInterval = setInterval(focusTimer, 1000);
  
  pomodoroBtn.innerText = '일시 중지';
  pomodoroBtn.style.backgroundColor = '#747474';
  if (pomodoroEndBtn) pomodoroEndBtn.style.display = 'none';
}

function handleEnd() {
  clearInterval(timerInterval);
  updateTimerDisplay(focusTime, 0); 

  pomodoroBtn.style.display = 'flex';
  pomodoroBtn.innerText = '집중 시작';
  pomodoroBtn.style.backgroundColor = '#E74C3C';

  if (pomodoroEndBtn) pomodoroEndBtn.style.display = 'none';
  if (breakBtn) breakBtn.style.display = 'none';
  if (longBreakBtn) longBreakBtn.style.display = 'none';
  if (progressCircle.style.display === 'flex') progressCircle.style.display = 'none';
}


// 휴식 타이머
function breakTimer() {
  let minutes = parseInt(min.innerText, 10);
  let seconds = parseInt(sec.innerText, 10);

  if (minutes === 0 && seconds === 0) {
    handleEnd();
    if (autoNextPomodoroStart) handleStart();
    if (longBreakInterval === completedCycles) transitionToLongBreak();
    return;
  }

  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  updateTimerDisplay(minutes, seconds);

  const currentTime = minutes * 60 + seconds;
  updateProgressBar(currentTime);
}

// 휴식 버튼 생성
function createShortBreakButton() {
  const breakBtn = document.createElement("button");
  breakBtn.className = 'pomodoro-button';
  autoBreakStart ? breakBtn.innerText = '휴식 종료' : breakBtn.innerText = '휴식 시작';
  breakBtn.style.backgroundColor = '#2ECC71';
  pomodoroBtnGroup.appendChild(breakBtn);
  return breakBtn;
}

// 휴식 타이머 관련 동작
function transitionToShortBreak() {
  !breakBtn ? breakBtn = createShortBreakButton() : breakBtn.style.display = 'inline-block';
  pomodoroBtn.style.display = 'none';

  progressCircle.style.display = 'flex';
  progressCircle.style.stroke = '#2ECC71';

  if (autoBreakStart) {
    handleBreakStart();
  } else if (!autoBreakStart) {
    breakBtn.innerText = '휴식 시작';
    updateTimerDisplay(shortBreakTime, 0);
  }

  transitionButtonClicked = false;
}

function handleBreakStart() {
  clearInterval(timerInterval);
  timerInterval = setInterval(breakTimer, 1000);
  updateTimerDisplay(shortBreakTime - 1, 59);
  breakBtn.innerText = '휴식 종료';
  initializeProgressBar();
}

// 긴 휴식
function longBreakTimer() {
  let minutes = parseInt(min.innerText, 10);
  let seconds = parseInt(sec.innerText, 10);

  if (minutes === 0 && seconds === 0) {
    handleEnd();
    completedCycles = 0;
    [...pomodoroCycleGroup].forEach(pomodoroCycle => pomodoroCycle.style.backgroundColor = '#24242400');
    return;
  }

  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  updateTimerDisplay(minutes, seconds);

  const currentTime = minutes * 60 + seconds;
  updateProgressBar(currentTime);
}

function createLongBreakButton() {
  const longBreakBtn = document.createElement("button");
  longBreakBtn.className = 'pomodoro-button';
  longBreakBtn.innerText = '긴 휴식 종료';
  longBreakBtn.style.backgroundColor = '#209ad7';
  pomodoroBtnGroup.appendChild(longBreakBtn);
  return longBreakBtn;
}

function transitionToLongBreak() {
  !longBreakBtn ? longBreakBtn = createLongBreakButton() : longBreakBtn.style.display = 'inline-block';

  pomodoroBtn.style.display = 'none';
  breakBtn.style.display = 'none';

  progressCircle.style.display = 'flex';
  progressCircle.style.stroke = '#209ad7';

  clearInterval(timerInterval);
  updateTimerDisplay(longBreakTime - 1, 59);
  timerInterval = setInterval(longBreakTimer, 1000);

  transitionButtonClicked = false;
}

// 버튼 전체
function toggleTimer(event) {
  switch (event.target.innerText) {
    case '집중 시작':
      handleStart();
      break;
    case '일시 중지':
      handlePause();
      break;
    case '다시 시작':
      handleResume();
      break;
    case '종료':
      handleEnd();
      break;
    case '휴식 시작':
      handleBreakStart();
      break;
    case '휴식 종료':
      handleEnd();
      break;
    case '긴 휴식 종료':
      handleEnd();
      completedCycles = 0;
      [...pomodoroCycleGroup].forEach(pomodoroCycle => pomodoroCycle.style.backgroundColor = '#24242400');
      break;
  }
}

pomodoroBtnGroup.addEventListener('click', toggleTimer);


function subDisplayCycle() {
  let subCyclePcs = pomodoroCycleGroup.length - longBreakInterval;

  for (let i = 0; i < subCyclePcs; i++) {
    pomodoroCycleGroup[pomodoroCycleGroup.length-1].remove();
  }
}

function addDisplayCycle() {
  let addCyclePcs = longBreakInterval - pomodoroCycleGroup.length;

  for (let i = 0; i < addCyclePcs ; i++) {
    const newPomodoroCycle = document.createElement("div");
    newPomodoroCycle.className = 'pomodoro-cycle';
    pomodoroCycleGroup[0].parentNode.appendChild(newPomodoroCycle);
  }
}

/* 뽀모도로 시간 설정 입력창 */
function syncTimerWithInputs() {
  focusTime = parseInt(document.querySelector('.focus-time-input').value, 10);
  shortBreakTime = parseInt(document.querySelector('.short-break-time-input').value, 10);
  longBreakTime = parseInt(document.querySelector('.long-break-time-input').value, 10);
  longBreakInterval = parseInt(document.querySelector('.long-break-interval-input').value, 10);

  if (longBreakInterval < pomodoroCycleGroup.length) {
    subDisplayCycle();
  } else if (longBreakInterval > pomodoroCycleGroup.length) {
    addDisplayCycle();
  }
}

document.querySelector('.pomodoro-setting-container').addEventListener('input', function(event) {
  if (event.target && event.target.classList.contains('pomodoro-setting-input')) {
    syncTimerWithInputs();
  }
});

/* 뽀모도로 옵션 설정 모달 */
const modal = document.querySelector('.pomodoro-option-modal');
const openModalBtn = document.querySelector('.pomodoro-option');
const closeModalBtn = document.querySelector('.modal-close-button');
const toggles = document.querySelectorAll('.toggle-slider'); 

function openModal() {
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');

  autoBreakStart == true ? toggles[0].checked = true : toggles[0].checked = false;
  autoNextPomodoroStart == true ? toggles[1].checked = true : toggles[1].checked = false;
}

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

function getToggleChecked() {
  localStorage.setItem('autoBreakStart', toggles[0].checked);
  localStorage.setItem('autoNextPomodoroStart', toggles[1].checked);

  autoBreakStart = JSON.parse(localStorage.getItem('autoBreakStart')); 
  autoNextPomodoroStart = JSON.parse(localStorage.getItem('autoNextPomodoroStart')); 
}


openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
toggles.forEach(toggle => toggle.addEventListener('click', getToggleChecked));


// TODO
const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const ul = document.querySelector('ul');
const alertText = document.querySelector('.alert-text');

let todos = [];

const save = () => { localStorage.setItem('todos', JSON.stringify(todos));};

const delItem = (event) => {
  const target = event.target.parentElement;
  
  todos = todos.filter((todo)=> todo.id != parseInt(target.id));
  save();

  target.remove();
};

const addItem = (todo) => {
  if (todo.text !== '') {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const span = document.createElement('span');

    span.innerText = todo.text;
    alertText.style.display = 'none';
    li.className = 'todo-li';
    button.innerText = '삭제';
    button.className = 'todo-button';
    button.addEventListener('click', delItem);

    ul.appendChild(li);
    li.append(span, button);
    li.id = todo.id;
  }
};


const handler = (event) => {
  event.preventDefault(); 

    const todo = {
      id: Date.now(),
      text: input.value,
    };

  todos.push(todo);
  addItem(todo);
  save();

  input.value = '';
}

const init = () => {
  let userTodos = JSON.parse(localStorage.getItem('todos'));

  if (userTodos) {
    userTodos.forEach(todo => addItem(todo));
    todos = userTodos;
  }
}

document.querySelector('.todo-button').addEventListener('click', function() {
  input.value !== '' ?  alertText.style.display = 'none' :  alertText.style.display = 'block';
});
input.addEventListener('input', function(event) {
  if(event.target.value !== '') alertText.style.display = 'none';
})

init();
form.addEventListener('submit', handler);