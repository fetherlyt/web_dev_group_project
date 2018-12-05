<?php

if ($_SERVER["REQUEST_METHOD"] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    exit;
}

// Setting internal encoding for string functions
mb_internal_encoding("UTF-8");

// Callback for autoloading controllers and models
function autoloadFunction($class)
{
    // Ends with the string "Controller" ?
    if (preg_match('/Controller$/', $class))
        require("controller/" . $class . ".php");
    else {
        require("model/" . $class . ".php");
    }
}

// Registers the callback
spl_autoload_register("autoloadFunction");

// Default credential file location
$defaultCredFile = $_SERVER["DOCUMENT_ROOT"] . "/config/creds.ini";
// Set the creds to the default file.
$credFileLocation = $defaultCredFile;

// Read in the configuration for the application
$app_configs = parse_ini_file($_SERVER["DOCUMENT_ROOT"] . "/config/app-config.ini");

// Check to see if logging at debug level is enabled.
$debugEnabled = false;
if (isset($app_configs["debug.enable"])
    & !empty($app_configs["debug.enable"])) {
    $debugEnabled = $app_configs["debug.enable"];
}

// Define global constants
define ("IS_DEBUG", $debugEnabled);
define ("APP_LOG_FILE", $_SERVER["DOCUMENT_ROOT"] . "/log/" . $app_configs["app.log.file"]);

// Check to see if there is a credentials file configured to be used.
if (array_key_exists("credential.file.location", $app_configs)
    && isset($app_configs["credential.file.location"])
    && !empty($app_configs["credential.file.location"])) {
    $credFileLocation = $app_configs["credential.file.location"];
    Util::debug(__FILE__, __LINE__, "Overriding default cred file with: " . $credFileLocation);
} else {
    Util::debug(__FILE__, __LINE__, "No cred file configured. Using default: " . $credFileLocation);
}

// Start a session
session_start();

// Reports all errors
error_reporting(E_ALL);
// Do not display errors for the end-users (security issue)
ini_set('display_errors','Off');
// Ensure error logging is on
ini_set("log_errors", "On");
// Set a logging file if configured
if (isset($app_configs["app.error.log.file"])
    && !empty($app_configs["app.error.log.file"])) {
    ini_set('error_log', $_SERVER["DOCUMENT_ROOT"] . "/log/" . $app_configs["app.error.log.file"]);
}

// Get the location of the DB configurations
//$credFileLocation = $app_configs["credential.file.location"];

if (!file_exists($credFileLocation)) {
    error_log("No credential file exists: " . $credFileLocation, 0);
    exit("System failed to start");
}

// Creating the router and processing parameters from the user's URL
$router = new RouterController();

//Read in the DB connection information
$db_config = parse_ini_file($credFileLocation);

try {
    $dbHost = $db_config['db_host'];
    $dbPort = $db_config['db_port'];
    $dbUser = $db_config['db_user'];
    $dbPwd = $db_config['db_pwd'];
    $dbSchema = $db_config['db_schema'];

    Util::debug(__FILE__, __LINE__, "Attempting to connect to DB: " . $dbHost . " | " .  $dbPort . " | " . $dbUser);
    // Connects to the database
    Db::connect($dbHost . ":" . $dbPort, $dbUser, $dbPwd, $dbSchema);
    Util::debug(__FILE__, __LINE__, "Connected to DB: " . $dbHost);
} catch (Exception $ex) {
    $ref_id = time();
    error_log($ref_id . " - " . $ex->getMessage(), 0);
    //exit($ref_id . " - System failure");
    $router->respond();
}

try {
    $router->process(array($_SERVER['REQUEST_URI']));
} catch (Error $e) {
    $ref_id = time();
    error_log($ref_id . " Error: " . $e, 0);
    $router->respond();
}
