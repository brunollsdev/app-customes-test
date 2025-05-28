<?php

namespace App\Providers;

use App\UseCases\AddressUseCase;
use App\UseCases\AddressUseCaseInterface;
use App\UseCases\CustomerUseCase;
use App\UseCases\CustomerUseCaseInterface;
use Illuminate\Support\ServiceProvider;

class UseCaseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(CustomerUseCaseInterface::class, CustomerUseCase::class);
        $this->app->bind(AddressUseCaseInterface::class, AddressUseCase::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
