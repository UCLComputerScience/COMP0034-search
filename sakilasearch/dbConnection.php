<?php
//Include the credentials
require_once('dbCredentials.php');

//Connect to a database with error handling
function connectToDb()
{
    $connection = new mysqli(DBSERVER, DBUSER, DBPASSWORD, DBNAME);
    validateConnection($connection);
    return $connection;
}

//Validate the database connection else return the error number and message
function validateConnection($connection)
{
    if ($connection->connect_errno) {
        $msg = "Error: Unable to connect to MySQL database: ";
        $msg .= $connection->connect_errno;
        $msg .= $connection->connect_error;
        exit($msg);
    }
}

//Close the connection to the database
function closeDb($connection)
{
    if (isset($connection)) {
        $connection->close;
        mysqli_close($connection);
    }
}
