var selection = document.querySelectorAll('.seletion');
var count = 0;  /* 누르기 전 상태 */
var count2 = 0; /* 버튼 */

selection.forEach(function (e) {  // 이런식으로 포문 돌려서 핸들러 추가
    e.addEventListener('click', function(e) { // 인덱스로 접근
        count = 0;
        for (var i = 0; i < selection.length; i++) {    /* 선택전 카운트의 개수 */
            if (selection[i].classList.contains('active')) {    /* 하나씩 다 검사 */
                count++;
            }
        }
        console.log("1: " + count);
        if (count === 3 && !(e.currentTarget.classList.contains('active'))) return; /*active가 이미 3개있는데 눌린거 말고 다른 거 눌리면*/
        else e.currentTarget.classList.toggle('active');
        
        count2 = 0;
        for (var i = 0; i < selection.length; i++) {    /* 선택후 카운트의 개수 */
            if (selection[i].classList.contains('active')) {    /* 하나씩 다 검사 */
                count2++;
            }
        }
    });
});


function newPage()  {
    console.log("2: "+count);
    if (count2 !== 0) {
        window.location.href = '2.html'
    }
}
