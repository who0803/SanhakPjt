//로그인 안되어있을 경우 로그인 페이지로 넘어감
const loginJudge = document.querySelector('#body');
if (!localStorage.getItem('userName')) {
    loginJudge.innerHTML = '로그인 해주세요<br>3초 후 로그인 페이지로 이동합니다.';
    loginJudge.style.color = 'gray';
    loginJudge.style.fontSize = '3rem';
    loginJudge.style.textAlign = 'center';
    loginJudge.style.justifyContent = 'center';
    loginJudge.style.alignItems = 'center';
    loginJudge.style.height = '100vh';
    setTimeout(function () {
        window.location.href = 'login.html'; // 로그인 안돼있으면 로그인 페이지로 이동
    }, 3000);
}
else {  // 로그인 되어있을 경우만 실행
    const bodyTag = document.querySelector('body');
    const guest = document.querySelector('#guest');
    const logout = document.querySelector('#logout');
    const loding = document.querySelector('#loding');
    // 로그아웃
    logout.addEventListener('click', function () { // 로그아웃 누르면 로그아웃하고 로그인페이지로 넘어가
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        location.href = 'login.html';
    });

    // 회원정보
    if (localStorage.getItem('userName')) guest.innerHTML = localStorage.getItem('userName') + " 님";

    // 컨텐츠 추천 페이지에서 여기에 별모양 하나 넣으면 좋을 듯!!!!!!!!!!!!!!!1

    const contentMenu = document.querySelector('#menu');
    const movieMenu = document.querySelector('.movie');
    const bookMenu = document.querySelector('.book');


    fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/users/preference/" + localStorage.getItem('userId'))
        .then((response) => response.json())
        .then((data) => {
            loding.style.display = 'none';
            var contentsNum = data.body.data[0].length;   // 임시 컨텐츠 수
            console.log(data.body.data[0].length);

            const contentContainer = document.querySelector('#contentContainer');

            const like = document.querySelector('.like');      // 컨텐츠 테이블
            const likeTable = document.querySelector('.likeContentTable');      // 좋아요 컨텐츠 테이블

            const hate = document.querySelector('.hate');      // 컨텐츠 테이블
            const hateTable = document.querySelector('.hateContentTable');      // 싫어요 컨텐츠 테이블



            const contentNum = document.querySelector('#contentNum');   // 컨텐츠 수 표시 (몇개의 영화가 표시되었습니다.)
            // 모달
            const modal = document.querySelector('.modal');                         // 모달 전체 페이지
            const closeBtn = document.querySelector('#modalCloseBtn');
            const modalTitle = document.querySelector('#modalTitle');
            const modalImg = document.querySelector('#modalImg');
            const modaldescription = document.querySelector('#modaldescription');




            like.innerHTML = '좋아요';
            hate.innerHTML = '싫어요';




            let contentFlag = 0;    // 0이 영화 1이 책


            function delLike(index, flag, content) {
                fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/contents/preference", { //
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "userId": localStorage.getItem('userId'),
                        "historyId": localStorage.getItem('historyId'),
                        "contentId": index,
                        "isLike": flag,
                        "type": content
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => { 
                        console.log("del");
                    })
            }


            // 컨텐츠 생성함수
            function createTable(i, j, row, dataIdx) {   // i는 몇번째 줄인지, j는 라인에서 몇번째 컨텐츠인지. 그래서 이걸로 컨텐츠가 몇번째 인지 알 수 있다. row는 row 박스
                // 컨텐츠 박스
                console.log(data.body.data[dataIdx][i * 4 + j].title);
                const content = document.createElement('div');
                content.classList.add('content');
                content.setAttribute('data-content', i * 4 + j);  // 컨텐츠 번호

                // 컨텐츠 이미지 앞면
                const contentImg = document.createElement('div');
                contentImg.classList.add('contentImg');
                contentImg.style.backgroundImage = "url(" + data.body.data[dataIdx][i * 4 + j].image + ")";   // 몇번째로 해야하지?




                //console.log(body.likeMovies[j][0].img);
                // 컨텐츠 정보(포스터 밑 제목과 따봉표시)
                const contentInfo = document.createElement('div');
                contentInfo.classList.add('contentInfo');
                // 컨텐츠 제목
                const contentTitle = document.createElement('div');
                contentTitle.classList.add('contentTitle');
                contentTitle.innerHTML = data.body.data[dataIdx][i * 4 + j].title; // 인덱스로 정보 가지고와서 넣는다

                // 추천(추천 박스)
                const thumbsUp = document.createElement('div');
                thumbsUp.classList.add('thumbsUp');
                thumbsUp.classList.add('thumbs');

                // 추천이미지
                const thumbsUpImg = document.createElement('div');
                thumbsUpImg.classList.add('thumbsUpImg');
                thumbsUpImg.classList.add('thumbsImg');
                thumbsUpImg.style.backgroundImage = "url(img/bin.png)";

                // 추천 텍스트
                const thumbsUpTxt = document.createElement('div');
                thumbsUpTxt.classList.add('thumbsUpTxt');
                thumbsUpTxt.classList.add('thumbsTxt');
                thumbsUpTxt.innerHTML = '삭제';


                thumbsUp.appendChild(thumbsUpImg);
                thumbsUp.appendChild(thumbsUpTxt);
                contentInfo.appendChild(contentTitle);
                contentInfo.appendChild(thumbsUp);
                content.appendChild(contentImg);
                content.appendChild(contentInfo);
                row.appendChild(content);   // 추가
            }



            function createRow(flag, delNum, dataIdx, table) {
                //console.log('delNum '+ delNum);
                if (flag) {
                    console.log('data.body.data[dataIdx][delNum].title : ' + data.body.data[dataIdx][delNum].title);
                    switch (dataIdx) {
                        case 0:
                            console.log('data.body.data[dataIdx][delNum].idx : ' + data.body.data[dataIdx][delNum].idx);
                            delLike(data.body.data[dataIdx][delNum].idx, true, 'movie')
                            break;
                        case 1:
                            console.log('data.body.data[dataIdx][delNum].idx : ' + data.body.data[dataIdx][delNum].idx);
                            delLike(data.body.data[dataIdx][delNum].idx, false, 'movie')
                            break;
                        case 2:
                            console.log('data.body.data[dataIdx][delNum].idx : ' + data.body.data[dataIdx][delNum].idx);
                            delLike(data.body.data[dataIdx][delNum].idx, true, 'book')
                            break;
                        case 3:
                            console.log('data.body.data[dataIdx][delNum].idx : ' + data.body.data[dataIdx][delNum].idx);
                            delLike(data.body.data[dataIdx][delNum].idx, false, 'book')
                            break;
                    }
                    data.body.data[dataIdx].splice(delNum, 1); // 데이터 삭제
                }

                contentsNum = data.body.data[dataIdx].length;   // 임시 컨텐츠 수 갱신
                console.log(data.body.data[dataIdx].length);

                var remainder = 0;
                if (contentsNum % 4 > 0) {  // 컨텐츠가 4로 딱 안나눠 떨어져도 row div가 필요하기 때문에 
                    remainder = 1;
                }
                // 컨텐츠 갯수에 맞게 row div 생성
                for (let i = 0; i < Math.floor(contentsNum / 4) + remainder; i++) {   // row 생성
                    //console.log(Math.floor(contentsNum/4) + remainder);
                    const row = document.createElement('div');
                    row.classList.add('row');

                    if (i === Math.floor(contentsNum / 4)) {  // 나머지가 있다면 그 나머지에서는 
                        for (let j = 0; j < contentsNum % 4; j++) {   // row에 나머지만큼 컨텐츠 넣기
                            createTable(i, j, row, dataIdx);
                        }
                    }
                    else {
                        for (let j = 0; j < 4; j++) {   // row에 컨텐츠 넣기
                            createTable(i, j, row, dataIdx);
                        }
                    }
                    table.appendChild(row);
                    //row.setAttribute( 'data-row', i );

                }

                if (contentsNum === 0) table.innerHTML = 'Empty';
                //const rowArr = document.querySelectorAll('.row');   // row들의 배열 
            }








            // 메뉴핸들러
            contentMenu.addEventListener('click', function (e) {
                console.log(e.target);
                if (e.target.parentNode.classList.contains('movie')) {
                    movieMenu.classList.add('selected');
                    bookMenu.classList.remove('selected');
                    likeTable.innerHTML = '';
                    hateTable.innerHTML = '';
                    createRow(false, 0, 0, likeTable);
                    createRow(false, 0, 1, hateTable);
                    contentFlag = 0;
                }
                else if (e.target.parentNode.classList.contains('book')) {
                    bookMenu.classList.add('selected');
                    movieMenu.classList.remove('selected');
                    likeTable.innerHTML = '';
                    hateTable.innerHTML = '';
                    createRow(false, 0, 2, likeTable);
                    createRow(false, 0, 3, hateTable);
                    contentFlag = 1;
                }
            });

            // 이미지 앞면 배열
            //const frontArr = document.querySelectorAll('.contentImgFront');

            // 추천배열
            //const upArr = document.querySelectorAll('.thumbsUp');




            // table이벤트 위임
            contentContainer.addEventListener('click', function (e) {
                const targetElem = e.target;	// 클릭한 거
                const num = targetElem.parentNode.parentNode.parentNode.dataset.content; // content div의 번호
                //console.log(targetElem.parentNode.classList.contains('content'));
                //console.log(targetElem.parentNode);
                console.log(targetElem);

                // 삭제버튼 눌렀을 경우
                if (targetElem.parentNode.classList.contains('thumbsUp')) {
                    // flag[num][0]이 추천 flag[num][1]이 비추천 데이터셋
                    console.log(targetElem);
                    console.log(num);

                    if (contentFlag === 0) {    // 영화일때
                        // 다 삭제하고 다시 만들어야할 듯
                        if (targetElem.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('likeContentTable')) {
                            //console.log(targetElem.parentNode.parentNode.parentNode.parentNode.parentNode);
                            likeTable.innerHTML = '';   // 다 지우고
                            createRow(true, num, 0, likeTable); // 삭제할 컨텐츠 넘버 넣음
                        }
                        else if (targetElem.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('hateContentTable')) {
                            //console.log(targetElem.parentNode.parentNode.parentNode.parentNode.parentNode);
                            hateTable.innerHTML = '';   // 다 지우고
                            createRow(true, num, 1, hateTable); // 삭제할 컨텐츠 넘버 넣음
                        }
                    }
                    else {  // 책일때
                        if (targetElem.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('likeContentTable')) {
                            //console.log(targetElem.parentNode.parentNode.parentNode.parentNode.parentNode);
                            likeTable.innerHTML = '';   // 다 지우고
                            createRow(true, num, 2, likeTable); // 삭제할 컨텐츠 넘버 넣음
                        }
                        else if (targetElem.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('hateContentTable')) {
                            //console.log(targetElem.parentNode.parentNode.parentNode.parentNode.parentNode);
                            hateTable.innerHTML = '';   // 다 지우고
                            createRow(true, num, 3, hateTable); // 삭제할 컨텐츠 넘버 넣음
                        }
                    }


                }

                // 모달 띄우기
                if (targetElem.parentNode.classList.contains('content')) { // 누른거의 부모가 컨텐츠인 경우에만 가능
                    console.log(targetElem.parentNode.dataset.content + "번 컨텐츠 정보"); // 이러면 각 컨텐츠가 몇번째인지 알 수 있다
                    if (contentFlag === 0) { // 영화일 때
                        if (targetElem.parentNode.parentNode.parentNode.classList.contains('likeContentTable')) {
                            modalTitle.innerHTML = data.body.data[0][targetElem.parentNode.dataset.content].title;
                            modalImg.style.backgroundImage = "url(" + data.body.data[0][targetElem.parentNode.dataset.content].image + ")";
                            modaldescription.innerHTML = data.body.data[0][targetElem.parentNode.dataset.content].description;
                            modal.style.display = 'flex';
                        }
                        else if (targetElem.parentNode.parentNode.parentNode.classList.contains('hateContentTable')) {
                            modalTitle.innerHTML = data.body.data[1][targetElem.parentNode.dataset.content].title;
                            modalImg.style.backgroundImage = "url(" + data.body.data[1][targetElem.parentNode.dataset.content].image + ")";
                            modaldescription.innerHTML = data.body.data[1][targetElem.parentNode.dataset.content].description;
                            modal.style.display = 'flex';
                        }
                    }
                    else {  // 책일 때
                        if (targetElem.parentNode.parentNode.parentNode.classList.contains('likeContentTable')) {
                            modalTitle.innerHTML = data.body.data[2][targetElem.parentNode.dataset.content].title;
                            modalImg.style.backgroundImage = "url(" + data.body.data[2][targetElem.parentNode.dataset.content].image + ")";
                            modaldescription.innerHTML = data.body.data[2][targetElem.parentNode.dataset.content].description;
                            modal.style.display = 'flex';
                        }
                        else if (targetElem.parentNode.parentNode.parentNode.classList.contains('hateContentTable')) {
                            modalTitle.innerHTML = data.body.data[3][targetElem.parentNode.dataset.content].title;
                            modalImg.style.backgroundImage = "url(" + data.body.data[3][targetElem.parentNode.dataset.content].image + ")";
                            modaldescription.innerHTML = data.body.data[3][targetElem.parentNode.dataset.content].description;
                            modal.style.display = 'flex';
                        }
                    }
                    bodyTag.classList.add('not-scroll');
                }


            });

            closeBtn.addEventListener('click', function () {
                modal.style.display = 'none';
                bodyTag.classList.remove('not-scroll');
            });


            // 처음에는 영화
            createRow(false, 0, 0, likeTable);
            createRow(false, 0, 1, hateTable);
        })
}







