{% extends 'layout.swig' %}
{% block content %}
<h1>Swig output</h1>
<style>
    .color-label {
        width : 80px;
        height : 50px;
        background-color : #ccc;
    }
    .something-label {
        width : 80px;
        height : 50px;
        background-color : #222;
        color : #ccc;
    }
</style>
<component  xmlns="http://emyr.crochet.com/ns/crochet" name="view">
    <div class="modifier">
        <form>
            <input type="text" id="crochet:name" crochet-binding="name"  crochet-type="input" />
        <textarea id="crochet:description" crochet-binding="description" crochet-field="value" crochet-type="input"></textarea>
            <fieldset  crochet-binding="colors" crochet-list="availableColors" crochet-field="value" crochet-type="input" multiple="true">
                <div class="red">red<input name="color" type="checkbox" value="0" /></div>
                <div class="green">green<input name="color" type="checkbox" value="1" /></div>
                <div class="orange">orange<input name="color" type="checkbox" value="2" /></div>
            </fieldset>
            <input type="range" crochet-binding="something" crochet-type="input"/>
            <select name="random" crochet-binding="colors" crochet-type="input"  multiple="true">
                <datalist crochet-list="availableColors" crochet-values="item.value" crochet-content="item.name">
                    <option value="0">red</option>
                    <option value="1">green</option>
                    <option value="2">orange</option>
                </datalist>
            </select>
            <label for="crochet:color">Colour:</label>
            <fieldset id="crochet:color"  crochet-binding="color" crochet-field="value" crochet-type="input">
                red<input name="color" type="radio" value="red" />
                green<input name="color" type="radio" value="green" />
                orange<input name="color" type="radio" value="orange" />
            </fieldset>
        </form>
    </div>
</component>
    <div class="model">
        <h2><content crochet-binding="name" crochet-type="label">content</content></h2>
        <p class="something-label"><content crochet-binding="something" crochet-type="label"></content></p>
        <p><content crochet-binding="description" crochet-type="label">lorem ipsem whatever</content></p>
        <div crochet-binding="color" class="color-label" crochet-field="value" crochet-action="setBackgroundColour" crochet-target="view" crochet-type="action">
        </div>
    </div>

{% endblock %}