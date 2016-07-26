/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');

function Controller(model , view){
  var binder = new crochet.Binder();
  var model = _model;
  var view = _view;
  console.log(model , view , label , crochet.getCrochetAttributes(view.getElement()) , crochet.getCrochetElements(label.getElement()));
}

module.exports = Controller;