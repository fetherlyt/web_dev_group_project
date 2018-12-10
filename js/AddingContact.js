function handleContactAdd(departmentid, departmentname){

    var content = $("#content");
    content.empty();

    var contactAddlbl = createNode("div",
        [{"name":"style","value":"border-bottom:1px solid black"}]);
    content.append(contactAddlbl);
    var contactAddTxt = createNode("span",
        [{"name":"style","value":"style=color: blue"}]);
    contactAddTxt.innerHTML = "Contact Add";
    contactAddlbl.append(contactAddTxt);
    var hRuler = createNode("hr", []);
    addHeader.append(hRuler);

    var contactAddContainer = createNode("div",
        [{"name":"style","value":"padding: 1em"}]);
    content.append(contactAddContainer);

    var table = createNode("table", []);
    contactAddContainer.append(table);
    var tbody = createNode("tbody", []);
    contactAddContainer.append(tbody);

    var tr = createNode("tr", []);
    tbody.append(tr);
    var td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "Department: ";
    tr.append(td);



    td = createNode("td", []);
    tr.append(td);
    var departmentName = createNode("span", []);
    departmentName.innerHTML = departmentname;
    td.append(departmentName);

    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "First Name: ";
    tr.append(td);


    //adding in the first name row: label and input box *required*
    td = createNode("td", []);
    tr.append(td);
    var firstNameTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"firstNameTxtId"},
            {"name":"name","value":"firstName"},
            {"name":"value","value":""}]);
    td.append(firstNameTxt);
    var fdRequired = createNode("span",
        [{"name":"class","value":"error"}]);
    fdRequired.innerHTML = "*";
    td.append(fdRequired);

    //Middle Initial
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "Middle Initial: ";
    tr.append(td);

    td = createNode("td", []);
    tr.append(td);
    var midNameTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"midNameTxtId"},
            {"name":"name","value":"midName"},
            {"name":"value","value":""}]);
    td.append(midNameTxt);

    //Last name *required*
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "Last Name: ";
    tr.append(td);

    td = createNode("td", []);
    tr.append(td);
    var lastNameTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"lastNameTxtId"},
            {"name":"name","value":"lastName"},
            {"name":"value","value":""}]);
    td.append(lastNameTxt);
    fdRequired = createNode("span",
        [{"name":"class","value":"error"}]);
    fdRequired.innerHTML = "*";
    td.append(fdRequired);

    //Primary checkbox
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "Primary: ";
    tr.append(td);

    td = createNode("td", []);
    tr.append(td);
    var primaryCheckbox = createNode("input",
        [{"name":"type","value":"checkbox"},
            {"name":"id","value":"primaryCheckId"},
            {"name":"name","value":"primaryCheck"},
        ]);
    td.append(primaryCheckbox);

    //phone *required*
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "Phone: ";
    tr.append(td);

    td = createNode("td", []);
    tr.append(td);
    var phoneTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"phoneTxtId"},
            {"name":"name","value":"phone"},
            {"name":"value","value":""}]);
    td.append(phoneTxt);
    fdRequired = createNode("span",
        [{"name":"class","value":"error"}]);
    fdRequired.innerHTML = "*";
    td.append(fdRequired);

    //Email *required*
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "Email: ";
    tr.append(td);

    td = createNode("td", []);
    tr.append(td);
    var emailTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"emailTxtId"},
            {"name":"name","value":"email"},
            {"name":"value","value":""}]);
    td.append(emailTxt);
    fdRequired = createNode("span",
        [{"name":"class","value":"error"}]);
    fdRequired.innerHTML = "*";
    td.append(fdRequired);

    //title
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "Title: ";
    tr.append(td);

    td = createNode("td", []);
    tr.append(td);
    var titleTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"titleTxtId"},
            {"name":"name","value":"title"},
            {"name":"value","value":""}]);
    td.append(titleTxt);

    //save and cancel buttons
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",[]);
    tr.append(td);

    var saveContactBtn = createNode("input", [
        {"name":"type","value":"button"},
        {"name":"id","value":"saveContactId"},
        {"name":"style","value":"padding:6px"},
        {"name":"value","value":"Save"}
    ]);
    td.append(saveContactBtn);
    td = createNode("td",[]);
    tr.append(td);

    var cancelContactBtn = createNode("input", [
        {"name":"type","value":"button"},
        {"name":"id","value":"cancelContactId"},
        {"name":"style","value":"padding:6px"},
        {"name":"value","value":"Cancel"}
    ]);
    td.append(cancelContactBtn);

    //text of "* Required" under buttons
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",[]);
    tr.append(td);
    var requiredText = createNode("span",
        [{"name":"style","value":"error"}]);
    requiredText.innerHTML = "* Required";
    td.append(requiredText);


    saveContactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateContactForm())
            handleSubmitForm(departmentid);
    });

    cancelContactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        cancelContactForm();
    });

}

function validateContactForm() {
    var first_name = $("#firstNameId").val();
    var last_name = $("#lastNameId").val();
    var phone = $("#phoneId").val();
    var email = $("#emailId").val();


    var msg = "";
    if (first_name.trim().length == 0){
        msg += "Missing: first name";
    }

    if(last_name.trim().length == 0) {
        msg += "\nMissing: last name";
    }

    if(phone.trim().length == 0) {
        msg += "\nMissing: phone";
    }

    if(email.trim().length == 0) {
        msg += "\nMissing: email";
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

function handleSubmitForm(departmentid) {
    var body = Object();
    body[$("#department").attr("name")] = departmentid;
    body[$("#firstName").attr("name")] = $("#firstName").val();
    body[$("#midName").attr("name")] = $("#midName").val();
    body[$("#lastName").attr("name")] = $("#lastName").val();
    body[$("#primaryCheck").attr("name")] = $("#primaryCheck").val();
    body[$("#phone").attr("name")] = $("#phone").val();
    body[$("#email").attr("name")] = $("#email").val();
    body[$("#title").attr("name")] = $("#title").val();

    var myData = JSON.stringify(body);

    $.ajax({
        url:"http://localhost/Contact",
        type:"post",
        dataType:"json",
        data:myData,

        success: function (response,status) {
            processAddContactResponse(response);
        },

        error: function (response,status) {
            handleAddContactError(response);
        }
    });
}

function processAddContactResponse(response) {
    document.location = "index.html";

}

function handleAddContactError(response) {
    alert("Failed");
}