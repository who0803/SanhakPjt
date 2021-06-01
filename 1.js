//로그인 안되어있을 경우 로그인 페이지로 넘어감
const loginJudge = document.querySelector('#body');
if (!localStorage.getItem('userId')) {
    loginJudge.innerHTML = '로그인 해주세요<br>3초 후 로그인 페이지로 이동합니다.';
    loginJudge.style.color = 'gray';
    loginJudge.style.fontSize = '3rem';
    loginJudge.style.textAlign = 'center';
    setTimeout(function () {
        window.location.href = 'login.html'; // 로그인 안돼있으면 로그인 페이지로 이동
    }, 3000);
}
else {  // 로그인 되어있을 경우 실행

    const loding = document.querySelector('#loding');
    const guest = document.querySelector('#guest');
    const logout = document.querySelector('#logout');
    const login = document.querySelector('#login');

    //////////// 비회원 로그인
    if (localStorage.getItem('userId') === '-1') {    // 비회원 로그인 상황
        guest.style.display = 'none';
        logout.style.display = 'none';
        login.style.display = 'block';
        console.log("1");
    }
    else {  // 회원 로그인인 상황
        guest.style.display = 'block';
        logout.style.display = 'block';
        login.style.display = 'none';
        console.log("2 " + localStorage.getItem('userId'));
    }
    //////////


    // 로그아웃
    logout.addEventListener('click', function () { // 로그아웃 누르면 로그아웃하고 로그인페이지로 넘어가
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        location.href = 'login.html';
    });

    // 회원정보
    if (localStorage.getItem('userName')) guest.innerHTML = localStorage.getItem('userName') + " 님";



    // init()에서 사용해야되기 때문에 밖으로 빼줌
    //모달
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('#modalCloseBtn');
    const modalContentsBox = document.querySelector('#modalContentsBox');
    const modalContent = document.querySelectorAll('#modalContent');
    const modalTitle = document.querySelectorAll('#modalTitle');
    const modalImg = document.querySelectorAll('#modalImg');
    const hover = document.querySelectorAll('#hover');
    const modalOkBtn = document.querySelector('#modalOkBtn');

    //선택지
    let selection;
    let btn;
    let feeling;
    let addSeletion;

    let beforeCount = 0;  /* 누르기 전 상태.  선택전 카운트의 개수 */
    let afterCount = 0; /* 버튼. 선택후 카운트의 개수 */
    let feelingData = [];    // 감정 객체 데이터 배열

    // errMessages
    let errMessages = [];

    


    function init() {
        // 선택지 이벤트 리스너    
        selection.forEach(function (e) {  // 이런식으로 포문 돌려서 핸들러 추가
            e.addEventListener('click', function (e) { // 인덱스로 접근
                /*
                beforeCount = 0;
                for (var i = 0; i < selection.length; i++) {    // 선택전 카운트의 개수 
                    if (selection[i].classList.contains('active')) {    // 하나씩 다 검사 
                        beforeCount++;
                    }
                }
                //console.log("1: " + beforeCount);
                if (beforeCount === 1 && !(e.currentTarget.classList.contains('active'))) return; //active가 이미 3개있는데 눌린거 말고 다른 거 눌리면
                else e.currentTarget.classList.toggle('active');
                */

                // 누르면 액티브된거 다지우고
                for (var i = 0; i < selection.length; i++) {     /* 하나씩 다 검사 */
                    if (selection[i].classList.contains('active')) { // 활성화된거 
                        if (selection[i] !== e.currentTarget)        // 이미 활성화된거 누르지 않았을 경우에   
                            selection[i].classList.remove('active'); // 지움
                    }
                }
                e.currentTarget.classList.toggle('active');   // 누른거만 선택됨



                afterCount = 0;
                for (var i = 0; i < selection.length; i++) {    /* 선택후 카운트의 개수 */
                    if (selection[i].classList.contains('active')) {    /* 하나씩 다 검사 */
                        afterCount++;
                    }
                }
            });
        });

        // 선택지 추가버튼
        let add = 5;
        addSeletion.addEventListener('click', function () {
            selection[add++].style.display = 'block';
            if (add === 7) addSeletion.style.display = 'none';
        });


        // 4개 컨텐츠 담을 배열
        let contentsArr = [];
        
        // 감정선택 확인버튼
        btn.addEventListener('click', function () {
            
            for(let i = 0; i < 3; i++) {// 에러메시지 리셋
                errMessages[i].innerHTML = '';
                errMessages[i].style.display = 'none';   
            }
/*
            let errFlag = 0;
            for(let i = 0; i < selection.length; i++) {
                if (selection[i].classList.contains('active')) {    // 선택된거중에
                    if (selection[i].classList.contains('input')) { // 인풋창인거 중에
                        if (selection[i].value === '') {    // 아무것도 입력안된 것이 있다면
                            errFlag = 1;
                            errMessages[3].style.display = 'block';
                        }
                        else {
                            errMessages[3].style.display = 'none';
                        }
                    }
                }
            }
*/
            if (afterCount !== 0/* && errFlag === 0*/) { // 하나라도 선택된 것이 있어야 가능
                
                let chosenTxtArr = [];
                //let chosenTxt = {}; // 선택된 txt
                // 선택된 텍스트 찾아내기
                for (var i = 0; i < selection.length; i++) {    /* 선택후 카운트의 개수 */

                    if (selection[i].classList.contains('active')) {    /* 하나씩 다 검사 */

                        
                        if (selection[i].classList.contains('input')) { // 사용자입력한부분
                            chosenTxtArr.push({
                                id: i,
                                text: selection[i].value
                            });

                        }
                        else {
                            chosenTxtArr.push({ // 기존 선택지
                                id: i,
                                text: selection[i].textContent
                            });
                        }

                        
                    }
                }
                console.log('chosenTxtArr = ', chosenTxtArr);
                fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/sentences/goal", { //
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "userId": localStorage.getItem('userId'),
                        "historyId": localStorage.getItem('historyId'),
                        "sentence": chosenTxtArr[0].text,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('chosenTxtArr[0].text = ',chosenTxtArr[0].text);
                        console.log(data);
                        if (data.body.success) { // 에러없이 응답이 잘왔으면
                            // 모달에 정보 넣기
                            console.log(data.body);
                            if (data.body.type === 'movie') { // 영화면
                                console.log('영화!');
                                for (let i = 0; i < 4; i++) {
                                    modalTitle[i].innerHTML = data.body.contents[i].title;
                                    modalImg[i].style.backgroundImage = "url(" + data.body.contents[i].image + ")";
                                    hover[i].innerHTML = data.body.contents[i].description;   // 호버에 설명 넣음
                                    modal.style.display = 'flex';
                                    console.log(data.body.contents[i].image);
                                    // 배열 만들기
                                    contentsArr.push({
                                        'idx': String(data.body.contents[i].idx),
                                        'title': data.body.contents[i].title,
                                        'description': data.body.contents[i].description,
                                    });
                                }
                            }
                            else {  // 책이면
                                console.log('책!');
                                for (let i = 0; i < 4; i++) {
                                    modalTitle[i].innerHTML = data.body.contents[i].title;
                                    modalImg[i].style.backgroundImage = "url(" + data.body.contents[i].image + ")";
                                    hover[i].innerHTML = data.body.contents[i].description;   // 호버에 설명 넣음
                                    modal.style.display = 'flex';

                                    // 배열 만들기
                                    contentsArr.push({
                                        'idx': String(data.body.contents[i].idx),
                                        'title': data.body.contents[i].title,
                                        'description': data.body.contents[i].description,
                                    });
                                }
                            }
                            
                        }
                        else {  // 분석할 수 없는 문장이 오면
                            
                            switch (chosenTxtArr[0].id) { //data.body.sentences[i].sentence.id
                                case 4:
                                    errMessages[0].style.display = 'block';
                                    errMessages[0].innerHTML = data.body.message;
                                    break;
                                case 5:
                                    errMessages[1].style.display = 'block';
                                    errMessages[1].innerHTML = data.body.message;
                                    break;
                                case 6:
                                    errMessages[2].style.display = 'block';
                                    errMessages[2].innerHTML = data.body.message;
                                    break;
                            }
                        }


                    })
            }
            console.log('-----------------');
        });






        // 모달/////////////////////////
        // 호버이벤트 리스너
        for (let i = 0; i < 4; i++) {
            modalImg[i].addEventListener('mouseover', function () {
                hover[i].style.display = 'block';
                hover[i].style.opacity = '0.7';
            });

            hover[i].addEventListener('mouseout', function () {
                hover[i].style.display = 'none';
            });

            // 이미지 누르면
            hover[i].addEventListener('click', function (e) {
                e.currentTarget.parentNode.classList.toggle('chosenContent');
            });
        }



        // 모달 확인 버튼
        let chosenArr = [];
        let contentsArr2 = [];  // 넘겨줄거
        modalOkBtn.addEventListener('click', function () {
            for (let i = 0; i < 4; i++) {
                if (modalContent[i].classList.contains('chosenContent')) {
                    chosenArr.push(i);
                }
            }
            console.log('-----------');
            //선택된배열 골라내기
            for (let i = 0; i < chosenArr.length; i++) {
                contentsArr2.push(contentsArr[chosenArr[i]]);
            }
            

            fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/contents/select", { //
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "userId": localStorage.getItem('userId'),
                        "historyId": localStorage.getItem('historyId'),
                        "selection": contentsArr2,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.body.success) {    // 정상이면
                            
                            contentsArr2 = [];
                            location.href = '2.html'; // 다음페이지로 넘어가
                            //console.log(data.body.message);
                        }
                        else {
                            //console.log(contentsArr2);
                            //console.log(contentsArr);
                            console.log('data.body : ' + data.body);
                            contentsArr2 = [];
                            // 하나도 선택안하면 아무것도 안일어남
                        }
                    })



            // 배열 비우기전에 넘기면 될듯 
            chosenArr = [];
            
        });


        // 모달 닫기 버튼
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
            chosenArr = [];
            for (let i = 0; i < 4; i++) {
                modalContent[i].classList.remove('chosenContent');
            }
        });
    }
//https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/sentences?userId=userId&historyId=historyId

    fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/sentences?userId=" + localStorage.getItem('userId') + "&historyId=" + localStorage.getItem('historyId'))
        .then((response) => response.json())
        .then((data) => {
            loding.style.display = 'none';
            console.log(data);
            console.log(localStorage.getItem('userId'));
            console.log(localStorage.getItem('historyId'));
            //feeling.innerHTML = data.body.emotion;    // 감정 배열 출력

            const body = document.querySelector('#body');
            //먼저 큰틀
            const container = document.createElement('div');
            container.classList.add('container');
            container.innerHTML =
                `<h1 onclick="location.href = 'main.html'">지금 뭐하지?</h1>
            <h2 id ="feelingTxt">지금 <span id ="feeling"></span> 기분인 것 같아요.</h2>
            <div id="selectText">도움되는 컨텐츠를 추천하기 위해서 <br>아래의 선택지 중 공감되는 말을 선택해주세요.</div>
            <div id="max3">(1개)</div>
            <div class="seletion-parent">
                <div id="s1" class="seletion"></div>
                <div id="s2" class="seletion"></div>
                <div id="s3" class="seletion"></div>
                <div id="s4" class="seletion"></div>
                <input id="s5" class="seletion input" placeholder="직접 입력해주세요."></input>
                <div class = "errTxt"></div>
                <input id="s6" class="seletion input" placeholder="직접 입력해주세요."></input>
                <div class = "errTxt"></div>
                <input id="s7" class="seletion input" placeholder="직접 입력해주세요."></input>
                <div class = "errTxt"></div>
                <button id="addSeletion">+</button>
            </div>
            <button type="button" id="btn">추천받기</button>`
            body.appendChild(container);

            // 제목과 선택지
            selection = document.querySelectorAll('.seletion');
            btn = document.querySelector('#btn');
            feeling = document.querySelector('#feeling');
            addSeletion = document.querySelector('#addSeletion');

            // 에러메시지 
            errMessages = document.querySelectorAll('.errTxt');

            console.log(data.body.emotion);
            switch (data.body.emotion) {
                case 'joy':
                    feeling.innerHTML = '행복한';
                    break;
                case 'anger':
                    feeling.innerHTML = '화난';
                    break;
                case 'disgust':
                    feeling.innerHTML = '역겨운';
                    break;
                case 'sadness':
                    feeling.innerHTML = '슬픈';
                    break;
                case 'fear':
                    feeling.innerHTML = '화난';
                    break;
            }

            for (let i = 0; i < 4; i++) { // 4개는 api로 받아서 넣는다
                selection[i].innerHTML = data.body.sentences[i][0].content;    // 아싸리 태그를 집어너라
                feelingData[i] = data.body.sentences[i][0];
            }

            console.log(data);
            //console.log(data.body.sentences[0][0].Content);
            //console.log('userId = ', localStorage.getItem('userId'))
            //console.log('historyId = ', localStorage.getItem('historyId'))
            init();
        })




}





