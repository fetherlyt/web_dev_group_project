<?php
/**
 * Created by PhpStorm.
 * User: logan
 * Date: 12/3/2018
 * Time: 5:32 PM
 */

class Contact
{
    private $id;
    private $department;
    private $firstName;
    private $middleInitial;
    private $lastName;
    private $primaryContact;
    private $phone;
    private $email;
    private $title;

    public function __construct(int $id, String $department, String $firstName, String $middleInitial, String $lastName, bool $primaryContact, String $phone, String $email, String $title)
    {
        $this->id = $id;
        $this->department = $department;
        $this->firstName = $firstName;
        $this->middleInitial = $middleInitial;
        $this->lastName = $lastName;
        $this->primaryContact = $primaryContact;
        $this->phone = $phone;
        $this->email = $email;
        $this->title = $title;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return String
     */
    public function getDepartment(): String
    {
        return $this->department;
    }

    /**
     * @return String
     */
    public function getFirstName(): String
    {
        return $this->firstName;
    }

    /**
     * @return String
     */
    public function getMiddleInitial(): String
    {
        return $this->middleInitial;
    }

    /**
     * @return String
     */
    public function getLastName(): String
    {
        return $this->lastName;
    }

    /**
     * @return bool
     */
    public function isPrimaryContact(): bool
    {
        return $this->primaryContact;
    }

    /**
     * @return String
     */
    public function getPhone(): String
    {
        return $this->phone;
    }

    /**
     * @return String
     */
    public function getEmail(): String
    {
        return $this->email;
    }

    /**
     * @return String
     */
    public function getTitle(): String
    {
        return $this->title;
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
        return ["department" => $this->department, "firstName" => $this->firstName, "middleInitial" => $this->middleInitial,
            "lastName" => $this->lastName, "primaryContact" => $this->primaryContact, "phone" => $this->phone,
            "email" => $this->email, "title" => $this->title];
    }
}