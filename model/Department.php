<?php
/**
 * Created by PhpStorm.
 * User: logan
 * Date: 12/3/2018
 * Time: 5:32 PM
 */

class Department
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
}