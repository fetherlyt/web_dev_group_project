<?php
/**
 * Created by PhpStorm.
 * User: logan
 * Date: 12/3/2018
 * Time: 5:32 PM
 */


/*yanjun: implements JsonSerializable , delete $Id*/
class Department implements JsonSerializable
{
    private $deptNumber;
    private $code;
    private $name;

    public function __construct(String $deptNumber, String $code, String $name)
    {
        $this->deptNumber = $deptNumber;
        $this->code = $code;
        $this->name = $name;
    }

    
    /**
     * @return String
     */
    public function getDeptNumber(): String
    {
        return $this->deptNumber;
    }

    /**
     * @return String
     */
    public function getCode(): String
    {
        return $this->code;
    }

    /**
     * @return String
     */
    public function getName(): String
    {
        return $this->name;
    }

    /**
     * Specify data which should be serialized to JSON
     * @link https://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        return ["deptNumber" => $this->deptNumber, "code" => $this->code, "name" => $this->name];
    }
}