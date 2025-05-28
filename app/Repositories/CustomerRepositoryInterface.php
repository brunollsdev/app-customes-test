<?php

namespace App\Repositories;

use App\Domain\Address;
use App\Domain\Customer;
use Exception;

interface CustomerRepositoryInterface
{
    public function insertCustomer(Customer $customer): \App\Models\Customer|Exception;
    public function searchCustomers(Customer $customer, Address $address, int $page): array|Exception;
    public function deleteCustomer(int $id): bool|Exception;
    public function updateCustomer(Customer $customer): Customer|Exception;
}
