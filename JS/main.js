const btn = document.querySelector('#btn');
        let text = document.querySelector('#text');
        let textMessage = document.querySelector('#textMessage');   // 아무글도 입력안했을 때
        let selectMessage = document.querySelector('#selectMessage');   // 아무 문도 선택안했을 때
        const login = document.querySelector('#login');
        const logout = document.querySelector('#logout');
        const guest = document.querySelector('#guest');


        // 회원정보, 로그인, 로그아웃 보여짐 유무 판단
        if (localStorage.getItem('userName')) { // 로그인 되있으면
            logout.style.display = 'block';
            login.style.display = 'none';
            guest.innerHTML = localStorage.getItem('userName')+" 님";
        }
        else {// 제일 처음에 로그인 안되어있는 상태
            login.style.display = 'block';
            logout.style.display = 'none';
            guest.style.display = 'none';
        }

        // 로그아웃
        logout.addEventListener('click', function () { // 로그아웃 누르면
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            location.href = 'login.html';
        });
        
        // 문
        const stageElem = document.querySelector('.stage');	// 부모태그
        // 현재 활성화된 아이템을 저장
        let currentItem;	// 공유되는 변수// door



        // 문 이벤트//////////
        // 활성화
        function activate(elem) {
            elem.classList.add('door-opened');
            currentItem = elem;	// 열린거 갱신해줘야함
        }

        // 비활성화
        function inactivate(elem) {
            elem.classList.remove('door-opened');
        }

        function doorHandler(e) {	// EventListener로 실행이 되면 자동으로 첫번째 매개변수 자리에는 이벤트라는 특별한 객체 들어옴
            let targetElem = e.target;	// 클릭한 거
            console.log(targetElem);
            if (currentItem) {	// 활성화된 것이 뭐라도 있으면
                inactivate(currentItem);	// 비활성화 시키고
            }

            if (targetElem.classList.contains('contentName')) { // book, movie텍스트 누를 경우에도 작동하게
                targetElem = targetElem.parentNode;
            }
            // 아 열린문을 눌렀을 때 닫히기만 하는 이유는 누른게 door-body가 아니고 door-back이나 일분이이기 때문에
            if (targetElem.classList.contains('door-body')) {	// 클릭한 것이 문일 때만 문 활성화시킨다
                activate(targetElem.parentNode);// 클릭한 door-body가 아니고 부모태그인 door에 door-opened가 붙어야함
                selectMessage.innerHTML = '';
            }
        }

        stageElem.addEventListener('click', doorHandler);

        console.log(localStorage.getItem('userId'));



        // 검색버튼
        btn.addEventListener('click', function () {

            if (localStorage.getItem('userId')) {    // 로그인 했으면
                
                if (text.value === '') { // 아무것도 안입력했으면
                    textMessage.innerHTML = '지금 생각나는 말을 입력해주세요!';
                }
                else textMessage.innerHTML = '';


                // 문활성화 된것이 없다는 메시지 
                if (!currentItem) {// 처음에 활성화된 것이 없으면
                    selectMessage.innerHTML = '컨텐츠를 선택해주세요';
                }
                else if (!currentItem.classList.contains('door-opened')) {
                    selectMessage.innerHTML = '컨텐츠를 선택해주세요';
                }


                if (textMessage.textContent === '' && selectMessage.textContent === '') {    // 텍스트도 입력받았고 컨텐츠도 선택했다면
                    textMessage.innerHTML = '분석중입니다.';
                    fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/sentences/init", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "sentence": text.value,    // 사용자가 입력한 문장
                            "type": currentItem.dataset.value,  // 활성화된 문의 정보
                            "userId": localStorage.getItem('userId')
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('data = ', data);
                            if(!data.body.success) {  // 에러일 경우
                                textMessage.innerHTML = data.body.message;
                            }
                            else {
                                localStorage.setItem('historyId', data.body.historyId)// 브라우저에 저장
                                location.href = 'selections.html';
                            }
                        })

                }

            }
            else {
                textMessage.innerHTML = '로그인 해주세요.';
            }
        });