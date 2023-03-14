var insertBtn = document.getElementById("btnInsertUpdate"),
    clearBtn = document.getElementById("btnClear"),
    inputs = document.querySelectorAll("input"),
    tableResult = document.getElementById("tb1Records"),    
    clearResultBtn = document.getElementById("btnClearItem"),
    headrow = document.createElement("tr");
    resultrow = [],
    verifybutton = [false, false, false, false];
    editingIndex = -1;

for (let i = 0; i < inputs.length + 1; i++) {
    let headtable = document.createElement("th");
    headtable.style.padding = "5px 15px";
    headtable.style.borderTop = "1px solid black";
    headtable.style.borderBottom = "1px solid black";
    if (i > 0) {
        headtable.style.borderLeft = "1px solid black";
    }
    if (i < 4) {
        headtable.style.borderRight = "1px solid black";
    }
    if (i == 0) {
        headtable.innerText = "First Name";
    } else if (i == 1) {
        headtable.innerText = "Middle Name";
    } else if (i == 2) {
        headtable.innerText = "Last Name";
    } else if (i == 3) {
        headtable.innerText = "Age";
    } else {
        headtable.innerText = "Action";
    }
    headrow.appendChild(headtable);
}

insertBtn.addEventListener("click", (e) => {
    let fname, mname, lname, age;

    if (resultrow.length === 0) {
        tableResult.appendChild(headrow);
    }

    for (let i = 0; i < inputs.length; i++) {
        switch (inputs[i].name) {
            case "txtFname": {
                fname = inputs[i].value;
                break;
            }
            case "txtMname": {
                mname = inputs[i].value;
                break;
            }
            case "txtLname": {
                lname = inputs[i].value;
                break;
            }
            case "numAge": {
                age = Number.parseInt(inputs[i].value);
                break;
            }
        }
    }

    if (editingIndex < 0) {
        
        let row = document.createElement("tr");
        let cols = [];
        let delbtn = document.createElement("button");
        let editbtn = document.createElement("button");

        delbtn.innerText = "Delete";
        editbtn.innerText = "Edit";
        
        for (let i = 0; i < 5; i++) {
            cols[i] = document.createElement("td");
            cols[i].style.padding = "5px 15px";
            cols[i].style.borderTop = "1px solid black";
            cols[i].style.borderBottom = "1px solid black";
            if (i > 0) {
                cols[i].style.borderLeft = "1px solid black";
            }
            if (i < 0) {
                cols[i].style.borderRight = "1px solid black";
            }
            
        }
        cols[0].innerText = fname;
        cols[1].innerText = mname;
        cols[2].innerText = lname;
        cols[3].innerText = "" + age;

        cols[4].appendChild(delbtn);
        cols[4].appendChild(editbtn);

        row.appendChild(cols[0]);
        row.appendChild(cols[1]);
        row.appendChild(cols[2]);
        row.appendChild(cols[3]);
        row.appendChild(cols[4]);

        

        tableResult.appendChild(row);

        delbtn.addEventListener("click", (e) => {
            // on click delete
            clearBtn.click();
            tableResult.removeChild(row);
            if (resultrow.length === 1) {
                tableResult.removeChild(headrow);
            }
            let index = resultrow.indexOf(row);
            resultrow.splice(index, 1);
            insertBtn.innerText = "Insert";
            editingIndex = -1;
        });

        editbtn.addEventListener("click", (e) => {
            // on edit click
            for (let i = 0; i < inputs.length; i++) {
                switch (inputs[i].name) {
                    case "txtFname": {
                        inputs[i].value = fname;
                        break;
                    }
                    case "txtMname": {
                        inputs[i].value = mname;
                        break;
                    }
                    case "txtLname": {
                        inputs[i].value = lname;
                        break;
                    }
                    case "numAge": {
                        inputs[i].value = "" + age;
                        break;
                    }
                }
            }
            editingIndex = resultrow.indexOf(row);
            verifybutton.fill(true);
            insertBtn.disabled = !verifybutton.every(Boolean);
            insertBtn.innerText = "Update";
        });

        resultrow.push(row);

    } else {
        let children = resultrow[editingIndex].children;
        children[0].innerText = fname;
        children[1].innerText = mname;
        children[2].innerText = lname;
        children[3].innerText = "" + age;
    }

    clearBtn.click();
    editingIndex = -1;
    insertBtn.innerText = "Insert";
    
});

clearBtn.addEventListener("click", (e) => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    verifybutton.fill(false);
    insertBtn.disabled = !verifybutton.every(Boolean);
});

clearResultBtn.addEventListener("click", (e) => {
    console.log(resultrow, resultrow.length);
    for (let i = 0; i < resultrow.length; i++) {
        console.log(resultrow[i]);
        tableResult.removeChild(resultrow[i]);
    }
    tableResult.removeChild(headrow);
    resultrow = [];
    editingIndex = -1;
    insertBtn.innerText = "Insert";
})

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", (e) => {
        if (e.target.value === "") {
            verifybutton[i] = false;
        } else {
            verifybutton[i] = true;
        }
        insertBtn.disabled = !verifybutton.every(Boolean);
    });
    inputs[i].addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            if (verifybutton.every(Boolean)) {
                insertBtn.click();
            }
        }
    });
}