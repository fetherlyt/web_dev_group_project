<?php
/**
 * User: lyang
 * Date: 9/7/17
 */

final class Util
{
    /**
     * Write the given log message to the configured application log file, if debug is enabled.
     * @param String $clazz name of the class making the call
     * @param String $line line number of the class making the called
     * @param String $msg message to be written out
     */
    public static function debug(String $clazz, String $line, String $msg) {
        if (IS_DEBUG) {
            error_log(date("d-m-Y h:i:sa") . " " . $clazz . ":" . $line . " - " . $msg . PHP_EOL, 3, APP_LOG_FILE);
        }
    }
}