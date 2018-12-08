<?php

/**
 * User: lyang
 * Date: 9/7/17
 *
 * A base controller.
 * Class Controller
 */
abstract class AbstractBaseController
{

    /**
     * @var array An array which indexes will be accessible as variables in template
     */
    protected $data = array();

    /**
     * Protects any variable by converting HTML special characters to entities
     * @param mixed $x The variable to be protected
     * @return mixed The protected variable
     */
    final protected function protect($x = null)
    {
        if (!isset($x))
            return null;
        elseif (is_string($x))
            return htmlspecialchars($x, ENT_QUOTES);
        elseif (is_array($x)) {
            foreach ($x as $k => $v) {
                $x[$k] = $this->protect($v);
            }
            return $x;
        } else
            return $x;
    }

    /**
     * Respond with JSON Payload.
     */
    public final function respond() {
        Util::debug(__FILE__, __LINE__, "data size: " . sizeof($this->data));
        if (array_key_exists("statusCode", $this->data))
            $statusCode = $this->data["statusCode"];
        if (array_key_exists("statusMsg", $this->data))
            $statusMsg = $this->data["statusMsg"];
        if (empty($statusCode))
            $statusCode = "400";
        if (empty($statusMsg))
            $statusMsg = "Bad Request";

        header('Access-Control-Allow-Origin: *');
        header("Content-Type:application/json");
        header("HTTP/1.1 " . $statusCode . " " . $statusMsg);
        $response["status_code"] = $statusCode;
        $response["status_message"] = $statusMsg;
        if ("200" == $statusCode) {
            if (array_key_exists("statusCode", $this->data))
                unset($this->data["statusCode"]);
            if (array_key_exists("statusMsg", $this->data))
                unset($this->data["statusMsg"]);
            $response["data"] = $this->data;
        }

        $json_response = json_encode($response);
        echo $json_response;
        exit;
    }

    /**
     * The main controller method
     * @param array $params URL parameters
     */
    abstract function process($params);

}
