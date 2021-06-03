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

    const guest = document.querySelector('#guest');
    const logout = document.querySelector('#logout');

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



    // 임시로 만든 객체 (받은 객체)
    var originalBody = {
        "data": [
            [
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
                [
                    {
                        "title": "라야",
                        "description": `인간과 드래곤이 평화롭게 공존하던 신비의 땅, 쿠만드라 왕국 살아있는 모든 생명을 삼키는 악의 세력 '드룬'이 들이닥치자, 드래곤들은 인간을 구하기 위해 스스로를 희생하고 전설 속으로 사라진다. 500년 후 부활한 '드룬'이 또다시 세상을 공포에 빠뜨리자, 전사 ‘라야’는 분열된 쿠만드라를 구하기 위해 전설 속 마지막 드래곤을 찾아 모험을 떠난다. 그러나, ‘라야’는 험난한 여정을 겪으며 세상을 구하기 위해서는 전설 속 드래곤보다 더 중요한 것이 있다는 것을 깨닫게 되는데…`,
                        "img": "img/raya.png",
                    }
                ],
                [
                    {
                        "title": "고질라vs콩",
                        "description": `거대 몬스터들의 습격을 받은 지 3년 후, 콩은 스컬 아일랜드를 떠나 인간들의 보호관찰을 받고 있다. 한편, 인간들에게 등을 돌린 고질라는 비밀연구회사인 에이펙스에 존재하는 알 수 없는 힘에 이끌려 그곳을 쑥대밭으로 만든다. 위기 상황 속, 지구 안의 또 다른 지구인 할로우 어스의 에너지원을 찾아야만 인류가 안전할 수 있다는 판단하고 콩의 보호자들은 콩과 특별한 유대감을 형성하는 아이 지아와 함께 타이탄들의 고향일지 모르는 그 곳으로 위험한 여정을 떠난다. 그러던 중 분노에 찬 고질라의 공격을 받고, 마침내 맞붙게 된 두 전설의 장대한 대결은 앞으로 닥쳐올 대재앙의 서막에 불과했는데… 세상의 운명을 놓고, 지구상 가장 거대한 신화적 존재들의 스펙터클한 대격돌이 시작된다!`,
                        "img": "img/kong.png"
                    }
                ],
            ],

            [
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
                        "title": "귀멸의 칼날",
                        "description": `혈귀로 변해버린 여동생 ‘네즈코’를 인간으로 되돌릴 단서를 찾아 비밀조직 귀살대에 들어간 ‘탄지로.’ ‘젠이츠’, ‘이노스케’와 새로운 임무 수행을 위해 무한열차에 탑승 후 귀살대 최강 검사 염주 ‘렌고쿠’와 합류한다. 달리는 무한열차에서 승객들이 하나 둘 흔적 없이 사라지자 숨어있는 식인 혈귀의 존재를 직감하는 ‘렌고쿠’. 귀살대 ‘탄지로’ 일행과 최강 검사 염주 ‘렌고쿠’는 어둠 속을 달리는 무한열차에서 모두의 목숨을 구하기 위해 예측불가능한 능력을 가진 혈귀와 목숨을 건 혈전을 시작하는데…`,
                        "img": "img/guikal.png",
                    }
                ],
                [
                    {
                        "title": "라야",
                        "description": `인간과 드래곤이 평화롭게 공존하던 신비의 땅, 쿠만드라 왕국 살아있는 모든 생명을 삼키는 악의 세력 '드룬'이 들이닥치자, 드래곤들은 인간을 구하기 위해 스스로를 희생하고 전설 속으로 사라진다. 500년 후 부활한 '드룬'이 또다시 세상을 공포에 빠뜨리자, 전사 ‘라야’는 분열된 쿠만드라를 구하기 위해 전설 속 마지막 드래곤을 찾아 모험을 떠난다. 그러나, ‘라야’는 험난한 여정을 겪으며 세상을 구하기 위해서는 전설 속 드래곤보다 더 중요한 것이 있다는 것을 깨닫게 되는데…`,
                        "img": "img/raya.png",
                    }
                ],
                [
                    {
                        "title": "고질라vs콩",
                        "description": `거대 몬스터들의 습격을 받은 지 3년 후, 콩은 스컬 아일랜드를 떠나 인간들의 보호관찰을 받고 있다. 한편, 인간들에게 등을 돌린 고질라는 비밀연구회사인 에이펙스에 존재하는 알 수 없는 힘에 이끌려 그곳을 쑥대밭으로 만든다. 위기 상황 속, 지구 안의 또 다른 지구인 할로우 어스의 에너지원을 찾아야만 인류가 안전할 수 있다는 판단하고 콩의 보호자들은 콩과 특별한 유대감을 형성하는 아이 지아와 함께 타이탄들의 고향일지 모르는 그 곳으로 위험한 여정을 떠난다. 그러던 중 분노에 찬 고질라의 공격을 받고, 마침내 맞붙게 된 두 전설의 장대한 대결은 앞으로 닥쳐올 대재앙의 서막에 불과했는데… 세상의 운명을 놓고, 지구상 가장 거대한 신화적 존재들의 스펙터클한 대격돌이 시작된다!`,
                        "img": "img/kong.png"
                    }
                ],
            ],

            [

                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],
                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],
                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],
                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],
            ],

            [
                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],
                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],
                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],

                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],
                [
                    {
                        "title": "작은 별이지만 빛나고 있어",
                        "description": `고단한 일상에서 가끔 우리는 각자의 빛을 잊고 살 때가 있다. 빛나야 하는 이유도 점점 내가 아닌 타인, 혹은 다른 이유가 되어버리는 세상. 세상이 제멋대로 정의한 거대한 별만 바라보느라, 내 안의 빛을 보고 있지 못한 우리에게 건네는 작가의 위로. 잊지 말자, 우리는 모두 각자의 생김새대로, 제각기 다른 방식으로 빛나고 있다는 것을.`,
                        "img": "img/star.png"
                    }
                ],
            ],
        ]
    }

    // 배열 복사해서 사용
    const cloneObj = obj => JSON.parse(JSON.stringify(obj));    // 객체 복사함수
    let body = cloneObj(originalBody);


    var contentsNum = body.data[0].length;   // 임시 컨텐츠 수
    console.log(body.data[0].length);

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



    // 컨텐츠 생성함수
    function createTable(i, j, row, dataIdx) {   // i는 몇번째 줄인지, j는 라인에서 몇번째 컨텐츠인지. 그래서 이걸로 컨텐츠가 몇번째 인지 알 수 있다. row는 row 박스
        // 컨텐츠 박스
        const content = document.createElement('div');
        content.classList.add('content');
        content.setAttribute('data-content', i * 4 + j);  // 컨텐츠 번호

        // 컨텐츠 이미지 앞면
        const contentImg = document.createElement('div');
        contentImg.classList.add('contentImg');
        contentImg.style.backgroundImage = "url(" + body.data[dataIdx][i * 4 + j][0].img + ")";   // 몇번째로 해야하지?




        //console.log(body.likeMovies[j][0].img);
        // 컨텐츠 정보(포스터 밑 제목과 따봉표시)
        const contentInfo = document.createElement('div');
        contentInfo.classList.add('contentInfo');
        // 컨텐츠 제목
        const contentTitle = document.createElement('div');
        contentTitle.classList.add('contentTitle');
        contentTitle.innerHTML = body.data[dataIdx][i * 4 + j][0].title; // 인덱스로 정보 가지고와서 넣는다

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
        if (flag) body.data[dataIdx].splice(delNum, 1); // 데이터 삭제

        contentsNum = body.data[dataIdx].length;   // 임시 컨텐츠 수 갱신
        console.log(body.data[dataIdx].length);

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
                    modalTitle.innerHTML = body.data[0][targetElem.parentNode.dataset.content][0].title;
                    modalImg.style.backgroundImage = "url(" + body.data[0][targetElem.parentNode.dataset.content][0].img + ")";
                    modaldescription.innerHTML = body.data[0][targetElem.parentNode.dataset.content][0].description;
                    modal.style.display = 'flex';
                }
                else if (targetElem.parentNode.parentNode.parentNode.classList.contains('hateContentTable')) {
                    modalTitle.innerHTML = body.data[1][targetElem.parentNode.dataset.content][0].title;
                    modalImg.style.backgroundImage = "url(" + body.data[1][targetElem.parentNode.dataset.content][0].img + ")";
                    modaldescription.innerHTML = body.data[1][targetElem.parentNode.dataset.content][0].description;
                    modal.style.display = 'flex';
                }
            }
            else {  // 책일 때
                if (targetElem.parentNode.parentNode.parentNode.classList.contains('likeContentTable')) {
                    modalTitle.innerHTML = body.data[2][targetElem.parentNode.dataset.content][0].title;
                    modalImg.style.backgroundImage = "url(" + body.data[2][targetElem.parentNode.dataset.content][0].img + ")";
                    modaldescription.innerHTML = body.data[2][targetElem.parentNode.dataset.content][0].description;
                    modal.style.display = 'flex';
                }
                else if (targetElem.parentNode.parentNode.parentNode.classList.contains('hateContentTable')) {
                    modalTitle.innerHTML = body.data[3][targetElem.parentNode.dataset.content][0].title;
                    modalImg.style.backgroundImage = "url(" + body.data[3][targetElem.parentNode.dataset.content][0].img + ")";
                    modaldescription.innerHTML = body.data[3][targetElem.parentNode.dataset.content][0].description;
                    modal.style.display = 'flex';
                }
            }

        }


    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });


    // 처음에는 영화
    createRow(false, 0, 0, likeTable);
    createRow(false, 0, 1, hateTable);

}