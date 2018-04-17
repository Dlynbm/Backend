const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

let allUsers =[];
let user;

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/new-user', function(req, res){
    res.render('/new-user');
});


//app.get('/delete/:allUsers', (req, rest) => {
    //for(let i = 0; i < allUsers.length; i++){
        //if(allUsers[i].id == req.params.userid) {
            //allUsers.splice(i,1);
        //}
    //}
//});


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

app.get('/edit/:id', (req, res) => {
    console.log('edit user' + req.params.id);
    let userInfo;
    for(let i = 0; i < allUsers.length; i++){
        if(req.params.id === allUsers[i].userid){
            userInfo = allUsers[i];
            res.render('./edit', {user: userInfo});
        }
    }
});

app.post('/edit', (req, res) => {
    let userEdit = {
        userid: req.body.userid,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        id: req.body.id
    };
    for(let i = 0; i < allUsers.length; i++){
        if(req.body.id === allUsers[i].userid){
            allUsers[i] = userEdit;
        }
    }
    res.render('users', {users:allUsers});
});







app.listen(4200, function() {
    console.log('the app is running');
});

