# MoleGame

## Game Rule

- 시작버튼을 클릭하면 두더지가 1~3초에 한번씩 최대 5마리씩 랜덤한 숫자로 출몰하는 게임입니다.
- 두더지를 클릭하면 점수가 올라가고 제한시간은 60초입니다.
- 게임이 끝나면 점수를 보여주고 두더지가 두더지 집보다 많아지면 게임에서 지게됩니다.
    
    [https://user-images.githubusercontent.com/80943394/180667934-18a95bbe-e95b-4151-acb7-e1da607800ee.mov](https://user-images.githubusercontent.com/80943394/180667934-18a95bbe-e95b-4151-acb7-e1da607800ee.mov)
    

---

   ## 1. printGameTable() : 게임 시작전 보여지는 두더지하우스
<img width="976" alt="스크린샷 2022-07-25 오전 7 22 10" src="https://user-images.githubusercontent.com/80943394/180897123-37e6cf36-f812-4f03-a16f-a26d61258e60.png">

   - 24개의 두더지집을 두개의 for문을 이용해서 동적으로 생성했습니다.
   - 첫번째 for문에서는 열 row(div)을 생성하고, 두번째 for문에서는 열 row(div)안에 생성되는 두더지집(div)을 만들었습니다.
   - 2,4,6,6,4,2개씩 자동으로 만들어지도록 하기 위해 decrement(blooean)가 false인 경우, counter가 2씩 증가하고 true인 경우 2씩 감소하도록 하였습니다.
  - 6이 되었을경우 한번 더 6을 만들어야 하므로 counter가 6이되는 경우 또 다른 조건문을 만들어 counter를 2증가시켜 8을 만든 후에 decrement = true로 만들어 counter가 2씩 감소하도록 하여 전체적인 두더지집을 동적으로 완성하였습니다.

---

  ## 2. createMoles() : 두더지 생성

<img width="1061" alt="스크린샷 2022-07-25 오전 7 56 12" src="https://user-images.githubusercontent.com/80943394/180897224-f95230ec-1eb2-4c65-b4fc-74332fa918ae.png">

- getRandom()함수를 통해 randomTime(1~3초 안에서 랜덤하게추출),randomMoles(1 ~ 5개 안에서 랜덤하게 추출)를 생성하여 랜덤하게 만들어진 숫자를 할당하였습니다.
- createRandomMoles(randomMoles) : 실제로 두더지가 만들어지는 함수에 randomMoles(두더지의 숫자가 랜덤하게 추출된값)을 파라미터로 전달하여 for문이 돌려지는 횟수를 지정했고,
- 'queryselectorAll'을 이용해 전체 두더지집을 배열로 전부 가저와 두더지집배열의 길이를 이용해 randomeHouse(전체두더지집 갯수 안에서 랜덤하게 추출되는 숫자)를 만들어 선택된 두더지집에 두더지가 만들어지도록 하였습니다
- 랜덤하게 선택된 두더지집의 기존'X' string값을 ''빈 값으로 바꾸고 class(house -> mole)를 대체해여 두더지집대신 두더지가 생성되도록 하였습니다.
- window.setTimeout(createMoles, randomTime)에 랜덤하게 만들어지는 두더지와 시간을 전달해 화면에서 1~3초마다 두더지가 랜덤하게 출몰하게 하였습니다.
- 만약 두더지가 계속 생성되고 있는데 유저가 클릭하지 않아 두더지가 두더지집보다 많아지는 경우 게임을 종료하고 종료 후에 는 남아있는 두더지집에 두더지가 채워지도록하여 마지막 장면이 두더지가 전부 보여지도록 구현하였습니다.(아래 코드참조)

```
   if (randomMoles > gameTable.querySelectorAll('.house').length) {
   randomMoles = gameTable.querySelectorAll('.house').length;
   createRandomMoles(randomMoles);
   gameEnd();
   return false;
 }

```

---

## 2. hitMoles() : 두더지 죽이기

<img width="804" alt="스크린샷 2022-07-25 오전 8 20 42" src="https://user-images.githubusercontent.com/80943394/180897298-ede35d6c-e2cd-4869-a43c-4747b0a3be8e.png">

- event delegation을 이용해 두더지마다 이벤트를 등록하지 않고 부모노드인 gameTable에만 이벤트를 등록하여 모든 자식노드가 클릭이 되었을 때 gameTable이 이벤트를 들을 수있게 하였습니다.(gameTable내에서 클릭시, 노드의 클래스이름이 'mole'인 경우 두더지가 지워지도록 하였음)
- 두더지가 클릭이되면 class(mole -> house)를 두더지집으로 대체하고 innerText = 'X'로 표기 하여 두더지가 사라지는 것처럼 구현하였습니다.
- 두더직 클릭시 점수는 계속올라갑니다.
    
    ---
    

## 2. startGame(), changeAllMolesToHouse() : 게임시작시 처음에는 항상 두더지집만 생성되도록 하기

<img width="804" alt="스크린샷 2022-07-25 오전 8 34 54" src="https://user-images.githubusercontent.com/80943394/180897390-4a02e383-5d14-4ab4-8344-14a4e4d033be.png">

- 시작버튼이 클릭되어 게임이 시작되면 게임의 상태를 알리는 gameStatus는 true, 두더지가 랜덤하게 생성되기 시작하고 , 타이머가 시작됩니다.
- 게임이 시작할때는 항상 모든 두더지집에 두더지가 없이 두더지집으로 리셋시키기 위해 changeAllMolesToHouse()함수를 만들었습니다.

## 3. startGameTimer() : 타이머 기능구현

<img width="692" alt="스크린샷 2022-07-25 오전 8 41 56" src="https://user-images.githubusercontent.com/80943394/180897465-56b21025-5df0-447d-a015-e09872d61acf.png">
<img width="990" alt="스크린샷 2022-07-24 오후 3 27 05" src="https://user-images.githubusercontent.com/80943394/180897457-907d3179-6e2d-45d5-8993-afef43794b32.png">


- 정해진 시간은 상수로 만들고 ( const gameDuration = 60 ), 시간이 지나면서 남아 있는 시간은 함수 내 지역변수로 (let remainingTimeSec = gameDuration )만들어 실제 게임시간을 할당하였습니다.
- 브라우저 API인 setTimeOut을 이용해 타이머를 구현하였고 시간이 0이되면 타이머가 멈추도록 clearInterval(timer) API를 사용하였습니다.
- 실제 타이머가 보여지는 곳은 updateTimerText(time)함수에 time을 파라미터로 전달해 브라우저에 표기되게 하였습니다.
- 게임이 끝나면 최종 점수가 보여지는 함수 showGameScore()를 구현하였습니다.
