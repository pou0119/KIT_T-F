const bcrypt = require('bcrypt');

// ハッシュ化するパスワード
const plainTextPassword = 'kyukoudai';

// パスワードをハッシュ化
bcrypt.hash(plainTextPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Plain Text Password:', plainTextPassword);
  console.log('Hashed Password:', hashedPassword);
  
  // MySQLのINSERT文も出力
  console.log('\nMySQL INSERT文:');
  console.log(`INSERT INTO users (username, password) VALUES ('admin', '${hashedPassword}');`);
});