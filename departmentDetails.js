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





