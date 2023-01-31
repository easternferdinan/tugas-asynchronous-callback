function createTable(header=[], body=[]) {
    const table = document.createElement("table");
    document.querySelector(".table-container").appendChild(table);

    createTableHeader(header);
    createTableBody(body);
}

function createTableHeader(header) {
    const tableHeader = document.createElement("thead");
    document.querySelector("table").appendChild(tableHeader);

    header.forEach(datum => {
        const tableHead = document.createElement("th");
        tableHead.textContent = datum;
        tableHeader.appendChild(tableHead);
    })
}

function createTableBody(body) {
    const tableBody = document.createElement("tbody");
    document.querySelector("table").appendChild(tableBody);

    body.forEach(datum => {
        const tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);

        for (const key in datum) {
            if (key === "id" || key === "name" || key === "username" || key === "email") {
                const tableDataId = document.createElement("td");
                tableDataId.textContent = datum[key];
                tableRow.appendChild(tableDataId);
            }
            else if (key === "address") {
                const tableDataId = document.createElement("td");
                tableDataId.textContent = `${datum[key].street} ${datum[key].suite} ${datum[key].city}`;
                tableRow.appendChild(tableDataId);
            }
            else if (key === "company") {
                const tableDataId = document.createElement("td");
                tableDataId.textContent = datum[key].name
                tableRow.appendChild(tableDataId);
            }
        }
    })
}

function stopLoading() {
    const loading = document.querySelector(".loading");
    loading.setAttribute("style", "display: none");
}

function getUserData(callbackTable, callbackLoading) {
    const userData = new XMLHttpRequest();
    
    userData.onload = function () {
        if (this.status === 200) {
            userList = JSON.parse(this.response);
            callbackLoading();
            callbackTable(["ID", "Name", "Username", "Email", "Address", "Company"], userList);
        }
    }
    
    userData.open("GET", "https://jsonplaceholder.typicode.com/users");
    userData.send();
}

getUserData(createTable, stopLoading);