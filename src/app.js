/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');
var applet = require('./applet/_package');
window.addEventListener('load',function(evt){
  console.log("Crochet: ", crochet);
  var viewTemplate = document.getElementById('model:view');
  var labelTemplate = document.getElementById('model:label');
  var model = new applet.Model({color:"red",name:"Label",description:"Experiment one"});
  var view = new applet.View(viewTemplate);
  var label = new applet.Label(model , labelTemplate);
});
