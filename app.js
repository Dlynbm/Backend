const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

let allUsers =[{userid: '001', name: 'Chad Payne', email: 'padarak@live.com', age: '45'},
                {userid: '002', name: 'Drew Payne', email:'lynpayne@hotmail.com', age:'42'},
                {userid: '003', name: 'Tom Meyer', email:'drewpayne@live.com', age:'24'},
                {userid: '004', name: 'Sheynne Beck', email:'cheybeck@gmail.com', age:'13' },
                {userid: '005', name: 'Cass Haynie', email:'cassidye@gmail.com', age:'18'},
                {userid: '006', name: 'Shelby Day', email: 'dayshelb@live.com', age:'24'},
                {userid: '007', name: 'Lori Night', email: 'lknight@hotmail.com', age:'55'},
                {userid: '008', name: 'Ashely Hoyal', email:'ashhoyal@live.com', age:'24'},
                {userid: '009', name: 'Bob Whitaker', email: 'bobby@gmail.com', age: '66'},
                {userid: '010', name: 'Thomas Barker', email: 'tbarkers@live.com', age: '46'}
];
let user;

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

app.post('/edit', function(req, res){
    console.log(req.body.name);
    console.log(req.body.userid);
    let userEdit = {
        userid: req.body.userid,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        id: req.body.id
    };
    for(let i = 0; i < allUsers.length; i++){
        if(req.body.userid === allUsers[i].userid){
            allUsers[i] = userEdit;
        }
    }
    res.render('confirm', {users:allUsers});
});

app.get('/delete/:userid', (req, res) => {
    console.log('delete user');
    for(let i = 0; i < allUsers.length; i++){
        if(req.params.userid === allUsers[i].userid) {
            allUsers.splice(i,1);
        }
    }
    //resp.end('/');
    res.render('confirm', {users: allUsers });

});


app.listen(4200, function() {
    console.log('the app is running');
});

