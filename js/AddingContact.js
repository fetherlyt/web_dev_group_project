function handleContactAdd(departmentid, departmentname){

    var content = $("#content");
    content.empty();

    var contactAddlbl = createNode("div",
        [{"name":"style","value":"border-bottom:1px solid black"}]);
    content.append(contactAddlbl);
    var contactAddTxt = createNode("h3",
        [{"name":"style","value":"color: blue"}]);
    contactAddTxt.innerHTML = "Contact Add";
    content.append(contactAddTxt);


    var contactAddContainer = createNode("div",
        [{"name":"style","value":"padding: 1em"}]);
    content.append(contactAddContainer);

    var table = createNode("table",
        [{"name":"border","value":"0"}]);
    contactAddContainer.append(table);
    var tbody = createNode("tbody", []);
    contactAddContainer.append(tbody);

    var tr = createNode("tr", []);
    tbody.append(tr);
    var td = createNode("td",
        [{"name":"class", "value":"label"},
            {"name":"style","value":"border:none"}]);
    td.innerHTML = "Department: ";
    tr.append(td);



    td = createNode("td", [{"name":"style","value":"border:none"}]);
    tr.append(td);
    var departmentName = createNode("span", []);
    //add in the portion that calls the department name
    departmentName.innerHTML = departmentname;
    td.append(departmentName);

    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"},
            {"name":"style","value":"border:none"}]);
    td.innerHTML = "First Name: ";
    tr.append(td);


    //adding in the first name row: label and input box *required*
    td = createNode("td", [{"name":"style","value":"border:none"}]);
    tr.append(td);
    var firstNameTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"firstNameTxtIdadd"},
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
        [{"name":"class", "value":"label"},
            {"name":"style","value":"border:none"}]);
    td.innerHTML = "Middle Initial: ";
    tr.append(td);

    td = createNode("td", [{"name":"style","value":"border:none"}]);
    tr.append(td);
    var midNameTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"midNameTxtIdadd"},
            {"name":"name","value":"midName"},
            {"name":"value","value":""}]);
    td.append(midNameTxt);

    //Last name *required*
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"},
            {"name":"style","value":"border:none"}]);
    td.innerHTML = "Last Name: ";
    tr.append(td);

    td = createNode("td", [{"name":"style","value":"border:none"}]);
    tr.append(td);
    var lastNameTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"lastNameTxtIdadd"},
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
        [{"name":"class", "value":"label"},
            {"name":"style","value":"border:none"}]);
    td.innerHTML = "Primary: ";
    tr.append(td);

    td = createNode("td", [{"name":"style","value":"border:none"}]);
    tr.append(td);
    var primaryCheckbox = createNode("input",
        [{"name":"type","value":"checkbox"},
            {"name":"id","value":"primaryCheckIdadd"},
            {"name":"name","value":"primaryCheck"},
        ]);
    td.append(primaryCheckbox);

    //phone *required*
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"},
            {"name":"style","value":"border:none"}]);
    td.innerHTML = "Phone: ";
    tr.append(td);

    td = createNode("td", [{"name":"style","value":"border:none"}]);
    tr.append(td);
    var phoneTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"phoneTxtIdadd"},
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
        [{"name":"class", "value":"label"},
            {"name":"style","value":"border:none"}]);
    td.innerHTML = "Email: ";
    tr.append(td);

    td = createNode("td", [{"name":"style","value":"border:none"}]);
    tr.append(td);
    var emailTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"emailTxtIdadd"},
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
        [{"name":"class", "value":"label"},
            {"name":"style","value":"border:none"}]);
    td.innerHTML = "Title: ";
    tr.append(td);

    td = createNode("td", [{"name":"style","value":"border:none"}]);
    tr.append(td);
    var titleTxt = createNode("input",
        [{"name":"type","value":"text"},
            {"name":"id","value":"titleTxtIdadd"},
            {"name":"name","value":"title"},
            {"name":"value","value":""}]);
    td.append(titleTxt);

    //save and cancel buttons
    tr = createNode("tr", []);
    tbody.append(tr);
    td = createNode("td",[{"name":"style","value":"border:none"}]);
    tr.append(td);

    var saveContactBtn = createNode("input", [
        {"name":"type","value":"button"},
        {"name":"id","value":"saveContactId"},
        {"name":"style","value":"padding:6px"},
        {"name":"value","value":"Save"}
    ]);
    td.append(saveContactBtn);
    td = createNode("td",[{"name":"style","value":"border:none"}]);
    tr.append(td);

    var cancelContactBtn = createNode("input", [
        {"name":"type","value":"button"},
        {"name":"id","value":"cancelContactId"},
        {"name":"style","value":"padding:6px"},
        {"name":"value","value":"Cancel"}
    ]);
    td.append(cancelContactBtn);

    //text of "* Required" under buttons

    var requiredText = createNode("span",
        [{"name":"class","value":"error"}]);
    requiredText.innerHTML = "* Required";
    content.append(requiredText);


    saveContactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateContactaddForm())
            handleSubmitForm(departmentid);
    });

    cancelContactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        cancelContactForm();
    });

}

function validateContactaddForm() {
    var first_name = $("#firstNameTxtIdadd").val();
    var last_name = $("#lastNameTxtIdadd").val();
    var phone = $("#phoneTxtIdadd").val();
    var email = $("#emailTxtIdadd").val();


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
    body["department"] = departmentid;
    body["firstName"] = $("#firstNameTxtIdadd").val();
    body["middleInitial"] = $("#midNameTxtIdadd").val();
    body["lastName"] = $("#lastNameTxtIdadd").val();
    body["primaryContact"] = $("#primaryCheckIdadd").prop("checked");
    body["phone"] = $("#phoneTxtIdadd").val();
    body["email"] = $("#emailTxtIdadd").val();
    body["title"] = $("#titleTxtIdadd").val();

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