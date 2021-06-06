// 인풋태그
let tagArr = [];
const password = document.querySelector('#password');
const CheckPW = document.querySelector('#CheckPW');
const idTxt = document.querySelector('#id-txt');
const age = document.querySelector('#age');
const gender = document.querySelector('#gender');
tagArr[0] = idTxt;
tagArr[1] = password;
tagArr[2] = CheckPW;
tagArr[3] = age;
tagArr[4] = gender;

// 나이 1 ~ 100까지 동적으로 생성
for (let i = 1; i <= 100; i++) {
    const newAge = document.createElement('option');
    newAge.setAttribute('value', i);
    newAge.textContent = i;
    age.appendChild(newAge);
}

// 메시지
let messageArr = [];
const idMessage = document.querySelector('#idMessage');
const pwMessage = document.querySelector('#pwMessage');
const pwErrMessage = document.querySelector('#pwErrMessage');
const ageMessage = document.querySelector('#ageMessage');
const genderMessage = document.querySelector('#genderMessage');
messageArr[0] = idMessage;
messageArr[1] = pwMessage;
messageArr[2] = pwErrMessage;
messageArr[3] = ageMessage;
messageArr[4] = genderMessage;

// 버튼
const btn = document.querySelector('#btn');

// 모달
let modal = document.querySelector('.modal');
const modalBtn = document.querySelector('#modalBtn');
let modalMessage = document.querySelector('.modal p');

// 중복확인
const idCheck = document.querySelector('#idBtn');
let checkedId;

// 가입하기 버튼 이벤트
btn.addEventListener('click', function() {
    console.log(password.value);
    console.log(CheckPW.value);
    
    //비번 입력한게 다르면
    if(password.value !== CheckPW.value) {  
        pwErrMessage.innerHTML = "비밀번호가 일치하지 않습니다.";
        console.log("뭐고1");
    }
    else {
        console.log("뭐고2");
        pwErrMessage.innerHTML = "";
    }
    

    // 입력 유무 판단
    for (let i = 0; i < tagArr.length; i++) {

        if(tagArr[i].value === "") {
            messageArr[i].innerHTML = "필수 정보입니다.";
        }
        else {
            if (messageArr[i].textContent !== "비밀번호가 일치하지 않습니다.") {
                messageArr[i].innerHTML = "";
            }
        }
    }


    // 중복체크 유무 확인
    if (checkedId !== idTxt.value && idTxt.value !== "") {
        idMessage.innerHTML = "중복검사를 해주세요.";
    }
    else if (idTxt.value === "");   // 입력한게 없는 경우는 필수 정보입니다.


    // 모든 에러 메시지가 비어있을 경우
    let flag = 0;
    for (let i = 0; i < messageArr.length; i++) {
        
        if(messageArr[i].textContent === "") {
            flag++;  
        } 
        if (flag === 5) {
            console.log(idTxt.value, password.value, gender.value, age.value)
           
            fetch("https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "username": idTxt.value,
                    "password": password.value,
                    "gender": gender.value,
                    "age": age.value
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    modalMessage.innerHTML = data.body.message;
                    modal.style.display = "flex";// 모달창 띄우기
                })
            
        }
    }
});//



// 모달 버튼
modalBtn.addEventListener('click', function() {
    modal.style.display = "none";
    location.href = 'login.html';   // 로그인 페이지로 이동
});


// 아이디 중복 검사
idCheck.addEventListener('click', function() {
    if(idTxt.value !== '') {
        fetch(`https://zbzvef33kf.execute-api.ap-northeast-2.amazonaws.com/prod/username/${idTxt.value}`)
            .then((response) => response.json())
            .then((data) => {
                idMessage.innerHTML = data.body.message

                // 중복검사 눌렀을 때 사용가능한 아이디면 저장해둠
                if (data.body.message !== '이미 존재하는 아이디 입니다.') {
                    checkedId = idTxt.value;
                }
            })
    }
    else idMessage.innerHTML= '아이디를 입력해주세요.'

    
});