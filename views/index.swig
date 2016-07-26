{% extends 'layout.swig' %}
{% block content %}
<h1>Swig output</h1>
<script type="text/html" id="model:view">
    <div class="modifier">
        <form>
            <input type="text" id="crochet:name" />
        <textarea id="crochet:description">

        </textarea>
            <label for="crochet:color">Colour:</label>
            <fieldset id="crochet:color">
                red<input name="color" type="radio" value="red" />
                green<input name="color" type="radio" value="green" />
                orange<input name="color" type="radio" value="orange" />
            </fieldset>
        </form>
    </div>
</script>
<script type="text/html" id="model:label">
    <div class="model">
        <h2><crochet type="textLabel" content="name">content</crochet></h2>
        <p><crochet type="textLabel" content="description">lorem ipsem whatever</crochet></p>
        <crochet type="colorLabel" content="color"></crochet>
    </div>
</script>
{% endblock %}