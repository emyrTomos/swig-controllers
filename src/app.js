/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');
var applet = require('./applet/_package');
window.addEventListener('load',function(evt){
  var templates = document.querySelectorAll('component');
  var templateStore = {};
  for(i=0;i<templates.length;i++){
    templateStore[templates[i].getAttribute('name')] = templates[i];
  }
  var viewTemplate = templateStore.view;
  var labelTemplate = document.querySelector('div.model [crochet-binding="description"][crochet-type="label"]');
  var colorChange = document.querySelector('div.model [crochet-binding="color"][crochet-type="action"]');
  var sliderChange = document.querySelector('div.model [crochet-binding="something"][crochet-type="label"]');
  //console.log(labelTemplate , colorChange , sliderChange);
  var model = new applet.Model({color:"",name:"Label",description:"Experiment one",colors:[],availableColors:['red','green','orange'],something:0});
  var view = new applet.View(viewTemplate);
  var scope = view.getElement();
  var slider = new crochet.createContentBinding(model , sliderChange , undefined);
  var label = new crochet.createContentBinding(model , labelTemplate , undefined);
  var action = function(_result){
    //console.log(this , _result);
    this.style.backgroundColor = _result;
  }
  var colorBinding = new crochet.createContentBinding(model , colorChange , undefined , action);
  var controller = new applet.Controller(model , view);
  viewTemplate.parentNode.replaceChild(view.getElement(),viewTemplate);
  var newModel = new applet.Model({color:"orange",name:"Other Label",description:"Experiment two"});
    
});
