const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

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

app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
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

app.get('/resume',(req,res)=>{
    res.render('resume.hbs')
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});