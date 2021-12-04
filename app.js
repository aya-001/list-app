const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();//import the sqlite3 module//

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));


//create a Database object://
const db = new sqlite3.Database('mydata.sqlite3', (err) => {
   if (err) {
     return console.error(err.message);
   }
   console.log('Connected to the in-mydata.sqlite3 SQlite database.');
 });


//  //db.close((err) => {
//    if (err) {
//      return console.error(err.message);
//    }
//    console.log('Close the database connection.');
//  });//


app.get('/',(req, res) => {
res.render('top.ejs');
});


app.get('/index',(req,res) => {
   db.all(
'SELECT*FROM ShoppingLIst',
(error,results) => {
   console.log(results);//output on the terminal where the server is running.//
   res.render('index.ejs');
}
);

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
