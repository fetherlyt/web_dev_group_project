$(function() {
    //update with correct button ID for adding a new contact
    $("#contactUpdateId").click(function(event){
        handleContactAdd(event);
    });

    /* By Yanjun --#addDeptId, deptDetailId, editDeptId*/
    $("#addDeptId").click(function (event) {
        addDepartmentView(event);
    });

    $("#deptDetailId").click(function (event) {
        handleDepartmentDetails(event);
    });

    $("#editDeptId").click(function (event) {
        handleOneDepartment(event);
    });

});

function createNode(element, attrs) {
    var node = document.createElement(element);
    attrs.forEach(function(attr) {
        node.setAttribute(attr.name, attr.value);
    });
    return node;
}