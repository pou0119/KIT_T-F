var $cards = $('.card-object'),
    $faceButtons = $('.face');

$faceButtons.on('click', flipCard);

function flipCard(event) {
  event.preventDefault();
  
  var $btnFace = $(this),
      $card = $btnFace.parent('.card-object');
  
  if( $card.hasClass('flip-in') ) {
    closeCards($card);
  } else {
    openCard($card);
  }
  
}

function closeCards($card) {
  $card
      .filter('.flip-in')
      .removeClass('flip-in')
      .queue( function() {
        // Force reflow hack
        var reflow = this.offsetHeight;
        $(this)
          .addClass('flip-out')
          .dequeue();
      })
}

function openCard($card) {
  $card
    .removeClass('flip-out')
    .queue( function() {
      // Force reflow hack
      var reflow = this.offsetHeight;
      $(this)
        .addClass('flip-in')
        .dequeue();
    });
    
}

window.onload = function() {
    var arrayElement = document.getElementById("array-container");
    var arrayDataFromHTML = JSON.parse(arrayElement.dataset.array);
    
    // データを表示
    console.log(arrayDataFromHTML[1]);
    
    // .img-wrapper要素を取得
    var imgWrappers = document.querySelectorAll(".img-wrapper");
    var imgFronts = document.querySelectorAll('.card-object.card-1 .front ');
    var imgAvaters = document.querySelectorAll('.card-object.card-1 .back .avatar');
    
    let i = 0;
    // すべての.img-wrapper要素に対してループを実行し、背景画像を変更
    imgWrappers.forEach(function(imgWrapper, index) {
        if (index === i) {
            // 一番目の.img-wrapper要素
            imgWrapper.style.backgroundImage = "url('" + arrayDataFromHTML[i] + "')";
        } 
        i++;
    });
    let j=0;
    imgFronts.forEach(function(imgFront, index) {
        if (index === j) {
            // 一番目の.img-wrapper要素
            imgFront.style.backgroundImage = "url('" + arrayDataFromHTML[j] + "')";
        } 
        j++;
    });
    let k=0;
    imgAvaters.forEach(function(imgAvater, index) {
        if (index === k) {
            // 一番目の.img-wrapper要素
            imgAvater.style.backgroundImage = "url('" + arrayDataFromHTML[k] + "')";
        } 
        k++;
    });
};

