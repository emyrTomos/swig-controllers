(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var ContentBinding = require('./ContentBinding');
var InputBinding = require('./InputBinding');
var FieldsetBinding = require('./FieldsetBinding');
var SelectBinding = require('./SelectBinding');
function Binder(_model , _view , _scope){
  var scope = _view.getElement();// || document.body;
  var model = _model;
  var view = _view;
  var bindings = [];
  var element = view.getElement();
  var getInputElements = function(_element){
    return _element.querySelectorAll('[crochet-binding][crochet-type="input"]');
  };
  var getContentElements = function(_element){
    return _element.getElementsByTagName('[crochet-binding][crochet-type="label"]');
  }

  var contentElements = getContentElements(element);
  for(var i=0; i<contentElements.length; i++){
    var binding = new ContentBinding(model , contentElements.item(i),scope);
    binding.bindUpdates();
    bindings.push(binding);
  }
  var inputElements = getInputElements(element);
  for(var i=0; i<inputElements.length; i++){
    var binding;
    var element = inputElements.item(i);
    var name = element.getAttribute('crochet-binding');
    var type = element.getAttribute('crochet-type') || "input";
    if(element.tagName.toUpperCase() === 'FIELDSET'){
      binding = new FieldsetBinding(model,element,name,type,scope);
    }else if(element.tagName.toUpperCase() === 'SELECT'){
      binding = new SelectBinding(model,element,name,type,scope);
    }else{
      binding = new InputBinding(model,element,name,type,scope);
    }
    binding.bindUpdates();
    binding.bindModifications();
    bindings.push(binding);
  }
}
module.exports = Binder;
},{"./ContentBinding":2,"./FieldsetBinding":3,"./InputBinding":4,"./SelectBinding":5}],2:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
ContentBinding.prototype = Object.create(Binding.prototype);

function ContentBinding(element,model,scope){
  Binding.apply(this,arguments);
}
ContentBinding.prototype.updateBinding = function(value){
  this.element.textContent = value;
}

module.exports = ContentBinding;
},{"./_Binding":6}],3:[function(require,module,exports){
/**
 * Created by emyr on 27/07/16.
 */
var InputBinding = require('./InputBinding');
FieldsetBinding.prototype = Object.create(InputBinding.prototype);
function FieldsetBinding(){
  InputBinding.apply(this,arguments);
  this.multi = false;
  if(this.element.elements[0].type === "checkbox"){
    this.multi = true;
  }
};
FieldsetBinding.prototype.updateBinding = function(value){
  if(this.multi){
    for(var i=0; i<this.element.elements.length;i++){
      if(value.indexOf(this.element.elements[i].value)<0){
        this.element.elements[i].checked = false;
      }else{
        this.element.elements[i].checked = true;
      }
    }
  }else{
    this.element.querySelector('[value="'+value+'"]').checked = true;
  }
}
FieldsetBinding.prototype.modify = function(evt){
  var value;
  console.log(evt);
  if(this.multi){
    value = [];
    for(var i=0; i<this.element.elements.length; i++){
      if(this.element.elements[i].checked){
        value.push(this.element.elements[i].value);
      }
    }
  }else{
    value = evt.target.value;
  }
  this.setModelField(value);
  this.broadcast();
}
module.exports = FieldsetBinding;
},{"./InputBinding":4}],4:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
InputBinding.prototype = Object.create(Binding.prototype);

function InputBinding(){
  Binding.apply(this,arguments);
}
InputBinding.prototype.updateBinding = function(value){
  this.element.value = value;
}
InputBinding.prototype.bindModifications = function(){
  this.element.addEventListener('change',this.modify.bind(this));
}
InputBinding.prototype.modify = function(evt){
  var value = this.element.value;
  this.setModelField(value);
  this.broadcast();
}

module.exports = InputBinding;
},{"./_Binding":6}],5:[function(require,module,exports){
/**
 * Created by emyr on 27/07/16.
 */
var InputBinding = require('./InputBinding');
SelectBinding.prototype = Object.create(InputBinding.prototype);
function SelectBinding(){
  InputBinding.apply(this,arguments);
  this.multi = this.element.multiple;
};
SelectBinding.prototype.updateBinding = function(value){
  if(this.multi){
    for(var i=0; i<this.element.options.length;i++){
      if(value.indexOf(this.element.options[i].value)<0){
        this.element.options[i].selected = false;
      }else{
        this.element.options[i].selected = true;
      }
    }
  }else{
    this.element.querySelector('[value="'+value+'"]').selected = true;
  }
}

SelectBinding.prototype.modify = function(evt){
  var value;
  if(this.multi){
    value = [];
    for(var i=0; i<evt.target.options.length; i++){
      if(evt.target.options[i].selected){
        value.push(evt.target.options[i].value);
      }
    }
  }else{
    value = evt.target.value;
  }
  this.setModelField(value);
  this.broadcast();
}
module.exports = SelectBinding;
},{"./InputBinding":4}],6:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
function Binding(_model , _element , _binding , _type , _scope){
  this.scope = _scope || document.body;
  this.type = _type;
  this.model = _model;
  this.element = _element;
  this.binding = _binding;
}
Binding.prototype.bindUpdates = function(){
  this.scope.addEventListener('crochet:update:'+this.binding,this.updateListener.bind(this),true);
  this.scope.addEventListener('crochet:modelChange',this.changeModel.bind(this));
  this.scope.addEventListener('crochet:modelRefresh',this.refreshModel.bind(this));
}
Binding.prototype.changeModel = function(evt){
  if(evt.detail.model === this.model || evt.detail.previousModel === this.model){
    this.updateBinding();
  }
}
Binding.prototype.refreshModel = function(evt){
  if(evt.detail.model === this.model){
    this.updateBinding();
  }
}
Binding.prototype.updateListener = function(evt){
  if(evt.detail.model !== this.model || evt.detail.binding !== this.binding || evt.detail.originElement === this.element){
    return;
  }
  var value = this.getModelField();
  if(this.type === "action" && this.action){
    this.action.call(this.element , value);
  }else{
    this.updateBinding(value);
  }
};
Binding.prototype.setAction = function(_action){
  this.action = _action;
}
Binding.prototype.getModelField = function(){
  var field = "get" + this.binding.charAt(0).toUpperCase() + this.binding.slice(1);
  var candidate = this.model[field];
  if(typeof candidate === 'function'){
    return candidate();
  }else if(typeof candidate === 'undefined'){
    candidate = this.model[this.binding];
    if(typeof candidate === 'undefined'){
      throw "No field called "+ this.binding + " or "+ field + " found";
    }else{
      return candidate;
    }
  }
};
Binding.prototype.setModelField = function(_value){
  var value = _value;
  var field = "set" + this.binding.charAt(0).toUpperCase() + this.binding.slice(1);
  var candidate = this.model[field];
  if(typeof candidate === 'function'){
    candidate(value);
  }else if(this.model[this.binding]){
    this.model[this.binding] = value;
  }else{
    throw "No field called "+ this.binding + " or "+ field + " found";
  }
};
Binding.prototype.broadcast = function(){
  var detail = {model:this.model,binding:this.binding,originElement:this.element};
  var event = new CustomEvent('crochet:update:'+this.binding,{detail:detail});
  this.scope.dispatchEvent(event);
}

module.exports = Binding;
},{}],7:[function(require,module,exports){
/**
 * Created by emyr on 27/07/16.
 */
var CompositeBinder = require('./CompositeBinder');
var ContentBinding = require('./ContentBinding');
var InputBinding = require('./InputBinding');
var FieldsetBinding = require('./FieldsetBinding');
exports.createBinder = function(model , element){
  return new CompositeBinder(model , element);
};
exports.createFieldsetBinding = function(model , element , scope){
  var name = element.getAttribute('crochet-binding');
  var type = element.getAttribute('crochet-type') || "input";
  var binding = new FieldsetBinding(model , element , name , type , scope);
  binding.bindUpdates();
  binding.bindModifications();
  return binding;
};
exports.createInputBinding = function(model , element , scope){
  var name = element.getAttribute('crochet-binding');
  var type = element.getAttribute('crochet-type') || "input";
  var binding = new InputBinding(model , element , name , type , scope);
  binding.bindUpdates();
  binding.bindModifications();
  return binding;
};
exports.createContentBinding = function(model , element , scope , action){
  var type = element.getAttribute('crochet-type') || "label";
  var name = element.getAttribute('crochet-binding');
  var binding = new ContentBinding(model , element , name , type , scope);
  if(action && type === "action"){
    binding.setAction(action);
  }
  binding.bindUpdates();
  return binding;
};
exports.getBindableElements = function(_treetop){
}
},{"./CompositeBinder":1,"./ContentBinding":2,"./FieldsetBinding":3,"./InputBinding":4}],8:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var binder = require('./binder/_package');
module.exports = binder;
},{"./binder/_package":7}],9:[function(require,module,exports){
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

},{"./applet/_package":14,"crochet":8}],10:[function(require,module,exports){
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
},{"crochet":8}],11:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');
function Label(_model , _template , scope){
  console.log(_model , _template , scope);
  var element = document.createElement('div');
  element.innerHTML = _template.innerHTML;
  this.getElement = function(){
    return element;
  }
  console.log("Label ",this);
  var binding = new crochet.createContentBinding(_model , this);
  console.log(binding);
}

module.exports = Label;
},{"crochet":8}],12:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');
function Model(_object){
  this.name = _object.name;
  this.description = _object.description;
  this.color = _object.color;
  this.something = _object.something;
  this.colors = _object.colors;
  this.availableColors = _object.availableColors;
  this.setName = function(name){
    this.name = name;
  };
  this.getName = function(){
    return this.name;
  };
  this.description = _object.description;
  this.setDescription = function(description){
    this.description = description;
  };
  this.getDescription = function(){
    return this.description;
  };
  this.color = _object.color;
  this.setColor = function(color){
    this.color = color;
  };
  this.getColor = function(){
    return this.color;
  };
  this.setSomething = function(something){
    this.something = something;
  };
  this.getSomething = function(){
    return this.something;
  };
}

module.exports = Model;
},{"crochet":8}],13:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');
function View(_template){
  var element = document.createElement('div');
  element.innerHTML = _template.innerHTML;
  this.getElement = function(){
    return element;
  }
}

module.exports = View;
},{"crochet":8}],14:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var Model = require('./Model');
var View = require('./View');
var Controller = require('./Controller');
var Label = require('./Label');

exports.Model = Model;
exports.View = View;
exports.Controller = Controller;
exports.Label = Label;
},{"./Controller":10,"./Label":11,"./Model":12,"./View":13}]},{},[9]);
