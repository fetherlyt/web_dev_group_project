/*Create by Yanjun 12/3*/

function addDepartmentView(event) {
    event.preventDefault();

    var content = $('#content');
    content.empty();

    var addHeader = createNode("div",
        [{"name": "id", "value": "subHead"}]);
    content.append(addHeader);

    var addHeaderTxt = createNode("h3", []);
    addHeaderTxt.innerHTML = "Department Add";
    addHeader.append(addHeaderTxt);
    var hRuler = createNode("hr", []);
    addHeader.append(hRuler);

    var addContainer = createNode("div",
        [{"name": "id", "value": "subContent"}]);
    content.append(addContainer);


    var table = createNode("table", [{"name":"border","value":"0"}]);
    addContainer.append(table);

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
    var numberTxt = createNode("input",
        [{"name": "type", "value": "text"},
            {"name": "id", "value": "numberId"},
            {"name": "name", "value": "number"},
            {"name": "size", "value": "6"},
            {"name": "value", "value": ""}]);
    td.append(numberTxt);

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
            {"name": "id", "value": "codeId"},
            {"name": "name", "value": "code"},
            {"name": "size", "value": "6"},
            {"name": "value", "value": ""}]);
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
            {"name": "id", "value": "nameId"},
            {"name": "name", "value": "name"},
            {"name": "size", "value": "24"},
            {"name": "value", "value": ""}]);
    td.append(nameTxt);
    var fdRequired1 = createNode("span",
        [{"name": "class", "value": "error"}]);
    fdRequired1.innerHTML = " *";
    td.append(fdRequired1);

    //Create Control Buttons
    tr = createNode("tr", []);
    tbody.append(tr);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    tr.append(td);
    td = createNode("td", [{"name": "style", "value": "border:none"},
    ]);
    tr.append(td);

    var submitBtn = createNode("input", [
        {"name": "type", "value": "button"},
        {"name": "id", "value": "submitId"},
        {"name": "style", "value": "padding:6px"},
        {"name": "value", "value": " Save "}
    ]);

    var cancelBtn = createNode("input", [
        {"name": "type", "value": "button"},
        {"name": "id", "value": "cancelId"},
        {"name": "style", "value": "padding:6px"},
        {"name": "value", "value": "Cancel"}
    ]);
    td.append(submitBtn);
    td.append(" ");
    td.append(cancelBtn);

    //Create *Required
    tr = createNode("tr", []);
    tbody.append(tr);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    tr.append(td);
    td = createNode("td", [{"name": "style", "value": "border:none"},
        {"name": "class", "value": "error"}]);
    td.innerHTML = "* Required";
    tr.append(td);

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateContactForm())
            handleSubmitForm();
    });

    cancelBtn.addEventListener("click", function (event) {
        event.preventDefault();
        cancelContactForm();
    });

}

function validateContactForm() {
    var number = $("#numberId").val();
    var name = $("#nameId").val();


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

function handleSubmitForm() {
    var body = Object();
    body[$("#numberId").attr("name")] = $("#numberId").val();
    body[$("#codeId").attr("name")] = $("#codeId").val();
    body[$("#nameId").attr("name")] = $("#nameId").val();

    var myData = JSON.stringify(body);

    $.ajax({
        url:"http://localhost/addDepartments",
        type:"post",
        dataType:"json",
        data:myData,

        success: function (response,status) {
            processAddDepartmentResponse(response);
        },

        error: function (response,status) {
            handleAddDepartmentError(response);
        }
    });//ajax
}

function processAddDepartmentResponse(response) {
    document.location = "index.html";

}

function handleAddDepartmentError(response) {
    alert("Failed");
}