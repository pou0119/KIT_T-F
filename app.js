const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.static('views'));

const mysql = require('mysql');

// MySQLとの接続情報
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SYaa0119kyukouDai0ll9',
  database: 'kit'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

app.get('/header', (req, res) => {
    res.render('header');
});
  
app.get('/footer', (req, res) => {
    res.render('footer');
});

app.get('/records', (req, res) => {
    res.render('records');
});

app.get('/results', (req, res) => {
    res.render('results');
});

app.get('/', (req, res) => {
    res.render('top');
});

app.get('/blog', (req, res) => {
    res.render('blog');
});

app.get('/member', (req, res) => {
    connection.query('SELECT * FROM member WHERE grade IN ("B1", "B2", "B3", "B4", "M1", "M2")', (error, results) => {
        if (error) {
            console.log('データの取得中にエラーが発生しました:', error);
            return;
        }

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

        res.render('member', { data });
    });
});

app.get('/tournament', (req, res) => {
    connection.query('SELECT * FROM tournament', (error, results) => {
        if (error) {
            console.log('データの取得中にエラーが発生しました:', error);
            return;
        }
        res.render('tournament', { tournaments: results });
    });
});

app.get('/tournamentrecord/:id', (req, res) => {
    const tournamentId = req.params.id;
    connection.query('SELECT * FROM record WHERE tournamentId = ?', [tournamentId], (error, results) => {
        if (error) {
            console.log('データの取得中にエラーが発生しました:', error);
            return;
        }

        // 定義された全ての種目を含むオブジェクト
        const events = {
            '100m': [], '200m': [], '400m': [], '800m': [], '1500m': [], '5000m': [],
            '10000m': [], '110mハードル': [], '100mハードル': [], '400mハードル': [],
            '4×100mリレー': [], '4×400mリレー': [], '3000m障害物競走': [],
            '走り幅跳び': [], '三段跳び': [], '棒高跳び': [], '走り高跳び': [],
            '砲丸投げ': [], '円盤投げ': [], 'ハンマー投げ': [], 'やり投げ': [],
            'マラソン': [], 'ハーフマラソン': [], '10kmレース': [], '20km競歩': [], '50km競歩': []
        };

        // データを種目ごとに分類
        results.forEach(record => {
            if (events[record.event] !== undefined) {
                events[record.event].push(record);
            }
        });

        // テンプレートにデータを渡してレンダリング
        res.render('tournamentrecord', { events });
    });
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
