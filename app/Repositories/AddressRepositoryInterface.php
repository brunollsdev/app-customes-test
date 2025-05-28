<?php

namespace App\Repositories;

use App\Domain\Address;
use Exception;

interface AddressRepositoryInterface
{
    public function insertAddress(Address $address): \App\Models\Address|Exception;
    public function updateAddress(Address $address): Address|Exception;
}
