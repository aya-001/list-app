const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();//import the sqlite3 module//

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
///get values from submitted forms

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


app.get('/', (req, res) => {
   res.render('top.ejs');
});


app.get('/index', (req, res) => {
   db.all(     //call back all of datas//
      'SELECT*FROM ShoppingList',
      (error, results) => {
         console.log(results);//output on the terminal where the server is running.//
         res.render('index.ejs', { ShoppingList: results }); //Pass an object //
      }
   );

});

app.get('/new', (req, res) => {
   res.render('new.ejs'); // Specify the view file within the route//
});

app.post('/create', (req, res) => {
   db.all(
      'INSERT INTO ShoppingList(name) VALUES(?)',
      [req.body.itemName],
      (error, results) => {
         res.redirect('/index');
      }
   );
});


app.post('/delete/:id', (req, res) => {
   db.all(
    'DELETE FROM ShoppingList WHERE id = ?',
    [req.params.id],
    (error,results) =>{
       res.redirect('/index');
    }
   );
   });
app.get('/edit/:id',(req,res) =>{
   res.render('edit.ejs');
}
);

/*Node.js 2 → SQL */

app.listen(3000);
