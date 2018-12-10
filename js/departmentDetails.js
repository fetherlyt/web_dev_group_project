/*Create by Yanjun */

function handleDepartmentDetails(event){
    event.preventDefault();

    $.ajax({
        url:"http://localhost/Department/1",
        type:"get",
        dataType:"json",
        success: function (response,status) {
            processDepartmentDetailView(response);
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
            content.append("Error 404,No Data Found");
            break;

        default:
            var content = $("#content");
            content.empty();
            content.append("Unexpected Error");
    }
}

function processDepartmentDetailView(response) {
    var content = $("#content");
    content.empty();

    var departmentData = response.data.department;

    var content = $('#content');
    content.empty();

    var viewHeader = createNode("div",
        [{"name": "id", "value": "subHead"}]);
    content.append(viewHeader);

    var viewHeaderTxt = createNode("h3", []);
    viewHeaderTxt.innerHTML = "Department View: ";
    viewHeaderTxt.append(departmentData.code);
    viewHeader.append(viewHeaderTxt);
    var hRuler = createNode("hr", []);
    viewHeader.append(hRuler);

    var viewContainer = createNode("div",
        [{"name": "id", "value": "subContent"}]);
    content.append(viewContainer);

    //create table to show department information
    var table = createNode("table", [{"name": "border", "value": "0"}]);
    viewContainer.append(table);

    var tbody = createNode("tbody", []);
    table.append(tbody);

    //create number row
    var tr = createNode("tr", []);
    tbody.append(tr);

    var td = createNode("td", [{"name": "class", "value": "label"},
        {"name": "style", "value": "border:none"}]);
    td.innerHTML = "Number: ";
    tr.append(td);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    td.innerHTML = departmentData.deptNumber;
    tr.append(td);

    //create name row
    tr = createNode("tr", []);
    tbody.append(tr);

    td = createNode("td", [{"name": "class", "value": "label"},
        {"name": "style", "value": "border:none"}]);
    td.innerHTML = "Name: ";
    tr.append(td);

    td = createNode("td", [{"name": "style", "value": "border:none"}]);
    td.innerHTML = departmentData.name;
    tr.append(td);

    var p = createNode("p", []);
    viewContainer.append(p);

    //create + button to add new contact
    var addButton = createNode("button", [{"name": "id", "value": "addContact"}]);
    addButton.innerHTML = "+";
    viewContainer.append(addButton);

    //create div to show contacts information
    var ContactsContainer = createNode("div",
        [{"name": "id", "value": "contactContent"}]);
    viewContainer.append(ContactsContainer);


    p = createNode("p", []);
    ContactsContainer.append(p);

    //get the contact data
    var deptID = departmentData.id;

    $.ajax({
        url:"http://localhost/DepartmentContact".concat("/",deptID),
        type:"get",
        dataType:"json",
        success: function (response,status) {
            processContactsTable(response);
        },
        error: function (response,status) {
            handleError(response);

        }

    });
}

function processContactsTable(response) {
    var content = $("#contactContent");
    content.empty();

   //create table
    var table = createNode("table",
        [{"name": "border", "value": "1"},
            {"name": "id", "value": "listingTable"},
        ]);
    content.append(table);

    //table head
    var thead = createNode("thead", []);
    table.append(thead);

    var tr = createNode("tr", []);
    thead.append(tr);

    var th = createNode("th", []);
    th.innerHTML = "Contacts";
    tr.append(th);

    th = createNode("th", []);
    th.innerHTML = "Primary";
    tr.append(th);

    th = createNode("th", []);
    th.innerHTML = "Title";
    tr.append(th);

    th = createNode("th", []);
    th.innerHTML = "Number";
    tr.append(th);

    th = createNode("th", []);
    th.innerHTML = "Email";
    tr.append(th);

    th = createNode("th", []);
    th.innerHTML = "Options";
    tr.append(th);

    //table body
    var tbody = createNode("tbody", []);
    table.append(tbody);

    var td;
    var button1;
    var button2;

    var lnk1;
    var lnk2;

    var contacts = response.data.contacts;

    contacts.forEach(function (contact) {

        tr = createNode("tr", []);
        tbody.append(tr);

        td = createNode("td", [{"name": "class", "value": "listing"}]);
        td.innerHTML = contact.firstName + " "+ contact.middleInitial + " " + contact.lastName;

        tr.append(td);

        td = createNode("td", [{"name": "class", "value": "listing"}]);
        if (contact.primaryContact){td.innerHTML = "Yes";}
        else {td.innerHTML = "No"; }

        tr.append(td);

        td = createNode("td", [{"name": "class", "value": "listing"}]);
        td.innerHTML = contact.title;

        tr.append(td);

        td = createNode("td", [{"name": "class", "value": "listing"}]);
        td.innerHTML = contact.phone;

        tr.append(td);

        td = createNode("td", [{"name": "class", "value": "listing"}]);
        td.innerHTML = contact.email;

        tr.append(td);

        td = createNode("td", [{"name": "class", "value": "listing"}]);
        button1 =createNode("button",[{"name": "style", "value": "padding:3px"}]);


        lnk1 = createNode("a",
            [{"name":"id","value":"c-" + contact.id},
                {"name":"href","value":"Contact/" + contact.id},
            ]);

        button1.append(lnk1);

        lnk1.innerHTML = "Edit";
        lnk1.addEventListener("click",function (event) {
            event.preventDefault();
            handleEditDetails(this);
        });


        button2 =createNode("button",[{"name": "style", "value": "padding:3px"}]);


        lnk2 = createNode("a",
            [{"name":"id","value":"del-" + contact.id},
                {"name":"href","value":"delete/" + contact.id},
            ]);
        button2.append(lnk2);
        lnk2.innerHTML = "Delete";
        lnk2.addEventListener("click",function (event) {
            event.preventDefault();
            handleDelete(this);
        });

        td.append(button1);
        td.append(" ");
        td.append(button2);


        tr.append(td);

        addButton.addEventListener("click",function (event) {
           event.preventDefault();
            handleContactAdd(department.id,department.name);
        });
    });
}



    function  handleDelete(lnk) {

        var r = confirm("Do you confirm to delete it?");
        if (r == true) {

            var target = $(lnk).attr("href");
            $.ajax({
                url:"http://localhost".concat("/",target),
                type:"get",
                dataType: "json",

                success:function (response,status) {
                    processDeleteResponse(response);
                },
                error:function (response) {
                    handleDeleteError(response);
                }
            });

        } else{}

    }

function processDeleteResponse(response) {
    alert("delete!");


}

function handleDeleteError(response) {
    alert("Failed");
}

function handleEditDetails(lnk){

    //this piece??
    var contacts = response.data.contacts;

    var content = $("#content");
    content.empty();

    var contactAddlbl = createNode("div",
        [{"name":"style","value":"border-bottom:1px solid black"}]);
    content.append(contactAddlbl);
    var contactAddTxt = createNode("span",
        [{"name":"style","value":"style=color: blue"}]);
    contactAddTxt.innerHTML = "Contact Edit";
    contactAddlbl.append(contactAddTxt);
    var hRuler = createNode("hr", []);
    content.append(hRuler);

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
    departmentName.innerHTML = contacts.department;
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
            {"name":"value","value":contacts.first_ame}]);
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
            {"name":"value","value":contacts.middle_initial}]);
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
            {"name":"value","value":contacts.last_name}]);
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
            {"name":"value","value":contacts.phone}]);
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
            {"name":"value","value":contacts.email}]);
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
            {"name":"value","value":contacts.title}]);
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
            handleSubmitContactForm();
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

function handleSubmitContactForm(departmentid) {
    var body = Object();
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

function handleAddDepartmentError(response) {
    alert("Failed");
}
function handleAddContactError(response) {
    alert("Failed");
}


