<?php
require_once('dbConnection.php');

//Connect to the database
$connection = connectDb();

// Capture the user's search term input
// This is the 'term' parameter that is passed with the GET Ajax method in the search.js
$term = $connection->real_escape_string($_GET['term']);

if (isset($term)) {
    // Prepare the sql SELECT statement
    // THis searches for films that are not out on loan
    $sql = "SELECT DISTINCT film.title FROM rental ";
    $sql .= "INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id ";
    $sql .= "INNER JOIN film ON inventory.film_id = film.film_id ";
    $sql .= "INNER JOIN film_category ON film.film_id = film_category.film_id ";
    $sql .= "INNER JOIN category ON film_category.category_id = category.category_id ";
    $sql .= "WHERE rental.return_date IS NOT NULL AND category.name LIKE '" . $term . "%";
    $sql .= "ORDER BY film.title";

    echo $sql;
    exit;


    /*
    Execute the query and if the query is successful AND if there is a result set, iterate through the rows of the array and
    for each row display the title attribute.
    If there are no rows then dispay a message to advise tha no matches were found.
    If the query failed then display the SQL error.
    */

    //Initialize an array variable to hold the resulting data
    $json = array();

    //If there is a result from the query
    if ($result = $connection->query($sql)) {

        //If there is at least one row in the results
        if ($result->num_rows > 0) {
            //Fetch the result into the associative array, key will be the database column name i.e. 'title' and
            // the value will be the string of the film title e.g. "Dinosaur Adventure"
            while ($row = $result->fetch_assoc) {
                $json[] = $row;
            }

        } else {
            //Return an error message as an associative array
            $json['error'] = "No matches found";
        }
        // Close result set
        $result->free_result;
    } else {
        $json['error'] = "ERROR: Could not execute $sql. " . mysqli_errno($connection) . mysqli_error($connection);
    }
    //Return the array in JSON format
    return json_encode($json);
}
