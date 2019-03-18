function showBooks() {
    var xmlhttp, xmlDoc;

    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "bookstore.xml", false);

    xmlhttp.send();

    xmlDoc = xmlhttp.responseXML;

    var books = xmlDoc.getElementsByTagName("book");
    for (var i = 0; i < books.length; i++) {
        var x = books[i].childNodes;
        for (var j = 0; j < x.length; j++) {
            var k = x[j];
            if (k.nodeType == 1) {
                document.write(k.nodeName + ":" + k.firstChild.nodeValue + "<br />");
            }
        }
        document.write("<br/>");
    }
}
