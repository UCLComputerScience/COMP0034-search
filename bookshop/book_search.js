window.onload = function () {

    function loadDoc(url, cFunction) {

        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                cFunction(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function showCategories(xhttp) {

        // clear out the list of categories
        while (document.querySelector("#categories").firstChild) {
            document.querySelector("#categories").removeChild(document.querySelector("#categories").firstChild);
        }

        // add all categories from the XML to the page's bulleted list
        var xmlDoc = xhttp.responseXML;

        var books = xmlDoc.getElementsByTagName("book");
        for (var i = 0; i < books.length; i++) {
            var categoryName = books[i].getAttributeNode("category").nodeValue;

            // create a new <li> tag and add it to the page
            var li = document.createElement("li");
            li.innerHTML = categoryName;
            li.onclick = categoryClick;
            document.querySelector("#categories").appendChild(li);
        }
    }

    function showBooks(xhttp) {

        // clear out the list of books
        var b = document.querySelector("#books");
        while (b.firstChild) {
            b.removeChild(b.firstChild);
        }

        /* Needs to be modified to only return books related to the category clicked */
        // add all books from the XML to the page's bulleted list
        var books = xhttp.responseXML.getElementsByTagName("book");
        for (var i = 0; i < books.length; i++) {
            var titleNode = books[i].getElementsByTagName("title")[0];
            var authorNode = books[i].getElementsByTagName("author")[0];
            var title = titleNode.firstChild.nodeValue;
            var author = authorNode.firstChild.nodeValue;
            var li = document.createElement("li");
            li.innerHTML = title + ", by " + author;
            b.appendChild(li);
        }
    }

    function categoryClick() {
        loadDoc("bookstore.xml", showBooks);
    }

    loadDoc("bookstore.xml", showCategories);

};