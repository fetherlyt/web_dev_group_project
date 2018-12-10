<?php
/**
 * Created by PhpStorm.
 * User: logan
 * Date: 12/3/2018
 * Time: 8:20 PM
 */

class ContactController extends AbstractBaseController
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
        $result = $dao->get($param);

        if (!isset($result)) {
            $this->data["statusCode"] = 404;
            $this->data["statusMsg"] = "Not found";
        } else {
            $this->data["statusCode"] = 200;
            $this->data["statusMsg"] = "Success";
            $this->data["contact"] = $result;
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
        $firstName = $json["firstName"];
        $middleInitial = $json["middleInitial"];
        $lastName = $json["lastName"];
        $primaryContact = $json["primaryContact"];
        $phone = $json["phone"];
        $email = $json["email"];
        $title = $json["title"];

        $contact = new Contact(0, $firstName, $middleInitial, $lastName, $primaryContact, $phone, $email, $title);

        $dao = new ContactsDao();
        try {
            $result = $dao->insert($contact);

            if ($result) {
                $this->data["statusCode"] = 201;
                $this->data["statusMsg"] = "Created";
                $this->data["contact"] = $contact;
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
        $id = $json["id"];$firstName = $json["firstName"];
        $middleInitial = $json["middleInitial"];
        $lastName = $json["lastName"];
        $primaryContact = $json["primaryContact"];
        $phone = $json["phone"];
        $email = $json["email"];
        $title = $json["title"];

        $contact = new Contact($id, $firstName, $middleInitial, $lastName, $primaryContact, $phone, $email, $title);

        $dao = new ContactsDao();
        try {
            $result = $dao->update($contact);

            if ($result) {
                $this->data["statusCode"] = 201;
                $this->data["statusMsg"] = "Updated";
                $this->data["contact"] = $contact;
            }
        } catch (Exception $e) {
            $time = time();
            error_log("{$time} - " . $e, 0);
            $this->data["code"] = $time;
        }
    }

}