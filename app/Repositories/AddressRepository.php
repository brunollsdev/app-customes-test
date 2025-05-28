<?php

namespace App\Repositories;

use App\Domain\Address;
use App\Models\Address as AddressM;
use Exception;
use Illuminate\Support\Facades\DB;

class AddressRepository implements AddressRepositoryInterface
{

    const TABLE_NAME = "address";

    public function insertAddress(Address $address): \App\Models\Address|Exception
    {
        try {
            $res = AddressM::create([
                'zip_code' => $address->zip_code,
                'street' => $address->street,
                'city' => $address->city,
                'state' => $address->state,
                'complement' => $address->complement,
            ]);

            if (!$res) {
                throw new Exception("error insert address in database.");
            }

            return $res;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function updateAddress(Address $address): Address|Exception
    {
        try {
            DB::table(self::TABLE_NAME)
                ->where('id', '=', $address->id)
                ->update([
                    'zip_code' => $address->zip_code,
                    'street' => $address->street,
                    'city' => $address->city,
                    'state' => $address->state,
                    'complement' => $address->complement,
                ]);

            return $address;
        } catch (\Exception $e) {
            return $e;
        }
    }
}
