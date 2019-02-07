<?php
require_once('dbConnection.php');

//Connect to the database
$connection = connectToDb();

// Capture the user's search term input
// This is the 'term' parameter that is passed with the GET Ajax method in the search.js
$term = isset($_GET['term']) ?? '';
$term = $connection->real_escape_string($term);

//Initialize an array variable to hold the resulting data
$json = array();

// Prepare the sql SELECT statement to find film titles
$sql = "SELECT DISTINCT title FROM film ";
$sql .= "INNER JOIN inventory ON film.film_id = inventory.film_id ";
$sql .= "INNER JOIN rental ON inventory.inventory_id = rental.inventory_id ";
$sql .= "WHERE rental.return_date IS NOT NULL AND film.title LIKE '%" . $term . "%' ";
$sql .= "ORDER BY film.title LIMIT 5";

/*
Execute the query and if the query is successful AND if there is a result set, iterate through the rows of the array and
for each row display the title attribute.
If there are no rows then display a message to advise tha no matches were found.
If the query failed then display the SQL error.
*/

//If there is a result from the query
if ($result = $connection->query($sql)) {

    //If there is at least one row in the results
    if ($result->num_rows > 0) {
        //Fetch the result into the associative array, key will be the database column name i.e. 'title' and
        // the value will be the string of the film title e.g. "Dinosaur Adventure"
        while ($row = $result->fetch_assoc()) {
            $json[] = $row;
        }
        // Close result set
        $result->free_result();

    } else {
        //Return an error message
        $json[] = array("error" => "No matches found");
    }

} else {
    $json[] = array("error" => "ERROR: Could not execute $sql. " . $connection->connect_errno . $connection->connect_error);
}

//Return the array in JSON format
echo json_encode($json);