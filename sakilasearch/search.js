//Wait until the whole page is loaded before this is executed
$(document).ready(function(){

    // When the key is released in the search term box execute the following function
    $('#searchterm').keyup(function() {

        /* Get the input value that has been entered */
        //let inputVal = $(this).val();
        let inputVal = $('#searchterm').val();

        // Create a variable that will hold the dropdown list of results
        //var resultDropdown = $(this).append();
        let html = "";

        // If something has been input in the search box then use ajax to execute the search with the parameter term
        if(!inputVal == ""){

            $.getJSON("search.php", {
                term: inputVal
            }).done(function(data){

                //Parse the JSON
                let result = $.parseJSON(data);

                //Iterate through the results in the array and create the list
                $.each( result, function( key, value ) {
                    html += "<p>" + value['title'] + "</p><br>";
                });

                // Display the returned data in browser
                $("#searchoption").html(html);
            });
        }
    });


    //When the search button is pressed, return the search results as a list within the main section of the page
    $('#search_form').submit(function() {

        /* Get the input value that has been entered in the form*/
        let inputVal = $("#searchterm").val();
        console.log(inputVal);

        $.getJSON("search.php", {term: inputVal}).done(function(data){

            //Parse the JSON
            let result = $.parseJSON(data);
            let html = "<p>The following films are available</p><br>";

            //Iterate through the results in the array and create the list
            $.each( result, function( key, value ) {
                html += "<p>" + value['title'] + "</p><br>";
            });

            // Display the returned data in browser
            $("#searchresult").html(html);
        });

    });

});