<?php
/**
 * Created by PhpStorm.
 * User: logan
 * Date: 12/3/2018
 * Time: 5:50 PM
 */

class departmentsDao
{
    public function insert(Department $dept)
    {
        $sql = "insert into departments(dept_number, code, name) " .
            "values (?, ?, ?)";
        $params = array($dept->getDeptNumber(), $dept->getCode(), $dept->getName());

        $result = DB::query($sql, $params);

        return $result == 1;
    }

    public function update(Department $dept)
    {
        $sql = "update departments set dept_number = ?, code = ?, name = ? " .
            "where id = ?";
        $params = array($dept->getDeptNumber(), $dept->getCode(), $dept->getName(), $dept->getId());

        $result = DB::query($sql, $params);

        return $result == 1;
    }

    public function getAll()
    {
        $sql = "select * from departments";
        $rows = DB::queryAll($sql, array());
        $result = array();

        foreach ($rows as $row) {
            $department = $this->create($row);
            array_push($result, $department);
        }

        return $result;
    }

    private function create($row)
    {
        $id = $row["id"];
        $deptNum = $row["dept_number"];
        $code = $row["code"];
        $name = $row["name"];

        return new Department($id, $deptNum, $code, $name);
    }
}