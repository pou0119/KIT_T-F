document.addEventListener("DOMContentLoaded", function() {
    // ページの読み込みが完了した際の処理を定義
    var table = document.getElementById("100mtable"); // テーブル全体を取得

    if (table) {
        var tableBody = table.querySelector("tbody"); // テーブル内のtbody要素を取得

        // 5行分のループ（行を作成）
        for (var i = 1; i <= 5; i++) {
            var row = document.createElement("tr"); // 新しい行（tr要素）を作成

            // 各行に3列のセル（td要素）を作成
            for (var j = 1; j <= 3; j++) {
                var cell = document.createElement("td"); // 新しいセル（td要素）を作成
                cell.textContent = "セル " + i + "-" + j; // セルのテキスト内容を設定
                row.appendChild(cell); // 行にセルを追加
            }

            tableBody.appendChild(row); // tbody要素に行を追加
        }
    } else {
        console.error("#100mtable が見つかりませんでした。");
    }
});
