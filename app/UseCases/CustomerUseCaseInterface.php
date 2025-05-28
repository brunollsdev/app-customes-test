<?php

namespace App\UseCases;

use App\Http\Dtos\AddressDto;
use App\Http\Dtos\CustomerDto;
use App\Http\Utils\Response;

interface CustomerUseCaseInterface
{
    public function createCustomer(CustomerDto $payload): Response;
    public function searchCustomers(CustomerDto $customerPayload, AddressDto $addressPayload, int $page): Response;
    public function deleteCustomer(int $id): Response;
    public function updateCustomer(CustomerDto $payload): Response;
}
