<?php
/**
* Created by PhpStorm.
 * User: yanjun
* Date: 12/5/
*/

class addDepartmentsController extends AbstractBaseController
{

    /**
     * The main controller method
     * @param array $params URL parameters
     */
    function process($params)
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        switch ($requestMethod){
            case 'POST':
                $this->handlePost($params);
                break;

            default:
        }
    }

    private function handlePost($param) {
        $body = file_get_contents("php://input");
        if(empty($body)){
            $this->data["reason"] = "No Payload";
            return;
        }
        $map = json_decode($body,true);
        $number = $map["number"];
        $code = $map["code"];
        $name = $map["name"];

        $department = new Department($number,$code,$name);
        $dao = new DepartmentsDao();

        try{
            $result = $dao->insert($department);
            if ($result){
                $this->data["statusCode"] = 201;
                $this->data["statusMsg"] = "Created";
                $this->data["contact"] = $department;
            }
        }catch(PDOException $ex){
            $time = time();
            error_log("{$time} - " . $ex,0);
            $this->data["code"] = $time;
        }
    }
}

