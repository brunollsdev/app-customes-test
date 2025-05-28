<?php

namespace App\Domain;

use Illuminate\Support\Facades\Validator;

class Address
{
    public $id;
    public $zip_code;
    public $street;
    public $city;
    public $state;
    public $complement;

    public function validate()
    {
        $validator = Validator::make(
            (array) $this,
            [
                'zip_code' => ['required', 'min:8'],
                'street' => ['required'],
                'city' => ['required'],
                'state' => ['required'],
                'complement' => ['nullable'],
            ]
        );

        if ($validator->fails()) {
            return $validator->errors();
        }

        return true;
    }
}
