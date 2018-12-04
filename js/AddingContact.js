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

}