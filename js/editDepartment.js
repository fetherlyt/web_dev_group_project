/*Create by Yanjun */

function handleOneDepartment(event, id){
    event.preventDefault();

    var target = 3; /*generate id here..*/
    $.ajax({

        url:"http://localhost/Department/" + id,
        type:"get",
        dataType:"json",
        success: function (response,status) {
            editDepartmentView(response);
        },
        error: function (response,status) {
            handleError(response);
        }
    });

}

function handleError(response) {
    switch(response.status){
        case 404:
            var content = $("#content");
            content.empty();
            content.append("Error 404,No Department Data Found");
            break;

        default:
            var content = $("#content");
            content.empty();
            content.append("Unexpected Error");

    }

}

function editDepartmentView(response) {

    var departmentData = response.data.department;

    var content = $('#content');
    content.empty();

    var editHeader = createNode("div",
        [{"name": "id", "value": "subHead"}]);
    content.append(editHeader);

    var editHeaderTxt = createNode("h3", []);
    editHeaderTxt.innerHTML = "Department Edit: ";
    editHeaderTxt.append(departmentData.code);
    editHeader.append(editHeaderTxt);
    var hRuler = createNode("hr", []);
    editHeader.append(hRuler);

    var editContainer = createNode("div",
        [{"name": "id", "value": "subContent"}]);
    content.append(editContainer);


    var table = createNode("table", [{"name":"border","value":"0"}]);
    editContainer.append(table);

    var tbody = createNode("tbody",[]);
    table.append(tbody);

    //create number input row
    var tr = createNode("tr", []);
    tbody.append(tr);

    var td = createNode("td", [{"name": "class", "value": "label"},
        {"name": "style", "value": "border:none"}]);
    td.innerHTML = "Number: ";
    tr.append(td);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    tr.append(td);
    var departmentNumberTxt = createNode("input",
        [{"name": "type", "value": "text"},
            {"name": "id", "value": "departmentNumber_Id"},
            {"name": "name", "value": "departmentNumber"},
            {"name": "size", "value": "6"},
            {"name": "value", "value": departmentData.deptNumber}]);
    td.append(departmentNumberTxt);

    var fdRequired = createNode("span",
        [{"name": "class", "value": "error"}]);
    fdRequired.innerHTML = " *";
    td.append(fdRequired);


    //create Code input row
    tr = createNode("tr", []);
    tbody.append(tr);

    td = createNode("td", [{"name": "class", "value": "label"},
        {"name": "style", "value": "border:none"}]);
    td.innerHTML = "Code: ";
    tr.append(td);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    tr.append(td);
    var codeTxt = createNode("input",
        [{"name": "type", "value": "text"},
            {"name": "id", "value": "code_Id"},
            {"name": "name", "value": "code"},
            {"name": "size", "value": "6"},
            {"name": "value", "value": departmentData.code}]);
    td.append(codeTxt);

    //create Name input row
    tr = createNode("tr", []);
    tbody.append(tr);

    td = createNode("td", [{"name": "class", "value": "label"},
        {"name": "style", "value": "border:none"}]);
    td.innerHTML = "Name: ";
    tr.append(td);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    tr.append(td);
    var nameTxt = createNode("input",
        [{"name": "type", "value": "text"},
            {"name": "id", "value": "name_Id"},
            {"name": "name", "value": "name"},
            {"name": "size", "value": "24"},
            {"name": "value", "value": departmentData.name}]);
    td.append(nameTxt);
    var fdRequired1 = createNode("span",
        [{"name": "class", "value": "error"}]);
    fdRequired1.innerHTML = " *";
    td.append(fdRequired1);

    //create Hidden id input row
    var IdTxt = createNode("input",
        [{"name": "type", "value": "hidden"},
            {"name": "id", "value": "id_Id"},
            {"name": "name", "value": "id"},
            {"name": "value", "value": departmentData.id}]);

    //Create Control Buttons
    tr = createNode("tr", []);
    tbody.append(tr);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    td.append(IdTxt);
    tr.append(td);
    td = createNode("td", [{"name": "style", "value": "border:none"},
    ]);
    tr.append(td);

    var submit_Btn = createNode("input", [
        {"name": "type", "value": "button"},
        {"name": "id", "value": "submitEditId"},
        {"name": "style", "value": "padding:6px"},
        {"name": "value", "value": " Save "}
    ]);

    var cancel_Btn = createNode("input", [
        {"name": "type", "value": "button"},
        {"name": "id", "value": "cancelEditId"},
        {"name": "style", "value": "padding:6px"},
        {"name": "value", "value": "Cancel"}
    ]);
    td.append(submit_Btn);
    td.append(" ");
    td.append(cancel_Btn);

    //Create *Required
    tr = createNode("tr", []);
    tbody.append(tr);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    tr.append(td);
    td = createNode("td", [{"name": "style", "value": "border:none"},
        {"name": "class", "value": "error"}]);
    td.innerHTML = "* Required";
    tr.append(td);

    submit_Btn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateEditContactForm())
            handleEditForm();
    });

    cancel_Btn.addEventListener("click", function (event) {
        event.preventDefault();
        cancelContactForm();
    });

}

function validateEditContactForm() {
    var number = $("#departmentNumber_Id").val();
    var name = $("#name_Id").val();


    var msg = "";
    if (number.trim().length == 0){
        msg += "Missing: Department Number";
    }

    if(name.trim().length == 0) {
        msg += "\nMissing: Department Name";
    }

    if(msg.trim().length != 0) {
        alert(msg);
        return false;
    }

    return true;

}

function cancelContactForm() {
    document.location = "index.html";
}

function handleEditForm() {
    var body = Object();
    body[$("#id_Id").attr("name")] = $("#id_Id").val();
    body[$("#departmentNumber_Id").attr("name")] = $("#departmentNumber_Id").val();
    body[$("#code_Id").attr("name")] = $("#code_Id").val();
    body[$("#name_Id").attr("name")] = $("#name_Id").val();

    var myData = JSON.stringify(body);

    $.ajax({
        url:"http://localhost/Department",
        type:"put",
        dataType:"json",
        data:myData,

        success: function (response,status) {
            processEditDepartmentResponse(response);
        },

        error: function (response,status) {
            handleEditDepartmentError(response);
        }
    });//ajax
}

function processEditDepartmentResponse(response) {
    document.location = "index.html";

}

function handleEditDepartmentError(response) {
    alert("Failed");
}