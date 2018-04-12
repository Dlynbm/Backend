const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

let allUsers =[];

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/new-user', function(req, res){
    res.render('/new-user');
});


app.post('/new-user', function(req, res){
    let individualUser = {
            userid: req.body.userid,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
    };
    allUsers.push(individualUser);
    console.log(req.body);
    res.render('confirm', {users: allUsers });
});

//app.delete('/new-user, function(req, res){



app.listen(4200, function() {
    console.log('the app is running');
});

