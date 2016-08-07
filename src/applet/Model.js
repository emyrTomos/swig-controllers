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