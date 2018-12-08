<?php
/**
 * User: lueyang
 * Date: 3/15/18
 * Time: 10:10 AM
 */

class StatusController extends AbstractBaseController
{
    public function process($params) {
        $this->data["statusCode"] = "200";
        $this->data["statusMsg"] = "Live";
    }
}