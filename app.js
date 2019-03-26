var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require('superagent');
var mailchimpInstance   = '',
    listUniqueId        = '',
    mailchimpApiKey     = '';





var app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(process.cwd() + '/public'));


app.get('/', function(req, res){
    res.send(fs.readFileSync('./views/signup.html', 'utf8'));
});

app.get('/feed', function(req, res){
    res.send(fs.readFileSync('./views/feed.html', 'utf8'));
});

app.get('/post', function(req,res){
    res.send(fs.readFileSync('./views/post.html', 'utf8'));
});

app.get('/chat', function(req, res){
    res.send(fs.readFileSync('./views/messaging.html', 'utf8'));
});

app.get('/chat-collapsed', function(req, res){
    res.send(fs.readFileSync('./views/collapsed_message.html', 'utf8'));
});



app.post('/', function(req, res){
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
        //   'merge_fields': {
        //     'FNAME': req.body.firstName,
        //     'LNAME': req.body.lastName
        //   }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send(fs.readFileSync('./views/success.html', 'utf8'));
              } else {
                res.send(fs.readFileSync('./views/error.html', 'utf8'));
              }
          });

    
  
});







app.listen(process.env.PORT || 3000, function() {
    console.log('LISTENING!');
});
