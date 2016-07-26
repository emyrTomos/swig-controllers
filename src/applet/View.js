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