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