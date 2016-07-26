/**
 * Created by emyr on 25/07/16.
 */
var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res) {
  res.send('Hello World')
})


module.exports = router;