/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');

function Controller(_model , _view){
  var binder = new crochet.createBinder(_model , _view);
  var model = _model;
  var view = _view;
  //console.log("controller" , model , view , binder , this);
}

module.exports = Controller;