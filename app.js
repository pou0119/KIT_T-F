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

app.get('/', (req, res) => {

        // top.htmlをクライアントに送信する前に、データをテンプレートに渡して組み込む
        res.render('top.ejs');
    });



app.get('/member', (req, res) => {
    res.render('member');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
  

