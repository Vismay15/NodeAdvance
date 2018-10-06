const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine','hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toDateString();
    var log = `Request Received -> Time: ${now}, method: ${req.method}, path: ${req.path}` + '\n';
    fs.appendFile('server.log',log,(error)=>{
        if(error){
            console.log('error appending to a file');
        }
    })
    next();
});

app.use((req,res,next)=>{
    res.render('maintainance.hbs');
});

app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    res.send({
        name: 'Vismay',
        LatName: 'Patel',
        age:'23'
    });
});

app.get('/home',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    res.render('about.hbs',{
        pageTitle: 'Vismay Patel',
        year: new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    res.render('about.hbs',{
        pageTitle: 'Vismay Patel',
        year: new Date().getFullYear()
    });
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});