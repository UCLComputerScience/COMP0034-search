//Wait until the whole page is loaded before this is executed
$(function () {

    // When the key is released in the search term box execute the following function
    $('#searchterm').keyup(function () {

        /* Get the input value that has been entered */
        let inputVal = $('#searchterm').val();

        // If something has been input in the search box then use ajax to execute the search with the parameter term
        if (inputVal.length > 0) {

            $.getJSON("search.php", {term: inputVal})

                .done(function (json) {

                    let films = [];

                    $.each(json, function (key, value) {
                        films.push(value['title']);
                    });

                    $("#searchterm").autocomplete({
                       source: films,
                        minLength: 2
                    });

                });
        } else {
            //do nothing
        }
    });


    //When the search form is submitted, return the search results as a list within the main section of the page
    $('#search_form').submit(function (event) {

        // Stop the form from submitting the normal way as this would cause the page to refresh
        event.preventDefault();

        //Get the search term


        //Create a $.getJSON request for search and pass the term, on success (done)
        //iterate throuh the data ib the array and put the values into an appropriate
        // element in the html


    });

});