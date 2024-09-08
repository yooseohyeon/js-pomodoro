# 뽀모도로 타이머
![image](https://github.com/user-attachments/assets/84b35ba9-40b6-4292-857e-9ad41b71ea9e)
URL: <https://yooseohyeon.github.io/pomodoro-timer/>


## 프로젝트 소개
- 자바스크립트 학습을 위해 뽀모도로 타이머 웹사이트를 만들어보았습니다. 
- 뽀모도로 기법의 타이머 기능과 간단하게 할 일을 저장하고 삭제할 수 있는 todo 목록 기능을 추가했습니다.


## 주요 기능
### 1. 초기 화면
- 타이머와 타이머를 시작할 수 있는 버튼이 있습니다. 타이머의 진행률을 시각적으로 표시하는 proogreaa bar를 타이머를 감싸는 큰 원 형태로 추가했습니다.
- 사용자가 타이머의 주기를 직접 설정할 수 있습니다. - 집중 시간, 짧은 휴식 시간, 긴 휴식 시간, 긴 휴식 간격
- 타이머 아래 동그라미는 사용자가 설정한 긴 휴식 간격(뽀모도로 사이클의 수)를 알려주는 요소입니다. 집중 타이머가 완료되면 동그라미가 검정색으로 채워지도록 하여, 현재까지 완료한 집중 타이머의 개수를 알 수 있도록 했습니다.
- 톱니바퀴 버튼을 클릭하면 자동으로 휴식 시작 여부와 자동으로 다음 뽀모도로 시작 여부를 설정할 수 있는 모달창이 화면에 표시됩니다.
- 할 일을 입력하는 창에서는 할 일을 등록하고 삭제할 수 있습니다.
  
### 2. 집중 타이머 
- '집중 시작' 버튼을 클릭하면, 사용자가 설정한 뽀모도로 타이머의 주기가 반영되며 집중 타이머가 시작됩니다. 사용자가 별도로 주기를 설정하지 않은 경우에는 기존에 설정되어 있는 값을 반영합니다. 또한 '집중 시작' 버튼이 '일시중지' 버튼으로 바뀝니다.
- '일시 중지' 버튼을 클릭할 경우, 타이머가 잠시 멈추며 '다시 시작' 버튼과 '종료' 버튼이 생깁니다.
  - '다시 시작' 버튼을 클릭할 경우, 타이머가 다시 시작되고 '일시중지' 버튼만 남습니다.
  - '종료' 버튼을 클릭할 경우, 타이머가 종료되며 집중 타이머를 시작하기 전인 초기 화면으로 돌아갑니다.
- 집중 타이머 시간을 다 채우면, 휴식 타이머로 전환됩니다.

### 3. 휴식 타이머
- 모달창에서 설정한 옵션에 따라 휴식 타이머는 사용자가 버튼을 클릭해야 시작되거나, 자동으로 시작됩니다.
  - '자동으로 휴식 시작' 옵션을 on으로 한 경우: 초기 화면에서 설정한 짧은 휴식 시간을 반영한 타이머가 곧바로 시작됩니다.
  - '자동으로 휴식 시작' 옵션을 off로 한 경우: '휴식 시작' 버튼을 클릭해야 휴식 타이머가 시작됩니다.
- 휴식 타이머가 시작되면, '휴식 시작' 버튼은 '휴식 종료' 버튼으로 바뀝니다. '휴식 종료' 버튼을 누르면 휴식 타이머가 종료됩니다.
- 사용자가 '휴식 종료' 버튼을 클릭해 휴식 타이머가 종료된 경우, 모달 설정과 상관 없이 사용자가 '뽀모도로 시작' 버튼을 클릭한 경우에만 집중 타이머가 시작됩니다.
  
- 이후 긴 휴식 간격만큼 집중 타이머를 다 완료하지 못했다면, 모달창에서 설정한 옵션에 따라 집중 타이머는 버튼을 클릭해야 시작되거나, 자동으로 시작됩니다.
  - '자동으로 다음 뽀모도로 시작' 옵션을 on으로 한 경우: 곧바로 집중 타이머가 시작됩니다.
  - '자동으로 다음 뽀모도로 시작' 옵션을 off로 한 경우: '뽀모도로 시작' 버튼을 클랙해야 집중 타이머가 시작됩니다.
- 만약 긴 휴식 간격만큼 집중 타이머를 완료했다면, 긴 휴식 타이머가 바로 시작됩니다.

### 4. 긴 휴식 타이머
- '긴 휴식 종료' 버튼을 누르면 초기 화면으로 돌아갑니다. 
  - 긴 휴식 타이머가 종료되었다면 모든 뽀모도로(집중-휴식)를 완료한 것이라고 판단하여, 뽀모도로 개수가 초기화됩니다.

### 5. 옵션 설정 모달
- '자동으로 휴식 시작', '자동으로 다음 뽀모도로 시작' 옵션은 모달창을 통해서만 접근할 수 있도록 했습니다.
- 토글 버튼의 상태가 변경되면 로컬 스트로지와 전역 변수 값이 업데이트됩니다.
  - 토글 버튼의 상태를 로컬 스토로지에 저장해, 페이지 새로고침을 해도 사용자가 설정이 유지되도록 했습니다.
  - 로컬 스트로지에 저장한 상태를 JSON.parse를 통해 boolean으로 변환하고, 전역 변수에 저장했습니다. 
  - 만약 로컬 스트로지에 아무 값도 저장되지 않았다면, 전역 변수의 기본값을 true로 설정했습니다. 그 이유는 자동으로 휴식과 다음 뽀모도로가 시작하는 것이 사용자에게 더 편리하디고 판단했기 때문입니다.
- 전역 변수의 값과 토글 버튼의 상태가 연동되도록 했습니다.
```
let autoBreakStart = JSON.parse(localStorage.getItem('autoBreakStart')) ?? true; 
let autoNextPomodoroStart = JSON.parse(localStorage.getItem('autoNextPomodoroStart')) ?? true;

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

function saveSettings() {
  localStorage.setItem('autoBreakStart', toggles[0].checked);
  localStorage.setItem('autoNextPomodoroStart', toggles[1].checked);

  autoBreakStart = JSON.parse(localStorage.getItem('autoBreakStart')); 
  autoNextPomodoroStart = JSON.parse(localStorage.getItem('autoNextPomodoroStart')); 
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
toggles.forEach(toggle => toggle.addEventListener('change', saveSettings));
```


## 추후 추가할 기능
- 타이머 종료 시 사운드 및 알람이 나오도록 하는 기능
- todo 삭제와 완료 구분
- todo와 뽀모도로 연동
  - 각 todo마다 뽀모도로 주기를 설정할 수 있는 기능
  - 뽀모도로 주기를 별도로 설정한 todo가 완료된 경우
  - 설정한 만큼 뽀모도로를 완료하면 todo도 자동으로 완료되는 기능
- 현재 타이머의 상태와 상관없이 사용자의 버튼 클릭에 따라 타이머(집중/휴식/긴 휴식)를 전환하는 기능
  ~~(근데 이건 사용자의 집중을 위해 꼭 필요한 기능이 아닌 것 같아 추가할지 말지 고민된다. 집중하며 타이머를 사용하던 도중 갑자기 타이머를 전환할 일이 있을까? 생각해보면 없을 것 같다. 오히려 자유롭게 타이머를 전환할 수 있다면 집중이 깨지지 않을까?)~~
