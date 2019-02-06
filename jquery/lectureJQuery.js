/* Wait until the document i.e. web page DOM is ready before starting the JavaScript */
$(document).ready(function() {

    function hide(){
        $('li.hot').hide();
    }

    var $first = $('ul#list:first-child');

    function text(){
        let text = $('li').text(); // Retrieves the text content of the first list item.
        console.log(text);
        $('li').text("Updated"); //Replace the text content of each list item with the word ‘Updated’.

    }

});