<?php

namespace App\Repositories;

use App\Domain\Address;
use App\Domain\Customer;
use App\Models\Customer as CustomerM;
use Exception;
use Illuminate\Support\Facades\DB;

class CustomerRepository implements CustomerRepositoryInterface
{

    const TABLE_NAME = 'customers';

    public function insertCustomer(Customer $customer): \App\Models\Customer|Exception
    {
        try {
            $res = CustomerM::create([
                'name' => $customer->name,
                'document' => $customer->document,
                'gender' => $customer->gender,
                'date_birth' => $customer->date_birth,
                'address_id' => $customer->address_id
            ]);

            if (!$res) {
                throw new Exception("error insert customer in database.");
            }

            return $res;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function searchCustomers(Customer $customer, Address $address, int $page): array|Exception
    {
        $limitCustomers = 20;
        $query = DB::table(self::TABLE_NAME)
            ->select(
                'customers.id',
                'customers.name',
                'customers.document',
                'customers.gender',
                'customers.date_birth',
                'customers.created_at',
                'customers.updated_at',
                'address.id as address_id',
                'address.zip_code',
                'address.city',
                'address.state',
                'address.street',
                'address.complement'
            )
            ->join('address', 'customers.address_id', '=', 'address.id');

        if (isset($customer->name)) {
            $query->where('name', 'LIKE', "%{$customer->name}%");
        }

        if (isset($customer->document)) {
            $query->where('document', 'LIKE', "%{$customer->document}%");
        }

        if (isset($customer->gender)) {
            $query->where('gender', '=', "{$customer->gender}");
        }

        if (isset($customer->date_birth)) {
            $query->where('date_birth', '=', "{$customer->date_birth}");
        }

        if (isset($address->city)) {
            $query->where('address.city', '=', "{$address->city}");
        }

        if (isset($address->state)) {
            $query->where('address.state', '=', "{$address->state}");
        }

        $query->limit($limitCustomers)->offset($page);
        try {
            $customers = $query->get();

            return $customers->toArray();
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function deleteCustomer(int $id): bool|Exception
    {
        try {
            $res = DB::table(self::TABLE_NAME)->delete($id);

            if (!$res) {
                throw new Exception("error delete customer in database.");
            }
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function updateCustomer(Customer $customer): Customer|Exception
    {
        try {
            DB::table(self::TABLE_NAME)
                ->where('id', '=', $customer->id)
                ->update([
                    'name' => $customer->name,
                    'document' => $customer->document,
                    'gender' => $customer->gender,
                    'date_birth' => $customer->date_birth,
                ]);

            return $customer;
        } catch (\Exception $e) {
            return $e;
        }
    }
}
