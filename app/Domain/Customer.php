<?php

namespace App\Domain;

use Illuminate\Support\Facades\Validator;

class Customer
{
    public  $id;
    public  $name;
    public  $document;
    public  $gender;
    public  $date_birth;
    public  $address_id;
    public  $created_at;
    public  $updated_at;

    public function validate()
    {
        $validator = Validator::make(
            (array) $this,
            [
                'name' => ['required'],
                'document' => ['min:11', 'max:11', 'unique:customers'],
                'gender' => ['required'],
                'date_birth' => ['required'],
                'address_id' => ['required']
            ]
        );

        if ($validator->fails()) {
            return $validator->errors();
        }

        return true;
    }

    public function validateUpdate()
    {
        $validator = Validator::make(
            (array) $this,
            [
                'name' => ['required'],
                'document' => ['min:11', 'max:11'],
                'gender' => ['required'],
                'date_birth' => ['required'],
            ]
        );

        if ($validator->fails()) {
            return $validator->errors();
        }

        return true;
    }
}
