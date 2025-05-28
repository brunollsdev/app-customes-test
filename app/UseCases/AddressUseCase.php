<?php

namespace App\UseCases;

use App\Domain\Address;
use App\Http\Dtos\AddressDto;
use App\Http\Utils\Response;
use App\Repositories\AddressRepositoryInterface;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class AddressUseCase implements AddressUseCaseInterface
{

    private AddressRepositoryInterface $addressRepository;

    public function __construct(
        AddressRepositoryInterface $addressRepositoryI,
    ) {
        $this->addressRepository = $addressRepositoryI;
    }

    public function createAddress(AddressDto $payload): Response
    {
        $address = new Address();
        $address->zip_code = $payload->zip_code;
        $address->street = $payload->street;
        $address->city = $payload->city;
        $address->state = $payload->state;
        $address->complement = $payload->complement;

        $valid = $address->validate();
        if ($valid !== true) {
            throw new Response("address not valid", false, HttpFoundationResponse::HTTP_BAD_REQUEST, $valid);
        }

        $res = $this->addressRepository->insertAddress($address);
        if ($res instanceof \Exception) {
            throw new Response($res->getMessage(), false, HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR, $res);
        }

        $addressDto = new AddressDto();
        return new Response("address created", true, HttpFoundationResponse::HTTP_CREATED, $addressDto->makeModelToDto($res));
    }

    public function updateAddress(AddressDto $payload): Response
    {
        $address = new Address();
        $address->id = $payload->id;
        $address->zip_code = $payload->zip_code;
        $address->street = $payload->street;
        $address->city = $payload->city;
        $address->state = $payload->state;
        $address->complement = $payload->complement;

        $valid = $address->validate();
        if ($valid !== true) {
            throw new Response("address not valid", false, HttpFoundationResponse::HTTP_BAD_REQUEST, $valid);
        }

        $res = $this->addressRepository->updateAddress($address);
        if ($res instanceof \Exception) {
            throw new Response($res->getMessage(), false, HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR, $res);
        }

        return new Response("address update successfuly", true, HttpFoundationResponse::HTTP_OK, $res);
    }
}
