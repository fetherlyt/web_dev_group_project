<?php
/**
 * Created by Yanjun
 */

class DepartmentContactController extends AbstractBaseController
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
        $dao = new ContactsDao();
        $result = $dao->getAll();

        if (empty($result)) {
            $this->data["statusCode"] = 404;
            $this->data["statusMsg"] = "Not found";
        } else {
            $this->data["statusCode"] = 200;
            $this->data["statusMsg"] = "Success";
        }

        $this->data["contacts"] = $result;
    }

    private function get($param)
    {
        $dao = new ContactsDao();
        $result = $dao->getDeptContact($param);

        if (!isset($result)) {
            $this->data["statusCode"] = 404;
            $this->data["statusMsg"] = "Not found";
        } else {
            $this->data["statusCode"] = 200;
            $this->data["statusMsg"] = "Success";
        }

        $this->data["contacts"] = $result;
    }
}