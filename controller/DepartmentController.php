<?php
/**
 * Created by PhpStorm.
 * User: logan
 * Date: 12/3/2018
 * Time: 8:20 PM
 */

class DepartmentController extends AbstractBaseController
{

    /**
     * The main controller method
     * @param array $params URL parameters
     */
    function process($params)
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        switch ($requestMethod) {
            case 'GET':
                $this->handleGet($params);
                break;
            case 'POST':
                $this->handlePost();
                break;
            case 'PUT':
                $this->handlePut();
                break;
            default:
        }
    }

    private function handleGet($params)
    {
        if (empty($params)) {
            $this->getAll();
        } else {
            $this->get($params[0]);
        }
    }

    private function getAll()
    {
        $dao = new DepartmentsDao();
        $result = $dao->getAll();

        if (empty($result)) {
            $this->data["statusCode"] = 404;
            $this->data["statusMsg"] = "Not found";
        } else {
            $this->data["statusCode"] = 200;
            $this->data["statusMsg"] = "Success";
        }

        $this->data["departments"] = $result;
    }

    private function get($param)
    {
        $dao = new DepartmentsDao();
        $result = $dao->get($param);

        if (!isset($result)) {
            $this->data["statusCode"] = 404;
            $this->data["statusMsg"] = "Not found";
        } else {
            $this->data["statusCode"] = 200;
            $this->data["statusMsg"] = "Success";
            $this->data["department"] = $result;
        }
    }

    private function handlePost()
    {
        $body = file_get_contents("php://input");
        if (empty($body)) {
            $this->data["reason"] = "No Payload";
            return;
        }

        $json = json_decode($body, true);
        $deptNumber = $json["departmentNumber"];
        $code = $json["code"];
        $name = $json["name"];

        $department = new Department(0, $deptNumber, $code, $name);

        $dao = new DepartmentsDao();
        try {
            $result = $dao->insert($department);

            if ($result) {
                $this->data["statusCode"] = 201;
                $this->data["statusMsg"] = "Created";
                $this->data["department"] = $department;
            }
        } catch (Exception $e) {
            $time = time();
            error_log("{$time} - " . $e, 0);
            $this->data["code"] = $time;
        }
    }

    private function handlePut(){
        $body = file_get_contents("php://input");
        if (empty($body)) {
            $this->data["reason"] = "No Payload";
            return;
        }

        $json = json_decode($body, true);
        $id = $json["id"];
        $deptNumber = $json["departmentNumber"];
        $code = $json["code"];
        $name = $json["name"];

        $department = new Department($id, $deptNumber, $code, $name);

        $dao = new DepartmentsDao();
        try {
            $result = $dao->update($department);

            if ($result) {
                $this->data["statusCode"] = 201;
                $this->data["statusMsg"] = "Updated";
                $this->data["department"] = $department;
            }
        } catch (Exception $e) {
            $time = time();
            error_log("{$time} - " . $e, 0);
            $this->data["code"] = $time;
        }
    }
}