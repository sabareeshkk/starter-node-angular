// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('./app/models/users'); // get our mongoose model

// configuration ===========================================
	
// config files
var db = require('./config/db');
mongoose.connect(db.url); // connect to database
app.set('superSecret', db.secret); // secret variable

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev'));

// routes ==================================================
var api_routes = require('./app/routes/apiroutes')(app);
var auth_route = require('./app/routes/auth')(app);
app.use('/auth', auth_route);
app.use('/api', api_routes);

//if no url is provide d then route to the base url
require('./app/routes/routes')(app); // pass our application into our routes

// start app ===============================================
//app.listen(port);	
var io = require('socket.io').listen(app.listen(port));

io.on('connection', function(socket){
	console.log('connected');
  socket.on('send', function(msg){
  	console.log('msg', msg);
    io.emit('message', msg);
  });
});

console.log('Magic happens on port ' + port); 			// shoutout to the user
/*exports = module.exports = app; 						// expose app*/