const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/greetings/:title', function(req, res){
    const title = req.params.title;
    //res.render();
});


app.post('/new-user', function(req, res){
    const userid = req.body.userid;
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    console.log(req.body);
    res.render('confirm', {userid: userid, name:name, email:email, age: age });
});

function goBack() {
    window.history.back();
}
app.listen(4200, function() {
    console.log('the app is running');
});

