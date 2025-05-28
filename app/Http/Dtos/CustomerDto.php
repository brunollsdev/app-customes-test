<?php

namespace App\Http\Dtos;

use Illuminate\Http\Request;

class CustomerDto
{
    public  $id;
    public  $name;
    public  $document;
    public  $gender;
    public  $date_birth;
    public  $address_id;

    public function makeCreateRequestToDto(Request $request): CustomerDto
    {
        $this->name = $request->input('name');
        $this->document = $request->input('document');
        $this->gender = $request->input('gender');
        $this->date_birth = $request->input('date_birth');

        return $this;
    }

    public function makeUpdateRequestToDto(Request $request, int $id): CustomerDto
    {
        $this->id = $id;
        $this->name = $request->input('name');
        $this->document = $request->input('document');
        $this->gender = $request->input('gender');
        $this->date_birth = $request->input('date_birth');

        return $this;
    }

    public function makeSearchRequestToDto(Request $request): CustomerDto
    {
        $this->name = $request->query('name');
        $this->document = $request->query('document');
        $this->gender = $request->query('gender');
        $this->date_birth = $request->query('date_birth');

        return $this;
    }

    public function makeModelToCustomerDto(\App\Models\Customer $customer): CustomerDto
    {
        $this->id = $customer->id;
        $this->name = $customer->name;
        $this->document = $customer->document;
        $this->gender = $customer->gender;
        $this->date_birth = $customer->date_birth;
        return $this;
    }
}
