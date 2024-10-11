# pomo-todo
<img width="1268" alt="pomotodo" src="https://github.com/user-attachments/assets/e7686f72-d991-4b18-af5f-3828bf48ee7f">
URL: https://yooseohyeon.github.io/pomodoro-timer/


## 프로젝트 소개
- 뽀모도로 타이머와 과 간단하게 할 일을 저장하고 삭제할 수 있는 todo 목록 기능을 제공하는 웹사이트 입니다.


## 주요 기능
### 1. 초기 화면
- 타이머와 타이머를 시작할 수 있는 버튼이 있습니다. 타이머와 더불어 proogreaa bar를 타이머의 진행 상황을 확인할 수 있습니다.
- 사용자가 타이머의 주기를 직접 설정할 수 있습니다. - 집중 시간, 짧은 휴식 시간, 긴 휴식 시간, 긴 휴식 간격
- 타이머 아래 동그라미는 사용자가 설정한 긴 휴식 간격(뽀모도로 사이클의 수)를 알려주는 요소입니다. 집중 타이머가 완료되면 원이 검정색으로 채워지도록 하여, 현재까지 완료한 집중 타이머의 개수를 알 수 있도록 했습니다.
- 톱니바퀴 버튼을 클릭하면 자동으로 휴식 시작 여부와 자동으로 다음 뽀모도로 시작 여부를 설정할 수 있는 모달창이 화면에 표시됩니다.
- 할 일을 입력하는 창에서는 할 일을 등록하고 삭제할 수 있습니다.
  
### 2. 집중 타이머 
- '집중 시작' 버튼을 클릭하면, 사용자가 설정한 뽀모도로 타이머의 주기가 반영되며 집중 타이머가 시작됩니다. 사용자가 별도로 주기를 설정하지 않은 경우에는 기존에 설정되어 있는 값을 반영합니다.
- 버튼 클릭을 통해 타이머 시작, 일시정지, 재시작, 종료 기능이 동작하도록 구현했습니다.
- 집중 타이머의 시간이 다 채워지면, 휴식 타이머로 전환됩니다.

|타이머 동작|
|------|
|![타이머 동작](https://github.com/user-attachments/assets/3c15414c-a903-4ab6-ac3b-a624c89cc8e7)|

  

### 3. 휴식 타이머
- '자동으로 휴식 시작' 옵션의 설정에 따라 휴식 타이머는 사용자가 버튼을 클릭해야 시작되거나, 자동으로 시작됩니다.
- 휴식 타이머가 시작되면, '휴식 시작' 버튼은 '휴식 종료' 버튼으로 바뀝니다. '휴식 종료' 버튼을 누르면 휴식 타이머가 종료됩니다.
- 사용자가 '휴식 종료' 버튼을 클릭해 휴식 타이머가 종료된 경우, 모달 설정과 상관 없이 사용자가 '뽀모도로 시작' 버튼을 클릭한 경우에만 집중 타이머가 시작됩니다.
  
- 휴식 타이머의 시간이 다 되어 휴식 타이머가 종료된 경우에는 다음 두 가지로 나뉩니다
  - 만약 긴 휴식 간격만큼 집중 타이머를 다 완료하지 못했다면, '자동으로 다음 뽀모도로 시작' 옵션의 설정에 따라 집중 타이머는 버튼을 클릭해야 시작되거나, 자동으로 시작됩니다.
  - 만약 긴 휴식 간격만큼 집중 타이머를 완료했다면, 긴 휴식 타이머가 바로 시작됩니다.

### 4. 긴 휴식 타이머
- '긴 휴식 종료' 버튼을 누르면 초기 화면으로 돌아갑니다. 
  - 긴 휴식 타이머가 종료되었다면 모든 뽀모도로(집중-휴식)를 완료한 것이라고 판단하여, 긴 휴식 간격(뽀모도로 개수)가 초기화됩니다.

### 5. 옵션 설정 모달
- '자동으로 휴식 시작', '자동으로 다음 뽀모도로 시작' 옵션은 모달창을 통해서만 접근할 수 있도록 했습니다.
- 토글 버튼의 상태가 변경되면 local storage와 전역 변수 값이 업데이트됩니다.
  - 토글 버튼의 상태를 local storage에 저장해, 페이지 새로고침을 해도 사용자가 설정이 유지되도록 했습니다.
  - 만약 local storage에 아무 값도 저장되지 않았다면, 전역 변수의 기본값을 true로 설정했습니다. 그 이유는 자동으로 휴식과 다음 뽀모도로가 시작하는 것이 사용자에게 더 편리하디고 판단했기 때문입니다.

### 6. todo
- local storage를 사용하여 사용자가 입력한 할 일을 저장하고, 삭제하는 기능을 구현했습니다. 

### 7. 반응형 디자인
- 브라우저 창의 크기에 따라 레이아웃이 달라지도록 구현했습니다.
  

## 추후 추가할 기능
- todo 삭제와 완료 구분
- todo와 뽀모도로 연동
  - 각 todo마다 뽀모도로 주기를 설정할 수 있는 기능
  - 뽀모도로 주기를 별도로 설정한 todo가 완료된 경우
  - 설정한 만큼 뽀모도로를 완료하면 todo도 자동으로 완료되는 기능
- 현재 타이머의 상태와 상관없이 사용자의 버튼 클릭에 따라 타이머(집중/휴식/긴 휴식)를 전환하는 기능
  ~~(근데 이건 사용자의 집중을 위해 꼭 필요한 기능이 아닌 것 같아 추가할지 말지 고민된다. 집중하며 타이머를 사용하던 도중 갑자기 타이머를 전환할 일이 있을까? 생각해보면 없을 것 같다. 오히려 자유롭게 타이머를 전환할 수 있다면 집중이 깨지지 않을까?)~~
