<?php

namespace App\UseCases;

use App\Domain\Address;
use App\Domain\Customer;
use App\Http\Dtos\AddressDto;
use App\Http\Dtos\CustomerDto;
use App\Http\Utils\Response;
use App\Repositories\CustomerRepositoryInterface;
use Exception;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class CustomerUseCase implements CustomerUseCaseInterface
{

    private CustomerRepositoryInterface $customerRepository;

    public function __construct(
        CustomerRepositoryInterface $customerRepositoryI,
    ) {
        $this->customerRepository = $customerRepositoryI;
    }

    public function createCustomer(CustomerDto $payload): Response
    {
        $customer = new Customer();
        $customer->name = $payload->name;
        $customer->document = $payload->document;
        $customer->gender = $payload->gender;
        $customer->date_birth = $payload->date_birth;
        $customer->address_id = $payload->address_id;

        $valid = $customer->validate();
        if ($valid !== true) {
            throw new Response("customer not valid", false, HttpFoundationResponse::HTTP_BAD_REQUEST, $valid);
        }

        $res = $this->customerRepository->insertCustomer($customer);
        if ($res instanceof \Exception) {
            throw new Response($res->getMessage(), false, HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR, $res);
        }

        $customerDto = new CustomerDto();
        return new Response("customer created", true, HttpFoundationResponse::HTTP_CREATED, $customerDto->makeModelToCustomerDto($res));
    }

    public function searchCustomers(CustomerDto $customerPayload, AddressDto $addressPayload, int $page): Response
    {
        $customer = new Customer();
        $customer->name = $customerPayload->name;
        $customer->document = $customerPayload->document;
        $customer->gender = $customerPayload->gender;
        $customer->date_birth = $customerPayload->date_birth;

        $address = new Address();
        $address->state = $addressPayload->state;
        $address->city = $addressPayload->city;

        $searchRes = $this->customerRepository->searchCustomers($customer, $address, $page);
        if ($searchRes instanceof \Exception) {
            throw new Response($searchRes->getMessage(), false, HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR, $searchRes);
        }

        $res = [
            'customers' => $searchRes
        ];
        return new Response("search customers success", true, HttpFoundationResponse::HTTP_OK, $res);
    }

    public function deleteCustomer(int $id): Response
    {
        $res = $this->customerRepository->deleteCustomer($id);

        if ($res instanceof \Exception) {
            throw new Response($res->getMessage(), false, HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR, $res);
        }

        return new Response("customer deleted successfuly", true, HttpFoundationResponse::HTTP_OK, null);
    }

    public function updateCustomer(CustomerDto $payload): Response
    {
        $customer = new Customer();
        $customer->id = $payload->id;
        $customer->name = $payload->name;
        $customer->document = $payload->document;
        $customer->gender = $payload->gender;
        $customer->date_birth = $payload->date_birth;
        $customer->address_id = $payload->address_id;

        $valid = $customer->validateUpdate();
        if ($valid !== true) {
            throw new Response("customer not valid", false, HttpFoundationResponse::HTTP_BAD_REQUEST, $valid);
        }

        $res = $this->customerRepository->updateCustomer($customer);
        if ($res instanceof \Exception) {
            throw new Response($res->getMessage(), false, HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR, $res);
        }

        return new Response("update customer successfuly", true, HttpFoundationResponse::HTTP_OK, $customer);
    }
}
