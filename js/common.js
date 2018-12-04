$(function() {
    //update with correct button ID for adding a new contact
    $("#contactUpdateId").click(function(event){
        handleContactAdd(event);
    });

});

function createNode(element, attrs) {
    var node = document.createElement(element);
    attrs.forEach(function(attr) {
        node.setAttribute(attr.name, attr.value);
    });
    return node;
}