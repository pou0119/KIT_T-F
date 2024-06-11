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

// window.onload = function() {
//   // 新しいプロフィール写真のURL
//   var newProfilePictureURL = "/img/KIT_logo.gif";
  
//   // .img-wrapper要素を取得
//   var imgWrappers = document.querySelectorAll(".img-wrapper");

//   // すべての.img-wrapper要素に対してループを実行し、背景画像を変更
//   imgWrappers.forEach(function(imgWrapper, index) {
//       if (index === 0) {
//           // 一番目の.img-wrapper要素
//           imgWrapper.style.backgroundImage = "url('" + newProfilePictureURL + "')";
//       } else if (index === 1) {
//           // 二番目の.img-wrapper要素
//           // ここに背景画像を変更するコードを追加
//       }
//       // 他の要素に対する条件分岐を追加することもできます
//   });
// };

var arrayElement = document.getElementById("array-container");
var arrayDataFromHTML = JSON.parse(arrayElement.dataset.array);

// データを表示
console.log(arrayDataFromHTML[1]);