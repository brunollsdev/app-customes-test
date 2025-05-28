<?php

namespace App\Http\Dtos;

use Illuminate\Http\Request;

class AddressDto
{
    public  $id;
    public  $zip_code;
    public  $street;
    public  $city;
    public  $state;
    public  $complement;

    public function makeCreateRequestToDto(Request $request): AddressDto
    {
        $this->zip_code = $request->input('address.zip_code');
        $this->street = $request->input('address.street');
        $this->city = $request->input('address.city');
        $this->state = $request->input('address.state');
        $this->complement = $request->input('address.complement');

        return $this;
    }

    public function makeUpdateRequestToDto(Request $request): AddressDto
    {
        $this->id = $request->input('address.address_id');
        $this->zip_code = $request->input('address.zip_code');
        $this->street = $request->input('address.street');
        $this->city = $request->input('address.city');
        $this->state = $request->input('address.state');
        $this->complement = $request->input('address.complement');

        return $this;
    }

    public function makeSearchRequestToDto(Request $request): AddressDto
    {
        $this->city = $request->query('city');
        $this->state = $request->query('state');
        return $this;
    }

    public function makeModelToDto(\App\Models\Address $address): AddressDto
    {
        $this->id = $address->id;
        $this->zip_code = $address->zip_code;
        $this->city = $address->city;
        $this->state = $address->state;
        $this->street = $address->street;
        $this->complement = $address->complement;
        return $this;
    }
}
