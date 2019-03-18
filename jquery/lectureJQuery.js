/* Wait until the document i.e. web page DOM is ready before starting the JavaScript */

//$(document).ready(function() {   //The following line uses the shorter syntax that equates to this line
$(function () {

    //Event handling example
    $("#visibility").on("click", function() {
        $("p.hot").toggle();
    });

    //DOM traversal example
    $("#traversal").on("click", function() {
        $( "li#child1" ).parent().css( "background-color", "red" );
    });


});

// Example selecting elements
function printElements() {
    let heading = $(".heading"); //class name
    console.log("Title: " + JSON.stringify(heading.html()));
    let author = $("#author"); //id
    console.log("Author: " + JSON.stringify(author.html()));
    let all = $("*"); //all elements on page
    //console.log("All elements: " + JSON.stringify(all.get()));
    let p = $("p"); //tag name
    console.log("All p tags: ");
    $.each( p, function( index, value ){
        console.log(value);
    });
    let ptitle = $("p.title"); //tag elements with class name
    console.log("All p elements with class of title: ");
    $.each( ptitle, function( index, value ){
        console.log(value);
    });
    let first = $("ul#list:first-child"); //first item from the unordered list whose id attribute has a value of list
    //console.log("first item from the unordered list whose id attribute has a value of list: " + first.html);
}

//Simple hide function
function hide() {
    $('p.hot').hide();
}

//Replace the text content of each list item with the word ‘Updated’.
function update() {
    $('li').text("Updated");
}


