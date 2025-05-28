<?php

namespace App\UseCases;

use App\Http\Dtos\AddressDto;
use App\Http\Utils\Response;

interface AddressUseCaseInterface
{
    public function createAddress(AddressDto $payload): Response;
    public function updateAddress(AddressDto $payload): Response;
}
