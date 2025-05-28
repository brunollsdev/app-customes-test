<?php

namespace App\Http\Controllers;

use App\Http\Dtos\AddressDto;
use App\Http\Dtos\CustomerDto;
use App\Http\Utils\Response;
use App\UseCases\AddressUseCaseInterface;
use App\UseCases\CustomerUseCaseInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{

    private CustomerUseCaseInterface $customerUseCase;
    private AddressUseCaseInterface $addressUseCase;

    public function __construct(
        CustomerUseCaseInterface $customerUseCaseI,
        AddressUseCaseInterface $addressUseCaseI
    ) {
        $this->customerUseCase = $customerUseCaseI;
        $this->addressUseCase = $addressUseCaseI;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $customerDto = new CustomerDto();
        $addressDto = new AddressDto();
        $addressDto->makeCreateRequestToDto($request);
        $customerDto->makeCreateRequestToDto($request);

        try {
            DB::beginTransaction();
            $resAddress = $this->addressUseCase->createAddress($addressDto);
            if (!$resAddress->getStatus()) {
                throw $resAddress;
            }

            $customerDto->address_id = $resAddress->getData()->id;
            $resCustomer = $this->customerUseCase->createCustomer($customerDto);
            if (!$resCustomer->getStatus()) {
                throw $resCustomer;
            }


            $resCustomer->getData()->address = $resAddress->getData();
            DB::commit();
            return $resCustomer->responseSuccess();
        } catch (Response $e) {
            DB::rollBack();

            return $e->responseError();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $customerDto = new CustomerDto();
        $addressDto = new AddressDto();
        $customerDto->makeSearchRequestToDto($request);
        $addressDto->makeSearchRequestToDto($request);

        try {
            $res = $this->customerUseCase->searchCustomers($customerDto, $addressDto, $request->query('page'));
            return $res->responseSuccess();
        } catch (Response $e) {
            return $e->responseError();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $customerDto = new CustomerDto();
        $addressDto = new AddressDto();
        $addressDto->makeUpdateRequestToDto($request);
        $customerDto->makeUpdateRequestToDto($request, $id);

        try {
            DB::beginTransaction();
            $resAddress = $this->addressUseCase->updateAddress($addressDto);
            if (!$resAddress->getStatus()) {
                throw $resAddress;
            }

            $customerDto->address_id = $resAddress->getData()->id;
            $resCustomer = $this->customerUseCase->updateCustomer($customerDto);
            if (!$resCustomer->getStatus()) {
                throw $resCustomer;
            }

            $resCustomer->getData()->address = $resAddress->getData();
            DB::commit();
            return $resCustomer->responseSuccess();
        } catch (Response $e) {
            DB::rollBack();

            return $e->responseError();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $res = $this->customerUseCase->deleteCustomer($id);

            return $res->responseSuccess();
        } catch (Response $e) {
            return $e->responseError();
        }
    }
}
