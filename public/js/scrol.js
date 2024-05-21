const backBtn = document.getElementById('back-btn');
console.log('dekiteruyo');
window.addEventListener('scroll',()=>{
    // スクロール量をpxで取得
    const scrollValue=document.scrollingElement.scrollTop;

    if (scrollValue >= 700) {
        backBtn.style.display = 'flex';
    }
    // 画面のスクロール量が300px未満であれば、戻るボタンを非表示にする
    else {
        backBtn.style.display = 'none';
    }
});