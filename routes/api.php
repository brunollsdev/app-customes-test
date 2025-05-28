<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1/customer')->group(function () {
    Route::post('/create', [CustomerController::class, 'store']);
    Route::get('/search', [CustomerController::class, 'show']);
    Route::put('{id}/update', [CustomerController::class, 'update']);
    Route::delete('/{id}/delete', [CustomerController::class, 'destroy']);
});
