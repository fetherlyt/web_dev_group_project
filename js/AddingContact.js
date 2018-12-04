function handleContactAdd(event){
    event.preventDefault();
    displayContactEntryForm();
}

function displayContactEntryForm() {
    var content = $("#content");
    content.empty();

    var contactAddlbl = createNode("div",
        [{"name":"style","value":"border-bottom:1px solid black"}]);
    content.append(contactAddlbl);
    var contactAddTxt = createNode("span",
        [{"name":"style","value":"style=color: blue"}]);
    contactAddlbl.append(contactAddTxt);

    var contactAddContainer = createNode("div",
        [{"name":"style","value":"padding: 1em"}]);
    content.append(contactAddContainer);

    var table = createNode("table", []);
    contactAddContainer.append(table);
    var thead = createNode("th", []);
    contactAddContainer.append(thead);

    var tr = createNode("tr", []);
    thead.append(tr);
    var td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "Department: ";
    tr.append(td);

    td = createNode("td", []);
    tr.append(td);
    var departmentName = createNode("span", []);
    //add in the portion that calls the department name
    departmentName.innerHTML = "";
    td.append(departmentName);

    tr = createNode("tr", []);
    thead.append(tr);
    td = createNode("td",
        [{"name":"class", "value":"label"}]);
    td.innerHTML = "First Name: ";
    tr.append(td);

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
    //Last name *required*
    //Primary checkbox
    //phone *required*
    //Email *required*
    //title *required*

    //save and cancel buttons
    //text of "* Required" under buttons
}