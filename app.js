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
    connection.query('SELECT * FROM member WHERE event_id=2',(error,results2,fields)=>{
        if(error){
            console.log('データの取得中にエラーが発生しました:', error);
            return;
        }

        connection.query('SELECT * FROM member WHERE event_id=3',(error,results3,fields)=>{
            if(error){
                console.log('データの取得中にエラーが発生しました:', error);
                return;
            }

            connection.query('SELECT * FROM member WHERE event_id=4',(error,results4,fields)=>{
                if(error){
                    console.log('データの取得中にエラーが発生しました:', error);
                    return;
                }
                connection.query('SELECT * FROM member WHERE event_id=1', (error, results1, fields) => {
                    if (error) {
                      console.error('データの取得中にエラーが発生しました:', error);
                      return;
                    }
                    res.render('member',{data1:results1,data2:results2,data3:results3,data4:results4});
                });
                
            });
            
        });

    });
    
    
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
  

