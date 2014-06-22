var express = require('express'),
    stylus = require('stylus'),
    nodemailer = require('nodemailer'),
    mongoose = require('mongoose'),
    underscore = require('underscore');

// Env variable
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    app = express(),
    config = {
      mail: require('./data/mail')
    };

// Import the accounts
var Account = require('./model/account')(config, mongoose, nodemailer),
    BookList = require('./model/booklist')(mongoose);
function compile(str, path){
    return stylus(str).set('filename',path);
}

app.configure(function(){
    app.set('views', __dirname + '/server/views');
    app.set('view engine','jade');

    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    /*app.use(stylus.middleware({
        src: __dirname+'/public',
        compile: compile
    }))*/
    app.use(express.static(__dirname+'/public'));
});

mongoose.connect('mongodb://localhost/shareBook');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error..'));
db.once('open', function(){
   console.log('connection made to db');
});

app.get('*',function(req,res){
   res.render("index", {layout:false});
});

app.post('/getlist', function(req, res) {
    
    BookList.getAllItems(function(success) {
        if ( !success ) {
            res.send(500);
            return;
        } else{
            res.send(200, success);
        }
        
        
    });
});

app.post('/getcategories', function(req, res) {
    
    BookList.getCategories(function(success) {
        if ( !success ) {
            res.send(500);
            return;
        } else{
            res.send(200, success);
        }
        
        
    });
});

var port = 3030;
app.listen(port);
console.log('localhost is at port:3030');