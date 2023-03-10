//SENATORS JSON
const senators = await fetch("./house.json");
const jsonSenators = Array.from(await senators.json());


//STATES JSON
const states = await fetch(
    "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json"
);
const jsonStates = await states.json();

//checkbox

let jsonTabla = jsonSenators;
let jsonTablaState = []
let jsonTablaStateFilter = ['']

let checkboxes = Array.from(document.getElementsByClassName("party"));
let checkBox = [];
checkboxes.forEach((element) => {
    element.addEventListener("change", function (event) {
        if (element.checked) {
            checkBox.push(element.value);
        }
        if (!element.checked) {
            checkBox = checkBox.filter((x) => x != element.value);
        }
        let key = checkBox.length;
        switch (key) {
            case 2:
                let push = [];
                checkBox.forEach((element) => {
                    push.push(
                        Array.from(jsonSenators.filter((x) => x.party === element))
                    );
                });
                jsonTabla = push[1].concat(push[0]);
                generate_table();
                break;
            case 1:
                jsonTabla = jsonSenators.filter((x) => x.party === checkBox.toString());
                generate_table();
                break;
            default:
                jsonTabla = jsonSenators;
                generate_table();
                break;
        }
    });
});

//DESPLEGABLE

//DESPLEGABLE

document.getElementById('dropdownbtn').onclick = function () {
    //Delete DropDown
    const dropdownbtn = document.querySelector("#dropdown");
    dropdownbtn.innerHTML = " ";

    // button all states
    let buttonAllStates = document.createElement("button");
    buttonAllStates.value = 'all';
    buttonAllStates.className = "dropdownoption";
    let aAllStates = document.createElement("a");
    aAllStates.appendChild(document.createTextNode('All States'));
    document.querySelector("#dropdown").appendChild(buttonAllStates).appendChild(aAllStates);
    // button all states end

    let states;
    for (const prop in jsonStates) {
        let button = document.createElement("button");
        button.value = prop;
        button.className = "dropdownoption";

        let a = document.createElement("a");
        states = jsonStates[prop];

        a.appendChild(document.createTextNode(states));
        document.querySelector("#dropdown").appendChild(button).appendChild(a);
    }
    dropDownOptionFunction()
}

//DESPLEGABLE OPTION
function dropDownOptionFunction() {
    const dropdownoption = document.querySelectorAll(".dropdownoption");
    dropdownoption.forEach(button => {
        button.addEventListener("click", function (event) {
            jsonTablaStateFilter = button.value
            generate_table()
        });
    })
}

//TABLA
const cabeceraItems = [
    "Name",
    "Party",
    "State",
    "Seniority",
    "Votes with Party"
];
const senatorItems = [
    "first_name",
    "party",
    "state",
    "seniority",
    "votes_with_party_pct",
];

function generate_table() {
    const deleteTable = document.querySelector("#tabla");
    deleteTable.innerHTML = " ";

    if (jsonTablaStateFilter != '' && jsonTablaStateFilter != 'all') {
        jsonTablaState = jsonTabla.filter((x) => x.state === jsonTablaStateFilter)
    }
    else { jsonTablaState = jsonTabla }


    // Crea un elemento <table> y un elemento <tbody>
    const tabla = document.createElement("table");
    tabla.className = "table table-striped table-bordered"
    const tblBody = document.createElement("tbody");

    // Header
    const rowHeader = document.createElement("tr");
    rowHeader.className = "table-header";

    cabeceraItems.forEach((element) => {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(element);

        cell.appendChild(cellText);
        rowHeader.appendChild(cell);
        // agrega la row al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(rowHeader);
    });
    // Header End

    // Create cells
    jsonTablaState.forEach((element) => {
        // Crea las rows de la tabla
        const row = document.createElement("tr");
        row.className = "table-row";

        senatorItems.forEach((element2) => {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(element[element2]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        });

        // agrega la row al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(row);
    });

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    document.querySelector("#tabla").appendChild(tabla);
}

generate_table();

