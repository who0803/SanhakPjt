//로그인 안되어있을 경우 로그인 페이지로 넘어감
const loginJudge = document.querySelector('#body');
if (!localStorage.getItem('userName')) {
    loginJudge.innerHTML = '로그인 해주세요<br>3초 후 로그인 페이지로 이동합니다.';
    loginJudge.style.color = 'gray';
    loginJudge.style.fontSize = '3rem';
    loginJudge.style.textAlign = 'center';
    setTimeout(function() {
        window.location.href = 'login.html'; // 로그인 안돼있으면 로그인 페이지로 이동
    }, 3000);
}
else {  // 로그인 되어있을 경우 실행

    // 임시 객체
    var body = {
        "data": [
            [
                {
                    "title": "고질라vs콩",
                    "description": `거대 몬스터들의 습격을 받은 지 3년 후, 콩은 스컬 아일랜드를 떠나 인간들의 보호관찰을 받고 있다. 한편, 인간들에게 등을 돌린 고질라는 비밀연구회사인 에이펙스에 존재하는 알 수 없는 힘에 이끌려 그곳을 쑥대밭으로 만든다. 위기 상황 속, 지구 안의 또 다른 지구인 할로우 어스의 에너지원을 찾아야만 인류가 안전할 수 있다는 판단하고 콩의 보호자들은 콩과 특별한 유대감을 형성하는 아이 지아와 함께 타이탄들의 고향일지 모르는 그 곳으로 위험한 여정을 떠난다. 그러던 중 분노에 찬 고질라의 공격을 받고, 마침내 맞붙게 된 두 전설의 장대한 대결은 앞으로 닥쳐올 대재앙의 서막에 불과했는데… 세상의 운명을 놓고, 지구상 가장 거대한 신화적 존재들의 스펙터클한 대격돌이 시작된다!`,
                    "img": "img/kong.png"
                }
            ],
            [
                {
                    "title": "미나리",
                    "description": `"미나리는 어디서든 잘 자라" 낯선 미국, 아칸소로 떠나온 한국 가족. 가족들에게 뭔가 해내는 걸 보여주고 싶은 아빠 '제이콥'(스티븐 연)은 자신만의 농장을 가꾸기 시작하고 엄마 '모니카'(한예리)도 다시 일자리를 찾는다. 아직 어린 아이들을 위해 ‘모니카’의 엄마 ‘순자’(윤여정)가 함께 살기로 하고 가방 가득 고춧가루, 멸치, 한약 그리고 미나리씨를 담은 할머니가 도착한다. 의젓한 큰딸 '앤'(노엘 케이트 조)과 장난꾸러기 막내아들 '데이빗'(앨런 김)은 여느 그랜마같지 않은 할머니가 영- 못마땅한데… 함께 있다면, 새로 시작할 수 있다는 희망으로 하루하루 뿌리 내리며 살아가는 어느 가족의 아주 특별한 여정이 시작된다!`,
                    "img": "img/minari.png",
                }
            ],
            [
                {
                    "title": "와일드 마운틴 타임",
                    "description": `아일랜드의 한 마을에서 농장을 꾸리고 있는 ‘로즈메리’와 ‘안토니’. ‘로즈메리’는 어린 시절부터 일편단심 ‘안토니’를 바라봤지만 연애에는 쑥맥인 ‘안토니’는 아는 듯 모르는 듯 덤덤하기만 하다. 어느 날, ‘안토니’의 아버지는 사촌 ‘아담’에게 농장을 물려주겠다 선언하고, 뉴욕의 은행가인 ‘아담’은 농장을 둘러보기 위해 마을을 찾는다. 어느새 ‘아담’과 ‘로즈메리’ 사이에는 미묘한 기류가 흐르기 시작하고, 세 사람의 관계는 점점 꼬이기 시작하는데… 운명은 우리가 정하는 거야. 한 번 부딪쳐보자`,
                    "img": "img/wild.png",
                }
            ],
            [
                {
                    "title": "귀멸의 칼날",
                    "description": `혈귀로 변해버린 여동생 ‘네즈코’를 인간으로 되돌릴 단서를 찾아 비밀조직 귀살대에 들어간 ‘탄지로.’ ‘젠이츠’, ‘이노스케’와 새로운 임무 수행을 위해 무한열차에 탑승 후 귀살대 최강 검사 염주 ‘렌고쿠’와 합류한다. 달리는 무한열차에서 승객들이 하나 둘 흔적 없이 사라지자 숨어있는 식인 혈귀의 존재를 직감하는 ‘렌고쿠’. 귀살대 ‘탄지로’ 일행과 최강 검사 염주 ‘렌고쿠’는 어둠 속을 달리는 무한열차에서 모두의 목숨을 구하기 위해 예측불가능한 능력을 가진 혈귀와 목숨을 건 혈전을 시작하는데…`,
                    "img": "img/guikal.png",
                }
            ],
        ]
    }

    var selection = document.querySelectorAll('.seletion');
    var beforeCount = 0;  /* 누르기 전 상태.  선택전 카운트의 개수 */
    var afterCount = 0; /* 버튼. 선택후 카운트의 개수 */
    const btn = document.querySelector('#btn');
    let feeling = document.querySelector('#feeling');
    let feelingData = [];    // 감정 객체 데이터 배열
    const guest = document.querySelector('#guest');
    //모달
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('#modalCloseBtn');
    const modalContentsBox = document.querySelector('#modalContentsBox');
    const modalContent = document.querySelectorAll('#modalContent');
    const modalTitle = document.querySelectorAll('#modalTitle');
    const modalImg = document.querySelectorAll('#modalImg');
    const hover = document.querySelectorAll('#hover');
    const modalOkBtn = document.querySelector('#modalOkBtn');

    // 회원정보
    if (localStorage.getItem('userName')) guest.innerHTML = localStorage.getItem('userName')+" 님";
    
    
    fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/sentences?userId=" + localStorage.getItem('userId') + "&historyId=" + localStorage.getItem('historyId'))
      .then((response) => response.json())
      .then((data) => {
          feeling.innerHTML = data.body.emotion;
          for (let i = 0; i < 4; i++) {
            selection[i].innerHTML =  data.body.sentences[i][0].Content;
            feelingData[i] = data.body.sentences[i][0];
          }
          
          console.log(data);
          //console.log(data.body.sentences[0][0].Content);
          //console.log('userId = ', localStorage.getItem('userId'))
          //console.log('historyId = ', localStorage.getItem('historyId'))
        })
    
    selection.forEach(function (e) {  // 이런식으로 포문 돌려서 핸들러 추가
        e.addEventListener('click', function(e) { // 인덱스로 접근
            beforeCount = 0;
            for (var i = 0; i < selection.length; i++) {    /* 선택전 카운트의 개수 */
                if (selection[i].classList.contains('active')) {    /* 하나씩 다 검사 */
                    beforeCount++;
                }
            }
            //console.log("1: " + beforeCount);
            if (beforeCount === 3 && !(e.currentTarget.classList.contains('active'))) return; /*active가 이미 3개있는데 눌린거 말고 다른 거 눌리면*/
            else e.currentTarget.classList.toggle('active');
            
            afterCount = 0;
            for (var i = 0; i < selection.length; i++) {    /* 선택후 카운트의 개수 */
                if (selection[i].classList.contains('active')) {    /* 하나씩 다 검사 */
                    afterCount++;
                }
            }
        });
    });
    
    

    // 호버이벤트 리스너
    for(let i = 0; i < 4; i++) {
        modalImg[i].addEventListener('mouseover', function() {
            hover[i].style.display = 'block';
            hover[i].style.opacity = '0.7';
        });

        hover[i].addEventListener('mouseout', function() {
            hover[i].style.display = 'none';
        });

        // 이미지 누르면
        hover[i].addEventListener('click', function(e) {
            e.currentTarget.parentNode.classList.toggle('chosenContent');
        });
    }

    btn.addEventListener('click', function() {
        //console.log("2: "+count);
        if (afterCount !== 0) { // 하나라도 선택된 것이 있어야 가능
            
            // 선택된 텍스트 찾아내기
            for (var i = 0; i < selection.length; i++) {    /* 선택후 카운트의 개수 */
                if (selection[i].classList.contains('active')) {    /* 하나씩 다 검사 */
                    if(selection[i].classList.contains('input')) console.log(selection[i].value);
                    else console.log(selection[i].textContent);
                }
            }

            // 모달에 정보 넣기
            for (let i = 0; i < 4; i++) {    
                modalTitle[i].innerHTML = body.data[i][0].title;
                modalImg[i].style.backgroundImage = "url(" + body.data[i][0].img + ")";
                hover[i].innerHTML = body.data[i][0].description;   // 호버에 설명 넣음
                modal.style.display = 'flex';
            }
            
            //window.location.href = '2.html';
        }
        console.log('-----------------');
    });

    // 모달 확인 버튼
    let chosenArr = [];
    modalOkBtn.addEventListener('click', function() {
        for(let i = 0; i < 4; i++) {
            if(modalContent[i].classList.contains('chosenContent')) {
                chosenArr.push(i);
            }
        }
        for (let i = 0; i < chosenArr.length; i++) {
            console.log(body.data[chosenArr[i]][0].title);
        }
        console.log('-----------');
        // 배열 비우기전에 넘기면 될듯 
        chosenArr = [];
        location.href = '2.html';
    });


    // 모달 닫기 버튼
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        chosenArr = [];
        for(let i = 0; i < 4; i++) {
            modalContent[i].classList.remove('chosenContent');
        }
    });
}





