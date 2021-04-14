var selection = document.querySelectorAll('.seletion');
var beforeCount = 0;  /* 누르기 전 상태.  선택전 카운트의 개수 */
var afterCount = 0; /* 버튼. 선택후 카운트의 개수 */
const btn = document.querySelector('#btn');
let feeling = document.querySelector('#feeling');
let feelingData = [];    // 감정 객체 데이터 배열

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
                if(selection[i].classList.contains('input')) console.log(selection[i].value);
                else console.log(selection[i].textContent);
                afterCount++;
            }
        }
        console.log("----------------------------------");
    });
});


btn.addEventListener('click', function() {
    //console.log("2: "+count);
    if (afterCount !== 0) { // 하나라도 선택된 것이 있어야 가능
        
        window.location.href = '2.html'
    }
});




