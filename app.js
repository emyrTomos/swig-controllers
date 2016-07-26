var express = require('express')
var swig = require('swig');
var path = require('path');
var routes = require('./routes/index');
var api = require('./routes/api');
var app = express()
app.engine('swig', swig.renderFile)
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/api', api);

app.listen(3000);
