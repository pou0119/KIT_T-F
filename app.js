const express = require('express');
const path=require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/header.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'header.html'));
});
  
app.get('/footer.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'footer.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'top.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
  