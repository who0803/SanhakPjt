// 패스워드 밑에 가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
const memberBtn = document.querySelector('.members');
const nonMemberBtn = document.querySelector('.Non-members');
const idTxt = document.querySelector('#idTxt');
const password = document.querySelector('#password');
let errMessage = document.querySelector('#errMessage');

memberBtn.addEventListener('click', function () {
    if (idTxt.value === '') { // 아이디를 입력하지 않음
        errMessage.innerHTML = '아이디를 입력해주세요.';
    }
    else if (password.value === '') {    // 비밀번호를 입력하지 않음
        errMessage.innerHTML = '비밀번호를 입력해주세요.';
    }
    else {
        fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": idTxt.value,
                "password": password.value
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === 200) {   // 로그인 성공하면
                    localStorage.setItem('userId', data.body.userId)// 브라우저에 저장
                    localStorage.setItem('userName', idTxt.value)
                    location.href = 'main.html';
                }
                else {  // 로그인 실패하면
                    errMessage.innerHTML = '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.';
                }
            })
    }

});

nonMemberBtn.addEventListener('click', function() {
    localStorage.setItem('userId', -1)// 브라우저에 저장
    location.href = 'main.html';
});