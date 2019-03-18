/*
Basic template

Create a new XMLHttpRequest object
Open an asynchronous connection - in this case opening a file on the local machine.
Set up an anonymous function to handle the status changes from the Ajax connection.
If the Ajax operation completed successfully, log the result returned to the console and insert the contents of the XML object to the page.
Send the request to the server

 */

function execBasic() {
    var request = new XMLHttpRequest();
    request.open("GET", "gold_after_1960s.xml");
    request.onreadystatechange = function () {
        if ((request.readyState == 4) && (request.status == 200)) {
            console.log(request);
            document.writeln(request.responseText);
        }
    }
    request.send();
}

/*
Insert XML into DOM element

Navigate the DOM by finding the element with the id "update"
Insert the text from the XMLHttpRequest object

 */

function insertXML() {
    var request = new XMLHttpRequest();
    request.open("GET", "gold_after_1960s.xml");
    request.onreadystatechange = function () {
        if ((request.readyState == 4) && (request.status == 200)) {
            var modify = document.getElementById("update");
            modify.innerHTML = request.responseText;
        }
    }
    request.send();
}

//insertXML();

/*
Create new DOM elements for series of XML elements

Find all XML elements with the tag object.
Extract the text associated with each node.
Create a list item from the text.
Navigate the DOM by finding the element with the id "update".
Insert the list items.

 */

function createNewElements() {
    var request = new XMLHttpRequest();
    request.open("GET", "gold_after_1960s.xml");
    request.onreadystatechange = function () {
        if ((request.readyState == 4) && (request.status == 200)) {
            var items = request.responseXML.getElementsByTagName("object");
            var output = "<ul>"
            for (var i = 0; i < items.length; i++) {
                output += "<li>" + items[i].firstChild.nodeValue + "</li>"
            }
            output += "</ul>"
            document.getElementById("update").innerHTML = output;
        }
    }
    request.send();
}

createNewElements();


