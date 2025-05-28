<?php

namespace App\Http\Utils;

use Exception;

class Response extends Exception
{

    protected int $statusCode;
    protected bool $status;
    protected mixed $data;

    public function __construct(string $message, bool $status, int $statusCode = 400, mixed $data)
    {
        parent::__construct($message);
        $this->statusCode = $statusCode;
        $this->status = $status;
        $this->data = $data;
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getStatus(): bool
    {
        return $this->status;
    }

    public function getData(): mixed
    {
        return $this->data;
    }

    public function responseError()
    {
        return response([
            'status' => $this->getStatus(),
            'data' => [
                'error' => $this->getData(),
                'message' => $this->getMessage(),
            ]
        ], $this->getStatusCode());
    }

    public function responseSuccess()
    {
        return response([
            'status' => $this->getStatus(),
            'data' => [
                'response' => $this->getData(),
                'message' => $this->getMessage(),
            ]
        ], $this->getStatusCode());
    }
}
