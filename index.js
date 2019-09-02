const expressApp = require('express');
const app = expressApp();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// Mustache
var mustacheExpress = require('mustache-express');
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Local files
app.use(expressApp.static('public'))

//JSON data
var workout_data = require('./workout.json');
//console.log(workout_data);

// Routes
app.get('/', (request, response) => {
  response.sendFile('./welcome.html', { root: __dirname });
});

app.get('/track', (request, response) => {
  response.sendFile('./ryan_track.html', { root: __dirname });
});

app.post('/weekday_workout', (req, res) => {
  var weekday = req.query.weekday;
  res.render('weekday_workout', {"weekday" : weekday, "workout_data" : JSON.stringify(workout_data)});
})
app.listen(3000, function() {
  console.log('Server is running at 3000')
});

module.exports = app;
