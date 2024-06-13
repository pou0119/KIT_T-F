const express = require('express');
const path=require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.static('views'))

const mysql = require('mysql');
const exp = require('constants');

// MySQLとの接続情報
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SYaa0119kyukouDai0ll9',
  database: 'kit'
});


app.get('/header', (req, res) => {
    res.render('header');
});
  
app.get('/footer', (req, res) => {
    res.render('footer');
});

app.get('/records',(req,res)=>{
    res.render('records');
});

app.get('/results',(req,res)=>{
    res.render('results');
});

app.get('/', (req, res) => {
    // top.htmlをクライアントに送信する前に、データをテンプレートに渡して組み込む
    res.render('top.ejs');
});



app.get('/member', (req, res) => {
    connection.query('SELECT * FROM member WHERE grade IN ("B1", "B2", "B3", "B4", "M1", "M2")', (error, results, fields) => {
        if (error) {
            console.log('データの取得中にエラーが発生しました:', error);
            return;
        }

        // 結果をグレードごとに分類する
        let data = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: []
        };

        results.forEach(row => {
            switch (row.grade) {
                case 'B1':
                    data[1].push(row);
                    break;
                case 'B2':
                    data[2].push(row);
                    break;
                case 'B3':
                    data[3].push(row);
                    break;
                case 'B4':
                    data[4].push(row);
                    break;
                case 'M1':
                    data[5].push(row);
                    break;
                case 'M2':
                    data[6].push(row);
                    break;
            }
        });

        // テンプレートに渡す
        res.render('member', { data });
    });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
  

