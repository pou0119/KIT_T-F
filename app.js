const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const cookieParser = require('cookie-parser'); // cookie-parserの追加
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

// MySQL接続設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SYaa0119kyukouDai0ll9',
  database: 'kit'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('データベースに接続しました！');
});

// ビューエンジン設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静的ファイル
app.use(express.static('public'));

// ミドルウェア設定
app.use(cookieParser()); // cookie-parserを使用
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 画像アップロード設定
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ルーティング
app.get('/', (req, res) => {
  res.render('top');
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

app.get('/member', (req, res) => {
  connection.query('SELECT * FROM member WHERE grade IN ("B1", "B2", "B3", "B4", "M1", "M2")', (error, results) => {
    if (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      return;
    }

    let data = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

    results.forEach(row => {
      switch (row.grade) {
        case 'B1': data[1].push(row); break;
        case 'B2': data[2].push(row); break;
        case 'B3': data[3].push(row); break;
        case 'B4': data[4].push(row); break;
        case 'M1': data[5].push(row); break;
        case 'M2': data[6].push(row); break;
      }
    });

    res.render('member', { data });
  });
});

app.get('/tournament', (req, res) => {
  connection.query('SELECT * FROM tournament', (error, results) => {
    if (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      return;
    }
    res.render('tournament', { tournaments: results });
  });
});

app.get('/tournamentrecord/:id', (req, res) => {
  const tournamentId = req.params.id;
  connection.query('SELECT * FROM record WHERE tournamentId = ?', [tournamentId], (error, results) => {
    if (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      return;
    }

    const events = {
      '100m': [], '200m': [], '400m': [], '800m': [], '1500m': [], '5000m': [],
      '10000m': [], '110mハードル': [], '100mハードル': [], '400mハードル': [],
      '4×100mリレー': [], '4×400mリレー': [], '3000m障害物競走': [],
      '走り幅跳び': [], '三段跳び': [], '棒高跳び': [], '走り高跳び': [],
      '砲丸投げ': [], '円盤投げ': [], 'ハンマー投げ': [], 'やり投げ': [],
      'マラソン': [], 'ハーフマラソン': [], '10kmレース': [], '20km競歩': [], '50km競歩': []
    };

    results.forEach(record => {
      if (events[record.event] !== undefined) {
        events[record.event].push(record);
      }
    });

    res.render('tournamentrecord', { events });
  });
});

app.get('/blog', (req, res) => {
  connection.query('SELECT * FROM blog_posts ORDER BY created_at DESC', (error, results) => {
    if (error) {
      console.error('ブログ投稿の取得中にエラーが発生しました:', error);
      return res.status(500).send('ブログ投稿の取得中にエラーが発生しました');
    }
    res.render('blog', { posts: results });
  });
});

app.get('/blogedit', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('blogedit');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', [
  body('username').trim().isLength({ min: 1 }).escape(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('login', {
      error: '入力内容が正しくありません'
    });
  }

  const { username, password } = req.body;
  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error('ログイン中にエラーが発生しました:', error);
      return res.status(500).render('login', {
        error: 'サーバーエラーが発生しました'
      });
    }
    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (result) {
          req.session.userId = results[0].id;
          res.redirect('/blogedit');
        } else {
          res.render('login', {
            error: 'ユーザー名またはパスワードが正しくありません'
          });
        }
      });
    } else {
      res.render('login', {
        error: 'ユーザー名またはパスワードが正しくありません'
      });
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('ログアウト中にエラーが発生しました:', err);
    }
    res.redirect('/');
  });
});

app.post('/blogedit', upload.single('image'), [
  body('title').trim().isLength({ min: 1, max: 255 }).escape(),
  body('content').trim().isLength({ min: 1 }).escape()
], (req, res) => {
  console.log("aaaaaaaaaaaa"); // 追加

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('blogedit', {
      error: '入力内容が正しくありません'
    });
  }

  if (!req.session.userId) {
    return res.status(401).send('未認証');
  }

  const { title, content } = req.body;
  const image_url = req.file ? '/uploads/' + req.file.filename : null;

  connection.query('INSERT INTO blog_posts (title, content, image_url) VALUES (?, ?, ?)', [title, content, image_url], (error) => {
    if (error) {
      console.error('ブログ投稿中にエラーが発生しました:', error);
      return res.status(500).render('blogedit', {
        error: 'ブログの投稿に失敗しました'
      });
    }
    res.redirect('/blog');
  });
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で実行中です`);
});
