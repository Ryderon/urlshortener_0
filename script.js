/* // localStorage.setItem("key1", "abcd");
// alert(localStorage.getItem("key1"));

function shortenUrl() {

    longUrl = document.getElementById("longUrl").value;
    console.log("< " + longUrl + " >");
    
    if(longUrl == ""){
        alert("Please enter something.");
    }else{
        document.getElementById("longUrl").creatr = lo;
        
        longUrl.onerror = function() {
            console.log(longUrl + "error");
            alert(longUrl + " is offline.");
            
        }
        
        longUrl.onload = function() {
            console.log(longUrl + "loading");
            alert(longUrl + " is online.");
        }
    }
}

var row = document.getElementById("Urlhistory").value;
console.log(row);

function addToHistory() {

    var row = document.getElementById("Urlhistory").insertRow(1);
    var longUrl = row.insertCell(0);
    var shortUrl = row.insertCell(1);
    var visits = row.insertCell(2);
    
    longUrl.innerHTML = "https://sample.com";
    shortUrl.innerHTML = "sample.com";
    visits.innerHTML = "0";
}
/* 
    function deleteHistory() {
    document.getElementById("Urlhistory").deleteRow(1);
    }
//  */ //*/

/*
function validUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
// */

function isValidUrl(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

/*
if (validUrl("apple.com")) console.log("true");
else console.log("false");
*/

var Url = false;
// localStorage.setItem("UrlCount", 0);
var UrlCount = localStorage.getItem("UrlCount");
const longUrl = document.getElementById("longUrl");
if (UrlCount === null) {
    UrlCount = 0;
    localStorage.setItem("UrlCount", 0);
} else if (UrlCount != 0) {
    createTable();
    for (var i = 0, tempUrl; i != UrlCount; i++) {
        tempUrl = localStorage.getItem(`url${i}`);
        createRow(tempUrl, i);
    }
}

function checkURL() {
    if (isValidUrl(longUrl.value)) {
        if (!Url) {
            longUrl.style.color = "black";
            Url = true;
        }
    } else if (Url) {
        longUrl.style.color = "red";
        Url = false;
    }
}

const errorMessage = document.getElementById("errorMessage");
const previousUrl = document.getElementById("previousUrl");


function shortenURL() {
    //prevent reload
    event.preventDefault();

    var inputUrl = longUrl.value;

    //in case last character is '/'
    if (inputUrl.charAt(inputUrl.length - 1) == '/')
        inputUrl = inputUrl.slice(0, -1);

    if (isValidUrl(inputUrl)) {
        var historyTable = document.getElementById("historyTable");

        //searching for duplicates
        var noDupli = true;
        /*
        for (var i = 0, comapareUrl; i != UrlCount; i++) {
            comapareUrl = historyTable.rows[i + 1].cells.item(0).getElementsByTagName("a")[0].textContent;

            //first column
            if (inputUrl == comapareUrl) {
                console.log(`[${i + 1}][0] same { ${comapareUrl} = ${inputUrl} }`);
                noDupli = false;
                break;
            } else {
                console.log(`[${i + 1}][0] diff { ${comapareUrl} != ${inputUrl} }`);

            }

            //second column
            comapareUrl = historyTable.rows[i + 1].cells.item(1).getElementsByTagName("a")[0].textContent;
            if (inputUrl == comapareUrl) {
                console.log(`[${i + 1}][1] same { ${comapareUrl} = ${inputUrl} }`);
                noDupli = false;
                break;
            } else {
                console.log(`[${i + 1}][1] diff { ${comapareUrl} != ${inputUrl} }`);
            }
        }
        */

        if (noDupli) {
            if (UrlCount == 0) createTable();

            inputUrl = modifyUrl(inputUrl);
            createRow(inputUrl, UrlCount);
            localStorage.setItem(`url${UrlCount}`,inputUrl);

            previousUrl.textContent = inputUrl;
            longUrl.value = null;
            errorMessage.textContent = "URL is shortened successfully";
            errorMessage.style.color = "black";

            localStorage.setItem("UrlCount", ++UrlCount);
        } else {
            longUrl.value = null;
            errorMessage.textContent = "Duplicate URL";
            errorMessage.style.color = "red";
        }

    } else {
        previousUrl.textContent = null;
        errorMessage.textContent = "Please enter a valid URL";
        longUrl.style.color = "red";
    }
    Url = false;
}

function createTable() {
    console.log("creating table");

    const article = document.getElementsByClassName("history")[0];

    var table = document.createElement("table");
    table.id = "historyTable";

    table.innerHTML = `
        <caption>Shortened URLs</caption>
        <thead>
            <tr>
                <th class="UrlTable">Long Url</th>
                <th class="UrlTable">Short Url</th>
                <th class="visitsTable">Visits</th>
            </tr>
        </thead>
    `;

    article.appendChild(table);
    historyTable = document.getElementById("historyTable");

    var button = document.createElement("button");
    button.id = "delete-btn";
    button.textContent = "Delete History";
    button.onclick = function() {
        for(var i=0; i!=UrlCount; i++){
            localStorage.removeItem(`url${i}`);
        }
        UrlCount = 0;
        localStorage.setItem("UrlCount", 0);
        
        article.innerHTML = null;
        errorMessage.textContent = null;
        previousUrl.textContent = null;
    }
    article.appendChild(button);
}

function modifyUrl(Url) {
    if (RegExp('^(?:https+:)?//', 'i').test(Url))
        Url = Url;
    else if (RegExp('^(?:[a-z]+:)?//', 'i').test(Url))
        Url = `http://${Url}`;
    else
        Url = `https://${Url}`;
    return Url;
}

function createRow(inputUrl, UrlCount) {
    console.log(`adding ${inputUrl}`);

    var row = document.createElement("tr");

    //LONG URL
    var cell = document.createElement("td");
    cell.className = "UrlTable";

    var anchor = document.createElement("a");
    anchor.href = inputUrl;
    cell.appendChild(anchor);

    var cellText = document.createTextNode(inputUrl);
    anchor.appendChild(cellText);
    row.appendChild(cell);

    //SHORT URL
    cell = document.createElement("td");
    cell.className = "UrlTable";

    anchor = document.createElement("a");
    anchor.href = inputUrl;
    cell.appendChild(anchor);

    cellText = document.createTextNode(`url.s/0${UrlCount}`);
    anchor.appendChild(cellText);
    row.appendChild(cell);
    createfile(longUrl);

    //URL VISITS
    cell = document.createElement("td");
    cell.className = "visitsTable";
    cellText = document.createTextNode(`0`);
    cell.appendChild(cellText);
    row.appendChild(cell);

    var tbody = document.createElement("tbody");
    tbody.appendChild(row);

    historyTable = document.getElementById("historyTable");
    historyTable.appendChild(tbody);
}

// function generate_table() {
//     var tblBody = document.createElement("tbody");

//     // creating all cells
//     for (var i = 0; i < 2; i++) {
//         // creates a table row
//         var row = document.createElement("tr");

//         for (var j = 0; j < 3; j++) {
//             // Create a <td> element and a text node, make the text
//             // node the contents of the <td>, and put the <td> at
//             // the end of the table row
//             var cell = document.createElement("td");
//             var cellText = document.createTextNode("row " + i + " column " + j);
//             cell.appendChild(cellText);
//             row.appendChild(cell);
//         }

//         // add the row to the end of the table body
//         tblBody.appendChild(row);
//     }

//     // put the <tbody> in the <table>
//     historyTable.appendChild(tblBody);
// }

function createfile(url) {
    // var txt = new ActiveXObject("Scripting.FileSystemObject");
    // var s = txt.CreateTextFile(`${url}.htm", true);
    // s.WriteLine(url);
    // s.Close();
}