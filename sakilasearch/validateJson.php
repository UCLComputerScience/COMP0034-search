<?php

function validate($json)
{
    //Attempt to decode JSON.
    $decoded = json_decode($json);

    //Backwards compatability.
    if (!function_exists('json_last_error')) {
        if ($decoded === false || $decoded === null) {
            throw new Exception('Could not decode JSON!');
        }
    } else {

        //Get the last JSON error.
        $jsonError = json_last_error();

        //In some cases, this will happen.
        if (is_null($decoded) && $jsonError == JSON_ERROR_NONE) {
            throw new Exception('Could not decode JSON!');
        }

        //If an error exists.
        if ($jsonError != JSON_ERROR_NONE) {
            $error = 'Could not decode JSON! ';

            //Use a switch statement to figure out the exact error.
            switch ($jsonError) {
                case JSON_ERROR_DEPTH:
                    $error .= 'Maximum depth exceeded!';
                    break;
                case JSON_ERROR_STATE_MISMATCH:
                    $error .= 'Underflow or the modes mismatch!';
                    break;
                case JSON_ERROR_CTRL_CHAR:
                    $error .= 'Unexpected control character found';
                    break;
                case JSON_ERROR_SYNTAX:
                    $error .= 'Malformed JSON';
                    break;
                case JSON_ERROR_UTF8:
                    $error .= 'Malformed UTF-8 characters found!';
                    break;
                default:
                    $error .= 'Unknown error!';
                    break;
            }
            throw new Exception($error);
        }
    }
}