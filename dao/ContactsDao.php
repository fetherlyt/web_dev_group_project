<?php
/**
 * Created by PhpStorm.
 * User: logan
 * Date: 12/3/2018
 * Time: 6:02 PM
 */

class ContactsDao
{
    public function insert(Contact $contact)
    {
        $sql = "insert into contacts(department, first_name, middle_initial, last_name, primary_contact, phone, email, title) " .
            "values (?, ?, ?, ?, ?, ?, ?, ?)";
        $params = array($contact->getDepartment(), $contact->getFirstName(), $contact->getMiddleInitial(), $contact->getLastName(),
            $contact->isPrimaryContact(), $contact->getPhone(), $contact->getEmail(), $contact->getTitle());

        $result = DB::query($sql, $params);

        return $result == 1;
    }

    public function update(Contact $oldContact, Contact $newContact)
    {
        $sql = "update contacts set department = ?, first_name = ?, middle_initial = ?, last_name = ?, " .
            "primary_contact = ?, phone = ?, email = ?, title = ? " .
            "where department = ?, first_name = ?, middle_initial = ?, last_name = ?, " .
            "primary_contact = ?, phone = ?, email = ?, title = ?";
        $params = array($newContact->getDepartment(), $newContact->getFirstName(), $newContact->getMiddleInitial(), $newContact->getLastName(),
            $newContact->isPrimaryContact(), $newContact->getPhone(), $newContact->getEmail(), $newContact->getTitle(),
            $oldContact->getDepartment(), $oldContact->getFirstName(), $oldContact->getMiddleInitial(), $oldContact->getLastName(),
            $oldContact->isPrimaryContact(), $oldContact->getPhone(), $oldContact->getEmail(), $oldContact->getTitle());

        $result = DB::query($sql, $params);

        return $result == 1;
    }

    public function delete(Contact $contact)
    {
        $sql = "delete from contacts where department = ?, first_name = ?, middle_initial = ?, last_name = ?, primary_contact = ?, " .
            "phone = ?, email = ?, title = ?";
        $params = array($contact->getDepartment(), $contact->getFirstName(), $contact->getMiddleInitial(), $contact->getLastName(),
            $contact->isPrimaryContact(), $contact->getPhone(), $contact->getEmail(), $contact->getTitle());

        $result = DB::query($sql, $params);

        return $result == 1;
    }

    public function getAll()
    {
        $sql = "select * from contacts";
        $rows = DB::queryAll($sql, array());
        $result = array();

        foreach ($rows as $row) {
            $contact = $this->create($row);
            array_push($result, $contact);
        }

        return $result;
    }

    private function create($row)
    {
        $dept = $row["department"];
        $firstName = $row["first_name"];
        $middleInitial = $row["middle_initial"];
        $lastName = $row["last_name"];
        $primaryContact = $row["primary_contact"];
        $phone = $row["phone"];
        $email = $row["email"];
        $title = $row["title"];

        return new Contact($dept, $firstName, $middleInitial, $lastName, $primaryContact, $phone, $email, $title);
    }
}