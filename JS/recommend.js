//로그인 안되어있을 경우 로그인 페이지로 넘어감
const loginJudge = document.querySelector('#body');
if (!localStorage.getItem('userId')) {
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

    const body = document.querySelector('body');
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




    fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/contents/recommend?userId=" + localStorage.getItem('userId') + "&historyId=" + localStorage.getItem('historyId'))
        .then((response) => response.json())
        .then((data) => {

            loding.style.display = 'none';
            console.log('data.body.data: '+data.body.data);
            var contentsNum = data.body.data.length;   // 임시 컨텐츠 수
            console.log(contentsNum);

            const recommendMessage = document.querySelector('#recommendMessage');
            if (data.body.type === 'movie') recommendMessage.innerHTML = '이런 영화 어떠세요?';
            else recommendMessage.innerHTML = '이런 책 어떠세요?';

            const table = document.querySelector('#contentTable');
            const btn = document.querySelector('#btn');
            const contentNum = document.querySelector('#contentNum');   // 컨텐츠 수 표시
            // 모달
            const modal = document.querySelector('.modal');
            const closeBtn = document.querySelector('#modalCloseBtn');
            const modalTitle = document.querySelector('#modalTitle');
            const modalEtc = document.querySelector('#modalEtc');
            const modalImg = document.querySelector('#modalImg');
            const modaldescription = document.querySelector('#modaldescription');
            let recommendBadge; // 나중에 사용하기위해서 밖으로 빼둠

            if (data.body.type === 'movie') contentNum.innerHTML = contentsNum + '개의 영화가 추천되었습니다.';
            else contentNum.innerHTML = contentsNum + '개의 책이 추천되었습니다.';
            

            // 컨텐츠 생성함수
            function createTable(i, j, row) {
                // 컨텐츠 박스
                const content = document.createElement('div');
                content.classList.add('content');
                content.setAttribute('data-content', i * 4 + j);  // 컨텐츠 번호

                // 컨텐츠 이미지 앞면
                const contentImg = document.createElement('div');
                contentImg.classList.add('contentImg');
                contentImg.classList.add('contentImgFront');
                contentImg.style.backgroundImage = "url(" + data.body.data[i * 4 + j].image + ")";   // 몇번째로 해야하지?
                // 추천뱃지
                recommendBadge = document.createElement('div');
                recommendBadge.classList.add('recommendBadge');
                recommendBadge.style.backgroundImage = "url(img/badge.png)";

                // 이미지 뒷면
                const contentImgBack = document.createElement('div');
                contentImgBack.classList.add('contentImg');
                contentImgBack.classList.add('contentImgBack');
                contentImgBack.innerHTML = '☹';

                //console.log(body.data[j][0].img);
                // 컨텐츠 정보
                const contentInfo = document.createElement('div');
                contentInfo.classList.add('contentInfo');
                // 컨텐츠 제목
                const contentTitle = document.createElement('div');
                contentTitle.classList.add('contentTitle');
                contentTitle.innerHTML = data.body.data[i * 4 + j].title;

                // 추비추
                const evaluationBox = document.createElement('div');
                evaluationBox.classList.add('evaluationBox');

                // 추천
                const thumbsUp = document.createElement('div');
                thumbsUp.classList.add('thumbsUp');
                thumbsUp.classList.add('thumbs');

                // 추천이미지
                const thumbsUpImg = document.createElement('div');
                thumbsUpImg.classList.add('thumbsUpImg');
                thumbsUpImg.classList.add('thumbsImg');
                thumbsUpImg.style.backgroundImage = "url(img/thumbsup.png)";

                // 추천 텍스트
                const thumbsUpTxt = document.createElement('div');
                thumbsUpTxt.classList.add('thumbsUpTxt');
                thumbsUpTxt.classList.add('thumbsTxt');
                thumbsUpTxt.innerHTML = '좋아요';

                // 비추천
                const thumbsDown = document.createElement('div');
                thumbsDown.classList.add('thumbsDown');
                thumbsDown.classList.add('thumbs');
                // 비추천이미지
                const thumbsDownImg = document.createElement('div');
                thumbsDownImg.classList.add('thumbsDownImg');
                thumbsDownImg.classList.add('thumbsImg');
                thumbsDownImg.style.backgroundImage = "url(img/thumbsdown.png)";
                // 비추천 텍스트
                const thumbsDownTxt = document.createElement('div');
                thumbsDownTxt.classList.add('thumbsDownTxt');
                thumbsDownTxt.classList.add('thumbsTxt');
                thumbsDownTxt.innerHTML = '싫어요';

                contentImg.appendChild(recommendBadge);
                thumbsUp.appendChild(thumbsUpImg);
                thumbsUp.appendChild(thumbsUpTxt);
                thumbsDown.appendChild(thumbsDownImg);
                thumbsDown.appendChild(thumbsDownTxt);
                evaluationBox.appendChild(thumbsUp);
                evaluationBox.appendChild(thumbsDown);
                contentInfo.appendChild(contentTitle);
                contentInfo.appendChild(evaluationBox);
                content.appendChild(contentImg);
                content.appendChild(contentImgBack);
                content.appendChild(contentInfo);
                row.appendChild(content);   // 추가
            }

            var remainder = 0;
            if (contentsNum % 4 > 0) {
                remainder = 1;
            }
            for (let i = 0; i < Math.floor(contentsNum / 4) + remainder; i++) {   // row 생성
                //console.log(Math.floor(contentsNum/4) + remainder);
                const row = document.createElement('div');
                row.classList.add('row');

                if (i === Math.floor(contentsNum / 4)) {  // 나머지가 있다면 그 나머지에서는 
                    for (let j = 0; j < contentsNum % 4; j++) {   // row에 나머지만큼 컨텐츠 넣기
                        createTable(i, j, row);
                    }
                }
                else {
                    for (let j = 0; j < 4; j++) {   // row에 컨텐츠 넣기
                        createTable(i, j, row);
                    }
                }
                table.appendChild(row);
                //row.setAttribute( 'data-row', i );
                row.classList.add('unvisibleMode');
            }
            const rowArr = document.querySelectorAll('.row');



            // 처음에 두줄은 디폴트로 보여줌 
            let count;
            rowArr[0].classList.remove('unvisibleMode');
            if (contentsNum > 4) {  // 컨텐츠가 1줄 보다 많다면
                rowArr[1].classList.remove('unvisibleMode');
                count = 1;
            }
            else count = 2;
            // 버튼 이벤트
            btn.addEventListener('click', function () {
                console.log('Math.floor(contentsNum/4) + remainder = ', Math.floor(contentsNum / 4) + remainder);
                console.log(count);
                if (count < Math.floor(contentsNum / 4) + remainder) {  //count가 row개수보다 커지면
                    rowArr[count++].classList.remove('unvisibleMode');
                }
                if (count < Math.floor(contentsNum / 4) + remainder) {  //count가 row개수보다 커지면
                    rowArr[count++].classList.remove('unvisibleMode');
                }
                if (count === Math.floor(contentsNum / 4) + remainder) {
                    btn.style.display = "none";
                }
            });




            // 추천배지 배열
            const recommendArr = document.querySelectorAll('.recommendBadge');
            // 이미지 앞면 배열
            const frontArr = document.querySelectorAll('.contentImgFront');
            // 이미지 뒷면 배열
            const backArr = document.querySelectorAll('.contentImgBack');
            // 추천배열
            const upArr = document.querySelectorAll('.thumbsUp');
            // 비추배열
            const downArr = document.querySelectorAll('.thumbsDown');

            let flag = [];   // 각 컨텐츠의 추천버튼 플래그 배열. 2차원배열로 만들기!!!!!!!!!!!!!!!!!
            for (let i = 0; i < contentsNum; i++) { // 컨텐츠 수만큼 돌아서 0 대입
                flag[i] = [0, 0];
            }


            ////////////유저가 추천했었던 컨텐츠 미리 추천표시해줌
            let historyArr = [];  // 유저의 추천 기록
            for (let i = 0; i < contentsNum; i++) {
                if (data.body.data[i].preferenceFlag === 1) {
                    historyArr.push(i); // 이미 추천한 컨텐츠의 테이블 상 인덱스 배열
                }
            }
            for (let i = 0; i < historyArr.length; i++) {
                // 유저가 추천했었던 컨텐츠에 미리 추천표시
                upArr[historyArr[i]].style.border = '5px blue solid';
                console.log(historyArr[i] + "번 좋아");
                // 추천 누르면 뱃지 생기고
                recommendArr[historyArr[i]].style.display = 'block';
                // 트랜스폼
                setTimeout(function () {
                    recommendArr[historyArr[i]].classList.add('badgeTransform');
                }, 100);
                flag[historyArr[i]][0] = 1;
            }
            ////////////




            function isLike(index, flag, content) { // 컨텐츠 인덱스, true/false, book/movie
                fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/contents/preference", { //
                    method: "POST",
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
                        console.log("api");
                    })
            }

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


            // table이벤트 위임
            table.addEventListener('click', function (e) {
                const targetElem = e.target;	// 클릭한 거
                const num = targetElem.parentNode.parentNode.parentNode.parentNode.dataset.content;
                //console.log(targetElem.parentNode.classList.contains('content'));
                //console.log(targetElem.parentNode);

                // 추천버튼 눌렀을 경우
                if (targetElem.parentNode.classList.contains('thumbsUp')) {


                    if (flag[num][0] === 0) {   // flag가 0이면 뺏지 생김   //flag[num][0]가 0이면 아직 안눌러져있다는 뜻. 1이면 이미 눌려있다는 뜻
                        if (flag[num][1] === 1) {   // 싫어요가 눌러져 있었다면?

                            //비추가 눌려있는 상황에서 추천	= 비추천 제거하고 추천
                            console.log(num + "번 싫다는 말 취소");
                            //console.log(targetElem.parentNode.parentNode.parentNode.parentNode.dataset.content + "번 싫어");
                            downArr[num].style.border = 'none';
                            frontArr[num].classList.remove('frontReverse');
                            backArr[num].classList.remove('backReverse');
                            flag[num][1] = 0;

                        }

                        // 추천 저장, 비추되어있으면 비추 지움
                        if (data.body.type === 'movie') isLike(data.body.data[num].idx, true, 'movie');
                        else isLike(data.body.data[num].idx, true, 'book');

                        //아무것도 눌려있지 않은 상황에서 추천	= 추천
                        targetElem.parentNode.style.border = '5px blue solid';
                        console.log(num + "번 좋아");
                        // 추천 누르면 뱃지 생기고
                        recommendArr[num].style.display = 'block';
                        // 트랜스폼
                        setTimeout(function () {
                            recommendArr[num].classList.add('badgeTransform');
                        }, 100);
                        flag[num][0] = 1;
                    }
                    else {  // flag가 1이면 뺏지 사라짐
                        
                        if (data.body.type === 'movie') delLike(data.body.data[num].idx, true, 'movie');
                        else delLike(data.body.data[num].idx, true, 'book');

                        //추천이 눌려있는 상황에서 추천	= 추천 제거
                        console.log(num + "번 좋다는 말 취소");
                        targetElem.parentNode.style.border = 'none';
                        recommendArr[num].classList.remove('badgeTransform');
                        recommendArr[num].style.display = 'none';
                        flag[num][0] = 0;
                    }
                }
                // 비추버튼 눌렀을 경우
                if (targetElem.parentNode.classList.contains('thumbsDown')) {
                    if (flag[num][1] === 0) {// flag가 0이면 뒤집어짐
                        if (flag[num][0] === 1) { // 좋아요가 눌러져 있었다면?

                            //추천이 눌려있는 상황에서 비추천	= 추천 제거하고 비추천
                            console.log(num + "번 좋다는 말 취소");
                            upArr[num].style.border = 'none';
                            recommendArr[num].classList.remove('badgeTransform');
                            recommendArr[num].style.display = 'none';
                            flag[num][0] = 0;
                        }

                        // 비추천 저장, 추천되어있으면 추천 지움
                        if (data.body.type === 'movie') isLike(data.body.data[num].idx, false, 'movie');
                        else isLike(data.body.data[num].idx, false, 'book');

                        //아무것도 눌려있지 않은 상황에서 비추	= 비추천
                        console.log(num + "번 싫어");
                        //console.log(targetElem.parentNode.parentNode.parentNode.parentNode.dataset.content + "번 싫어");
                        currentThumbs = targetElem.parentNode;
                        targetElem.parentNode.style.border = '5px red solid';
                        frontArr[num].classList.add('frontReverse');
                        backArr[num].classList.add('backReverse');
                        flag[num][1] = 1;
                    }
                    else {// flag가 1이면 원래대로

                        if (data.body.type === 'movie') delLike(data.body.data[num].idx, false, 'movie');
                        else delLike(data.body.data[num].idx, false, 'book');
                        //비추가 눌려있는 상황에서 비추천	= 비추천 제거
                        console.log(num + "번 싫다는 말 취소");
                        //console.log(targetElem.parentNode.parentNode.parentNode.parentNode.dataset.content + "번 싫어");
                        targetElem.parentNode.style.border = 'none';
                        frontArr[num].classList.remove('frontReverse');
                        backArr[num].classList.remove('backReverse');
                        flag[num][1] = 0;
                    }

                }
                // 모달 띄우기
                if (targetElem.parentNode.classList.contains('content')) { // 누른거의 부모가 컨텐츠인 경우에만 가능
                    console.log(targetElem.parentNode.dataset.content + "번 컨텐츠 정보"); // 이러면 각 컨텐츠가 몇번째인지 알 수 있다
                    modalTitle.innerHTML = data.body.data[targetElem.parentNode.dataset.content].title;
                    modalEtc.innerHTML = data.body.data[targetElem.parentNode.dataset.content].etc;
                    
                    modalImg.style.backgroundImage = "url(" + data.body.data[targetElem.parentNode.dataset.content].image + ")";
                    modaldescription.innerHTML = data.body.data[targetElem.parentNode.dataset.content].description;
                    modal.style.display = 'flex';

                    // 바디 스크롤 제거
                    body.classList.add('not-scroll');
                }


            });

            closeBtn.addEventListener('click', function () {
                modal.style.display = 'none';
                body.classList.remove('not-scroll');
            });
        })
}