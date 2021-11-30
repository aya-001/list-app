const express = require('express');
const app = express();

/*const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/mydata.db',(err) =>{
if(err){
   console.log(error.message)
}
});*/

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

app.get('/',(req, res) => {
res.render('top.ejs');
});

app.get('/index',(req,res) => {
res.render('index.ejs');
});

app.get('/new',(req,res) => {
    res.render('new.ejs');
});

app.get('/create',(req,res) =>{
   console.log(req.body.itemName);
});

app.post('/delete',(req,res) =>{
   res.redirect('/index');
});
/*Node.js 2 → SQL */

app.listen(3000);
