(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
console.log("Binding " , Binding);
AttributeBinding.prototype = Object.create(Binding.prototype);

function AttributeBinding(element,model){
  Binding.apply(this,arguments);
}

module.exports = AttributeBinding;
},{"./_Binding":4}],2:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var ElementBinding = require('./ElementBinding');
var AttributeBinding = require('./AttributeBinding');
function Binder(model , view){
  var bindings = [];
  var bindableElements = view.getCrochetElements();
  for(var i=0; i<bindableElements.length; i++){
    console.log(bindableElements.item(i));
    var binding = new ElementBinding(bindableElements.item(i),model);
    bindings.push(binding);
    binding.soundOff();
  }
  var bindableElementsByAttribute = view.getCrochetAttributes();
  for(var i=0; i<bindableElementsByAttribute.length; i++){
    console.log(bindableElementsByAttribute.item(i));
    var binding = new AttributeBinding(bindableElementsByAttribute.item(i),model);
    bindings.push(binding);
    binding.soundOff();
  }
}
module.exports = Binder;
},{"./AttributeBinding":1,"./ElementBinding":3}],3:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
ElementBinding.prototype = Object.create(Binding.prototype);

function ElementBinding(element,model){
  Binding.apply(this,arguments);
}

module.exports = ElementBinding;
},{"./_Binding":4}],4:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
function Binding(_model , _element){
  this.model = _model;
  this.element = _element;
}

Binding.prototype.soundOff = function(){
  console.log("In a binding ", this);
}

module.exports = Binding;
},{}],5:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var Binder = require('./binder/Binder.js');
exports.printMsg = function() {
  console.log("This is a message from the crochet package");
};
exports.getCrochetAttributes = function(_element){
  return _element.querySelectorAll('[id^="crochet:"]');
};
exports.getCrochetElements = function(_element){
  return _element.querySelectorAll('crochet');
}
exports.createBinder = function(model , element){
  return new Binder(model , element);
}
},{"./binder/Binder.js":2}],6:[function(require,module,exports){
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

},{"./applet/_package":11,"crochet":5}],7:[function(require,module,exports){
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
},{"crochet":5}],8:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');
function Label(model , _template){
  var element = document.createElement('div');
  element.innerHTML = _template.innerHTML;
  this.getElement = function(){
    return element;
  }
}

module.exports = Label;
},{"crochet":5}],9:[function(require,module,exports){
/**
 * Created by emyr on 25/07/16.
 */
var crochet = require('crochet');
function Model(_object){
  this.name = _object.name;
  this.description = _object.description;
  this.color = _object.color;
  this.colors = ['orange','red','green'];
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

}

module.exports = Model;
},{"crochet":5}],10:[function(require,module,exports){
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
},{"crochet":5}],11:[function(require,module,exports){
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
},{"./Controller":7,"./Label":8,"./Model":9,"./View":10}]},{},[6]);
