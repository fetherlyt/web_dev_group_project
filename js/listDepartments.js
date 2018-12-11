var executed = false;

function listDepts() {
    if (!executed) {
        $.ajax({
            url: "http://localhost/department",
            type: "get",

            success: function (response, status) {
                handleResponse(response);
            },

            error: function (response, status) {
                handleError(response);
            }
        });
    }
    executed = true;
}

function handleError(response) {
    var content = $("#deptListTableDiv");
    content.empty();
    switch (response.status) {
        case 404:
            var content = $("#deptListTableDiv");
            content.empty();
            content.append("No Departments Found");
            break;

        default:
            var content = $("#deptListTableDiv");
            content.empty();
            content.append("Unexpected Error");
    }
}

function handleResponse(response) {
    var content = $("#deptListTableDiv");
    content.empty();

    var departments = response.data.departments;

    var deptTable = createNode("table",
        [{"name": "id", "value": "deptListTable"}]);
    content.append(deptTable);

    var headerRow = createNode("tr",
        []);
    deptTable.append(headerRow);

    var deptNameHeader = createNode("th",
        []);
    deptNameHeader.innerHTML = "Departments";
    headerRow.append(deptNameHeader);

    var optionsHeader = createNode("th",
        [{"name": "style", "value": "colspan 2"}]);
    optionsHeader.innerHTML = "Options";
    headerRow.append(optionsHeader);

    departments.forEach(function (department) {
        var deptRow = createNode("tr",
            []);
        deptTable.append(deptRow);

        var deptName = createNode("td",
            []);
        deptName.innerHTML = getDeptName(department);
        deptRow.append(deptName);

        var optionsCol = createNode("td",
            []);
        deptRow.append(optionsCol);

        var detailBtn = createNode("input", [
            {"name": "type", "value": "button"},
            {"name": "style", "value": "padding:6px"},
            {"name": "value", "value": "Details"},
            {"name":"class", "value":"deptOptBtn"}
        ]);

        detailBtn.addEventListener("click", function (event) {
            handleDepartmentDetails(event, department.id);
        });
        optionsCol.append(detailBtn);

        var editBtn = createNode("input", [
            {"name": "type", "value": "button"},
            {"name": "style", "value": "padding:6px"},
            {"name": "value", "value": "Edit"},
            {"name":"class", "value":"deptOptBtn"}
        ]);

        editBtn.addEventListener("click", function (event) {
            handleOneDepartment(event, department.id);
        });
        optionsCol.append(editBtn);
    });
}

function getDeptName(department) {
    if (department.code) {
        return department.code;
    }

    return department.name;
}