const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const dbName = 'dlyn';


const userSchema = mongoose.Schema({
    userid: String,
    name: String,
    email: String,
    age: Number,

});

const User = mongoose.model('User', userSchema);

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db('dlyn');
    dbo.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("Collection created");
        db.close();
    });
});

let allUsers =[{userid: '001', name: 'Chad Payne', email: 'padarak@live.com', age: '45'},
                //{userid: '002', name: 'Drew Payne', email:'lynpayne@hotmail.com', age:'42'},
                //{userid: '003', name: 'Tom Meyer', email:'drewpayne@live.com', age:'24'},
                //{userid: '004', name: 'Sheynne Beck', email:'cheybeck@gmail.com', age:'13' },
                //{userid: '005', name: 'Cass Haynie', email:'cassidye@gmail.com', age:'18'},
                //{userid: '006', name: 'Shelby Day', email: 'dayshelb@live.com', age:'24'},
                //{userid: '007', name: 'Lori Night', email: 'lknight@hotmail.com', age:'55'},
                //{userid: '008', name: 'Ashely Hoyal', email:'ashhoyal@live.com', age:'24'},
                //{userid: '009', name: 'Bob Whitaker', email: 'bobby@gmail.com', age: '66'},
                //userid: '010', name: 'Thomas Barker', email: 'tbarkers@live.com', age: '46'}
];
let user;

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//new code starts here

//get user data
app.get('/get-data', function(req, res, next) {
    let resultArray = [];
    MongoClient.connect(url, function(err, deb) {
        assert.equal(null, err);
        let cursor = db.collection('users').find();
        cursor.forEach(function(doc, err) {
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('/new-user', {individualuser: resultArray});
        });
    });
});

app.post('/new-user', function(req, res, next) {
const individualuser = {
    userid: req.body.userid,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
};
MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection('users');
    db.collection('users').insertOne({individualuser}, function(err, result) {
        console.log("item inserted");
        client.close();
    });
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs);
        res.render('confirm', ({
            users: docs
        }));
    });
});
});



app.post('/update', function(req, res, next) {

});

app.get('/delete/:id', function(req, res) {

    // MongoClient.connect(url, function(err, client) {
    //     const db = client.db(dbName);
    //     const collection=db.collection('users');
    //     db.collection.deleteOne({individualuser}, function(err, result) {
    //     console.log('user deleted');
    //     client.close();
    //     res.render('confirm')
    // });
});



//new code ends here










// app.get('/new-user', function(req, res){
//     res.render('/new-user');
// });


// app.post('/new-user', function(req, res) {
//     let individualUser = {
//         userid: req.body.userid,
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//     };
//     allUsers.push(individualUser);
//     console.log(req.body);
//     res.render('confirm', {users: allUsers });
//     });

// app.get('/edit/:id', (req, res) => {
//     console.log('edit user' + req.params.id);
//     let userInfo;
//     for(let i = 0; i < allUsers.length; i++){
//         if(req.params.id === allUsers[i].userid){
//             userInfo = allUsers[i];
//             res.render('./edit', {user: userInfo});
//         }
//     }
// });
//
// app.post('/edit', function(req, res){
//     console.log(req.body.name);
//     console.log(req.body.userid);
//     let userEdit = {
//         userid: req.body.userid,
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age,
//         id: req.body.id
//     };
//     for(let i = 0; i < allUsers.length; i++){
//         if(req.body.userid === allUsers[i].userid){
//             allUsers[i] = userEdit;
//         }
//     }
//     res.render('confirm', {users:allUsers});
// });
//
// app.get('/delete/:userid', (req, res) => {
//     console.log('delete user');
//     for(let i = 0; i < allUsers.length; i++){
//         if(req.params.userid === allUsers[i].userid) {
//             allUsers.splice(i,1);
//         }
//     }
//     //resp.end('/');
//     res.render('confirm', {users: allUsers });
//
// });


app.listen(4200, function() {
    console.log('the app is running');
});

